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

function createTagText(tag, text)
{
    var element = document.createElement(tag);
    
    element.innerText = text;
    
    return element;
}

function appendParagraph(type, song, parent)
{
    var p;
    
    if (type in song)
    {
        p = createTagText("p", song[type]);
        parent.appendChild(p);
    }
}

function appendChord(lyrics, chord, parent)
{
    var ruby = document.createElement("ruby");
    var rt = document.createElement("rt");
    var c = "";
    var betweenRT;
    
    ruby.textContent = (" " === lyrics) ? SPACE : lyrics;
    
    for (c of chord)
    {
        switch (c)
        {
            case "M":
                betweenRT = createTagText("small", c);
                break;
            case "#":
                betweenRT = createTagText(TAG.sup, c);
                break;
            case "f":
                betweenRT = createTagText(TAG.sup, "b");
                break;
            default:
                betweenRT = document.createTextNode(c);
        }
        
        rt.appendChild(betweenRT);
    }
    
    ruby.appendChild(rt);
    parent.appendChild(ruby);
}

function appendLyrics(line, from, to, parent) // line: a line of lyrics
{
    var part = line.slice(from, to);
    var text = document.createTextNode(part);
    
    parent.appendChild(text);
}

function append__tro(__tro, score, language, parent)
{
    var st = "";
    var chords = "";
    var space = document.createTextNode(SPACE);
    
    if (__tro in score)
    {
        for (st of score[__tro]) chords += st + SPACE; // "score[__tro]" is an array.
        
        parent.appendChild(space);
        appendChord(DICTIONARY[__tro][language], chords.slice(0, -1), parent);
    }
}

function appendBreak(parent)
{
    var br = document.createElement("br");
    
    parent.appendChild(br);
}

function appendScore(score, language, parent)
{
    var section = document.createElement("section");
    var p = document.createElement("p");
    
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
    var h2 = createTagText("h2", song.h2); // heading 2
    var details;
    var summary;
    
    article.id = id; // create bookmarks with ID attribute
    
// heading 2
    article.appendChild(h2);
    
    appendParagraph("preface", song, article); // preface
    
    appendScore(song.score, page.language, article); // score
    
    appendParagraph("postscript", song, article); // postscript
    
// demo
    if ("demo" in song)
    {
        details = document.createElement("details");
        summary = createTagText("summary", DICTIONARY.demo[page.language]);
        
        details.appendChild(summary);
        appendDemo(page, song.demo, id, details);
        appendParagraph("comment", song, details); // comment
        
        article.appendChild(details);
    }
    
    parent.appendChild(article);
}

function createHeader(pih) // page.info.header
{
    var header = document.createElement("header");
    var h1 = createTagText("h1", pih.h1); // heading 1
    
    header.appendChild(h1);
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
