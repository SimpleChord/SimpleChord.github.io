// chords
var A7 = "A7";
var Am = "Am";
var AmG = "Am/G";
var Am7 = "Am7";
var bB = "fB";
var Bm = "Bm";
var BmD = "Bm/D";
var C = "C";
var CE = "C/E";
var C7 = "C7";
///var CM7 = "CM7";
var Cadd9 = "Cadd9";
var D = "D";
var DFs = "D/Fx";
var D6 = "D6";
var D7 = "D7";
var D7Fs = "D7/Fx";
var Dm = "Dm";
var DmF = "Dm/F";
var Dm7 = "Dm7";
var E7 = "E7";
var E7Gs = "E7/Gx";
var Em = "Em";
var EmB = "Em/B";
var EmG = "Em/G";
var Em7 = "Em7";
var F = "F";
var FmM7 = "FmM7";
var sFm = "xFm";
var G = "G";
var GB = "G/B";
var G7 = "G7";
var Gm = "Gm";
var Gsus4 = "Gsus4";

var SHARPorFLAT =
{
    x: "\u266F",
    f: "\u266D"
};

var HALF = 1;
var FULL = 2;
var FWS = "\u3000"; // full-width space
var PARAGRAPH = 4; // add a break every 4 lines

// indexes of a chord's tuple
var POSITION = 0; // position where a chord begins
var NAME = 1; // name of a chord
///var LyricsTo = 2;to be used

var HTML = "html";

var ELEMENT =
{
    tag: 0, // HTML tags or other variations
    between: 1, // contents between tags
    href: 2,
    alp: 2, // another local page
    id: 3
}

var TAG =
{
    a: "a",
    article: "article",
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
    BoALP: "BoALP", // Bookmark on Another Local Page
    CHORD: "CHORD",
    PB: "PB"
};
var LB = [TAG.br]; // line break
var PB = [TAG.PB]; // paragraph break

var FORMAT =
{
    audio: "mp3",
    video: "mp4"
};

var DICTIONARY =
{
    demo:
    {
        en: "Demo",
        ja: "弾き語り",
        zh: "示范弹唱"
    },
    footer:
    {
        en: "Please enjoy the above contents!",
        ja:
        [
            "わざわざ本サイトをご覧いただき、誠にありがとうございます！", PB,
            "歌詞は掲載しかねます。"
        ],
        zh: "希望您会欢喜以上内容！"
    },
    intro:
    {
        en: "(Intro)",
        ja: "（前奏）",
        zh: "（前奏）"
    },
    outro:
    {
        en: "(Outro)",
        ja: "（後奏）",
        zh: "（尾奏）"
    },
    unavailable:
    {
        en: "(Unavailable now)",
        ja: "（未登録）",
        zh: "（暂无）"
    }
}
