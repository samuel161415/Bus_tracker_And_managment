// function degrees_to_radians(degrees)
// {
//   var pi = Math.PI;
//   return degrees * (pi/180);
// }
// // var x=degrees_to_radians(45);
// // console.log(x);
// // console.log(Math.sin(x));
// var latitude1=51.509865
// var longitude1=-0.118092
// var latitude2=53.483959
// var longitude2 = -2.244644
 
// var lat1=degrees_to_radians(latitude1)
// var lon1=degrees_to_radians(longitude1)
// var lat2=degrees_to_radians(latitude2)
// var lon2=degrees_to_radians(longitude2)
// var latDiff=lat2-lat1
// var lonDiff=lon2-lon1
// val=Math.pow(Math.sin(latDiff/2),2)+Math.cos(lat1)*Math.cos(lat2)*Math.pow(Math.sin(lonDiff),2)
// var resultInMile=3936*(2*Math.asin(Math.sqrt(val)))
// var resultInKm=6378.8*(2*Math.asin(Math.sqrt(val)))
// console.log("Result in Mile is :"+resultInMile);
// console.log("Result in Km is :"+resultInKm);

// /*$val = pow(sin($difflat/2),2)+cos($lati1)*cos($lati2)*pow(sin($difflong/2),2); 
              
//       $res1 =3936* (2 * asin(sqrt($val))); //for miles
//     $res2 =6378.8 * (2 * asin(sqrt($val)))*/ 

//     /* $res1 =3936* (2 * asin(sqrt($val))); //for miles
//     $res2 =6378.8 * (2 * asin(sqrt($val)))*/


    
function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

const D=require('./controller/distanceCalculator')

var latitude1=33.2433 
var longitude1=44.3456
var latitude2=33.22
var longitude2 = 55.66
var x=D(latitude1,longitude1,latitude2,longitude2,'M')
var y=D(latitude1,longitude1,latitude2,longitude2,'K')
console.log("Distance in Mile is : "+x);
console.log("Distance in Killometer is : "+y);


// 1051.793430661862