
function buildTimeline(){
	
	buildTimelineStructure();
	createEventColumns();
	populateTimeline();
	addEventListeners();

	function buildTimelineStructure() {
		
		createUpperSection();
		createInstructionsArea();
		createBottomSection();
		createPopup();

		function createUpperSection () {
			var timelineHTML5 = document.createElement("div");
			timelineHTML5.id = "timelineHTML5";
			document.getElementById("HTML5").appendChild(timelineHTML5);

			var tlTitle = document.createElement("div");
			tlTitle.id = "tlTitle";
			tlTitle.innerHTML = timelineData.title + " | " + "<span class='subtitle'>" + timelineData.subtitle + "</span>";
			timelineHTML5.appendChild(tlTitle);
			
			var tlContent = document.createElement("div");
		    tlContent.id = "tlContent";
			tlContent.style.backgroundImage = "url('"+ timelineData.path + "')";
			timelineHTML5.appendChild(tlContent);
			
			var tlNodeData = document.createElement("div");
		    tlNodeData.id = "tlNodeData";
			//tlNodeData.style.width = timelineData.year.length*310/3+"px";
			tlContent.appendChild(tlNodeData);
		}

		function createPopup() {

			var tlContentArea = document.getElementById("timelineHTML5");
			var tlPopupBox = document.createElement("div");
			tlPopupBox.id = "tlPopupBox";
			//tlContent.appendChild(tlPopupBox);
			tlContentArea.appendChild(tlPopupBox);
			tlPopupBox.style.display="none";
			
			// var tlPopupClose = document.createElement("div");
			// tlPopupClose.id = "tlPopupClose";
			// tlPopupClose.innerHTML = "Close";
			// tlPopupBox.appendChild(tlPopupClose);

			var tlCloseX = document.createElement("div");
			tlCloseX.id = "tlCloseX";
			tlCloseX.innerHTML = "X"
			tlPopupBox.appendChild(tlCloseX);

			var tlPopupContent = document.createElement("div");
			tlPopupContent.id = "tlPopupContent";
			tlPopupBox.appendChild(tlPopupContent);
		
		}

		function createInstructionsArea() {
			var tlInstructions = document.createElement("div");
			tlInstructions.id = "tlInstructions";
			tlInstructions.innerHTML = timelineData.instruction.content;
			document.getElementById("tlContent").appendChild(tlInstructions);
		}
		
		function createBottomSection () {

			var tlContent = document.getElementById("tlContent");

			var tlBottomBar = document.createElement("div");
			tlBottomBar.id = "tlBottomBar";
			tlContent.appendChild(tlBottomBar);
			
			var tlDateBar = document.createElement("div");
			tlDateBar.id = "tlDateBar";
			tlBottomBar.appendChild(tlDateBar);
			
			var tlSliderBar = document.createElement("div");
			tlSliderBar.id = "tlSliderBar";
			tlBottomBar.appendChild(tlSliderBar);
			
			var tlSliderLine = document.createElement("div");
			tlSliderLine.id = "tlSliderLine";
			tlSliderBar.appendChild(tlSliderLine);
			
			var tlSliderButton = document.createElement("div");
			tlSliderButton.id = "tlSliderButton";
			tlSliderBar.appendChild(tlSliderButton);
		}

	}
	
	function createEventColumns() {
		//populate divs with XML content
		var eventNode;
		var itemColumns = 0;
		for (var i = 0; i < timelineData.year.length; i++){
			
		if ((i%3) == 0) {
			itemColumns++;
			eventNode = document.createElement("div");
			eventNode.id = "eventNode" + [i];
			eventNode.className = "eventNode";
			
		}
		
				var textContent = document.createElement("div");
				if (timelineData.year[i].node_button != "")
				   textContent.id = timelineData.year[i].node_button + timelineData.year[i].node_month;
					
						//year 
						textContent.innerHTML += timelineData.year[i].node_year;
						//month
						if (timelineData.year[i].node_month!="") {
						textContent.innerHTML += ", "+timelineData.year[i].node_month;
						}
						//day
						if (timelineData.year[i].node_day!="") {
						textContent.innerHTML += " "+timelineData.year[i].node_day;
						}
						//content
						if (timelineData.year[i].day) {
						textContent.innerHTML += " | " + parseInlineNodes(timelineData.year[i].day).innerHTML+"<br />"+"<br />";
						}
						if (timelineData.year[i].node_button!=""){
							//alert("test");
							textContent.style.fontWeight="bold";
						}
						eventNode.appendChild(textContent);

				tlNodeData.appendChild(eventNode);	
		}//end for
	

		tlNodeData.style.width = ((itemColumns) * 312) +"px";
		//alert(timelineData.totalButtons);
	}


	function populateTimeline(){
	//populate each button with XML dates
		var btnNum = 0;
		var timelineWidth = document.getElementById("tlContent").offsetWidth * 0.98;
		var totalTimelineWidthButtons = 0;
		var ltBtnWidth = timelineWidth/parseFloat(timelineData.totalButtons);

		for (var j=0; j < timelineData.year.length; j++){
	         
			//loop through the array and find node buttons
			if (timelineData.year[j].node_button!=""){
				var date = document.createElement("div");
				date.id = timelineData.year[j].node_button + timelineData.year[j].node_month + "_" + btnNum;
				btnNum++;
				date.className = "tlDate";
				tlDateBar.appendChild(date);
				date.innerHTML = timelineData.year[j].node_button;
				if (parseFloat(date.offsetWidth) > ltBtnWidth) { 
						// date.style.width = (parseFloat(date.offsetWidth) +3)+"px";
						timelineWidth = timelineWidth - (parseFloat(date.offsetWidth)-5);
						totalTimelineWidthButtons += parseFloat(date.offsetWidth);
						ltBtnWidth =  timelineWidth/((parseFloat(timelineData.totalButtons) - btnNum));
						
				} else  {
					
					      timelineWidth = timelineWidth - ltBtnWidth;
							date.style.width = (ltBtnWidth-2)+"px";
							totalTimelineWidthButtons +=ltBtnWidth;
					if (totalTimelineWidthButtons > 624){
						date.style.width = (ltBtnWidth-((totalTimelineWidthButtons-624) +2))+"px";
						totalTimelineWidthButtons=624;
					}
							
				}
			
			}
		}
	}

	function addEventListeners () {
		
		$(".tlDate").click(function(){
		
			showPopupBox();
			//add correct content to the popup box
			var content = document.getElementById(this.id.split("_")[0]);
			document.getElementById("tlPopupContent").innerHTML = content.innerHTML;
			// tlPopupBox.style.height=parseFloat(parseFloat(document.getElementById("tlPopupContent").offsetHeight)) +16 + "px";
			//move tlNodeData and tlSliderButton
			var xpos = document.getElementById(this.id.split("_")[0]).offsetLeft;
			     
			if ((parseFloat(tlNodeData.offsetWidth) - parseFloat(xpos)) < 312) {
				xpos = parseFloat(xpos) - 312;
			}
				 
			//var moveLeftDistance=(parseFloat(this.id.split("_")[1]) * (570/parseFloat(timelineData.totalButtons-1)))+"px";
			var moveLeftDistance = (parseFloat(this.offsetLeft) + Math.round(parseFloat(this.style.width)/2)) - 27;
			if (parseFloat(this.offsetLeft) == 0)
					moveLeftDistance = 0;
					
			if ((parseFloat(this.offsetLeft) + parseFloat(this.style.width)) >= 620)
					moveLeftDistance = 570;

				$("#tlNodeData").animate({
					left:(xpos * (-1))+9, 
				},1000);

				$("#tlSliderButton").animate({
					left:moveLeftDistance
				},1000);
			});
	}
	
	//slider functionality
	$(function() {
		$("#tlSliderButton").draggable({
			axis: 'x', 
			containment:"#tlSliderBar", 
			scroll: true,
			drag: function(event, ui){
				var movingLeft = (parseFloat(ui.position.left) * ((parseFloat(tlNodeData.offsetWidth)-624)/570))
				
				//if ((parseFloat(tlNodeData.offsetWidth)- movingLeft) < 312)  
					    //     movingLeft = movingLeft -312;
					 
				tlNodeData.style.left = - movingLeft +"px";
				
			}//,
			//stop: function(){alert(tlNodeData.offsetWidth + " "+test);
		//test="";}
		});
		
	});
	//tlDateBar.style.width=totalTimelineWidthButtons +'px';
	
	// tlCloseX.onmouseover = function() {
	// 	this.style.color = "#F00000";
	// }
	// tlCloseX.onmouseout = function() {
	// 	this.style.color = "#000000";
	// }
	
	// tlCloseX.onclick = function() {
	// 	hidePopupBox();
	// }
	document.getElementById("tlPopupBox").onclick = function() {
		hidePopupBox();
	}
	// document.getElementById("tlSliderButton").onclick = function() {
	// 	hidePopupBox();
	// }
	showPopupBox = function(){
		$("#tlPopupBox").fadeTo(300,1).css({display:"block", height: "auto"});
	}
	
	hidePopupBox = function(){
		$("#tlPopupBox").fadeTo(300,0).css({display:"none", height: "0"});
	}
	 
}