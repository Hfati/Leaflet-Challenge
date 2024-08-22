# Leaflet-Challenge
Leaflet Challenge: Earthquake Visualization
Overview
This project is part of a data visualization challenge aimed at helping the United States Geological Survey (USGS) better visualize and communicate their earthquake data. The goal is to create an interactive map using Leaflet.js that plots recent earthquake data from the USGS, allowing users to explore the information based on earthquake magnitude, depth, and location.Usage
This project visualizes earthquake data from the USGS using an interactive map. The map includes the following features:

Markers that represent earthquake locations, scaled by magnitude.
Marker colors that indicate the depth of the earthquake.
Popups with additional details such as location, magnitude, and depth.
A legend that helps interpret the depth colors.
Accessing Earthquake Data
The earthquake data is fetched from the USGS GeoJSON Feed, specifically the "All Earthquakes from the Past 7 Days" dataset. This data is updated regularly, providing the most recent earthquake events globally.

Map Interaction

Marker Size: Proportional to the earthquake's magnitude.
Marker Color: Reflects the depth of the earthquake, with a gradient from light green (shallow) to dark red (deep).
Popups: Display the location, magnitude, and depth when a marker is clicked.
