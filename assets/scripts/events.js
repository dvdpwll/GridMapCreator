'use strict';
const api = require('./api');
const ui = require('./ui');

//global variables, add new variables when adding new images
let rockImg = '<img src="./assets/rock.png">';//change this if you change the img file for rock.
let treeImg = '<img src="./assets/tree.png">';//change this if you change the img file for tree.

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

//clear the board of all images
const onClearBoard = function () {
  $('.square').empty();
};

//place a thing
const onMap = function () {
  //get the selected thing
  let selected = $("input[name='thing']:checked").val();

  //switch statement to place an image of thing
  switch(selected) {
      case 'rock':
          $(this).empty();
          $(this).prepend(rockImg);
          break;
      case 'tree':
          $(this).empty();
          $(this).prepend(treeImg);
          break;
      default:
  }
};

const addHandlers = () => {
  $('#sign-up').on('click', onSignUp);
  $('#log-in').on('click', onLogIn);
  $('#log-out').on('click', onLogOut);
  $('#change-password').on('click', onChangePassword);
  $('#new-map').on('click', onNewMap);
  $('#clear-board').on('click', onClearBoard);
  $('#new-map').hide();
  $('#clear-board').hide();
  $('.dropdown-toggle').hide();
  $('#T00').on('click', onMap);
  $('#T01').on('click', onMap);
  $('#T02').on('click', onMap);
  $('#T03').on('click', onMap);
  $('#T04').on('click', onMap);
  $('#T05').on('click', onMap);
  $('#T06').on('click', onMap);
  $('#T07').on('click', onMap);
  $('#T08').on('click', onMap);
  $('#T09').on('click', onMap);
  $('#T10').on('click', onMap);
  $('#T11').on('click', onMap);
  $('#T12').on('click', onMap);
  $('#T13').on('click', onMap);
  $('#T14').on('click', onMap);
  $('#T15').on('click', onMap);
  $('#T16').on('click', onMap);
  $('#T17').on('click', onMap);
  $('#T18').on('click', onMap);
  $('#T19').on('click', onMap);
  $('#T20').on('click', onMap);
  $('#T21').on('click', onMap);
  $('#T22').on('click', onMap);
  $('#T23').on('click', onMap);
  $('#T24').on('click', onMap);
};

module.exports = {
  addHandlers,
};
