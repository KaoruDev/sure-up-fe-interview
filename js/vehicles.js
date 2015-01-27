var API_KEY = "308f166278fef333a70c45e889e56c4cc2d23363"
var ROOT_URL = "http://sureup-fe-interview.herokuapp.com/"

function createVehicle(nickname, year, make, model, callback) {
  $.ajax({
    url: ROOT_URL + "vehicles.json?api_key=" + API_KEY,
    type: "POST",
    data: { "vehicles" : { "nickname": nickname, "year": year, "make": make, "model": model } }
  }).done(function (data, textStatus, jqXHR) {
    callback(true, data);
  }).fail(function (jqXHR, textStatus, errorThrown){
    if (jqXHR["status"] === 406)
      callback(false, JSON.parse(jqXHR["responseText"]));
  });
}

function readVehicles(callback) {
  $.ajax({
    url: ROOT_URL + "vehicles.json?api_key=" + API_KEY
  }).done(function (data, textStatus, jqXHR) {
    callback(true, data);
  }).fail(function (jqXHR, textStatus, errorThrown){
    if (jqXHR["status"] === 406)
      callback(false, JSON.parse(jqXHR["responseText"]));
  });
}

function updateVehicle(id, nickname, year, make, model, callback) {
  var data = {
    "vehicles": {
    }
  };

  if (nickname)
    data["vehicles"]["nickname"] = nickname;
  if (year)
    data["vehicles"]["year"] = year;
  if (make)
    data["vehicles"]["make"] = make;
  if (model)
    data["vehicles"]["model"] = model;

  $.ajax({
    url: ROOT_URL + "vehicles/" + id + ".json?api_key=" + API_KEY,
    type: "PUT",
    data: data
  }).done(function (data, textStatus, jqXHR) {
    callback(true, data);
  }).fail(function (jqXHR, textStatus, errorThrown){
    if (jqXHR["status"] === 406)
      callback(false, JSON.parse(jqXHR["responseText"]));
  });
}

function deleteVehicle(id, callback) {
  $.ajax({
    url: ROOT_URL + "vehicles/" + id + ".json?api_key=" + API_KEY,
    type: "DELETE"
  }).done(function (data, textStatus, jqXHR) {
    callback(true, data);
  }).fail(function (jqXHR, textStatus, errorThrown){
    if (jqXHR["status"] === 406)
      callback(false, JSON.parse(jqXHR["responseText"]));
  });
}