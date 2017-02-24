const fs = require('fs');
var glob = require("glob")


function readContent(url){
   return fs.readFileSync(url, "utf-8");
}

function findRegex(stringWords, regex){
    var regexNew = new RegExp(regex, "g");
    return stringWords.match(regexNew);
}

function makeCoincidencesHTML(coincidences){
    document.getElementById("list").innerHTML = "";   
    document.getElementById("count").innerText = ""; 
    for (var index = 0; index < coincidences.length; index++) {
        var coincidence = coincidences[index];
        var template = document.getElementById("template").cloneNode(true);
        template.getElementsByClassName("header")[0].innerText = coincidence;        
        template.getElementsByClassName("description")[0].innerText = "";
        template.style.display = "block";
        document.getElementById("list").appendChild(template);        
    }
    document.getElementsByClassName("form")[0].classList.remove("loading")   
    document.getElementById("count").innerText = `Count: ${coincidences.length}`;
    let myNotification = new Notification('Search done !', {
        body: `We have found about ${coincidences.length} coincidences that macth yor search.`
    })
}

function searchInDirectories(){
    var regexPattern = document.getElementById("Search").value;

    var url = document.getElementById("path").value;

    var allCoincidence = [];

    glob(`${url}/**/*.*`, {}, function (er, files) {
        for(var x = 0; x < files.length; x++){
          if(files[x]){
                var  stats = fs.lstatSync(files[x]);
                if (stats.isFile()) {
                    var content =  readContent(files[x]);

                    if(content){
                        var findWords = findRegex(content, regexPattern);
                        if(findWords && findWords.length){
                            allCoincidence = allCoincidence.concat(findWords);
                        }
                    }
                }
           }
        }
        makeCoincidencesHTML(allCoincidence);
    });
}

function searchInFile(){
    var regexPattern = document.getElementById("Search").value;

    var url = document.getElementById("path").value;
    var content = readContent(url);
    var findWords = findRegex(content, regexPattern);
    if(findWords){
        makeCoincidencesHTML(findWords);
    }
}


window.onload = function(){
    document.getElementById("BtnSearch").onclick = function search(){
        document.getElementsByClassName("form")[0].classList.add("loading")
        if(document.getElementById("Directory").checked){
            searchInDirectories();
        }else{
            searchInFile();
        }
    }

    document.getElementById("clean").onclick = function search(){
       for (var index = 0; index < document.getElementsByTagName("input").length; index++) {
           var element = document.getElementsByTagName("input")[index];
            element.value = "";
       }
        document.getElementById("list").innerHTML = "";
    }

    document.getElementById("file").onchange = function fileChange(){
        document.getElementById("path").value = this.files[0].path;
    }

    for (var index = 0; index <  document.getElementsByName("typeOfSearch").length; index++) {
        var element = document.getElementsByName("typeOfSearch")[index];
        element.onchange = function (){
            if(this.value == "Directory"){
                document.getElementById("file").setAttribute("webkitdirectory", "");
            }else{
                document.getElementById("file").removeAttribute("webkitdirectory");
            }
        }
    }
}
