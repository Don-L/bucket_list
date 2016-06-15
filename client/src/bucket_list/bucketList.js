var BucketList = function() {
  this.countries = [];
}

BucketList.prototype = {
  addCountry: function(country) {
    this.countries.push(country);
  }
}




module.exports = BucketList;