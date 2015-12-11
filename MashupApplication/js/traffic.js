// JavaScript Document
'use strict';

var Traffic = {
	
	srURL: "http://api.sr.se/api/v2/traffic/messages?format=json&indent=true&size=100",
	
	
	init: function() {
		
		Traffic.getJSON();
	},
	
	getJSON: function() {
		
		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function() {
			
			if (xhr.readyState === 4 && xhr.status === 200) {
				
				var response = JSON.parse(xhr.responseText);
				Traffic.handleResponse(response);
				
				/*if (response.pagination.totalhits > response.pagination.size) {
					Traffic.getAllMessages(response.pagination.totalhits);
				} else {
					Traffic.getTrafficInfo(response.messages);	
				}*/
			}
		};
		
		xhr.open("GET", Traffic.srURL, true);
		xhr.send(null);
	},
	
	handleResponse: function(response) {
		
		var messages = response.messages;
	
		//var messages = Traffic.sortJsonArrayByProperty(response, 'messages.createddate', -1);
		Traffic.renderFilterOptions(messages);
		
		Traffic.processMessageInfo(messages);
	},
	
	renderFilterOptions: function(messages) {
		
		var categories = [];
		var filterButtons = '';
		
		for (var i = 0; i < messages.length; i++) {
			
			if (categories.indexOf(messages[i].subcategory) === -1) {
				categories.push(messages[i].subcategory);
			}
		}
		
		for (var j = 0; j < categories.length; j++) {
			// TODO: Add regEx to: remove white-spaces, change 'å, ä, ö' to 'a, o'.
			// For the sake of 'value'.
			filterButtons += '<input type="radio" class="filter-button" name="kategori" value="'+categories[j]+' /">' + categories[j];
		}
		
		document.getElementById('filter-form').innerHTML = filterButtons;
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
	
	processMessageInfo: function(messages) {
		
		var infoList = [];
		
		for (var i = 0; i < messages.length; i++) {
			
			var info = [];
			
			info.push(
				Traffic.formatDateTime(messages[i].createddate),
				messages[i].subcategory,
				messages[i].title,
				messages[i].description
			);
			
			infoList.push(info);
		}
		
		Traffic.renderTrafficInfo(infoList);
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
		
		formatedDate = formatedDate.getDate() + " / " + 
			(formatedDate.getMonth() + 1) + " / " + 
			formatedDate.getFullYear();
		
		return formatedDate;
	},
	
	renderTrafficInfo: function(infoList) {
		
		var tableRows = '';
		
		for (var i = 0; i < infoList.length; i++) {
		
			tableRows += '<tr>';
		
			for (var j = 0; j < infoList[i].length; j++) {
				
				tableRows += '<td>' + infoList[i][j] + '</td>';
			}
			
			tableRows += '<td><a href="#">Visa</a></td>';
			tableRows += '</tr>';	
		}
	
		document.getElementById('traffic-tbody').innerHTML = tableRows;
	}
	
};

window.onload = Traffic.init;