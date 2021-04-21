document.addEventListener('DOMContentLoaded', function() {
	console.log("Im donde loading");

   //MAIN MENU
   var acc = document.getElementsByClassName("accordionButton");
   var newElement;

   for (var i = 0; i < acc.length; i++) {

      //create arrows
      //closed
      newElement = document.createElement("p");
      newElement.className = "closed";
      newElement.innerHTML = ">";
      acc[i].insertBefore(newElement, acc[i].firstChild);

      //opened
      newElement = document.createElement("p");
      newElement.className = "opened";
      newElement.innerHTML = "ᐯ";
      acc[i].insertBefore(newElement, acc[i].firstChild);

      //add event listener
      acc[i].addEventListener("click", function(){

         /* Toggle between adding and removing the "active" class,
         to highlight the button that controls the panel */
         this.classList.toggle("active");

         /* Toggle between hiding and showing the active panel */
         var panel = this.nextElementSibling;
         if (panel.style.display === "block"){
            panel.style.display = "none";
         } 
         else{
            panel.style.display = "block";
         }
      });
   } 

   //CONFIG
   var acc = document.getElementsByClassName("m3-settingsAccordionExpand");
   var newElement;

   for (var i = 0; i < acc.length; i++) {

      //add event listener
      acc[i].addEventListener("click", function(){

         /* Toggle between hiding and showing the active panel */
         var panel = this.nextElementSibling;
         if (panel.style.display === "flex"){
            panel.style.display = "none";
         } 
         else{
            panel.style.display = "flex";
         }
      });
   } 



});