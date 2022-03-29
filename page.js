'use strict';

var activePBRButton;
var screenshotKey = false;
var playbackSpeedButtons = false;
var screenshotFunctionality = 0;
var screenshotFormat = "png";
var extension = 'png';

function CaptureScreenshot() {
	var appendixTitle = "screenshot." + extension;

	var title;

	var headerEls = document.querySelectorAll("h1.title.ytd-video-primary-info-renderer");

	function SetTitle() {
		if (headerEls.length > 0) {
			title = headerEls[0].innerText.trim();
			return true;
		} else {
			return false;
		}
	}
	
	if (SetTitle() == false) {
		headerEls = document.querySelectorAll("h1.watch-title-container");

		if (SetTitle() == false)
			title = '';
	}

	var player = document.getElementsByClassName("video-stream")[0];
	player.pause()

	var time = player.currentTime;

	title += " ";
	

	let minutes = Math.floor(time / 60)

	time = Math.floor(time - (minutes * 60));

	if (minutes > 60) {
		let hours = Math.floor(minutes / 60)
		minutes -= hours * 60;
		title += hours + "-";
	}

	title += minutes + "-" + time;

	title += " " + appendixTitle;

	var canvas = document.createElement("canvas");
	var context = canvas.getContext('2d')
	canvas.width = player.videoWidth;
	canvas.height = player.videoHeight;
	context.drawImage(player, 0, 0, canvas.width, canvas.height);
	context.font = '18px serif'
	context.textBaseline = 'top'
	context.fillStyle = 'white'
	context.strokeStyle = 'black'
	context.lineWidth = 2
	context.strokeText(`screeshot time: ${minutes}분${time}초`,  10, 5)
	context.fillText(`screeshot time: ${minutes}분${time}초`,  10, 5)
	

	var downloadLink = document.createElement("a");
	downloadLink.download = title;

	function DownloadBlob(blob) {
		downloadLink.href = URL.createObjectURL(blob);
		downloadLink.click();
	}

	async function ClipboardBlob(blob) {
		const clipboardItemInput = new ClipboardItem({ "image/png": blob });
		await navigator.clipboard.write([clipboardItemInput]);
	}

	// If clipboard copy is needed generate png (clipboard only supports png)
	if (screenshotFunctionality == 1 || screenshotFunctionality == 2) {		
		canvas.toBlob(async function (blob) {
			await ClipboardBlob(blob);
			// Also download it if it's needed and it's in the correct format
			if (screenshotFunctionality == 2 && screenshotFormat === 'png') {
				DownloadBlob(blob);
			}
		}, 'image/png');
	}

	// Create and download image in the selected format if needed
	if (screenshotFunctionality == 0 || (screenshotFunctionality == 2 && screenshotFormat !== 'png')) {
		canvas.toBlob(async function (blob) {
			DownloadBlob(blob);
		}, 'image/' + screenshotFormat);
	}
	// player.play()
}

function AddScreenshotButton() {
	var ytpRightControls = document.getElementsByClassName("ytp-right-controls")[0];
	if (ytpRightControls) {
		ytpRightControls.prepend(screenshotButton);
	}

	chrome.storage.sync.get('playbackSpeedButtons', function(result) {
		if (result.playbackSpeedButtons) {
			ytpRightControls.prepend(speed2xButton);
			ytpRightControls.prepend(speed17xButton);
			ytpRightControls.prepend(speed15xButton);
			ytpRightControls.prepend(speed12xButton);
			ytpRightControls.prepend(speed1xButton);

			var playbackRate = document.getElementsByTagName('video')[0].playbackRate;
			switch (playbackRate) {
				case 1:
					speed1xButton.classList.add('SYTactive');
					activePBRButton = speed1xButton;
					break;
				case 1.2:
					speed12xButton.classList.add('SYTactive');
					activePBRButton = speed12xButton;
					break;
				case 1.5:
					speed15xButton.classList.add('SYTactive');
					activePBRButton = speed15xButton;
					break;
				case 1.7:
					speed17xButton.classList.add('SYTactive');
					activePBRButton = speed17xButton;
					break;
				case 2:
					speed2xButton.classList.add('SYTactive');
					activePBRButton = speed2xButton;
					break;
			}
		}
	});
}

// var screenshotButton = document.createElement("button");
// screenshotButton.className = "screenshotButton ytp-button";
// screenshotButton.style.width = "auto";
// screenshotButton.innerHTML = "Screenshot";
// screenshotButton.style.cssFloat = "left";
// screenshotButton.onclick = CaptureScreenshot;

var speed1xButton = document.createElement("button");
speed1xButton.className = "ytp-button SYText";
speed1xButton.innerHTML = "x1";
speed1xButton.onclick = function() {
	document.getElementsByTagName('video')[0].playbackRate = 1;
	activePBRButton.classList.remove('SYTactive');
	this.classList.add('SYTactive');
	activePBRButton = this;
};

var speed12xButton = document.createElement("button");
speed12xButton.className = "ytp-button SYText";
speed12xButton.innerHTML = "x1.2";
speed12xButton.onclick = function() {
	document.getElementsByTagName('video')[0].playbackRate = 1.2;
	activePBRButton.classList.remove('SYTactive');
	this.classList.add('SYTactive');
	activePBRButton = this;
};

var speed15xButton = document.createElement("button");
speed15xButton.className = "ytp-button SYText";
speed15xButton.innerHTML = "x1.5";
speed15xButton.onclick = function() {
	document.getElementsByTagName('video')[0].playbackRate = 1.5;
	activePBRButton.classList.remove('SYTactive');
	this.classList.add('SYTactive');
	activePBRButton = this;
};

var speed17xButton = document.createElement("button");
speed17xButton.className = "ytp-button SYText";
speed17xButton.innerHTML = "x1.7";
speed17xButton.onclick = function() {
	document.getElementsByTagName('video')[0].playbackRate = 1.7;
	activePBRButton.classList.remove('SYTactive');
	this.classList.add('SYTactive');
	activePBRButton = this;
};

var speed2xButton = document.createElement("button");
speed2xButton.className = "ytp-button SYText";
speed2xButton.innerHTML = "x2.0";
speed2xButton.onclick = function() {
	document.getElementsByTagName('video')[0].playbackRate = 2;
	activePBRButton.classList.remove('SYTactive');
	this.classList.add('SYTactive');
	activePBRButton = this;
};

var speed23xButton = document.createElement("button");
speed23xButton.className = "ytp-button SYText";
speed23xButton.innerHTML = "x2.3";
speed23xButton.onclick = function() {
	document.getElementsByTagName('video')[0].playbackRate = 2.3;
	activePBRButton.classList.remove('SYTactive');
	this.classList.add('SYTactive');
	activePBRButton = this;
};

activePBRButton = speed1xButton;

chrome.storage.sync.get(['screenshotKey', 'playbackSpeedButtons', 'screenshotFunctionality', 'screenshotFileFormat'], function(result) {
	screenshotKey = result.screenshotKey;
	console.log(screenshotKey)
	playbackSpeedButtons = result.playbackSpeedButtons;
	if (result.screenshotFileFormat === undefined) {
		screenshotFormat = 'png'
	} else {
		screenshotFormat = result.screenshotFileFormat
	}

	if (result.screenshotFunctionality === undefined) {
		screenshotFunctionality = 0;
	} else {
    	screenshotFunctionality = result.screenshotFunctionality;
	}

	if (screenshotFormat === 'jpeg') {
		extension = 'jpg';
	} else {
		extension = screenshotFormat;
	}
});

document.addEventListener('keydown', function(e) {
	if (document.activeElement.contentEditable === 'true' || document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA' || document.activeElement.contentEditable === 'plaintext')
		return true;

	// if (playbackSpeedButtons) {
	// 	switch (e.key) {
	// 		case 'q':
	// 			speed1xButton.click();
	// 			e.preventDefault();
	// 			return false;
	// 		case 's':
	// 			speed15xButton.click();
	// 			e.preventDefault();
	// 			return false;
	// 		case 'w':
	// 			speed2xButton.click();
	// 			e.preventDefault();
	// 			return false;
	// 		case 'e':
	// 			speed25xButton.click();
	// 			e.preventDefault();
	// 			return false;
	// 		case 'r':
	// 			speed3xButton.click();
	// 			e.preventDefault();
	// 			return false;
	// 	}
	// }

	if (e.altKey && e.key === 's') {
		CaptureScreenshot();
		e.preventDefault();
		return false;
	}
});

AddScreenshotButton();
