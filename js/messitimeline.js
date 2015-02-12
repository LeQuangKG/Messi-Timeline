/*
	Name : Messi-Timeline
	Create : Le Viet Quang (quang.le@ringierstudios.com)
	Date : 26 - 8 -2012
	Version : 1.0
	Project : FIFA Football App
*/

var butOpenChart = null;
var openText = null;
var messiface = null;
var line1 = null;
var line2 = null;
var year = null;
var butCloseChart = null;
var moveChart = null;
var chartDiv = null;
var content = null;
var wrapper = null;
var byline = null;
var currentYear = -1;
var choiceyear = -1;
var but = [];
var contentText = [];
var inMove = false;
var butCloseContent = null;

function OpenChart(){
	openText.style.opacity = 0;
	year.style.display = "block";
	butCloseChart.style.display = "block";
	chartDiv.style.display = "block";
	setTimeout(function(){
		openText.style.display = 'none';
		messiface.style.left = "798px";
		line1.style.width = "1024px";
		setTimeout(function(){
			chartDiv.style.opacity = 1;
			year.style.opacity = 1;
			butCloseChart.style.opacity = 1;
		},500);
	},400);
	byline.style.opacity = 1;
}

function CloseChart(){
	chartDiv.style.opacity = 0;
	year.style.opacity = 0;
	butCloseChart.style.opacity = 0;
	openText.style.display = 'block';
	setTimeout(function(){
		year.style.display = "none";
		butCloseChart.style.display = "none";
		chartDiv.style.display = "none";
		messiface.style.left = "495px";
		line1.style.width = "203px";
		setTimeout(function(){
			openText.style.opacity = 1;
		},500);
	},800);
	byline.style.opacity = 0;
	currentYear = -1;
	choiceyear = -1;
}

function SetContent(n){
	//inMove = false;
	if(currentYear < 0){
		currentYear = n - 1;
		contentText[currentYear].style.display = "block";
		setTimeout(function(){
			contentText[currentYear].style.opacity = 1;
			setTimeout(function(){
				inMove = false;
			},400);
		},100);
	}
	else{
		contentText[currentYear].style.opacity = 0;
		contentText[n-1].style.display = "block";
		setTimeout(function(n){
			contentText[currentYear].style.display = "none";
			contentText[n-1].style.opacity = 1;
			currentYear = n - 1;
			setTimeout(function(){ inMove = false; },400);
		},300,n);
	}
}

function RemoveContent(n){
	but[currentYear].className = "bur-but";
	contentText[currentYear].style.opacity = 0;
	contentText[currentYear].style.display = "none";
	currentYear = -1;
}

function OpenContent(e){
	if(inMove == true) return;
	inMove = true;
	var n = parseInt(e.target.id);
	if(currentYear >= 0) {
		but[currentYear].className = "bur-but";
		//currentYear = n - 1;
		but[n-1].className = "focus-but";
		SetContent(n);
	}
	else{
		content.style.height = "362px";
		content.style.top = "271px";
		line1.style.top = "632px";
		year.style.top = "649px";
		moveChart.style.top = "-177px";
		butCloseChart.style.opacity = 0;
		setTimeout(function(n){
			butCloseChart.style.display = "none";
			but[n-1].className = "focus-but";
			SetContent(n);
			butCloseContent.style.display = "block";
			setTimeout(function(){
				butCloseContent.style.opacity = 1;
			});
		},800,n);
		//currentYear = n - 1;
	}
}

function CloseContent(){
	RemoveContent(currentYear);
	content.style.height = "0px";
	content.style.top = "447px";
	line1.style.top = "447px";
	year.style.top = "472px";
	moveChart.style.top = "0px";
	butCloseChart.style.display = "block";
	butCloseContent.style.opacity = 0;
	butCloseContent.style.display = "none";
	setTimeout(function(){
		butCloseChart.style.opacity = 1;
	},100);
}

function CheckMove(e){
	if(e.pageX){
		var x = e.pageX;
		var y = e.pageY;
	}
	else{
		var x = e.changedTouches[0].clientX;
		var y = e.changedTouches[0].clientY;
	}
	if(x>=0&&x<=375&&y>=0&&y<=172) CloseContent();
	if(x>=434&&x<=611&&y>=0&&y<=100) CloseContent();
	if(x>=0&&x<=1024&&y>=711&&y<=768) CloseContent();
	//console.log(x+"    "+y);
}

window.onload = function(){
	document.body.addEventListener('touchmove', function(e){e.preventDefault();},false);
	butOpenChart = document.getElementById("open-chart-but");
	openText = document.getElementById("open_text");
	messiface = document.getElementById("messiface");
	line1 = document.getElementById("line1");
	year = document.getElementById("year");
	butCloseChart = document.getElementById("close-chart-but");
	chartDiv = document.getElementById("chart_div");
	line2 = document.getElementById("line2");
	content = document.getElementById("content");
	moveChart =  document.getElementById("move_chart");
	wrapper = document.getElementById("wrapper");
	byline = document.getElementById("byline");
	butCloseContent = document.getElementById("close-content");
	
	for(var i = 0; i< 14; i++){
		var  name1 = i + 1;
		var name2 = "year"+(i+1);
		but[i]= document.getElementById(name1);
		contentText[i]= document.getElementById(name2);
		//document.getElementById(name).addEventListenner("click",OpenContent,false);
	}
	
	for(var i = 0; i< 14; i++){
		but[i].addEventListener("click",OpenContent,false);
	}
	butOpenChart.addEventListener("click",OpenChart,false);
	butCloseChart.addEventListener("click",CloseChart,false);
	messiface.addEventListener("click",CloseContent,false);
	butCloseContent.addEventListener("click",CloseContent,false);
	wrapper.addEventListener("click",CheckMove,false);
	setTimeout(function(){OpenChart();},1000);
}