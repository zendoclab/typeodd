import 'package:flutter/material.dart';
import 'dart:math';
import 'dart:async';

import 'package:flutter/services.dart';

/*
- 영문 텍스트 한글 텍스트 랜덤으로 가져와서 문자열 처리하기, 문단을 어떻게 진행할 것인가?
- 점수 체계, 문구, 링크 등 배치
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

  TextStyle commonTextStyle = const TextStyle(
    letterSpacing: 2.0,
    fontSize: 16,
    color: Colors.black54
  );

  final TextEditingController controller = TextEditingController();

  String text ='';


  late FocusNode myFocusNode;

  String lastCharacter='';

  String originText = 'You have pushed the button this many times You have pushed the button this many times You have pushed the button this many times';
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
    print('Typing speed: $_typingSpeed');
  }



  double curwid = 1;

  @override
  void initState() {
    super.initState();
    myFocusNode = FocusNode();
    controller.addListener(() {
      int cursorPosition = controller.selection.baseOffset;
      text = controller.value.text;
    });
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

    final textPainter = TextPainter(
      text: TextSpan(text: text),
      textDirection: TextDirection.ltr,
    );

    textPainter.layout();

    final offset = textPainter.getOffsetForCaret(
      TextPosition(offset: controller.selection.start),
      Rect.zero,
    );

    Color backCol = Color((Random().nextInt(0xFFFFFF)).toInt()).withOpacity(1.0);

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
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
                        lastCharacter = text.isEmpty ? '' : text[text.length - 1];


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

          Positioned(
                  top: 102,
                  left: 70,
                  child: SizedBox(
                    width: 500,
                    height: 200,
                    child: Text('speed: $curwid \n bool: $resp\n last: $lastCharacter text: $text\n ori: $originText\n deu: $deducedText \n $_typingSpeed'),
                  ),
                ),

              ],
            ),
          ),

      ),
      ); }),
    );
  }
}
