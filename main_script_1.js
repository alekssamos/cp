
////
// edited by Alex33
// Source / description: http://javascript.ru/unsorted/top-10-functions#9-onready
// compiled: http://closure-compiler.appspot.com/home#code
function bindReady(handler){var called=false;function ready(){if(called)return;called=true;handler()}if(document.addEventListener)document.addEventListener("DOMContentLoaded",function(){ready()},false);else if(document.attachEvent){if(document.documentElement.doScroll&&window==window.top){var tryScroll=function(){if(called)return;if(!document.body)return;try{document.documentElement.doScroll("left");ready()}catch(e){setTimeout(tryScroll,0)}};tryScroll()}document.attachEvent("onreadystatechange",function(){if(document.readyState===
"complete")ready()})}if(window.addEventListener)window.addEventListener("load",ready,false);else if(window.attachEvent)window.attachEvent("onload",ready)}readyList=[];
function onReady(handler){if(!readyList.length)bindReady(function(){for(var i=0;i<readyList.length;i++)readyList[i]()});readyList.push(handler)};
////

////
// edited by Alex33
// Source / description: http://htmlbook.ru/html5/storage
function supports_html5_storage() {
try {
return 'localStorage' in window && window['localStorage'] !== null;
} catch (e) {
return false;
}
}
////

////
// edited by Alex33
// Source: http://web-answers.ru/questions-and-answers/javascript/jquery/kak-zadat-pozitsiyu-kursora-v-textarea-na-javascript/
function setSelectionRange(input, selectionStart, selectionEnd) {
if (input.setSelectionRange) {
input.focus();
input.setSelectionRange(selectionStart, selectionEnd);
}
else if (input.createTextRange) {
var range = input.createTextRange();
range.collapse(true);
range.moveEnd('character', selectionEnd);
range.moveStart('character', selectionStart);
range.select();
}
}
function setCaretToPos (input, pos) {
setSelectionRange(input, pos, pos);
}
////

////
// edited by Alex33
// Source: http://web-answers.ru/questions-and-answers/javascript/kak-poluchit-pozitsiyu-kursora-v-tekstovom-pole-textarea-na-javascript/
function getCaret(el) { 
if (el.selectionStart) { 
return el.selectionStart; 
} else if (document.selection) { 
el.focus(); 
var r = document.selection.createRange(); 
if (r == null) { 
return 0; 
} 
var re = el.createTextRange(), 
rc = re.duplicate(); 
re.moveToBookmark(r.getBookmark()); 
rc.setEndPoint('EndToStart', re); 
return rc.text.length; 
} 
return 0; 
}
////

////
// edited by Alex33
// Source: http://locutus.io/php/strings/chunk_split/
function chunk_split (body, chunklen, end) { // eslint-disable-line camelcase
//  discuss at: http://locutus.io/php/chunk_split/
// original by: Paulo Freitas
//    input by: Brett Zamir (http://brett-zamir.me)
// bugfixed by: Kevin van Zonneveld (http://kvz.io)
// improved by: Theriault (https://github.com/Theriault)
//   example 1: chunk_split('Hello world!', 1, '*')
//   returns 1: 'H*e*l*l*o* *w*o*r*l*d*!*'
//   example 2: chunk_split('Hello world!', 10, '*')
//   returns 2: 'Hello worl*d!*'
chunklen = parseInt(chunklen, 10) || 76
end = end || '\r\n'
if (chunklen < 1) {
return false
}
return body.match(new RegExp('.{0,' + chunklen + '}', 'g'))
.join(end)
}
////


var allstr=18, allchr=24;
var elem1, elem2, elem3, tmr1;

function getPageNum(lineNum){
var c=(Math.ceil(lineNum/allstr));
if(c<=0){c=1;}
return c;
}
function trimText(txt){
var aStrs=txt.split("\n");
for (var i=0; i<aStrs.length; i++){
aStrs[i]=aStrs[i].replace(/^[\s]+/ig, "").replace(/[\s]+$/ig, "");
}
return aStrs.join("\n").replace(/[\r\n]$/m, "");
}
function countWords(txt){
var iWords=txt.replace(/([.,/?!&])/g, " ").replace(/[\r\n\t]+/g, " ").replace(/[\s]{2,}/g, " ").replace(/^[ ]/g, "").replace(/[ ]$/g, "").split(" ").length;
if(txt.replace(/[\s]+/g,"").length==0){iWords=0;}
return iWords;
}
function splText(str){
var txt=chunk_split(str, allchr, "\n");
try{
txt=trimText(txt);
}catch(er){};
return txt;
}
function countStrs(txt){
return txt.split("\n").length;
}
function onInit(){
elem1=document.getElementById("statusBar1");
if(!elem1){return false;}
elem2=document.getElementById("pagetext");
if(!elem2){return false;}
if(supports_html5_storage()){
var savedtxt=localStorage.getItem("textarea1value"), savedpos=localStorage.getItem("textarea1cursor_pos");
if(savedtxt!==null&&savedtxt!=""){
elem2.value=savedtxt;
}
if(savedpos!==null&&savedpos!=0){
setCaretToPos(elem2, parseInt(savedpos));
}
}
try{
elem3=document.getElementById("btnspl1");
elem3.onclick=function(){
window.setTimeout(function(){
var txt=splText(elem2.value);
elem2.value=txt;
elem2.focus();
},100);
};
}catch(er){};
elem2.onkeyup=onEvt;
elem2.onfocus=onEvt;
elem2.onblur=onEvt;
elem2.onmousemove=onEvt;
elem2.onmouseover=onEvt;
elem2.onmouseout=onEvt;
window.setTimeout(onEvt,100);
}
function onEvt(e){
e = e || window.event;
try{
window.clearTimeout(tmr1);
}catch(er){};
tmr1=window.setTimeout(function(){
var cLen=elem2.value.length, cWords=countWords(elem2.value), cLines=countStrs(splText(elem2.value)), cPages=getPageNum(cLines);
var outstatusstr="символов: <b>"+cLen+"</b>; слов: <b>"+cWords+"</b>; строк: <b>"+cLines+"</b>; страниц: <b>"+cPages+"</b>";
elem1.innerHTML=outstatusstr;
if(supports_html5_storage()){
localStorage.setItem("textarea1value", elem2.value);
localStorage.setItem("textarea1cursor_pos", getCaret(elem2).toString());
}
},100);
}
onReady(onInit);

// "abcdefghjklmnopqrstuvwxyz"
