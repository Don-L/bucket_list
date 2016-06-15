/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(1);
	
	window.onload = function () {
	   var url = 'https://restcountries.eu/rest/v1';
	   var request = new XMLHttpRequest();
	   request.open("GET", url);
	   request.onload = function () {
	       if (request.status === 200) {
	          console.log('got the countries data');
	           var jsonString = request.responseText;
	           var countries = JSON.parse(jsonString);
	           main(countries);
	       }
	   };
	   request.send();
	};
	   var main = function (countries) {
	   populateSelect(countries);
	   var cached = localStorage.getItem("selectedCountry");
	   var selected = countries[0];
	   if(cached){
	       selected = JSON.parse(cached);
	       document.querySelector('#countries').selectedIndex = selected.index;
	       console.log(selected);
	   }
	   updateDisplay(selected);
	};
	   var populateSelect = function (countries) {
	   var parent = document.querySelector('#countries');
	   countries.forEach(function (item, index) {
	       item.index = index;
	       var option = document.createElement("option");
	       option.value = index.toString();
	       option.text = item.name;
	       parent.appendChild(option);
	   });
	   parent.style.display = 'block';
	   parent.addEventListener('change', function (e) {
	       var index = this.value;
	       var country = countries[index];
	       updateDisplay(country);
	       localStorage.setItem("selectedCountry",JSON.stringify(country));
	   });
	};
	   var updateDisplay = function (country) {
	   var center = {lat: country.latlng[0], lng: country.latlng[1]};
	   var map = new Map(center, 5);
	   var content = "Name: " + country.name + "<br>" + "Population: " + country.population;
	   map.addMarker(center);
	   map.addInfoWindow(center, content);
	   var form = document.getElementById('form');
	   var countryName = document.createElement('h4');
	   countryName.innerText = '';
	   countryName.innerText = country.name;
	   form.appendChild(countryName);
	   var input = document.createElement('input');
	   form.appendChild(input);
	   var button = document.createElement('button');
	   button.innerText = 'Things to experience';
	   form.appendChild(button);
	   var deleteButton = document.createElement('button');
	   deleteButton.innerText = 'Completed bucket list!';
	   form.appendChild(deleteButton);
	   button.onclick = function(e) {
	    e.preventDefault(); //fix this
	    var thingsToDo = document.createElement('p');
	    thingsToDo.innerText = input.value;
	    form.appendChild(thingsToDo);
	   };
	};
	
	
	
	
	
	
	


/***/ },
/* 1 */
/***/ function(module, exports) {

	
	var Map = function(latLng, zoom){
	 this.googleMap = new google.maps.Map(document.getElementById("map"), {
	   center: latLng,
	   zoom: zoom,
	   mapTypeId: google.maps.MapTypeId.HYBRID
	 });
	 this.addInfoWindow = function(latLng, title){
	   var marker = this.addMarker(latLng, title);
	   var infoWindow = new google.maps.InfoWindow({
	     content: title
	   });
	   marker.addListener("click", function(){
	     infoWindow.open(this.map, this);
	   });
	 };
	 this.addMarker = function(latLng, title){
	   var marker = new google.maps.Marker({
	     position: latLng,
	     map: this.googleMap,
	     title: title
	   });
	   return marker;
	 };
	 this.bindClick = function(){
	   google.maps.event.addListener(this.googleMap, "click", function(event){
	     var latLng = {lat: event.latLng.lat(), lng: event.latLng.lng() };
	     this.addMarker(latLng, "14");
	   }.bind(this));
	 };
	 this.resetCenter = function(latLng){
	   this.googleMap.setCenter(latLng);
	 };
	};
	
	
	
	module.exports = Map;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map