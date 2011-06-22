// ==UserScript==
// @name          TracPets
// @icon          assets/icon32.png
// @namespace     jimdo.com
// @description   Extends Trac and the Kanban-Card page to support animal names additional to ticket ids
// @include       https://svn.jimdo-server.com/trac
// @include       https://svn.jimdo-server.com/trac/*
// @include       https://kanban.jimdo-server.com/*
// @require       lib/jquery.min.js
// @require       lib/jquery.ba-replacetext.min.js
// @require       lib/ticketIdNameConverter.js
// @require       lib/adjectives.js
// @require       lib/animals.js
// ==/UserScript==


// Replace all occurences of Ticket-IDs (except in textareas and input-fields)
function composeTicketString(ticketId) {
  return ticketId + ' (' + TicketIdNameConverter.nameForTicketId(ticketId) + ')';
}

$("title,body * :not(textarea|input)").replaceText(/#\d+/, composeTicketString); 

// Send searches for the identifier directly to the ticket
$('#search').submit(function(e) {
  var searchText = $('#proj-search');
  var ticketId = TicketIdNameConverter.ticketIdForName(searchText.val());
  if(ticketId){
    document.location = '/trac/ticket/' + ticketId;
    e.preventDefault();
  }
});

// Kanban-Card (misuse the 'on stage since'-field)
var kanbanTicketIdField = $('input[name=id]');
ticketId = kanbanTicketIdField.val();

var kanbanNameField = $('#on_stage');
var kanbanNameLabel = $('label[for=on_stage]');

var name = TicketIdNameConverter.nameForTicketId(ticketId);
if(name) {
  kanbanNameField.val(name);
  kanbanNameLabel.text('name');
}
