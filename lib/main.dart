import 'package:flutter/material.dart';
import 'dart:math';
import 'dart:async';
import 'package:flutter/services.dart';
import 'package:soundpool/soundpool.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:url_launcher/url_launcher.dart';
import 'firebase_options.dart';
import 'package:hive/hive.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:share_plus/share_plus.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

late FirebaseFirestore db;
late Box box;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  db = FirebaseFirestore.instance;
  try {
    await FirebaseAuth.instance.signInAnonymously();
  } on FirebaseAuthException catch (e) {
    switch (e.code) {
      case "operation-not-allowed":
        break;
      default:
    }
  }
  box = await Hive.openBox('typeoddBox');
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
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF717075)),
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

Map<String, String> blogText = {
  'Ishmael':
  'Call me Ishmael. Some years ago never mind how long precisely having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people\'s hats off then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.',
  'History':
  'History which is derived from written materials must necessarily begin only where civilisation has advanced to so ripe a state, that the songs of the bard, and the traditions of the priest, have ceased to satisfy the cravings of the human mind for mastery over the past and the future. It has been too generally assumed that history is an inconceivable thing independent of written materials. Historians have accordingly, with a transient and incredulous glance at the fabulous infancy of nations, been too frequently content to leave their annals imperfect and maimed of those chapters that should record the deeply interesting story of their origin and rise. This mode of dealing with history is happily no longer sanctioned by the example of the ablest of its modern investigators. They are at length learning to analyze the myths which their predecessors rejected; and the results have already rewarded their toil, though much still remains obscure, or utterly unknown.',
  'Marriage':
  'As the circumstances of his marriage illustrate his character, I cannot refrain from relating them. One of his most intimate friends was a merchant who, from a flourishing state, fell, through numerous mischances, into poverty. This man, whose name was Beaufort, was of a proud and unbending disposition and could not bear to live in poverty and oblivion in the same country where he had formerly been distinguished for his rank and magnificence. Having paid his debts, therefore, in the most honourable manner, he retreated with his daughter to the town of Lucerne, where he lived unknown and in wretchedness. My father loved Beaufort with the truest friendship and was deeply grieved by his retreat in these unfortunate circumstances. He bitterly deplored the false pride which led his friend to a conduct so little worthy of the affection that united them. He lost no time in endeavouring to seek him out, with the hope of persuading him to begin the world again through his credit and assistance.',
  'Naples':
  'From Italy they visited Germany and France. I, their eldest child, was born at Naples, and as an infant accompanied them in their rambles. I remained for several years their only child. Much as they were attached to each other, they seemed to draw inexhaustible stores of affection from a very mine of love to bestow them upon me. My mother\'s tender caresses and my father\'s smile of benevolent pleasure while regarding me are my first recollections. I was their plaything and their idol, and something better their child, the innocent and helpless creature bestowed on them by Heaven, whom to bring up to good, and whose future lot it was in their hands to direct to happiness or misery, according as they fulfilled their duties towards me. With this deep consciousness of what they owed towards the being to which they had given life, added to the active spirit of tenderness that animated both, it may be imagined that while during every hour of my infant life I received a lesson of patience, of charity, and of self control, I was so guided by a silken cord that all seemed but one train of enjoyment to me.',
  'Visions':
  'Nor were these my only visions. The raising of ghosts or devils was a promise liberally accorded by my favourite authors, the fulfilment of which I most eagerly sought; and if my incantations were always unsuccessful, I attributed the failure rather to my own inexperience and mistake than to a want of skill or fidelity in my instructors. And thus for a time I was occupied by exploded systems, mingling, like an unadept, a thousand contradictory theories and floundering desperately in a very slough of multifarious knowledge, guided by an ardent imagination and childish reasoning, till an accident again changed the current of my ideas.',
  'Fates':
  'Though I cannot tell why it was exactly that those stage managers, the Fates, put me down for this shabby part of a whaling voyage, when others were set down for magnificent parts in high tragedies, and short and easy parts in genteel comedies, and jolly parts in farces though I cannot tell why this was exactly; yet, now that I recall all the circumstances, I think I can see a little into the springs and motives which being cunningly presented to me under various disguises, induced me to set about performing the part I did, besides cajoling me into the delusion that it was a choice resulting from my own unbiased freewill and discriminating judgment.',
  'Book':
  'So far as what there may be of a narrative in this book; and, indeed, as indirectly touching one or two very interesting and curious particulars in the habits of sperm whales, the foregoing chapter, in its earlier part, is as important a one as will be found in this volume; but the leading matter of it requires to be still further and more familiarly enlarged upon, in order to be adequately understood, and moreover to take away any incredulity which a profound ignorance of the entire subject may induce in some minds, as to the natural verity of the main points of this affair.',
  'Miguel':
  'But this is not all. New Zealand Tom and Don Miguel, after at various times creating great havoc among the boats of different vessels, were finally gone in quest of, systematically hunted out, chased and killed by valiant whaling captains, who heaved up their anchors with that express object as much in view, as in setting out through the Narragansett Woods, Captain Butler of old had it in his mind to capture that notorious murderous savage Annawon, the headmost warrior of the Indian King Philip.',
  'Creature':
  'Secondly: People ashore have indeed some indefinite idea that a whale is an enormous creature of enormous power; but I have ever found that when narrating to them some specific example of this two fold enormousness, they have significantly complimented me upon my facetiousness; when, I declare upon my soul, I had no more idea of being facetious than Moses, when he wrote the history of the plagues of Egypt.',
  'Testimony':
  'But fortunately the special point I here seek can be established upon testimony entirely independent of my own. That point is this: The Sperm Whale is in some cases sufficiently powerful, knowing, and judiciously malicious, as with direct aforethought to stave in, utterly destroy, and sink a large ship; and what is more, the Sperm Whale has done it.',
  'Year':
  'It was hardly a year since they had come to live at Tipton Grange with their uncle, a man nearly sixty, of acquiescent temper, miscellaneous opinions, and uncertain vote. He had travelled in his younger years, and was held in this part of the county to have contracted a too rambling habit of mind. Mr. Brooke\'s conclusions were as difficult to predict as the weather: it was only safe to say that he would act with benevolent intentions, and that he would spend as little money as possible in carrying them out. For the most glutinously indefinite minds enclose some hard grains of habit; and a man has been seen lax about all his own interests except the retention of his snuff box, concerning which he was watchful, suspicious, and greedy of clutch.',
  'Mind':
  'So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.',
  'Table':
  'Suddenly she came upon a little three legged table, all made of solid glass; there was nothing on it except a tiny golden key, and Alice\'s first thought was that it might belong to one of the doors of the hall; but, alas! either the locks were too large, or the key was too small, but at any rate it would not open any of them. However, on the second time round, she came upon a low curtain she had not noticed before, and behind it was a little door about fifteen inches high: she tried the little golden key in the lock, and to her great delight it fitted!',
  'Garden':
  'After a while, finding that nothing more happened, she decided on going into the garden at once; but, alas for poor Alice! when she got to the door, she found she had forgotten the little golden key, and when she went back to the table for it, she found she could not possibly reach it: she could see it quite plainly through the glass, and she tried her best to climb up one of the legs of the table, but it was too slippery; and when she had tired herself out with trying, the poor little thing sat down and cried.',
  'Periods':
  'His life falls naturally into three periods, each of which singularly enough constitutes a distinct and important era in the history of Florence. His youth was concurrent with the greatness of Florence as an Italian power under the guidance of Lorenzo de\' Medici, Il Magnifico. The downfall of the Medici in Florence occurred in 1494, in which year Machiavelli entered the public service. During his official career Florence was free under the government of a Republic, which lasted until 1512, when the Medici returned to power, and Machiavelli lost his office. The Medici again ruled Florence from 1512 until 1527, when they were once more driven out. This was the period of Machiavelli\'s literary activity and increasing influence; but he died, within a few weeks of the expulsion of the Medici, on 22nd June 1527, in his fifty-eighth year, without having regained office.',
  'Avonlea':
  'Mrs. Rachel Lynde lived just where the Avonlea main road dipped down into a little hollow, fringed with alders and ladies\' eardrops and traversed by a brook that had its source away back in the woods of the old Cuthbert place; it was reputed to be an intricate, headlong brook in its earlier course through those woods, with dark secrets of pool and cascade; but by the time it reached Lynde\'s Hollow it was a quiet, well conducted little stream, for not even a brook could run past Mrs. Rachel Lynde\'s door without due regard for decency and decorum; it probably was conscious that Mrs. Rachel was sitting at her window, keeping a sharp eye on everything that passed, from brooks and children up, and that if she noticed anything odd or out of place she would never rest until she had ferreted out the whys and wherefores thereof.',
  'Doctor':
  'In the year 1878 I took my degree of Doctor of Medicine of the University of London, and proceeded to Netley to go through the course prescribed for surgeons in the army. Having completed my studies there, I was duly attached to the Fifth Northumberland Fusiliers as Assistant Surgeon. The regiment was stationed in India at the time, and before I could join it, the second Afghan war had broken out. On landing at Bombay, I learned that my corps had advanced through the passes, and was already deep in the enemy\'s country. I followed, however, with many other officers who were in the same situation as myself, and succeeded in reaching Candahar in safety, where I found my regiment, and at once entered upon my new duties.',
  'Livesey':
  'quire Trelawney, Dr. Livesey, and the rest of these gentlemen having asked me to write down the whole particulars about Treasure Island, from the beginning to the end, keeping nothing back but the bearings of the island, and that only because there is still treasure not yet lifted, I take up my pen in the year of grace 17, and go back to the time when my father kept the Admiral Benbow inn and the brown old seaman with the sabre cut first took up his lodging under our roof.',
  'Almustafa':
  'Almustafa, the chosen and the beloved, who was a dawn unto his own day, had waited twelve years in the city of Orphalese for his ship that was to return and bear him back to the isle of his birth. And in the twelfth year, on the seventh day of Ielool, the month of reaping, he climbed the hill without the city walls and looked seaward; and he beheld his ship coming with the mist. Then the gates of his heart were flung open, and his joy flew far over the sea. And he closed his eyes and prayed in the silences of his soul.',
  'Woodhouse':
  'Sixteen years had Miss Taylor been in Mr. Woodhouse\'s family, less as a governess than a friend, very fond of both daughters, but particularly of Emma. Between them it was more the intimacy of sisters. Even before Miss Taylor had ceased to hold the nominal office of governess, the mildness of her temper had hardly allowed her to impose any restraint; and the shadow of authority being now long passed away, they had been living together as friend and friend very mutually attached, and Emma doing just what she liked; highly esteeming Miss Taylor\'s judgment, but directed chiefly by her own.',
  'Practice':
  'the quick brown fox jumps over the lazy dog. this sentence is often used for typing practice since it contains every letter of the alphabet. typing can be a useful skill in many different situations, whether you\'re a student writing a paper, a job applicant creating a resume, or a professional drafting an email. it\'s important to practice regularly to improve your speed and accuracy.',
  'Knight':
  'once upon a time, in a land far, far away, there lived a brave knight and a beautiful princess. the knight was always going on adventures and fighting dragons, while the princess stayed in the castle, dreaming of the world outside. one day, the knight returned from his latest adventure with a magical golden apple. he gave it to the princess, who took a bite and was instantly transported to a magical forest.',
  'Bookstore':
  'in the heart of the city, there was a small, unassuming bookstore. it was filled from floor to ceiling with books of all kinds - novels, biographies, cookbooks, and more. the owner of the bookstore was an old man who loved nothing more than to read. he would spend his days surrounded by books, happily lost in the worlds they contained. it was the perfect life for a book lover like him.',
  'Beach':
  'the sun was setting, casting long shadows across the beach. the waves gently lapped at the shore, creating a soothing rhythm that echoed in the quiet evening. a lone figure walked along the water\'s edge, leaving footprints in the wet sand. she stopped to pick up a seashell, holding it up to her ear to listen to the sound of the ocean. it was a moment of peace in a chaotic world.',
  'Forest':
  'the forest was alive with the sounds of nature. birds chirped in the trees, their songs echoing through the dense foliage. a squirrel scampered up a tree trunk, its bushy tail flicking as it disappeared into the leaves. a deer grazed peacefully in a clearing, its ears twitching at every sound. it was a scene of pure, untouched nature, a reminder of the beauty that exists in the world.',
  'Music':
  'music has the power to move us, to stir our emotions and awaken our senses. a simple melody can bring back a flood of memories, while a complex symphony can take us on a journey of musical discovery. whether it\'s a catchy pop song, a soulful blues tune, or a powerful classical piece, music speaks to us on a level that words alone cannot reach.',
  'Technology':
  'the world of technology is constantly evolving, with new innovations and discoveries being made every day. from the smartphones in our pockets to the satellites orbiting our planet, technology has transformed the way we live our lives. it has made communication easier, information more accessible, and entertainment more enjoyable. but with these advancements come challenges and responsibilities that we must be prepared to face.',
  'Traveling':
  'traveling is a wonderful way to experience new cultures, meet new people, and broaden your horizons. whether you\'re exploring a bustling city, hiking in the mountains, or relaxing on a tropical beach, every travel experience is unique. it\'s not just about the places you go, but also the people you meet and the memories you make along the way. so pack your bags and set off on your next adventure.',
  'Art':
  'art is a form of expression, a way for individuals to communicate their thoughts, feelings, and ideas. it can take many forms, from painting and sculpture to music and dance. art can inspire, provoke, and challenge us. it can make us see the world in a new light, or give us insight into the human condition. art is a reflection of who we are, and a testament to our creativity and imagination.',
  'Universe':
  'the universe is a vast and mysterious place, filled with billions of galaxies, each containing billions of stars. we are just a tiny speck in the grand scheme of things, yet we have the ability to explore and understand the cosmos. through science and technology, we have been able to uncover some of the secrets of the universe, from the life cycle of stars to the existence of black holes. the more we learn, the more we realize how much there is still to discover.'
};

int textNum = 0;

int oddScore = 0;

String ranker = '';

List<dynamic> rankList = [];

class _MyHomePageState extends State<MyHomePage> {
  TextStyle commonTextStyle = const TextStyle(
      letterSpacing: 2.0, fontSize: 16, color: Color(0xFF4a484d));

  List data=[];
  List dataMeditation=[];
  List dataMedicine=[];

  final TextEditingController controller = TextEditingController();

  String text = '';

  late FocusNode myFocusNode;

  String originText = '';
  String originTitle = '';
  String deducedText = '';
  bool? resp;

  Color currCol = Colors.black54;

  DateTime? _lastKeystroke;

  double _typingSpeed = 0;

  int oddCalc = 0;

  double curwid = 1;

  int colSat = 0;

  String? userName;

  bool showHelp = false;

  void _calculateTypingSpeed(String value) {
    final now = DateTime.now();
    if (_lastKeystroke != null) {
      final difference = now.difference(_lastKeystroke!).inMilliseconds;
      _typingSpeed = 60000 / difference; // 타이핑 속도를 분당 타이핑 수로 계산
    }
    _lastKeystroke = now;
  }

  Soundpool? _pool;
  SoundpoolOptions _soundpoolOptions = const SoundpoolOptions();

  void _initPool(SoundpoolOptions soundpoolOptions) {
    _pool?.dispose();
    setState(() {
      _soundpoolOptions = soundpoolOptions;
      _pool = Soundpool.fromOptions(options: _soundpoolOptions);
    });
  }

  void _loadSounds() {
    _soundId = _loadSound();
    _cheeringId = _loadCheering();
  }

  @override
  void initState() {
    super.initState();
    Hive.openBox("typeoddBox");
    box = Hive.box("typeoddBox");
    userName = box.get("userName");
    _initPool(_soundpoolOptions);
    _loadSounds();
    textNum = Random().nextInt(blogText.length);
    myFocusNode = FocusNode();
    controller.addListener(() {
      text = controller.value.text;
    });

    originText = blogText.values.toList()[textNum];
    originTitle = blogText.keys.toList()[textNum];

    Timer.periodic(const Duration(seconds: 1), (Timer t) {
      setState(() {
        if (curwid > 1) {
          curwid = (curwid - (1 * (curwid * 0.25).ceil()))
              .ceilToDouble(); // 0.2 를 조절하면 시간에 따른 침식 속도를 조절할 수 있다 0.2는 정지하면 5초만에 속도 1됨
        } else {
          curwid = 1;
        }
      });
    });

    if (userName == null) {
      showHelp = true;
      db.collection("ranker").doc("total").get().then((value) {
        userName = Random().nextBool()
            ? "EUREKA_${value.data()?.values.firstOrNull}"
            : "AHA_${value.data()?.values.firstOrNull}";

        box.put("userName", userName);
        int total = value.data()?.values.firstOrNull as int;
        db.collection("ranker").doc("total").set({"total": total + 1});
      });
    } else {
      showHelp = false;
    }
    fetchData();
  }

  void fetchData() async {
    http.Response response = await http.get(Uri.parse("https://zendoclab.github.io/worksofzendoc.json"));
    if (response.statusCode == 200) {
      setState(() {
        data = json.decode(response.body);
        dataMeditation = data.where((element) => element["category"] == "meditation").toList();
        dataMedicine = data.where((element) => element["category"] == "medicine").toList();
      });
    } else {
      throw Exception('Failed to load data');
    }
  }

  @override
  void dispose() {
    myFocusNode.dispose();
    controller.dispose();
    _pool?.dispose();
    super.dispose();
  }

  final double _volume = 0.3;
  late Future<int?> _soundId;
  late Future<int?> _cheeringId;

  DateTime? now;
  String? nowTime;
  List<List<dynamic>> docuranker = [];

  Future<int?> _loadSound() async {
    return await _pool?.loadUri(
        "https://zendoclab.github.io/typeodd/assets/assets/sounds/typesound1.mp3");
  }

  Future<int?> _loadCheering() async {
    return await _pool?.loadUri(
        "https://zendoclab.github.io/typeodd/assets/assets/sounds/typesound2.mp3");
  }

  Future<void> _playSound() async {
    var alarmSound = await (Random().nextBool() ? _soundId : _cheeringId);
    _pool?.setVolume(soundId: alarmSound, volume: _volume);
    await _pool?.play(alarmSound!);
  }

  void getMinScoreDoc(String originT) async {
    now = DateTime.now();
    nowTime =
    "${now?.year}-${now?.month}-${now?.day} ${now?.hour}:${now?.minute}:${now?.second}";
    List<DocumentSnapshot> documents;

    QuerySnapshot querySnapshot1 = await db.collection(originT).get();
    if (querySnapshot1.size != 0) {
      documents = querySnapshot1.docs;

      List rankerRaw;
      if (documents[0]['ranker'].contains('&')) {
        rankerRaw = documents[0]['ranker'].split('&');
      } else {
        rankerRaw = [documents[0]['ranker']];
      }
      String lowestScoreRanker = rankerRaw[0].toString();
      for (dynamic ranker in rankerRaw) {
        List<dynamic> rankerSplit = ranker.split('|');
        docuranker.add([
          rankerSplit[0],
          int.parse(rankerSplit[1]),
          rankerSplit[2],
        ]);

        if (int.parse(rankerSplit[1]) <=
            int.parse(lowestScoreRanker.split('|')[1])) {
          lowestScoreRanker = ranker;
        }
      }

      int minScore = int.parse(lowestScoreRanker.split('|')[1]);

      String rankerTailed = '';

      if (documents.isEmpty || rankerRaw.length < 5) {
        db.collection(originT).doc(originT).update({
          "ranker": '${documents[0]['ranker']}&${userName!}|$oddScore|$nowTime'
        });
        docuranker.add([userName, oddScore, nowTime]);
      } else {
        if (minScore < oddScore) {
          rankerTailed = rankerRaw
              .where((x) => x != lowestScoreRanker)
              .toList()
              .map((e) => e)
              .join('&');

          db.collection(originT).doc(originT).update(
              {'ranker': '$rankerTailed&${userName!}|$oddScore|$nowTime'});

          docuranker.removeWhere((element) =>
          element[0] == lowestScoreRanker.split('|')[0].toString() &&
              element[2] == lowestScoreRanker.split('|')[2].toString());
          docuranker.add([userName, oddScore, nowTime]);
        } else {}
      }
      var sortedList = docuranker.map((e) => e).toList()
        ..sort((a, b) => b[1].compareTo(a[1]));
      // sortedList.map((e) => ranker = ranker + '${e.toString()}\n\n');

      setState(() {
        for (var e in sortedList) {
          ranker =
          '$ranker${e[1].toString()} (${e[0].toString()}) ${e[2].toString()}\n';
        }
      });

      docuranker = [];
      sortedList = [];
    } else {
      db
          .collection(originT)
          .doc(originT)
          .set({"ranker": '$userName|$oddScore|$nowTime'});
      docuranker.add([userName, oddScore, nowTime]);
      var sortedList = docuranker.map((e) => e).toList()
        ..sort((a, b) => b[1].compareTo(a[1]));
      setState(() {
        for (var e in sortedList) {
          ranker =
          '$ranker${e[1].toString()} (${e[0].toString()}) ${e[2].toString()}\n';
        }
      });

      docuranker = [];
      sortedList = [];
    }
  }

  final GlobalKey<ScaffoldState> _key = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _key,
      endDrawer: Drawer(
        backgroundColor: Colors.white.withOpacity(0.9),
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.only(
            topRight: Radius.circular(16.0),
            bottomRight: Radius.circular(16.0),
          ),
        ),
        elevation: 16.0,
        child: Column(
          children: [
            Expanded(
              child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16.0),
                  alignment: Alignment.bottomLeft,
                  color: Colors.white.withOpacity(0.90),
                  width: double.infinity,
                  child: Text("Meditation (${dataMeditation.length})")),
            ),
            Expanded(
              flex: 10,
              child: ListView.builder(
                padding: EdgeInsets.zero,
                itemCount: dataMeditation == null ? 0 : dataMeditation.length,
                itemBuilder: (BuildContext context, int index) {
                  return ListTile(
                      title: Text(dataMeditation[index]['title']),
                      subtitle: Text(dataMeditation[index]['description']),
                      trailing: const Icon(Icons.keyboard_arrow_right),
                      onTap: () async {
                        if (await canLaunchUrl(Uri.parse(dataMeditation[index]['link']))) {
                          await launchUrl(Uri.parse(dataMeditation[index]['link']));
                        } else {
                          throw 'Could not launch ${dataMeditation[index]['link']}';
                        }
                      }
                  );
                },
              ),
            ),
            Expanded(
              child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16.0),
                  alignment: Alignment.bottomLeft,
                  color: Colors.white.withOpacity(0.90),
                  width: double.infinity,
                  child: Text("Medicine (${dataMedicine.length})")),
            ),
            Expanded(
              flex: 10,
              child: ListView.builder(
                padding: EdgeInsets.zero,
                itemCount: dataMedicine == null ? 0 : dataMedicine.length,
                itemBuilder: (BuildContext context, int index) {
                  return ListTile(
                      title: Text(dataMedicine[index]['title']),
                      subtitle: Text(dataMedicine[index]['description']),
                      trailing: const Icon(Icons.keyboard_arrow_right),
                      onTap: () async {
                        if (await canLaunchUrl(Uri.parse(dataMedicine[index]['link']))) {
                          await launchUrl(Uri.parse(dataMedicine[index]['link']));
                        } else {
                          throw 'Could not launch ${dataMedicine[index]['link']}';
                        }
                      }
                  );
                },
              ),
            ),
          ],
        ),
      ),
      onEndDrawerChanged: (isOpen) {
        if(isOpen) {

        } else {
    FocusScope.of(context).requestFocus(myFocusNode);
        }
      },
      appBar: AppBar(
        backgroundColor: const Color(0xFF717075),
        title: Text(widget.title,
            style: commonTextStyle.copyWith(
                fontWeight: FontWeight.bold, color: Colors.white)),
        leading: const Tooltip(
          message: 'typing game as meditation',
          child: Icon(
            Icons.text_rotation_angleup,
            color: Colors.black,
          ),
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: IconButton(
                icon: Image.asset(
                  'images/zendoclogo-min.PNG',
                  fit: BoxFit.scaleDown,
                ),
                tooltip: 'works of zendoc',
                color: Colors.white,
                onPressed: () {
                  _key.currentState!.openEndDrawer();
                }),
          ),
        ],
      ),
      body: LayoutBuilder(
          builder: (BuildContext context, BoxConstraints constraints) {
            return Stack(
              children: [
                Positioned(
                  right: 0,
                  child: SizedBox(
                    width: constraints.maxWidth,
                    height: constraints.maxHeight,
                    child: FittedBox(
                        alignment: Alignment.center,
                        fit: BoxFit.cover,
                        child: Text(originText,
                            style: commonTextStyle.copyWith(color: currCol))),
                  ),
                ),
                Container(
                  color: const Color(0xFFc4c2c7).withOpacity(0.7),
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          width: constraints.maxWidth * 0.8,
                          height: constraints.maxHeight * 0.1,
                          color: Colors.transparent,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: <Widget>[
                              Expanded(
                                flex: 1,
                                child: oddCalc == 0 || originText.isEmpty
                                    ? Text(
                                  userName != null
                                      ? '${oddScore.toString()} ($userName)'
                                      : oddScore.toString(),
                                  style: commonTextStyle,
                                )
                                    : oddCalc > 0
                                    ? Text(
                                  '${oddScore.toString()} (+$oddCalc)',
                                  style: commonTextStyle,
                                )
                                    : Text(
                                  '${oddScore.toString()} ($oddCalc)',
                                  style: commonTextStyle,
                                ),
                              ),
                              Expanded(
                                  flex: 1,
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.end,
                                    children: [
                                      Text(
                                        originTitle,
                                        style: commonTextStyle,
                                      ),
                                      originText.isEmpty || colSat > 230
                                          ? IconButton(
                                        icon:
                                        const Icon(Icons.repeat_outlined),
                                        tooltip: 'repeat',
                                        color: const Color(0xFF4a484d),
                                        onPressed: () {
                                          setState(() {
                                            originText = blogText.values
                                                .toList()[textNum];
                                            originTitle = blogText.keys
                                                .toList()[textNum];
                                            controller.clear();
                                            colSat = 0;
                                            oddScore = 0;
                                            text = '';
                                            deducedText = '';
                                            resp = null;
                                            currCol = Colors.black54;
                                            _typingSpeed = 0;
                                            oddCalc = 0;
                                            curwid = 1;
                                            ranker = '';
                                            FocusScope.of(context)
                                                .requestFocus(myFocusNode);
                                          });
                                        },
                                      )
                                          : Container(),
                                      IconButton(
                                        icon: const Icon(
                                            Icons.arrow_right_alt_outlined),
                                        tooltip: 'next',
                                        color: const Color(0xFF4a484d),
                                        onPressed: () {
                                          setState(() {
                                            controller.clear();
                                            colSat = 0;
                                            String getRandomText(
                                                List<String> bText, int bNum) {
                                              int textNumCom =
                                              Random().nextInt(blogText.length);
                                              if (bNum != textNumCom) {
                                                textNum = textNumCom;
                                                originTitle = blogText.keys
                                                    .toList()[textNumCom];
                                                return blogText.values
                                                    .toList()[textNumCom];
                                              } else {
                                                return getRandomText(
                                                    bText, textNumCom);
                                              }
                                            }

                                            originText = getRandomText(
                                                blogText.values.toList(), textNum);
                                            oddScore = 0;
                                            text = '';
                                            deducedText = '';
                                            resp = null;
                                            currCol = Colors.black54;
                                            _typingSpeed = 0;
                                            oddCalc = 0;
                                            curwid = 1;
                                            ranker = '';
                                            FocusScope.of(context)
                                                .requestFocus(myFocusNode);
                                          });
                                        },
                                      ),
                                    ],
                                  )),
                            ],
                          ),
                        ),
                        Container(
                          width: constraints.maxWidth * 0.8,
                          height: constraints.maxHeight * 0.6,
                          color: const Color(0xFFF1E4E8).withAlpha(220),
                          child: Stack(
                            children: <Widget>[
                              Positioned(
                                top: 16,
                                left: 16,
                                child: SizedBox(
                                  width: constraints.maxWidth * 0.75,
                                  height: constraints.maxHeight * 0.7,
                                  child: Text(
                                    ranker.isEmpty
                                        ? originText
                                        : 'Hall of Fame ($originTitle)\n\n$ranker',
                                    style: commonTextStyle,
                                    softWrap: true,
                                    overflow: TextOverflow.clip,
                                  ),
                                ),
                              ),
                              Positioned(
                                top: 0,
                                left: 0,
                                child: SizedBox(
                                  width: constraints.maxWidth * 0.8,
                                  height: constraints.maxHeight * 0.75,
                                  child: Container(
                                    color: Colors.white.withAlpha(colSat),
                                  ),
                                ),
                              ),
                              Positioned(
                                top: 18,
                                left: 16,
                                child: SizedBox(
                                  width: constraints.maxWidth * 0.75,
                                  height: constraints.maxHeight * 0.7,
                                  child: TextField(
                                      maxLengthEnforcement:
                                      MaxLengthEnforcement.none,
                                      maxLines: null,
                                      controller: controller,
                                      autofocus: true,
                                      focusNode: myFocusNode,
                                      cursorWidth: curwid < 2 ? 1 : curwid * 1.5,
                                      showCursor: true,
                                      cursorColor: curwid > 39
                                          ? const Color.fromARGB(245, 100, 100, 100)
                                          : const Color.fromARGB(
                                          245, 180, 180, 180),
                                      cursorErrorColor: Colors.red,
                                      cursorOpacityAnimates: false,
                                      onChanged: (txt) {
                                        setState(() {
                                          if (txt.isNotEmpty &&
                                              txt.substring(
                                                  0,
                                                  controller
                                                      .selection.baseOffset) ==
                                                  originText.substring(
                                                      0,
                                                      controller
                                                          .selection.baseOffset) &&
                                              txt.substring(0, txt.length) ==
                                                  originText.substring(
                                                      0, txt.length)) {
                                            _playSound();

                                            _calculateTypingSpeed(txt);
                                            resp = true;
                                            currCol = Color(
                                                (Random().nextInt(0xFFFFFF))
                                                    .toInt())
                                                .withOpacity(0.95);
                                            if (curwid < 250) {
                                              curwid = curwid + _typingSpeed / 100;
                                            }
                                            if (deducedText.length > txt.length) {
                                              _typingSpeed = 0.0;
                                              resp = false;
                                              currCol = Colors.teal;
                                            }
                                            text = text.substring(1, text.length);
                                            controller.text = text;
                                            originText = originText.substring(
                                                1, originText.length);

                                            oddScore =
                                                oddScore + (curwid / 10).ceil();
                                            oddCalc = (curwid / 10).ceil();
                                          } else {
                                            _typingSpeed = 0.0;
                                            resp = false;
                                            currCol = Colors.redAccent;
                                            if ((oddScore -
                                                (oddScore * 0.3).ceil()) >
                                                0) {
                                              oddCalc = -(oddScore * 0.3).ceil();
                                              oddScore = oddScore -
                                                  (oddScore * 0.3).ceil();
                                            } else {
                                              oddCalc = -oddScore;
                                              oddScore = 0;
                                            }
                                          }

                                          if (curwid.toInt() > 39) {
                                            if (colSat > 3) {
                                              colSat = colSat - 2;
                                            } else {
                                              colSat = 0;
                                            }
                                          } else {
                                            if (colSat < 252) {
                                              colSat = colSat + 3;
                                            } else {
                                              colSat = 255;
                                            }
                                          }

                                          if (resp == false) {
                                            curwid = 1;
                                          }

                                          deducedText = txt;

                                          if (originText.isEmpty) {
                                            myFocusNode.unfocus();

                                            getMinScoreDoc(originTitle);
                                          }
                                        });
                                      },
                                      decoration: const InputDecoration(
                                          border: InputBorder.none,
                                          contentPadding:
                                          EdgeInsets.symmetric(vertical: 0.0),
                                          isCollapsed: true),
                                      style:
                                      commonTextStyle.copyWith(color: currCol)),
                                ),
                              ),
                            ],
                          ),
                        ),
                        Container(
                          width: constraints.maxWidth * 0.8,
                          height: constraints.maxHeight * 0.1,
                          color: Colors.transparent,
                          child: originText.isNotEmpty
                              ? Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: <Widget>[
                              Text(
                                'typing game as meditation',
                                style: commonTextStyle.copyWith(
                                    color: const Color(0xFF331832)),
                              ),
                              IconButton(
                                  icon: const Icon(Icons.help_outline),
                                  color: const Color(0xFF331832),
                                  onPressed: () {
                                    if (showHelp) {
                                      FocusScope.of(context)
                                          .requestFocus(myFocusNode);
                                    }
                                    setState(() {
                                      showHelp = !showHelp;
                                    });
                                    // FocusScope.of(context).requestFocus(myFocusNode);
                                  }),
                            ],
                          )
                              : Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: <Widget>[
                              Text(
                                'share your achievement',
                                style: commonTextStyle.copyWith(
                                    color: const Color(0xFF331832)),
                              ),
                              IconButton(
                                  icon: const Icon(Icons.share),
                                  color: const Color(0xFF331832),
                                  onPressed: () {Share.shareUri(Uri.parse('https://zendoclab.github.io/typeodd/'));
                                  }),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                showHelp
                    ? Center(
                  child: Container(
                      width: constraints.maxWidth * 0.8,
                      height: constraints.maxHeight * 0.8,
                      color: const Color(0xFF331832).withOpacity(0.85),
                      child: Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          mainAxisSize: MainAxisSize.max,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                IconButton(
                                    icon: const Icon(Icons.close),
                                    tooltip: 'close',
                                    color: Colors.white,
                                    onPressed: () {
                                      if (showHelp) {
                                        FocusScope.of(context)
                                            .requestFocus(myFocusNode);
                                      }
                                      setState(() {
                                        showHelp = !showHelp;
                                      });
                                    }),
                                TextButton(
                                  onPressed: () {
                                    if (showHelp) {
                                      FocusScope.of(context)
                                          .requestFocus(myFocusNode);
                                    }
                                    setState(() {
                                      showHelp = !showHelp;
                                    });
                                  },
                                  child: Text("close",
                                      style: commonTextStyle.copyWith(
                                          fontWeight: FontWeight.bold,
                                          color: Colors.white)),
                                ),
                              ],
                            ),
                            Expanded(
                              child: InAppWebView(initialUrlRequest:
                              URLRequest(url: WebUri("https://zendoclab.blogspot.com/2024/04/typeodd-type-faster-than-anxiety.html#main"))
                              ),
                            ),
                          ],
                        ),
                      )),
                )
                    : const Center()
              ],
            );
          }),
    );
  }
}
