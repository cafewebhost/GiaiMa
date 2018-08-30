R = reformat = function (a, b) {
var d, e, f, g, h, j, k, l, m;
var o, p, q, r, s, u, v;
var w, x, y, z, aa, ab;
var ac;
a = C(a);
b = b || {};
var ad = b.indent_size || 4;
var ae = b.indent_char || ' ';
var opt_preserve_newlines = typeof b.preserve_newlines === 'undefined' ? true: b.preserve_newlines;
var af = b.indent_level || 0;
function trim_output() {
while (e.length && (e[e.length - 1] === ' ' || e[e.length - 1] === m)) {
e.pop()
}
}
function print_newline(a) {
a = typeof a === 'undefined' ? true: a;
ab = false;
trim_output();
if (!e.length) {
return
}
if (e[e.length - 1] !== "\n" || !a) {
e.push("\n")
}
for (var i = 0; i < ac; i += 1) {
e.push(m)
}
}
function print_space() {
var ag = ' ';
if (e.length) {
ag = e[e.length - 1]
}
if (ag !== ' ' && ag !== '\n' && ag !== m) {
e.push(' ')
}
}
function print_token() {
e.push(f)
}
function indent() {
ac += 1
}
function unindent() {
if (ac) {
ac -= 1
}
}
function remove_indent() {
if (e.length && e[e.length - 1] === m) {
e.pop()
}
}
function set_mode(a) {
l.push(k);
k = a
}
function restore_mode() {
y = k === 'DO_BLOCK';
k = l.pop()
}
function in_array(a, b) {
for (var i = 0; i < b.length; i += 1) {
if (b[i] === a) {
return true
}
}
return false
}
function get_next_token() {
var ah = 0;
if (r >= d.length) {
return ['', 'TK_EOF']
}
var c = d.charAt(r);
r += 1;
while (in_array(c, o)) {
if (r >= d.length) {
return ['', 'TK_EOF']
}
if (c === "\n") {
ah += 1
}
c = d.charAt(r);
r += 1
}
var ai = false;
if (opt_preserve_newlines) {
if (ah > 1) {
for (var i = 0; i < 2; i += 1) {
print_newline(i === 0)
}
}
ai = (ah === 1)
}
if (in_array(c, p)) {
if (r < d.length) {
while (in_array(d.charAt(r), p)) {
c += d.charAt(r);
r += 1;
if (r === d.length) {
break
}
}
}
if (r !== d.length && c.match(/^[0-9]+[Ee]$/) && (d.charAt(r) === '-' || d.charAt(r) === '+')) {
var aj = d.charAt(r);
r += 1;
var t = get_next_token(r);
c += aj + t[0];
return [c, 'TK_WORD']
}
if (c === 'in') {
return [c, 'TK_OPERATOR']
}
if (ai && g !== 'TK_OPERATOR' && !ab) {
print_newline()
}
return [c, 'TK_WORD']
}
if (c === '(' || c === '[') {
return [c, 'TK_START_EXPR']
}
if (c === ')' || c === ']') {
return [c, 'TK_END_EXPR']
}
if (c === '{') {
return [c, 'TK_START_BLOCK']
}
if (c === '}') {
return [c, 'TK_END_BLOCK']
}
if (c === ';') {
return [c, 'TK_SEMICOLON']
}
if (c === '/') {
var ak = '';
if (d.charAt(r) === '*') {
r += 1;
if (r < d.length) {
while (! (d.charAt(r) === '*' && d.charAt(r + 1) && d.charAt(r + 1) === '/') && r < d.length) {
ak += d.charAt(r);
r += 1;
if (r >= d.length) {
break
}
}
}
r += 2;
return ['/*' + ak + '*/', 'TK_BLOCK_COMMENT']
}
if (d.charAt(r) === '/') {
ak = c;
while (d.charAt(r) !== "\x0d" && d.charAt(r) !== "\x0a") {
ak += d.charAt(r);
r += 1;
if (r >= d.length) {
break
}
}
r += 1;
if (ai) {
print_newline()
}
return [ak, 'TK_COMMENT']
}
}
if (c === "'" || c === '"' || (c === '/' && ((g === 'TK_WORD' && h === 'return') || (g === 'TK_START_EXPR' || g === 'TK_START_BLOCK' || g === 'TK_END_BLOCK' || g === 'TK_OPERATOR' || g === 'TK_EOF' || g === 'TK_SEMICOLON')))) {
var al = c;
var am = false;
var an = c;
if (r < d.length) {
while (am || d.charAt(r) !== al) {
an += d.charAt(r);
if (!am) {
am = d.charAt(r) === '\\'
} else {
am = false
}
r += 1;
if (r >= d.length) {
return [an, 'TK_STRING']
}
}
}
r += 1;
an += al;
if (al === '/') {
while (r < d.length && in_array(d.charAt(r), p)) {
an += d.charAt(r);
r += 1
}
}
return [an, 'TK_STRING']
}
if (c === '#') {
var ao = '#';
if (r < d.length && in_array(d.charAt(r), v)) {
do {
c = d.charAt(r);
ao += c;
r += 1
} while (r < d.length && c !== '#' && c !== '=');
if (c === '#') {
return [ao, 'TK_WORD']
} else {
return [ao, 'TK_OPERATOR']
}
}
}
if (c === '<' && d.substring(r - 1, r + 3) === '<!--') {
r += 3;
return ['<!--', 'TK_COMMENT']
}
if (c === '-' && d.substring(r - 1, r + 2) === '-->') {
r += 2;
if (ai) {
print_newline()
}
return ['-->', 'TK_COMMENT']
}
if (in_array(c, q)) {
while (r < d.length && in_array(c + d.charAt(r), q)) {
c += d.charAt(r);
r += 1;
if (r >= d.length) {
break
}
}
return [c, 'TK_OPERATOR']
}
return [c, 'TK_UNKNOWN']
}
m = '';
while (ad > 0) {
m += ae;
ad -= 1
}
ac = af;
d = a;
j = '';
g = 'TK_START_EXPR';
h = '';
e = [];
y = false;
z = false;
aa = false;
o = "\n\r\t ".split('');
p = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$'.split('');
v = '0123456789'.split('');
q = '+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |= ::'.split(' ');
s = 'continue,try,throw,return,var,if,switch,case,default,for,while,break,function'.split(',');
k = 'BLOCK';
l = [k];
r = 0;
u = false;
while (true) {
var t = get_next_token(r);
f = t[0];
x = t[1];
if (x === 'TK_EOF') {
break
}
switch (x) {
case 'TK_START_EXPR':
z = false;
set_mode('EXPRESSION');
if (h === ';') {
print_newline()
} else if (g === 'TK_END_EXPR' || g === 'TK_START_EXPR') {} else if (g !== 'TK_WORD' && g !== 'TK_OPERATOR') {
print_space()
} else if (in_array(j, s)) {
print_space()
}
print_token();
break;
case 'TK_END_EXPR':
print_token();
restore_mode();
break;
case 'TK_START_BLOCK':
if (j === 'do') {
set_mode('DO_BLOCK')
} else {
set_mode('BLOCK')
}
if (g !== 'TK_OPERATOR' && g !== 'TK_START_EXPR') {
if (g === 'TK_START_BLOCK') {
print_newline()
} else {
print_space()
}
}
print_token();
indent();
break;
case 'TK_END_BLOCK':
if (g === 'TK_START_BLOCK') {
trim_output();
unindent()
} else {
unindent();
print_newline()
}
print_token();
restore_mode();
break;
case 'TK_WORD':
if (y) {
print_space();
print_token();
print_space();
y = false;
break
}
if (f === 'case' || f === 'default') {
if (h === ':') {
remove_indent()
} else {
unindent();
print_newline();
indent()
}
print_token();
u = true;
break
}
w = 'NONE';
if (g === 'TK_END_BLOCK') {
if (!in_array(f.toLowerCase(), ['else', 'catch', 'finally'])) {
w = 'NEWLINE'
} else {
w = 'SPACE';
print_space()
}
} else if (g === 'TK_SEMICOLON' && (k === 'BLOCK' || k === 'DO_BLOCK')) {
w = 'NEWLINE'
} else if (g === 'TK_SEMICOLON' && k === 'EXPRESSION') {
w = 'SPACE'
} else if (g === 'TK_STRING') {
w = 'NEWLINE'
} else if (g === 'TK_WORD') {
w = 'SPACE'
} else if (g === 'TK_START_BLOCK') {
w = 'NEWLINE'
} else if (g === 'TK_END_EXPR') {
print_space();
w = 'NEWLINE'
}
if (g !== 'TK_END_BLOCK' && in_array(f.toLowerCase(), ['else', 'catch', 'finally'])) {
print_newline()
} else if (in_array(f, s) || w === 'NEWLINE') {
if (h === 'else') {
print_space()
} else if ((g === 'TK_START_EXPR' || h === '=' || h === ',') && f === 'function') {} else if (g === 'TK_WORD' && (h === 'return' || h === 'throw')) {
print_space()
} else if (g !== 'TK_END_EXPR') {
if ((g !== 'TK_START_EXPR' || f !== 'var') && h !== ':') {
if (f === 'if' && g === 'TK_WORD' && j === 'else') {
print_space()
} else {
print_newline()
}
}
} else {
if (in_array(f, s) && h !== ')') {
print_newline()
}
}
} else if (w === 'SPACE') {
print_space()
}
print_token();
j = f;
if (f === 'var') {
z = true;
aa = false
}
if (f === 'if' || f === 'else') {
ab = true
}
break;
case 'TK_SEMICOLON':
print_token();
z = false;
break;
case 'TK_STRING':
if (g === 'TK_START_BLOCK' || g === 'TK_END_BLOCK' || g === 'TK_SEMICOLON') {
print_newline()
} else if (g === 'TK_WORD') {
print_space()
}
print_token();
break;
case 'TK_OPERATOR':
var ap = true;
var aq = true;
if (z && f !== ',') {
aa = true;
if (f === ':') {
z = false
}
}
if (z && f === ',' && k === 'EXPRESSION') {
aa = false
}
if (f === ':' && u) {
print_token();
print_newline();
break
}
if (f === '::') {
print_token();
break
}
u = false;
if (f === ',') {
if (z) {
if (aa) {
print_token();
print_newline();
aa = false
} else {
print_token();
print_space()
}
} else if (g === 'TK_END_BLOCK') {
print_token();
print_newline()
} else {
if (k === 'BLOCK') {
print_token();
print_newline()
} else {
print_token();
print_space()
}
}
break
} else if (f === '--' || f === '++') {
if (h === ';') {
ap = true;
aq = false
} else {
ap = false;
aq = false
}
} else if (f === '!' && g === 'TK_START_EXPR') {
ap = false;
aq = false
} else if (g === 'TK_OPERATOR') {
ap = false;
aq = false
} else if (g === 'TK_END_EXPR') {
ap = true;
aq = true
} else if (f === '.') {
ap = false;
aq = false
} else if (f === ':') {
if (h.match(/^\d+$/)) {
ap = true
} else {
ap = false
}
}
if (ap) {
print_space()
}
print_token();
if (aq) {
print_space()
}
break;
case 'TK_BLOCK_COMMENT':
print_newline();
print_token();
print_newline();
break;
case 'TK_COMMENT':
print_space();
print_token();
print_newline();
break;
case 'TK_UNKNOWN':
print_token();
break
}
g = x;
h = f
}
var ar = e.join('').replace(/\n+$/, '');
return ar
}
C = function (m) {
var r, re = false;
var fn = (m.match(/(^|\n|\W|\s|[,;])([_\$a-z1-9]+)=function\(i\)\{return (?:_d|document)\.getElementById\(i\)\}/i) || [])[2];
if (fn) {
re = fn + "=function\\(i\\)\\{return (?:_d|document)\\.getElementById\\(i\\)\\}";
r = new RegExp(re, "gi");
m = m.replace(r, "");
re = "([^-.a-z1-9_])(" + fn + "\\()";
r = new RegExp(re, "g");
m = m.replace(r, "$1document.getElementById(");
}
//my compressor always put this line at top! so safe to replace
if(/^var _w=window,_n=navigator,_d=document;\n/.test(m)){		
m=m.replace(/^var _w=window,_n=navigator,_d=document;\n/,"");
m = m.replace(/(^|[\s,\|&;\?\:\!=\[\(\{\)\}\+\#])(_n)(\W|$)/g, "$1navigator$3");
m = m.replace(/(^|[\s,\|&;\?\:\!=\[\(\{\)\}\+\#])(_d)(\W|$)/g, "$1document$3");
m = m.replace(/(^|[\s,\|&;\?\:\!=\[\(\{\)\}\+\#])(_w)(\W|$)/g, "$1window$3");
}
return m;
}