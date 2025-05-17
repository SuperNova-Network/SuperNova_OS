function Console(parent){
  var printing=false,printStr,printIndex=0,currentElem;

  Node.prototype.gec0=function(cl){
    return this.getElementsByClassName(cl)[0];
  };
  
  var inputElem=parent.gec0("input"),outputElem=parent.gec0("input_output"),inpBox=parent.gec0("inputbox");
  var caret=parent.gec0("caret"),frontCaret=parent.gec0("frontcaret"),backCaret=parent.gec0("backcaret");
  var dir=parent.gec0("dir"), dirUrl="P:\\picturelements.github.io";
  
  var charLen=4;
  var cmdArr=[],cmdPointer=0;
  var objData={},variables={};

  var help={
    commands: [
      [5],
      ["Command","Description"],
      ["-----------","---------------"],
      ["cd","change directory to root (P:)"],
      ["cd <file/folder>","goto file/folder from current position"],
      ["cd <path>","P:/ url -> change directory to specified path"],
      ["cd ..","goto parent folder"],
      ["cd -fst","goto first child"],
      ["cd -nth <number>","goto nth child\n"],
      ["clr / cls","clear console"],
      ["clr <number>","clear a number of lines"],
      ["clr lst","clear last print\n"],
      ["color","set console colors to default"],
      ["color <hex,hex>","set console colors. (e.g. color f0)\n"],
      ["cowsay <string>","make a cow say wise things; 'help cowsay' for full datasheet"],
      ["cowsay <string> <cow>","make a cow character say wise things; cowsay -l for list of cows"],
      ["cowsay fortune","make the cow say things if you have nothing good to offer (see: fortune)\n"],
      ["data","get GitHub API data for directory"],
      ["data <prop>","get object property value for data in current directory\n"],
      ["echo <string>","print string"],
      ["echo %variable","print internal variable (see: set)"],
      ["echo -vars","print all internal variables\n"],
      ["figlet <string>","make totally badass ascii art"],
      ["figlet fortune","wise words in ascii glory (see: fortune)\n"],
      ["fortune","get a random piece of wisdom; probably not safe for work\n"],
      ["help <category>","get help by help category"],
      ["help help","get help categories\n"],
      ["open <url>","open window by url"],
      ["open <name>","open window by name\n"],
      ["prompt <message>","open prompt\n"],
      ["set <name> <value>","set local variable; supports numbers, strings, arrays, and objects"],
      ["set /a <expression>","perform arithmetical operations on local variables; see help arithm\n"],
      ["title","set title of current console\n"],
      ["|","Piping; supported by cowsay, figlet, and fortune (see: 'help piping')"],
      ["::","Comment"],
      ["quit","close console"]
    ],
    colors:[
      [5],
      ["There are a multitide of colors to choose from.",""],
      ["Colors are written in hex pairs like so: <background><foreground>",""],
      ["Example: 'color f0' -> Black text on white background\n",""],
      ["0 : black","8 : gray"],
      ["1 : blue","9 : light blue"],
      ["2 : green","A : light green"],
      ["3 : cyan","B : light cyan"],
      ["4 : red","C : light red"],
      ["5 : purple","D : light purple"],
      ["6 : yellow","E : light yellow"],
      ["7 : white","F : bright white"],
    ],
    arithm:[
      [3,5],
      ["The following operations allow variable\n\toperations, eg. val+=2, as a complement\n\tto normal operations, eg. val=val+2\n","",""],
      ["Op","Description","Example"],
      ["---","------------","--------"],
      ["+","Add","set /a val=val+42"],
      ["-","Subtract","set /a val=val-42"],
      ["*","Multiply","set /a val=val*42"],
      ["/","Divide","set /a val=val/42"],
      ["%","Modulus","set /a val=val%42"],
      ["&","AND operator","set /a val=val&42"],
      ["|","Or operator","set /a val=val|42"],
      ["^","XOR operator","set /a val=val^42"],
      ["<<","Left shift","set /a val=val<<2"],
      [">>","Right shift","set /a val=val>>2"],
      ["\n\tThe following operations do not support\n\tvariable operations.\n","",""],
      ["!","Negate","set /a val=!val"],
      ["~","One's complement","set /a val=~val"],
      ["()","Group in parentheses","set /a val=(2+4)*7"],
      [",","Multiple operations","set /a val=42,val2=43"]
    ],
    cowsay:[
      [5,3],
      ["The following keywords and commands allow you\n\tto customize cowsay. These can be mixed and\n\tmatched to make a wide range of outputs.\n","",""],
      ["Op","Description","Example"],
      ["---","------------","--------"],
      ["<string>","Make a cow say something; for multi line, type '\\n'","cowsay \"moo\""],
      ["<cow>","Change the speaking character, known as a cowfile","cowsay \"moo\" head-in"],
      ["-l","Get list of cowfiles","cowsay -l"],
      ["-<eyetype>","Change eyes","cowsay \"moo\" -b"],
      ["-e","Get list of eyes","cowsay -e"],
      ["cowthink","Make the cow think instead","cowthink \"moo\""],
      ["|","Pipe into other object; for more info: 'help piping'","cowsay \"moo\" | cowsay"]
    ],
    piping:[
      [],
      ["Piping lets you pass an object/piece of text into another object. Using piping, you can nest\n\tcows into each other and make weird multi-dimensional ascii, for example.\n\tPiping is denoted with a bar, like so: ' | '. commands to the left of the bar are always passed into the\n\tcommands to the right. 'cowsay \"moo\" | cowsay' will produce a cow saying a cow saying moo, for example.\n\n\tBelow are some examples of piping:\n"],
      ["cowsay \"moo\" | cowsay"],
      ["cowsay fortune | cowsay -b"],
      ["figlet \"moo\" | cowsay"],
      ["figlet \"moo\" | figlet"],
      ["figlet \"moo\" | figlet | cowthink head-in"],
      ["cowthink \"moo\" | cowsay | cowthink | cowsay | cowthink"],
    ],
    help:[
      [5],
      ["Full list of help categories:\n",""],
      ["arithm","arithmetical expressions"],
      ["colors","information about console hex colors"],
      ["commands","general help with commands; typing 'help' will default here"],
      ["cowsay","full documentation on cowsay"],
      ["piping","all info the piping function has to offer"]
    ]
  };

  var colors=["black","darkblue","darkgreen","darkcyan","darkred","darkmagenta","olive","lightgrey","grey","blue","#0f0","cyan","red","magenta","yellow","white"];

  inputElem.addEventListener("keydown",function(event){registerKey(event);});
  parent.addEventListener("click",function(event){inputElem.focus(); caret.style.display="block";});
  inputElem.addEventListener("blur",function(event){caret.style.display="none";});
  inputElem.addEventListener("mousedown",function(event){
    caret.style.display="none";
    setTimeout(function(){
      setCaret();
    },1);
  });

  function registerKey(evt){
    var kc=evt.keyCode;

    //After a millisecond, the key pressed has been registered in the input field and can be retrieved.
    //Turning the caret off an ond again restarts the animation, so the caret is always white when moving.
    caret.style.display="none";
    setTimeout(function(){
      outputElem.innerHTML=inputElem.value;
      setCaret();
    },1);

    if (kc==13&&!printing){
      addLine();
      var tmpVal=inputElem.value;
      cmdArr[cmdPointer]=tmpVal;
      cmdPointer++;
      cmdArr.splice(cmdPointer,cmdArr.length-cmdPointer);
      inputElem.value="";
      parseInput(tmpVal);
    }else if(kc==27&&printing){
      addLine("red",true);
      print("Interrupted print",1,true);
    }else if((kc==38||kc==40)&&!printing){
      var change=(kc==38?-1:1);
      cmdPointer+=change;
      if (cmdPointer>=-1&&cmdPointer<cmdArr.length){
        var tmpVal=cmdArr[cmdPointer] || "";
        if (cmdPointer==-1){cmdPointer=cmdArr.length;}
        inputElem.value=tmpVal;
        setTimeout(function(){
          inputElem.selectionStart=tmpVal.length;
          inputElem.selectionEnd=tmpVal.length;
          setCaret();
        },2);
      }else{
        cmdPointer-=change;
      }
    }
  }

  function parseInput(str){
    str=conformString(str);
    var isArray=Array.isArray(objData);
    var cmds=str.split(" ");
    
    cmds[0]=(cmds[0] || "").toLowerCase();
    if (cmds[0]=="cd"){
      if (cmds[1]!=undefined){
        cmds[1]=cmds[1].replace(/\\/g,"/");
        if (cmds[1]==".."){
          moveDirUp(false);
        }else if (cmds[1]=="-fst"||cmds[1]=="-nth"){
          var index=cmds[2] || 0;
          if (isArray){
            index=Math.max(Math.min(index,objData.length-1),0);
            loadDir(dirUrl+"/"+objData[index].name);
          }else{
            print("This is the end of the line, buddy!");
          }
        }else if (cmds[1].includes(":/")){
          loadDir(cmds[1]);
        }else{
          loadDir(dirUrl+"\\"+cmds[1]); 
        }
      }else{
        loadDir("P:/");
      }
    }else if (cmds[0]=="data"){
      var out="\n";
      if (cmds[1]==undefined){
        out+=genDirStr(objData,1);
      }else{
        if (Array.isArray(objData)){
          for (var i in objData){
            out+=genDirStr(objData[i][cmds[1]],1,"Object["+cmds[1]+","+i+"]");
          }
        }else{
          out+=genDirStr(objData[cmds[1]],1);
        }
      }
      print(out);
    }else if (cmds[0]=="help"){
      var maxLen=[0,0,0,0,0,0,0,0],tab;
      var prop=cmds[1] || "commands";
      var helpArr=help[prop];

      if (helpArr==undefined){print("Failed to load help data. Try 'help help' for hints."); return;}
      tab=helpArr[0];
      for (var i=1;i<helpArr.length;i++){
        for (var n=0;n<helpArr[i].length-1;n++){
          if (helpArr[i][n].length>maxLen[n]&&helpArr[i][n+1]!=""){maxLen[n]=helpArr[i][n].length;}
        }
      }
      var out="\n\n";
      for (var i=1;i<helpArr.length;i++){
        out+="\t"+helpArr[i][0];
        for (var n=0;n<helpArr[i].length-1;n++){
          var tmpTab=maxLen[n]-helpArr[i][n].length+tab[n];
          out+=duplicate(" ",tmpTab)+""+helpArr[i][n+1];
        }
        out+="\n";
      }
      print(out);
    }else if (cmds[0]=="color"){
      var back=colors[0],front=colors[15];
      try{
        back=colors[toNum(cmds[1][0])];
        front=colors[toNum(cmds[1][1])];
      }catch(e){}

      if (back!=front){
        parent.style.backgroundColor=back;
        parent.style.color=front;
        inputElem.style.color=back;
        backCaret.style.backgroundColor=back;
        backCaret.style.color=front;
        frontCaret.style.backgroundColor=front;
        frontCaret.style.color=back;
        //parent.style.fontWeight=toNum(cmds[1][0])<7&&toNum(cmds[1][1])<7?"bold":"normal";
      }
      print("");
    }else if(cmds[0]=="clr"||cmds[0]=="cls"){
      var last=false;
      var num=cmds[1] || 100000;
      num=parseInt(num) || 100000;
      if (cmds[1]=="lst"){
        num=100000;
        last=true;
      }
      var elem=inpBox.previousSibling,al=true;
      for (var i=0;i<=num;i++){
        if (last&&i!=0&&elem.className=="breakpoint"){
          elem.parentElement.removeChild(elem);
          al=false;
          break;
        }
        if (elem.tagName=="PRE"){
          var tmpElem=elem.previousSibling;
          elem.parentElement.removeChild(elem);
          elem=tmpElem;
        }else{al=false; break;}
      }
      if (al){
        addLine(null,true);
        print("\n////////////////////BREAK////////////////////");
      }
      dir.style.display="block";
    }else if(cmds[0]=="set"){
      for (var i=3;i<cmds.length;i++){
        cmds[2]+=cmds[i];
      }

      if (cmds[1]=="/a"){
        var pre="";
        for (var i in variables){
          if (cmds[2].includes(i)){
            pre+="var "+i+"=cmdWin["+this.inx+"].variables."+i+";\n";
          }
        }
        var out="{",scrInner="\n    "+cmds[2]+";\n";
        for (var i in variables){
          if (cmds[2].includes(i)){
            scrInner+="    cmdWin["+this.inx+"].variables."+i+"="+i+";\n";
            out+=i+": cmdWin["+this.inx+"].variables."+i;
          }
        }
        scrInner+="    print(genDirStr("+out+"},0,'Active variables',true));";
        var time=new Date().getTime()%1e8;
        var scr=pre+"\ntry{"+scrInner+"\n  }catch(e){\n    print('Failed to evaluate expression.');\n  }";
        script.removeChild(script.children[0]);
        var scrNew=document.createElement("script");
        scrNew.innerHTML=scr;
        script.appendChild(scrNew);
      }else{
        try{
          variables[""+cmds[1]]=JSON.parse(toJSON(cmds[2]));
        }catch(e){
          variables[""+cmds[1]]=cmds[2];
        }
        print("Set value "+cmds[2]+" to variable "+cmds[1]+".");
      }
    }else if(cmds[0]=="echo"){
      var out="";
      if (cmds[1]=="-vars"){
        out="\n"+genDirStr(variables,1,"Variables");
      }else{
        for (var i=1;i<cmds.length;i++){
          if (cmds[i].includes("%")){
            var name=cmds[i].replace(/%/g,"");
            out+=genDirStr(variables[name],0,name);
          }else{
            out+=cmds[i]+" ";
          }
        }
      }
      print(out,null,"");
    }else if (cmds[0].startsWith("::")){
      print("");
    }else if (cmds[0]=="title"){
      getParent(parent,"window").getElementsByClassName("wintitle")[0].innerHTML=str.replace("title ","");
      print("");
    }else if (cmds[0].startsWith("cow")||cmds[0]=="figlet"||cmds[0]=="fortune"){
      var out="\n\n"+compileCowsay(parsePiping(str.split(" | ")));
      print(out);
    }else if (cmds[0]=="open"){
      consoleOpenWin(dirToConsoleUrl(cmds[1] ? str.replace("open ","") : dirUrl));
      print("");
    }else if (cmds[0]=="prompt"){
      openPopup("Prompt",str.replace("prompt ",""),"info");
      print("");
    }else if (cmds[0]=="quit"){
      setTimeout(function(){closeWin(getParent(parent,"window").id);},500);
      print("\n\nExited console");
      inputElem.parentElement.parentElement.innerHTML="";
    }else{
      if (cmds[0]==""){
        cmdPointer--;
        cmdArr.splice(cmdPointer,1);
      }
      print("Invalid command '"+cmds[0]+"'",1);
    }
  }

  function conformString(str){
    var notSpace=false,out="";
    for (var i in str){
      if (notSpace||str[i]!=" "){
        out+=str[i];
        notSpace=str[i]!=" ";
      }
    }
    return out;
  }
  
  function genDirStr(obj,lvl,msg,noAddLine){
    var repl="\n"+duplicate("   ",lvl);
    var str="\n";
    var isArray=Array.isArray(obj);
    var counters={
      Object:0,
      Array:0
    };

    if (typeof obj=="string"||!isNaN(obj)){return (str+""+(msg!=null?msg+": ":"")+obj).replace(/\n/g,repl);}
    if (obj==undefined){return (str+""+msg+": undefined").replace(/\n/g,repl);}
    str="";
    if (msg!=null&&typeof obj=="object"){str=="\n"+msg+":";}

    for (var i in obj){
      var type=(typeof obj[i]=="object"&&!Array.isArray(obj[i]))?"Object":"Array";
      str+="\n"+(isArray?type+"["+counters[type]+"]":i)+": ";
      counters[type]++;

      if (i=="content"){
        str+="[Collapsed data - use 'data "+i+"' to get data]";
      }else if (obj[i]!=null&&(typeof obj[i]=="object"||Array.isArray(obj[i]))){
        str+=genDirStr(obj[i],1,null,true);
        if (!noAddLine){str+="\n";}
      }else{
        str+=obj[i];
      }
    }
    return str.replace(/\n/g,repl);
  }

  function toJSON(str){
    var colonSplit=str.split(":");
    var isObj=str.startsWith("{");
    for (var i=0;i<colonSplit.length;i++){
      var tmpSplit=colonSplit[i].split("{");
      if (tmpSplit.length==2&&!tmpSplit[1].includes("\"")){
        colonSplit[i]=tmpSplit[0]+"{\""+tmpSplit[1]+"\"";
      }
    }
    for (var i=0;i<colonSplit.length;i++){
      var tmpSplit=colonSplit[i].split(",");
      if (tmpSplit.length==2&&!tmpSplit[1].includes("\"")){
        colonSplit[i]=tmpSplit[0]+",\""+tmpSplit[1]+"\"";
      }
    }
    var out="";
    for (var i=0;i<colonSplit.length;i++){
      out+=colonSplit[i]+""+(i<colonSplit.length-1?":":"");
    }
    return out;
  }

  function toNum(inVal){
    var val=inVal || "0";
    val=val.charCodeAt(0);
    if (val>=48&&val<=57){return val-48;}
    if (val>=65&&val<=70){return val-55;}
    if (val>=97&&val<=102){return val-87;}
    return 0;
  }

  function updateDir(url){
    dirUrl=urlToDir(url);
    dir.innerHTML=dirUrl+">&nbsp;";
  }

  function loadDir(url,preventPrint,file){
    url=url.replace(/\\/g,"/");
    if (url.startsWith("P:")){url=url.replace("//","/")}
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        objData=JSON.parse(this.responseText);
        if (file!=null){
          for (var i in objData){
            if (objData[i].name==file){
              objData=objData[i];
              url+=("\\"+file)
              break;
            }
          }
        }
        if (!preventPrint&&!printing){print("Successfully loaded directory '"+urlToDir(url)+"'.");}
        //print(genDirStr("",objData,0));
        updateDir(url);
      }else if (this.status==403){
        updateDir(url);
        moveDirUp(true);
      }else if (this.status==404){
        print("Couldn't find directory '"+url+"'.");
      }
    };

    xhttp.onerror=function(){
      print("An error occurred while loading directory. Try again.");
    }
    xhttp.open("GET",dirToConsoleUrl(url),true);
    xhttp.send();
  }

  function moveDirUp(getLast){
    var arr=dirUrl.split("\\");
    if (arr.length<3){loadDir("P:\\");}
    else{
      var newUrl=arr[0];
      for (var i=1;i<arr.length-1;i++){
        newUrl+=("\\"+arr[i]);
      }
      loadDir(newUrl,false,getLast?arr[arr.length-1]:null);
    }
  }

  function dirToConsoleUrl(inp){
    if (!inp.startsWith("P:")){
      return inp;
    }
    var inputArr=inp.split("/");
    var url="https://api.github.com/repos/PicturElements/"+inputArr[1]+"/contents";
    if (inputArr[1]==""){
      url="https://api.github.com/users/PicturElements/repos";
    }
    for (var i=2;i<inputArr.length;i++){
      url+="/"+inputArr[i];
    }
    return url;
  }
  
  function urlToDir(inp){
    if (inp.startsWith("P:")){
      return inp;
    }
    inp=inp.split("?")[0].split("/");
    var out="P:\\"+inp[5];
    for (var i=7;i<inp.length;i++){
      out+="\\"+inp[i];
    }
    return out;
  }

  function setCaret(){
    var length=inputElem.value.substring(0,inputElem.selectionStart).length;
    caret.style.left=length*0.4+"em";
    backCaret.innerHTML=inputElem.value[length] || "";
    frontCaret.innerHTML=backCaret.innerHTML;
    caret.style.display="block";
  }

  function print(msg,speed,noBreak){
    if (!noBreak){currentElem.className="breakpoint";}
    printStr=msg;
    printing=true;
    printIndex=0;
    charLen=speed || Math.max(Math.floor(Math.sqrt(msg.length)),2);
  }

  function addLine(color,disableDir){
    var p=document.createElement("pre");
    currentElem=p;
    parent.gec0("console").insertBefore(p,parent.gec0("inputbox"));
    p.innerHTML=disableDir?"":dir.innerHTML+""+inputElem.value+"<br>";
    if (color!=null){p.style.color=color;}
    dir.style.display="none";
  }

  function printChar(){
    if (printing){
      if (printIndex>=printStr.length){
        if (printIndex>0){currentElem.innerHTML+="<br> ";}
        printing=false;
        dir.style.display="block";
        parent.scrollTop=1e8;
        return;
      }
      var out="";
      for (var i=0;i<charLen;i++){
        var index=(printStr[printIndex] || "").replace("<","&lt;");
        printIndex++;
        if (index=="\n"){
          currentElem.innerHTML+=out;
          out="";
          addLine(null,true);
        }else{
          out+=index;
        }
      }
      currentElem.innerHTML+=out;
      parent.scrollTop=1e8;
    }
  }
  setInterval(printChar,10);
  inputElem.focus();
  setCaret();
  addLine(null,true);
  setTimeout(function(){
    print(compileCowsay(cowsay("PicturElements PeOS [Version 2.0]\nCmd-PE v1.0.\n(C) 2017 PicturElements\n----------------------------------\nType 'help' for help with commands.","duck")));
  },500);
  loadDir(dirUrl,true);
}

//Fuckin' IE...
String.prototype.includes=function(sub){
  var count=0;
  for (var i=0;i<this.length;i++){
    if (this[i]==sub[count]){
      count++;
      if (count==sub.length){return true;}
    }else{
      count=0;
    }
  }
  return false;
}

String.prototype.startsWith=function(sub){
  for (var i=0;i<this.length;i++){
    if (this[i]==sub[i]){
      if (i==sub.length-1){return true;}
    }else{
      break;
    }
  }
  return false;
}

function duplicate(str,amount){
  var out="";
  for (var i=0;i<amount;i++){out+=str;}
  return out;
}


/*-----------------------------------------COWSAY STUFF------------------------------------------------*/

function genAscii(input){
  var out=[];
  var splitStr=Array.isArray(input)?input:input.split("\n");
  for (var i in splitStr){
    out=out.concat(smartJoin(splitStr[i]));
  }
  return out;
}

function smartJoin(str){
  if (str==""){return chars[0].ascii}
  var chs=[],result;
  for (var i in str){
    chs.push(getAscii(str[i]));
  }
  result=[chs[0].slice(0)];
  for (var i=1;i<chs.length;i++){
    connect(result[0],chs[i]);
  }
  return result[0];
}

function canJoin(a1,a2){
  for (var i=0;i<a1.length;i++){
    var c1=a1[i][a1[i].length-1],c2=a2[i][0];
    if ((c1=="\\"&&c2=="/")||(c1=="/"&&c2=="\\")){
      return false;
    }
  }
  return true;
}

function connect(arr,arr2){
  var cj=canJoin(arr,arr2);
  for (var i=0;i<arr.length;i++){
    if (cj){
      var c1=arr[i][arr[i].length-1],c2=arr2[i][0];
      arr[i]=arr[i].substring(0,arr[i].length-1)+replaceChar(c1,c2)+arr2[i].substring(1,arr2[i].length);
    }else{
      arr[i]+=arr2[i];
    }
  }
};

function replaceChar(c1,c2){
  if (c1==")"&&c2=="("){return "|";}
  return getIndex(c1,precedence)>getIndex(c2,precedence)?c1:c2;
}

function getAscii(char){
  for (var i in chars){
    if (chars[i].character==char){
      return chars[i].ascii;
    }
  }
  return chars[0].ascii;
}

function cowsay(arr,name,thinking,eyetype){
  var eyetypes=["o","=","X","$","@","*","-","O","."];
  
  var thinkChar=thinking?"o":"\\";
  var eyeChar=eyetypes[eyetype] || "o";
  var say=(cows[name] || cows.cow).ascii.slice(0);
  for (var i in say){
    say[i]=say[i].replace(/\$t/g,thinkChar);
    say[i]=say[i].replace(/\$e/g,eyeChar);
  }
  return boxify(arr,thinking).concat(say);
}

function boxify(arr,thinking){
  arr=typeof arr=="string"?arr.split("\n"):arr;
  var max=0;
  for (var i in arr){
    if (arr[i].length>max){max=arr[i].length;}
  }
  var out=thinking?[" "+duplicate("-",max+2)+" "]:["/"+duplicate("-",max+2)+"\\"];
  for (var i in arr){
    out.push((thinking?"( ":"| ")+arr[i]+duplicate(" ",max-arr[i].length)+(thinking?" )":" |"));
  }
  out.push(thinking?" "+duplicate("-",max+2)+" ":"\\"+duplicate("-",max+2)+"/");
  return out;
}

function compileCowsay(arr){
  var out="";
  for (var i=0;i<arr.length;i++){
    out+=arr[i]+(i<arr.length-1?"\n":"");
  }
  return out;
}

function parsePiping(arr){
  var out=[];
  main:
  for (var i in arr){
    var extracted=extractString(arr[i]);
    var str=extracted[0];
    if (str!=null){str=str.split("\\n");}
    var commands=cleanWords(extracted[1]);
    if (commands[0].startsWith("cow")){
      var c_think=commands[0].includes("think");
      var c_mode=0,c_type="cow";
      for (var n=1;n<commands.length;n++){
        if (commands[n].length==2&&commands[n][0]=="-"){
          if (commands[n][1]=="l"){
            out=getCowsayData();
            continue main;
          }else if (commands[n][1]=="e"){
            out=[
              "-n   oo   normal","-b   ==   borg","-d   XX   dead",
              "-g   $$   greedy","-p   @@   paranoid","-s   **   stoned",
              "-t   --   tired","-w   OO   wired","-y   ..   youthful"
            ];
            continue main;
          }else{
            c_mode=getIndex(commands[n][1],"nbdgpstwy");
          }
        }else if (commands[n]=="fortune"){
          str=getFortune();
        }else if(commands[n].length>2){
          c_type=commands[n];
        }
      }
      out=cowsay((str || out),c_type,c_think,c_mode);
    }else if (commands[0]=="figlet"){
      if (commands[1]=="fortune"){str=getFortune();}
      out=genAscii((str || out));
    }else if (commands[0]=="fortune"){
      out=getFortune();
    }
  }
  return out;
}

function getIndex(elem,arr){
  for (var i in arr){
    if (elem==arr[i]){return i;}
  }
  return 100;
}

function getFortune(){
  var showFortune=Math.random()>0.5;
  var out=showFortune?fortunes[Math.floor(Math.random()*fortunes.length)].replace(/\t/g,"    "):limericks[Math.floor(Math.random()*limericks.length)].replace(/\t/g,"");
  return out.split("\n");
}

function extractString(str){
  var splitStr=str.split("\"");
  if (splitStr.length<3){return [null,str];}
  var rest=splitStr[0]+splitStr[splitStr.length-1],newStr="";
  for (var i=1;i<splitStr.length-1;i++){
    newStr+=(i>1?"\"":"")+splitStr[i];
  }
  return [newStr,rest];
}

function cleanWords(str){
  var arr=str.split(" ");
  for (var i=arr.length-1;i>=0;i--){
    if (arr[i]==""){arr.splice(i,1)}
  }
  return arr;
}

function getCowsayData(){
  var out=[""],count=0;
  for (var i in cows){
    if (out[count].length+i.length>40){
      count++;
      out.push("");
    }
    out[count]+=i+" ";
  }
  return out;
}