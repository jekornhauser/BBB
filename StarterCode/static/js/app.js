function metadata(idnumber){
    d3.json("static/js/samples.json").then((data) => {
        panel = d3.select("#sample-metadata");
        panel.html("");
        var allmetadata = data.metadata;
        var idmetadata = allmetadata.filter(i  => i.id === parseInt(idnumber))[0];
        Object.entries(idmetadata).forEach(([key,value]) => {
            panel.append("div").text(key + ": " + value);
        })
    });
};

function buildTables(idnumber){
    d3.json("static/js/samples.json").then((data) => {
        var allsamples = data.samples;
        var idsample = allsamples.filter(i  => i.id === idnumber)[0];
        var samplevalues = idsample.sample_values;
        var otuids = idsample.otu_ids;
        var stringArray = otuids.map(a =>'OTU '+ a)
        var otulabels = idsample.otu_labels;        
        var x = samplevalues.slice(0,10).reverse();
        var y = stringArray.slice(0,10).reverse();
        var text = otulabels.slice(0,10).reverse();
        var barchartdata = [{
         x: x,
         y: y,
         text: text,
         type: "bar",
         orientation: "h"
        }];
        var barchartlayout = {
         title: "idsample",
         
        };
        Plotly.newPlot("bar",barchartdata, barchartlayout)

        var bubblechartdata = [{
         x: otuids,
         y: samplevalues,
         text: otulabels,
         mode: 'markers',
         marker: {
             color: otuids,
             size: samplevalues
         }
        }];
    var bubblechartlayout = {
            title: "OTU ID",
            height: 500,
            width: 1500
        };
    
        Plotly.newPlot("bubble",bubblechartdata, bubblechartlayout);
        

})
}


function optionChanged(value) {
    console.log(value);
    metadata(value);
    buildTables(value);
    // SOME CODE THAT ACTUALLY SELECTS THE DATA AND PLOTS IT
}

function init(){
    d3.json("static/js/samples.json").then(data => {
        var id_names = data.names;
        var dropdown = d3.select("#selDataset");
        id_names.forEach(id => {
            var option = dropdown.append("option");
            option.text(id);
            option.property("value", id);
        var firstidnumber = id_names[0];
        console.log(firstidnumber);
        metadata(firstidnumber);
        buildTables(firstidnumber);
        });
    });
    
}

init();