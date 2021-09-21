# Bacteria Research Outcomes Visualizations

## Background 

Using a webpage developed with D3 and HTML, the purpose of this repository is to display the research outcomes from a study centered around the different bacteria cultures found the human belly button. The study was conducted on different subjects that span demographics associated with ethnicity, gender, age, location, belly botton type, and washing freqeuncy. The data for the study is contained in a samples.json file that is located within the data folder of this repository. 


## Visualizations and App Functionality
The overall page functionality can be broken down into two parts: 

1. index.html - homepage where the user can view all of the data visualizations that characterize the bacteria pool per subject ID in the study. For each ID, the following graph type, is shown: Top 10 Bacteria Cultures for Subject ID - Bar Chart, Belly Button Washing Frequency - Gauge Chart, Bacteria Cultures Per Sample - Bubble Chart, Demographic Information - General Table.

![image](https://raw.github.com/ahop92/bacteria-research-outcomes-viz/main/images/dashboard.PNG)

2. app.js - javascript containing all of the necessary functions for the page to respond to the user input mentioned above. The app is broken down in the following functions:

The app functionality can be broken down into the following categories: 

1. buildPage() - Function that is called to compile every chart and deploy it to index.html. Additionally, this function makes the d3.json function call to extract the data from the samples.json file for use in all of the other functions. Important note: the initial deployment of index.html defaults to subject ID 940. 

2. extractDemographics() - Function to pull the metadata about the subject ID and populate it to the demographic window on index.html. 

3. checkID() - function called to check user selected subject ID against the present list of IDs storied in samples.JSON. This function acts as a conditional check to identify the index of the user selected ID within samples.json. 

4. populatePageIDs() - function to pull the list of subject IDs from samples.json and populate the user dropdown menu with the numerical options. 

5. buildBar() - function to build bar chart with top ten samples of bacteria identified in study for a given subject ID.

6. buildBubble() - function to build the bubble chart that demonstrates all of the bacteria sammples collected for a given subject ID and demonstrated concentration of a given bacteria via bubble size. 

7. buildGuage() - function that pulls the weekly belly button washing frequency of a given subject ID and displays it in a gauge. 

8. optionChanged() - a function that manipulates the .this function and is called anytime the user changes the selected value for the subject ID. 
