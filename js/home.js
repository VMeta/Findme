
const fs = require('fs');
var glob = require("glob")


function readContent(url){
   return fs.readFileSync(url, "utf-8");
}

function findRegex(stringWords, regex){
    var regexNew = new RegExp(regex, "g");
    return stringWords.match(regexNew);
}

// document.getElementById("searchBtn").onclick = function(){
//     var regexPattern = document.getElementById("searchRegex").value;
//     var file = document.getElementById("myfile");

//     var url = file.files[0].path;
//     var content = readContent(url);
//     var findWords = findRegex(content, regexPattern);
//     console.log(findWords);
// };

document.getElementById("searchBtn").onclick = function(){
    var regexPattern = document.getElementById("searchRegex").value;
    var file = document.getElementById("myfileDirectory");

    var url = file.files[0].path;

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

};

function makeCoincidencesHTML(coincidences){
    var ulFather = document.getElementById("coincidence");
    var lis = "";
     for(var x = 0; x < coincidences.length; x++){
         var coincidence = coincidences[x];
        lis += `<li>${coincidence}</li>`;
     }
     ulFather.innerHTML = lis;
}