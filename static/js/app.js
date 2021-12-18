function Plots(id) {
    //Read samples.json
        d3.json("samples.json").then (data =>{
            console.log(data)
            let ids = data.samples[0].otu_ids;
            console.log(ids)
            let values =  data.samples[0].sample_values.slice(0,10).reverse();
            console.log(values)
            let labels =  data.samples[0].otu_labels.slice(0,10);
            console.log (labels)
        // get only top 10 otu ids for the plot OTU and reversing it. 
            let OTU_top = (data.samples[0].otu_ids.slice(0, 10)).reverse();
        // get the otu id's to the desired form for the plot
            let OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)
         // get the top 10 labels for the plot
            let labels1 = data.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            let trace = {
                x: values,
                y: OTU_id,
                text: labels1,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };
            // create data variable
            let barGraph = [trace];
    
            // create layout variable to set plots layout
            let layout = {
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
    
            // create the bar plot
        Plotly.newPlot("bar", barGraph, layout);
            // The bubble chart
            let trace1 = {
                x: data.samples[0].otu_ids,
                y: data.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: data.samples[0].sample_values,
                    color: data.samples[0].otu_ids
                },
                text: data.samples[0].otu_labels
    
            };
    
            // set the layout for the bubble plot
            let layout1 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
    
            // creating data variable 
            let bubbleGraph = [trace1];
    
        // create the bubble plot
        Plotly.newPlot("bubble", bubbleGraph, layout1); 
        
        });
    }  
    // function fopr demographics data
    function demographics(id) {
        d3.json("samples.json").then((data)=> {
    // get the metadata info for the demographic panel
            let metadata = data.metadata;
            console.log(metadata)
    
          // filter meta data info by id
           let result = metadata.filter(meta => meta.id.toString() === id)[0];
          // select demographic panel to put data
           let demographicInfo = d3.select("#sample-metadata");
            
         // empty the demographic info panel each time before getting new id info
           demographicInfo.html("");
    
         // grab the necessary demographic data data for the id and append the info to the panel
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toLowerCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // create the function for the change event

    function optionChanged(id) {
        Plots(id);
        demographics(id);
    }
    
    // create the function for the initial data rendering
    function init() {
        // select dropdown menu 
        var dropdown = d3.select("#selDataset");
    
        // read the data 
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            // get the id data to the dropdwown menu
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // call the functions to display the data and the plots to the page
            Plots(data.names[0]);
            demographics(data.names[0]);
        });
    }
    
    init();