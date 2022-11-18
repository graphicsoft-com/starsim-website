var testConnectionSpeed = {
  imageAddr: "/assets/images/testspeed.JPG", // this is just an example, you rather want an image hosted on your server
  downloadSize: 322343, // Must match the file above (from your server ideally)
  run: function (mbps_max, cb_gt, cb_lt) {
    testConnectionSpeed.mbps_max = parseFloat(mbps_max)
      ? parseFloat(mbps_max)
      : 0;
    testConnectionSpeed.cb_gt = cb_gt;
    testConnectionSpeed.cb_lt = cb_lt;
    testConnectionSpeed.InitiateSpeedDetection();
  },
  InitiateSpeedDetection: function () {
    window.setTimeout(testConnectionSpeed.MeasureConnectionSpeed, 1);
  },
  result: function () {
    var duration = (endTime - startTime) / 1000;
    var bitsLoaded = testConnectionSpeed.downloadSize * 8;
    var speedBps = (bitsLoaded / duration).toFixed(2);
    var speedKbps = (speedBps / 1024).toFixed(2);
    var speedMbps = (speedKbps / 1024).toFixed(2);
    if (
      speedMbps >=
      (testConnectionSpeed.max_mbps ? testConnectionSpeed.max_mbps : 1)
    ) {
      testConnectionSpeed.cb_gt ? testConnectionSpeed.cb_gt(speedMbps) : false;
    } else {
      testConnectionSpeed.cb_lt ? testConnectionSpeed.cb_lt(speedMbps) : false;
    }
  },
  MeasureConnectionSpeed: function () {
    var download = new Image();
    download.onload = function () {
      endTime = new Date().getTime();
      testConnectionSpeed.result();
    };
    startTime = new Date().getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = testConnectionSpeed.imageAddr + cacheBuster;
  },
};

// start test immediatly, you could also call this on any event or whenever you want
testConnectionSpeed.run(
  1,
  function (mbps) {
    if (mbps > 20) {
    	console.log(">= 20Mbps (" + mbps + "Mbps)");
    	let box1 = document.getElementById("box1");
		let box2 = document.getElementById("box2");
		let box3 = document.getElementById("box3");
		box1.innerHTML = `
						<video controls autoplay muted> 
						  	<source src="https://dx527nn108mr8.cloudfront.net/f2a950a0-8875-4aed-a0e4-8fdb6cc5efc8/Sim 96.mov" />
			    		</video>`;
		box2.innerHTML = `
						<video controls> 
						  	<source src="https://dx527nn108mr8.cloudfront.net/4d4ef28d-ae4a-49f5-8d4c-d774ffa022cd/Sim 92 Drain Test.mov" />
			    		</video>`;
		box3.innerHTML = `
						<video controls> 
						  	<source src="https://dx527nn108mr8.cloudfront.net/starSim/bob/634983c11abf1/Sim121_Camera_Video.mp4" />
			    		</video>`;
    
    }
    else {
    	console.log("< 10Mbps (" + mbps + "Mbps)");
    }
  }
);
