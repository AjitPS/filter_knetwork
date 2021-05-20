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
		 
         console.dir(graphJSON);
         console.dir(allGraphData);
		 console.log("numberOfConcepts= "+ allGraphData.ondexmetadata.numberOfConcepts);
		 if(allGraphData.ondexmetadata.numberOfConcepts > 10/*3000*/) {
			// filter out nodes/edges from graphJSON with conceptDisplay/relationDisplay:none, and keep their pid's to l;ater filter allGraphData
			// for each node in nodes, check conceptDisplay:none and if yes, delete the node, and if no, retain pid.
			// for each edge in in edges, check relationDisplay:none and yes, delete the edge and if no, retain pid.
		   }
		 
         //responseJson= responseJson.replaceAll('\n','').replaceAll('\"','"').replaceAll('\\/','/');
		 
         //responseJson= responseJson.replace('var graphJSON= ','"graphJSON":{"elements":').replace(']};',']},').replace('var allGraphData= ','');
         //responseJson= responseJson.substr(0,responseJson.length-1) +'}';
		 // display
		 var resp_array= responseJson.split("};");
		 resp_array[0]=resp_array[0]+'}';
		 $('#contents').html(resp_array[0]);
		 $('#contents2').html(resp_array[1]);
        });
    }
    catch(err) {
          var errorMsg= err.stack+":"+err.name+":"+err.message;
          console.log(errorMsg);
         }
}

