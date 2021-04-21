console.log("INICIANDO");

//Start
document.addEventListener('DOMContentLoaded', function() {
	console.log("Im donde loading");


	//module1
	elementMyModule1 = document.getElementById("MODULE1");
	myModule1 = new MODULEINFO(1);
	myModule1.getElements("m1-title", "m1-content", "m1-img");

   //module2
	elementMyModule2 = document.getElementById("MODULE2");
	myModule2 = new MODULEINFO(2);
	myModule2.getElements("m2-title", "m2-content", "m2-img");

	//module3
	elementMyModule3 = document.getElementById("MODULE3");
	myModule3 = new MODULE3();
	myModule3.getElements();
	myModule3.updateSettingsElements();
   myModule3.codeEditor = ace.edit("editor");
   myModule3.codeEditor.setTheme("ace/theme/twilight"); //set theme

	elementMyModule3Info = document.getElementById("MODULE3Info");
   myModule3Info = new MODULEINFO(3);
	myModule3Info.getElements("m3-title", "m3-content", "m3-img");

   elementMyModule3Code = document.getElementById("MODULE3Code");

   //set language
   var JavaScriptMode = ace.require("ace/mode/java").Mode;
   myModule3.codeEditor.session.setMode(new JavaScriptMode());


	//go to module1
   currentModule = 4;
	moduleGoTo(currentModule);
   //modGoToSection(currentModule, 0);

   //manage dyname resizing
   fixPageStructure();

   //Event listener to import file
   document.getElementById("m3-inputFile").addEventListener('change', function() {

      var fr=new FileReader();
      fr.onload=function(){
         myModule3.codeEditor.setValue(fr.result);
      }
        
      fr.readAsText(this.files[0]);

   })

}, false);

//change section
function moduleGoTo(intId){

	currentModule = intId;

	//hide all
	elementMyModule1.style.display = 'none';
	elementMyModule2.style.display = 'none';
	elementMyModule3.style.display = 'none';
   elementMyModule3Info.style.display = 'none';
   elementMyModule3Code.style.display = 'none';

	//show selected
	switch(intId){
		//module1
		case 1:
			elementMyModule1.style.display = 'flex';
			break;

		//module2
		case 2:
			elementMyModule2.style.display = 'flex';
			break;

		//module3 Info
		case 3:
         elementMyModule3Info.style.display = 'flex';
			break;

      //module3 Grafico
      case 4:
         elementMyModule3.style.display = 'flex';
         myModule3.updateCanva();
         break;

      //module3 Code
      case 5:
         elementMyModule3Code.style.display = 'flex';
         break;
	}

   //fix structure
   fixPageStructure();

}

//detect page resize
window.onresize = function(){
   fixPageStructure();
};

//dynamic resizing
function fixPageStructure(){

   console.log("Fixing Page Structure");

   var titleContainerHeight;

   switch(currentModule){

      //transformation module
      case 3:
         myModule3.updateCanva();
         return;
         break;

      //information module
      case 1:
         titleContainerHeight = document.getElementById("m1-titleContainer").clientHeight;
         break;

      //examples module
      case 2:
         titleContainerHeight = document.getElementById("m2-titleContainer").clientHeight;
         break;

   }

   //get moduleInfo titleContainerHeight

   //console.log("Container Height: " + titleContainerHeight.toString());

   //get document stylesheet
   var stylesheet = document.styleSheets[0];

   //iterate to find the rule to update
   var rules = stylesheet.cssRules;
   for (var i=0; i<rules.length; i++) {

      var rule = rules[i];
      var selector = rule.selectorText;

      //select
      if (selector === '.m1-contentContainer') {

            //replace rule
            rule.style.marginTop    = titleContainerHeight.toString();
            rule.style.marginBottom = titleContainerHeight.toString();
            //rule.style.color = 'orange';
         break;
      }
   }



}

// ===== MODULE 1 FUNCTIONS ===== //

//go to section in MODULE 1
function modGoToSection(moduleId, sectionId){

   switch(moduleId){
      case 1: myModule1.changeSection(moduleId, sectionId); break;
      case 2: myModule2.changeSection(moduleId, sectionId); break;
      case 3: {
         //activar showInfo
         //if (myModule3.showInfo){
            elementMyModule3.style.display = 'none';
            myModule3Info.changeSection(moduleId, sectionId);
            elementMyModule3Info.style.display = 'flex';

         /*   myModule3.showInfo = false;
         }
         else{
            elementMyModule3Info.style.display = 'none';
            elementMyModule3.style.display = 'flex';

            myModule3.showInfo = true;
         }*/
         break;

         
      }
   }

	//change module if necessary
	if (currentModule !== moduleId){
		moduleGoTo(moduleId);
   }

}

//Read text files
function readTextFile(textFile){
   console.log("LEYENDO: " + textFile);
   var xhr = new XMLHttpRequest;
   xhr.open('GET', textFile);
   xhr.onload = showTextFile;
   xhr.send();
}

//Once the file is loaded
function showTextFile(){

	//process text
   console.log(this.response);
   formatTextFile(this.response);

}


function formatTextFile(str){
  
   var selectedModule;

   //get selected module
   switch(currentModule){
      case 1: selectedModule = myModule1; break;
      case 2: selectedModule = myModule2; break;
      case 3: selectedModule = myModule3Info; break;
   }
   
	//clean elements
	while (selectedModule.divContent.lastChild) {
      selectedModule.divContent.removeChild(selectedModule.divContent.lastChild);
	}
   
	//create 
	var newE;

	var 
	subStr = '',
	finalStr = '',

	type = 0,
	prevType = type;

	/*
    0 -> plain text
    1 -> bold
   	*/

    //iterate every character
    for (i = 0; i < str.length; i++){

    	switch (str[i]) {

    		//bold / numeral
    		case '#':

    			var startBoldText = true;

    			//detectar doble #
    			if (i > 0)
		    		if (str[i -1] === '#')
		    			startBoldText = false;

    			if (i < (str.length-1)) 
		    		if (str[i +1] === '#')
		    			startBoldText = false;

		    	//bold
    			if (startBoldText){
	    			//activar
	    			if (type === 0){
	    				i += 1; //saltar indicador
			    		type = 1; //1 -> bold text
			    	}

			    	//desactivar
			    	else if (type === 1){
	    				i += 1; //saltar indicador
			    		type = 0; //0 -> plain text
			    	}
			    }

			    //numeral
			    else{
					subStr += '#';
					i += 2; //saltar indicador
			    }

    			break;

    		case '<':
    			var actionCodeBlock = true;

    			/*
    			0 -> false
    			1 -> start
    			2 -> end
    			*/
    			
    			if (i < (str.length-1)){

    				//detect start '<>'
		    		if (str[i +1] === '>')
		    			startCodeBlock = 1;

		    		//detect end '</>'
		    		else if (str[i +1] === '/')
			    		if (i < (str.length-2))
				    		if (str[i +2] === '>'){
				    			//console.log("HEY");
				    			startCodeBlock = 2;
				    		}
    			}

    			//activar
    			if (startCodeBlock == 1){
	    			if (type === 0){
	    				i += 2;   //saltar indicador
			    		type = 2; //2 -> code block
			    	}
			    }

			    //desactivar
			    else if (startCodeBlock == 2){
			    	if (type === 2){
	    				i += 3;   //saltar indicador
			    		type = 0; //0 -> plain text
			    	}
			    }

		    	break;

    	}

    	//Detectar cambio y Aplicar (o fin del string)
    	if ( (prevType !== type) || (i === (str.length-1)) ){

    		switch (prevType) {
    			//plain text
    			case 0: 
               	console.log("[PLAIN] " + subStr); 
	            break;

				//bold
				case 1: 
					console.log("[BOLD] " + subStr); 
					subStr = "<b> " + subStr + "</b>";
					break;

				//code block
				case 2: 

               //add current progress
               newE = document.createElement("p");
               newE.innerHTML = finalStr;
         
               //add 
               selectedModule.divContent.appendChild(newE);
               finalStr = '';

               //CodeBlock
               var newParent = document.createElement("pre");

               newE = document.createElement("code");
               newE.innerHTML = subStr;
               newE.className = 'java hljs';
               subStr = '';
         
               //append child
               newParent.appendChild(newE);

               //apply HighLight
               hljs.highlightBlock(newE);

               //add
               selectedModule.divContent.appendChild(newParent);

					console.log("[CODE] " + subStr); 
					subStr = "<code> " + subStr + "</code>";
					break;
    		}
    		
    		//apply and reset
         finalStr += subStr;
    		subStr = '';
    	}
    	
      	//add character
    	subStr += str[i];
    	prevType = type; //save previous type

    }

    //APPLY
    //create 
    newE = document.createElement("p");
    newE.innerHTML = finalStr;

    //add element
    selectedModule.divContent.appendChild(newE);

}

//INPUT
//next section
function btnNext(selModule){
   switch(selModule){
      case 1: myModule1.nextSection(); break;
      case 2: myModule2.nextSection(); break;
   }
}

//previus section
function btnPrevious(selModule){
   switch(selModule){
      case 1: myModule1.prevSection(); break;
      case 2: myModule2.prevSection(); break;
   }
}

// ===== MODULE 3 ===== //


//INPUT
//next section
function btnM3ZoomIncrease(){
	myModule3.scale += 0.2;
	myModule3.updateCanva();
}

//previus section
function btnM3ZoomDecrease(){
	myModule3.scale -= 0.2;
	myModule3.updateCanva();
}

//import code file
function codeFileImport(){

   

}

function btnSettingsAdd(dataType){
   switch(dataType){
      case 1: //clase
         myModule3.addClass();
      break;

      case 2: //variable
         myModule3.addVariable();
      break;

      case 3: //method
         myModule3.addMethod();
      break;
   }
}