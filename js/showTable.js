function makeLinkHTML(link){
    return '<a target="_blank" href="'+link+'">Link</a>';
};
function makeTdWithID(dnTable,i,ii){
    return '<td id='+dnTable.id+'-'+i+'-'+ii+'>';
};

var showTableFromSQL = function (dynTable,dbPath,SQLQuery){
     //HTML TEGS
            var i=0;var ii=0;var tableDYnSql;
            var th = "<th>";var thC = "</th>";var tr = "<tr>";
            var trC = "</tr>";var td = "<td>";var tdC = "</td>";

            //CONNECT TO DB
            var xhr = new XMLHttpRequest();
            xhr.open('GET',dbPath, true);
            xhr.responseType = 'arraybuffer';

            //PARSING
            xhr.onload = function(e) {
                var uInt8Array = new Uint8Array(this.response);
                var db = new SQL.Database(uInt8Array);
                //execute query, returns an Array.
                var contents = db.exec(SQLQuery);
                //DIE NUMMER DER SPALTE, WO SICH DER LINK SICH BEFINDET, 
                //DAMIT WIR ES ALS A HREF DARSTELLEN KÖNNEN
                var numOfLink = (function(){
                    for(i=0;i<contents[0].columns.length;i++){
                        if(contents[0].columns[i]=="LINK") return i;
                    } 
                    return -1;
                })();


                //COLUMNS NAMEN SPECHERN                
                for(i=0,tableDYnSql=tr;i<contents[0].columns.length;i++){
                    tableDYnSql+=th+contents[0].columns[i]+thC;
                }
                tableDYnSql += trC;

                //INHALTE SPECHERN
                for(i=0;i<contents[0].values.length;i++){
                    tableDYnSql+=tr;

                    for(ii=0; ii < (contents[0].values[i].length);ii++)
                        if(ii==numOfLink)
                            tableDYnSql+=td+makeLinkHTML(contents[0].values[i][ii])+tdC;
                        else tableDYnSql+= makeTdWithID(dynTable,i,ii)+contents[0].values[i][ii]+tdC;
                    tableDYnSql+=trC;
                }

                //DAS HTML ELEMENT TABLE MIT DEN DATEN FÜLLEN
                dynTable.innerHTML=tableDYnSql;
                
//                var pathToCell = getIDofTDCurrentClass();
//                document.getElementById(pathToCell).style.backgroundColor='red';
//                

            };
            xhr.send();
};

// Returns the ISO week of the date.
Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
   date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}


//returns minuts from an array(hh:mm) -> hh*60 + mm
function getMinutes(strTime) {
        var time = strTime.split(':');
        return time[0]*60+time[1]*1;
}
function getMinutesNow() {
        var timeNow = new Date();
        return timeNow.getHours()*60+timeNow.getMinutes();
}
function isNowBetweenTimes(startTime,endTime){
        var now = getMinutesNow();
        var start = getMinutes(startTime);
        var end = getMinutes(endTime);
        if (now>start && now <end) return true;
        else  return false;
}
function buttonUngeradePressed(){
                document.getElementById("KalenderGerade").style.display = "none";
                document.getElementById("KalenderUngerade").style.display = "inline-table";
                document.getElementById("wocheTab1").style.borderBottom = "5px solid #53a4e0";
                document.getElementById("wocheTab2").style.borderBottom = "0px ";
    return 'KalenderUngerade';
        }

function buttonGeradePressed(){
                document.getElementById("KalenderUngerade").style.display = "none";
                document.getElementById("KalenderGerade").style.display = "inline-table"; 
                document.getElementById("wocheTab2").style.borderBottom = "5px solid #53a4e0";
                document.getElementById("wocheTab1").style.borderBottom = "0px";
    return 'KalenderGerade';
    }


/*********************************************
*
*Returns ID of the table cell of current Class
*
**********************************************/
function getIDofTDCurrentClass(){
    var k =0;
    var startClassTime=['07:30','9:20','11:10','13:20','15:10'];//7:30
    var endClassTime=['09:00','10:50','12:40','14:50','16:40'];//9:00change time back to 16:40

    for(k=0;k<5;k++){
        if(isNowBetweenTimes(startClassTime[k],endClassTime[k])){
            //The getDay() method returns the day of the week (from 0 to 6); weekday[0]=  "Sunday";
            var getDayOfTheWeek = new Date().getDay();
            

            var ret = weekGeradeOrUngStr+'-'+(k)+"-"+getDayOfTheWeek;
            initTimeDiff(ret,startClassTime[k],endClassTime[k]);            
            //return weekGeradeOrUngStr+'-'+(k)+"-"+getDayOfTheWeek;
            return ret;
        }
    }
}
function initTimeDiff(cellOfTable,startTime,endTime){
    this.progressCELL=document.getElementById(cellOfTable);
    progressCELL.ENDTIME = getMinutes(endTime);
    progressCELL.STARTTIME = getMinutes(startTime); 
    progressCELL.DIFFENDMINUSSTARTTIME = progressCELL.ENDTIME - progressCELL.STARTTIME;
    //alert(progressCELL.DIFFENDMINUSSTARTTIME);
}
function getProgressOfClassUni(){
    progressCELL.TIMENOWMINUTS = getMinutesNow(); 
    progressCELL.TIMEDIFFNOWANDEND = progressCELL.ENDTIME - progressCELL.TIMENOWMINUTS;
    //alert(100*(1-progressCELL.TIMEDIFFNOWANDEND / progressCELL.DIFFENDMINUSSTARTTIME)); 
    return 100*(1-progressCELL.TIMEDIFFNOWANDEND / progressCELL.DIFFENDMINUSSTARTTIME); 

}

var count = 0;
function showProgressCalender(){
                var pathToCell = getIDofTDCurrentClass();
                if(typeof pathToCell === 'undefined'){
                    return;
                }
                if(document.getElementById(pathToCell).textContent === " ") //return;
                {document.getElementById(pathToCell).parentNode.style.background="#fffaf0";
                return;
                }
                 else
                //document.getElementById(pathToCell).style.backgroundColor="#53a4e0";
                var height = document.getElementById(pathToCell).offsetHeight;
//                document.getElementById(pathToCell).innerHTML+='<div id="ProgressBar" style="height: '+height+ 'px; z-index: -1"></span>'
                document.getElementById(pathToCell).style.boxShadow="inset 0 -2px 7px rgba(0, 0, 0, 0.36)"; 
                //document.getElementById(pathToCell).style.boxShadow="inset 0 0 20px rgba(0, 0, 0, 0.46)"; 
                //document.getElementById(pathToCell).style.boxShadow=" 0 0px 25px rgba(0, 0, 0, 0.56)"; 
                document.getElementById(pathToCell).style.background="url(img/d78470a4.png) no-repeat";
                //document.getElementById(pathToCell).style.backgroundRepeat="repeat-x";
                document.getElementById(pathToCell).style.backgroundSize=getProgressOfClassUni()+"% "+"100%";
				document.getElementById(pathToCell).innerHTML=" noch :"+progressCELL.TIMEDIFFNOWANDEND+"min.";
                document.getElementById(pathToCell).parentNode.style.boxShadow="inset 0 0 7px rgba(0, 0, 0, 0.36)"; 
                //document.getElementById(pathToCell).style.backgroundPositionX=(count++)+"%";
                
}


function setCurrentWeek(){
    if(mydate.getWeek()%2===1){
                weekGeradeOrUngStr = buttonUngeradePressed();
        }
        else{
                weekGeradeOrUngStr = buttonGeradePressed();
            
        }
};