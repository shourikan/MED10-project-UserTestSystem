function handleFile(fileToRead, type) {
	var reader = new FileReader();
	var file = new File([fileToRead], 'Final.csv');
	// Handle errors load
	if (type == "JSON")
		reader.onload = loadHandlerJSON;
	else
		reader.onload = loadHandler;
	reader.onerror = errorHandler;
	// Read file into memory as UTF-8      
	reader.readAsText(file);
}

function test(url, type){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			//alert(xhr.responseText);
			handleFile(xhr.responseText, type);
		}
	}
	xhr.open('GET', url, true);
	xhr.send(null);

}

function loadHandler(event) {
	var file = event.target.result;
	processData(file);        
}

function loadHandlerJSON(event) {
	var file = event.target.result;
	processDataJSON(file);       
}

function processData(file) {
  var allTextLines = file.split(/\r\n|\n/);
	var lines = [];
	allTextLines.shift();
	while (allTextLines.length-1) {
	var line = allTextLines.shift().split(',');
	for(var i=0; i<2; i++)
		line[i] = Number(line[i]);
	line[3] = Number(line[3]);
	for(var i=5; i<line.length; i++)
		line[i] = Number(line[i]);
	lines.push(line);
	}

	engage(lines);
}

function processDataJSON(file){
	json = JSON.parse(file);
	texts = json.text;
	//console.log(Object.keys(json.text).length);
	console.log("JSON loaded");
	test("https://raw.githubusercontent.com/shourikan/MED10/master/Final.csv", "csv");
}

function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		alert("Canno't read file !");
	}
}

function drawOutput(lines){
	//Clear previous data
	document.getElementById("output").innerHTML = "";
	var table = document.createElement("table");
	for (var i = 0; i < lines.length; i++) {
		var row = table.insertRow(-1);
		for (var j = 0; j < lines[i].length; j++) {
			var firstNameCell = row.insertCell(-1);
			firstNameCell.appendChild(document.createTextNode(lines[i][j]));
		}
	}
	document.getElementById("output").appendChild(table);
}
