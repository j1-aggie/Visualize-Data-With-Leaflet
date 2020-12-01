# Leaflet Homework - Visualizing Data with Leaflet

## Background

The United States Geological Survey, or USGS for short, has hired me! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, I will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collected a massive amount of data from all over the world each day, but lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.

### Before I Began

1. Created a new repository for this project called `leaflet-challenge`. 

2. Cloned the new repository to my computer.

3. Created a directory for the Leaflet challenge. Used the folder names to correspond to the challenges: **Leaflet-Step-1** and **Leaflet-Step-2**.

4. This homeworks utilizes both **html** and **Javascript** so I added all the necessary files. These are the main files to run for analysis.

5. All files along with regular commits have been pushed to GitHub.

## The Task

### Level 1: Basic Visualization



The first task was to visualize an earthquake data set.

1. **Get your data set**

![3-Data](https://user-images.githubusercontent.com/66078772/100487184-fc57b480-30cc-11eb-87c3-7d1ea98af440.png)   

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick a data set to visualize. When you click on a data set, for example 'All Earthquakes from the Past 7 Days', you will be given a JSON representation of that data. You will be using the URL of this JSON to pull in the data for our visualization.  I used the URL for the past 30 days. 

   ![4-JSON](https://user-images.githubusercontent.com/66078772/100487153-d7634180-30cc-11eb-8774-c908326f060e.png)

2. **Import & Visualize the Data**
![map](https://user-images.githubusercontent.com/66078772/100487321-8e5fbd00-30cd-11eb-9a1b-935e3017cc9a.PNG)
   Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

   * Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.

   * **HINT** the depth of the earth can be found as the third coordinate for each earthquake.

   * Include popups that provide additional information about the earthquake when a marker is clicked.

   * Create a legend that will provide context for your map data.

   * Your visualization should look something like the map above.

- - -

### Level 2: More Data (Optional)

![Dark Map with plates](https://user-images.githubusercontent.com/66078772/100487403-08904180-30ce-11eb-94c9-faec97bf4feb.PNG)


The USGS asked me to plot a second data set on my map to illustrate the relationship between tectonic plates and seismic activity. I pulled in a second data set and visualized it along side my original set of data. The data that I used on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

In this step I ..

* Plotted a second data set on our map.

* Added a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.  My additional layers are the dark, satellite, street, and outdoor layers.  Additionally, I added the plate boundaries and seismec activity layers to the street maps.  Upon opening of my maps, the street base map along with the seismic markers appear. 

* Added layer controls to my map.

- - -

### Assessment

My final product will be assessed on the following metrics:

* Completion of assigned tasks

* Visual appearance

* Professionalism

* Ensured my repository has regular commits (i.e. 20+ commits) and a thorough README.md file


