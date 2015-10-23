function makeLinkHTML(link){
    return '<a target="_blank" href="'+link+'">Link</a>';
};
var showTableFromSQL = function (dynTable,dbPath){
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
                var contents = db.exec("SELECT * FROM FACH");
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
                        else tableDYnSql+= td+contents[0].values[i][ii]+tdC;

                    tableDYnSql+=trC;
                }

                //DAS HTML ELEMENT TABLE MIT DEN DATEN FÜLLEN
                dynTable.innerHTML=tableDYnSql;

            };
            xhr.send();
};