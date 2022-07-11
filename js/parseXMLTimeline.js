// JavaScript Document




function loadTimeline_HTML5() {
	timelineXMLParse();
	buildTimeline();
	
	}

var timelineData = new Object();
var timelineInstr = new Object();
var arrayYear = new Array();
		
function timelineXMLParse(){
	    var file="xml/cip_" + projCode + "_timeline.xml"
		var xmlObj = new load_XML(file);
		var elemArray = xmlObj.tagNameElement("timeline");
		       timelineData.title = elemArray[0].getAttribute('title');
			   timelineData.subtitle = elemArray[0].getAttribute('subtitle');
			   timelineData.subtitle_X = elemArray[0].getAttribute('subtitle_X');
			   timelineData.subtitle_Y = elemArray[0].getAttribute('subtitle_Y');
			   timelineData.rolloverColorBtn = elemArray[0].getAttribute('rolloverColorBtn');
			   timelineData.path = elemArray[0].getAttribute('path');
			    	
					var elemArray = xmlObj.tagNameElement("instructions");
					var objData = new Object();
		       		objData.title = elemArray[0].getAttribute('title');
					
					var	instrContentArray = xmlObj.tagNameElement("content");
			   		objData.content = instrContentArray[0].firstChild.nodeValue;
			   		timelineData.instruction = objData;
			   		
			 var yearsDomElemArray = xmlObj.tagNameElement("year");
			 var yearsArray = new Array();
			 var buttonNum =0;
			 for(var i = 0; i < yearsDomElemArray.length; i++){ //years
				 var obj = new Object();
				  obj.node_year = yearsDomElemArray[i].getAttribute('node_year');
			      obj.node_button = yearsDomElemArray[i].getAttribute('node_button');
				  if (obj.node_button != "")
				         buttonNum++;
			         var yearsChilds = yearsDomElemArray[i].childNodes;
					  
					 for(var j=0; j< yearsChilds.length; j++){
						 var xmlNode = yearsChilds[j];
						// alert(xmlNode.nodeName)
							switch (xmlNode.nodeName){
								case 'month':
								obj.node_month = yearsChilds[j].getAttribute('node_month');
					 			
								var dayChilds = yearsChilds[j].childNodes;
					   			obj.day= xmlObj.tagNameElement("day", xmlNode)[0];
								obj.node_day  =  obj.day.getAttribute('node_day');
								//alert(obj.node_day);
							
								break;
							}
						}
							yearsArray[i]=obj;
					 }//end for
					timelineData.totalButtons = buttonNum;
					timelineData.year=yearsArray;
				
	} //end initReadXML() function
			
	
			
	function parseInlineNodes(xmlNode){
		 var inlPart = ce('span');
			for(var i=0; i<xmlNode.childNodes.length; i++){
				var hPart;
				var xPart = xmlNode.childNodes[i];
					if(xPart.nodeName == '#text'){
						hPart = ce('span');
						hPart.appendChild(ctn(xPart.data));
					}  else {
							hPart = ce(xPart.nodeName); //html tags (b, u, i etc.)
							if(xPart.firstChild)
									hPart.appendChild(ctn(xPart.firstChild.data));
					}
					inlPart.appendChild(hPart);
			}
			return inlPart;
	}
	
	
function ce(name){
		var dn = document.createElement(name);
		return dn;
}
function ctn(from){
		 var tn = document.createTextNode(from);
		return tn;
}
function convertTextToUnicode(string){
	            var z = []
				var s = new String(string);
				for(var q=0; q < s.length;  q++)
          				z.push( "&#" + s.charCodeAt(q) + ";");
						
           		return z.join("");			
}
