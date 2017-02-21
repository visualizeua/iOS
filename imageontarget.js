var World = {
	loaded: false,

	init: function initFn() {
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {

		this.tracker = new AR.ClientTracker("assets/LSSLposter.wtc", {
			onLoaded: this.worldLoaded
		});

		var imgButton = new AR.ImageResource("assets/visualize.com.jpg");

		var playButtonImg = new AR.ImageResource("assets/LSSLvidStill.png");

		var playButton = new AR.ImageDrawable(playButtonImg, 0.17, {
			enabled: true,
			clicked: false,
			zOrder: 2,
			onClick: function playButtonClicked() {
                video1.pause();
				playButton.clicked = true;
    			AR.context.openInBrowser("https://www.youtube.com/watch?v=E2mYDaLCyv8");
    			return true;
    		},
			offsetY: -0.05,
			offsetX: +0.23
		});


        var video1 = new AR.VideoDrawable("assets/LSSLwikitude.mp4", 0.95, {
			offsetX: -0.15,
			offsetY: +0.25,
			isTransparent: true,
			zOrder: 1,
			onClick: function video1Clicked() {
                if (video1.playing) {
            		video1.pause();
            		video1.playing = false;
            	} else {
            		video1.resume();
            		video1.playing = true;
            	}
            return true;
            }
		});
	    video1.playing = true;

		var imgTwo = new AR.ImageResource("assets/teamPic.JPG");
        var overlayTwo = new AR.ImageDrawable(imgTwo, .203, {
            offsetX: 0,
            offsetY: -0.4,
        });

        var pageOneButton = new AR.ImageDrawable(imgButton, 0.12, {
              enabled: true,
              clicked: false,
              zOrder: 2,
              onClick: function pageOneButtonClicked() {
                   video1.pause();
                   pageOneButton.clicked = true;
                   AR.context.openInBrowser("http://visualizeua.wixsite.com/website");
                   return true;
              },
			offsetX: 0.32,
			offsetY: -0.23,
			zOrder: 1
		});

		/*
			The last line combines everything by creating an AR.Trackable2DObject with the previously created tracker, the name of the image target and the drawable that should augment the recognized image.
			Please note that in this case the target name is a wildcard. Wildcards can be used to respond to any target defined in the target collection. If you want to respond to a certain target only for a particular AR.Trackable2DObject simply provide the target name as specified in the target collection.
		*/
        var pageOne = new AR.Trackable2DObject(this.tracker, "*", {
			drawables: {
				cam: [playButton, video1, overlayTwo, pageOneButton]
			},
            onEnterFieldOfVision: function onEnterFieldOfVisionFn() {
				video1.resume();
				video1.playing = true;
			},
			onExitFieldOfVision: function onExitFieldOfVisionFn() {
				video1.pause();
				video1.playing = false;
			}
		});

	},


	worldLoaded: function worldLoadedFn() {
		var cssDivLeft = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
		var cssDivRight = " style='display: table-cell;vertical-align: middle; text-align: left;'";
		document.getElementById('loadingMessage').innerHTML =
			"<div" + cssDivLeft + ">Scan Target &#35;1 (LSSL Poster):</div>" +
			"<div" + cssDivRight + "><img src='assets/LSSLmini.png'></img></div>";

		// Remove Scan target message after 10 sec.
		setTimeout(function() {
			var e = document.getElementById('loadingMessage');
			e.parentElement.removeChild(e);
		}, 10000);
	}
};

World.init();
