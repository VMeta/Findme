window.onload = function(){
    document.getElementById("Search").onclick = function search(){
        document.getElementsByClassName("form")[0].classList.add("loading")
        setTimeout(()=>{
            document.getElementsByClassName("form")[0].classList.remove("loading")
        }, 3000)
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

    var founded = new Array({name: "Amor", line: "Ln: 5"}, {name: "Amor", line: "Ln: 6"})
    for (var index = 0; index < founded.length; index++) {
        var element = founded[index];
        var template = document.getElementById("template").cloneNode(true);
        template.getElementsByClassName("header")[0].innerText = element.name;        
        template.getElementsByClassName("description")[0].innerText = element.line;
        template.style.display = "block";
        document.getElementById("list").appendChild(template);        
    }
}