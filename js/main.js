(function(){
function baseline_me(){
	var baseline_controls = '<div id="baseline-controls"><select id="baseline-color"><option>magenta</option><option>green</option><option>black</option><option>white</option></select><select id="baseline-height"><option>18</option><option>22</option></select><a id="hide-baseline" href="#">Close</a></div>';
	$('body').append(baseline_controls);
}
baseline_me();

function baselineOverlay(blh,bClr){//prima blh (baseline height) i bClr (baseline color, CSS notacija)
	//defaultna visina i boja
//	blh = typeof(blh) != 'undefined' ? blh : 18;
//	bClr = typeof(bClr) != 'undefined' ? bClr : "#a3e2f5";
	var blh = parseInt($('#baseline-height').val());
	var bClr = $('#baseline-color').val();	
	if ('#baseline-overlay'){
		$('#baseline-overlay').remove();
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
		lines = Math.floor(winH/blh);//ukupan broj linija koji ce iscrtati
	}
	function draw(blh, bClr) {//prima blh (baseline height) i bClr (baseline color, CSS notacija)
	      var canvas = document.getElementById("baseline");
	      if (canvas.getContext) {
	        var ctx = canvas.getContext("2d");//daje kontekst canvasu da mozemo raditi s njim
			ctx.lineWidth=1;//debljina linije
			ctx.strokeStyle=bClr;//boja linije
			blStart = 0.5;//offset da se ispravno rendaju linije od 0.5px
			for (var i=blStart;i<lines;i++){//crta koliko treba linija
				blStart = blStart+blh;
				ctx.beginPath();  
				ctx.moveTo(0,blStart);  
				ctx.lineTo(winW,blStart);
				ctx.stroke();  
			}
	      }  
	} 

	windowSize();    
	$('body').append('<div id="baseline-overlay"><canvas width="'+winW+'" height="'+winH+'" id="baseline"></canvas></div>');
	$('#baseline-overlay').css({width: "100%", position: 'absolute', left: 0, top: 0, 'pointer-events': 'none', 'z-index': 998, "overflow": "hidden"});
	console.log(blh);
	console.log(bClr);		    
	draw(blh, bClr);

}
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
$('#baseline-controls').find('select').change(function(){
	baselineOverlay();
});
$('#hide-baseline').live("click", function(e) {
	e.preventDefault();
	$('#baseline-overlay, #baseline-controls').remove();
});

})();