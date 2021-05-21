 window.onload= function() {
 launchNetwork("wheat_MFT_dormancy");
};

function launchNetwork(jsonFileName) {
	var graphData= jsonFileName +".json";
	//console.log("dataset: "+ graphData);
    try {
	 jQuery.get(graphData, function( data ) {
		 var responseJson= data.graph;
		 var resp_array= responseJson.split("};");
		 resp_array[0]=resp_array[0]+'}';
		 $('#contents').html(resp_array[0]);
		 $('#contents2').html(resp_array[1]);
		 
		 eval(data.graph);
		 console.log("original...");
         console.dir(graphJSON);
         console.dir(allGraphData);
		 
		 var graphjson2_nodes= [], graphjson2_edges=[], graphJSON2= {}; // 2 empty new jsonArrays and 1 jsonObject
		 var retained_ids= [];
		 console.log("numberOfConcepts= "+ allGraphData.ondexmetadata.numberOfConcepts);
		 if(allGraphData.ondexmetadata.numberOfConcepts > 10/*3000*/) {
			// filter out nodes/edges from graphJSON with conceptDisplay/relationDisplay:none, and keep their id's to later filter allGraphData too.
			// for each node in nodes, check conceptDisplay:none and if yes, delete the node, and if no, retain id.
			// for each edge in in edges, check relationDisplay:none and yes, delete the edge and if no, retain id.
			for(var i=0; i < graphJSON.nodes.length; i++) {
				 if(graphJSON.nodes[i].data.conceptDisplay === "element") {
					//console.log("node id= "+ graphJSON.nodes[i].data.id +", display: "+ graphJSON.nodes[i].data.conceptDisplay);
					graphjson2_nodes.push(graphJSON.nodes[i]); // insert node in new jsonArray
					retained_ids.push(graphJSON.nodes[i].data.id); // retain ID
				   } 
			   }
			for(var j=0; j < graphJSON.edges.length; j++) {
				 if(graphJSON.edges[j].data.relationDisplay === "element") {
					//console.log("edge id= "+ graphJSON.edges[j].data.id +", display: "+ graphJSON.edges[j].data.relationDisplay);
					graphjson2_edges.push(graphJSON.edges[j]); // insert edge in new jsonArray
					retained_ids.push(graphJSON.edges[j].data.id); // retain ID
				   } 
			    }
		    // make new graphJSON object with only visible nodes/edges.
			graphJSON2= {"nodes": graphjson2_nodes, "edges": graphjson2_edges };

			console.log("retained_ids to filter allGraphData: "+ retained_ids);
			
			// now filter metadata json (allGraphData).
			var allGraphData2= {}, omd= {}, agd2_nodes=[], agd2_edges= []; // 3 empty new jsonArrays and 1 jsonObject
			for(var k=0; k < allGraphData.ondexmetadata.concepts.length; k++) {
				if(retained_ids.includes(allGraphData.ondexmetadata.concepts[k].id)) {
				   // insert concept in new jsonArray
				   agd2_nodes.push(allGraphData.ondexmetadata.concepts[k]);
				  }
			   }
			for(var l=0; l < allGraphData.ondexmetadata.relations.length; l++) {
				if(retained_ids.includes(allGraphData.ondexmetadata.relations[l].id)) {
				   // insert relation in new jsonArray
				   agd2_edges.push(allGraphData.ondexmetadata.relations[l]);
				  }
			   }
		    // make new allGraphData object with only visible nodes/edges metadata.
			omd= {"graphName": allGraphData.ondexmetadata.graphName, "concepts": agd2_nodes, "relations": agd2_edges, "numberOfConcepts": allGraphData.ondexmetadata.numberOfConcepts, "numberOfRelations": allGraphData.ondexmetadata.numberOfRelations, "version": allGraphData.ondexmetadata.version };
			allGraphData2= {"ondexmetadata": omd};
			
			console.log("filtered...");
			console.dir(graphJSON2);
			console.dir(allGraphData2);
			// new filtered output knetwork blob
			var newblob= "var graphJSON= "+ JSON.stringify(graphJSON2) +";\n\n"+"var allGraphData= "+ JSON.stringify(allGraphData2) +";";
			console.log(newblob); // new json contents with nested JS vars
			var test= newblob.split("};");
			test[0]=test[0]+'}';
			$('#contents3').html(test[0]);
			$('#contents4').html(test[1]);
		   }
        });
    }
    catch(err) {
          var errorMsg= err.stack+":"+err.name+":"+err.message;
          console.log(errorMsg);
         }
}

