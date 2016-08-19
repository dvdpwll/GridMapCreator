'use strict';

const appVar = require('./app');

//general success
const success = (data) => {
  console.log(data);
};

//general failure
const failure = (error) => {
  console.error(error);
};

//success for sign in
const signInSuccess = (data) => {
  appVar.app.user = data.user;
  console.log(appVar);

  $('#save-map').show();
  $('#new-map').show();
  $('#clear-board').show();
  $('.dropdown-toggle').show();
  $('#sign-up').hide();
  $('#log-in').hide();
};

//success for sign out
const signOutSuccess = () => {
  delete appVar.app.user;
  console.log(appVar);

  $('#save-map').hide();
  $('#new-map').hide();
  $('#clear-board').hide();
  $('.dropdown-toggle').hide();
  $('#sign-up').show();
  $('#log-in').show();
};

//success for new element
const newElementSuccess = (data) => {
  let index = data.element.order;
  appVar.app.elements[index] = data.element.id;

  console.log(appVar.app.elements);
};

// //success for new map
// const newMapSuccess = (data) => {
//   appVar.app.map = data.map;
//   console.log(appVar);
// };




module.exports = {
  success,
  failure,
  signInSuccess,
  signOutSuccess,
  newElementSuccess,
  // newMapSuccess,
};
