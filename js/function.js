function getPage(url)
{
    var splitURL = url.split("/");
    var page =
    {
        name: splitURL.pop().split(".").shift(),
        top: "", // top menu, used to highlight the current NAV link
        prefix: "", // prefix to go up directories
        path: "", // effective path without extension
        info: {},
        language: ""
    };
    
    if (page.name in DATA)
    {
        page.top = page.name;
        page.prefix = "../";
        page.path = page.name;
        page.info = DATA[page.name];
    }
    else
    {
        page.top = splitURL.pop();
        page.prefix = "../../";
        page.path = page.top + "/" + page.name;
        page.info = DATA[page.top].classification[page.name];
    }
    page.language = LANGUAGES[page.top];
    
    return page;
}

function appendBreak(parent)
{
    var br = document.createElement(TAG.br);
    
    parent.appendChild(br);
}

function appendTextNode(text, parent)
{
    var node = document.createTextNode(text);
    
    parent.appendChild(node);
}

function appendTagText(tag, text, parent)
{
    var element = document.createElement(tag);
    
    element.innerText = text;
    
    parent.appendChild(element);
}

function transform2tag(original, parent)
{
    switch (original[ELEMENT.tag])
    {
        case TAG.PB:
            appendBreak(parent);
            return LB;
        default:
            return original;
    }
}

function appendRecursively(content, parent)
{
    var c; // string or array
    var transformed = [];
    var element;
    
    for (c of content)
        if ("string" === typeof c) appendTextNode(c, parent);
        else // array
        {
            transformed = transform2tag(c, parent); // transform "c" into an HTML tag if necessary
            element = document.createElement(transformed[ELEMENT.tag]);
            
            switch (transformed[ELEMENT.tag])
            {
                case TAG.br:
                    break;
                default:
                    appendRecursively([transformed[ELEMENT.between]], element);
            }
            
            parent.appendChild(element);
        }
}

function appendParagraph(type, song, parent)
{
    var p;
    var st; // string or array
    
    if (type in song)
    {
        p = document.createElement(TAG.p);
        st = song[type];
        
        if ("string" === typeof st) appendTextNode(st, p); // a simple sentence
        else appendRecursively(st, p); // array
        
        parent.appendChild(p);
    }
}

function appendChord(lyrics, chord, parent)
{
    var ruby = document.createElement("ruby");
    var rt = document.createElement("rt");
    var c = "";
    
    ruby.textContent = (" " === lyrics) ? SPACE : lyrics;
    
    for (c of chord)
        switch (c)
        {
            case "M":
                appendTagText("small", c, rt);
                break;
            case "#":
                appendTagText(TAG.sup, c, rt);
                break;
            case "f":
                appendTagText(TAG.sup, "b", rt);
                break;
            default:
                appendTextNode(c, rt);
        }
    
    ruby.appendChild(rt);
    parent.appendChild(ruby);
}

function appendLyrics(line, from, to, parent) // line: a line of lyrics
{
    appendTextNode(line.slice(from, to), parent);
}

function append__tro(__tro, score, language, parent)
{
    var st = "";
    var chords = "";
    
    if (__tro in score)
    {
        for (st of score[__tro]) chords += st + SPACE; // "score[__tro]" is an array.
        
        appendTextNode(SPACE, parent);
        appendChord(DICTIONARY[__tro][language], chords.slice(0, -1), parent);
    }
}

function appendScore(score, language, parent)
{
    var section = document.createElement("section");
    var p = document.createElement(TAG.p);
    
    append__tro("intro", score, language, p);
    
    score.chords.forEach
    (
        function(scch, i)
        {
            var firstIndex = scch[0][ChordFrom]; // the index of the 1st chord in a line of lyrics
            var firstChord = [];
            var line = SPACE + score.lyrics[i] + SPACE;
            var lyricsFrom = 0;
            var lyricsTo = 0;
            var sc = "";
            
            if (0 == i % PARAGRAPH) appendBreak(p);
            
            if (0 == firstIndex)
            {
                firstChord = scch.shift();
                
                appendChord(line[firstChord[ChordFrom]], firstChord[ChordName], p);
                lyricsFrom = 1;
            }
            
            for (sc of scch)
            {
                lyricsTo = sc[ChordFrom];
                
                if (lyricsFrom != lyricsTo) appendLyrics(line, lyricsFrom, lyricsTo, p);
                appendChord(line[sc[ChordFrom]], sc[ChordName], p);
                
                lyricsFrom = lyricsTo + 1;
            }
            
            if (lyricsFrom < line.length) appendLyrics(line, lyricsFrom, line.length, p);
            
            appendBreak(p);
        }
    );
    
    append__tro("outro", score, language, p);
    
    section.appendChild(p);
    parent.appendChild(section);
}

function getLink(prefix, folder, file)
{
    return prefix + folder + "/" + file;
}

function appendDemo(page, type, baseName, parent)
{
    var demo = document.createElement(type);
    
    demo.src = getLink(page.prefix, type, page.path + "/" + baseName + "." + FORMAT[type]);
    demo.controls = true;
    demo.onmouseenter = function()
    {
        demo.play();
    };
    
    parent.appendChild(demo);
}

function appendSong(page, id, parent)
{
    var article = document.createElement("article");
    var song = page.info.main[id];
    var details;
    
    article.id = id; // create bookmarks with ID attribute
    
    appendTagText("h2", song.h2, article); // heading 2
    
    appendParagraph("preface", song, article); // preface
    
    appendScore(song.score, page.language, article); // score
    
    appendParagraph("postscript", song, article); // postscript
    
// demo
    if (TAG.details in song)
    {
        details = document.createElement(TAG.details);
        
        appendTagText("summary", DICTIONARY.demo[page.language], details);
        appendDemo(page, song.details, id, details);
        appendParagraph("comment", song, details); // comment
        
        article.appendChild(details);
    }
    
    parent.appendChild(article);
}

function createHeader(pih) // page.info.header
{
    var header = document.createElement("header");
    
    appendTagText("h1", pih.h1, header); // heading 1
    document.body.appendChild(header);
}

function createMain(page)
{
    var main = document.createElement("main");
    var id = "";
    
    for (id in page.info.main) appendSong(page, id, main);
    
    document.body.appendChild(main);
}

function createPage(url)
{
    var page = getPage(url);
    var pih = page.info.header;
    var link = document.createElement("link");
    
// link CSS
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = getLink(page.prefix, "css", "chord.css");
    document.head.appendChild(link);
    
// title
    document.title = pih.h1;
    
    createHeader(pih);
    createMain(page);
}
