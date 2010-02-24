/* Unicons © 2010 Brad Choate
 * A self-contained, bookmarklet flavor.
 * Please report issues at http://github.com/bradchoate/unicons/issues
 */
void(function() {
    if (document.characterSet != 'UTF-8') {
        if (!confirm("This document doesn't appear to support Unicode (character set is '" + document.characterSet + "'). Continue anyway?")) {
            return;
        }
    }

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

    window.unicon_insert = function(ev, ch) {
        var txt = jQuery(ev.target).parents(".unicons-textarea-wrap").children("textarea").get(0);
        insertAtCaret(txt, ch);
        return false;
    };

    var unicons = function() {
        var unicon_table = [
            "❝", "❞", "☃", "♥", "❤", "♠", "♦", "♣", "☙", "❧", "❦", "✌", "☺",
            "☹", "☎", "☑", "✔", "✄", "✎", "☮", "★", "☆", "☁", "☂", "☔", "☒",
            "✂", "✈", "☕", "⌚", "⌛", "♪", "♫", "⚠", "✿", "❄", "✰", "♔", "♕",
            "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝", "♞", "♟", "⚐", "⚑"
        ];
        var unicon_markup = '<div class="unicons-ui"><div class="unicons-toggle">☺</div><div class="unicons-frame"><ul class="unicons-table">';
        for (var i = 0, ii = unicon_table.length; i < ii; i++) {
            var ch = unicon_table[i];
            unicon_markup += '<li><a href="#" onclick="return unicon_insert(event, \'' +
                ch + '\')">' + ch + '</a></li>';
        }
        unicon_markup += '</ul></div></div>';
        jQuery("textarea").each(function() {
            jQuery(this).wrap('<div class="unicons-textarea-wrap"/>');
        });
        jQuery(".unicons-textarea-wrap").each(function() {
            jQuery(this).prepend(unicon_markup);
        });
    };

    var css = document.createElement('style');
    var css_rules = '.unicons-textarea-wrap {position: relative;display: inline-block;}\n.unicons-textarea-wrap:after {display: block;content: " ";visibility: hidden;clear: both;height: 0.1px;font-size: 0.1em;line-height: 0;}\n.unicons-textarea-wrap:hover .unicons-toggle {display: block;}\n.unicons-toggle {text-align:center;font-size: 16px;display: none;position: absolute;top: 0;right: 0;background-color: #000;color: #fff;width: 18px;margin: 0;padding: 3px;opacity: 0.5;-moz-opacity: 0.5;filter:alpha(opacity=50);}\n.unicons-ui:hover .unicons-toggle {display: none;}\n.unicons-ui:hover .unicons-frame {display: block;}\n.unicons-frame {display: none;background-color: #ccc;width: 75%;top: 0;right: 0;position: absolute;}\n.unicons-table {margin: 0;padding: 0;font-size: 20px;}\n.unicons-table li {display: inline;list-style: none;margin: 0;padding: 0;}\n.unicons-table a {display: inline-block;text-align: center;width: 20px;margin: 0;padding: 5px;}\n.unicons-table a,.unicons-table a:visited,.unicons-table a:link {text-decoration: none;color: #000;}\n.unicons-table a:hover {background-color: #000;color: #fff;}';
    if (document.all) {
        css.innerText = css_rules;
    } else {
        css.textContent = css_rules;
    }
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(css);

    if (! window.jQuery) {
        var s = document.createElement('script');
        s.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
        head.appendChild(s);
        s.onload = unicons;
    }
    else {
        unicons();
    }
} ())
