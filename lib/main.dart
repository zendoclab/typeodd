import 'package:flutter/material.dart';
import 'dart:math';

/*
- 사운드 안쓰고, 글자, 커서 색깔도 의미에 따라서 지정할 것
- 커버박스를 타이핑 가속력에 따라 속도 생성해서 속도에 따라 박스 늘이고 줄이기
- Text와 TextField가 윈도창에 따라 flexible하게 만들것
- 시간이 흐를수록 마이너스 점수 매겨서 시간을 거슬러 더 빠르게 점수를 쌓아가야 하는 압박감 만들기: 전역변수 시간, 속도
- 영문 텍스트 한글 텍스트 랜덤으로 가져와서 문자열 처리하기, 문단을 어떻게 진행할 것인가?
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
      title: 'Flutter Demo',
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

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  TextStyle commonTextStyle = TextStyle(
    letterSpacing: 2.0,
    fontSize: 16,
  );

  final TextEditingController controller = TextEditingController();

  String text ='';


  late FocusNode myFocusNode;

  String lastCharacter='';

  String originText = 'You have pushed the button this many times';
  String deducedText = 'You have pushed the button this many times';
  bool resp = false;



  @override
  void initState() {
    super.initState();
    myFocusNode = FocusNode();
    controller.addListener(() {
      int cursorPosition = controller.selection.baseOffset;
      text = controller.value.text;
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

    final textPainter = TextPainter(
      text: TextSpan(text: text),
      textDirection: TextDirection.ltr,
    );

    textPainter.layout();

    final offset = textPainter.getOffsetForCaret(
      TextPosition(offset: controller.selection.start),
      Rect.zero,
    );

    Color currCol = Color((Random().nextInt(0xFFFFFF)).toInt()).withOpacity(1.0);

    double curwid = 1+offset.dx;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Stack(
          children: <Widget>[
            Positioned(
              top: 70,
              left: 70,
              child: Container(
                width: 500,
                height: 200,
                child: Text(
                  originText,
                  style: commonTextStyle,
                ),
              ),
            ),
            Positioned(
              top: 72,
              left: 70,
              child: Container(
                width: 500,
                height: 200,
                child:TextField(
                  controller: controller,
                  autofocus: true,
                  focusNode: myFocusNode,
                  cursorWidth: resp==false ? 1 : curwid,
                  showCursor: true,
                  cursorColor: currCol,
                  cursorErrorColor: Colors.black,
                  cursorOpacityAnimates: true,
                  onChanged: (txt) {
                    lastCharacter = text.isEmpty ? '' : text[text.length - 1];

                    setState(() {

                      if(txt.substring(0,controller.selection.baseOffset)==originText.substring(0,controller.selection.baseOffset) &&
                         txt.substring(0,txt.length)==originText.substring(0,txt.length)
                      ) {

                        // deducedText=deducedText.substring(1);
                        resp = true;
                      }
                      else {
                      resp= false;
                      // text=text.substring(0,text.length -1);
                      // controller.text=text;
                      }


                    });
                  },
                  decoration: InputDecoration(
                      border: InputBorder.none,
                      contentPadding: EdgeInsets.symmetric(vertical: 0.0),
                      isCollapsed: true
                  ),
                  style: commonTextStyle.copyWith(color: currCol)
                ),
              ),
            ),
            Positioned(
              top: 172,
              left: 70,
              child: Container(
                width: 500,
                height: 200,
                child: Text('bool: $resp\n last: $lastCharacter deduced: ${deducedText[0]} text: $text\n ori: $originText\n deu: $deducedText'),
              ),
            ),
          ],
        ),

      ),
    );
  }
}
