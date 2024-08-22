// Create the map object with a center and zoom level.
var map = L.map("map").setView([20.0, 5.0], 2);

// Add different base maps for users to choose from.
var streetMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

var topoMap = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
});

var satelliteMap = L.tileLayer("https://{s}.sat.astro.com/{z}/{x}/{y}.png", {
  attribution: "© ASTRO contributors"
});

// URLs for the datasets
var earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var tectonicPlatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Fetch the earthquake data and plot it
d3.json(earthquakeURL).then(function(data) {
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.geometry.coordinates[2]),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  function getColor(depth) {
    switch (true) {
      case depth > 90:
        return "#ff0000";
      case depth > 70:
        return "#ff6600";
      case depth > 50:
        return "#ffcc00";
      case depth > 30:
        return "#ccff33";
      case depth > 10:
        return "#33ff33";
      default:
        return "#99ff99";
    }
  }

  function getRadius(magnitude) {
    return magnitude === 0 ? 1 : magnitude * 4;
  }

  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Depth: " + feature.geometry.coordinates[2] + "<br>Location: " + feature.properties.place);
    }
  }).addTo(earthquakesLayer);

  // Create a legend control
  var legend = L.control({position: "bottomright"});
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    var grades = [-10, 10, 30, 50, 70, 90];
    var colors = ["#99ff99", "#33ff33", "#ccff33", "#ffcc00", "#ff6600", "#ff0000"];

    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
    return div;
  };
  legend.addTo(map);
});

// Fetch the tectonic plates data and plot it
d3.json(tectonicPlatesURL).then(function(data) {
  L.geoJson(data, {
    color: "#ff6500",
    weight: 2
  }).addTo(tectonicPlatesLayer);
});

// Create layers for earthquakes and tectonic plates
var earthquakesLayer = L.layerGroup();
var tectonicPlatesLayer = L.layerGroup();

// Add layer control for the base maps and overlay layers
L.control.layers({
  "Street Map": streetMap,
  "Topographic Map": topoMap,
  "Satellite Map": satelliteMap
}, {
  "Earthquakes": earthquakesLayer,
  "Tectonic Plates": tectonicPlatesLayer
}).addTo(map);
