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
    page.addition.language = LANGUAGE[page.addition.top];
    
    return page;
}

function getLink(prefix, folder, file)
{
    return prefix + folder + "/" + file;
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
    var ul = document.createElement(TAG.ul);
    var li;
    var a;
    var menu = "";
    var child = {};
    var currentPath = "";
    
    for ([menu, child] of Object.entries(parent))
    {
        li = document.createElement(TAG.li);
        a = appendTAGwithTEXT(TAG.a, child.nav, li);
        currentPath = path + menu;
        
        if (addition.top === currentPath)
        {
            a.style.backgroundColor = "red";
            a.style.color = "gold";
        }
        
        if ("classification" in child) appendMenus(addition, currentPath + "/", child.classification, li);
        else
            if (addition.path !== currentPath) a.href = addition.prefix + "html" + "/" + currentPath + ".html";
        
        ul.appendChild(li);
    }
    
    container.appendChild(ul);
}

function transform2tag(original, container)
{
    switch (original[ELEMENT.tag])
    {
        case TAG.PB:
            appendBreak(container);
            return LB;
        default:
            return original;
    }
}

function appendRecursively(content, container)
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
                transformed = transform2tag(c, container); // transform "c" into an HTML tag if necessary
                element = document.createElement(transformed[ELEMENT.tag]);
                
                switch (transformed[ELEMENT.tag])
                {
                    case TAG.br:
                        break;
                    default:
                        appendRecursively(transformed[ELEMENT.between], element);
                }
                
                container.appendChild(element);
            }
}

function appendParagraph(type, song, container)
{
    var p;
    
    if (type in song)
    {
        p = document.createElement(TAG.p);
        
        appendRecursively(song[type], p);
        
        container.appendChild(p);
    }
}

function appendChord(lyrics, chord, container)
{
    var ruby = document.createElement("ruby");///to use appendTAGwithTEXT?
    var rt = document.createElement("rt");
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

function append__tro(__tro, score, language, container)
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
    var section = document.createElement("section");
    var p = document.createElement(TAG.p);
    
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
    
    section.appendChild(p);
    container.appendChild(section);
}

function appendDemo(addition, type, baseName, container)
{
    var demo = document.createElement(type);
    
    demo.src = getLink(addition.prefix, type, addition.path + "/" + baseName + "." + FORMAT[type]);
    demo.controls = true;
    demo.onmouseenter = function()
    {
        demo.play();
    };
    
    container.appendChild(demo);
}

function appendSong(page, bookmark, container)
{
    var article = document.createElement("article");
    var details;
    var song = page.information.main[bookmark];
    var pa = page.addition;
    
    article.id = bookmark; // create bookmarks with ID attribute
    
    appendTAGwithTEXT("h2", song.h2, article);
    appendParagraph("preface", song, article);
    appendScore(song.score, pa.language, article);
    appendParagraph("postscript", song, article);
    
// demo
    if (TAG.details in song)
    {
        details = document.createElement(TAG.details);
        
        appendTAGwithTEXT("summary", DICTIONARY.demo[pa.language], details);
        appendDemo(pa, song.details, bookmark, details);
        appendParagraph("comment", song, details); // comment
        
        article.appendChild(details);
    }
    
    container.appendChild(article);
}

function createNav(addition)
{
    var nav = document.createElement("nav");
    
    appendMenus(addition, "", DATA, nav);
    
    document.body.appendChild(nav);
}

function createHeader(pih) // page.information.header
{
    var header = document.createElement("header");
    
    appendTAGwithTEXT("h1", pih.h1, header);
    
    document.body.appendChild(header);
}

function createMain(page)
{
    var main = document.createElement("main");
    var id = "";
    
    for (id in page.information.main) appendSong(page, id, main);
    
    document.body.appendChild(main);
}

function createFooter(language)
{
    var footer = document.createElement("footer");
    var small = document.createElement(TAG.small);
    
    appendRecursively(DICTIONARY.footer[language], small);
    
    footer.appendChild(small);
    document.body.appendChild(footer);
}

function createPage(url)
{
    var link = document.createElement("link");
    var page = getPage(url);
    var pih = page.information.header;
    var pa = page.addition;
    
// link CSS
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = getLink(pa.prefix, "css", "chord.css");
    document.head.appendChild(link);
    
// title
    document.title = pih.h1;
    
    createNav(pa);
    createHeader(pih);
    createMain(page);
//    createAside(page);///
    createFooter(pa.language);
}
