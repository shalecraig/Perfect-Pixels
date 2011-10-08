var PerfectPixel = true;
function runPerfectPixel() {
	var $ = jQuery,
	noOp = function(){return false;},
	holder = $('body'),
	bul = window.onbeforeunload,
	uniqueNum = new Date().getTime() + '" style="position: ',
	statusBox = $('<div id="drag_notifier_'+uniqueNum+'fixed;z-index:199;top:0px;left:0px;padding:30px 45px;overflow:hidden;margin:10px;font-size:14px;color:#333;border:1px solid #ccc;background-color:white;border-radius:10px;-moz-border-radius:10px;font-family:helvetica;">Drop picture here.</div>'),
	image = $('<img id="droppedComp_'+uniqueNum+'absolute;left:100px; top:100px;z-index:100">'),
	initDropFunction = holder[0].ondrop,
	setToGo = true;

	if (typeof window.FileReader === 'undefined') {
		alert("File API & FileReader unavailable. Please try a better browser?");
		setToGo = false;
	} else if (location.protocol === 'ftp://' && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
		statusBox.html("It seems like you're hosting the page via file://. <br/>" +
					"Due to chrome security bug <a href=\"http://code.google.com/p/chromium/issues/detail?id=47416\">#47416</a>, files cannot be read locally.<br/>" +
					"Try hosting it locally via http://");
		setToGo = false;
	}

	$('html').css('overflow-y', 'scroll');

	statusBox.hide();
	$('body').append(statusBox);
	statusBox.fadeIn();

	var dropFunction = function (e) {
		e.preventDefault();
		var imgOpacity = 0.5,
		file = e.dataTransfer.files[0],
		reader = new FileReader();

		window.onbeforeunload = function (){return "Are you sure you want to leave?";};
		a = statusBox, b = statusBox.text('');
		console.log(statusBox, statusBox.text(''));
		statusBox.text('Drag, or use your arrow keys to move the image.')
		setTimeout(function() {
			statusBox.fadeOut('slow');
		}, 5000);
		window.scrollTo(0,0);

		reader.onload = function (event) {
			var imageURL = (typeof event.target.result !== 'undefined') ? event.target.result : event.target.baseURI;
			image.attr('src',imageURL);
			image.css({ opacity: imgOpacity }).draggable();
			$(document.body).append(image);
		};

		reader.onerror = function(stuff) {
			alert("error reading file");
			console.log(stuff);
		};
		reader.readAsDataURL(file);

		$(document).keydown(function (e) {
			var shift = e.shiftKey,
			code = e.keyCode;
			if (shift === true) {
				if (code === 38 && imgOpacity < 1) {
					imgOpacity += 0.1;
					image.css({opacity: imgOpacity});
					e.preventDefault();
				} else if (code === 40 && imgOpacity > 0) {
					imgOpacity -= 0.1;
					image.css({opacity: imgOpacity});
					e.preventDefault();
				}
			} else if (!e.metaKey) {
				switch (code) {
					//Note: the parsing/etc are crude css hacks for ffox. image.css('left', '-=1px') isn't working for me in ffox 6. :(
					case 37:
						//nudge left
						image.css('left', (parseFloat(image.css('left')) - 1) + 'px');
						e.preventDefault();
						break;
					case 38:
						//nudge up
						image.css('top', (parseFloat(image.css('top')) - 1) + 'px');
						e.preventDefault();
						break;
					case 39:
						//nudge right
						image.css('left', (parseFloat(image.css('left')) + 1) + 'px');
						e.preventDefault();
						break;
					case 40:
						//nudge down
						image.css('top', (parseFloat(image.css('top')) + 1) + 'px');
						e.preventDefault();
						break;
					case 27:
						//leave edit mode
						e.preventDefault();
						image.fadeOut('200',function() {
							image.remove();
							statusBox.remove();
							window.onbeforeunload = bul;
							holder[0].ondrop = initDropFunction;
						});
						break;
				}
			}
		});

		return false;
	};
	//let you close the status box by clicking on it.
	statusBox.click(function() {
		window.onbeforeunload = bul;
		holder[0].ondrop = initDropFunction;
		statusBox.remove();
	});
	
	if (setToGo) {
		holder[0].ondragover = noOp;
		holder[0].ondragend = noOp;
		holder[0].ondrop = dropFunction;
	}
}

// Snippet found here...
// http://coding.smashingmagazine.com/2010/05/23/make-your-own-bookmarklets-with-jquery/
function getjQueryUI() {
	if (typeof jQuery.ui === 'undefined') {
		// http://www.hunlock.com/blogs/Howto_Dynamically_Insert_Javascript_And_CSS
		var jQui = document.createElement('script');
		jQui.type = 'text/javascript';
		jQui.onload = runPerfectPixel;
		jQui.src = 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.js';
		document.body.appendChild(jQui);
	} else {
		runPerfectPixel();
	}
}

(function () {
	if (typeof jQuery === 'undefined') {
		// http://www.hunlock.com/blogs/Howto_Dynamically_Insert_Javascript_And_CSS
		var jQ = document.createElement('script');
		jQ.type = 'text/javascript';
		jQ.onload = getjQueryUI;
		jQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		document.body.appendChild(jQ);
	} else {
		getjQueryUI();
	}
})();