
String.prototype.decodeEscapeSequence = function () {
    return this.replace(/\\x([0-9A-Fa-f]{2})/g, function () {
        return String.fromCharCode(parseInt(arguments[1], 16));
    });
};
function unpackCode() {
    var type = $("#type").val();
    var text = $("#source").val();
    var result = "";
    if (type == 1) {
        result = unpack(text);
    }
    else if (type == 2) {
        result = unpack(text);
        result = result.decodeEscapeSequence();
    }
    else if (type == 3) {
        result = unPack2(text);
    }
    $("#des").val(result);
}
function unpack(text) {
    var p = text,
        c = p;
    var a = 5,
        x = 1;
    while (x < a) {
        c = unescape(c);
        if (/eval\(+function\(/.test(c)) {
            c = depack(c);
            x++
        } else {
            break
        }
    };
    c = unescape(c);
    c = R(c, {
        indent_size: 1,
        indent_char: '\t'
    });
    return c;
}

function depack(p) {
    if (p != "") {
        c = unescape(p);
        var _e = eval,
            s = "eval=function(v){c=v;};" + c + ";eval=_e;";
        eval(s)
    } else {
        c = p
    };
    return c
}
function toHex(s) {
    // utf8 to latin1
    var s = unescape(encodeURIComponent(s))
    var h = ''
    for (var i = 0; i < s.length; i++) {
        h += s.charCodeAt(i).toString(16)
    }
    return h
}

function fromHex(h) {
    var s = ''
    for (var i = 0; i < h.length; i += 2) {
        s += String.fromCharCode(parseInt(h.substr(i, 2), 16))
    }
    return decodeURIComponent(escape(s))
}