google.charts.load('current', {'packages':['timeline']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var container = document.getElementById('timeline');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
    
    var options = {
	timeline: { rowLabelStyle: {fontName: 'Helvetica', fontSize: 12, color: '#603913' },
		    barLabelStyle: { fontName: 'Helvetica', fontSize: 12  }},
	chartArea:{width:"100%",height:"100%"}
    };
	    
    dataTable.addColumn({ type: 'string', id: 'Position' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    
    dataTable.addRows( [[ 'Lab Member', 'Today', new Date(), new Date() ]] );
    	
    $.getJSON( "timeline.json" )
	.done( function( data ) {
            database = data; //JSON.parse( data );
            // console.log( database );
	    	    
	    for ( person in database ) {
	     	for ( event in database[person]) {
	     	    var row = database[person][event];
			
	     	    row[1] = new Date( row[1] );
	     	    row[2] = new Date( row[2] );
		    
	    	    row.unshift( person );
	    	    console.log( row );
	     	    dataTable.addRows( [ row ] );
	     	}
	    }  
	    
	    chart.draw(dataTable, options );
	    
	    $('#timeline text:contains("Today")').attr('fill','#A6373C').prev().first().attr('height','100\%').attr('width','2px').attr('y','0');
	    
	})
	.fail(function( jqxhr, textStatus, error ) {
	    var err = textStatus + ", " + error;
	    console.log( "Request Failed: " + err );
	});
    
}
