"use strict";

/// (GLOBAL) Set which tab is currently selected
var selected_tab = 0;

var active_vehicles = [{
    kw: 11,
    reserved_day: "25.3.2019",
    reserved_hour: "14:00",
    booked_till_day: "25.3.2019",
    booked_till_hour: "15:00",
    vehicle_id: "WO705",
    vehicle_worker: "Uhl",
    vehicle_goal: "Diverse",
    worker_department: "RDMH",
    vehicle_number: 79500,
    has_navigation: true,
}];

function remove_classes() {
    document.getElementById("select_vehicles").classList.remove("active");
    document.getElementById("select_workers").classList.remove("active");
    document.getElementById("select_trip_calendar").classList.remove("active");

}

function select_vehicles_view() {
    selected_tab = 0;
    render_main_view();
    remove_classes();
    document.getElementById("select_vehicles").classList.add("active");
}

function select_workers_view() {
    selected_tab = 1;
    render_main_view();
    remove_classes();
    document.getElementById("select_workers").classList.add("active");
}

function select_trip_calendar_view() {
    selected_tab = 2;
    render_main_view();
    remove_classes();
    document.getElementById("select_trip_calendar").classList.add("active");
}

function render_main_view() {

    switch(selected_tab) {
      case 0:
        render_vehicle_view(document.getElementById("timetable"));
        break;
      case 1:
        render_worker_view(document.getElementById("timetable"));
        break;
      case 2:
        render_trip_calendar_view(document.getElementById("timetable"));
        break;
      default:
        render_vehicle_view(document.getElementById("timetable"));
        break;
    }
}

/// Returns the current registered vehicles for editing the workers as a DOM node
function render_vehicle_view(parent) {

    var header = "\
    <tr> \
        <th>KW</th> \
        <th>Reserviert am:</th> \
        <th>Reserviert bis:</th> \
        <th>Amtl. Kennzeichen</th> \
        <th>Mitarbeiter</th> \
        <th>Zielort</th> \
        <th>Abt.</th> \
        <th>Kst.</th> \
        <th>Navi?</th> \
        <th>Mängel</th> \
    </tr>";

    var content = "";

    for (var i = 0; i < active_vehicles.length; i++) {
        var vehicle = active_vehicles[i];
        content += ' \
        <tr> \
          <td style="width: 3%"><input type="number" value="' + vehicle.kw + '" class="input_number"></td> \
          <td style="width: 10%"> \
              <div class="date"> \
                  <input type="text" value="' + vehicle.reserved_day + '" class="input_date_day"> \
                  <input type="text" value="' + vehicle.reserved_hour + '" class="input_date_hour"> \
              </div> \
          </td> \
          <td style="width: 10%"> \
              <div class="date"> \
                  <input type="text" value="' + vehicle.booked_till_day + '" class="input_date_day"> \
                  <input type="text" value="' + vehicle.booked_till_hour + '" class="input_date_hour"> \
              </div> \
          </td> \
          <td style="width: 10%"><input type="text" value="' + vehicle.vehicle_id + '" class="input_vehicle"></td> \
          <td style="width: 10%"><input type="text" value="' + vehicle.vehicle_worker + '" class="input_worker"></td> \
          <td style="width: 10%"><input type="text" value="' + vehicle.vehicle_goal + '" class="input_goal"></td> \
          <td style="width: 10%"><input type="text" value="' + vehicle.worker_department + '" class="input_department"></td> \
          <td style="width: 10%"><input type="number" value="' + vehicle.vehicle_number + '" class="input_vehicle_id"></td> \
          <td style="width: 2%"><input type="checkbox" name="cb-r1" checked="' + vehicle.has_navigation + '" class="input_checkbox"/></td> \
          <td style="width: 10%"><input type="textarea" class="input_problems"></td> \
        </tr>';
    }

    parent.innerHTML = "<table>" + header + content + "</table>";
}

/// Returns the table for editing the workers as a DOM node
function render_worker_view(parent) {
    parent.innerHTML = "Platzhalter für eine Mitarbeiterliste, die dabei helfen soll, Mitarbeiter den Fahrzeugen zuzuordnen";
}

function render_trip_calendar_view(parent) {
    parent.innerHTML = "Platzhalter für einen Kalender, der angibt an welchen Tagen wieviele Fahrzeuge belegt sind und ob noch Fahrzeuge bestellt werden müssen";
}

document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    select_vehicles_view();
  }
};
