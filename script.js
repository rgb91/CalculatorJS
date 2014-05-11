var priority={};
priority['plus']     = 0;
priority['minus']    = 0;
priority['multiply'] = 0;
priority['division'] = 0;

var correspondingChar={};
correspondingChar['plus']     = '+';
correspondingChar['minus']    = '-';
correspondingChar['multiply'] = '\xD7';
correspondingChar['division'] = '\xF7';
correspondingChar['*']        = '\xD7';
correspondingChar['/']        = '\xF7';
correspondingChar['percent']  = '%';
correspondingChar['square']   = '\xB2';
correspondingChar['open_bracket']  = '(';
correspondingChar['close_bracket'] = ')';

var infoArr = [
    {
        linkText: '\xA0C\xA0',
        funParam: 'clear'
    },{
        linkText: '\xA0\xF7\xA0',
        funParam: 'division'
    },{
        linkText: '\xA0\xD7\xA0',
        funParam: 'multiply'
    },{
        linkText: '\xA0<\xA0',
        funParam: 'back'
    },{
        linkText: '\xA0.\xA0',
        funParam: '.'
    },{
        linkText: '\xA0%\xA0',
        funParam: 'percent'
    },{
        linkText: '\xA0\xB2\xA0',
        funParam: 'square'
    },{
        linkText: '\xA0\u221a\xA0',
        funParam: 'sqrt'
    },{
        linkText: '\xA07\xA0',
        funParam: 7,
        classnm: 'num_button'
    },{
        linkText: '\xA08\xA0',
        funParam: 8,
        classnm: 'num_button'
    },{
        linkText: '\xA09\xA0',
        funParam: 9,
        classnm: 'num_button'
    },{
        linkText: '\xA0-\xA0',
        funParam: 'minus'
    },{
        linkText: '\xA04\xA0',
        funParam: 4,
        classnm: 'num_button'
    },{
        linkText: '\xA05\xA0',
        funParam: 5,
        classnm: 'num_button'
    },{
        linkText: '\xA06\xA0',
        funParam: 6,
        classnm: 'num_button'
    },{
        linkText: '\xA0+\xA0',
        funParam: 'plus'
    },{
        linkText: '\xA01\xA0',
        funParam: 1,
        classnm: 'num_button'
    },{
        linkText: '\xA02\xA0',
        funParam: 2,
        classnm: 'num_button'
    },{
        linkText: '\xA03\xA0',
        funParam: 3,
        classnm: 'num_button'
    },{
        id:       'equal_button',
        linkText: '\xA0=\xA0',
        funParam: 'equal',
        rowspan:  '2',
        classnm:  'equal_button',
        style:    'display: block; margin-left: auto; margin-right: auto; height: 82px; width: 30px;',
    },{
        linkText: '\xA0(\xA0',
        funParam: 'open_bracket'
    },{
        linkText: '\xA00\xA0',
        funParam: 0,
        classnm: 'num_button'
    },{
        linkText: '\xA0)\xA0',
        funParam: 'close_bracket'
    }
];

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function keyDown(evt){
    if (evt.keyCode == 106) {
        evt.preventDefault(true);
        evt.stopPropagation(true);

        var value = this.value + '\xD7';
        console.log(value);
        document.getElementById("input_editor_textfield").value = value;

//        evt.stopPropagation(false);
//        evt.preventDefault(false);
    }
    else if (evt.keyCode == 111) {
        var value = this.value.substr(0,this.value.length) + '\xF7';
        //document.getElementById("input_editor_textfield").value = value;
    }
    else if (evt.keyCode == 13) {
        document.getElementById("equal_button").click();
    }
    else {
        console.log( String.fromCharCode(evt.keyCode) );
    }
}
function init(){
    document.getElementById("input_viewer_textfield").value = "";
    document.getElementById("input_editor_textfield").value = "";
    document.getElementById("input_editor_textfield").addEventListener('keydown', keyDown, false);
    //document.getElementById("input_editor_textfield").addEventListener('keydown', editorOnChangeListener(), false);
    document.getElementById("input_editor_textfield").focus();
    
    createTable();
}
window.onload=init;

function createTable(){

    for (var i=0; i<6; i++){
        var tr = document.createElement("tr");
        tr.className = "button_row";
        
        for(var j=0; j<4; j++){
            if ( infoArr[(i*4)+j] == null) continue;


            var td = document.createElement("td");
            var aLink = document.createElement("a");
            var linkText = document.createTextNode(infoArr[(i*4)+j]['linkText']);

            td.className = "button_col";
            if ( infoArr[(i*4)+j]['rowspan'] != null )
                td.setAttribute("rowspan", infoArr[(i*4)+j]['rowspan'] );
            aLink.className="a_demo_one";
            if ( infoArr[(i*4)+j]['classnm'] != null )
                aLink.className = aLink.className + " " + infoArr[(i*4)+j]['classnm'];
            aLink.setAttribute("onclick", "buttonProcessor('"+infoArr[(i*4)+j]['funParam']+"',1);")
            if ( infoArr[(i*4)+j]['style'] != null )
                aLink.setAttribute("style", infoArr[(i*4)+j]['style']);
            if ( infoArr[(i*4)+j]['id'] != null )
                aLink.setAttribute("id", infoArr[(i*4)+j]['id']);
            if ( infoArr[(i*4)+j]['onkeydown'] != null )
                aLink.setAttribute("onkeydown", infoArr[(i*4)+j]['onkeydown']);
            
            aLink.appendChild(linkText);
            td.appendChild(aLink);
            tr.appendChild(td);
            td=null;
            aLink=null;
        }

        document.getElementById("button_table").appendChild(tr);
        tr = null;
    }
}
function checkTextFieldValidity(value){
    
    var i;
    for (i=0; i<value.length; i++) {
        if ( buttonProcessor(value.charAt(i), 0) == false ) break;
    }
    if ( i== value.length ) {
        document.getElementById("messageDiv").style.display = "none";
        return true;
    }
    else return false;
}

function buttonProcessor(value, other){

    //console.log(value);

    if ( isNum(value) ){
        if (other) viewOnScreen(value);
        document.getElementById("messageDiv").style.display = "none";
        return true;
    } else if ( isOp(value)){
        if (other) viewOnScreen(correspondingChar[value]);
        document.getElementById("messageDiv").style.display = "none";
        return true;
    } else if ( isClear(value) ){
        clearScreen();
        document.getElementById("messageDiv").style.display = "none";
        return true;
    } else if ( isBackSpace(value) ){
        if (other) backSpaceOperation();
        document.getElementById("messageDiv").style.display = "none";
        return true;
    } else if ( isSqrt(value) ){
        if (other) sqrtOperation();
        document.getElementById("messageDiv").style.display = "none";
        return true;
    } else if ( isPercent(value) ){
        if (other) percentOperation(value);
        document.getElementById("messageDiv").style.display = "none";
        return true;
    } else if ( isBracket(value) ){
        document.getElementById("messageDiv").style.display = "none";
        if (other) viewOnScreen(correspondingChar[value]);
        return true;
    } else if ( isSquare(value) ){
        document.getElementById("messageDiv").style.display = "none";
        if (other) squareOperation(value);
        return true;
    } else if ( isEqual(value) ){
        document.getElementById("messageDiv").style.display = "none";
        showResult();
    } else {
        document.getElementById("messageDiv").innerHTML = "<p>Invalid Input</p>";
        document.getElementById("messageDiv").style.display = "block";
        return false;
    }
}



function viewOnScreen(val, isFullString = false){
    var textFieldVal = document.getElementById("input_editor_textfield").value;
    if (!isFullString) document.getElementById("input_editor_textfield").value = textFieldVal+val.toString();
    else document.getElementById("input_editor_textfield").value = val;
    return;
}
function clearScreen(){
    document.getElementById("input_editor_textfield").value = "";
    return;
}
function backSpaceOperation(){
    var textFieldVal = document.getElementById("input_editor_textfield").value;
    document.getElementById("input_editor_textfield").value = textFieldVal.substring(0,textFieldVal.length-1);
    return;
}
function sqrtOperation(){
    viewOnScreen('\u221a');
    viewOnScreen('(');
}
function percentOperation(val){
    if (val=='%') viewOnScreen(val);
    else viewOnScreen(correspondingChar[val]);
}
function squareOperation(val){
    if (val=='\xB2') viewOnScreen(val);
    else viewOnScreen(correspondingChar[val]);

}




function isNum(val){
    if ( val >= 0 && val <= 9 ) return true;
    else if ( val == '.' ) return true;

    return false;
}
function isOp(val){
    if (val=='plus' || val=='minus' || val=='multiply' || val=='division' ) return true;
    else if ( val=='+' || val=='-' || val=='\xD7' || val=='\xF7' ) return true;
    else return false;
}
function isClear(val){
    if (val=='clear') return true;
    return false;
}
function isBackSpace(val){
    if (val=='back') return true;
    return false;
}
function isEqual(val){
    if (val=='equal') return true;
    return false;
}
function isBracket(val){
    if (val=='open_bracket' || val=='close_bracket' ) return true;
    else if (val == '(' || val == ')' ) return true;
    return false;
}
function isSqrt(val){
    if (val=='sqrt') return true;
    else if (val == '\u221a') return true;
    return false;
}
function isPercent(val){
    if (val == '%') return true;
    else if (val == 'percent') return true;
    return false;
}
function isSquare(val){
    if (val == 'square') return true;
    else if (val == '\xB2') return true;
    return false;
}
function showResult(){

    var currentText = document.getElementById("input_editor_textfield").value;
    var currentTextShow = currentText;
    if ( checkTextFieldValidity(currentText) == true ){

        currentText = currentText.replace('\xF7', "/");
        currentText = currentText.replace('\xD7', "*");
        currentText = currentText.replace('\u221a', "Math.sqrt");
        currentText = currentText.replace(new RegExp('%','g'),"/100");

        var squarePattern = /\d+\xB2/g;
        var squareMatches = currentText.match(squarePattern);
        if (squareMatches!=null)
            for(var i=0; i<squareMatches.length; i++){
            var replaceString = squareMatches[i].substring(0, squareMatches[i].length-1);
            replaceString = replaceString + "*" + replaceString;
            alert(replaceString);
            currentText = currentText.replace(squareMatches[i], replaceString);
        }

        //alert(currentText);
        document.getElementById("input_viewer_textfield").value = currentTextShow+" =";
        document.getElementById("input_editor_textfield").value = eval(currentText);
    }
}