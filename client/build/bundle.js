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
	var BucketList = __webpack_require__(2);
	var Country = __webpack_require__(3)
	
	window.onload = function () {
	   var url = 'https://restcountries.eu/rest/v1';
	   var request = new XMLHttpRequest();
	   request.open("GET", url);
	   request.onload = function () {
	       if (request.status === 200) {
	          console.log('got the countries data');
	           var jsonString = request.responseText;
	           var countries = JSON.parse(jsonString);
	           getDatabaseCountries();
	           main(countries);
	       }
	   };
	   request.send();
	};
	   var main = function (countries) {
	   populateSelect(countries);
	   // var cached = localStorage.getItem("selectedCountry");
	   // var selected = countries[0];
	   // if(cached){
	   //     selected = JSON.parse(cached);
	   //     document.querySelector('#countries').selectedIndex = selected.index;
	   //     console.log(selected);
	   // }
	   updateDisplay(countries[0]);
	};
	
	  var getDatabaseCountries = function() {
	    var url = "http://localhost:3000/countries";
	    var request = new XMLHttpRequest(); 
	    var bucketList = new BucketList();
	    request.open("GET", url);
	    request.onload = function(){
	        if(request.status === 200) {
	          console.log("Got the data");
	          var countries = JSON.parse(request.responseText);
	        for(country of countries){
	          bucketList.addCountry(new Country(country));
	        }
	        displayBucketList(bucketList);
	        };
	        // updateDisplay(countries[0]);
	      }
	      request.send(null);
	  }
	
	  var displayBucketList = function(bucketList) {
	    var form = document.getElementById('form');
	    for (country of bucketList.countries) {
	      var countryName = document.createElement('h4');
	      countryName.innerText = country.name;
	      form.appendChild(countryName);
	    }
	  }
	
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
	       // var countryToSave = new Country(country);
	      saveToDatabase(country);
	       // saveToDatabase("selectedCountry",JSON.stringify(country));
	       console.log(country["name"], 'country');
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
	   // var input = document.createElement('input');
	   // form.appendChild(input);
	   // var button = document.createElement('button');
	   // button.innerText = 'Things to experience';
	   // form.appendChild(button);
	   // var deleteButton = document.createElement('button');
	   // deleteButton.innerText = 'Completed bucket list!';
	   // form.appendChild(deleteButton);
	   // button.onclick = function(e) {
	   //  e.preventDefault(); //fix this
	   //  var thingsToDo = document.createElement('p');
	   //  thingsToDo.innerText = input.value;
	   //  form.appendChild(thingsToDo);
	   // };
	};
	
	var saveToDatabase = function(country) {
	  var countryName = country["name"];
	  var countryToSave = new Country(country);
	  countryToSave.name = countryName;
	  var url = "http://localhost:3000/countries"
	  var request = new XMLHttpRequest();
	    request.open("POST", url);
	    request.setRequestHeader("Content-Type", "application/json");
	    request.onload = function() {
	      console.log("added a new country");
	    }
	    request.send(JSON.stringify(countryToSave));
	}
	
	
	
	
	
	
	


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


/***/ },
/* 2 */
/***/ function(module, exports) {

	var BucketList = function() {
	  this.countries = [];
	}
	
	BucketList.prototype = {
	  addCountry: function(country) {
	    this.countries.push(country);
	  }
	}
	
	
	
	
	module.exports = BucketList;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var Country = function(country) {
	  this.name = country.name;
	}
	
	
	module.exports = Country;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map