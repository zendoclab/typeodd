use serde::Serialize;
use unicode_normalization::UnicodeNormalization;

pub const VERSION: &str = "classic-v2";
const MAX_WIDTH: f64 = 80.;
const GROWTH_DIVISOR: f64 = 250.;
const MAX_GROWTH_CPM: f64 = 900.;
const WARMUP_CHARS: usize = 5;
const RAMP_CHARS: f64 = 10.;
const CLARITY_THRESHOLD: f64 = 12.;

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Game {
    pub width: f64,
    pub veil: u16,
    pub score: u64,
    pub delta: i64,
    pub instantaneous_cpm: f64,
    pub completed_chars: usize,
    pub attempts: u32,
    pub mistakes: u32,
    pub typed: String,
    pub correct: Option<bool>,
    #[serde(skip)]
    pub text: Vec<char>,
    #[serde(skip)]
    last_correct: Option<u64>,
    #[serde(skip)]
    next_decay: u64,
}
impl Game {
    pub fn new(text: &str) -> Self {
        Self {
            width: 1.,
            veil: 0,
            score: 0,
            delta: 0,
            instantaneous_cpm: 0.,
            completed_chars: 0,
            attempts: 0,
            mistakes: 0,
            typed: String::new(),
            correct: None,
            text: text.nfc().collect(),
            last_correct: None,
            next_decay: 1000,
        }
    }
    pub fn tick(&mut self, now: u64) {
        while self.next_decay <= now && self.width > 1. {
            self.width = (self.width - (self.width * 0.25).ceil()).ceil();
            self.next_decay += 1000;
        }
        if self.next_decay <= now {
            self.next_decay += ((now - self.next_decay) / 1000 + 1) * 1000;
        }
    }
    pub fn input(&mut self, value: &str, now: u64) -> bool {
        let value: String = value.nfc().collect();
        if self.completed_chars == self.text.len()
            || value.chars().count() > 1
            || (value.is_empty() && self.typed.is_empty())
        {
            return false;
        }
        self.tick(now);
        let correct = value.chars().next() == self.text.get(self.completed_chars).copied();
        if !value.is_empty() {
            self.attempts += 1;
        }
        self.typed = value;
        self.correct = Some(correct);
        if correct {
            if let Some(last) = self.last_correct {
                self.instantaneous_cpm = 60000. / now.saturating_sub(last).max(1) as f64;
            }
            self.last_correct = Some(now);
            let ramp = ((self.completed_chars + 1).saturating_sub(WARMUP_CHARS) as f64
                / RAMP_CHARS)
                .min(1.);
            let growth = self.instantaneous_cpm.min(MAX_GROWTH_CPM) / GROWTH_DIVISOR;
            self.width = (self.width + growth * ramp).min(MAX_WIDTH);
            self.completed_chars += 1;
            self.typed.clear();
            self.delta = (self.width / 10.).ceil() as i64;
            self.score += self.delta as u64;
        } else {
            self.instantaneous_cpm = 0.;
            if !self.typed.is_empty() {
                self.mistakes += 1;
            }
            let penalty = (self.score as f64 * 0.3).ceil() as u64;
            self.delta = -(penalty as i64);
            self.score = self.score.saturating_sub(penalty);
        }
        self.veil = if self.width.trunc() > CLARITY_THRESHOLD {
            if self.veil > 3 { self.veil - 2 } else { 0 }
        } else if self.veil < 252 {
            self.veil + 3
        } else {
            255
        };
        if !correct {
            self.width = 1.;
        }
        true
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn balanced_trace() {
        let mut g = Game::new("abcdefghijklmnop");
        for (i, c) in "abcdefgh".chars().enumerate() {
            g.input(&c.to_string(), i as u64 * 100);
        }
        assert!((g.width - 2.44).abs() < 1e-9);
        assert_eq!((g.veil, g.score), (24, 8));
        g.input("X", 800);
        assert_eq!((g.width, g.veil, g.score), (1., 27, 5));
        g.input("", 900);
        assert_eq!((g.width, g.veil, g.score), (1., 30, 3));
        g.input("i", 1100);
        assert!((g.width - 1.24).abs() < 1e-9);
        assert_eq!((g.veil, g.score), (33, 4));
    }
    #[test]
    fn boundaries_and_decay() {
        let mut g = Game::new("abc");
        assert!(!g.input("ab", 0));
        g.width = 100.;
        g.veil = 80;
        g.tick(4000);
        assert_eq!((g.width, g.veil), (31., 80));
        g.input("a", 4100);
        g.input("b", 4100);
        assert!(g.width.is_finite());
        assert!(g.width <= 80.);
        g.input("c", 4101);
        assert_eq!(g.completed_chars, 3);
        assert!(!g.input("x", 4102));
    }
    #[test]
    fn warmup_and_batched_input_are_bounded() {
        let mut g = Game::new(&"a".repeat(100));
        for i in 0..100 {
            let before = g.width;
            g.input("a", 0);
            assert!(g.width - before <= 3.6 + 1e-9);
            assert!(g.width <= 80.);
            if i < 5 {
                assert_eq!(g.width, 1.);
            }
        }
        assert_eq!(g.width, 80.);
    }
    #[test]
    fn clarity_recovers_at_a_steady_pace() {
        for (interval, clears) in [(200, true), (500, false)] {
            let mut g = Game::new(&"a".repeat(121));
            for i in 0..120 {
                g.input("a", i * interval);
            }
            assert_eq!(g.veil == 0, clears);
        }
    }
}
