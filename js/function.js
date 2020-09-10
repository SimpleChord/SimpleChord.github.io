function getPage(url)
{
    var splitURL = url.split("/");
    var name = splitURL.pop().split(".").shift(); // name of current page
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

function checkWidth(language)
{
    switch (language)
    {
        case "en":
        case "sv":
            return HALF;
        case "ja":
        case "th":
        case "zh":
            return FULL;
    }
}

function appendTextNode(text, tag)
{
    var node = document.createTextNode(text);
    
    tag.appendChild(node);
}

function appendExtractedText(original, from, to, container)
{
    appendTextNode(original.slice(from, to), container);
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
        case TAG.BoALP:
            return [
                TAG.a,
                original[ELEMENT.between],
                getLink(prefix, HTML, original[ELEMENT.alp]) + "#" + original[ELEMENT.id]
            ];
        case TAG.CHORD:
            appendChord(original[ELEMENT.between], container);
            return [];
        case TAG.PB:
            appendBreak(container);
            return LB;
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
                
                if (transformed.length > 0)
                {
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
}

function appendParagraph(prefix, type, parent, container)
{
    var p;
    
    if (type in parent)
    {
        p = appendElement(TAG.p, container);
        
        appendRecursively(prefix, parent[type], p);
    }
}

function appendChord(chord, container)
{
    var c = "";
    
    for (c of chord)
        switch (c)
        {
            case "x":
            case "f":
                appendTAGwithTEXT(TAG.sup, ACCIDENTAL[c], container);
                break;
            case "M":
                appendTAGwithTEXT(TAG.small, c, container);
                break;
            default:
                appendTextNode(c, container);
        }
}

function appendRuby(lyrics, chord, container) // append lyrics with chords
{
    var ruby = appendTAGwithTEXT(TAG.ruby, lyrics, container);
    var rt = appendElement(TAG.rt, ruby);
    
    appendChord(chord, rt);
}

function appendLyrics(chords, line, isParagraphBreak, language, container) // a line of lyrics
{
    var firstIndex = chords[0][POSITION]; // index of the 1st chord in the lyrics
    var firstChord = [];
    var chord = "";
    var lyrics = FWS + line; // add a FWS on the left
    var from = 0; // starting position of the lyrics
    var to = 0; // ending position of the lyrics
    var offset = 0; // difference between "from" & "to"
    
    if (0 == firstIndex)
    {
        firstChord = chords.shift();
        
        appendRuby(FWS, firstChord[NAME], container);
        from = 1;
    }
    
    for (chord of chords)
    {
// append lyrics without chords if necessary
        to = chord[POSITION];
        if (from != to) appendExtractedText(lyrics, from, to, container);
        
// append lyrics with a chord/chords
        if (FULL == checkWidth(language)) offset = 1;
        else offset = Math.ceil(chord[NAME].length / 2); // HALF
        
        from = Math.min(to + offset, lyrics.length);
        appendRuby(lyrics.slice(to, from), chord[NAME], container); // swap "from" & "to" so that the next "from" need not be set!
    }
    
    if (from < lyrics.length) appendExtractedText(lyrics, from, lyrics.length, container);
    
    appendBreak(container);
    if (isParagraphBreak) appendBreak(container);
}

function append__tro(__tro, score, language, container) // intro or outro
{
    var chords = [];
    var text = "";
    var difference = 0;
    var i;
    
    if (__tro in score)
    {
        chords = score[__tro];
        text = DICTIONARY[__tro][language];
        difference = chords[chords.length - 1][POSITION] - text.length;
        
        if (difference > 0)
            for (i = 0; i < difference; i++) text += FWS; // fill with FWSs
        
        appendLyrics(chords, text, true, language, container);
    }
}

function appendSection(score, language, container)
{
    var section = appendElement(TAG.section, container);
    var pre = appendElement(TAG.pre, section);
    
    append__tro("intro", score, language, pre);
    
    score.chords.forEach
    (
        function (sc, i)
        {
            var line = score.lyrics[i] + FWS; // add a FWS to each line of lyrics on the right
            
            if (FULL == checkWidth(language)) line = line.replace(/ /g, FWS); // replace all of the white spaces with FWSs
            
            appendLyrics(sc, line, 0 == (i + 1) % PARAGRAPH, language, pre);
        }
    );
    
    append__tro("outro", score, language, pre);
}

function appendArticle(page, bookmark, container)
{
    var article = appendElement(TAG.article, container);
    var details;
    var demo;
    var song = page.information.main[bookmark];
    var pa = page.addition;
    var sd; // song.details if it exists
    
    article.id = bookmark; // create bookmarks with ID attribute
    
    appendTAGwithTEXT(TAG.h2, song.h2, article);
    appendParagraph(pa.prefix, "preface", song, article);
    appendSection(song.section, pa.language, article);
    appendParagraph(pa.prefix, "postscript", song, article);
    
// demo
    details = appendElement(TAG.details, article);
    appendTAGwithTEXT(TAG.summary, DICTIONARY.demo[pa.language], details);
    
    if (TAG.details in song)
    {
        sd = song.details;
        
        if ("demo" in sd)
        {
            demo = appendElement(sd.demo, details);
            demo.src = getLink(pa.prefix, sd.demo, pa.path + "/" + bookmark);
            demo.controls = true;
            demo.onmouseenter = function()
            {
                demo.play();
            };
        }
        
        appendParagraph(pa.prefix, "comment", sd, details);
    }
    else appendTAGwithTEXT(TAG.p, DICTIONARY.unavailable[pa.language], details);
}

function createNav(addition)
{
    var nav = appendElement(TAG.nav, document.body);
    
    appendMenus(addition, "", DATA, nav);
}

function createHeader(pih) // page.information.header
{
    var header = appendElement(TAG.header, document.body);
    
    appendTAGwithTEXT(TAG.h1, pih.h1, header);
}

function createMain(page)
{
    var main = appendElement(TAG.main, document.body);
    var id = "";
    
    for (id in page.information.main) appendArticle(page, id, main);
}

function createAside(pim) // page.information.main
{
    var aside = appendElement(TAG.aside, document.body);
    var ol = appendElement(TAG.ol, aside);
    var li;
    var a;
    var id = "";
    var song = {};
    
    for ([id, song] of Object.entries(pim))
    {
        li = appendElement(TAG.li, ol);
        a = appendTAGwithTEXT(TAG.a, song.h2, li);
        a.href = "#" + id;
    }
}

function createFooter(addition)
{
    var footer = appendElement(TAG.footer, document.body);
    var small = appendElement(TAG.small, footer);
    
    appendRecursively(addition.prefix, DICTIONARY.footer[addition.language], small);
}

function createPage(url)
{
    var link = appendElement(TAG.link, document.head);
    var page = getPage(url);
    var pi = page.information;
    var pih = pi.header;
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
    createAside(pi.main);
    createFooter(pa);
}
