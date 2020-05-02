
// Credit: https://gist.github.com/jezhou/ac34cef8ce02aa051cfd/53a2b9605d99a13ebe090da5d4642be71b5e2e54

// Credit tutorial: https://ctrlq.org/code/20115-trello-google-forms

// Fire off this function in the script editor to enable.
function init() {

  var triggers = ScriptApp.getProjectTriggers();
  var form = FormApp.getActiveForm();
  
  // Delete all triggers before making a brand new one.
  for(var i in triggers) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  
  // Set up a new trigger
  ScriptApp.newTrigger('submitToTrello')
           .forForm(form)
           .onFormSubmit()
           .create();
  
  Logger.log('Successful creation of new submitToTrello trigger.');
  
}

function submitToTrello(e) {
  var docLock = LockService.getDocumentLock();

// waiting to grab lock on spreadsheet and form
  do {
    try {
      docLock.waitLock(10000); 
    } catch (e) {
      Logger.log("Could not obtain lock after 10 sec");
    }
  } while (!docLock.hasLock());
  
  // IN CRITICAL SECTION
  
  var form = FormApp.getActiveForm();
  var latestResponse = form.getResponses().pop()
  var latestItemResponses = latestResponse.getItemResponses();

  if (MailApp.getRemainingDailyQuota() > 0) {
    
    // TODO: Trello email address goes here
    var email = "kieranmulligan2+o2ngxbisf6ic6ulca5ci@boards.trello.com";
    
    // Subject line will be the title of the event on Trello card
    var subject = latestItemResponses[0].getResponse();
    
    // Update confirmation message with ticket id
    message = "You have been placed in the CS 537 lab queue." ;
    form.setConfirmationMessage(message);
    
    // Time Zone 
    var timeZone = Session.getScriptTimeZone();
    date = Utilities.formatDate(new Date(), timeZone, "MM-dd-yyyy | HH:mm:ss");
    
    // Intial empty body
    var body = "";
    
    // TODO: change these to be whatever fields of the form you want. 
    // If you want these to be automatically populated based on your
    // form questions, make sure these match exactly
    var list_of_public_titles = ["Name", "Timestamp", "Your Meeting Link (Google Meet)",
            "CS Login", "Type of Question", "Question (briefly describe)"];
    
    // Loop through recent responses and format them into string
    latestItemResponses.forEach(function (value, index, array) {
      if (list_of_public_titles.indexOf(value.getItem().getTitle()) != -1) {
        var formatted = Utilities.formatString("**%s**\n%s\n\n", value.getItem().getTitle(), value.getResponse());
        body = body.concat(formatted);
      }
    });
    
    // note that a timestamp is based local time zone of the submitter,
    // so tickets arrive in order in real-time while timestamp may vary
    body = body.concat("**Timestamp**\n");
    body = body.concat(date);
    body = body.concat("\n\n");
    
    // Add to trello
    MailApp.sendEmail(email, subject, body);
    
    // Send ticket id to form submitter
    MailApp.sendEmail(latestResponse.getRespondentEmail(), subject, message)
  }
  
  // END OF CRITICAL SECTION
  docLock.releaseLock();
}


