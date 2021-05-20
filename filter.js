 window.onload= function() {
 launchNetwork("wheat_MFT_dormancy");
};

function launchNetwork(jsonFileName) {
	var graphData= jsonFileName +".json";
	console.log("dataset: "+ graphData);
    try {
	 jQuery.get(graphData, function( data ) {
		 var responseJson= data.graph;
		 eval(data.graph);
         console.log("graphJSON: "+ graphJSON);
         console.dir(graphJSON);
         console.log("allGraphData: "+ allGraphData);
         console.dir(allGraphData);
         responseJson= responseJson.replaceAll('\n','').replaceAll('\"','"').replaceAll('\\/','/');
         //responseJson= responseJson.replace('var graphJSON= ','"graphJSON":{"elements":').replace(']};',']},').replace('var allGraphData= ','');
         //responseJson= responseJson.substr(0,responseJson.length-1) +'}';
		 var resp_array= responseJson.split("};");
		 $('#contents').html(resp_array[0]);
		 $('#contents2').html(resp_array[1]);
		 var this_graph, this_graph_metadata, numNodes, numEdges;
         //console.log("graphJSON: "+ this_graph);
         //console.log("allGraphData: "+ this_graph_metadata);
         //console.log("nodes: "+ numNodes);
         //console.log("edges: "+ numEdges);
         //var resp_graph= responseJson.graphJSON.elements;
         //var resp_metadata= responseJson.graphJSON.ondexmetadata;
         //console.log("nodes: "+ resp_graph.numberOfConcepts);

		 //$('#contents2').html('<br>'+ responseJson);
        });
    }
    catch(err) {
          var errorMsg= err.stack+":"+err.name+":"+err.message;
          console.log(errorMsg);
         }
}

