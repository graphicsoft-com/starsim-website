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

    if (mbps > 25) {
      console.log(">= 25Mbps (" + mbps + "Mbps)");
    
    } else if (mbps > 10) {
      console.log(">= 10Mbps (" + mbps + "Mbps)");
    } else {
      console.log("< 10Mbps (" + mbps + "Mbps)");
    }
  }
);
