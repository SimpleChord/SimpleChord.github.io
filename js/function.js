function getPage(url)
{
    var splitURL = url.split("/");
    var name = splitURL.pop().split(".").shift(); // the name of current page
    var page =
    {
        information: {},
        addition:
        {
            prefix: "../", // prefix to go up directories
            top: name, // top menu, used to highlight the current NAV link
            path: name, // effective path without extension
            language: ""
        }
    };
    
    if (name in DATA) page.information = DATA[name];
    else
    {
        page.addition.prefix = "../../";
        page.addition.top = splitURL.pop();
        page.addition.path = page.addition.top + "/" + name;
        page.information = DATA[page.addition.top].classification[name];
    }
    page.addition.language = DATA[page.addition.top].language;
    
    return page;
}

function getLink(prefix, folder, file) // "file" may be "path", "base" or "path/base".
{
    var extension = (folder in FORMAT) ? FORMAT[folder] : folder;
    
    return prefix + folder + "/" + file + "." + extension;
}

function appendElement(tag, container) // Text is not added or Attributes are not set yet.
{
    var element = document.createElement(tag);
    
    container.appendChild(element);
    
    return element;
}

function appendBreak(container)
{
    appendElement(TAG.br, container);
}

function appendTextNode(text, tag)
{
    var node = document.createTextNode(text);
    
    tag.appendChild(node);
}

function appendTAGwithTEXT(tag, text, container)
{
    var element = appendElement(tag, container);
    
    appendTextNode(text, element);
    
    return element;
}

function appendMenus(addition, path, parent, container) // create menus recursively
{
    var ul = appendElement(TAG.ul, container);
    var li;
    var a;
    var menu = "";
    var child = {};
    var currentPath = "";
    
    for ([menu, child] of Object.entries(parent))
    {
        li = appendElement(TAG.li, ul);
        a = appendTAGwithTEXT(TAG.a, child.nav, li);
        currentPath = path + menu;
        
        if (addition.top === currentPath)
        {
            a.style.backgroundColor = "red";
            a.style.color = "gold";
        }
        
        if ("classification" in child) appendMenus(addition, currentPath + "/", child.classification, li);
        else
            if (addition.path !== currentPath) a.href = getLink(addition.prefix, HTML, currentPath);
    }
}

function transform2tag(prefix, original, container)
{
    switch (original[ELEMENT.tag])
    {
        case TAG.PB:
            appendBreak(container);
            return LB;
        case TAG.BoALP:
            return [TAG.a, original[ELEMENT.between], getLink(prefix, HTML, original[ELEMENT.alp]) + "#" + original[ELEMENT.id]];
        default:
            return original;
    }
}

function appendRecursively(prefix, content, container)
{
    var c; // string or array
    var transformed = [];
    var element;
    
    if ("string" === typeof content) appendTextNode(content, container);
    else // array
        for (c of content)
            if ("string" === typeof c) appendTextNode(c, container);
            else // array
            {
                transformed = transform2tag(prefix, c, container); // transform "c" into an HTML tag if necessary
                element = appendElement(transformed[ELEMENT.tag], container);
                
                switch (transformed[ELEMENT.tag])
                {
                    case TAG.br:
                        break;
                    case TAG.a:
                        element.href = transformed[ELEMENT.href];
                    default:
                        appendRecursively(prefix, transformed[ELEMENT.between], element);
                }
            }
}

function appendParagraph(prefix, type, song, container)
{
    var p;
    
    if (type in song)
    {
        p = appendElement(TAG.p, container);
        
        appendRecursively(prefix, song[type], p);
    }
}

function appendChord(lyrics, chord, container)
{
    var ruby = document.createElement("ruby");///to use appendTAGwithTEXT?
    var rt = document.createElement("rt");///to use appendElement?
    var c = "";
    
    ruby.innerText = lyrics;///to be improved if lyrics are not CJK! | to use appendTAGwithTEXT?
    
    for (c of chord)
        switch (c)
        {
            case "M":
                appendTAGwithTEXT(TAG.small, c, rt);
                break;
            case "#":
                appendTAGwithTEXT(TAG.sup, c, rt);
                break;
            case "f":
                appendTAGwithTEXT(TAG.sup, "b", rt);
                break;
            default:
                appendTextNode(c, rt);
        }
    
    ruby.appendChild(rt);
    container.appendChild(ruby);
}

function appendLyrics(line, from, to, container) // line: a line of lyrics
{
    appendTextNode(line.slice(from, to), container);
}

function append__tro(__tro, score, language, container) // intro or outro
{
    var st = "";
    var chords = "";
    
    if (__tro in score)
    {
        for (st of score[__tro]) chords += st + SPACE; // "score[__tro]" is an array.
        
        appendTextNode(SPACE, container);
        appendChord(DICTIONARY[__tro][language], chords.slice(0, -1), container); // remove the last SPACE
    }
}

function appendScore(score, language, container)
{
    var section = appendElement("section", container);
    var p = appendElement(TAG.p, section);
    
    append__tro("intro", score, language, p);
    
    score.chords.forEach
    (
        function(scch, i)
        {
            var firstIndex = scch[0][ChordFrom]; // the index of the 1st chord in a line of lyrics
            var firstChord = [];
            var line = SPACE + score.lyrics[i].replace(/ /g, SPACE) + SPACE; // replace all of the half-width spaces with full-width ones, and add 2 more to a line of lyrics
            var lyricsFrom = 0;
            var lyricsTo = 0;
            var sc = "";
            
            ///if not CJK, half space???
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
}

function appendDemo(addition, type, baseName, container)
{
    var demo = appendElement(type, container);
    
    demo.src = getLink(addition.prefix, type, addition.path + "/" + baseName);
    demo.controls = true;
    demo.onmouseenter = function()
    {
        demo.play();
    };
}

function appendSong(page, bookmark, container)
{
    var article = appendElement("article", container);
    var details;
    var song = page.information.main[bookmark];
    var pa = page.addition;
    
    article.id = bookmark; // create bookmarks with ID attribute
    
    appendTAGwithTEXT("h2", song.h2, article);
    appendParagraph(pa.prefix, "preface", song, article);
    appendScore(song.score, pa.language, article);
    appendParagraph(pa.prefix, "postscript", song, article);
    
// demo
    if (TAG.details in song)
    {
        details = appendElement(TAG.details, article);
        
        appendTAGwithTEXT("summary", DICTIONARY.demo[pa.language], details);
        appendDemo(pa, song.details, bookmark, details);
        appendParagraph(pa.prefix, "comment", song, details);
    }
}

function createNav(addition)
{
    var nav = appendElement("nav", document.body);
    
    appendMenus(addition, "", DATA, nav);
}

function createHeader(pih) // page.information.header
{
    var header = appendElement("header", document.body);
    
    appendTAGwithTEXT("h1", pih.h1, header);
}

function createMain(page)
{
    var main = appendElement("main", document.body);
    var id = "";
    
    for (id in page.information.main) appendSong(page, id, main);
}

function createFooter(addition)
{
    var footer = appendElement("footer", document.body);
    var small = appendElement(TAG.small, footer);
    
    appendRecursively(addition.prefix, DICTIONARY.footer[addition.language], small);
}

function createPage(url)
{
    var link = appendElement("link", document.head);
    var page = getPage(url);
    var pih = page.information.header;
    var pa = page.addition;
    
// link CSS
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = getLink(pa.prefix, "css", "chord");
    
// title
    document.title = pih.h1;
    
    createNav(pa);
    createHeader(pih);
    createMain(page);
//    createAside(page);///
    createFooter(pa);
}
