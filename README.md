Perfect Pixels
==============

Since you're on this page, you're probably looking for how to use this bookmarklet.

Well, the answer is simple, just drag [this link][l] to your bookmarks folder above.

Once on a page you want to edit, click the bookmarklet and follow the instructions.


About Perfect Pixels:
---------------------

Currently works on:
Firefox 5+6
Chrome 14+ (untested below, theoretically 6+)

Will be adding more browser support later on (such as IE 7/8) - I've got a theory.

Happy Coding!

If you find bugs:
-----------------

Please report them, including the url of where the bug was.

If you can't give the URL, please reference some code that you can disclose.

Without this, you'd be better off fixing & committing it yourself.

[l]: javascript:(function(){if(typeof PerfectPixel==="undefined"){var a=document.createElement("script");a.type="text/javascript";a.src="https://raw.github.com/shalecraig/Perfect-Pixels/master/bookmarklet-entire.js";document.body.appendChild(a)}else{runPerfectPixel()}})();