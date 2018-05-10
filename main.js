var map;
var nyu = {
  lat: 40.7291,
  lng: -73.9965
};
//////////////////////////////////////////////////////////////// DATA FETCH
// Datasets (obligatory)
var nynames;
var nyshapes;
var nycrimes;
var nyhousing;
//Names
$.getJSON("https://data.cityofnewyork.us/api/geospatial/99bc-9p23?method=export&format=GeoJSON", function (data) {
  console.log(data);
  nynames = data;
});
// Shapes (Maps GeoJSON)
$.getJSON("https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson", function (data) {
  nyshapes = data;
});
// Crimes
//$.getJSON("https://data.cityofnewyork.us/resource/9s4h-37hy.json", {
//  $limit: 5000
//}, function (data) {
//  console.log(data);
//  nyhousing = data;
//});
// Housing
$.getJSON("https://data.cityofnewyork.us/resource/q3m4-ttp3.json", {
  $limit: 5000
}, function (data) {

  nyhousing = data;
});

//////////////////////////////////////////////////////////////// MAPS CONFIG
//Google Maps
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: nyu,
    zoom: 12
  });
  map.data.setStyle({
    strokeWeight: 1,
    fillOpacity: 1 / 16
  });
  // Subway
  //  var transitLayer = new google.maps.TransitLayer();
  //  transitLayer.setMap(map);

  var nyumarker = new google.maps.Marker({
    position: nyu,
    map: map,
    title: 'NYU STERN'
  });
};

//////////////////////////////////////////////////////////////// APP BEHAVIOR
//jQuery
$(function () {
  map.data.loadGeoJson("https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson");
  //map.data.loadGeoJson("https://data.cityofnewyork.us/api/geospatial/99bc-9p23?method=export&format=GeoJSON");

  $.each(nyhousing, function (i, v) {
    console.log(i + " : " + v);
  });
});
