function getPlots(id) {
    //Read samples.json
        d3.json("samples.json").then (sampledata =>{
            console.log(sampledata)
            var ids = sampledata.samples[0].otu_ids;
            console.log(ids)
            var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
            console.log(sampleValues)
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log (labels) 
        // reduce to top 10 otu ids for the plot OTU and reversing it. 
            var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        // format the otu id's for the plot
            var OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)
         // get top 10 labels for the plot
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };  
         // create data variable
            var data = [trace];
        // create layout variable to set chart layout
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
        };
     // create the bar chart
        Plotly.newPlot("bar", data, layout);

    // create bubble chart
    var trace1 = {
        x: sampledata.samples[0].otu_ids,
        y: sampledata.samples[0].sample_values,
        mode: "markers",
        marker: {
            size: sampledata.samples[0].sample_values,
            color: sampledata.samples[0].otu_ids
        },
        text:  sampledata.samples[0].otu_labels

        };
    // set the layout for the bubble chart
        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
        
    // creating data variable 
        var data1 = [trace1];

    // plot the bubble chart
        Plotly.newPlot("bubble", data1, layout_2); 

    });
}  
// function to pull in data
function getDemoInfo(id) {
    // read the json file to get data
        d3.json("samples.json").then((data)=> {
    // get metadata info for the demographic panel
            var metadata = data.metadata;
    
            console.log(metadata)

        // filter metadata info by id
            var result = metadata.filter(meta => meta.id.toString() === id)[0];
        // select the demographic panel to output data
            var demographicInfo = d3.select("#sample-metadata");
        // delete the demographic info panel to update with new id
            demographicInfo.html("");