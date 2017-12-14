;(function () {
  class StopWatch {
    constructor(node) {
      this.node = node;
      this.StopWatch = this.buildStopWatch();
      this.startStopBtn = $('.stop-start-btn', this.node);
      this.resetBtn = $('.reset-btn', this.node);
      this.lapBtn = $('.lap-btn', this.node);
      this.clearAllBtn = $('.clear-all-btn', this.node);
      this.time = $('.time', this.node);
      this.timeCont = $('.time-cont', this.node);
      this.elapsedTimeCont = $('.elapsed-time-cont', this.node);
      this.startTimeInterval;
      this.init();
    }
    buildStopWatch() {
      $('<div class="wrapper"><div class="info"><span>S - for Start/Stop</span><span>R - for Reset</span><span>L - for Elapsed time</span><span>C - Clear all Elapsed time</span></div><div class="controls"><input class="stop-start-btn btn" type="button" value="Start" name="button"><input class="reset-btn btn" type="button" value="Reset" name="button"><input class="lap-btn btn" type="button" value="Lap" name="button"><input class="clear-all-btn btn" type="button" value="Clear all time" name="button"></div><div class="time-cont"><div class="time">00:00:00:00</div><div class="elapsed-time-cont"></div></div></div>').appendTo(this.node);
    }
    
    startStop() {
      let that = this;
      this.startStopBtn.on('click', function () {
        $(this).val(function (i, value) {
          return value === 'Stop' ? 'Start' : 'Stop';
        });
        if ($(this).val() == 'Stop') {
          that.startTimer();
        } else {
          window.clearInterval(that.startTimeInterval);
        }
      });
      $(document).on('keyup', function(event) {
        if (event.keyCode === 83) {
          that.startStopBtn.val(function (i, value) {
            return value === 'Stop' ? 'Start' : 'Stop';
          });
          if (that.startStopBtn.val() == 'Stop') {
            that.startTimer();
          } else {
            clearInterval(that.startTimeInterval);
          }
        }
      });
    }
    
    startTimer() {
      let that = this;
      let date = new Date();
      that.startTimeInterval = window.setInterval(function () {
        let newDate = new Date() - date;
        let milisec = Math.abs(Math.floor(newDate) % 60);
        let sec = Math.abs(Math.floor(newDate / 1000) % 60);
        let min = Math.abs(Math.floor(newDate / 1000 / 60) % 60);
        let hours = Math.abs(Math.floor(newDate / 1000 / 60 / 60) % 24);
        if (milisec.toString().length == 1) milisec = '0' + milisec;
        if (sec.toString().length == 1) sec = '0' + sec;
        if (min.toString().length == 1) min = '0' + min;
        if (hours.toString().length == 1) hours = '0' + hours;
        that.time.text(hours + ':' + min + ':' + sec + ':' +  milisec);
      }, 100);
    }
  
    reset() {
      let that = this;
      this.resetBtn.on('click', function () {
        clearInterval(that.startTimeInterval);
        that.time.text('00:00:00:00');
        that.startStopBtn.val('Start');
      })
      $(document).on('keyup', function(event) {
        if (event.keyCode === 82) {
          clearInterval(that.startTimeInterval);
          that.time.text('00:00:00:00');
          that.startStopBtn.val('Start');
        }
      });
    }
    
    lap() {
      let that = this;
      this.lapBtn.on('click', function () {
        let elapsedTime = $('<div class="elapsed-time"></div>');
        let closeElapsedTime = $('<i class="fa fa-times" aria-hidden="true"></i>');
        elapsedTime.text(that.time.text());
        closeElapsedTime.appendTo(elapsedTime);
        elapsedTime.appendTo(that.elapsedTimeCont);
      });
      $(document).on('keyup', function(event) {
        if (event.keyCode === 76) {
          let elapsedTime = $('<div class="elapsed-time"></div>');
          let closeElapsedTime = $('<i class="fa fa-times" aria-hidden="true"></i>');
          elapsedTime.text(that.time.text());
          closeElapsedTime.appendTo(elapsedTime);
          elapsedTime.appendTo(that.elapsedTimeCont);
        }
      });
    }
    clearAllElapsed() {
      let that = this;
      this.clearAllBtn.on('click', function () {
        that.elapsedTimeCont.find('.elapsed-time').remove();
      });
      $(document).on('keyup', function(event) {
        if (event.keyCode === 67) {
          that.elapsedTimeCont.find('.elapsed-time').remove();
        }
      });
    }
    deleteElapsed() {
      let that = this;
      Array.prototype.removeFromArray = function(from, to) {
       let rest = this.slice((to || from) + 1 || this.length);
       this.length = from < 0 ? this.length + from : from;
       return this.push.apply(this, rest);
      };
      this.elapsedTimeCont.on('click', '.elapsed-time', function() {
        $(this).each(function (i, el) {
          console.log(el.lastChild.parentNode);
          el.lastChild.parentNode.remove();
        });
      });
    }

    init() {
      this.startStop();
      this.lap();
      this.reset();
      this.deleteElapsed();
      this.clearAllElapsed();
    }
  }
  
  new StopWatch($('.container'));
  
}());



//Old version
//   function StopWatch(node) {
//     this.node = node;
//     this.StopWatch = this.buildStopWatch();
//     this.startStopBtn = $('.stop-start-btn', this.node);
//     this.resetBtn = $('.reset-btn', this.node);
//     this.lapBtn = $('.lap-btn', this.node);
//     this.init();
//   }
  
//   StopWatch.prototype.buildStopWatch = function () {
//     $('<div class="wrapper"><div class="controls"><input class="stop-start-btn" type="button" value="Start" name="button"><input class="reset-btn" type="button" value="Reset" name="button"><input class="lap-btn" type="button" value="Lap" name="button"></div><div class="time-cont"><div class="time">00:00:00:00</div></div></div>').appendTo(this.node);
//   };
  
//   StopWatch.prototype.startStop = function () {
//     var that = this;
//     this.startStopBtn.on('click', function () {
//       $(this).val(function (i, value) {
//         return value === 'Stop' ? 'Start' : 'Stop';
//       }); 
//     });
//   };
  
//   StopWatch.prototype.reset = function () {
//     var that = this;
//   };
  
//   StopWatch.prototype.lap = function () {
//     var that = this;
//   };
  
//   StopWatch.prototype.init = function () {
//     this.startStop();
//     this.lap();
//     this.reset();
//   };
  
//   new StopWatch($('.container'));
