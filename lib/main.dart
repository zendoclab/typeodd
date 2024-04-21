import 'package:flutter/material.dart';
import 'dart:math';
import 'dart:async';

import 'package:flutter/services.dart';

/*
- 점수 체계, 엔딩 텍스트 변경, 카피라이팅 링크 등 배치
*/

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'typeodd',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'typeodd'),
    );
  }
}

List<String> blogText = [
  'I watched a touching video of a parrot who danced with the parrot for months to help a parrot pluck out all its feathers because of depression, and the parrot enjoyed dancing, stopped plucking feathers, and finally grew abundantly and returned to a very joyful personality. Anxiety is based on evidence that I am safe or can be safe (new thoughts and experiences) or memories, and from then on, anxiety is reduced through negative feedback (anxiety and anxiety disorders are different). Depression can help improve depression if you have evidence or memories that you are not getting worse or that you can get better (depression and depression are different). The most primitive exercises for humans are walking and running, so in the 21st century, in the gym, we\'re still hanging on the treadmill the longest.',
  'Can a treadmill help with anxiety and depression? Of course it helps. First of all, exercising during the time of sunrise activates serotonin and strengthens melatonin at night to normalize biological rhythms, facilitating the regeneration of the body and brain throughout while sleeping. Walking and running are not unconscious acts, so they are consciously based on some purpose and plan, thus stimulating and awakening the prefrontal lobe, dopamine transmission system, hippocampus and limbic system. Just as taking antidepressants SSRIs, SNRIs, and NDRIs for a set period of time can help with constant exercise, just as they act on the aforementioned neuronal regeneration and neurotransmitters to treat depressive anxiety compulsions, etc. You can also try to take healing to a higher level by running (whether on a treadmill or on the grass in a park). There is a so-called Runner\'s High or Second Wind',
  'When running, lactic acid accumulates in the leg muscles due to anaerobic metabolism, and for a more long-term run, the breath is up to the chin until it is converted to aerobic metabolism, and the heat is stiff all over the body, and I want to give up everything, but finally, as endorphin and anandamide are released, the blood vessels of the heart and lung muscles relax, and it is converted to aerobic metabolism, so running suddenly becomes comfortable and the pain disappears! It is also a positive thought. Running exercises can become daily self-denial training through this process. Self-denial means that in a difficult situation (even if you make it on purpose), you somehow hold on and break through the gaps and break through. It\'s so hard when I start that I can\'t even imagine if I\'ll be able to make it to the end, but all animals and living beings, especially humans, have the inherent power to break through crisis situations (extra energy through endorphins and anandamides), so if you persist, you will eventually do it.',
  'Second Wind (self-denial) through running exercise habits Furthermore, Runner\'s High may be an opportunity to maximize the effectiveness of exercise for anxiety and depression. It can act like a powerful herbal medicine for treatment-resistant depression, like esketamine or electroconvulsive therapy. So, what if you administer that good endorphin, anandamide, externally? Everyone knows very well what the consequences are if you habitually use narcotic analgesics, which are substitutes for endogenous endorphins, even though you do not have cancer pain. Likewise, there is no psychological conflict, but what happens if you habitually use hemp or THC, which are substitutes for endogenous anandamide, becomes a slacker waster. Living organisms, especially the human body, must change while maintaining homeostasis, and if homeostasis is unilaterally destroyed through exogenous substances or stimuli, it will become a waste or die. That\'s why the process of no pain, no gain is so important. That\'s why drugs are not used casually, but only when it is difficult enough to die or when it is absolutely necessary.',
  'So how can we program Second Wind/Runner\'s High through running to improve depressive anxiety? Heart rate tracking on smartwatches is the first key. In order to achieve Runner\'s High, it is not too fast a heart rate (aerobic-anaerobic-lactate concentration, body temperature), it is not a slow heart rate, and the optimal heart rate is already proposed. Second, it is a smartwatch heart rate linkage game that stimulates the prefrontal lobe, dopamine channels, and the hippocampus and limbic system\'s attention, plan execution, new memory formation, motivation and reward.',
  'In Korea, there are not many altitudes of 2500 meters above sea level, so it doesn\'t matter, but overseas, even if you are not a mountain climber, you should be careful of altitude sickness when going to common tourist destinations such as Aspen in Colorado, Machu Picchu in Peru, and Tibet Plateau in the United States. Altitude sickness is caused by hypoxia, and like that terrible briquette gas poisoning, high-altitude cerebral edema can occur, leaving permanent impairment in brain function and death due to high-altitude pulmonary edema. Around 2000 meters above sea level, 22% experience altitude sickness, and from 3000 meters above sea level, more than 40%. Headache, vomiting, anorexia, fatigue, dizziness, and insomnia occur within 6 to 12 hours after ascending to high altitude, and most of them improve as they adapt to the high altitude, but some may change to fatal conditions.',
  'From 2500 meters, you must go through a 24-hour acclimatization period every time you climb 600 meters to reduce altitude sickness. Acetazolamide can be used as a preventive treatment, ibuprofen for headaches, dexamethasone for symptoms of high-altitude cerebral edema such as incoordination or altered consciousness, and beta2 such as ventolin for high-altitude pulmonary edema with dyspnea such as tachypnea, cough, hemoptysis, and fever. Use an antidote in an emergency. Altitude sickness should not be thought of as just suffering from headache, vomiting, and dizziness when climbing an alpine zone. It is important to know that the aftereffects are no different from a stroke, and that permanent damage to motor function, emotion control function, memory and cognitive function may occur. Even if you are young and have good physical strength, you must be prepared because the prognosis is unknown.',
  'In the U.S., up until the early to mid-20th century, the disparagement of the dumbing down of the college diploma was somewhat aligned with anti-intellectualism, including the atlas author and philosopher Ayn Rand. The idea is that gut and sense are more important to success than knowledge. By the end of the 20th century, many people were self-brainwashing themselves by playing Protestant success cassette tapes while driving. The issue of the value of a college diploma was raised, Silicon Valley\'s culture of not investing in diploma-happy people, including Harvard dropouts like Bill Gates and Mark Zuckerberg, continues in the 21st century in the U.S. (In the beginning, Western civilization was a civilization of exploration and conquest, and Northeast Asian civilization was a totalitarian class society developed from large-scale relational agriculture, so there are different value judgments about risk-taking, and Silicon Valley-educated masayohi Sohn\'s obsession with diplomas may have been influenced by his Northeast Asian cultural roots as well as his lack of foundation and affordability as a third-generation immigrant).'
  'Toward the end of the 20th century, the logical, smart guys who were considered nerds began to rise to prominence. With the advent of CPUs, they were able to draw diagrams, create sequential systems, family trees, create related communities, form markets, build kingdoms, and finally empires like MS and Google. From 2010, competition among nerds became so fierce that humans who were not just smart in terms of CPU logic, but also logical geniuses and prophets (using microLSDs on purpose) humans who could think in terms of GPUs and come up with novel conclusions out of nowhere began to stand out. Now, only those who excel at CPU+GPU thinking are invested and survive. GPU humans are more like fixers. It\'s more of a hunch, not a logic. The reason chatGPT lies (halucination) is not because it is a bad guy (logic like bad guy good guy is a CPU method of taking a snapshot of a cross-section of a phenomenon), but because the interpretation of an ever-changing phenomenon is always fluid and reserved, like a shaman or a doctor (my profession). That\'s why strong GPU thinkers are fixers, not builders.'
  'I\'ve had memory problems since I was a kid. To bypass this problem, I\'ve been practicing meditation and other exercises to improve my prefrontal concentration and working memory, and to focus on thinking that relies on it. It\'s not a systematic, sequential thinking, but rather a way of collecting a lot of data, going through trial and error, waiting for it to ferment properly, and when the answer suddenly comes, proceeding and integrating it accordingly. The way the hippocampus pulls in data and processes it is more CPU-like, while the prefrontal working memory is more GPU-like. Unfortunately, I may have developed the ability to think synthetically and predictively, but not the ability to plan and build for the long term.'
];

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  TextStyle commonTextStyle = const TextStyle(
    letterSpacing: 2.0,
    fontSize: 16,
    color: Colors.black54
  );

  final TextEditingController controller = TextEditingController();

  String text ='';

  late FocusNode myFocusNode;

  String originText = '';
  String deducedText = '';
  bool resp = false;


  Color currCol = Colors.black54;


  DateTime? _lastKeystroke;

  double _typingSpeed = 0;

  void _calculateTypingSpeed(String value) {
    final now = DateTime.now();
    if (_lastKeystroke != null) {
      final difference = now.difference(_lastKeystroke!).inMilliseconds;
      _typingSpeed = 60000 / difference; // 타이핑 속도를 분당 타이핑 수로 계산
    }
    _lastKeystroke = now;
  }



  double curwid = 1;

  @override
  void initState() {
    super.initState();
    myFocusNode = FocusNode();
    controller.addListener(() {
      text = controller.value.text;
    });

    originText = blogText[Random().nextInt(blogText.length)];

    Timer.periodic(const Duration(seconds: 1), (Timer t) {
      setState(() {
        if(curwid>1) {
          curwid = (curwid - (1 * (curwid*0.2).ceil())).ceilToDouble(); // 0.2 를 조절하면 시간에 따른 침식 속도를 조절할 수 있다 0.2는 정지하면 5초만에 속도 1됨
        }
        else {
          curwid=1;
        }
      });

    });
  }

  @override
  void dispose() {
    myFocusNode.dispose();
    controller.dispose();
    super.dispose();
  }

  Color backCol = const Color(0xFF80EEE8);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title,
          style: commonTextStyle.copyWith(fontWeight: FontWeight.bold, color: Colors.white)),
      ),
      body: LayoutBuilder(
          builder: (BuildContext context, BoxConstraints constraints) {
            return Container(
    color: backCol,
    child: Center(
        child: Container(
            width: constraints.maxWidth * 0.8,
            height: constraints.maxHeight * 0.75,
            color: Colors.white,
            child: Stack(
              children: <Widget>[
                Positioned(
                  top: 20,
                  left: 25,
                  child: SizedBox(
                    width: constraints.maxWidth * 0.75,
                    height: constraints.maxHeight * 0.7,
                    child: Text(
                      originText,
                      style: commonTextStyle,
                      softWrap: true,
                    ),
                  ),
                ),
                Positioned(
                  top: 22,
                  left: 25,
                  child: SizedBox(
                    width: constraints.maxWidth * 0.75,
                    height: constraints.maxHeight * 0.7,
                    child: TextField(
                      maxLengthEnforcement: MaxLengthEnforcement.none,
                      maxLines: null,
                      controller: controller,
                      autofocus: true,
                      focusNode: myFocusNode,
                      cursorWidth: curwid,
                      showCursor: true,
                      cursorColor: currCol,
                      cursorErrorColor: Colors.red,
                      cursorOpacityAnimates: false,
                      onChanged: (txt) {


                        setState(() {



                          if(txt.substring(0,controller.selection.baseOffset)==originText.substring(0,controller.selection.baseOffset) &&
                              txt.substring(0,txt.length)==originText.substring(0,txt.length)
                          )

                          {
                            _calculateTypingSpeed(txt);
                            resp = true;
                            currCol = Colors.black;
                            if(curwid<150) {
                              curwid = curwid + _typingSpeed / 100;
                            }
                            if(deducedText.length>txt.length) {
                              _typingSpeed=0.0;
                              resp= false;
                              currCol = Colors.teal;
                            }
                            text=text.substring(1,text.length);
                            controller.text=text;
                            originText=originText.substring(1,originText.length);

                          }

                          else {
                            _typingSpeed=0.0;
                            resp= false;
                            currCol = Colors.red;
                            // text=text.substring(0,text.length -1);
                            // controller.text=text;
                          }

                          if(resp==false) {
                            curwid=1;
                          }

                          backCol = Color((Random().nextInt(0xFFFFFF)).toInt()).withOpacity(1.0);
                          deducedText = txt;

                        });
                      },
                      decoration: const InputDecoration(
                          border: InputBorder.none,
                          contentPadding: EdgeInsets.symmetric(vertical: 0.0),
                          isCollapsed: true
                      ),
                      style: commonTextStyle.copyWith(color: currCol)
                    ),
                  ),
                ),
/*
          Positioned(
                  top: 102,
                  left: 70,
                  child: SizedBox(
                    width: 500,
                    height: 200,
                    child: Text('speed: $curwid \n bool: $resp\n  text: $text\n ori: $originText\n deu: $deducedText \n $_typingSpeed'),
                  ),
                ),
                */

              ],
            ),
          ),

      ),
      ); }),
    );
  }
}
