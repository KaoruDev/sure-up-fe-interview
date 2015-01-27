var VGLOBAL = {};

$(function () {
  showVehicles();
  $("#add-vehicle-form").on("submit", addVehicle);
});

function addVehicle(e) {
  e.preventDefault();

  var nick = $("#input-nickname").val();
  var year = $("#input-year").val();
  var make = $("#input-make").val();
  var model = $("#input-model").val();

  if(nick === "") {
    $("#group-nickname").addClass("has-error");
    $("#group-nickname").addClass("has-feedback");
    $("#group-nickname").append('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
  }
  if(year === "") {
    $("#group-year").addClass("has-error");
    $("#group-year").addClass("has-feedback");
    $("#group-year").append('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
  }
  if(make === "") {
    $("#group-make").addClass("has-error");
    $("#group-make").addClass("has-feedback");
    $("#group-make").append('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
  }
  if(model === "") {
    $("#group-model").addClass("has-error");
    $("#group-model").addClass("has-feedback");
    $("#group-model").append('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
  }
  
  createVehicle(nick, year, make, model, function (success, data) {
    if(!success) {
      showErrors(data);
    } else {
      showSuccess("Sucessfully added vehicle!");
      clearAdd();
      showVehicles();
    }
  });
}

function clearAdd() {
  $("#input-nickname").val("");
  $("#group-nickname").removeClass("has-error");
  $("#group-nickname").removeClass("has-feedback");
  $("#group-nickname .form-control-feedback").remove();
  $("#input-year").val("");
  $("#group-year").removeClass("has-error");
  $("#group-year").removeClass("has-feedback");
  $("#group-year .form-control-feedback").remove();
  $("#input-make").val("");
  $("#group-make").removeClass("has-error");
  $("#group-make").removeClass("has-feedback");
  $("#group-make .form-control-feedback").remove();
  $("#input-model").val("");
  $("#group-model").removeClass("has-error");
  $("#group-model").removeClass("has-feedback");
  $("#group-model .form-control-feedback").remove();
}

function showVehicles() {
  readVehicles(function (success, data) {
    if(!success) {
      showErrors(data);
    } else {
      $("#vehicle-table").html('<tr class="info"><form id="add-vehicle-form"></form><td><div class="form-group" id="group-nickname"><input type="text" class="form-control" id="input-nickname" name="nickname" placeholder="Nickname" form="add-vehicle-form" /></div></td><td><div class="form-group" id="group-year"><input type="text" class="form-control" id="input-year" name="year" placeholder="Year" form="add-vehicle-form" /></div></td><td><div class="form-group" id="group-make"><input type="text" class="form-control" id="input-make" name="make" placeholder="Make" form="add-vehicle-form" /></div></td><td><div class="form-group" id="group-model"><input type="text" class="form-control" id="input-model" name="model" placeholder="Model" form="add-vehicle-form" /></div></td><td><button type="submit" class="btn btn-primary" form="add-vehicle-form"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></span> Add</button></td><td><button type="button" class="btn btn-danger" onclick="clearAdd()" ><span class="glyphicon glyphicon-remove" aria-hidden="true" ></span></span> Clear</button></td></tr>');
      $("#add-vehicle-form").on("submit", addVehicle);
      VGLOBAL = {}
      for( var i = 0; i < data.length; i++) {
        var vehicle = data[i];
        VGLOBAL[vehicle["id"]] = vehicle;
        $("#vehicle-table").append('<tr id="vehicle-' + vehicle["id"] + '"><td>' + vehicle["nickname"] + '</td><td>' + vehicle["year"] + '</td><td>' + vehicle["make"] + '</td><td>' + vehicle["model"] + '</td><td><button type="button" class="btn btn-primary" onclick="updateTableVehicle(' + vehicle["id"] + ')" ><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></span> Update</button></td><td><button type="button" class="btn btn-danger" onclick="deleteTableVehicle(' + vehicle["id"] + ')" ><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></span> Delete</button></td></tr>');
      }
    }
  });
}

function deleteTableVehicle(id) {
  deleteVehicle(id, function (success, data) {
    if(!success) {
      showErrors(data);
    } else {
      showSuccess("Sucessfully deleted vehicle!");
      showVehicles();
    }
  });
}

function updateTableVehicle(id) {
  var vehicle = VGLOBAL[id];
  $("#vehicle-" + id).addClass("warning");
  $("#vehicle-" + id).html('<form id="update-vehicle-form-' + id + '"></form><td><div class="form-group" id="group-nickname-update-' + id + '"><input type="text" class="form-control" id="update-nickname-' + id + '" name="nickname" placeholder="Nickname" value="' + vehicle["nickname"] + '" form="update-vehicle-form-' + id + '" /></div></td><td><div class="form-group" id="group-year-update-' + id + '"><input type="text" class="form-control" id="update-year-' + id + '" name="year" placeholder="Year" value="' + vehicle["year"] + '" form="update-vehicle-form-' + id + '" /></div></td><td><div class="form-group" id="group-make-update-' + id + '"><input type="text" class="form-control" id="update-make-' + id + '" name="make" placeholder="Make" value="' + vehicle["make"] + '" form="update-vehicle-form-' + id + '" /></div></td><td><div class="form-group" id="group-model-update-' + id + '"><input type="text" class="form-control" id="update-model-' + id + '" name="model" placeholder="Model" value="' + vehicle["model"] + '" form="update-vehicle-form-' + id + '" /></div></td><td><button type="submit" class="btn btn-primary" form="update-vehicle-form-' + id + '"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></span> Update</button></td><td><button type="button" class="btn btn-danger" onclick="cancelUpdate(' + id + ')"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></span> Cancel</button></td>');
  $("#update-vehicle-form-" + id).on("submit", function (e) {
    e.preventDefault();
    doUpdate(id);
  });
}

function cancelUpdate(id) {
  var vehicle = VGLOBAL[id];
  $("#vehicle-" + id).removeClass("warning");
  $("#vehicle-" + id).html('<td>' + vehicle["nickname"] + '</td><td>' + vehicle["year"] + '</td><td>' + vehicle["make"] + '</td><td>' + vehicle["model"] + '</td><td><button type="button" class="btn btn-primary" onclick="updateTableVehicle(' + vehicle["id"] + ')" ><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></span> Update</button></td><td><button type="button" class="btn btn-danger" onclick="deleteTableVehicle(' + vehicle["id"] + ')" ><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></span> Delete</button></td>');
}

function doUpdate(id) {
  var nick = $("#update-nickname-" + id).val();
  var year = $("#update-year-" + id).val();
  var make = $("#update-make-" + id).val();
  var model = $("#update-model-" + id).val();

  updateVehicle(id, nick, year, make, model, function (success, data) {
    if(!success) {
      showErrors(data);
    } else {
      showSuccess("Sucessfully updated vehicle!");
      showVehicles();
    }
  });
}

function showSuccess(msg) {
  var alert = $('<div class="alert alert-success" role="alert"><button type="button" class="close" aria-label="Close" onclick="removeError(this)"><span aria-hidden="true">&times;</span></button><strong>Success!</strong> ' + msg + '</div>')
  $("#alerts").append(alert);
  setTimeout(function () {
    alert.remove();
  }, 5*1000);
}

function showErrors(errors) {
  var al = '<div class="alert alert-danger" role="alert"><button type="button" class="close" aria-label="Close" onclick="removeError(this)"><span aria-hidden="true">&times;</span></button><strong>Error!</strong></ br><ul>';
  for( var i = 0; i < errors['errors'].length; i++ ) {
    al += "<li>" + errors['errors'][i] + "</li>";
  }
  al += "</ul></div>";
  var alert = $(al);
  $("#alerts").append(alert);
  setTimeout(function () {
    alert.remove();
  }, 10*1000);
}

function removeError(element) {
  $(element.parentElement).remove();
}