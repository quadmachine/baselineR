(function(){

var css_file = 'http://mladenpanic.com/baseliner/css/style.css';

function include_css(filename) {
	var css = document.createElement('link');

	css.setAttribute('rel', 'stylesheet');
	css.setAttribute('href', filename);
	css.setAttribute('type', 'text/css');

	document.getElementsByTagName('head')[0].appendChild(css);
}
include_css(css_file);
	
function add_baseline_controls(){
	var baseline_controls = document.createElement('div');
	
	baseline_controls.setAttribute('id', 'baseline-controls');
	baseline_controls.innerHTML = '<select onchange="baselineOverlay();" id="baseline-color"><option>magenta</option><option>green</option><option>black</option><option>white</option></select><select onchange="baselineOverlay();" id="baseline-height"><option>18</option><option>22</option></select><a id="hide-baseline" href="#"><img src="http://mladenpanic.com/baseliner/img/icon-close.png" alt="Close baselineR" /></a>';
	
	document.body.appendChild(baseline_controls);
}
add_baseline_controls();


/*
function gridOverlay(gWidth,gColumns,gClr){
	//defaultna sirina i boja
	gWidth = typeof(gWidth) != 'undefined' ? gWidth : 960;
	gColumns = typeof(gColumns) != 'undefined' ? gColumns : 12;	
	gClr = typeof(gClr) != 'undefined' ? gClr : "rgba(255,0,0,0.1)";	

	function windowSize(){//racuna dimenzije browsera, rjesiti da se ovo radi na resize
		winW = window.innerWidth;
		winH = window.innerHeight-4;
	}
	windowSize();
	$('body').append('<div id="grid-overlay"><canvas width="'+gWidth+'" height="'+winH+'" id="grid"></canvas></div>');
	$('#grid').css({"margin": "0 auto", "display":"block"});	
	$('#grid-overlay').css({width: "100%", height: winH, "position": "absolute"});	
	
	function draw(gColumns) {
	      var canvas = document.getElementById("grid");
	      if (canvas.getContext) {
	        var ctx = canvas.getContext("2d");//daje kontekst canvasu da mozemo raditi s njim
			ctx.fillStyle=gClr;//boja columna
			ctx.fillRect(0,0,gWidth,winH);			
			for (var i=0;i<gColumns;i++){//crta koliko treba linija
				ctx.clearRect(i*80,0,20,winH);			
			}
	      }  
	}
	draw(gColumns);
} 
*/
baselineOverlay();

/*
$('#hide-baseline').live("click", function(e) {
	e.preventDefault();
	$('#baseline-overlay, #baseline-controls').remove();
});
*/

var $hide_baseline = document.getElementById('hide-baseline');
/* var $baseline_controls = document.getElementById('baseline-controls'); */
	$hide_baseline.addEventListener("click", function(e) {
		
		document.body.removeChild(document.getElementById('baseline-controls'));
		document.body.removeChild(document.getElementById('baseline-overlay'));		
		e.preventDefault();
	});

})();
function baselineOverlay(baseline_height,baseline_color){//prima baseline_height (baseline height) i baseline_color (baseline color, CSS notacija)
	//defaultna visina i boja
//	baseline_height = typeof(baseline_height) != 'undefined' ? baseline_height : 18;
//	baseline_color = typeof(baseline_color) != 'undefined' ? baseline_color : "#a3e2f5";
	var $baseline_height = document.getElementById('baseline-height');
	var $baseline_color = document.getElementById('baseline-color');	

	var baseline_height = parseInt($baseline_height.options[$baseline_height.selectedIndex].text);
	var baseline_color = $baseline_color.options[$baseline_color.selectedIndex].text;
	
	if (document.getElementById('baseline-overlay')){
		var $baseline_overlay = document.getElementById('baseline-overlay');
		document.body.removeChild($baseline_overlay);
	}	
	function windowSize(){//racuna dimenzije browsera, rjesiti da se ovo radi na resize
		winW = window.innerWidth;
		function getDocHeight() {
	    var D = document;
	    return Math.max(
	        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
	        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
	        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
	    );
		}	
		winH = getDocHeight();
		lines = Math.floor(winH/baseline_height);//ukupan broj linija koji ce iscrtati
	}
	function draw(baseline_height, baseline_color) {//prima baseline_height (baseline height) i baseline_color (baseline color, CSS notacija)
	      var canvas = document.getElementById("baseline");
	      if (canvas.getContext) {
	        var ctx = canvas.getContext("2d");//daje kontekst canvasu da mozemo raditi s njim
			ctx.lineWidth=1;//debljina linije
			ctx.strokeStyle=baseline_color;//boja linije
			blStart = 0.5;//offset da se ispravno rendaju linije od 0.5px
			for (var i=blStart;i<lines;i++){//crta koliko treba linija
				blStart = blStart+baseline_height;
				ctx.beginPath();  
				ctx.moveTo(0,blStart);  
				ctx.lineTo(winW,blStart);
				ctx.stroke();  
			}
	      }  
	} 

	windowSize();    

	var baseline_overlay = document.createElement('div');
	
	baseline_overlay.setAttribute('id', 'baseline-overlay');
	baseline_overlay.innerHTML = '<canvas width="'+winW+'" height="'+winH+'" id="baseline"></canvas>';	
	document.body.appendChild(baseline_overlay);

	console.log(baseline_height);
	console.log(baseline_color);		    
	draw(baseline_height, baseline_color);

}