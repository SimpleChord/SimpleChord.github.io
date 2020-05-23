// chords
var A7 = "A7";
var Asus4 = "Asus4";
var Am = "Am";
var AmG = "Am/G";
var Am7 = "Am7";
var bB = "fB";
var Bm = "Bm";
var BmD = "Bm/D";
var C = "C";
var CE = "C/E";
var C7 = "C7";
var CM7 = "CM7";
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
var EmD = "Em/D";
var EmG = "Em/G";
var Em7 = "Em7";
var F = "F";
var FM7 = "FM7";
var Fadd9 = "Fadd9";
var FmM7 = "FmM7";
var sFm = "xFm";
var G = "G";
var GA = "G/A";
var GB = "G/B";
var G7 = "G7";
var Gsus4 = "Gsus4";
var Gm = "Gm";

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
    aside: "aside",
    audio: "audio",
    br: "br",
    details: "details",
    footer: "footer",
    h1: "h1",
    h2: "h2",
    header: "header",
    li: "li",
    link: "link",
    main: "main",
    nav: "nav",
    ol: "ol",
    p: "p",
    pre: "pre",
    q: "q",
    rt: "rt",
    ruby: "ruby",
    section: "section",
    small: "small",
    summary: "summary",
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

var EMOJI =
{
    shy: " (*^▽^*)",
    surprise: " (ﾉﾟοﾟ)ﾉ"
};

var DICTIONARY =
{
    demo:
    {
        ja: "弾き語り",
        sv: "Demo",
        zh: "示范弹唱"
    },
    footer:
    {
        ja:
        [
            "わざわざ本サイトをご覧いただき、誠にありがとうございます！", PB,
            "EdgeかIEで本サイトへのアクセスは不推奨です。", PB,
            "歌詞は掲載しかねます。"
        ],
        sv:
        [
            "Thank you for your visit to this site.", PB,
            "Edge or IE is not recommended.", PB,
            "All of the Swedish words are translated by ",
            [TAG.q, "Google Translate"],
            "."
        ],
        zh:
        [
            "希望您会欢喜以上内容！", PB,
            "不建议用Edge或IE访问本站。", PB,
            "本站旨在为广大编程或音乐爱好者提供一个方便输入和弦谱的前端框架，并非乐谱查询网站。", LB,
            "页面内所显示的谱子及多媒体，皆作为测试框架所用，请勿转载！", LB,
            "如有侵权之处，请来信告之，本站一定删除该内容。"
        ],
    },
    intro:
    {
        ja: "（前奏）",
        sv: "(Intro)",
        zh: "（前奏）"
    },
    outro:
    {
        ja: "（後奏）",
        sv: "(Outro)",
        zh: "（尾奏）"
    },
    unavailable:
    {
        ja: "（未登録）",
        sv: "(Unavailable now)",
        zh: "（暂无）"
    }
}
