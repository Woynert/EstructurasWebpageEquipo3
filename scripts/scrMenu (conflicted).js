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
	//myModule3.updateCanva();


	//go to module1
   currentModule = 1;
	moduleGoTo(currentModule);
   modGoToSection(currentModule, 0);

   //manage dyname resizing
   fixPageStructure();

}, false);

//change section
function moduleGoTo(intId){

	currentModule = intId;

	//hide all
	elementMyModule1.style.display = 'none';
	elementMyModule2.style.display = 'none';
	elementMyModule3.style.display = 'none';

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

		//module1
		case 3:
			elementMyModule3.style.display = 'flex';
         myModule3.updateCanva();
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

   console.log("Container Height: " + titleContainerHeight.toString());

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

// ===== MODULE 1 ===== //

//go to section in MODULE 1
function modGoToSection(moduleId, sectionId){

   switch(moduleId){
      case 1: myModule1.changeSection(sectionId); break;
      case 2: myModule2.changeSection(sectionId); break;
   }

	//change module if necessary
	if (currentModule !== moduleId){
		moduleGoTo(moduleId);
   }

}

//class section
class mod1Section{
	constructor(title, imageName) {
		this.title     = title;
		//this.content   = content;

		//image
		this.imageName = imageName;
		if (imageName !== undefined) 
			this.hasImage = true;
		else 
			this.hasImage = false;
	}
}

//class module 1
class MODULEINFO{

	constructor(Nmodule){

		//module id
		this.Nmodule = Nmodule;

      //selected section id
		this.id = 0;

		//info
		this.lsInfo = []; 

      //Modulo de información
      if (Nmodule == 1){
         //Elementos module1 (info)
         this.lsInfo.push(new mod1Section("Estructura de datos"          )); //0
         this.lsInfo.push(new mod1Section("Tipos de estructuras de datos")); //1

         this.lsInfo.push(new mod1Section("Arrays"     , "arrays" )); //2
         this.lsInfo.push(new mod1Section("Ventajas"   )); //3
         this.lsInfo.push(new mod1Section("Desventajas")); //4

         this.lsInfo.push(new mod1Section("Matrices", "matriz")); //5

         this.lsInfo.push(new mod1Section("Nodos", "nodo")); //6

         this.lsInfo.push(new mod1Section("Estructuras enlazadas")); //7

         this.lsInfo.push(new mod1Section("Listas sencillamente enlazadas"         , "listasimple"            )); //8
         this.lsInfo.push(new mod1Section("Listas doblemente enlazadas"            , "Listadoblementeenlazada")); //9
         this.lsInfo.push(new mod1Section("Listas circulares simplemente enlazadas", "circular-s"             )); //10
         this.lsInfo.push(new mod1Section("Listas circulares doblemente enlazadas" , "circular-d"             )); //11
         this.lsInfo.push(new mod1Section("Arboles"                                , "arbol"             )); //12
         this.lsInfo.push(new mod1Section("Arboles binarios"                       , "arbolbinario"             )); //13
         this.lsInfo.push(new mod1Section("Arboles n-ario"                         , "arbolnario"             )); //14
         this.lsInfo.push(new mod1Section("Grafos"                                 , "grafo"                  )); //15
         this.lsInfo.push(new mod1Section("Contenedores"                           )); //16
         this.lsInfo.push(new mod1Section("Pilas"                                  , "pila"                   )); //17
         this.lsInfo.push(new mod1Section("Colas"                                  , "cola"                   )); //18
         this.lsInfo.push(new mod1Section("Colas de prioridad"                     , "colaprioridad"          )); //19

         this.lsInfo.push(new mod1Section("Tipos de Nodos", "tiposnodos"          )); //20
         this.lsInfo.push(new mod1Section("Nivel")); //21
         this.lsInfo.push(new mod1Section("Altura"        , "alturaniveles"          )); //22
         this.lsInfo.push(new mod1Section("Peso"          , "peso"          )); //23
         this.lsInfo.push(new mod1Section("Orden"         , "orden"          )); //24
         this.lsInfo.push(new mod1Section("Grado"         , "grado"          )); //25
         this.lsInfo.push(new mod1Section("Sub-Arbol"     , "subarbol"          )); //26
         this.lsInfo.push(new mod1Section("Búsquedas no informadas")); //27
         this.lsInfo.push(new mod1Section("Recorrido Pre-orden"     , "preorden"          )); //28
         this.lsInfo.push(new mod1Section("Recorrido Pos-orden"     , "postorden"          )); //29
         this.lsInfo.push(new mod1Section("Recorrido in-orden"     , "inorden"          )); //30
         this.lsInfo.push(new mod1Section("Búsqueda en amplitud"     , "busquedaamplitud"          )); //31
         this.lsInfo.push(new mod1Section("Referencia")); //32
      }

      //Modulo de ejemplos
      else if (Nmodule == 2){
         this.lsInfo.push(new mod1Section("Lista Sencilla")); //0
         this.lsInfo.push(new mod1Section("Más Contenido")); //1
      }


	}

	//getElements
	getElements(elementTitleId, elementContentId, elementImageId){
		//get elements
		this.pTitle     = document.getElementById(elementTitleId   );
		this.divContent = document.getElementById(elementContentId );
		this.imgContent = document.getElementById(elementImageId   );

      //structure elements
      this.divTitleContainer   = document.getElementsByClassName("m1-titleContainer")[0];
      this.divContentContainer = document.getElementsByClassName("m1-contentContainer")[0];
      
	}

	//Start
	changeSection(id){
		if (id != null && id >= 0 && id < this.lsInfo.length){
         this.id = id;

         //set title
			this.pTitle.innerHTML   = this.lsInfo[id].title;

			//fill container with text
			readTextFile('resources/module' + this.Nmodule + '/' + id + '.txt');

			//add image
			if (this.lsInfo[id].hasImage){

            //show image
            this.imgContent.style.display = 'block';
				this.imgContent.src = "resources/images/" + this.lsInfo[id].imageName + ".jpg" ;	
			}
			else{

            //hide image
            this.imgContent.style.display = 'none';
            this.imgContent.src = "";
         }
			
		}
	}

	//go to next
	nextSection(){
		if (this.id != null && this.id < this.lsInfo.length-1){
			this.id += 1;
			this.changeSection(this.id);
		}
	}

	//go to previous
	prevSection(){
		if (this.id != null && this.id > 0){
			this.id -= 1;
			this.changeSection(this.id);
		}
	}

   //dynamic resizing
   fixPageStructure(){
      //set margins
      this.divContentContainer.style.marginTop    = (this.divTitleContainer.clientHeight).toString();
      this.divContentContainer.style.marginBottom = (this.divTitleContainer.clientHeight).toString();
   }

}

//Read text files
function readTextFile(textFile){
   console.log(textFile);
   var xhr = new XMLHttpRequest;
   xhr.open('GET', textFile);
   xhr.onload = showTextFile;
   xhr.send();
}

//Once the file is loaded
function showTextFile(){

	//process text
   formatTextFile(this.response);

}


function formatTextFile(str){
  
   var selectedModule;

   //get selected module
   switch(currentModule){
      case 1: selectedModule = myModule1; break;
      case 2: selectedModule = myModule2; break;
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
				    			console.log("HEY");
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
               	console.log(subStr); 
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

    console.log(subStr);
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

/*/node child
class nodeChildType{
   constructor(protection, type, name){
      this.protection = protection;
      this.type = type;
      this.name = name;
   }
}

//node child variable
class ncVariable extends nodeChildType{
}

//node child method
class ncMethod extends nodeChildType{
}*/

//class node
class mod3Node{
	constructor(type, title) {

		this.type  = type;
		this.title = title;

		//lista de hijos
		this.lsClasses = []; 

		//lista de metodos
		this.lsMethods = []; 

		//lista de variables
		this.lsVars = []; 

	}

	setCode(code){
		this.code = code;
	}

	addClass(child){
		this.lsClasses.push(child);
	}	

	addMethod(method){
		this.lsMethods.push(method);
	}

	addVar(variable){
		this.lsVars.push(variable);
	}	

}

//class
class mod3ClassNode extends mod3Node{
   constructor(type, title){
      //call parent constructor
      super(type, title);
   }
}

class mod3VariableAndMethodNode extends mod3Node{
   constructor(type, protection, dataType, title){

      //call parent constructor
      super(type, title); //2 -> method, 3 -> variable

      
		this.protection = protection; 
		this.dataType   = dataType;
   }
}

/*
protection level
0 -> private
1 -> public
2 -> protected
*/

//variable
class mod3VariableNode extends mod3VariableAndMethodNode{
   constructor(protection, dataType, title){
      //call parent constructor
      super(3, protection, dataType, title);

      this.protection = protection; 
		this.dataType   = dataType;
   }
}

//method
class mod3MethodNode extends mod3VariableAndMethodNode{
   constructor(protection, dataType, title){
      //call parent constructor
      super(2, protection, dataType, title);

      this.protection = protection; 
		this.dataType   = dataType;
   }
}

//class module3
class MODULE3{

	constructor(title, content, imageName) {

		//carro class
		var carro = new mod3Node(1, "Carro");
		carro.addMethod( new mod3MethodNode(1, "void", "Arrancar") );
		carro.addMethod( new mod3MethodNode(1, "void", "Acelerar") );
		carro.addMethod( new mod3MethodNode(1, "void", "Frenar") );

		carro.addVar( new mod3VariableNode(0, "int", "Gasolina") );

		//origin node
		this.rootNode = new mod3Node(0, "Concesionaria");
		this.rootNode.addClass( carro );

		this.rootNode.addMethod( new mod3MethodNode(1, "boolean", "GuardarVehiculo") );
		this.rootNode.addMethod( new mod3MethodNode(1, "boolean", "VenderVehiculo") );
		this.rootNode.addMethod( new mod3MethodNode(1, "boolean", "ComprarVehiculo") );

		this.rootNode.addVar( new mod3VariableNode(1, "int", "numeroVehiculos") );
		this.rootNode.addVar( new mod3VariableNode(0, "int", "dinero") );

		//node selected
		this.selectedNode = this.rootNode;

		//draw variables
		this.scale = 2;
		this.Xoff = 0;
		this.Yoff = 0;
		this.cw = 100; //canvas width
		this.ch = 100; //canvas height

		this.canvaCtx; //canvas context
	}

	//get elements
	getElements(){
		this.divCanva    = document.getElementById("m3-canva");
		this.divSettings = document.getElementById("m3-settings");

		//canva
		this.canvaContainer = document.getElementById("m3-canvaContainer");
		this.canva = document.getElementById("m3-canva");

		//settings
		this.pSettingsNodeName = document.getElementById("m3-settingsNodeName");

		this.divSettingsClasses   = document.getElementById("m3-settingsClasses");
		this.divSettingsMethods   = document.getElementById("m3-settingsMethods");
		this.divSettingsVariables = document.getElementById("m3-settingsVariables");

	}

	updateSettingsElements(){


		switch(this.selectedNode.type){

			case 0:
				//CLASSES
				//clean elements
				while (this.divSettingsClasses.lastChild) {
					this.divSettingsClasses.removeChild(this.divSettingsClasses.lastChild);
				}

				this.pSettingsNodeName.innerHTML = this.selectedNode.title;


				//show children
				//iterate
				for(var i = 0; i < this.selectedNode.lsClasses.length ; i++){

					var item = this.selectedNode.lsClasses[i];

				   //create 
					var newElement = document.createElement("p");
					newElement.innerHTML = item.title;
					newElement.className = "m3-settingsChild";

				   //add element
					this.divSettingsClasses.appendChild(newElement);
				}

			case 1:
				//METHODS
				//clean elements
				while (this.divSettingsMethods.lastChild) {
				  this.divSettingsMethods.removeChild(this.divSettingsMethods.lastChild);
				}

				this.pSettingsNodeName.innerHTML = this.selectedNode.title;


				//show children
				//iterate
				for(var i = 0; i < this.selectedNode.lsMethods.length ; i++){

				   var item = this.selectedNode.lsMethods[i];

				   //create 
				   var newElement = document.createElement("p");
				   newElement.innerHTML = item.title;
				   newElement.className = "m3-settingsChild";

				   //add element
				   this.divSettingsMethods.appendChild(newElement);
				}

			case 2:
				//VARIABLES
				//clean elements
				while (this.divSettingsVariables.lastChild) {
				  this.divSettingsVariables.removeChild(this.divSettingsVariables.lastChild);
				}

				this.pSettingsNodeName.innerHTML = this.selectedNode.title;


				//show children
				//iterate
				for(var i = 0; i < this.selectedNode.lsVars.length ; i++){

				   var item = this.selectedNode.lsVars[i];

				   //create 
				   var newElement = document.createElement("p");
				   newElement.innerHTML = item.title;
				   newElement.className = "m3-settingsChild";

				   //add element
				   this.divSettingsVariables.appendChild(newElement);
				}
				break;

		}
	}

	//drawing methods
	createXCord(cord){
		return (cord * this.scale - this.Xoff);
	}	

	createYCord(cord){
		return (cord * this.scale - this.Yoff);
	}

	createDrawValue(val){
		return (val * this.scale);
	}

	updateCanva(){
		
		//resize canvas

      var canvaContainerStyle = window.getComputedStyle(this.canvaContainer);

      /*console.log(canvaContainerStyle.getPropertyValue("width"));
      console.log(canvaContainerStyle.getPropertyValue("height"));*/

      console.log(getInnerWidth(this.canvaContainer));
      console.log(getInnerHeight(this.canvaContainer));

		this.canva.width = getInnerWidth(this.canvaContainer) -1;
		this.canva.height = getInnerHeight(this.canvaContainer) -1;

		/*this.canva.width = this.canvaContainer.clientWidth;
		this.canva.height = this.canvaContainer.clientHeight;*/

		//update draw variables
      /*this.cw = this.canva.innerWidth;
		this.ch = this.canva.innerHeight;*/

		this.cw = this.canva.width;
		this.ch = this.canva.height;

		this.Xoff = (this.cw * this.scale)/2 - this.cw/2;
		this.Yoff = (this.ch * this.scale)/2 - this.ch/2;

		this.canvaCtx = this.canva.getContext("2d");

		//draw background
		this.canvaCtx.fillStyle = "#ffffff";
		this.canvaCtx.fillRect(0, 0, this.cw, this.ch);

		//draw nodes
		var
		x1 = 0.5 * this.cw,
		y1 = 0.5 * this.ch; 
		this.canvaDrawNode(this.rootNode, x1, y1, 1);

	}

	canvaDrawNode(node, argX, argY, level){
		//easy to use var
		var 
		cw = this.cw,
		ch = this.ch;

		//coordinates and radius
		var dist, x1, y1 ,x2, y2, rad;
		
		//DRAW
		this.canvaCtx.fillStyle = "#000000"; 

		var 
		TotalItems      = node.lsClasses.length + node.lsMethods.length + node.lsVars.length,
		angleDelta      = 2 * Math.PI / TotalItems,
		angleAcumulator = 0;

		//iterate trougth diferent node types
		for (var j = 1; j <= 3; j++){

			var lsSelected;

			switch (j) {

				//classes
				case 1: lsSelected = node.lsClasses; break;

				//methods
				case 2: lsSelected = node.lsMethods; break;

				//variables
				default: lsSelected = node.lsVars; break;
			}

			//iterate root node
			//CLASSES
			for (var i = 0; i < lsSelected.length ; i++){

				var item = lsSelected[i];
				angleAcumulator += angleDelta;

				//line cords
				dist = 100/level;
				x1 = this.createXCord(argX); 
				y1 = this.createYCord(argY); 
				x2 = this.createXCord(argX + Math.cos(angleAcumulator) * dist ); 
				y2 = this.createYCord(argY + Math.sin(angleAcumulator) * dist ); 

				//line
				this.canvaCtx.beginPath();
				this.canvaCtx.moveTo(x1, y1);
				this.canvaCtx.lineTo(x2, y2);
      			this.canvaCtx.lineWidth = 3;
				this.canvaCtx.stroke();
				this.canvaCtx.closePath();

				//draw children
				this.canvaDrawNode(item, argX + Math.cos(angleAcumulator) * dist , argY + Math.sin(angleAcumulator) * dist, level +1);

			}
		}

      //draw itself
		switch (node.type) {
			case 0:  this.canvaCtx.fillStyle = "#FC760F"; break; //origin
			case 1:  this.canvaCtx.fillStyle = "#ffce11"; break; //class
			case 2:  this.canvaCtx.fillStyle = "#0fc0fc"; break; //method
			case 3:  this.canvaCtx.fillStyle = "#d82b00"; break; //variable
			default: this.canvaCtx.fillStyle = "#0000FF"; break;
		}

		x1 = this.createXCord(argX); 
		y1 = this.createYCord(argY); 
		rad = this.createDrawValue(12 -level*2);

		//circle
		this.canvaCtx.beginPath();
		this.canvaCtx.arc(x1, y1, rad, 0, 2 * Math.PI);
		this.canvaCtx.closePath();
		this.canvaCtx.fill();

      //draw text
      this.canvaCtx.fillStyle = "#000000";
      this.canvaCtx.font = "18px Arial";

      x1 = this.createXCord(argX -rad/4); 
		//y1 = this.createYCord(argY +rad/8); 
		this.canvaCtx.beginPath();
      this.canvaCtx.fillText(node.title, x1, y1);
		this.canvaCtx.closePath();
		

	}

}

//get element innerHeight
function getInnerWidth( elm ){
   var computed = getComputedStyle(elm),
   padding = parseInt(computed.paddingLeft) + parseInt(computed.paddingRight);

   return elm.clientWidth - padding;
}

function getInnerHeight( elm ){
   var computed = getComputedStyle(elm),
   padding = parseInt(computed.paddingTop) + parseInt(computed.paddingBottom);

   return elm.clientHeight - padding;
}

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

