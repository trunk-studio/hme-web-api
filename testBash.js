var execSync = require('child_process').execSync;

execSync('sudo date --set "25 Sep 2013 15:00:00"');
execSync('sudo /sbin/reboot');
