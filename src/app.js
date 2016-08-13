var UI = require('ui');
var ajax = require('ajax');
var URL = 'https://ack.space/spaceAPI';
var status = '';
var currentStatus = '';

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'Space State',
  body:'Fetching...'
});
// Display the Card
card.show();

// the request 
function updateState(){
  ajax(
    {
      url: URL,
      type: 'json'
    },
    function(data) {
      // Success!
      console.log('Successfully fetched Space State!');
      
      if(data.state.open === true) {status = "Open";}
      else if(data.state.open === false){status = "Closed";}
      else{status = 'ERROR';}
      
      if (status != currentStatus){
        currentStatus = status;
        UI.Vibe.vibrate();
        UI.Light.trigger();
    
        // show to user 
        card.title(data.space);
        card.subtitle('Status: ' + status);
        card.body('\n' + data.state.message + '\n\nChanged: ' + timeConverter(data.state.lastchange));
      }
    },
    
    function(error) {
      // Failure!
      console.log('Failed fetching Space State: ' + error);
    }
    
  );
}
updateState();
setInterval(updateState, 300000);

function addLeadingZeroes(toCheck){
  return ((String(toCheck).length < 2) ? '0' + toCheck : toCheck);
}

// get lastchanged date + time
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp*1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = addLeadingZeroes(a.getMinutes());
  var sec = addLeadingZeroes(a.getSeconds());
  var time = '\n' + date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}
