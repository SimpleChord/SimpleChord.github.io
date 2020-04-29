// chords
var A7 = "A7";
var Am = "Am";
var AmG = "Am/G";
var Am7 = "Am7";
var bB = "fB";
var Bm = "Bm";
var C = "C";
var C7 = "C7";
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

var ELEMENT =
{
    tag: 0, // HTML tags or other variations
    between: 1 // contents between tags
}

var TAG =
{
    audio: "audio",
    br: "br",
    details: "details",
    p: "p",
    small: "small",
    sup: "sup",
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

var LANGUAGES =
{
    gequ: "zh",
    uta: "ja"
};

var DICTIONARY =
{
    footer:
    {
        ja: "誠にありがとうございます！",
        zh: "希望您会欢喜以上内容！"
    },
    intro:
    {
        ja: "（前奏）",
        zh: "（前奏）"
    },
    demo:
    {
        ja: "弾き語り",
        zh: "示范弹唱"
    },
    outro:
    {
        ja: "（後奏）",
        zh: "（尾奏）"
    }
}
