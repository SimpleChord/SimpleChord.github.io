// chords
var Am = "Am";
var Am7 = "Am7";
var D6 = "D6";
var Dm = "Dm";
var Dm7 = "Dm7";
var Em = "Em";
var EmB = "Em/B";
var F = "F";
var G = "G";
var GB = "G/B";

// other constants
///var HalfSpace = "\u00A0";
var FullSpace = "\u3000";
var PARAGRAPH = 4; // add a break every 4 lines

var LyricsFrom = 0;
var ChordName = 1;
///var LyricsTo = 2;to be used

var TAG =
{
    BR: "br"
};

// functions
function appendRuby(lyric, chord, parent)////////"M" -> "small", i.e. Fm<small>M</small>7
{
    var ruby = document.createElement("ruby");
    var rt = document.createElement("rt");
    
    ruby.textContent = (" " === lyric) ? FullSpace : lyric;///to be improved if lyrics are english!
    rt.textContent = chord;
    
    ruby.appendChild(rt);
    parent.appendChild(ruby);
}

function appendLyrics(line, from, to, parent) // line: a line of lyrics
{
    var part = line.slice(from, to);
    var text = document.createTextNode(part);
    
    parent.appendChild(text);
}

function createScore(score, parent)
{
    var scch = [];
    var line = "";
    var firstIndex = 0;
    var firstChord = [];
    var lyricsFrom = 0;
    var lyricsTo = 0;
    
    for (i in score.chord)
    {
        scch = score.chord[i];
        line = FullSpace + score.lyric[i] + FullSpace;
        firstIndex = scch[0][LyricsFrom];
        lyricsFrom = 0;
        
        if (0 == i % PARAGRAPH) parent.appendChild(document.createElement(TAG.BR));
        
        if (0 == firstIndex)
        {
            firstChord = scch.shift();
            
            appendRuby(line[firstChord[LyricsFrom]], firstChord[ChordName], parent);
            lyricsFrom = 1;
        }
        
        for (sc of scch)
        {
            lyricsTo = sc[LyricsFrom];
            
            if (lyricsFrom != lyricsTo) appendLyrics(line, lyricsFrom, lyricsTo, parent);
            appendRuby(line[sc[LyricsFrom]], sc[ChordName], parent);
            lyricsFrom = lyricsTo + 1;
        }
        
        if (lyricsFrom < line.length) appendLyrics(line, lyricsFrom, line.length, parent);
        
        parent.appendChild(document.createElement(TAG.BR));
    }
}

function createSong(song)
{
    var details = document.createElement("details");
    var summary = document.createElement("summary");
    
    summary.textContent = song.title;
    details.appendChild(summary);
    createScore(song.score, details);
    
    details.open = true;
    document.body.appendChild(details);
}
