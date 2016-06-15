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
/***/ function(module, exports) {

	window.onload = function () {
	   var url = 'https://restcountries.eu/rest/v1';
	   var request = new XMLHttpRequest();
	   request.open("GET", url);
	   request.onload = function () {
	       if (request.status === 200) {
	          console.log('got the countries data');
	           var jsonString = request.responseText;
	           var countries = JSON.parse(jsonString);
	           // main(countries);
	       }
	   };
	   request.send();
	};
	   // var main = function (countries) {
	   // populateSelect(countries);
	   // var cached = localStorage.getItem("selectedCountry");
	   // var selected = countries[0];
	   // if(cached){
	   //     selected = JSON.parse(cached);
	   //     document.querySelector('#countries').selectedIndex = selected.index;
	   //     console.log(selected);
	   // }
	   // updateDisplay(selected);
	   // document.querySelector('#info').style.display = 'block';
	// };
	   // var populateSelect = function (countries) {
	   // var parent = document.querySelector('#countries');
	   // countries.forEach(function (item, index) {
	   //     item.index = index;
	   //     var option = document.createElement("option");
	   //     option.value = index.toString();
	   //     option.text = item.name;
	   //     parent.appendChild(option);
	   // });
	   // parent.style.display = 'block';
	   // parent.addEventListener('change', function (e) {
	   //     var index = this.value;
	   //     var country = countries[index];
	   //     updateDisplay(country);
	   //     localStorage.setItem("selectedCountry",JSON.stringify(country));
	   // });
	// };
	//    var updateDisplay = function (country) {
	//    var center = {lat: country.latlng[0], lng: country.latlng[1]};
	//    var map = new Map(center, 5);
	//    var content = "Name: " + country.name + "<br>" + "Population: " + country.population;
	//    map.addMarker(center);
	//    map.addInfoWindow(center, content);
	// };

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map