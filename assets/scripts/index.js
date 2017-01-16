'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');
const authEvents = require('./events.js');

// On document ready
$(() => {
  $('.no-fouc').removeClass('no-fouc');
  authEvents.addHandlers();
});
