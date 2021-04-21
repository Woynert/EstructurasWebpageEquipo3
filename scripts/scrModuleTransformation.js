
console.log("INICIANDO ModuleTransformation.js");

/*
node types

0 -> root
1 -> class
2 -> method
3 -> variable
*/ 

//class node
class mod3Node{
	constructor(type, protection, title, code) {

		this.type       = type;
      this.protection = protection; 
		this.title      = title;
      this.code       = code;

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
   constructor(protection, title, extend, implement, code){
      //call parent constructor
      super(1, protection, title);

      this.code      = code;
      this.extend    = extend;
      this.implement = implement;
   }
}

/*
protection level
0 -> private
1 -> public
2 -> protected
3 -> argument
*/

//variable
class mod3VariableNode extends mod3Node{
   constructor(protection, title, dataType){
      //call parent constructor
      super(3, protection, title);

		this.dataType   = dataType;
   }
}

//method
class mod3MethodNode extends mod3Node{
   constructor(protection, title, dataType, code){
      //call parent constructor
      super(2, protection, title);

      this.code       = code;
      this.protection = protection; 
		this.dataType   = dataType;
   }
}

//drawedNode
class mod3DrawedNode{
   constructor(node, x, y, rad){
      this.node = node;
      this.x    = x;
      this.y    = y;
      this.rad  = rad;
   }
}

//class module3
class MODULE3{

	constructor(title, content, imageName) {

      this.showInfo = false;

		//carro class
		var carro = new mod3ClassNode(1, "Carro", "None", "None", "//My class \n int a = 20;");
		carro.addMethod( new mod3MethodNode(1, "Arrancar", "void", "//My method \n int a = 20;") );
		carro.addMethod( new mod3MethodNode(1, "Acelerar", "void", "//My method \n int a = 20;") );
		carro.addMethod( new mod3MethodNode(1, "Frenar",   "void", "//My method \n int a = 20;") );

		carro.addVar( new mod3VariableNode(0, "Gasolina", "int") );

		//origin node
		this.rootNode = new mod3Node(0, 0, "Concesionaria", "//My root \n int a = 20;");
		this.rootNode.addClass( carro );

		this.rootNode.addMethod( new mod3MethodNode(1, "GuardarVehiculo", "boolean", "//My method \n int a = 20;") );
		this.rootNode.addMethod( new mod3MethodNode(1, "VenderVehiculo" , "boolean", "//My method \n int a = 20;") );
		this.rootNode.addMethod( new mod3MethodNode(1, "ComprarVehiculo", "boolean", "//My method \n int a = 20;") );

		this.rootNode.addVar( new mod3VariableNode(1, "numeroVehiculos", "int") );
		this.rootNode.addVar( new mod3VariableNode(0, "dinero", "int") );

		//node selected
		this.selectedNode = this.rootNode;

		//draw variables
		this.scale = 2;
		this.Xoff = 0;
		this.Yoff = 0;
		this.cw = 100; //canvas width
		this.ch = 100; //canvas height

		this.canvaCtx; //canvas context

      //drawed nodes in screen / mouse interaction
      this.lsDrawedNodes = [];
      this.isMouseHoveringANode = false;
      this.NodeMouseHover;


	}

	//get elements
	getElements(){

      //Code
      //this.module3EditorCode = document.getElementById("editorCode");
      //this.codeEditor

      
      //divs
		this.divCanva    = document.getElementById("m3-canva");
		this.divSettings = document.getElementById("m3-settings");

		//canva
		this.canvaContainer = document.getElementById("m3-canvaContainer");
		this.canva = document.getElementById("m3-canva");

		//settings
		this.pSettingsNodeName = document.getElementById("m3-settingsNodeName");

		this.divSettingsClassesContainer   = document.getElementsByClassName("m3-settingsChildrenContainer")[0];
		this.divSettingsMethodsContainer   = document.getElementsByClassName("m3-settingsChildrenContainer")[2];
		this.divSettingsVariablesContainer = document.getElementsByClassName("m3-settingsChildrenContainer")[1];
      
		this.divSettingsClasses   = document.getElementById("m3-settingsClasses");
		this.divSettingsMethods   = document.getElementById("m3-settingsMethods");
		this.divSettingsVariables = document.getElementById("m3-settingsVariables");
		this.divSettingsCode      = document.getElementById("m3-settingsCode");

      //inputs
      this.canva.addEventListener("mousemove", this.handleCanvaMouseMove.bind(this) );
      this.canva.addEventListener("click"    , this.handleCanvaMouseClick.bind(this));

      //code editor
      this.codeEditor;
      //this.codeEditor = document.getElementById("editor");
      document.getElementsByClassName("m3-convertButton")[0].addEventListener("click", myModule3.convertDiagramToCode.bind(myModule3));

      document.getElementsByClassName("m3-convertButton")[1].addEventListener("click", myModule3.convertCodeToDiagram.bind(myModule3));

      this.ConvertedText = "";

      //------------------------------------------------------------

      //SETTINGS INPUT FORMS 
      //method
      this.inputMethodDatatype   = document.getElementById("m3-methodDatatype");
      this.inputMethodName       = document.getElementById("m3-methodName");
      this.inputMethodProtection = document.getElementById("m3-methodProtection");

      //variable
      this.inputVariableDatatype   = document.getElementById("m3-variableDatatype");
      this.inputVariableName       = document.getElementById("m3-variableName");
      this.inputVariableProtection = document.getElementById("m3-variableProtection");

      //classes
      this.inputClassName       = document.getElementById("m3-className");
      this.inputClassProtection = document.getElementById("m3-classProtection");
      this.inputClassExtend     = document.getElementById("m3-classExtend");
      this.inputClassImplement  = document.getElementById("m3-classImplement");

	}

	updateSettingsElements(){

      console.log("Selected Node type: " + this.selectedNode.type.toString());

      //title
      var settingsTitle = "";//this.selectedNode.title;
      
      //deactivate unhandled elements
      //format node title by node parameters
		switch(this.selectedNode.type){

         //ROOT
			case 0: 
            this.divSettingsClassesContainer.style.display   = 'block';
            this.divSettingsMethodsContainer.style.display   = 'block';
            this.divSettingsVariablesContainer.style.display = 'block';
            settingsTitle += "[Root]\n";
         break;

         //CLASSES
			case 1: 
            this.divSettingsClassesContainer.style.display   = 'none';
            this.divSettingsMethodsContainer.style.display   = 'block';
            this.divSettingsVariablesContainer.style.display = 'block';
            settingsTitle += "[Class]\n" + this.getProtectionStringFromInt(this.selectedNode.protection) + " class " + this.selectedNode.title;
         break;

         //METHODS
			case 2: 
            this.divSettingsClassesContainer.style.display = 'none';
            this.divSettingsMethodsContainer.style.display = 'none';
            this.divSettingsVariablesContainer.style.display = 'block';
            settingsTitle += "[Method]\n" + this.getProtectionStringFromInt(this.selectedNode.protection) + " " + this.selectedNode.dataType + " " + this.selectedNode.title;
         break;

         //VARIABLES
			case 3: 
            this.divSettingsClassesContainer.style.display = 'none';
            this.divSettingsMethodsContainer.style.display = 'none';
            this.divSettingsVariablesContainer.style.display = 'none';
            settingsTitle += "[Variable]\n" + this.getProtectionStringFromInt(this.selectedNode.protection) +" "+ this.selectedNode.dataType + " " + this.selectedNode.title;
         break;
      }

      //set title
      this.pSettingsNodeName.innerHTML = settingsTitle;

      //Recorre todos los casos del switch empezando desde el tipo que sea
      //fill tables 
		switch(this.selectedNode.type){

         //root startup
			case 0: //CLASSES
            

				var firstChild = this.divSettingsClasses.getElementsByTagName("tr")[0];

				//clean elements
				while (this.divSettingsClasses.lastChild) {
					this.divSettingsClasses.removeChild(this.divSettingsClasses.lastChild);
				}

            this.divSettingsClasses.appendChild(firstChild);

				//show children
				//iterate
				for(var i = 0; i < this.selectedNode.lsClasses.length ; i++){

					var item = this.selectedNode.lsClasses[i];

               //create 
				   var newParentElement = document.createElement("tr");
               var newElement;

               //name
				   newElement = document.createElement("td");
				   newElement.innerHTML = item.title;
               newParentElement.appendChild(newElement);

               //extends
				   newElement = document.createElement("td");
				   newElement.innerHTML = item.extend;
               newParentElement.appendChild(newElement);
               
               //implements
				   newElement = document.createElement("td");
				   newElement.innerHTML = item.implement;
               newParentElement.appendChild(newElement);

               //protection
				   newElement = document.createElement("td");
				   newElement.innerHTML = this.getProtectionStringFromInt(item.protection);
               newParentElement.appendChild(newElement);

				   //add element
					this.divSettingsClasses.appendChild(newParentElement);
				}

         //class startup 
			case 1: //METHODS

            var firstChild = this.divSettingsMethods.getElementsByTagName("tr")[0];

				//clean elements
				while (this.divSettingsMethods.lastChild) {
               this.divSettingsMethods.removeChild(this.divSettingsMethods.lastChild);
				}

            this.divSettingsMethods.appendChild(firstChild);

				//show children
				//iterate
				for(var i = 0; i < this.selectedNode.lsMethods.length ; i++){

				   var item = this.selectedNode.lsMethods[i];

				   //create 
				   var newParentElement = document.createElement("tr");
               var newElement;

               //name
				   newElement = document.createElement("td");
				   newElement.innerHTML = item.title;
               newParentElement.appendChild(newElement);
               
               //type
				   newElement = document.createElement("td");
				   newElement.innerHTML = item.dataType;
               newParentElement.appendChild(newElement);

               //protection
				   newElement = document.createElement("td");
				   newElement.innerHTML = this.getProtectionStringFromInt(item.protection);
               newParentElement.appendChild(newElement);

				   //add element
				   this.divSettingsMethods.appendChild(newParentElement);
				}

            //Show code
            //clean elements
				while (this.divSettingsCode.lastChild) {
               this.divSettingsCode.removeChild(this.divSettingsCode.lastChild);
				}

            //CodeBlock
            var newParentElement = document.createElement("pre");

            var newElement = document.createElement("code");
            newElement.innerHTML = this.selectedNode.code;
            newElement.className = 'java hljs';
      
            //append child
            newParentElement.appendChild(newElement);

            //apply HighLight
            hljs.highlightBlock(newElement);

            //add
            this.divSettingsCode.appendChild(newParentElement);


         //method statup
			case 2: //VARIABLES

            var firstChild = this.divSettingsVariables.getElementsByTagName("tr")[0];

				//clean elements
				while (this.divSettingsVariables.lastChild) {
				  this.divSettingsVariables.removeChild(this.divSettingsVariables.lastChild);
				}

            this.divSettingsVariables.appendChild(firstChild);

				//show children
				//iterate
				for(var i = 0; i < this.selectedNode.lsVars.length ; i++){

				   var item = this.selectedNode.lsVars[i];

				   //create 
				   var newParentElement = document.createElement("tr");
               var newElement;

               //name
				   newElement = document.createElement("td");
				   newElement.innerHTML = item.title;
               newParentElement.appendChild(newElement);
               
               //type
				   newElement = document.createElement("td");
				   newElement.innerHTML = item.dataType;
               newParentElement.appendChild(newElement);

               //protection
				   newElement = document.createElement("td");
				   newElement.innerHTML = this.getProtectionStringFromInt(item.protection);
               newParentElement.appendChild(newElement);

				   //add element
				   this.divSettingsVariables.appendChild(newParentElement);
				}
				break;

		}
      
      //CLASS EDITOR DISABLED
      this.divSettingsClassesContainer.style.display = 'none';
      //this.divSettingsCode.style.display = 'none';

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
      console.log(getInnerWidth(this.canvaContainer));
      console.log(getInnerHeight(this.canvaContainer));

		this.canva.width = getInnerWidth(this.canvaContainer) -1;
		this.canva.height = getInnerHeight(this.canvaContainer) -1;

		this.cw = this.canva.width;
		this.ch = this.canva.height;

		this.Xoff = (this.cw * this.scale)/2 - this.cw/2;
		this.Yoff = (this.ch * this.scale)/2 - this.ch/2;

		this.canvaCtx = this.canva.getContext("2d");

		//draw background
		this.canvaCtx.fillStyle = "#ffffff";
		this.canvaCtx.fillRect(0, 0, this.cw, this.ch);

      //clear drawed node list
      this.lsDrawedNodes.splice(0, this.lsDrawedNodes.length);

		//draw nodes
		var
		x1 = 0.5 * this.cw,
		y1 = 0.5 * this.ch; 

		this.canvaDrawNode(this.rootNode, x1, y1, 1, -1, 2 * Math.PI);

	}

   //            node     x    y   level   angulo    angulorango
	canvaDrawNode(node, argX, argY, level, angle, angleRange){

		//coordinates and radius
		var dist, x1, y1 ,x2, y2, rad, color;
		
		//DRAW
      color = "#000000"; //black
		this.canvaCtx.fillStyle = color; 

		var 
		TotalItems      = node.lsClasses.length + node.lsMethods.length + node.lsVars.length,
      angleDelta,
		angleAcumulator;

      //Unico hijo
      if (TotalItems === 1){
         angleDelta      = 0;
		   angleAcumulator = angle;
      }

      //root
      else if (angle === -1){
         angleDelta      = angleRange / TotalItems;
		   angleAcumulator = 0;
      }

      //Multiples hijos
      else{
         angleDelta      = angleRange / (TotalItems -1);
		   angleAcumulator = angle - angleRange / 2;
      }

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
				this.canvaDrawNode(item, argX + Math.cos(angleAcumulator) * dist , argY + Math.sin(angleAcumulator) * dist, level +1, angleAcumulator, angleDelta);
            angleAcumulator += angleDelta;

			}
		}

      //draw itself
		x1 = this.createXCord(argX); 
		y1 = this.createYCord(argY); 
		rad = this.createDrawValue(12 -level*2);

      switch (node.type) {
			case 0:  color = "#FC760F"; break; //origin
			case 1:  color = "#ffce11"; break; //class
			case 2:  color = "#0fc0fc"; break; //method
			case 3:  color = "#d82b00"; break; //variable
			default: color = "#0000FF"; break;
		}
      this.canvaCtx.fillStyle = color;

      //selected node
      if (node === this.selectedNode){
         //Constrast circle
         this.canvaCtx.globalAlpha = 0.4;
         this.canvaCtx.beginPath();
         this.canvaCtx.arc(x1, y1, rad+6, 0, 2 * Math.PI);
         this.canvaCtx.closePath();
         this.canvaCtx.fill();
         this.canvaCtx.globalAlpha = 1;

      }

      //circle
      this.canvaCtx.beginPath();
      this.canvaCtx.arc(x1, y1, rad, 0, 2 * Math.PI);
      this.canvaCtx.closePath();
      this.canvaCtx.fill();


      //add node to drawed node list
      this.lsDrawedNodes.push( new mod3DrawedNode(node, x1, y1, rad) );

      //draw text
      color = "#000000";
      this.canvaCtx.fillStyle = color;
      this.canvaCtx.font = "18px Arial";

      x1 = this.createXCord(argX -rad/4); 
		//y1 = this.createYCord(argY +rad/8); 
		this.canvaCtx.beginPath();
      this.canvaCtx.fillText(node.title, x1, y1);
		this.canvaCtx.closePath();

      

	}

   //INTERACTION RELATED
   canvaInteraction(){

      // canvas related variables
      var canvasOffset = this.canva.offset();

      //cords
      var offsetX = canvasOffset.left;
      var offsetY = canvasOffset.top;

      mouseX = parseInt(e.clientX - offsetX);
      mouseY = parseInt(e.clientY - offsetY);

      //
      console.log(mouseX.toString() + " : " + mouseY.toString());
   }

   handleCanvaMouseMove(mouse){

      //console.log("MOUSE MOVED");
      this.isMouseHoveringANode = false;
      this.NodeMouseHover = null;

      //get clicked node
      var mouseX, mouseY;
      mouseY = mouse.offsetY;
      mouseX = mouse.offsetX;

      //console.log("mouse cords: " + mouseX.toString() + ", " + mouseY.toString() );

      var item, itemX, itemY, itemRad, mouseDistance;

      //check hover node
      for(var i = 0; i < this.lsDrawedNodes.length ; i++){

         //get cords
         item    = this.lsDrawedNodes[i];
         itemX   = item.x;
         itemY   = item.y;
         itemRad = item.rad;

         mouseDistance = Math.sqrt( Math.pow(mouseX - itemX, 2) + Math.pow(mouseY - itemY, 2) );

         //console.log("item cords [" + item.node.title + "]: " + itemX.toString() + ", " + itemY.toString() );


         //console.log(mouseDistance);
         //mouse is inside node
         if ( mouseDistance < itemRad ){
            this.isMouseHoveringANode = true;
            this.NodeMouseHover = item.node;
            console.log(mouseDistance);
            break;
         }

      }

      //change pointer when hovering a node
      if (this.isMouseHoveringANode)
         this.divCanva.style.cursor = 'pointer';
      else
         this.divCanva.style.cursor = 'default';

   }

   handleCanvaMouseClick(mouse){
      console.log("MOUSE CLICKED");

      if (this.isMouseHoveringANode && (this.NodeMouseHover != null)){
         this.selectedNode = this.NodeMouseHover;
         this.updateSettingsElements();
         this.updateCanva();
      }


   }

   //Convertir codigo a diagram por medio del estudio de las palabras
   convertCodeToDiagram(){
      console.log("Convert");

      var code = this.codeEditor.getValue();

      //var readingSentence = false;
      var readingType = 0;
      var dataProtection, dataType, dataName;

      var indexStart = null, indexEnd = null;

      //characters that are not letters
      var specialChars = [" ", "{", "}", "\t", ";", "\n", "(", ")", ",", "*", "/", "{", "}", "@"];

      var protectionWords = ["public", "private", "protected"]; 
      var sentenceWords   = ["class", "int", "String"];

      var className;
      var classWasSet = false;
      var insideClass = false;

      //agrupadores
      var insideParentesis = false;
      var lasOneWasAFunction = false;
      var insideFunctionArguments = false;

      var inCommentSingleline = false;
      var inCommentMultiline = false;
      var inBrakets = false;
      var bracketLevel = 0;

      var inUnwantedCode = false;

      //=========================================================
      //node related
      this.rootNode   = new mod3Node(0, 0, "Root", code);
      var classNode   = null;//new mod3ClassNode(1, "Carro", "None", "None", "//My class \n int a = 20;");
      
      var newNode = null;
      var previousParentNode = null;
      

      

      //agrupador para obtener el bloque de codigo adentro 
      var bracketStart = -1;
      var bracketEnd   = -1;
      

      //=========================================================

      

      for(var i = 0; i <= code.length; i++){

         inUnwantedCode = inCommentSingleline || inCommentMultiline || inBrakets;

         //si el primer character es una letra
         if ( ( (specialChars.includes(code[i-1])) || ( (indexStart === null) ) ) && !specialChars.includes(code[i])){
            indexStart = i;
         }
         else if (( (indexStart !== null) && (specialChars.includes(code[i +1])) && (!specialChars.includes(code[i])) ) && !inUnwantedCode){
            indexEnd = i +1;

            //get the word
            var word = code.substring(indexStart, indexEnd);
            //console.log(indexStart.toString() + "," + indexEnd.toString() + ": " + word);
            indexStart = null;

            switch(readingType){

               //new sentence
               case 0:
                  //protection word -> function
                  if (protectionWords.includes(word)){
                     dataProtection = word;
                     readingType = 1;

                     insideParentesis = false;
                     insideFunctionArguments = false;

                     //empezar bracket de funcion
                     bracketStart = i;

                  }

                  //is inside a function parentesis
                  if ((insideParentesis && lasOneWasAFunction) || (insideFunctionArguments)){
                     dataProtection = "argument";
                     dataType = word;
                     readingType = 2;
                     //console.log("insideFunctionArguments = true");
                     insideFunctionArguments = true;
                  }

                  break;
                  
               //any name
               case 1:
                  dataType = word;
                  readingType = 2;


                  break;

               case 2:
                  if (dataType === "class"){
                     className = word;
                     classWasSet = true;
                  }

                  dataName = word;

                  //class
                  if (dataType === "class" ){
                     console.log("[CLASS] " + dataProtection +" "+ dataType +" "+ dataName);
                     lasOneWasAFunction = false; 

                     //create node
                     classNode = new mod3ClassNode(this.getProtectionIntFromString(dataProtection), dataName, "None", "None", "//My class \n int a = 20;");
                     previousParentNode = classNode;
                  }

                  //constructor
                  else if ((dataType === className) && (insideParentesis) && (!insideFunctionArguments)){ 
                     
                     console.log("\n[CONSTR A] " + dataProtection +" "+ dataType);
                     lasOneWasAFunction = true; //its a function

                     //create node
                     newNode = new mod3MethodNode(this.getProtectionIntFromString(dataProtection), dataType, "void", "//My method \n int a = 20;");
                     classNode.addMethod( newNode );
                     previousParentNode = newNode;

                     //as is inside parentesis it means we are in an argument FIX
                     dataProtection = "argument";
                     dataType = word;
                     readingType = 2;
                     insideFunctionArguments = true;
                     break;

                  }

                  //argument
                  else if (insideFunctionArguments ){
                     console.log("[ARGUMENT] " + dataProtection +" "+ dataType +" "+ dataName);

                     //create node
                     previousParentNode.addVar( new mod3VariableNode(this.getProtectionIntFromString(dataProtection), dataName, dataType) );
                     lasOneWasAFunction = false;
                  }

                  //function
                  else 
                  {
                     if (code[i+1] === ";"){ //variable
                        console.log("[VAR] " + dataProtection +" "+ dataType +" "+ dataName);

                        //newNode = ;
                        previousParentNode.addVar( new mod3VariableNode(this.getProtectionIntFromString(dataProtection), dataName, dataType) );
                     }
                     else{ // function
                        console.log("\n[METHOD] " + dataProtection +" "+ dataType +" "+ dataName);

                        //create node
                        newNode = new mod3MethodNode(this.getProtectionIntFromString(dataProtection), dataName, dataType, "//My method \n int a = 20;");
                        classNode.addMethod( newNode );
                        previousParentNode = newNode;

                        lasOneWasAFunction = true; //its a function
                     }
                  }

                  //reset vars
                  dataProtection = ""; dataType = ""; dataName = "";
                  readingType = 0;
                  break;
            }
         }

         //Caracter special
         else if (specialChars.includes(code[i])){

            switch(code[i]){
               case "(":
                  //this allows us to know where starts the arguments of a function
                  //console.log(code[i]);
                  insideParentesis = true; 
                  break;

               case ")":
                  //console.log(code[i]);
                  insideParentesis = false; 
                  insideFunctionArguments = false;

                  //constructor without arguments
                  if (dataProtection !== "" && (dataType === className) && (!lasOneWasAFunction) /*&& (!insideParentesis)*/){
                     console.log("\n[CONSTR B] " + dataProtection +" "+ dataType);

                     //create node
                     newNode = new mod3MethodNode(this.getProtectionIntFromString(dataProtection), dataType, "void", "//My method \n int a = 20;");
                     classNode.addMethod( newNode );
                     newNode = null;

                     lasOneWasAFunction = true;

                     //reset vars
                     dataProtection = ""; dataType = ""; dataName = "";
                     readingType = 0;
                  }

                  break;
               
               
               case "/":

                  // "//" single line comment
                  if (code[i+1] == "/"){
                     inCommentSingleline = true;
                  }

                  // "/*" multiline comment
                  else if (code[i+1] == "*"){
                     inCommentMultiline = true;
                  }
                  i += 1;

                  break;

               //(newline) finish single line comment 
               case "\n":
                  inCommentSingleline = false;

                  break;

               case "*":
                  // "*/" multiline comment end
                  if (code[i+1] == "/"){
                     inCommentMultiline = false;
                     i += 1;
                  }
                  
                  break;
               
               case "{":
                  if (classWasSet && !insideClass){
                     insideClass = true;
                  }

                  else if ((insideClass) && !(inCommentSingleline || inCommentMultiline)){
                     inBrakets = true;
                     bracketLevel += 1;
                  }
                  break;

               case "}":

                  bracketLevel -= 1;

                  if ((classWasSet) && (bracketLevel === 0) && !(inCommentSingleline || inCommentMultiline)){
                     inBrakets = false;
                     bracketStart = i;
                  }

                  break;

            }

         }

      }

      //Al final 
      //this.rootNode.addClass(classNode);
      this.rootNode = classNode;
      this.selectedNode = this.rootNode;

      //update view
      this.updateSettingsElements();
      this.updateCanva();

   }

   //Convertir diagram a codigo por medio de la jerarquia de los nodos
   convertDiagramToCode(){
		this.convertDiagramToCodeRecursion(this.rootNode, false);
      //this.ConvertedText += "}";

      console.log(this.ConvertedText);
   }

   convertDiagramToCodeRecursion(node, pastInitialVars){
      var 
		TotalItems = node.lsClasses.length + node.lsMethods.length + node.lsVars.length;

      //format by node type
      switch(node.type){

         //class
         case 1:
            this.ConvertedText += this.getProtectionStringFromInt(node.protection) + " class " + node.title + "{ \n";
            break;

         //method
         case 2:
            pastInitialVars = true;
            this.ConvertedText += "\t" + this.getProtectionStringFromInt(node.protection) + " " + node.dataType + " " + node.title + " (";

            break;

         //variable
         case 3:
            if (!pastInitialVars){
               this.ConvertedText += "\t" + this.getProtectionStringFromInt(node.protection) +" "+ node.dataType + " " + node.title + ";\n";
            }
            else{
               this.ConvertedText += " " + node.dataType + " " + node.title + ",";
            }
            break;
         
      }

		//iterate trougth diferent node types
		for (var j = 1; j <= 3; j++){

			var lsSelected;

         //Si es clase leer primero las variables
         if (node.type === 1) {
            switch (j) {
               //classes
               case 1: lsSelected = node.lsVars; break;

               //methods
               case 2: lsSelected = node.lsClasses; break;

               //variables
               case 3: lsSelected = node.lsMethods; break;
            }
         }
         else{
         
            switch (j) {
               //classes
               case 1: lsSelected = node.lsClasses; break;

               //methods
               case 2: lsSelected = node.lsMethods; break;

               //variables
               default: lsSelected = node.lsVars; break;
            }
         }

			//iterate root node
			//CLASSES
			for (var i = 0; i < lsSelected.length ; i++){

				var item = lsSelected[i];

				//draw children
				this.convertDiagramToCodeRecursion(item, pastInitialVars);
       
			}
		}

      //cerrar agrupadores
      this.ConvertedText

      switch(node.type){

         //class
         case 1:
            this.ConvertedText += "\n} \n";
            break;

         //method
         case 2:

            //Arreglar comas
            if (this.ConvertedText[this.ConvertedText.length -1] === ','){
               this.ConvertedText = setCharAt(this.ConvertedText, this.ConvertedText.length -1, ' ');
               //this.ConvertedText[this.ConvertedText.length -1] = ' ';
            }

            this.ConvertedText += ") \n";
            break;

         
      }
   }

   /*
   protection level
   0 -> private
   1 -> public
   2 -> protected
   3 -> argument
   */

   getProtectionIntFromString(str){
      switch(str){
         case "private":   return 0; break;
         case "public":    return 1; break;
         case "protected": return 2; break;
         case "argument":  return 3; break;
      }
   }

   getProtectionStringFromInt(int){
      switch(int){
         case 0: return "private";   break;
         case 1: return "public";    break;
         case 2: return "protected"; break;
         case 3: return "argument";  break;
      }
   }

   //getNextWord

   addClass(){
      //revisar que todo el formulario este lleno
      this.inputClassName
   }

   addMethod(){

      var
      dataType   = this.inputMethodDatatype.value,
      name       = this.inputMethodName.value,
      selIndex   = this.inputMethodProtection.selectedIndex,
      protection = this.inputMethodProtection.options[selIndex].innerHTML;

      var empty = (dataType === "")
               || (name === "")
               || (protection === "");

      //no está vacio
      if (!empty){
         var newMethod = new mod3MethodNode(this.getProtectionIntFromString(protection), name, dataType, "")
         this.selectedNode.addMethod( newMethod );

         this.updateSettingsElements();
         this.updateCanva();
      }

   }

   addVariable(){

      var
      dataType   = this.inputVariableDatatype.value,
      name       = this.inputVariableName.value,
      selIndex   = this.inputVariableProtection.selectedIndex,
      protection = this.inputVariableProtection.options[selIndex].innerHTML;

      var empty = (dataType === "")
               || (name === "")
               || (protection === "");

      //no está vacio
      if (!empty){
         var newVariable = new mod3VariableNode(this.getProtectionIntFromString(protection), name, dataType)
         this.selectedNode.addVar( newVariable );

         this.updateSettingsElements();
         this.updateCanva();
      }

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

//change character at index
function setCharAt(str, index, chr) {
   if (index > str.length-1) 
      return str;

   return str.substring(0,index) + chr + str.substring(index+1);
}