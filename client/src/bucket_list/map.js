
// var Map = function(latLng, zoom){
//  this.googleMap = new google.maps.Map(document.getElementById("map"), {
//    center: latLng,
//    zoom: zoom,
//    mapTypeId: google.maps.MapTypeId.HYBRID
//  });
//  this.addInfoWindow = function(latLng, title){
//    var marker = this.addMarker(latLng, title);
//    var infoWindow = new google.maps.InfoWindow({
//      content: title
//    });
//    marker.addListener("click", function(){
//      infoWindow.open(this.map, this);
//    });
//  };
//  this.addMarker = function(latLng, title){
//    var marker = new google.maps.Marker({
//      position: latLng,
//      map: this.googleMap,
//      title: title
//    });
//    return marker;
//  };
//  this.bindClick = function(){
//    google.maps.event.addListener(this.googleMap, "click", function(event){
//      var latLng = {lat: event.latLng.lat(), lng: event.latLng.lng() };
//      this.addMarker(latLng, "14");
//    }.bind(this));
//  };
//  this.resetCenter = function(latLng){
//    this.googleMap.setCenter(latLng);
//  };
// };