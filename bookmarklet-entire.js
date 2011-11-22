var PerfectPixel = true;
function runPerfectPixel() {
	var $ = jQuery,
	noOp = function(){return false;},
	holder = $('body'),
	bul = window.onbeforeunload,
	uniqueNum = new Date().getTime(),
	statusBox = $('<div id=\"drag_notifier_'+uniqueNum+'\" style=\'position: fixed;z-index:9999;top:0px;left:0px;padding:30px 45px;overflow:hidden;margin:10px;font-size:14px;color:#333;border:1px solid #ccc;background-color:white;border-radius:10px;-moz-border-radius:10px;font-family:helvetica;\'>Drop picture here.</div>'),
	image = $('<img id=\"droppedComp_'+uniqueNum+'\" style=\'position:absolute;left:100px; top:100px;z-index:100; pointer-events:none;\'>'),
	initDropFunction = holder[0].ondrop,
	setToGo = true,
	dropFunction,
	gaTrack = function() {
		function rand(min, max) {
		 return min + Math.floor(Math.random() * (max - min));
		}
		
		var i=1000000000,
		 utmn=rand(i,9999999999), //random request number
		 cookie=rand(10000000,99999999), //random cookie number
		 random=rand(i,2147483647), //number under 2147483647
		 today=(new Date()).getTime(),
		 win = window.location,
		 img = new Image(),
		 urchinUrl = 'http://www.google-analytics.com/__utm.gif?utmwv=1.3&utmn='
			+utmn+'&utmsr=-&utmsc=-&utmul=-&utmje=0&utmfl=-&utmdt=-&utmhn=www.shalecraig.com&utmr='+win+'&utmp=/bookmarklets/js&utmac=UA-11982805-1&utmcc=__utma%3D'
			+cookie+'.'+random+'.'+today+'.'+today+'.'
			+today+'.2%3B%2B__utmb%3D'
			+cookie+'%3B%2B__utmc%3D'
			+cookie+'%3B%2B__utmz%3D'
			+cookie+'.'+today
			+'.2.2.utmccn%3D(referral)%7Cutmcsr%3D' + win.host + '%7Cutmcct%3D' + win.pathname + '%7Cutmcmd%3Dreferral%3B%2B__utmv%3D'
			+cookie+'.-%3B';
		
		// trigger the tracking
		img.src = urchinUrl;
	};

	if (typeof window.FileReader === 'undefined') {
		alert('File API & FileReader unavailable. Please try a better browser?');
		setToGo = false;
	} else if (location.protocol === 'file:' && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
		statusBox.html('It seems like you\'re hosting the page via file://. <br/>' +
					'Due to chrome security bug <a href=\"http://code.google.com/p/chromium/issues/detail?id=47416\">#47416</a>, files cannot be read locally.<br/>' +
					'Try hosting it locally via http://');
		setToGo = false;
	}

	$('html').css('overflow-y', 'scroll');

	statusBox.hide();
	$('body').append(statusBox);
	statusBox.fadeIn();

	dropFunction = function (e) {
		e.preventDefault();
		var imgOpacity = 0.5,
		file = e.dataTransfer.files[0],
		reader = new FileReader();

		window.onbeforeunload = function (){return 'Are you sure you want to leave?';};
		statusBox.text('Drag, or use your arrow keys to move the image. Hold shift to modify default functions.');
		setTimeout(function() {
			statusBox.fadeOut('slow');
		}, 5000);
		window.scrollTo(0,0);

		reader.onload = function (event) {
			var imageURL = (typeof event.target.result !== 'undefined') ? event.target.result : event.target.baseURI;
			image.attr('src',imageURL);
			image.css({ opacity: imgOpacity }).draggable({
				scroll: false,
				start: function(event) {
					if (event.shiftKey) {
						this.css("pointer-events","none");
						return false;
					} else {
						return true;
					}
				},
				end: function(event) {
					this.css("pointer-events","default");
				}
			}
				
				);
			$(document.body).append(image);
		};

		reader.onerror = function(stuff) {
			alert('error reading file');
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
	if (typeof jQuery.ui === 'undefined' || jQuery.ui.draggable === 'undefined') {
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