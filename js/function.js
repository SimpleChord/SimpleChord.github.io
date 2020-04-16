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
    var br = document.createElement("br");
    
    parent.appendChild(br);
}

function appendChord(parent, lyrics, chord)
{
    var ruby = document.createElement("ruby");
    var rt = document.createElement("rt");
    
    var betweenRT;
    
    ruby.textContent = (" " === lyrics) ? HalfSpace : lyrics;///to be improved if lyrics are english!
    
    for (c of chord)
    {
        switch (c)
        {
            case "M":
                betweenRT = document.createElement("small");
                betweenRT.textContent = c;
                break;
            case "#":
                betweenRT = document.createElement(TAG.SUP);
                betweenRT.textContent = c;
                break;
            case "f":
                betweenRT = document.createElement(TAG.SUP);
                betweenRT.textContent = "b";
                break;
            default:
                betweenRT = document.createTextNode(c);
        }
        rt.appendChild(betweenRT);
    }
    
    ruby.appendChild(rt);
    parent.appendChild(ruby);
}

function appendLyrics(parent, line, from, to) // line: a line of lyrics
{
    var part = line.slice(from, to);
    var text = document.createTextNode(part);
    
    parent.appendChild(text);
}

function appendScore(parent, chords, lyrics)
{
    var p = document.createElement("p");
    
    chords.forEach
    (
        function(chord, i)
        {
            var line = FullSpace + lyrics[i] + FullSpace;
            var firstIndex = chord[0][ChordFrom]; // the index of the 1st chord in a line of lyrics
            var firstChord = [];
            var lyricsFrom = 0;
            var lyricsTo = 0;
            
            if (0 == firstIndex)
            {
                firstChord = chord.shift();
                
                appendChord(p, line[firstChord[ChordFrom]], firstChord[ChordName]);
                lyricsFrom = 1;
            }
            
            for (c of chord)
            {
                lyricsTo = c[ChordFrom];
                
                if (lyricsFrom != lyricsTo) appendLyrics(p, line, lyricsFrom, lyricsTo);
                appendChord(p, line[c[ChordFrom]], c[ChordName]);
                
                lyricsFrom = lyricsTo + 1;
            }
            
            if (lyricsFrom < line.length) appendLyrics(p, line, lyricsFrom, line.length);
            
            appendBreak(p);
            if (0 == (i + 1) % PARAGRAPH) appendBreak(p);
        }
    );
    
    parent.appendChild(p);
}

function appendSong(parent, id, song, language)
{
    var article = document.createElement("article");
    var h2 = document.createElement("h2"); // heading 2
    var details = document.createElement("details");
    var summary = document.createElement("summary");
    
// create bookmarks with ID attribute
    article.id = id;
    
// heading 2
    h2.textContent = song.h2;
    article.appendChild(h2);
    
// score
    appendScore(article, song.chords, song.lyrics);
    
// demo
    summary.textContent = DICTIONARY.demo[language];///multimedia
    details.appendChild(summary);
    
    article.appendChild(details);
    parent.appendChild(article);
}

function createHeader(info)
{
    var header = document.createElement("header");
    var h1 = document.createElement("h1"); // heading 1
    
    h1.textContent = info.header.h1;
    
    header.appendChild(h1);
    document.body.appendChild(header);
}

function createMain(page)
{
    var main = document.createElement("main");
    
    var id = "";
    var song = {};
    
    for ([id, song] of Object.entries(page.info.main)) appendSong(main, id, song, page.language);

    document.body.appendChild(main);
}

function createPage(url)
{
    var page = getPage(url);
    
    var link = document.createElement("link");
    
// link CSS
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = page.prefix + "css/chord.css";
    document.head.appendChild(link);
    
// title
    document.title = page.info.header.h1;
    
//    createNav(page);///
    createHeader(page.info);
    createMain(page);
}
