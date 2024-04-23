import 'package:flutter/material.dart';
import 'dart:math';
import 'dart:async';
import 'package:url_launcher/url_launcher.dart';

import 'package:flutter/services.dart';

/*
- 웹 앱에 adsense 붙이는 방법
- 커뮤니티(설명글), typeodd 설명글, html meta 데이터 입력, github pages 배포, 각종 SNS에 올리기
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

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

List<String> blogText = [
  'Call me Ishmael. Some years ago never mind how long precisely having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people\'s hats off then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.',
  'History which is derived from written materials must necessarily begin only where civilisation has advanced to so ripe a state, that the songs of the bard, and the traditions of the priest, have ceased to satisfy the cravings of the human mind for mastery over the past and the future. It has been too generally assumed that history is an inconceivable thing independent of written materials. Historians have accordingly, with a transient and incredulous glance at the fabulous infancy of nations, been too frequently content to leave their annals imperfect and maimed of those chapters that should record the deeply interesting story of their origin and rise. This mode of dealing with history is happily no longer sanctioned by the example of the ablest of its modern investigators. They are at length learning to analyze the myths which their predecessors rejected; and the results have already rewarded their toil, though much still remains obscure, or utterly unknown.',
  'As the circumstances of his marriage illustrate his character, I cannot refrain from relating them. One of his most intimate friends was a merchant who, from a flourishing state, fell, through numerous mischances, into poverty. This man, whose name was Beaufort, was of a proud and unbending disposition and could not bear to live in poverty and oblivion in the same country where he had formerly been distinguished for his rank and magnificence. Having paid his debts, therefore, in the most honourable manner, he retreated with his daughter to the town of Lucerne, where he lived unknown and in wretchedness. My father loved Beaufort with the truest friendship and was deeply grieved by his retreat in these unfortunate circumstances. He bitterly deplored the false pride which led his friend to a conduct so little worthy of the affection that united them. He lost no time in endeavouring to seek him out, with the hope of persuading him to begin the world again through his credit and assistance.',
  'From Italy they visited Germany and France. I, their eldest child, was born at Naples, and as an infant accompanied them in their rambles. I remained for several years their only child. Much as they were attached to each other, they seemed to draw inexhaustible stores of affection from a very mine of love to bestow them upon me. My mother\'s tender caresses and my father\'s smile of benevolent pleasure while regarding me are my first recollections. I was their plaything and their idol, and something better their child, the innocent and helpless creature bestowed on them by Heaven, whom to bring up to good, and whose future lot it was in their hands to direct to happiness or misery, according as they fulfilled their duties towards me. With this deep consciousness of what they owed towards the being to which they had given life, added to the active spirit of tenderness that animated both, it may be imagined that while during every hour of my infant life I received a lesson of patience, of charity, and of self control, I was so guided by a silken cord that all seemed but one train of enjoyment to me.',
  'Nor were these my only visions. The raising of ghosts or devils was a promise liberally accorded by my favourite authors, the fulfilment of which I most eagerly sought; and if my incantations were always unsuccessful, I attributed the failure rather to my own inexperience and mistake than to a want of skill or fidelity in my instructors. And thus for a time I was occupied by exploded systems, mingling, like an unadept, a thousand contradictory theories and floundering desperately in a very slough of multifarious knowledge, guided by an ardent imagination and childish reasoning, till an accident again changed the current of my ideas.',
  'Though I cannot tell why it was exactly that those stage managers, the Fates, put me down for this shabby part of a whaling voyage, when others were set down for magnificent parts in high tragedies, and short and easy parts in genteel comedies, and jolly parts in farces though I cannot tell why this was exactly; yet, now that I recall all the circumstances, I think I can see a little into the springs and motives which being cunningly presented to me under various disguises, induced me to set about performing the part I did, besides cajoling me into the delusion that it was a choice resulting from my own unbiased freewill and discriminating judgment.',
  'So far as what there may be of a narrative in this book; and, indeed, as indirectly touching one or two very interesting and curious particulars in the habits of sperm whales, the foregoing chapter, in its earlier part, is as important a one as will be found in this volume; but the leading matter of it requires to be still further and more familiarly enlarged upon, in order to be adequately understood, and moreover to take away any incredulity which a profound ignorance of the entire subject may induce in some minds, as to the natural verity of the main points of this affair.',
  'But this is not all. New Zealand Tom and Don Miguel, after at various times creating great havoc among the boats of different vessels, were finally gone in quest of, systematically hunted out, chased and killed by valiant whaling captains, who heaved up their anchors with that express object as much in view, as in setting out through the Narragansett Woods, Captain Butler of old had it in his mind to capture that notorious murderous savage Annawon, the headmost warrior of the Indian King Philip.',
  'Secondly: People ashore have indeed some indefinite idea that a whale is an enormous creature of enormous power; but I have ever found that when narrating to them some specific example of this two fold enormousness, they have significantly complimented me upon my facetiousness; when, I declare upon my soul, I had no more idea of being facetious than Moses, when he wrote the history of the plagues of Egypt.',
  'But fortunately the special point I here seek can be established upon testimony entirely independent of my own. That point is this: The Sperm Whale is in some cases sufficiently powerful, knowing, and judiciously malicious, as with direct aforethought to stave in, utterly destroy, and sink a large ship; and what is more, the Sperm Whale has done it.',
  'It was hardly a year since they had come to live at Tipton Grange with their uncle, a man nearly sixty, of acquiescent temper, miscellaneous opinions, and uncertain vote. He had travelled in his younger years, and was held in this part of the county to have contracted a too rambling habit of mind. Mr. Brooke\'s conclusions were as difficult to predict as the weather: it was only safe to say that he would act with benevolent intentions, and that he would spend as little money as possible in carrying them out. For the most glutinously indefinite minds enclose some hard grains of habit; and a man has been seen lax about all his own interests except the retention of his snuff box, concerning which he was watchful, suspicious, and greedy of clutch.',
  'So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.',
  'Suddenly she came upon a little three legged table, all made of solid glass; there was nothing on it except a tiny golden key, and Alice\'s first thought was that it might belong to one of the doors of the hall; but, alas! either the locks were too large, or the key was too small, but at any rate it would not open any of them. However, on the second time round, she came upon a low curtain she had not noticed before, and behind it was a little door about fifteen inches high: she tried the little golden key in the lock, and to her great delight it fitted!',
  'After a while, finding that nothing more happened, she decided on going into the garden at once; but, alas for poor Alice! when she got to the door, she found she had forgotten the little golden key, and when she went back to the table for it, she found she could not possibly reach it: she could see it quite plainly through the glass, and she tried her best to climb up one of the legs of the table, but it was too slippery; and when she had tired herself out with trying, the poor little thing sat down and cried.',
  'His life falls naturally into three periods, each of which singularly enough constitutes a distinct and important era in the history of Florence. His youth was concurrent with the greatness of Florence as an Italian power under the guidance of Lorenzo de\' Medici, Il Magnifico. The downfall of the Medici in Florence occurred in 1494, in which year Machiavelli entered the public service. During his official career Florence was free under the government of a Republic, which lasted until 1512, when the Medici returned to power, and Machiavelli lost his office. The Medici again ruled Florence from 1512 until 1527, when they were once more driven out. This was the period of Machiavelli\'s literary activity and increasing influence; but he died, within a few weeks of the expulsion of the Medici, on 22nd June 1527, in his fifty-eighth year, without having regained office.',
  'Mrs. Rachel Lynde lived just where the Avonlea main road dipped down into a little hollow, fringed with alders and ladies\' eardrops and traversed by a brook that had its source away back in the woods of the old Cuthbert place; it was reputed to be an intricate, headlong brook in its earlier course through those woods, with dark secrets of pool and cascade; but by the time it reached Lynde\'s Hollow it was a quiet, well conducted little stream, for not even a brook could run past Mrs. Rachel Lynde\'s door without due regard for decency and decorum; it probably was conscious that Mrs. Rachel was sitting at her window, keeping a sharp eye on everything that passed, from brooks and children up, and that if she noticed anything odd or out of place she would never rest until she had ferreted out the whys and wherefores thereof.',
  'In the year 1878 I took my degree of Doctor of Medicine of the University of London, and proceeded to Netley to go through the course prescribed for surgeons in the army. Having completed my studies there, I was duly attached to the Fifth Northumberland Fusiliers as Assistant Surgeon. The regiment was stationed in India at the time, and before I could join it, the second Afghan war had broken out. On landing at Bombay, I learned that my corps had advanced through the passes, and was already deep in the enemy\'s country. I followed, however, with many other officers who were in the same situation as myself, and succeeded in reaching Candahar in safety, where I found my regiment, and at once entered upon my new duties.',
  'quire Trelawney, Dr. Livesey, and the rest of these gentlemen having asked me to write down the whole particulars about Treasure Island, from the beginning to the end, keeping nothing back but the bearings of the island, and that only because there is still treasure not yet lifted, I take up my pen in the year of grace 17, and go back to the time when my father kept the Admiral Benbow inn and the brown old seaman with the sabre cut first took up his lodging under our roof.',
  'Almustafa, the chosen and the beloved, who was a dawn unto his own day, had waited twelve years in the city of Orphalese for his ship that was to return and bear him back to the isle of his birth. And in the twelfth year, on the seventh day of Ielool, the month of reaping, he climbed the hill without the city walls and looked seaward; and he beheld his ship coming with the mist. Then the gates of his heart were flung open, and his joy flew far over the sea. And he closed his eyes and prayed in the silences of his soul.',
  'Sixteen years had Miss Taylor been in Mr. Woodhouse\'s family, less as a governess than a friend, very fond of both daughters, but particularly of Emma. Between them it was more the intimacy of sisters. Even before Miss Taylor had ceased to hold the nominal office of governess, the mildness of her temper had hardly allowed her to impose any restraint; and the shadow of authority being now long passed away, they had been living together as friend and friend very mutually attached, and Emma doing just what she liked; highly esteeming Miss Taylor\'s judgment, but directed chiefly by her own.'
];

int textNum = 0;

class _MyHomePageState extends State<MyHomePage> {

  TextStyle commonTextStyle = const TextStyle(
    letterSpacing: 2.0,
    fontSize: 16,
    color: Colors.black54
  );

  int oddScore = 0;

  final TextEditingController controller = TextEditingController();

  String text ='';

  late FocusNode myFocusNode;

  String originText = '';
  String deducedText = '';
  bool? resp;


  Color currCol = Colors.black54;


  DateTime? _lastKeystroke;

  double _typingSpeed = 0;



  Color backCol = const Color(0xFF80EEE8);

  int oddCalc = 0;

  double curwid = 1;

  void _calculateTypingSpeed(String value) {
    final now = DateTime.now();
    if (_lastKeystroke != null) {
      final difference = now.difference(_lastKeystroke!).inMilliseconds;
      _typingSpeed = 60000 / difference; // 타이핑 속도를 분당 타이핑 수로 계산
    }
    _lastKeystroke = now;
  }

  Future<void> _launchUrl() async {
    final Uri url = Uri.parse('https://www.reddit.com/r/waytoeurekamoment/comments/1cau04b/typeodd_type_faster_than_anxiety');
    if (!await launchUrl(url)) {
      throw Exception('Could not launch $url');
    }
  }

  @override
  void initState() {
    super.initState();
    textNum=Random().nextInt(blogText.length);
    myFocusNode = FocusNode();
    controller.addListener(() {
      text = controller.value.text;
    });

    originText = blogText[textNum];

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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title,
          style: commonTextStyle.copyWith(fontWeight: FontWeight.bold, color: Colors.white)),
        leading:
        const Icon(Icons.text_rotation_angleup, color: Colors.black,),
        actions: [
        IconButton(
            icon: const Icon(Icons.help_outline),
            tooltip: 'way to Eureka Moment',
            color: Colors.white,
            onPressed: () {
              _launchUrl();
              FocusScope.of(context).requestFocus(myFocusNode);
            }
        ),],
      ),
      body: LayoutBuilder(
          builder: (BuildContext context, BoxConstraints constraints) {
            return Container(
    color: backCol,
    child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: constraints.maxWidth * 0.8,
              height: 40,
              color: Colors.transparent,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  oddCalc==0 || originText.isEmpty ?
                  Text(
                    oddScore.toString(),
                    style: commonTextStyle.copyWith(color: Colors.white),
                  ) : oddCalc>0 ? Text(
                    '${oddScore.toString()} (+$oddCalc)',
                    style: commonTextStyle.copyWith(color: Colors.white),
                  ): Text(
                    '${oddScore.toString()} ($oddCalc)',
                    style: commonTextStyle.copyWith(color: Colors.white),
                  ),
                  Row(
                    children: [
                      originText.isEmpty ? IconButton(
                        icon: const Icon(Icons.repeat_outlined),
                        tooltip: 'repeat',
                        color: Colors.white,
                        onPressed: () {
                          setState(() {
                            originText = blogText[textNum];
                            oddScore = 0;
                            String text ='';
                            deducedText = '';
                            resp = null;
                            currCol = Colors.black54;
                            _typingSpeed = 0;
                            backCol = const Color(0xFF80EEE8);
                            oddCalc = 0;
                            curwid = 1;
                            FocusScope.of(context).requestFocus(myFocusNode);
                          });
                        },
                      ) : const Text(''),
                      IconButton(
                        icon: const Icon(Icons.arrow_right_alt_outlined),
                        tooltip: 'next',
                        color: Colors.white,
                        onPressed: () {
                          setState(() {
                            String getRandomText(List<String> bText, int Num) {
                              int textNumCom = Random().nextInt(blogText.length);
                              if (Num != textNumCom) {
                                textNum=textNumCom;
                                return blogText[textNumCom];
                              } else {
                                return getRandomText(bText, textNumCom);
                              }
                            }
                            originText = getRandomText(blogText, textNum);
                            oddScore = 0;
                            String text ='';
                            deducedText = '';
                            resp = null;
                            currCol = Colors.black54;
                            _typingSpeed = 0;
                            backCol = const Color(0xFF80EEE8);
                            oddCalc = 0;
                            curwid = 1;
                            FocusScope.of(context).requestFocus(myFocusNode);
                          });
                        },
                      ),
                    ],
                  ),
                ],
              ),
            ),
            Container(
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

                                    oddScore=oddScore+curwid.toInt();
                                    oddCalc=curwid.toInt();
                                  }

                                  else {
                                    _typingSpeed=0.0;
                                    resp= false;
                                    currCol = Colors.red;
                                    if((oddScore-(curwid.toInt()*10))>0) {
                                      oddScore = oddScore - (curwid.toInt() * 10);
                                      oddCalc=-(curwid.toInt()*10);
                                    } else {
                                      oddCalc=-oddScore;
                                      oddScore=0;
                                    }
                                  }

                                  if(resp==false) {
                                    curwid=1;
                                  }

                                  backCol = Color((Random().nextInt(0xFFFFFF)).toInt()).withOpacity(1.0);
                                  deducedText = txt;

                                  if(originText.isEmpty) {
                                    myFocusNode.unfocus();
                                  }

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
                  ],
                ),
              ),
            Container(
              width: constraints.maxWidth * 0.8,
              height: 40,
              color: Colors.transparent,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  originText.isNotEmpty ?
                  Text(
                    'Type faster than anxiety',
                    style: commonTextStyle.copyWith(color: Colors.white),
                  ) : Text(
                    'Explore power beyond anxiety',
                    style: commonTextStyle.copyWith(color: Colors.white),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      ); }),
    );
  }
}
