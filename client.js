var os = require('os'),
	spawn = require('child_process').spawn,
	exec = require('child_process').exec,
	wpi = require('wiring-pi'),
	Door = require('./door'),
	conf = require('./conf'),
	doors = [0,1,2,3,4,5,6,7,10,11],
	currentProcess = null,
	lastOpenedDoor;

// commands
var playCmd = 'omxplayer',
	stopCmd = 'pkill omxplayer',
	ext = '.' + conf.extension;

// required setup
wpi.setup('wpi');

// handle event for each door
doors.forEach(function(id) {
	var door = new Door(id);
	// opening door
	// every opening door raise a message,
	// so every opening door will run a new video/sound instead of the playing one
	door.on('fall', function() {
		lastOpenedDoor = this.id;
		// launch video or audio
		// trick because gpio 10 and 11 are used against gpio 8 and 9
		var videoName = '/media/data/' + conf.dossier + '/';
		if (this.id >= 10) {
			videoName += this.id - 2 + ext;
		}
		else {
			videoName += this.id + ext;
		}
		// spawn the process
		if (currentProcess !== null) {
			exec(stopCmd, function(error, stdout, stderr) {
				currentProcess = spawn(playCmd, [videoName]);
			});
		}
		else {
			currentProcess = spawn(playCmd, [videoName]);
		}
	});
	// closing door
	// if the closing door is the last opened one,
	// stop video/audio
	door.on('rise', function() {
		if (this.id === lastOpenedDoor) {
			// stop video or audio
			if (currentProcess !== null) {
				exec(stopCmd, function(error, stdout, stderr) {
					currentProcess = null;
				});
			}
		}
	});
});
