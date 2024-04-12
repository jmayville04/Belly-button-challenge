// Use the D3 library to read in samples.json 
// from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.
// Refs: Module 14/Day 3/Activity-01 (Mod14/3/Act-01)

// Use the D3 library to read in samples.json 
// from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.
// Refs: Module 14/Day 3/Activity-01 (Mod14/3/Act-01)

const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Initialize page with init function
function init() {
    // Use D3 to create the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Fetch data
    d3.json(url).then(data => {
        // Gather data id and store in dropdown
        data.names.forEach(id => {
            dropdownMenu.append("option").text(id).property("value", id);
        });

        // Set first sample from list as default
        let first_sample = data.names[0];

        // Call graph functions
        barchart(first_sample);
        bubblechart(first_sample);
        demoinfo(first_sample);

    });
}

// Create bar chart
function barchart(sample) {
    // Access data for bar chart
    d3.json(url).then(data => {
        let bar_data = data.samples;
        // Apply a filter that matches based on sample id
        let results = bar_data.filter(obj => obj.id == sample);
        // Store first sample in results filter
        let first_result = results[0];
        console.log(first_result);
        // Store first 10 sample results for the bar chart
        let top_10_results = first_result.sample_values.slice(0, 10).reverse();
        let otu_ids = first_result.otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`);
        let otu_labels = first_result.otu_labels.slice(0, 10).reverse();
        console.log(top_10_results);
        console.log(otu_ids);
        console.log(otu_labels);

        // Create trace for bar chart
        let bar_trace = {
            x: top_10_results,
            y: otu_ids,
            text: otu_labels,
            type: "bar",
            orientation: "h"
        };

        // Use Plotly to plot chart
        Plotly.newPlot("bar", [bar_trace]);
    });
};

// create bubble chart
function bubblechart (sample) {
       // Access data for bar chart
       d3.json(url).then(data => {
        let bubble_data = data.samples;
        // Apply a filter that matches based on sample id
        let results = bubble_data.filter(obj => obj.id == sample);
        // Store first sample in results filter
        let first_result = results[0];
        console.log(first_result);

        let all_results = first_result.sample_values;
        let otu_ids = first_result.otu_ids;
        let otu_labels = first_result.otu_labels;
     

         // Create trace for bar chart
        let bubble_trace = {
        x: otu_ids,
        y: all_results,
        text: otu_labels,
        mode: "markers",
        marker: {
            size: all_results,
            color: otu_ids,
            colorscale: "Earth"
        }
        };

        // Use Plotly to plot chart
        Plotly.newPlot("bubble", [bubble_trace]);
        });
}

function demoinfo(sample) {
    // Access data for bar chart
    d3.json(url).then(data => {
        let demo_data = data.metadata;
        // Apply a filter that matches based on sample id
        let results = demo_data.filter(obj => obj.id == sample);
        // Store first sample in results filter
        let first_result = results[0];

   
        d3.select("#sample-metadata").html("");
        
        // Add key and value info from the filtered sample data to the demographic info box
        Object.entries(first_result).forEach(([key, value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key.toUpperCase()}: ${value}`);
        });
    });
};

function optionChanged(choosen_sample){
    barchart(choosen_sample);
    bubblechart(choosen_sample);
    demoinfo(choosen_sample);
};

// Call the initialize function
init();





