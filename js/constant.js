// chords
var A7 = "A7";
var Am = "Am";
var AmB = "Am/B";
var AmC = "Am/C";
var AmE = "Am/E";
var Am7 = "Am7";
var Am7E = "Am7/E";
var Am7G = "Am7/G";
var Asus2 = "Asus2";
var Asus2B = "Asus2/B";
var Asus4 = "Asus4";
var A7sus2 = "A7sus2";
var bB = "fB";
var bBm = "fBm";
var B = "B";
var Bm = "Bm";
var BmD = "Bm/D";
var BmFs = "Bm/Fx";
var Bm7 = "Bm7";
var Bm7b5 = "Bm7-5";
var C = "C";
var CD = "C/D";
var CE = "C/E";
var CG = "C/G";
var C7 = "C7";
var Cadd9 = "Cadd9";
var Cadd9E = "Cadd9/E";
var CM7 = "CM7";
var CM9 = "CM9";
var D = "D";
var DA = "D/A";
var DC = "D/C";
var DFs = "D/Fx";
var D6 = "D6";
var D7 = "D7";
var D7Fs = "D7/Fx";
var Dm = "Dm";
var DmA = "Dm/A";
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
var E7 = "E7";
var E7B = "E7/B";
var E7Gs = "E7/Gx";
var Em = "Em";
var EmB = "Em/B";
var EmD = "Em/D";
var EmG = "Em/G";
var Em7 = "Em7";
var Em7B = "Em7/B";
var Emadd11 = "Emadd11";
var Esus4 = "Esus4";
var Esus4B = "Esus4/B";
var E7sus4 = "E7sus4";
var F = "F";
var FA = "F/A";
var FC = "F/C";
var FE = "F/E";
var Fadd9 = "Fadd9";
var Fadd9A = "Fadd9/A";
var FM7 = "FM7";
var FmM7 = "FmM7";
var sF = "xF";
var sFm = "xFm";
var G = "G";
var GA = "G/A";
var GB = "G/B";
var GD = "G/D";
var G6 = "G6";
var G7 = "G7";
var G7A = "G7/A";
var G7D = "G7/D";
var Gadd9D = "Gadd9/D";
var Gm = "Gm";
var Gsus2 = "Gsus2";
var Gsus4 = "Gsus4";
var sGm = "xGm";

var ACCIDENTAL =
{
    f: "\u266D", // flat
    x: "\u266F" // sharp
};

var HALF = 1;
var FULL = 2;
var FWS = "\u3000"; // full-width space
var TFWS = FWS + FWS; // 2 full-width spaces
var PARAGRAPH = 4; // add a break every 4 lines

// indexes of a chord's tuple
var POSITION = 0; // position where a chord begins
var NAME = 1; // name of a chord

var HTML = "html";
var HomePage = "index." + HTML;

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
    h3: "h3",
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
    HOME: "HOME", // return to the home page
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
    angry: " (๑`^´๑)",
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
        pt:///
        [
            "(The sentences in this area need to be translated!)", LB,
            "（ここの文を訳してもらえない？）"
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
            "当你想弹某首歌时，一定会去网上找谱吧？（嗨，大家都是这么过来的！）搜到乐谱的那一刻，开心吧？" +
            "（弹完觉得很满足，这种情况咱就不讨论了；）练了几下，发现不对路子，失落喽！那你找的谱子大概是：",
            [
                TAG.ul,
                [
                    [
                        "太难。（其实这种情况并不多见，具体原因在下一种情况中会提及。）", LB,
                        "自己改简单点儿呀！不会？"
                    ],
                    [
                        "小儿科。", LB,
                        "弹来弹去ABCDEFG(m)(7)，跟个初学者似的，没意思！原因取决于记谱者：",
                        [
                            TAG.ul,
                            [
                                "本身水平就有限。",
                                [
                                    "是有水平的。", LB,
                                    "但考虑到大多数网友都是业余爱好者，发布太难的，可能看不懂？所以……"
                                ]
                            ]
                        ],
                        "那自己润色下呀！不会？", LB,
                        "虽然基础和弦一般也够用了，就不是最好；在特定的场合，倒还真不能满足要求！" +
                        "另一方面，有的高级货反而好按，且换弦也方便。"
                    ],
                    [
                        "根本就是错的！", LB,
                        "当然也有可能是对的？只是没有示范，你不知道如何正确地弹奏？"
                    ]
                ]
            ],
            "以上讨论的都找到谱的情况，那肯定就有找不到的啦！" +
            "总之，没有（合适的）谱子时，怎么办呢？到处留言求谱？可能没有人会理你。", LB,
            "求人不如靠自己！本站邀请的编曲者并非科班出身，也是厌倦了长时间的搜谱生涯，于近期才开始学习编曲的……", LB,
            "之所以叫“",
            [TAG.HOME, "简单（编曲）"],
            "”，是因为几乎没有solo形式的前奏、间奏和尾奏。" +
            "而且大多采用简单、大家都熟知却很经典的节奏，效果倒还不错啦！", LB,
            "不过为了摆脱初学者的队伍，和弦编配得并不简单哟！而且尽可能避开各大教学网站与视频里提及的所谓《万能伴奏》。", LB,
            "其实没什么难的，相信你也可以做到！", PB,
            "看到其它网站发布的谱子上，和弦名和歌词儿对得参差不齐、歪歪扭扭的样子，萌生了自己动手写个前端框架的念头。", LB,
            "歌词尽可能按每段4行来排列，目前暂时无例外。", LB,
            "现在所完成的功能中只对应了和弦谱的输入，先对本站采用的符号进行一下说明：",
            [
                TAG.ul,
                [
                    [
                        "升降号", LB,
                        "上标形式显示。主和弦名中的升降号写在左边；转位的根音中的写在右边。即不使用形如", LB,
                        ACCIDENTAL.x + "H/I" + ACCIDENTAL.x + "、",
                        [TAG.sup, ACCIDENTAL.x],
                        "J/",
                        [TAG.sup, ACCIDENTAL.f],
                        "K、L",
                        [TAG.sup, ACCIDENTAL.f],
                        "/",
                        [TAG.sup, ACCIDENTAL.x],
                        "M、N",
                        [TAG.sup, ACCIDENTAL.f],
                        "/O",
                        [TAG.sup, ACCIDENTAL.f], LB,
                        "的名儿。", LB,
                        "半减和弦中的" + ACCIDENTAL.f + "，应该不算是降号，所以不用上标。"
                    ],
                    [
                        "大（和弦）", LB,
                        "即M/maj(or)，一律采用较小的大M（不是下标）来表示。"
                    ],
                    "……"
                ]
            ],
            "六线谱暂时无法实现，以后可能会考虑支持ASCII谱……", PB,
            "最后对于合作者们——",
            [
                TAG.ul,
                [
                    "特邀记谱：敏江",
                    "示范演奏：马里昂",
                    "音乐顾问：……",
                    "方言指导：小映；敏江",
                    "技术支持：马里昂",
                    "粉丝代表：钱副校长、阿达、小孩子、孔卡、大帝……"
                ]
            ],
            "表示感谢！"
        ]
    },
    demo:
    {
        en: "Demo",
        ja: "模範演奏",
        pt: "Demonstração   (Click here and translate the paragraph below!)",///
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
        pt:///
        [
            "(The sentences in this area need translating!)", LB,
            "（ここの文を訳してもらえない？）"
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
        pt: "...",///
        sv: "(Intro)",
        th: "（前奏）",
        zh: "（前奏）"
    },
    notice:
    {
        en: "Notice",
        ja: "ご挨拶",
        pt: "（翻訳依頼！）",///
        sv: "...",
        th: "...",
        zh: "寄语"
    },
    outro:
    {
        en: "(Outro)",
        ja: "（後奏）",
        pt: "...",///
        sv: "(Outro)",
        th: "（尾奏）",
        zh: "（尾奏）"
    },
    unavailable:
    {
        en: "(unavailable)",
        ja: "（未登録）",
        pt: "...",///
        sv: "(unavailable)",
        th: "(unavailable)",
        zh: "（暂无）"
    }
}
