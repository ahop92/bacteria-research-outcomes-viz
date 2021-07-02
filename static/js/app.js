//Creating unpack function to map data to index
function unpack(rows, index) {
  return rows.map(function (row) {
    return row[index];
  });
}

function checkID(name){

    // console.log(d3.select("#selDataset").property("value"));
    return name === d3.select("#selDataset").property("value");

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

    console.log(names);
    console.log(metadata);
    console.log(samples);

    var sampleValues = [];
    var otuIDs = [];
    var otuLabels = [];
    var userInputIndex = names.findIndex(checkID);
    // console.log(userInputIndex);

    //Get labels, hovertext, and values for bar chart 
    for(var i = 0; i < 10; i++){

     otuIDs.push(samples[userInputIndex].otu_ids[i]);
     otuLabels.push(samples[userInputIndex].otu_labels[i]);
     sampleValues.push(samples[userInputIndex].sample_values[i]);

    };

    // console.log(otuIDs);
    // console.log(otuLabels);
    // console.log(sampleValues);

   


  //Get the demographic table data

  var age = metadata[userInputIndex].age;
  var bbtype = metadata[userInputIndex].bbtype;
  var ethnicity = metadata[userInputIndex].ethnicity;
  var gender = metadata[userInputIndex].gender;
  var id = metadata[userInputIndex].id;
  var location = metadata[userInputIndex].location;
  var wfreq = metadata[userInputIndex].wfreq; 

    // console.log(age);
    // console.log(bbtype);
    // console.log(ethnicity);
    // console.log(gender);
    // console.log(id);
    // console.log(location);
    // console.log(wfreq);
  
  });

}


function optionChanged(userSelection){

  console.log(userSelection);
  buildPage(userSelection);

}