import type { Catalog } from './catalog';
export default {
  language: 'Bahasa tampilan',
  auto: 'Bahasa browser',
  skip: 'Langsung ke isi',
  home: 'Beranda Typeodd',
  play: 'Main',
  guide: 'Cara bermain',
  about: 'Tentang game',
  faq: 'Tanya jawab',
  privacy: 'Privasi',
  title: 'Typeodd — Game mengetik gratis untuk kecepatan dan ingatan',
  description:
    'Mengetik pelan membuat teks memudar. Mengetik cepat membuat penutup menyembunyikan huruf berikutnya. Main sendiri atau berduel sambil mengandalkan ingatan.',
  start: 'Main sekarang',
  playground: 'Seberapa banyak yang bisa kamu ingat?',
  noSignup: 'Tanpa daftar atau unduh.',
  typingLanguage: 'Bahasa teks',
  soundOn: 'Nyalakan suara',
  soundOff: 'Matikan suara',
  progress: 'Progres',
  rhythm: 'Kecepatan ketik',
  accuracy: 'Akurasi',
  score: 'Skor',
  metrics: 'Statistik permainan',
  sessionDone: 'Teks selesai',
  finished: 'Kamu berhasil sampai akhir!',
  points: 'poin',
  again: 'Main lagi',
  copy: 'Salin hasil',
  inputLabel: 'Ketik sisa teks:',
  typeDirectly: 'Ketik satu karakter setiap kali. Perbaiki dengan Backspace. Tempel dinonaktifkan.',
  clickType: 'Klik teks untuk mengetik. Baca sedikit lebih dulu.',
  readAhead: 'Baca ke depan, ingat, lalu terus mengetik.',
  restart: 'Ulangi',
  next: 'Teks berikutnya',
  errorHint: 'Salah ketik mengurangi 30% skor. Perbaiki dengan Backspace.',
  noTimer: 'Mode solo tidak dibatasi waktu. Selesaikan seluruh teks.',
  mask: 'Panjang penutup',
  veil: 'Teks memudar',
  reward: 'Poin per huruf',
  ruleHint: 'Pelan, teks memudar. Cepat, teks tertutup.',
  noJs: 'JavaScript diperlukan untuk bermain. Halaman bantuan tetap bisa dibaca tanpanya.',
  history: 'Teks yang selesai',
  localOnly: 'Disimpan di browser ini',
  deleteQuestion: 'Hapus hasil permainan?',
  delete: 'Hapus',
  cancel: 'Batal',
  clearHistory: 'Hapus hasil',
  saveFailed: 'Penyimpanan tidak tersedia. Hasil hanya tampil di layar ini.',
  deleteFailed: 'Hasil tidak bisa dihapus. Periksa pengaturan browser.',
  copied: 'Hasil disalin.',
  guideTitle: 'Cara bermain',
  guideLead: 'Baca lebih dulu dan ingat huruf yang tertutup sampai teks selesai.',
  guideSections: [
    {
      title: '1. Pilih teks',
      body: 'Pilih bahasa Inggris atau Korea, lalu klik teks dan mulai mengetik. Huruf yang benar menghilang dan sisa teks maju. Ulangi memulai teks yang sama; Teks berikutnya memilih teks lain.'
    },
    {
      title: '2. Ingat beberapa kata di depan',
      body: 'Mengetik pelan membuat huruf memudar. Mengetik cepat dan benar membuatnya jelas lagi, tetapi memperpanjang penutup abu-abu. Baca kata sebelum masuk ke bawah penutup. Saat berhenti, penutup mengecil; saat mulai lagi, teks bisa makin memudar.'
    },
    {
      title: '3. Kumpulkan poin dan perbaiki kesalahan',
      body: 'Penutup yang panjang memberi lebih banyak poin untuk setiap huruf benar. Salah ketik memperpendek penutup dan mengurangi 30% skor, dibulatkan ke atas: dari 101 poin, hilang 31. Backspace menghapus huruf salah. Sesuai aturan asli, menghapusnya juga mengurangi poin.'
    },
    {
      title: '4. Main sendiri atau berduel',
      body: 'Solo tidak punya batas waktu. Dalam duel, kedua pemain mengetik teks yang sama; yang selesai lebih dulu menang. Keluar berarti menyerah. Duel berlangsung paling lama 15 menit. Kecepatan langsung dihitung dari input terbaru; hasil solo menampilkan rata-rata satu ronde.'
    }
  ],
  aboutTitle: 'Apa itu Typeodd?',
  aboutLead: 'Game mengetik yang mengajakmu mengingat kata berikutnya.',
  aboutSections: [
    {
      title: 'Makin cepat, makin menantang',
      body: 'Saat pelan, kata memudar. Saat cepat, penutup menyembunyikannya. Semakin cepat tangan bergerak, semakin banyak yang harus diingat. Melewati bagian tertutup dan menemukan ritme lagi setelah salah adalah bagian serunya.'
    },
    {
      title: 'Cerita kecil masa kini',
      body: 'Pesan yang belum terkirim, perjalanan di kota, satu ronde terakhir bersama teman: kami menulis 30 teks Inggris dan 30 teks Korea dalam enam tema keseharian dan imajinasi. Bahasa tampilan bisa dipilih terpisah dari bahasa teks.'
    },
    {
      title: 'Dibuat oleh zendoc',
      body: 'Bagaimana kalau mengetik melibatkan ingatan sebanyak gerakan jari? Typeodd berawal dari ide itu. Versi ini menjaga aturan penutup dan pemudaran asli, dengan teks dan tampilan yang baru. Temukan kode dan proyek lain lewat tautan di bawah.'
    }
  ],
  faqPageTitle: 'Jawaban yang berguna',
  faqLead: 'Hal yang perlu diketahui sebelum ronde berikutnya.',
  faqs: [
    {
      q: 'Apa tujuan permainan?',
      a: 'Selesaikan seluruh teks dengan mengingat huruf yang tertutup. Mengetik pelan memudarkan teks; mengetik cepat memperbesar penutupnya.'
    },
    {
      q: 'Kenapa teks tertutup saat saya bermain bagus?',
      a: 'Agar tantangan ingatan ikut bertambah. Penutup yang lebih panjang juga memberi lebih banyak poin per huruf benar.'
    },
    {
      q: 'Bagaimana poin berkurang?',
      a: 'Kesalahan mengurangi 30% skor, dibulatkan ke atas: 31 dari 101 poin. Menghapus huruf salah dengan Backspace juga mengurangi poin.'
    },
    {
      q: 'Bisa dijeda?',
      a: 'Tidak ada jeda. Penutup tetap mengecil saat berpindah tab. Solo tidak dibatasi waktu; duel paling lama 15 menit.'
    },
    {
      q: 'Bahasa apa yang bisa diketik?',
      a: 'Tersedia 30 teks Inggris dan 30 teks Korea. Bahasa tampilan terpisah. Di ponsel, ketuk teks untuk membuka keyboard. Huruf Korea diperiksa setelah penyusunannya selesai.'
    },
    {
      q: 'Di mana hasil disimpan?',
      a: '50 hasil solo terbaru ada di browser ini. Ringkasan duel anonim kedaluwarsa setelah tujuh hari dan dihapus saat server mulai atau hasil berikutnya disimpan. Tidak ada akun atau peringkat publik.'
    },
    {
      q: 'Bagaimana memulai duel?',
      a: 'Pilih duel dan cari lawan dengan bahasa teks yang sama. Kalian mulai bersama setelah tiga detik. Server mengonfirmasi pemenang. Keluar berarti menyerah; koneksi putus mengakhiri permainan setelah sepuluh detik dan tidak bisa dilanjutkan.'
    }
  ],
  privacyTitle: 'Data kamu',
  privacyLead: 'Yang tersimpan di browser dan yang dikirim saat duel.',
  privacySections: [
    {
      title: 'Di browser',
      body: 'Hingga 50 hasil solo disimpan: versi aturan, teks, bahasa, tanggal, skor, durasi, kecepatan, dan akurasi. Pilihan suara dan bahasa juga disimpan. Hapus hasil menghapus ronde; menghapus data browser juga menghapus pengaturan. Hasil disalin ke papan klip hanya saat kamu memintanya.'
    },
    {
      title: 'Saat duel',
      body: 'Input yang sudah dikonfirmasi dikirim lewat WSS terenkripsi dan Cloudflare Tunnel ke server Rust, lalu diproses di memori. SQLite hanya menyimpan ID pertandingan anonim, teks, bahasa, skor, progres, jumlah percobaan, pemenang, durasi, dan alasan berakhir. Basis data game tidak menyimpan catatan input mentah, nama, atau alamat IP. Ringkasan kedaluwarsa setelah tujuh hari dan dihapus saat server mulai atau hasil berikutnya disimpan.'
    },
    {
      title: 'Hosting',
      body: 'Cloudflare Pages menyediakan situs dan Google Fonts menyediakan font. Keduanya menerima informasi jaringan yang dibutuhkan untuk layanan mereka. Game tidak menyertakan iklan atau skrip analitik pengunjung terpisah.'
    },
    {
      title: 'Chat',
      body: 'Chat belum tersedia. Penyimpanan dan penghapusan pesan akan dijelaskan sebelum fitur diluncurkan.'
    }
  ]
} satisfies Catalog;
