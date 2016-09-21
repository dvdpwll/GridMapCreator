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

  //change navbar brand to username
  $('.navbar-brand').empty();
  $('.navbar-brand').append(appVar.app.user.email);

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

  //change navbar brand to default
  $('.navbar-brand').empty();
  $('.navbar-brand').append('Map Maker');

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
};

//success for new element
const nameChangeSuccess = (name) => {
  $('.mapName').empty();
  $('.mapName').append("<h1>" + name + "</h1>");
};

//success for save elements
const saveElementsSuccess = (i) => {
  let last = appVar.app.elements.length;
  if (i === (--last)) {
    $('#messages-modal').modal('show');

    //empty the body and title of messages modal
    $('#messages-title').empty();
    $('#messages-body').empty();

    //add success to messages modal
    $('#messages-title').append("Success!");
    $('#messages-body').append("Map saved successfuly.");
  }
};

//success for spassword change
const passwordSuccess = () => {
    $('#messages-modal').modal('show');

    //empty the body and title of messages modal
    $('#messages-title').empty();
    $('#messages-body').empty();

    //add success to messages modal
    $('#messages-title').append("Success!");
    $('#messages-body').append("Password changed successfuly.");
};

//failure for password change
const passwordFailure = () => {
    $('#messages-modal').modal('show');

    //empty the body and title of messages modal
    $('#messages-title').empty();
    $('#messages-body').empty();

    //add success to messages modal
    $('#messages-title').append("Error!");
    $('#messages-body').append("Password not changed.");
};

//success for delete map
const deleteMapSuccess = () => {
  $('.mapName').empty();
  $('.mapName').append("<h1>Map Title</h1>");

  $('#messages-modal').modal('show');

  //empty the body and title of messages modal
  $('#messages-title').empty();
  $('#messages-body').empty();

  //add success to messages modal
  $('#messages-title').append("Success!");
  $('#messages-body').append("Map was deleted.");
};

module.exports = {
  success,
  failure,
  signInSuccess,
  signOutSuccess,
  newElementSuccess,
  nameChangeSuccess,
  saveElementsSuccess,
  passwordSuccess,
  passwordFailure,
  deleteMapSuccess,
};
