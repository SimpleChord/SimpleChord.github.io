function getPage(url)
{
    var i = 0;
    var splitURL = url.split("/");
    var last = splitURL.length - 1;
    var nodes = []; // effective nodes
    var node = "";
    
    var page =
    {
        language: "",
        top: "", // top menu, used to highlight the current NAV link
        name: splitURL[last].split(".").shift(),
        prefix: "", // prefix to go up directories
        path: "" // effective path without extension
    };
    
    page.top = page.name;
    page.path = page.name;
    
    for (i = last - 1; i >= 0; i--)
    {
        page.prefix += "../";
        if (splitURL[i] in LANGUAGES)
        {
            page.language = splitURL[i];
            break;
        }
        else
        {
            page.top = splitURL[i];
            nodes.unshift(splitURL[i]);
            page.path = splitURL[i] + "/" + page.path;
        }
    }
    for (node of nodes) page.parent = page.parent[node].aside;
    
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

function appendScore(parent, score)
{
    var p = document.createElement("p");
    
    var line = "";
    var firstIndex = 0; // the index of the 1st chord in a line of lyrics 
    var firstChord = [];
    var lyricsFrom = 0;
    var lyricsTo = 0;
    
    score.chord.forEach
    (
        function(scch, i)
        {
            line = FullSpace + score.lyric[i] + FullSpace;
            firstIndex = scch[0][ChordFrom];
            lyricsFrom = 0;
            
            if (0 == firstIndex)
            {
                firstChord = scch.shift();
                
                appendChord(p, line[firstChord[ChordFrom]], firstChord[ChordName]);
                lyricsFrom = 1;
            }
            
            for (sc of scch)
            {
                lyricsTo = sc[ChordFrom];
                
                if (lyricsFrom != lyricsTo) appendLyrics(p, line, lyricsFrom, lyricsTo);
                appendChord(p, line[sc[ChordFrom]], sc[ChordName]);
                
                lyricsFrom = lyricsTo + 1;
            }
            
            if (lyricsFrom < line.length) appendLyrics(p, line, lyricsFrom, line.length);
            
            appendBreak(p);
            if (0 == (i + 1) % PARAGRAPH) appendBreak(p);
        }
    );
    
    parent.appendChild(p);
}

function appendSong(parent, id, song)
{
    var article = document.createElement("article");
    var h2 = document.createElement("h2"); // heading 2
    var details = document.createElement("details");
    var summary = document.createElement("summary");
    
// create bookmarks with ID attribute
    article.id = id;
    
// heading 2
    h2.textContent = song.title;
    article.appendChild(h2);
    
// score
    appendScore(article, song.score);
    
// demo
    summary.textContent = "Demo";///
    details.appendChild(summary);
    
    article.appendChild(details);
    parent.appendChild(article);
}

function createHeader(heading1)
{
    var header = document.createElement("header");
    var h1 = document.createElement("h1"); // heading 1
    
    h1.textContent = heading1;
    
    header.appendChild(h1);
    document.body.appendChild(header);
}

function createMain(songs)
{
    var main = document.createElement("main");
    
    var id = "";
    var song = {};
    
    for ([id, song] of Object.entries(songs)) appendSong(main, id, song);

    document.body.appendChild(main);
}

function createPage(page)///argument:page=>url;parameter:location.pathname
{
    var link = document.createElement("link");
    
// link CSS
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = page.prefix + "css/chord.css";
    document.head.appendChild(link);
    
// title
    document.title = page.heading1;
    
//    createNav(page);///
    createHeader(page.heading1);
    createMain(page.songs);
}
