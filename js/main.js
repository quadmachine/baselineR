function draw_baseline() {
    var $baseline_height_f = document.getElementById('baseline-height'),
		$baseline_color_f = document.getElementById('baseline-color'),
		baseline_height = parseInt($baseline_height_f.options[$baseline_height_f.selectedIndex].text, 10),
		baseline_color = $baseline_color_f.options[$baseline_color_f.selectedIndex].text,
		$baseline_overlay = document.getElementById('baseline-overlay'),
		winW = window.innerWidth,
		lines,
		winH = (function () {
        	var D = document;
        	return Math.max(
        		Math.max(
					D.body.scrollHeight,
					D.documentElement.scrollHeight
				),
				Math.max(
					D.body.offsetHeight,
					D.documentElement.offsetHeight
				),
				Math.max(
					D.body.clientHeight,
					D.documentElement.clientHeight
				)
	        );
		})();
    if ($baseline_overlay) {
        document.body.removeChild($baseline_overlay);
    }
    lines = Math.floor(winH / baseline_height); //ukupan broj linija koji ce iscrtati

    function draw(baseline_height, baseline_color) { //prima baseline_height (baseline height) i baseline_color (baseline color, CSS notacija)
        var canvas = document.getElementById('baseline'),
			ctx = canvas.getContext('2d'), //daje kontekst canvasu da mozemo raditi s njim
        	blStart = 0.5, //offset da se ispravno rendaju linije od 0.5px
        	i;
		if (canvas.getContext) {
            ctx.lineWidth = 1; //debljina linije
            ctx.strokeStyle = baseline_color; //boja linije
            for (i = blStart; i < lines; i++) { //crta koliko treba linija
                blStart = blStart + baseline_height;
                ctx.beginPath();
                ctx.moveTo(0, blStart);
                ctx.lineTo(winW, blStart);
                ctx.stroke();
            }
        }
    }

    var baseline_overlay = document.createElement('div');

    baseline_overlay.setAttribute('id', 'baseline-overlay');
    baseline_overlay.innerHTML = '<canvas width="' + winW + '" height="' + winH + '" id="baseline"></canvas>';
    document.body.appendChild(baseline_overlay);

    draw(baseline_height, baseline_color);

}
(function () {

    var css_file = 'http://mladenpanic.com/baseliner/css/style.css';

    function include_css(filename) {
        var css = document.createElement('link');
        css.setAttribute('rel', 'stylesheet');
        css.setAttribute('href', filename);
        css.setAttribute('type', 'text/css');
        document.getElementsByTagName('head')[0].appendChild(css);
    }
    include_css(css_file);

    function add_baseline_controls() {
        var baseline_controls = document.createElement('div');

        baseline_controls.setAttribute('id', 'baseline-controls');
        baseline_controls.innerHTML = '<select onchange="draw_baseline();" id="baseline-color"><option>cyan</option><option>magenta</option><option>yellow</option><option>black</option></select><select onchange="draw_baseline();" id="baseline-height"><option>16</option><option>17</option><option selected="true">18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option></select><a id="hide-baseline" href="#"><img src="http://mladenpanic.com/baseliner/img/icon-close.png" alt="Close baselineR" /></a>';

        document.body.appendChild(baseline_controls);
    }
    add_baseline_controls();
    draw_baseline();

    var $hide_baseline = document.getElementById('hide-baseline');
    $hide_baseline.addEventListener("click", function (e) {

        document.body.removeChild(document.getElementById('baseline-controls'));
        document.body.removeChild(document.getElementById('baseline-overlay'));
        e.preventDefault();
    });

})();