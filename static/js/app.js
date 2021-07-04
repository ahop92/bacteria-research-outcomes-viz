//Creating unpack function to map data to index
function extractDemographics(row) {
  var outputArray = [];
  //Use D3 to make reference to demographic table and clear it before adding new information
  var demoWindow = d3.select("#sample-metadata");
  demoWindow.html("");

  //Iterate through JSON object input and populate demographic table in HTML
  Object.entries(row).forEach(([key, value]) => {
    outputArray.push(`${key.toUpperCase()}: ${value}`);
    demoWindow.append("p").text(`${key.toUpperCase()}: ${value}`);
  });

  // console.log(outputArray);
}
//Function to check user selected value against the IDs in the subject IDs array
function checkID(name) {
  // console.log(d3.select("#selDataset").property("value"));
  return name === d3.select("#selDataset").property("value");
}
//Function to populate the demographic info section of page
function populatePageIDs(idArray, userInput) {
  var idMenu = d3.select("#selDataset");
  idMenu.html("");
  idMenu.append("option").text(userInput);

  idArray.forEach((row) => {
    idMenu.append("option").text(row);
    // console.log(row);
  });
}

//Function to build bar chart with top ten samples
function buildBar(sampleVals, IDs, labels, userInput) {
  //Construct horizontal bar chart
  //Reference: https://plotly.com/javascript/hover-text-and-formatting/
  //Reference: https://plotly.com/javascript/horizontal-bar-charts/
  //Reference: https://community.plotly.com/t/flipping-horizontal-bar-chart-to-descending-order/15456

  var trace = {
    x: sampleVals,
    y: IDs,
    text: labels,
    orientation: "h",
    marker: {
      color: "rgb(215,180,243)",
    },
    type: "bar",
  };

  var data = [trace];

  var layout = {
    title: `Top 10 Bacteria Cultures for ${userInput}`,
    xaxis: {
      title: "Number of Samples",
    },
    yaxis: {
      autorange: "reversed",
      title: "ID",
    },
  };

  Plotly.newPlot("bar", data, layout);
}

//Function to build bubble chart with bacteria cultures per sample
//Reference: https://plotly.com/javascript/bubble-charts/
function buildBubble(sampleVals, IDs, labels, userInput) {
  var idColors = [];

  IDs.forEach((val) => {
    // console.log(val - 500);
    idColors.push(val - 500);
  });

  // console.log(idColors);

  var trace = {
    x: IDs,
    y: sampleVals,
    mode: "markers",
    marker: {
      size: sampleVals,
      color: idColors,
    },
    text: labels,
  };

  var data = [trace];

  var layout = {
    title: "Bacteria Cultures per Sample",
    xaxis: {
      title: "OTU ID",
    },
    yaxis: {
      title: "Number of Samples",
    },
  };

  Plotly.newPlot("bubble", data, layout);
}

//Function to build belly button washing frequency gauge for each ID
//Reference: https://plotly.com/javascript/gauge-charts/
//Reference: https://plotly.com/javascript/tick-formatting/
//Reference: https://github.com/plotly/plotly.js/issues/2929

function buildGuage(bbWashFreq) {
  console.log(bbWashFreq);

  var trace = {
    domain: { x: [0, 1], y: [0, 1] },
    value: bbWashFreq,
    title: { text: "Belly Button Washing Frequency"},
    type: "indicator",
    mode: "gauge+number",
    gauge: {
      axis: {
        range: [null, 9],
        tickwidth: 3,
        tickcolor: "black",
        tick0: 0,
        dtick: 1,
      },
      steps: [{range: [0,9],
              color: 'Teal'}],
      threshold: {
        line: { color: "purple", width: 8 },
        thickness: 0.75,
        value: bbWashFreq,
      },
    },
  };

  var data = [trace];

  var layout = {
    width: 600,
    height: 500,
    margin: { t: 0, b: 0 },
  };

  Plotly.newPlot("gauge", data, layout);
}

//Function to fetch JSON data
//Reference: https://www.w3schools.com/jsref/jsref_findindex.asp
var url = "../../samples.json";
function buildPage(subjectID) {
  d3.json(url).then(function (data) {
    console.log(data);

    var names = data.names;
    var metadata = data.metadata;
    var samples = data.samples;

    populatePageIDs(names, subjectID);

    console.log(names);
    console.log(metadata);
    console.log(samples);

    var sampleValues = [];
    var barotuIDs = [];
    var otuLabels = [];

    //Identifying the index of the user entered value in the names array to use in the corresponding samples and metadata arrays
    var userInputIndex = names.findIndex(checkID);
    // console.log(userInputIndex);

    //Get labels, hovertext, and values for bar chart
    for (var i = 0; i < 10; i++) {
      barotuIDs.push("OTU " + samples[userInputIndex].otu_ids[i]);
      otuLabels.push(samples[userInputIndex].otu_labels[i]);
      sampleValues.push(samples[userInputIndex].sample_values[i]);
    }

    // console.log(samples[userInputIndex].sample_values);
    // console.log(samples[userInputIndex].otu_ids);
    // console.log(samples[userInputIndex].otu_labels);

    //Call functions to build bar and bubble charts
    buildBar(sampleValues, barotuIDs, otuLabels, subjectID);
    buildBubble(
      samples[userInputIndex].sample_values,
      samples[userInputIndex].otu_ids,
      samples[userInputIndex].otu_labels,
      subjectID
    );
    buildGuage(metadata[userInputIndex].wfreq);

    //Call function to get demographic table data and populate the table in HTML according to the selected Subject ID
    extractDemographics(metadata[userInputIndex]);
    // console.log(metadata[userInputIndex]);
  });
}

//Establish functionality when Subject ID is changed
function optionChanged(userSelection) {
  console.log(userSelection);
  buildPage(userSelection);
}

//Initialize page with Subject ID 940 as default value
buildPage("940");
