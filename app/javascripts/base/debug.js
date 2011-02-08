
  // DO NOT USE the @view instance variable in any files in /app/javascripts/base.
  // The way they are cached makes it not safe to do so.

var Debug;

Debug = {
  on: false,
  console: true,
  alerts: false, 
  logs: false,
  ajaxErrors: false,
  
  consoleOn: function() {
    return (typeof window['console'] !== 'undefined' && this.console);
  },
  
  alertsOn: function() {
    return (Debug.on || Debug.logs);
  },
  
  logsOn: function() {
    return (Debug.on || Debug.logs);
  },
  
  ajaxErrorsOn: function() {
    return (Debug.on || Debug.ajaxErrors);
  },
  
  profile: function(name) {
    if (this.consoleOn()) {
      console.profile(name);
    }
  },
  
  profileEnd: function(name) {
    if (this.consoleOn()) {
      console.profileEnd(name);
    }    
  },
  
  call: function(level, message, obj) {
    try {
      message = this.message(message, obj);

      if (Debug.consoleOn()) {
        console[level](message);
      }
      if (Debug.logsOn()) {
        alert(message);
      }
    } catch(e) {
      if (Debug.consoleOn()) {
        console[level](e);
      } else {
        // alert(e);
      }
    }    
  },
  
  log: function(message, obj) {
    this.call("log", message, obj);
  },
  
  error: function(message, obj) {
    this.call("error", message, obj);
  },
  
  info: function(message, obj) {
    this.call("info", message, obj);
  },
  
  warn: function(message, obj) {
    this.call("warn", message, obj);
  },
  
  alert: this.log,
  
  message: function(message, obj) {
    try {
      message = this.timestamp() + " " + this.generalInfo() + " " + message;    
      if (obj) {
        message = message + ", " + YAHOO.lang.JSON.stringify(obj);
      }
    } catch(e) {
      // alert(e);
    }
    return message;
  },
  
  timestamp: function() {
    var time, year, month, date, hour, minute, second, timestamp, checktime;
    
    checktime = function checkTime(i) {
      if (i<10) {
        i="0" + i;
      }
      return i;
    };
    
    time = new Date();
    hour = checktime(time.getHours());
    minute = checktime(time.getMinutes());
    second = checktime(time.getSeconds());
    
    timestamp = hour + ":" + minute + ":" + second;
    
    return timestamp;
  },
  
  generalInfo: function() {
    return "[<%= @domain %>/<%= @server %>] [<%= @version %> <%= @sprint_name %>]";
  }
};

Debug.console = true;