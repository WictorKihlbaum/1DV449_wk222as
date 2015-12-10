// JavaScript Document
'use strict';

var Traffic = {
	
	srURL: "http://api.sr.se/api/v2/traffic/messages?format=json&indent=true",
	
	
	init: function() {
		
		Traffic.getJSON();
	},
	
	getJSON: function() {
		
		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function() {
			
			if (xhr.readyState === 4 && xhr.status === 200) {
				
				var response = JSON.parse(xhr.responseText);
				
				if (response.pagination.totalhits > response.pagination.size) {
					Traffic.getAllMessages(response.pagination.totalhits);
				} else {
					Traffic.getTrafficInfo(response.messages);	
				}
			}
		};
		
		xhr.open("GET", Traffic.srURL, true);
		xhr.send(null);
	},
	
	getAllMessages: function(totalHits) {
		
		var addOnURL = '&size=' + totalHits;
		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function() {
			
			if (xhr.readyState === 4 && xhr.status === 200) {
				
				var response = JSON.parse(xhr.responseText);
				Traffic.getTrafficInfo(response.messages);
			}
		};
		
		xhr.open("GET", Traffic.srURL + addOnURL, true);
		xhr.send(null);
	},
	
	getTrafficInfo: function(messages) {
		
		var infoList = [];
		
		for (var i = 0; i < messages.length; i++) {
			
			var info = [];
			
			info.push(
				messages[i].subcategory,
				messages[i].title,
				messages[i].description
			);
			
			infoList.push(info);
		}
		
		Traffic.renderTrafficInfo(infoList);
	},
	
	renderTrafficInfo: function(infoList) {
		
		var htmlTable = '<table><thead><tr><th>Kategori</th><th>Titel</th><th>Beskrivning</th></tr></thead><tbody>';
		
		for (var i = 0; i < infoList.length; i++) {
		
			htmlTable += '<tr>';
		
			for (var j = 0; j < infoList[i].length; j++) {
				
				htmlTable += '<td>' + infoList[i][j] + '</td>';
			}
		
			htmlTable += '</tr>';	
		}
		
		htmlTable += '</tbody></table>';
	
		document.getElementById('traffic-list').innerHTML = htmlTable;
	}
	
};

window.onload = Traffic.init;