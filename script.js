$(document).ready(function() {
            $("#submit").click(function(e) {
                e.preventDefault();
				var body = {
				    catno: $("#recordid").val(),
				    text: $("#name").val(),
				    barcode: $("#barcode").val()
				}
				axios({
				    method: 'post',
				    url: 'https://xe237hoz4d.execute-api.us-east-1.amazonaws.com/record',
				    data: body
				})
				.then(function (response) {
				    console.log(response);
				   	document.getElementById("message").style.display = "none";
				    if(response.data[0]=="no results"){
				    	$('#listings').text('No Results, search again.');
				    }
				    else {
				  		var lis = document.getElementById('listings');
        				lis.innerHTML = "";
				    	list(response);
						lis.style.display = "block";
				    }

				})
				.catch(function (error) {
				    console.log(error);
				    $('#listings').text('Error. Search Again');
				});

            })
			$("#upload").click(function(e) {
                e.preventDefault();
				var body = {
				    title: $("#title").val(),
				    artist: $("#artist").val(),
				    year: $("#year").val(),
				    genre: $("#genre").val(),
            location: $("#location").val(),
            logger: $("#logger").val()

				}
				axios({
				    method: 'post',
				    url: ' https://09d2jiwf0j.execute-api.us-east-1.amazonaws.com/go',
				    data: body
				})
				.then(function (response) {
				    console.log(response);
        			document.getElementById("sender").style.display = "none";
					document.getElementById('message').innerHTML = "Cataloged Successfully!";
					document.getElementById('recordid').value = "";
        			document.getElementById('barcode').value = "";
        			document.getElementById('name').value = "";
					document.getElementById("searcher").style.display = "block";
					document.getElementById("message").style.display = "block";

				})
				.catch(function (error) {
				    console.log(error);
				    $('#listings').text('Error. Search Again');
				});

            })
        });
        var resarray;
        function list(data) {
        	var artist;
        	var title;
        	var year;
        	data = data.data;
        	resarray = data;
        	for (var i = data.length - 1; i >= 0; i--) {
        		title = data[i][0];
        		artist = data[i][1];
        		year = data[i][2];
        		var listings = document.getElementById('listings');
          		var listing = listings.appendChild(document.createElement('div'));
          		var list = listing.appendChild(document.createElement('h3'));
          		list.innerHTML = title + " by " + artist + ", " + year + ' <button class="btn btn-sm btn-primary" onclick="input('+ i+ ')">Select</button>';
    }
}
        function input(number) {
        	if(number==-1) {
        	document.getElementById('title').value = "";
        	document.getElementById('artist').value = "";
        	document.getElementById('year').value = "";
        	}
        	else {
        	document.getElementById('title').value = resarray[number][0];
        	document.getElementById('artist').value = resarray[number][1];
        	document.getElementById('year').value = resarray[number][2];
        	}
        	var sender = document.getElementById("sender");
        	sender.style.display = "block";
        	document.getElementById("searcher").style.display = "none";
        	document.getElementById("listings").style.display = "none";

        }
        function restore() {
        	document.getElementById("sender").style.display = "none";
			document.getElementById("searcher").style.display = "block";
        }
