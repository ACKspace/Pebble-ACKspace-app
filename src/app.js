var UI = require('ui');
var ajax = require('ajax');
var URL = 'http://ackspace.nl/status.php';

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'Hackerspace',
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
    var status = "";
    
    if(data.state.open === true) {status = "Open";}
    else if(data.state.open === false){status = "Closed";}
    else{status = "ERROR";}
    
    // get lastchanged date + time
    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp*1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }

    // show to user 
    card.subtitle(data.space);   
    card.body("Status: " + status + "\nChanged: " + timeConverter(data.state.lastchange));
  },
  
  function(error) {
    // Failure!
    console.log('Failed fetching Space State: ' + error);
  }
  
);
