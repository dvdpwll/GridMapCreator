'use strict';
const api = require('./api');
const ui = require('./ui');

//global variables


//user sign up
const onSignUp = function () {
  $('#sign-up-modal').modal('show');
  $('#sign-up-submit').on('click',function(){
    //get text fields
    let email = $('#sign-up-email').val();
    let password = $('#sign-up-password').val();
    let password_confirmation = $('#sign-up-confirm-password').val();

    //put information into data object
    let data = {
      "credentials": {
        "email": email,
        "password": password,
        "password_confirmation": password_confirmation
      }
    };

    //send data to api
    api.signUp(data)
      .done(ui.success)
      .fail(ui.failure);

    //close modal
    $('#sign-up-modal').modal('hide');
  });
};

//user log in
const onLogIn = function () {
  $('#log-in-modal').modal('show');
  $('#log-in-submit').on('click',function(){
    //get text fields
    let email = $('#log-in-email').val();
    let password = $('#log-in-password').val();

    //put information into data object
    let data = {
      "credentials": {
        "email": email,
        "password": password,
      }
    };

    //send data to api
    api.logIn(data)
      .done(ui.signInSuccess)
      .fail(ui.failure);

    //close modal
    $('#log-in-modal').modal('hide');
  });
};

//user log out
const onLogOut = function () {
  api.signOut()
    .done(ui.signOutSuccess)
    .fail(ui.failure);
};

//user changes password
const onChangePassword = function () {
  $('#change-password-modal').modal('show');
  $('#change-password-submit').on('click',function(){
    //get text fields
    let oldPassword = $('#current-password').val();
    let NewPassword = $('#new-password').val();

    let data = {
      "passwords": {
        "old": oldPassword,
        "new": NewPassword,
      }
    };

    //send data to api
    api.changePassword(data)
      .done(ui.success)
      .fail(ui.failure);

    //close modal
    $('#change-password-modal').modal('hide');
  });
};

//make a new map
const onNewMap = function () {
  let data = {
    "map": {
      "name": 'NewMap Test',
    }
  };
  api.newMap(data)
    .done(ui.newMapSuccess)
    .fail(ui.failure);
};

//place a thing
const onMap = function () {
  console.log('Map was clicked');
  let test = $("input[type='radio'][name='thing']:checked").val();
  console.log(test);



  // $("input[type='radio'][name='rate']:che‌​cked").val();
};

const addHandlers = () => {
  $('#sign-up').on('click', onSignUp);
  $('#log-in').on('click', onLogIn);
  $('#log-out').on('click', onLogOut);
  $('#change-password').on('click', onChangePassword);
  $('#new-map').on('click', onNewMap);
  $('#new-map').hide();
  $('#clear-board').hide();
  $('.dropdown-toggle').hide();
  $('#T00').on('click', onMap);
};

module.exports = {
  addHandlers,
};
