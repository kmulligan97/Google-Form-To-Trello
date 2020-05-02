## Creating a Ticketing System using Google Form and Trello
This document is intended to help set up the ticketing queue used by CS 537.
Any course, CS or otherwise, can adapt this script and technique as needed.
The CS 537 system consists of a Google Form that sends tickets to a Trello
board after the student submits the form. This README assumes that the
Google form has already been set up. 

After following the steps below to set up the required infrastructure, test 
your system to ensure that everything works smoothly. Note that there can be 
delays on occasion due to Trello's server delays, so please be patient if a 
ticket does not show up immediately. It is probably a good idea to record
responses on a Google sheet as a backup in the event that the Trello servers
go down for an extended period of time. 

### Steps:
1. Make a Trello Board
    - Sign up for a free [Trello](https://trello.com) account
    - Create a board (optionally, create a team for the instructional staff
    and then create a board just for that team)
    - Create lists on the board to reflect how you want your ticketing system
    to organize tickets during office hours (see the example Trello board)
    - Get the email address of the board (Show Menu->More->Email-to-board settings).
    You can also change in which list new cards appear if you desire 
    (default is just a list called "New").

2. Create and initialize the Google Script
    - Go to the script editor for the Google Form (while in edit mode, 
    More->Script editor)
    - Use the template Google script (connect_to_trello_template.gs) and fill out the
    appropriate TODOs with information specific to your Google form. The 
    template is pretty well documented and should be self-explanatory, but
    if you have additional questions you can email Kieran 
    (kieranp.mulligan@gmail.com).
    - Be sure to save the changes you made to Google script, as changes
    are typically not automatically saved (unlike many other Google services)
    - Run the "init" function to set up the triggers required to fire off the
    submitToTrello function upon a form submission 
    (Select function->init, then hit the "Run" button)

### Example links
The provided connect_to_trello_template.gs template is the script used for the following
example Trello board and Google Form
- [Example Google Script](./connect_to_trello_template.gs)
- [Example Trello board](https://trello.com/b/tsOZ9frN/ticket-queue)
- [Example Google Form](https://docs.google.com/forms/d/e/1FAIpQLSfsQP8TRLUn7RPKuTDk4YaAUR62iDCDYjVjJQ7u6-U3VQuVuw/viewform)
