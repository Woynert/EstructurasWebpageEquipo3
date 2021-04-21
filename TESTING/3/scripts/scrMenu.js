console.log("INICIANDO");

//Start
document.addEventListener('DOMContentLoaded', function() {

	console.log("Im done loading");

   //get header
   header = document.getElementsByClassName("header")[0];
   //get content
   content = document.getElementsByClassName("content")[0];
   fixPageStructure();

}, false);


//detect page resize
window.onresize = function(){
   fixPageStructure();
};

//dynamic resizing
function fixPageStructure(){

   //set margins
   content.style.marginTop    = (header.clientHeight).toString();
   content.style.marginBottom = (header.clientHeight).toString();

}
