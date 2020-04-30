// chords
var A7 = "A7";
var Am = "Am";
var AmG = "Am/G";
var Am7 = "Am7";
var bB = "fB";
var Bm = "Bm";
var C = "C";
var C7 = "C7";
//var CM7 = "CM7";
var D = "D";
var D6 = "D6";
var D7 = "D7";
var D7Fs = "D7/F#";
var Dm = "Dm";
var Dm7 = "Dm7";
var E7 = "E7";
var E7Gs = "E7/G#";
var Em = "Em";
var EmB = "Em/B";
var EmG = "Em/G";
var Em7 = "Em7";
var F = "F";
var FmM7 = "FmM7";
var G = "G";
var GB = "G/B";
var G7 = "G7";
var Gm = "Gm";
var Gsus4 = "Gsus4";

// others
var SPACE = "\u3000"; // full width
var PARAGRAPH = 4; // add a break every 4 lines

var ChordFrom = 0;
var ChordName = 1;
///var LyricsTo = 2;to be used

var ELEMENT =
{
    tag: 0, // HTML tags or other variations
    between: 1 // contents between tags
//    href: 2
}

var TAG =
{
    a: "a",
    audio: "audio",
    br: "br",
    details: "details",
    li: "li",
    p: "p",
    small: "small",
    sup: "sup",
    ul: "ul",
    video: "video",
// derivatives
    PB: "PB"
};
var LB = [TAG.br]; // line break
var PB = [TAG.PB]; // paragraph break

var FORMAT =
{
    audio: "mp3",
    video: "mp4"
};

var LANGUAGE =
{
    gequ: "zh",
    uta: "ja"
//    song: "en"
};

var DICTIONARY =
{
    footer:
    {
//        en: "",
        ja:
        [
            "わざわざ本サイトをご覧いただき、誠にありがとうございます！", PB,
            "歌詞は掲載しかねます。"
        ],
        zh: "希望您会欢喜以上内容！"
    },
    intro:
    {
//        en: "(Intro)",
        ja: "（前奏）",
        zh: "（前奏）"
    },
    demo:
    {
//        en: "Demo",
        ja: "弾き語り",
        zh: "示范弹唱"
    },
    outro:
    {
//        en: "(Outro)",
        ja: "（後奏）",
        zh: "（尾奏）"
    }
}
