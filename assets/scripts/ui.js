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
  //save user info
  appVar.app.user = data.user;
  console.log(appVar);


  //hide/show certain buttons
  $('#save-map').show();
  $('#new-map').show();
  $('#clear-board').show();
  $('.dropdown-toggle').show();
  $('#sign-up').hide();
  $('#log-in').hide();
};

//success for sign out
const signOutSuccess = () => {
  //remove saved user info
  delete appVar.app.user;
  console.log(appVar);

  //hide/show certain buttons
  $('#save-map').hide();
  $('#new-map').hide();
  $('#clear-board').hide();
  $('.dropdown-toggle').hide();
  $('#sign-up').show();
  $('#log-in').show();
};

//success for new element
const newElementSuccess = (data) => {
  //get order number
  let index = data.element.order;

  //save the data.element id into app.elements array using order
  appVar.app.elements[index] = data.element.id;
  console.log(appVar.app.elements);
};

module.exports = {
  success,
  failure,
  signInSuccess,
  signOutSuccess,
  newElementSuccess,
  // newMapSuccess,
};
