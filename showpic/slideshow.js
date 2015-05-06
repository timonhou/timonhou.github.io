/*
   New Perspectives on JavaScript, 2nd Edition
   Tutorial 8
   Tutorial Case

   Author: 
   Date:   

		
		Author : Hou, Tiejun
		Student-ID : 1348283
		Course : Internet-II
		Section :
		Date : 14/04/2015
   
   Functions

   addEvent(object, evName, fnName, cap)
      Run the function fnName when the event evName occurs in object.

   setupSlideshow()
      Sets up the slideshow by locating all slide images in the document
      and then runs function to create the slide gallery and page
      overlay.

   createHighRes(thumb, index)
      Creates image objects containing high resolution versions of the
      thumbnail images by attaching the high res versions as a custom
      property.

   createRollover(thumb)
      Creates image objects to act as rollover images for the thumbnail
      images in the document.

   createGallery(slides)
      Creates an HTML fragment for a slide gallery containing a close button,
      a slide image, navigation buttons, and a slide caption.

   showGallery()
      Shows the slide gallery using a fade-in effect.

   changeSlide(slide)
      Changes the current slide in the gallery to the slide parameter.

   createOverlay()
      Creates a page overlay obscuring the page content when the slide gallery
      is visible.

   setOpacity(objID, value)  
      Set the opacity of the document object with the id, objID to value.

   fadeIn(objID, maxOpacity, fadeTime, delay)
      Fades in an object with the id, objID up to a maximum opacity of 
      maxOpacity over an interval of fadeTime seconds with a delay of
      delay seconds.

   fadeOut(objID, maxOpacity, fadeTime, delay)
      Fades out an object with the id, objID from a maximum opacity of 
      maxOpacity down to 0 over an interval of fadeTime seconds with a 
      delay of delay seconds.
	
*/

function addEvent(object, evName, fnName, cap) {
   if (object.attachEvent)
       object.attachEvent("on" + evName, fnName);
   else if (object.addEventListener)
       object.addEventListener(evName, fnName, cap);
}

addEvent(window,"load",setupSlideshow,false);

var slides = new Array();
function setupSlideshow(){
	//populate array of slide images
	var pic1 = new Image();
	pic1.src = "chapter3-1.jpg";
	pic1.index = 0;
	slides.push(pic1);
	var pic2 = new Image();
	pic2.src = "chapter3-2.jpg";
	pic2.index = 1;
	slides.push(pic2);
	var pic3 = new Image();
	pic3.src = "chapter4-1.jpg";
	pic3.index = 2;
	slides.push(pic3);
	var pic4 = new Image();
	pic4.src = "chapter4-2.jpg";
	pic4.index = 3;
	slides.push(pic4);
	var pic5 = new Image();
	pic5.src = "chapter5-1.jpg";
	pic5.index = 4;
	slides.push(pic5);
	var pic6 = new Image();
	pic6.src = "chapter5-2.jpg";
	pic6.index = 5;
	slides.push(pic6);
	var pic7= new Image();
	pic7.src = "chapter6-1.jpg";
	pic7.index = 6;
	slides.push(pic7);
	var pic8 = new Image();
	pic8.src = "chapter6-2.jpg";
	pic8.index = 7;
	slides.push(pic8);
	var pic9 = new Image();
	pic9.src = "chapter7-1.jpg";
	pic9.index = 8;
	slides.push(pic9);
	var pic10 = new Image();
	pic10.index = 9;
	pic10.src = "chapter7-2.jpg";
	slides.push(pic10);
	var pic11 = new Image();
	pic11.src = "chapter8-1.jpg";
	pic11.index = 10;
	slides.push(pic11);
	var pic12 = new Image();
	pic12.src = "chapter8-2.jpg";
	pic12.index = 11;
	slides.push(pic12);
	var pic13 = new Image();
	pic13.src = "chapter9-1.jpg";
	pic13.index = 12;
	slides.push(pic13);
	var pic14 = new Image();
	pic14.src = "chapter9-2.jpg";
	pic14.index = 13;
	slides.push(pic14);
	var pic15 = new Image();
	pic15.src = "chapter10-1.jpg";
	pic15.index = 14;
	slides.push(pic15);
	var pic16 = new Image();
	pic16.src = "chapter10-2.jpg";
	pic16.index = 15;
	slides.push(pic16);
	if(slides.length > 0){
		createGallery(slides);
		createOverlay();
	}
	showGallery();
}

function createGallery(slides){
	
	var galleryBox = document.createElement("div");
	galleryBox.id = "galleryBox";
	
	// Insert a button to close the gallery
	var galleryTitle = document.createElement("p");
	galleryTitle.id = "galleryTitle";
	
	var closeButton = document.createElement("input");
	closeButton.type = "image";
	closeButton.src = "galleryclose.png";
	closeButton.onclick = function(){
		fadeOut("galleryBox",100,0.5,0);
		fadeOut("pageOverlay",80,0.5,0);
		setTimeout(function(){
		galleryBox.style.display  = "none";
		document.getElementById("pageOverlay").style.display = "none";
		},500);
		
	}
	galleryTitle.appendChild(closeButton);
	galleryBox.appendChild(galleryTitle);
	
	var slide = document.createElement("img");
	slide.id = "gallerySlide";
	slide.src = slides[0].src;
	galleryBox.appendChild(slide);
	
	//Insert the slide caption
	var slideCaption = document.createElement("p");
	slideCaption.id = "slideCaption";
	slideCaption.innerHTML = "chapter3";
	galleryBox.appendChild(slideCaption);
	
	//create the gallery footer

	var galleryFooter = document.createElement("p");
	galleryFooter.id = "galleryFooter";
	//create a button to go to the previous slide
	
	var slideBack = document.createElement("input");
	slideBack.type = "image";
	slideBack.src = "back.png";
	
	slideBack.onclick = function(){
		//Get the index of current slide
		var currentSlide = document.getElementById("gallerySlide");
		var currentIndex = currentSlide.index;
		
		//Decrease the index by 1
		currentIndex--;
		
		//If currentSlide is the first slide , go to the end
		if(currentIndex == -1) currentIndex = slides.length - 1;
		
		//change the image in the gallery
		changeSlide(slides[currentIndex]);
	}
	
	galleryFooter.appendChild(slideBack);
	
	//Show the initial slide number
	
	var slideNum = document.createElement("span");
	slideNum.id = "slideNumber";
	slideNum.innerHTML = "1";
	
	//Show the total number of slides

	var slideTotal = document.createTextNode(" of " + slides.length);
	
	galleryFooter.appendChild(slideNum);
	galleryFooter.appendChild(slideTotal);
	//create a button to go to the next slide
	
	var slideForward = document.createElement("input");
	slideForward.type = "image";
	slideForward.src = "forward.png";
	slideForward.onclick = function(){
		// Get the index of current slide
		var currentSlide = document.getElementById("gallerySlide");
		var currentIndex = currentSlide.index;
		
		//Increase the index by 1
		currentIndex++;

		//If currentSlide is the last slide, go to the start
		if(currentIndex == slides.length) currentIndex = 0;

		//Change the image in the gallery
		changeSlide(slides[currentIndex]);
	}
	
	galleryFooter.appendChild(slideForward);
	
	galleryBox.appendChild(galleryFooter);
	document.body.appendChild(galleryBox);
}


function showGallery(){
	//Change the image based on the clicked thumbnail
	changeSlide(slides[0]);
	//Reveal the slide show
	
	setOpacity("galleryBox",0);
	setOpacity("pageOverlay",0);
	document.getElementById("galleryBox").style.display = "block";
    document.getElementById("pageOverlay").style.display = "block";
    
    fadeIn("galleryBox",100,0.5,0);
    fadeIn("pageOverlay",80,0.5,0);
	// Halt propagation of the click event
	
	return false;
}

function changeSlide(slide){
	//set object references
	var galleryBox = document.getElementById("galleryBox");
	var oldSlide = document.getElementById("gallerySlide");
	var slideCaption = document.getElementById("slideCaption");
	var slideNum = document.getElementById("slideNumber");
	
	//Replace current slide with new slide
	setOpacity("gallerySlide",0);
	var newSlide = oldSlide.cloneNode(true);
	newSlide.src = slide.src;
	newSlide.index = slide.index;
	
	fadeIn("gallerySlide",100,0.5,0);
	//Replace current caption with new caption

	slideCaption.innerHTML = slide.alt;
	
	// Update the slide number
	slideNum.innerHTML = newSlide.index + 1;
	galleryBox.replaceChild(newSlide,oldSlide);
}

function createOverlay(){
	//Create an overlay to obscure the view of the Web page
	
	var pageOverlay = document.createElement("div");
	pageOverlay.id = "pageOverlay";
	document.body.appendChild(pageOverlay);
}

function setOpacity(objID,value){
	var object = document.getElementById(objID);
	//Apply the opacity value for IE and non-IE browsers
	object.style.filter = "alpha(opacity = " + value + ")";
	object.style.opacity = value/100;
}


function fadeIn(objID,maxOpacity,fadeTime,delay){
	//Calculate the interval between opacity changes
	var fadeInt = Math.round(fadeTime*1000)/maxOpacity;
	
	//Loop up the range of opacity values

	for(var i = 0; i <= maxOpacity; i++){
		setTimeout("setOpacity('" + objID + "', " + i + ")", delay);
		delay += fadeInt;
	}
}

function fadeOut(objID,maxOpacity, fadeTime,delay){
	//Calculate the interval between opacity changes

	var fadeInt = Math.round(fadeTime*1000)/maxOpacity;
	
	//Loop down the range of opacity values

	for(var i = maxOpacity; i >=0; i--){
		setTimeout("setOpacity('" + objID + "'," + i + ")", delay);
		delay += fadeInt;
	}
}

