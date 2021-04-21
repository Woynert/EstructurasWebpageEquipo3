
console.log("INICIANDO ModuleInfo.js");

// ===== MODULE 1 ===== //

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

      //Modulo de ejemplos (realiza cambios)
      else if (Nmodule == 2){
       this.lsInfo.push(new mod1Section("Lista sencillamente enlazada: Java")); //0
       this.lsInfo.push(new mod1Section("Lista sencillamente enlazada: Python")); //1
		 this.lsInfo.push(new mod1Section("Lista sencillamente enlazada: C")); //2

		 this.lsInfo.push(new mod1Section("Lista doblemente enlazada: Java")); //3
       this.lsInfo.push(new mod1Section("Lista doblemente enlazada: Python")); //4
		 this.lsInfo.push(new mod1Section("Lista doblemente enlazada: C")); //5

		 this.lsInfo.push(new mod1Section("Lista circulare simplemente enlazada: Java")); //6
       this.lsInfo.push(new mod1Section("Lista circulare simplemente enlazada: Python")); //7
		 this.lsInfo.push(new mod1Section("Lista circulare simplemente enlazada: C")); //8

		 this.lsInfo.push(new mod1Section("Lista circulare doblemente enlazada: Java")); //9
       this.lsInfo.push(new mod1Section("Lista circulare doblemente enlazada: Python")); //10
		 this.lsInfo.push(new mod1Section("Lista circulare doblemente enlazada: C")); //11

		 this.lsInfo.push(new mod1Section("Arbol binario: Java")); //12
       this.lsInfo.push(new mod1Section("Arbol binario: Python")); //13
		 this.lsInfo.push(new mod1Section("Arbol binario: C")); //14

		 this.lsInfo.push(new mod1Section("Arbol AVL: Java")); //15
       this.lsInfo.push(new mod1Section("Arbol AVL: Python")); //16
		 this.lsInfo.push(new mod1Section("Arbol AVL: C")); //17

		 this.lsInfo.push(new mod1Section("Arbol B: Java")); //18
       this.lsInfo.push(new mod1Section("Arbol B: Python")); //19
		 this.lsInfo.push(new mod1Section("Arbol B: C")); //20

		 this.lsInfo.push(new mod1Section("Pilas con Arreglos: Java")); //21
       this.lsInfo.push(new mod1Section("Pilas con Arreglos: Python")); //22
		 this.lsInfo.push(new mod1Section("Pilas con Arreglos: C")); //23

		 this.lsInfo.push(new mod1Section("Pilas con Listas: Java")); //24
       this.lsInfo.push(new mod1Section("Pilas con Listas: Python")); //25
		 this.lsInfo.push(new mod1Section("Pilas con Listas: C")); //26

		 this.lsInfo.push(new mod1Section("Colas con Arreglos: Java")); //27
       this.lsInfo.push(new mod1Section("Colas con Arreglos: Python")); //28
		 this.lsInfo.push(new mod1Section("Colas con Arreglos: C")); //29

		 this.lsInfo.push(new mod1Section("Colas con Listas: Java")); //30
       this.lsInfo.push(new mod1Section("Colas con Listas: Python")); //31
		 this.lsInfo.push(new mod1Section("Colas con Listas: C")); //32

		 this.lsInfo.push(new mod1Section("Colas de prioridad: Java")); //33
       this.lsInfo.push(new mod1Section("Colas de prioridad: Python")); //34
		 this.lsInfo.push(new mod1Section("Colas de prioridad: C")); //35

      }
      else if (Nmodule == 3){
         this.lsInfo.push(new mod1Section("Explicación")); //0
         this.lsInfo.push(new mod1Section("Explicación")); //0
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
	changeSection(moduleId, id){

      var folderNumber = moduleId; /*this.Nmodule;

      if (this.Nmodule !== moduleId){
         folderNumber = moduleId
      }*/

		if ((id != null && id >= 0 && id < this.lsInfo.length)){

         this.id = id;

         //set title
			this.pTitle.innerHTML   = this.lsInfo[id].title;

         console.log('resources/module' + folderNumber + '/' + id + '.txt');

			//fill container with text
			readTextFile('resources/module' + folderNumber + '/' + id + '.txt');

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
			this.changeSection(this.Nmodule, this.id);
		}
	}

	//go to previous
	prevSection(){
		if (this.id != null && this.id > 0){
			this.id -= 1;
			this.changeSection(this.Nmodule, this.id);
		}
	}

   //dynamic resizing
   fixPageStructure(){
      //set margins
      this.divContentContainer.style.marginTop    = (this.divTitleContainer.clientHeight).toString();
      this.divContentContainer.style.marginBottom = (this.divTitleContainer.clientHeight).toString();
   }

}