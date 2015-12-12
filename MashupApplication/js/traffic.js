// JavaScript Document
'use strict';

var Traffic = {
	
	srURL: "http://api.sr.se/api/v2/traffic/messages?format=json&indent=true&size=100",
	srResponse: {},
	messageCategory: 'Alla',
	
	
	init: function() {
		
		Traffic.getSRMessages();
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
	
		Traffic.renderFilterOptions(messages);
		Traffic.processMessageInfo();
		//var messages = Traffic.sortJsonArrayByProperty(response, 'messages.createddate', -1);
	},
	
	renderFilterOptions: function(messages) {
		
		var categories = [];
		var filterButtons = '';
		
		for (var i = 0; i < messages.length; i++) {
			// If category not already in array add it.
			if (categories.indexOf(messages[i].subcategory) === -1) {
				categories.push(messages[i].subcategory);
			}
		}
		
		categories.sort();
		
		for (var j = 0; j < categories.length; j++) {
			
			/* TODO: Add regEx to: 
					* remove white-spaces. 
					* change 'å, ä, ö' to 'a, o'.
					* Change uppercase to lowercase. 
					*/
					// For the sake of 'value'.
			
			filterButtons += '<span class="filter-button-span"><input type="radio" class="filter-button" name="kategori" value="'+categories[j]+'" /">' + categories[j] + '</span>';
		}
		
		document.getElementById('filter-form').innerHTML += filterButtons;
		Traffic.addEventListeners();
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
				
				var infoForAllCategories = [];
				
				infoForAllCategories.push(
					Traffic.formatDateTime(messages[i].createddate),
					messages[i].subcategory,
					messages[i].title,
					messages[i].description
				);
				
				infoList.push(infoForAllCategories);
				
			} else if (messages[i].subcategory === Traffic.messageCategory) {
				
				var infoForOneCategory = [];
			
				infoForOneCategory.push(
					Traffic.formatDateTime(messages[i].createddate),
					messages[i].subcategory,
					messages[i].title,
					messages[i].description
				);
				
				infoList.push(infoForOneCategory);
			}
		}
		
		Traffic.renderTrafficInfo(infoList);
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
	}
	
};

window.onload = Traffic.init;