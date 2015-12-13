// JavaScript Document
'use strict';

var Traffic = {
	
	srURL: "http://api.sr.se/api/v2/traffic/messages?format=json&indent=true&size=100",
	srResponse: {},
	messageCategory: 'Alla',
	map: {},
	layerGroupAll: L.layerGroup(),
	layerGroupFiltered: L.layerGroup(),
	
	
	init: function() {
		
		Traffic.getSRMessages();
		Traffic.renderMap();
		Traffic.addEventListeners();
	},
	
	renderMap: function() {
		
		// L.mapbox.accessToken = 'pk.eyJ1Ijoid2ljdG9yIiwiYSI6ImNpaTBheXR6YTA0c2N0bG0xcWxlczVsbXIifQ.st0JA1A7H7YkpwuOmlmWDg';
		// Replace 'mapbox.streets' with your map id.
		var mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoid2ljdG9yIiwiYSI6ImNpaTBheXR6YTA0c2N0bG0xcWxlczVsbXIifQ.st0JA1A7H7YkpwuOmlmWDg', {
			attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
		});
				
		Traffic.map = L.map('map')
			.addLayer(mapboxTiles)
			.setView([60.118387215202524, 15.001202453613246], 6);
	},
	
	createMapMarkers: function(messages) {
		
		console.log(Traffic.messageCategory);
		
		Traffic.clearMapFromMarkers();
		
		for (var i = 0; i < messages.length; i++) {
			
			if (Traffic.messageCategory === 'Alla') {
				
				var marker = Traffic.createMarker(messages[i]);
				Traffic.layerGroupAll.addLayer(marker);
				
			} else if (messages[i].category == Traffic.messageCategory) {
				
				var marker = Traffic.createMarker(messages[i]);
				Traffic.layerGroupFiltered.addLayer(marker);
			}
		}
		
		Traffic.setOutMapMarkers();
	},
	
	clearMapFromMarkers: function() {
		
		Traffic.map.removeLayer(Traffic.layerGroupAll);
		Traffic.map.removeLayer(Traffic.layerGroupFiltered);
		Traffic.layerGroupAll.clearLayers();
		Traffic.layerGroupFiltered.clearLayers();
	},
	
	createMarker: function(message) {
		
		return L.marker([message.latitude, message.longitude], {icon: Traffic.setMarkerColor(message.priority)})
					.bindPopup('<strong>Titel</strong>: ' + message.title + '<br />' +
							   '<strong>Datum</strong>: ' + Traffic.formatDateTime(message.createddate) + '<br />' +
							   '<strong>Beskrivning</strong>: ' + message.description + '<br />' +
							   '<strong>Kategori</strong>: ' + Traffic.showCategory(message.category) + '<br />' +
							   '<strong>Underkategori</strong>: ' + message.subcategory) 
					.openPopup();
			
	},
	
	showCategory: function(category) {
		
		switch (category) {
			
			case 0: return 'Vägtrafik';
			case 1: return 'Kollektivtrafik';
			case 2: return 'Planerad störning';
			case 3: return 'Övrigt';
			
			default: break;
		}
	},
	
	setMarkerColor: function(priority) {
		
		var color = '';
		
		switch (priority) {
		
			case 1: color = 'red'; break;
			case 2: color = 'orange'; break;
			case 3: color = 'yellow'; break;
			case 4: color = 'blue'; break;
			case 5: color = 'green'; break;
			
			default: break;	
		}
		
		var imageURL = 'css/images/' + color + '_marker_small.png';
		
		return L.icon({
			iconUrl: imageURL,
		
			iconSize:     [35, 35], // Size of the icon.
			iconAnchor:   [22, 94], // Point of the icon which will correspond to marker's location.
			popupAnchor:  [-5, -95] // Point from which the popup should open relative to the iconAnchor.
		});
	},
	
	setOutMapMarkers: function() {
		
		if (Traffic.messageCategory === 'Alla') {
			
			Traffic.layerGroupAll.addTo(Traffic.map);
			
		} else {
			
			Traffic.layerGroupFiltered.addTo(Traffic.map);
		}
	},
	
	addEventListeners: function() {
	
		var buttons = document.getElementsByClassName('filter-button');
		
		for (var i = 0; i < buttons.length; i++) {
			
			buttons[i].addEventListener("click", Traffic.filterMessageCategories, false);
			buttons[i].myParam = buttons[i].value;
		}
	},
	
	filterMessageCategories: function(category) {
		
		Traffic.messageCategory = category.target.myParam;
		Traffic.processMessageInfo();
	},
	
	getSRMessages: function() {
		
		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function() {
			
			if (xhr.readyState === 4 && xhr.status === 200) {
				
				var response = JSON.parse(xhr.responseText);
				
				Traffic.srResponse = response;
				Traffic.handleResponse(response);
				
				/*if (response.pagination.totalhits > response.pagination.size) {
					Traffic.getAllMessages(response.pagination.totalhits);
				}*/
			}
		};
		
		xhr.open("GET", Traffic.srURL, true);
		xhr.send(null);
	},
	
	handleResponse: function(response) {
		
		var messages = response.messages;
	
		Traffic.processMessageInfo();
		//var messages = Traffic.sortJsonArrayByProperty(response, 'messages.createddate', -1);
	},
	
	//getAllMessages: function(totalHits) {
//		
//		var addOnURL = '&size=' + totalHits;
//		var xhr = new XMLHttpRequest();
//		
//		xhr.onreadystatechange = function() {
//			
//			if (xhr.readyState === 4 && xhr.status === 200) {
//				
//				var response = JSON.parse(xhr.responseText);
//				Traffic.getTrafficInfo(Traffic.sortMessagesByDate(response));
//			}
//		};
//		
//		xhr.open("GET", Traffic.srURL + addOnURL, true);
//		xhr.send(null);
//	},
	
	processMessageInfo: function() {
		
		var messages = Traffic.srResponse.messages;
		var infoList = [];
		
		for (var i = 0; i < messages.length; i++) {
			
			if (Traffic.messageCategory === 'Alla') {
				
				infoList.push(Traffic.summariseMessage(messages[i]));
				
			} else if (messages[i].category == Traffic.messageCategory) {
				
				infoList.push(Traffic.summariseMessage(messages[i]));
			}
		}
		
		Traffic.renderTrafficInfo(infoList);
		Traffic.createMapMarkers(messages);
	},
	
	summariseMessage: function(message) {
		
		var messages = [];
		
		messages.push(
			Traffic.formatDateTime(message.createddate),
			Traffic.showCategory(message.category),
			message.subcategory,
			message.title,
			message.description
		);
		
		return messages;
	},
	
	renderTrafficInfo: function(infoList) {
		
		var tableRows = '';
		
		for (var i = 0; i < infoList.length; i++) {
		
			tableRows += '<tr>';
		
			for (var j = 0; j < infoList[i].length; j++) {
				
				tableRows += '<td>' + infoList[i][j] + '</td>';
			}
			
			tableRows += '</tr>';	
		}
	
		document.getElementById('traffic-tbody').innerHTML = tableRows;
	},
	
	sortMessagesByDate: function(response) {
		
		response = Traffic.sortJsonArrayByProperty(response, 'messages.createddate', -1);
		
		return response;
	},
	
	/* Function copied from: http://stackoverflow.com/a/4698083.
	 * Some minor changes have been made for readability.
	 * SR-API doesn't seem to have any sort-function for traffic-messages. 
	 */
	sortJsonArrayByProperty: function(objArray, prop, direction){
		
		if (arguments.length<2) { throw new Error("sortJsonArrayByProp requires 2 arguments"); }
		var direct = arguments.length>2 ? arguments[2] : 1; //Default to ascending
	
		if (objArray && objArray.constructor===Array){
			var propPath = (prop.constructor===Array) ? prop : prop.split(".");
			objArray.sort(function(a,b){
				for (var p in propPath){
					if (a[propPath[p]] && b[propPath[p]]){
						a = a[propPath[p]];
						b = b[propPath[p]];
					}
				}
				// convert numeric strings to integers
				a = a.match(/^\d+$/) ? +a : a;
				b = b.match(/^\d+$/) ? +b : b;
				
				return ( (a < b) ? -1*direct : ((a > b) ? 1*direct : 0) );
			});
		}
	},
	
	formatDateTime: function(date) {
		
		date = date.replace('/Date(', '');
		var formatedDate = new Date(parseInt(date));
		
		formatedDate = 
			formatedDate.getDate() + ' / ' + 
			(formatedDate.getMonth() + 1) + ' / ' + 
			formatedDate.getFullYear() + ' (Kl. ' +
			formatedDate.getHours() + ':' +
			formatedDate.getMinutes() + ')';
		
		return formatedDate;
	}
	
};

window.onload = Traffic.init;