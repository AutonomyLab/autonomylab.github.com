
function drawChart( divid, filename ) {

    // console.log( "filename:", filename )

    var container = document.getElementById( divid );
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    

    dataTable.addColumn({ type: 'string', id: 'Position' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    
    dataTable.addRows( [[ 'Project', 'Today', new Date(), new Date() ]] );
    	
    $.getJSON( filename )
	.done( function( database ) {
	    for ( person in database ) {
	     	for ( event in database[person]) {
	     	    var row = database[person][event];
			
	     	    row[1] = new Date( row[1] );
	     	    row[2] = new Date( row[2] );
		    
	    	    row.unshift( person );
	     	    dataTable.addRows( [ row ] );
	     	}
	    }  
	    

	    // resize container based on number of lines in table

	    //var height = dataTable.getNumberOfRows() * 100 + 30;
	    //$('#divid').attr( 'height', height );

	    // set a padding value to cover the height of title and axis values
	    // var paddingHeight = 40;
	    // // set the height to be covered by the rows
	    // var rowHeight = dataTable.getNumberOfRows() * 20;
	    // // set the total chart height
	    // var chartHeight = rowHeight + paddingHeight;

	    var options = {
		//timeline: { rowLabelStyle: {fontName: 'Helvetica', fontSize: 12, color: '#603913' },
		///	    barLabelStyle: { fontName: 'Helvetica', fontSize: 12  }},
		// chartArea:{width:'100%', height: chartHeight },
		//height: chartHeight
	    };
    
	    google.visualization.events.addListener(chart, 'ready', function() {
		console.log( "ready responder" );
		// svg elements don't have inner/outerHTML properties, so use the parents
		// el = container.getElementsByTagName('svg')[0].outerHTML;
		el = container.getElementsByTagName('svg')[0]; //.getBoundingClientRect();//[0].outerHTML;
		
		console.log( el );
		rect = el.getBoundingClientRect();
		console.log( rect.width );
		console.log( rect.height);
	    }); 
	    
	    chart.draw(dataTable, options );

	    // var el   = document.getElementById("yourElement"); // or other selector like querySelector()
	    //var rect = chart.getBoundingClientRect(); // get the bounding rectangle
	    

	    // $('#timeline text:contains("Today")').attr('fill','#A6373C').prev().first().attr('height','100\%').attr('width','2px').attr('y','0');
	    
	})
	.fail(function( jqxhr, textStatus, error ) {
	    var err = textStatus + ", " + error;
	    console.log( "Request Failed: " + err );
	});


    
}
