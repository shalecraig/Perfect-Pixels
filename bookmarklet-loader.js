(function () {
	if (typeof PerfectPixel === 'undefined') {
		
		// http://www.hunlock.com/blogs/Howto_Dynamically_Insert_Javascript_And_CSS
		var PP = document.createElement('script');
		PP.type = 'text/javascript';
		PP.src = 'https://raw.github.com/shalecraig/Perfect-Pixels/master/hosted/bookmarklet-entire.min.js';
		document.body.appendChild(jQ);
	} else {
		runPerfectPixel();
	}
})();