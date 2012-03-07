var footerY;
var offLeft;


$(document).ready(function()
{
	//Handle BlackBerry focus
	$('.field').attr('onmouseover', 'addHighlight(this);');
	$('.field').attr('onmouseout', 'removeHighlight(this);');
	
	$('.button').attr('onmouseover', 'addHighlight(this);');
	$('.button').attr('onmouseout', 'removeHighlight(this);');
	
	$('a').attr('onmouseover', 'addHighlight(this);');
	$('a').attr('onmouseout', 'removeHighlight(this);');
	
	$('.list li').attr('x-blackberry-focusable', 'true');
	$('.list li').attr('onmouseover', 'addHighlight(this);');
	$('.list li').attr('onmouseout', 'removeHighlight(this);');
	
	//Init scrolling if we're on the dashboard
	if ($('#dashboard').length>0)
		initScrolling('#dashboard', '.home.button');
	else if ($('#dashboard_card').length>0)
		initScrolling('#dashboard_card', '.button.standard');
	
	//Setup Hint Texts
	$('input').example(function() {
		return $(this).attr('title')
	});
	
	StackMob.init({
		appName: 'gtbankdemo',
		dev: true
	});
	
	//Initialize push notifications (always keep this last in case it fails)
	subscribe();
});

function addHighlight(target)
{
	$(target).addClass('highlight');
}

function removeHighlight(target)
{
	$(target).removeClass('highlight');
}

function getClosestBranches()
{
	var url = "http://vansogeo.cartodb.com/api/v1/sql?q=select ST_X(ST_Centroid(the_geom)) as longitude,ST_Y(ST_Centroid(the_geom)) as latitude,bankname, bankaddress,ST_Distance(the_geom::geography, ST_PointFromText('POINT(3.390546 6.45174)', 4326)::geography) as distance from vbanks ORDER BY distance ASC LIMIT 5";
	try {
		$.getJSON(url, 0, handleLocations);
	}
	catch (err) {
		alert("JSON Error:\n\n" + err);
	}
}

function handleLocations(data, textStatus, jqXHR) {
	if(textStatus == "success") {
		var $clones = $('#branchList').clone();
		try {
			$.each(data.rows, function(index, value) {
				var $clone = $('.template-row').clone();
				$clone.attr('href', 'javascript:getMap(' + value.longitude + ',' + value.latitude + ');');
				$clone.find('#row_title').text(value.bankaddress);
				$clone.find('#row_subtitle').text("");
				$clones.append($clone.show());
			});
			$('#branchList').append($clones.show());
		}
		catch (err) {
			alert("Error: \n\n" + err);
		}
		alert("More stuff:\n\n" + locations.join("\n"));
	}
	else {
		alert("Sorry, there was a problem fetching the closest banks.");
	}
}

/**
 *
 * longitude, latitude, bankname, bankaddress, distance
 *
 */