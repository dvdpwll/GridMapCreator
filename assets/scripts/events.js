'use strict';
const api = require('./api');
const ui = require('./ui');

//global variables, add new variables when adding new images
let grassImg = '<img class="layer0" data-layer="0" data-thing="grass" src="./assets/grass.png">';//change this if you change the img file for grass.
let rocksImg = '<img class="layer0" data-layer="0" data-thing="rocks" src="./assets/rocks.png">';//change this if you change the img file for rocks.
let waterImg = '<img class="layer0" data-layer="0" data-thing="water" src="./assets/water.png">';//change this if you change the img file for water.
let water2Img = '<img class="layer0" data-layer="0" data-thing="water2" src="./assets/water2.png">';//change this if you change the img file for water2.
let rockImg = '<img class="layer1" data-layer="1" data-thing="rock" src="./assets/rock.png">';//change this if you change the img file for rock.
let treeImg = '<img class="layer1" data-layer="1" data-thing="tree" src="./assets/tree.png">';//change this if you change the img file for tree.
let treesImg = '<img class="layer1" data-layer="1" data-thing="trees" src="./assets/trees.png">';//change this if you change the img file for trees.

//-----------Functions-----------//
//show sign up modal
const onSignUp = function () {
  $('#sign-up-modal').modal('show');
};

//sign user in after sign up
const LogInAfterSignUp = function (email, password) {
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
};

//send sign up data
const onSignUpSubmit = function () {
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
    .done(LogInAfterSignUp(email, password))
    .fail(ui.failure);

  //clear text fields
  $('#sign-up-email').val('');
  $('#sign-up-password').val('');
  $('#sign-up-confirm-password').val('');

  //close modal
  $('#sign-up-modal').modal('hide');
};

//show login modal
const onLogIn = function () {
  $('#log-in-modal').modal('show');
};

//send log up data
const onLogInSubmit = function () {
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

  //clear text field
  $('#log-in-email').val('');
  $('#log-in-password').val('');

  //close modal
  $('#log-in-modal').modal('hide');
};

//user log out
const onLogOut = function () {
  api.signOut()
    .done(ui.signOutSuccess)
    .fail(ui.failure);
};

//show change password modal
const onChangePassword = function () {
  $('#change-password-modal').modal('show');
};

//show change password modal
const onChangePasswordSubmit = function () {
  //get text fields
  let oldPassword = $('#current-password').val();
  let NewPassword = $('#new-password').val();

  //put info in data object
  let data = {
    "passwords": {
      "old": oldPassword,
      "new": NewPassword,
    }
  };

  //send data to api
  api.changePassword(data)
    .done(ui.passwordSuccess)
    .fail(ui.passwordFailure);

  //clear text fields
  $('#current-password').val('');
  $('#new-password').val('');

  //close modal
  $('#change-password-modal').modal('hide');
};

//show new map modal
const onNewMap = function () {
  $('#new-map-modal').modal('show');
};

//clear the board of all images
const onClearBoard = function () {
  $('.square').empty();
};

//erase the grid
const eraseGrid = function () {
  $('.gameboard').empty();
};

//create new grid
const createGrid = function (l, h) {
  //create the rows of the grid
  for (let i = 0; i < h; i++) {
    $('.gameboard').append('<div class="row"></div>');
  }

  let num = 0;
  $('.row').each(function(){
    //create the columns of the grid in each row
    for (let i = 0; i < l; i++) {
      $(this).append(`<div id="T${num}" class="col-xs-1 square" data-square="${num}" data-image="0"></div>`);
      // $(this).append('<div id="T' + num + '" class="col-xs-1 square" data-square="' + num + '" data-image="0"></div>');
      num++;
    }
  });

  //change height of gameboard
  let varHeight = h * 50;
  $('.gameboard').css('height', varHeight + 'px');

  // center the gameboard by changeing the width
  let varLength = l * 50;
  $('.gameboard').css('max-width', varLength + 'px');
};

//place a thing
const onMap = function () {
  //get the selected thing
  let selected = $("input[name='thing']:checked").val();

  //check if there's an img already in the square
  let countImg = $(this).children().length;

  //switch statement to place an image of thing
  switch(selected) {
      case 'grass':
          //if there's no img, then just place a thing
          if (countImg === 0) {
              $(this).prepend(grassImg);
          }
          else {
              //check if img is the same layer
              //and if the current img is already there
              if ($(this).find('.layer0').data('thing') !== 'grass') {
                  //if the img is different, then remove that layer
                  $(this).find('.layer0').remove();

                  //add new image
                  $(this).prepend(grassImg);
              }
          }
          break;
      case 'rock':
          if (countImg === 0) {
              $(this).prepend(rockImg);
          }
          else {
              if ($(this).find('.layer1').data('thing') !== 'rock') {
                  $(this).find('.layer1').remove();
                  $(this).prepend(rockImg);
              }
          }
          break;
      case 'rocks':
          if (countImg === 0) {
              $(this).prepend(rocksImg);
          }
          else {
              if ($(this).find('.layer0').data('thing') !== 'rocks') {
                  $(this).find('.layer0').remove();
                  $(this).prepend(rocksImg);
              }
          }
          break;
      case 'tree':
          if (countImg === 0) {
              $(this).prepend(treeImg);
          }
          else {
              if ($(this).find('.layer1').data('thing') !== 'tree') {
                  $(this).find('.layer1').remove();
                  $(this).prepend(treeImg);
              }
          }
          break;
      case 'trees':
          if (countImg === 0) {
              $(this).prepend(treesImg);
          }
          else {
              if ($(this).find('.layer1').data('thing') !== 'trees') {
                  $(this).find('.layer1').remove();
                  $(this).prepend(treesImg);
              }
          }
          break;
      case 'water':
          if (countImg === 0) {
              $(this).prepend(waterImg);
          }
          else {
              if ($(this).find('.layer0').data('thing') !== 'water') {
                  $(this).find('.layer0').remove();
                  $(this).prepend(waterImg);
              }
          }
          break;
      case 'water2':
          if (countImg === 0) {
              $(this).prepend(water2Img);
          }
          else {
              if ($(this).find('.layer0').data('thing') !== 'water2') {
                  $(this).find('.layer0').remove();
                  $(this).prepend(water2Img);
              }
          }
          break;
      default:
          $(this).empty();
  }
};

//add grid handlers
const addGridHandlers = function () {
  $('.square').on('click', onMap);
};

//make new elements for new map
const newElements = function (data) {
  //save new map info
  api.appVar.app.map = data.map;

  //get map name and id and add to screen
  let name = api.appVar.app.map.name;
  let mapId = api.appVar.app.map.id;
  let length = api.appVar.app.map.length;
  let height = api.appVar.app.map.height;
  $('.mapName').empty();
  $('.mapName').append("<h1>" + mapId + ' : ' + name + "</h1>");

  //clear board
  onClearBoard();
  //remove grid
  eraseGrid();
  //create new grid
  createGrid(length, height);
  //make grid clickable
  addGridHandlers();

  //for each new element make a data with a 'thing' of none
  $('.square').each(function(){
    //get index of square
    let order = $(this).data('square');

    //put info in data
    let data = {
      "element": {
        "thing": 'none',
        "order": order,
        "map_id": mapId
      }
    };

    // send data to api, make an element for each square
    api.newElement(data)
      .done(ui.newElementSuccess)
      .fail(ui.failure);
  });
};

//on new map submit
const onNewMapSubmit = function () {
  //get text fields
  let name = $('#new-map-id').val();
  let length = $('#new-map-length').val();
  let height = $('#new-map-height').val();

  //min and max for length
  if (length > 12) {
    length = 12;
  }
  if (length < 2) {
    length = 2;
  }
  //min and max for height
  if (height > 12) {
    height = 12;
  }
  if (height < 2) {
    height = 2;
  }

  //put info in data
  let data = {
    "map": {
      "name": name,
      "length": length,
      "height": height,
      "user_id": api.appVar.app.user.id
    }
  };

  //send data to api
  api.newMap(data)
    .done(newElements)
    .fail(ui.failure);

  //clear text fields
  $('#new-map-id').val('');
  $('#new-map-length').val('');
  $('#new-map-height').val('');

  //close modal
  $('#new-map-modal').modal('hide');
};

//send save data
const sendSave = function (t, id, i) {
  //put info in data object
  let data = {
    "element": {
      "thing": t,
    }
  };

  //send data and data id to api
  api.saveElement(data, id)
    .done(ui.saveElementsSuccess(i))
    .fail(ui.failure);
};

//save current map
const onSaveMap = function () {
  //checks each square
  $('.square').each(function(){
    //get order number
    let order = $(this).data('square');

    //get id of element
    let id = api.appVar.app.elements[order];

    //extracts the data-thing value from the img
    let thing = $(this).children().data('thing');

    //if an image exists then send thing, if no img then send none
    if (thing) {
      sendSave(thing, id, order);
    }
    else {
      sendSave('none', id, order);
    }
  });
};

//display the maps in the all maps modal
const displayAllMaps = function (data) {
  //empty the body of the show all maps modal
  $('#show-all-maps-body').empty();

  //send data to handlebars
  let listMapsTemplate = require('./templates/listMaps.handlebars');
  $('#show-all-maps-body').html(listMapsTemplate({
    maps: data.maps,
  }));
};

//show modal for all user maps
const onSeeAllMaps = function () {
  //show the all maps modal
  $('#show-all-maps-modal').modal('show');

  //get all maps for user
  api.seeAllMaps()
    .done(displayAllMaps)
    .fail(ui.failure);
};

//display one map
const displayMap = function (data) {
  $('#show-all-maps-modal').modal('hide');

  //save map id
  api.appVar.app.map = data.elements[0].map;

  //save elements id for later save
  for (let i = 0; i < data.elements.length; i++) {
    let order = data.elements[i].order;
    api.appVar.app.elements[order] = data.elements[i].id;
    }

    //get map name and add to screen
    let name = api.appVar.app.map.name;
    let mapId = api.appVar.app.map.id;
    let length = api.appVar.app.map.length;
    let height = api.appVar.app.map.height;
    $('.mapName').empty();
    $('.mapName').append("<h1>" + mapId + ' : ' + name + "</h1>");

    //clear board
    onClearBoard();

    //remove grid
    eraseGrid();

    //create new grid
    createGrid(length, height);

    //make grid clickable
    addGridHandlers();

    //checks each square
    $('.square').each(function(){
      //get index of square
      let index = $(this).data('square');

      //loop through elements array
      for (let i = 0; i < data.elements.length; i++) {
        //if element order # is same as square index number insert img
        if (data.elements[i].order === index) {
          let thing = data.elements[i].thing;

          //switch statement to place an image of thing
          switch(thing) {
              case 'grass':
                  $(this).empty();
                  $(this).prepend(grassImg);
                  break;
              case 'rock':
                  $(this).empty();
                  $(this).prepend(rockImg);
                  break;
              case 'rocks':
                  $(this).empty();
                  $(this).prepend(rocksImg);
                  break;
              case 'tree':
                  $(this).empty();
                  $(this).prepend(treeImg);
                  break;
              case 'trees':
                  $(this).empty();
                  $(this).prepend(treesImg);
                  break;
              case 'water':
                  $(this).empty();
                  $(this).prepend(waterImg);
                  break;
              case 'water2':
                  $(this).empty();
                  $(this).prepend(water2Img);
                  break;
              default:
                  $(this).empty();
          }
        }
      }
  });
};

//when user clicks on a map from list all maps
const onSelectMap = function (event) {
  let target = $(event.target);
  let mapId = target.data('id');

  //get map by id
  api.seeElements(mapId)
    .done(displayMap)
    .fail(ui.failure);
};

//show rename map modal
const onChangeMapName = function () {
  $('#change-map-name-modal').modal('show');
};

//on change map name
const onChangeMapNameSubmit = function () {
  //get text field
  let name = $('#change-map-name-id').val();

  //get map id
  let id = api.appVar.app.map.id;

  //put info in data
  let data = {
    "map": {
      "name": name,
    }
  };

  //send data to api
  api.patchMapName(data, id)
    .done(ui.nameChangeSuccess(name))
    .fail(ui.failure);

  //clear text fields
  $('#change-map-name-id').val('');

  //close modal
  $('#change-map-name-modal').modal('hide');
};

//show load map modal
const onLoadMap = function () {
  $('#load-map-modal').modal('show');
};

//show load map modal
const onLoadMapSubmit = function () {
  //get text field
  let mapId = $('#load-map-id').val();

  //get map by id
  api.seeElements(mapId)
    .done(displayMap)
    .fail(ui.failure);

  //empty text field
  $('#load-map-id').val('');

  //close modal
  $('#load-map-modal').modal('hide');
};

// show confirm delete modal
const onDeleteMap = function () {
  $('#confirm-delete-modal').modal('show');
};

//delete the map after finished deleteing all elements
const deleteMap = function () {
  //get map id
  let mapId = api.appVar.app.map.id;

  //delete map by id
  api.delMap(mapId)
    .done(ui.deleteMapSuccess)
    .fail(ui.failure);

  //close modal
  $('#confirm-delete-modal').modal('hide');

  onClearBoard();
};


//delete elements of map id
const deleteElements = function (data) {
  //get map id
  let mapId = api.appVar.app.map.id;

  //delete all elements of a map
  for (let i = 0; i < data.elements.length; i++) {
    //get element id
    let elementId = data.elements[i].id;

    //if last element delete map, else continue to delete elements
    if (i === (data.elements.length - 1)) {
      api.deleteElement(mapId, elementId)
        .done(deleteMap)
        .fail(ui.failure);
    }
    else {
      api.deleteElement(mapId, elementId)
        .done(ui.success)
        .fail(ui.failure);
    }
  }
};

//on delete map submit
const onDeleteMapSubmit = function () {
  //get the mapId
  let mapId = api.appVar.app.map.id;

  //use map id to find all elements of a map
  if (mapId) {
    api.seeElements(mapId)
      .done(deleteElements)
      .fail(ui.failure);
  }
};

const addHandlers = () => {
  $('#sign-up').on('click', onSignUp);
  $('#sign-up-submit').on('click', onSignUpSubmit);
  $('#log-in').on('click', onLogIn);
  $('#log-in-submit').on('click', onLogInSubmit);
  $('#log-out').on('click', onLogOut);
  $('#change-password').on('click', onChangePassword);
  $('#change-password-submit').on('click', onChangePasswordSubmit);
  $('#new-map').on('click', onNewMap);
  $('#new-map-submit').on('click', onNewMapSubmit);
  $('#clear-board').on('click', onClearBoard);
  $('#save-map').on('click', onSaveMap);
  $('#see-all-maps').on('click', onSeeAllMaps);
  $('#show-all-maps-body').on('click', onSelectMap);
  $('#change-map-name').on('click', onChangeMapName);
  $('#change-map-name-submit').on('click', onChangeMapNameSubmit);
  $('#load-map').on('click', onLoadMap);
  $('#load-map-submit').on('click', onLoadMapSubmit);
  $('#delete-map').on('click', onDeleteMap);
  $('#confirm-delete-submit').on('click', onDeleteMapSubmit);

  //hide these buttons on startup
  $('#save-map').hide();
  $('#new-map').hide();
  $('#clear-board').hide();
  $('.dropdown-toggle').hide();
  addGridHandlers();
};

module.exports = {
  addHandlers,
};
