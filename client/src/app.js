var Map = require('./bucket_list/map.js');
var BucketList = require('./bucket_list/bucketList.js');
var Country = require('./bucket_list/country.js')

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







