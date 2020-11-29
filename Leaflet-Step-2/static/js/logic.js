// store the USGS Earthquake API
var quakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// tectonic plate 
var platesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// perform Get request to the quake Url

d3.json(quakeUrl, function (data) {
    let earthquakeData = data.features
    d3.json(platesUrl, function (data) {
        let platesData = data.features

        createMap(earthquakeData, platesData)
    })
})

// Function to create Map
function createMap(earthquakeData, platesData) {

    // create Markers for each earthquake Data feature
    let earthquakeMarkers = earthquakeData.map((feature) =>
        L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            radius: magCheck(feature.properties.mag),
            stroke: true,
            color: 'black',
            opacity: 1,
            weight: 0.2,
            fill: true,
            fillColor: magColor(feature.properties.mag),
            fillOpacity: 0.9
        })
            .bindPopup("<h1> Magnitude : " + feature.properties.mag +
                "</h1><hr><h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>")
    )

    // create layerGroup for earthquakeMarkers
    let earthquakes = L.layerGroup(earthquakeMarkers);

    function makePolyline(feature, layer) {
        L.polyline(feature.geometry.coordinates);
    }

    let plates = L.geoJSON(platesData, {
        onEachFeature: makePolyline,
        style: {
            color: 'red',
            opacity: 0.8
        }
    })

    // Define streetmap, darkmap, satellite and outdoors layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "streets-v11",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "satellite-v9",
        accessToken: API_KEY
    });

    var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "outdoors-v11",
        accessToken: API_KEY
    });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap,
        "Satellite Map": satellite,
        "Outdoors Map": outdoors
    };

    // create overlay object to hold our overlay layer
    var overlayMaps = {
        Earthquakes: earthquakes,
        Plates: plates
    };

    // create the map, giving it the streetmap and earthquake layers to display on load
    var myMap = L.map("map", {
        center: [7.559, -95.62],
        zoom: 3.0,
        layers: [streetmap, earthquakes]
    });

    // add a legend to the map
    var legend = L.control({ position: "bottomright" });

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
    //Create a layer control
    //pass in the base maps and layer control
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
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
        return 6
    }
    return mag * 2;
}