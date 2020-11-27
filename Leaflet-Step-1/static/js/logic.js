// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";



// Perform a GET request to the query URL
d3.json(queryUrl, function (data) {
    // Once we get a response, send the data.features object to the createMap function
    createMap(data.features);
});


function createMap(earthquakeData) {

    // Loop through locations and markers elements, add popups
    EarthquakeMarkers = earthquakeData.map((feature) =>

        L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            radius: magCheck(feature.properties.mag),
            stroke: true,
            color: 'black',
            opacity: 1,
            weight: 0.5,
            fill: true,
            fillColor: magColor(feature.properties.mag),
            fillOpacity: 0.9
        })
            .bindPopup("<h1> Magnitude : " + feature.properties.mag +
                "</h1><hr><h3>" + feature.properties.place +
                "</h3><hr><p>" + new Date(feature.properties.time) + "</p>")
    )

    // Add the earthquakes layer to a marker cluster group.
    var earthquakes = L.layerGroup(EarthquakeMarkers)

    var mags = earthquakeData.map((d) => magCheck(+d.properties.mag));

    // console.log(d3.extent(mags));
    // console.log(mags);
    // console.log(earthquakeData.properties.mag);


    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "streets-v11",
        accessToken: API_KEY
    });

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [
            7.559, -85.62
        ],
        zoom: 3.0,
        layers: [streetmap, earthquakes]
    });

    // Add a legend to the map
    var legend = L.control({ position: "bottomright" });
    labels = ['<strong>Magnitude</strong>'],
        legend.onAdd = function (myMap) {
            var div = L.DomUtil.create("div", "legend");

            div.innerHTML = [
                "<k class='maglt2'></k><span>0-2</span><br>",
                "<k class='maglt3'></k><span>2-3</span><br>",
                "<k class='maglt4'></k><span>3-4</span><br>",
                "<k class='maglt5'></k><span>4-5</span><br>",
                "<k class='maggt5'></k><span>5+</span><br>"
            ].join("");
            return div;
        }

    legend.addTo(myMap);

}
function magColor(mag) {
    var color = "";
    if (mag <= 2) { color = "#ffffb2"; }
    else if (mag <= 3) { color = "#fecc5c"; }
    else if (mag <= 4) { color = "#fd8d3c"; }
    else if (mag <= 5) { color = "#f03b20"; }
    else { color = "#bd0026"; }

    return color;

};
// Function to determine if the magnitude is zero or less (See above discussion as it is possible to have
// negative magnitudes, which obviously can't be used for setting the circleMarker radius)
function magCheck(mag) {
    if (mag <= 1) {
        return 8
    }
    return mag * 2;
}