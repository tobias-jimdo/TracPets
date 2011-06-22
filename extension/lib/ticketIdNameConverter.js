TicketIdNameConverter = {
  
  ticketIdForName: function(name) {
    parts = name.split(' ');
    adjective = parts[0];
    animal = parts[1];

    var adjectiveId = adjectives.indexOf(adjective);
    var animalId = animals.indexOf(animal);

    if(adjectiveId == -1 || animalId == -1) {
      return null;
    }

    var binaryAdjectiveId = Number(adjectiveId).toString(2);
    var binaryAnimalId = Number(animalId).toString(2);

    var binaryTicketId = '';
    
    for(var i = 0; i < Math.max(binaryAdjectiveId.length, binaryAnimalId.length); i++) {
      var pAdjective = binaryAdjectiveId.length - 1 - i;
      var pAnimal = binaryAnimalId.length - 1 - i;

      if(binaryAdjectiveId[pAdjective] !== undefined) {
        binaryTicketId = binaryAdjectiveId[pAdjective] + binaryTicketId;
      } else {
        binaryTicketId = '0' + binaryTicketId;
      }

      if(binaryAnimalId[pAnimal] !== undefined) {
        binaryTicketId = binaryAnimalId[pAnimal] + binaryTicketId;
      } else {
        binaryTicketId = '0' + binaryTicketId;
      }
    }

    ticketId = parseInt('0' + binaryTicketId, 2);

    return ticketId;
  },

  nameForTicketId: function(ticketId) {
    ticketId = ticketId.replace(/#/, '');

    if(!/^\d+$/.test(ticketId)) {
      return null;
    }

    var binary = Number(ticketId).toString(2);

    var binaryAnimalId = '';
    var binaryAdjectiveId = ''; 

    for(var i = 0; i < binary.length; i++) {
      var p = binary.length - 1 - i;

      if(i%2) {
        binaryAnimalId = binary[p] + binaryAnimalId;
      } else {
        binaryAdjectiveId = binary[p] + binaryAdjectiveId;
      } 
    }

    var adjectiveId = parseInt('0' + binaryAdjectiveId, 2);
    var animalId = parseInt('0' + binaryAnimalId, 2);

    return adjectives[adjectiveId] + " " + animals[animalId];
  }
}
