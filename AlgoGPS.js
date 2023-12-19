const positionsArray = [
    {id: 1, lat: 45.171112, lng: 5.695952},
    {id: 2, lat: 45.183152, lng: 5.699386},
    {id: 3, lat: 45.174115, lng: 5.711106},
    {id: 4, lat: 45.176123, lng: 5.722083},
    {id: 5, lat: 45.184301, lng: 5.719791},
    {id: 6, lat: 45.184252, lng: 5.730698},
    {id: 7, lat: 45.170588, lng: 5.716664},
    {id: 8, lat: 45.193702, lng: 5.691028},
    {id: 9, lat: 45.165641, lng: 5.739938},
    {id: 10, lat: 45.178718, lng: 5.744940},
    {id: 11, lat: 45.176857, lng: 5.762518},
    {id: 12, lat: 45.188512, lng: 5.767172},
    {id: 13, lat: 45.174017, lng: 5.706729},
    {id: 14, lat: 45.174458, lng: 5.687902},
    {id: 15, lat: 45.185110, lng: 5.733667},
    {id: 16, lat: 45.185702, lng: 5.734507},
    {id: 17, lat: 45.184726, lng: 5.734666},
    {id: 18, lat: 45.184438, lng: 5.733735},
    {id: 19, lat: 45.184902, lng: 5.735256},
    {id: 20, lat: 45.174812, lng: 5.698095},
    {id: 21, lat: 45.169851, lng: 5.695723},
    {id: 22, lat: 45.180943, lng: 5.698965},
    {id: 23, lat: 45.176205, lng: 5.692165},
    {id: 24, lat: 45.171244, lng: 5.689872}
]

let visitedArray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
let matrix = [];
let optimizedPathArray = [];
let shortestDistancesArray = [];

console.log(visitedArray);
console.log(positionsArray)
console.log("getDistance 0,1 : " + convertDistanceInKilometers(positionsArray[0], positionsArray[1]))
console.log("all Visited ? " + isAllVisited())
console.log(optimizedPathArray)
initMatrix();
getOptimizedPath()



function convertDistanceInKilometers(pos1, pos2) {
    const R = 6371e3;
    const lat1 = pos1.lat * Math.PI/180;
    const lat2 = pos2.lat * Math.PI/180;
    const deltaLat = (pos2.lat-pos1.lat) * Math.PI/180;
    const deltaLon = (pos2.lng-pos1.lng) * Math.PI/180;
    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let w = R * c / 1000;
    return w.toFixed(2);
}
// function getDistance(pos1, pos2) {
//     return Math.sqrt(Math.pow((pos1.x - pos2.x), 2) + Math.pow((pos1.lng - pos2.y), 2))
// }

function initMatrix() {
    for (let i = 0; i < positionsArray.length; i++) {
        matrix[i] = [];
        for (let j = 0; j < positionsArray.length; j++) {
            matrix[i][j] = convertDistanceInKilometers(positionsArray[i], positionsArray[j]);
        }
    }
    console.log(matrix)
}

function getSmallestDistance(index) {
    let minRange = 1000;
    let optimalPoint = 0;
    let indexMinRange = 0;
    visitedArray[index] = true;
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[index][i] < minRange && !visitedArray[i]) {
            minRange = matrix[index][i];
            optimalPoint = positionsArray[index];
            indexMinRange = i;
        }
    }
    optimizedPathArray.push(optimalPoint)
    shortestDistancesArray.push(matrix[index][indexMinRange]);
    return indexMinRange;
}

function isAllVisited() {
    for (let i = 0; i < positionsArray.length; i++) {
        if (visitedArray[i] === false) {
            return false
        }
    }
    return true
}


function getOptimizedPath(){
    while (shortestDistancesArray.length !== positionsArray.length){
        for (let i = 0; i < positionsArray.length ; i++){
            getSmallestDistance(i);
        }
    } console.log(shortestDistancesArray)
}

//--------------------------------AFFICHAGE-----------------------------------//
// Creating map options
let mapOptions = {
    center: positionsArray[0],
    zoom: 12
}

// Creating a map object
let map = new L.map('map', mapOptions);

// Creating a Layer object
let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

// Adding layer to the map
map.addLayer(layer);
// Adding the markers
for (i = 0; i < positionsArray.length; i++) {
    var marker = new L.Marker(positionsArray[i]);
    marker.addTo(map);
}

// Draw draw lines between point
let firstpolyline = new L.Polyline(positionsArray, {
    color: 'red',
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1
});
firstpolyline.addTo(map);

// let secondpolyline = new L.Polyline(optimizedPathArray, {
//     color: 'blue',
//     weight: 3,
//     opacity: 0.5,
//     smoothFactor: 1
// });
// secondpolyline.addTo(map);

