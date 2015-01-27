$(function () {
  showVehicles();

  $("#add-vehicle-form").on("submit", function(e) {
    e.preventDefault();

    var nick = $("#input-nickname").val();
    var year = $("#input-year").val();
    var make = $("#input-make").val();
    var model = $("#input-model").val();

    if(nick === "") {
      $("#group-nickname").addClass("has-error");
    }
    if(year === "") {
      $("#group-year").addClass("has-error");
    }
    if(make === "") {
      $("#group-make").addClass("has-error");
    }
    if(model === "") {
      $("#group-model").addClass("has-error");
    }
    
    createVehicle(nick, year, make, model, function (success, data) {
      if(!success) {
        showErrors(data);
      } else {
        showSuccess("Sucessfully added vehicle!");
        $("#input-nickname").val("");
        $("#group-nickname").removeClass("has-error");
        $("#input-year").val("");
        $("#group-year").removeClass("has-error");
        $("#input-make").val("");
        $("#group-make").removeClass("has-error");
        $("#input-model").val("");
        $("#group-model").removeClass("has-error");
        showVehicles();
      }
    });
  });
});

function showVehicles() {
  readVehicles(function (success, data) {
    if(!success) {
      showErrors(data);
    } else {
      // $("#vehicle-table").html('');
      for( var i = 0; i < data.length; i++) {
        var vehicle = data[i];
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
  console.log("Update Clicked: " + id);
  $("#vehicle-" + id).html('<td><input type="text" class="form-control" id="update-nickname-' + id + '" value="" /></td><td></td><td></td><td></td><td></td><td></td>')
}

function showSuccess(msg) {
  console.log("Success: " + msg);
  $("#alerts").append('<div class="alert alert-success" role="alert"><button type="button" class="close" aria-label="Close" onclick="removeError(this)"><span aria-hidden="true">&times;</span></button><strong>Success!</strong> ' + msg + '</div>');
}

function showErrors(errors) {
  for( var i = 0; i < errors['errors'].length; i++ ) {
    $("#alerts").append('<div class="alert alert-danger" role="alert"><button type="button" class="close" aria-label="Close" onclick="removeError(this)"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> ' + errors['errors'][i] + '</div>');
  }
}

function removeError(element) {
  $(element.parentElement).remove();
}