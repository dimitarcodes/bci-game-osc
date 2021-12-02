"use strict"

createItem("me", PLAYER(), {
  loc:"meeting_1",
  synonyms:['me', 'myself'],
  examine: "An excited BCI student.",
})

createRoom("meeting_1", {
  alias: 'First Thesis Meeting',
  desc:"Your silly thesis supervisor has bought some EEG data from some sketchy website. He just clicked 'Download' on the zip file and then " + 
  "cleared his browser history so now you have no idea what experiment the data came from and what it's specs are - task/markers/sampling rate/etc.",
  //dirAlias: 'Meeting',
  dests:[
    new Exit('plot_raw_data'),
  ],

})

createRoom('plot_raw_data', {
  headingAlias:'Raw Data Plot',
  desc:'You plot the raw unprocessed data and this is what you get:',
  afterEnter: function(){
    picture('eeg.png', 600)
  },
  synonyms:['raw data','plot', 'plot the data'],
  //dirAlias: 'Plotting the raw data',
  dests:[
    new Exit('meeting_1'),
    new Exit('killing_floor'),
  ],
})

createRoom('killing_floor', {
  headingAlias:'Killing Floor',
  desc:'You come here to die',
  //afterEnter: function(){
   // picture('eeg.png', 600)
  //},
  //synonyms:['plot', 'plot the data'],
  //dirAlias: 'Plotting the raw data',
  dests:[
    new Exit('meeting_1')
  ],
})