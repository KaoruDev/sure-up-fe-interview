var api_key = '0517b5e67d212d2518cee9d6538d2890f80d8083';
function deleteVehicle(vid){  
  var request = $.ajax({
    url:'http://sureup-fe-api.herokuapp.com/vehicles/'+vid+'.json?api_key=' + api_key,
    type:'DELETE'
  });
  request.done(function(){
    $ ('#v_'+vid).remove();
  });     
}

function get_vehicle_list(){
  var request = $.ajax({
    url:'http://sureup-fe-api.herokuapp.com/vehicles.json?api_key=' + api_key,
    type:'GET'
  });
  request.done(function(vehicles){     
    for (var i = 0; i < vehicles.length; i++) {
      var temp = "<tr id='v_"+vehicles[i].id+"'><td>"+vehicles[i].nickname+"</td><td>"+vehicles[i].model+"</td><td>"+vehicles[i].make+"</td><td>"+vehicles[i].year+"</td><td>"+vehicles[i].user+"</td><td><button onclick='editVehicle"+vehicles[i].id+")'>edit</button><button onclick='deleteVehicle("+vehicles[i].id+")'>delete</button></td></tr>";  
      $('#vehicle_list').append(temp);
    }
  });

}
$(document).ready(function(){

  get_vehicle_list();
 
 

  $("#create_vehicle_form").submit(function(event) {
    event.preventDefault();
    var make = $('#make').val();
    var model = $('#model').val();
    var nickname = $('#nickname').val();
    var year = $('#year').val();

    var request = $.ajax({
        url:'http://sureup-fe-api.herokuapp.com/vehicles.json?api_key=' + api_key,
        type:'POST',
        data: {
              "vehicles": {
              "nickname": nickname, // Required
              "year": year,             // Required
              "make": make,           // Required
              "model": model,             // Required
          }
        }
    });
    request.done(function(vehicle){     
    
  var temp = "<tr id='v_"+vehicle.id+"'><td>"+vehicle.nickname+"</td><td>"+vehicle.user+"</td><td><button onclick='editVehicle("+vehicle.id+")'>edit</button>&nbsp;<button onclick='deleteVehicle("+vehicle.id+")'>delete</button></td></tr>";  
      $('#vehicle_list').append(temp);
    
  });
  

  });
});


