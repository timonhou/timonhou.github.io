/*
 New Perspectives on JavaScript, 2nd Edition
 Tutorial 7
 Tutorial Case

 Author : Hou, Tiejun
 Student-ID : 1348283
 Course : Internet-II
 Section :
 Date : 05/04/2015
 Chapter 7 Tutorial

 Filename: toc.js

 Global Variables:
 sections
 An array contain the HTML elements used as section headings in the historic document

 Functions List:

 addEvent(object, evName, fnName, cap)
 Adds an event hander to object where evName is the name of the event,
 fnName is the function assigned to the event, and cap indicates whether
 event handler occurs during the capture phase (true) or bubbling
 phase (false)

 makeTOC()
 Generate a table of contents as a nested list for the contents of the "doc"
 element within the current Web page. Store the nested list in the "toc"
 element.

 levelNum(node)
 Returns the level number of the object node. If the object node does not
 represent a section heading, the function returns the value -1.

 createList()
 Goes through the child nodes of the "doc" element searching for section headings.
 When it finds a section heading, a new entry is added to the table of contents

 expandCollapse()
 Expands and collapse the content of the table of contents and the historic
 document

 expandCollapseDoc()
 Goes through the child nodes of the "doc" element determining which elements to
 hide and which elements to display

 isHidden(object)
 Returns a Boolean value indicating whether object is hidden (true) or
 not hidden (false) on the Web page by examining the display style for object
 and all its parent nodes up to the body element

 */

function addEvent(object, evName, fnName, cap) {
	if (object.attachEvent)
		object.attachEvent("on" + evName, fnName);
	else if (object.addEventListener)
		object.addEventListener(evName, fnName, cap);
}

addEvent(window, "load", makeTOC, false);

var sections = new Array("h1", "h2", "h3", "h4", "h5", "h6");
var sourceDoc;
//document on which the TOC is based
function makeTOC() {
	var TOC = document.getElementById("toc");
	TOC.innerHTML = "<h1>Table of Contents</h1>";
	var TOCList = document.createElement("ol");

	TOC.appendChild(TOCList);
	sourceDoc = document.getElementById("doc");

	//generate list items containing section headings
	createList(sourceDoc, TOCList);

}

function levelNum(node) {
	for (var i = 0; i < sections.length; i++) {
		if (node.nodeName == sections[i].toUpperCase())
			return i;
	}
	return -1;
	// node is not a section heading
}

function createList(object, list) {
	var prevLevel = 0;
	//level of the previous TOC entry
	var headNum = 0;
	//running count of section headings
	for (var n = object.firstChild; n != null; n = n.nextSibling) {
		// loop through all of the nodes within object

		var nodeLevel = levelNum(n);
		if (nodeLevel != -1) {
			// node represents a section heading

			//insert id for the section heading if necessary
			headNum++;
			// when you want to decide whether it is a null string or not, you should use " ", instead of "".
			if (n.id = " ") {
				n.id = "head" + headNum;
			}
			//create a list item to match
			var listItem = document.createElement("li");
			listItem.id = "TOC" +  n.id;
			//create a hypertext link to the section heading
			var linkItem = document.createElement("a");
			linkItem.innerHTML = n.innerHTML;
			linkItem.href = "#" + n.id;

			//append the hypertext link to the list entry
			listItem.appendChild(linkItem);
			if (nodeLevel == prevLevel) {
				// append the entry to the current list
				list.appendChild(listItem);
			} else if (nodeLevel > prevLevel) {
				//append the entry to a new nested list
				var nestedList = document.createElement("ol");
				nestedList.appendChild(listItem);

				list.lastChild.appendChild(nestedList);
				// Add plus/minus box before the text of the nested list
				var plusMinusBox = document.createElement("span");
				plusMinusBox.innerHTML = "--";
				addEvent(plusMinusBox, "click", expandCollapse, false);
				nestedList.parentNode.insertBefore(plusMinusBox, nestedList.previousSibling);

				//make the nested list the new current list and set the value of the preLevel variable to the level of the new entry.
				list = nestedList;
				prevLevel = nodeLevel;
			} else if (nodeLevel < prevLevel) {
				// append the entry to a higher-level list
				var levelup = prevLevel - nodeLevel;
				for (var i = 1; i <= levelup; i++) {
					//move up two levels
					list = list.parentNode.parentNode;
				}
				list.appendChild(listItem);
				prevLevel = nodeLevel;

			}
		}
	}
}

function expandCollapse(e) {
	var plusMinusBox = e.target || event.srcElement;
	var nestedList = plusMinusBox.nextSibling.nextSibling;

	//Toggle the plus and minus symbol
	if (plusMinusBox.innerHTML == "--")
		plusMinusBox.innerHTML = "+";
	else
		plusMinusBox.innerHTML = "--";

	//Toggle the display style of the nested list
	if (nestedList.style.display == "none")
		nestedList.style.display = "";
	else
		nestedList.style.display = "none";

	//expand and collapse the source document to match the TOC
	expandCollapseDoc();
}

function expandCollapseDoc() {
	var displayStatus = "";

	for (var n = sourceDoc.firstChild; n != null; n = n.nextSibling) {
		var nodeLevel = levelNum(n);

		if (nodeLevel != -1) {
			//determine the display status of the TOC entry
			var TOCentry = document.getElementById("TOC" + n.id);
			if (isHidden(TOCentry)) {
				displayStatus = "none";
			} else
				displayStatus = "";
		}
		if (n.nodeType == 1) {
			//apply the current display status to the node
			n.style.display = displayStatus;

		}
	}
}

function isHidden(object) {
	for (var n = object; n.nodeName != "BODY"; n = n.parentNode) {
		if (n.style.display == "none") {
			return true;
		}
	}
}