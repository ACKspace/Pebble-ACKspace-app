var UI = require('ui');
var ajax = require('ajax');
var URL = 'http://techinc.nl/space/spacestate.json';

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'Space State',
  subtitle:'Fetching...'
});
// Display the Card
card.show();


// the request 
ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    // Success!
    console.log('Successfully fetched Space State!');
    var state = "";
    
    if(data.open === true) {state = "open";}
    else if(data.open === false){state = "Closed";}
    else{state = "ERROR";}

    // show to user 
    card.subtitle(data.space);   
    card.body("space is currently " + state);
  },
  
  function(error) {
    // Failure!
    console.log('Failed fetching Space State: ' + error);
  }
  
);