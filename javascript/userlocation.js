const API_URL_UPDATE_LOCATION = "http://172.18.69.192:4000/api/users/updateUserLocation";
const urlParams = new URLSearchParams(window.location.search);
const uuid = urlParams.get('uuid');


var reqcount = 0;
var details = el('details');

var options = {
    enableHighAccuracy: false,
    timeout: 1000,
    maximumAge: 0
};

navigator.geolocation.watchPosition(successCallback, errorCallback, options);
function successCallback(position) {
    const { accuracy, latitude, longitude, altitude, heading, speed } = position.coords;
    // Show a map centered at latitude / longitude.
    reqcount++;
    details.innerHTML = "Accuracy: " + accuracy + "<br>";
    details.innerHTML += "Latitude: " + latitude + " | Longitude: " + longitude + "<br>";
    details.innerHTML += "Altitude: " + altitude + "<br>";
    details.innerHTML += "Heading: " + heading + "<br>";
    details.innerHTML += "Speed: " + speed + "<br>";
    details.innerHTML += "reqcount: " + reqcount;
    updateUserLocation(uuid, latitude, longitude);
}

function errorCallback(error) {

}

function el(id) {
    return document.getElementById(id);
}

function updateUserLocation(id, newLaltitude, newLongitude) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {//Call a function when the state changes.
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
    xhr.open('POST', API_URL_UPDATE_LOCATION, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    var params = {
        id: id,
        latestLaltitude: newLaltitude,
        latestLongitude: newLongitude
    };
    let userStr = JSON.stringify(params);
    console.log(userStr);
    xhr.send(userStr);
}