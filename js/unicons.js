/* Unicons © 2010 Brad Choate
 * Please report issues at http://github.com/bradchoate/unicons/issues
 */

var unicon_table = [
    "❝", "❞", "☃", "♥", "❤", "♠", "♦", "♣", "☙", "❧", "❦", "✌", "☺", "☹",
    "☎", "☑", "✔", "✄", "✎", "☮", "★", "☆", "☁", "☂", "☔", "☒", "✂", "✈",
    "☕", "⌚", "⌛", "♪", "♫", "⚠", "✿", "❄", "✰", "♔", "♕", "♖", "♗", "♘",
    "♙", "♚", "♛", "♜", "♝", "♞", "♟", "⚐", "⚑"
];

$(document).ready(function() {
    if (document.characterSet != 'UTF-8') {
        if (!confirm("This document doesn't appear to support Unicode (character set is '" + document.characterSet + "'). Continue anyway?")) {
            return;
        }
    }

    var unicon_markup = '<div class="unicons-ui"><div class="unicons-toggle">☺</div><div class="unicons-frame"><ul class="unicons-table">';
    for (var i = 0, ii = unicon_table.length; i < ii; i++) {
        var ch = unicon_table[i];
        unicon_markup += '<li><a href="#" onclick="return unicon_insert(event, \'' +
            ch + '\')">' + ch + '</a></li>';
    }
    unicon_markup += '</ul></div></div>';
    $("textarea").each(function() {
        if (!$(this).hasClass("no-unicons"))
            $(this).wrap('<div class="unicons-textarea-wrap"/>');
    });
    $(".unicons-textarea-wrap").each(function() {
        $(this).prepend(unicon_markup);
    });
});

// from: http://www.scottklarr.com/topic/425/how-to-insert-text-into-a-textarea-where-the-cursor-is/
function insertAtCaret(txtarea, text) {
    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
        "ff" : (document.selection ? "ie" : false ) );

    if (br == "ie") { 
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        strPos = range.text.length;
    }
    else if (br == "ff")
        strPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0,strPos);
    var back = (txtarea.value).substring(strPos,txtarea.value.length);
    txtarea.value = front + text + back;
    strPos = strPos + text.length;
    if (br == "ie") { 
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        range.moveStart ('character', strPos);
        range.moveEnd ('character', 0);
        range.select();
    }
    else if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }
    txtarea.scrollTop = scrollPos;
}

function unicon_insert(ev, ch) {
    var txt = $(ev.target).closest(".unicons-textarea-wrap").children("textarea").get(0);
    insertAtCaret(txt, ch);
    return false;
}
