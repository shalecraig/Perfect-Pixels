/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */
 (function () {
	if (typeof PerfectPixel === 'undefined') {
		// http://www.hunlock.com/blogs/Howto_Dynamically_Insert_Javascript_And_CSS
		var PP = document.createElement('script');
		PP.type = 'text/javascript';
		PP.src = 'https://raw.github.com/shalecraig/Perfect-Pixels/master/bookmarklet-entire.js';
		document.body.appendChild(PP);
	} else {
		runPerfectPixel();
	}
})();