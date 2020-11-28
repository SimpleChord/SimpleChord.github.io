// chords
var A7 = "A7";
var Am = "Am";
var AmB = "Am/B";
var AmC = "Am/C";
var AmE = "Am/E";
var Am7 = "Am7";
var Am7G = "Am7/G";
var Asus2 = "Asus2";
var Asus2B = "Asus2/B";
var Asus4 = "Asus4";
var A7sus2 = "A7sus2";
var bB = "fB";
var bBm = "fBm";
var Bm = "Bm";
var BmD = "Bm/D";
var BmFs = "Bm/Fx";
var Bm7 = "Bm7";
var C = "C";
var CD = "C/D";
var CE = "C/E";
var CG = "C/G";
var C7 = "C7";
var CM7 = "CM7";
var Cadd9 = "Cadd9";
var Cadd9E = "Cadd9/E";
var D = "D";
var DA = "D/A";
var DC = "D/C";
var DFs = "D/Fx";
var D6 = "D6";
var D7 = "D7";
var D7Fs = "D7/Fx";
var Dm = "Dm";
var DmE = "Dm/E";
var DmF = "Dm/F";
var Dm7 = "Dm7";
var Dm7C = "Dm7/C";
var Dsus2 = "Dsus2";
var Dsus4 = "Dsus4";
var D7sus2 = "D7sus2";
var D7sus4 = "D7sus4";
var Daug = "Daug";
var E = "E";
//var E7 = "E7";unused for the time being
var E7B = "E7/B";
var E7Gs = "E7/Gx";
var Em = "Em";
var EmB = "Em/B";
var EmD = "Em/D";
var EmG = "Em/G";
var Em7 = "Em7";
var Em7B = "Em7/B";
var Esus4 = "Esus4";
var E7sus4 = "E7sus4";
var F = "F";
var FA = "F/A";
var FC = "F/C";
var FE = "F/E";
var FM7 = "FM7";
var Fadd9 = "Fadd9";
var Fadd9A = "Fadd9/A";
var FmM7 = "FmM7";
var sFm = "xFm";
var G = "G";
var GA = "G/A";
var GB = "G/B";
var GD = "G/D";
var G6 = "G6";
var G7 = "G7";
var G7A = "G7/A";
var Gm = "Gm";
var Gsus2 = "Gsus2";
var Gsus4 = "Gsus4";
var Gadd9D = "Gadd9/D";
var Bm7b5 = "Bm7-5";///test!!!

var ACCIDENTAL =
{
    f: "\u266D", // flat
    x: "\u266F" // sharp
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
var PB = [TAG.PB]; // Paragraph Break

var FORMAT =
{
    audio: "mp3",
    video: "mp4"
};

var EMOJI =
{
    awkward: " <^_^!>",
    cry: " (T○T)",
    love: " (*^。^*)",
    shy: " (*^▽^*)",
    smile: " \\(^○^)/",
    surprise: " (ﾉﾟοﾟ)ﾉ"
};

var DICTIONARY =
{
    aside:
    {
        en:
        [
            "As a matter of fact, the chords used in this site are not simple.",
            "..."
        ],
        ja:
        [
            "...",
            "...",
            "..."
        ],
        sv:
        [
            "...",
            "..."
        ],
        th:
        [
            "...",
            "..."
        ],
        zh:
        [
            "当你想弹某首歌时，一定会去网上搜索吧？嗨，大家都是这么过来的！",
            "找到乐谱的那一刻，开心吧？练了几下，发现不对路子，失落喽！大概有这么几种情况：",
            "谱子太难、小儿科、根本就是错的……"
        ],
    },
    demo:
    {
        en: "Demo",
        ja: "模範演奏",
        sv: "Demo",
        th: "Demo",
        zh: "示范演奏"
    },
    footer:
    {
        en:
        [
            "Thank you for your visit to this site.", PB,
            "Edge or IE is not recommended.", PB,
            "A front-end framework is being provided for enthusiasts of music or programming to create chord-scores easily. " +
            "Thus this site is not the one to inquire for musical scores.", LB,
            "The scores and multimedia available in this site are used to test the framework. Please don't reprint them!"
        ],
        ja:
        [
            "わざわざ本サイトをご覧いただき、誠にありがとうございます！", PB,
            "EdgeかIEにて本サイトへのアクセスは不推奨です。", PB,
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
        th:
        [
            "Thank you for your visit to this site.", PB,
            "Edge or IE is not recommended.", PB,
            "All of the Thai words are translated by ",
            [TAG.q, "Google Translate"],
            "."
        ],
        zh:
        [
            "希望您会欢喜以上内容！", PB,
            "不建议用Edge或IE访问本站。", PB,
            "本站旨在为广大音乐或编程爱好者提供一个方便输入和弦谱的前端框架，并非乐谱查询网站。", LB,
            "页面内所显示的谱子及多媒体，皆作为测试框架所用，请勿转载！", LB,
            "如有侵权之处，请来信告之，本站一定删除该内容。"
        ],
    },
    intro:
    {
        en: "(Intro)",
        ja: "（前奏）",
        sv: "(Intro)",
        th: "（前奏）",
        zh: "（前奏）"
    },
    outro:
    {
        en: "(Outro)",
        ja: "（後奏）",
        sv: "(Outro)",
        th: "（尾奏）",
        zh: "（尾奏）"
    },
    unavailable:
    {
        en: "(Unavailable)",
        ja: "（未登録）",
        sv: "(Unavailable)",
        th: "(Unavailable)",
        zh: "（暂无）"
    }
}
