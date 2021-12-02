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
    new Exit('plot_raw_spectrum')
  ],

})

createRoom('plot_raw_data', {
  headingAlias:'Raw Data Plot',
  desc:'You plot the raw unprocessed data and this is what you get:',
  afterEnter: function(){
    picture('eeg_raw.png', 600)
  },
  synonyms:['raw data','plot', 'plot the data'],
  //dirAlias: 'Plotting the raw data',
  dests:[
    new Exit('plot_raw_spectrum'),
  ],
})

createRoom('plot_raw_spectrum', {
  headingAlias:'Raw Data Spectrum Plot',
  desc:'You plot the raw unprocessed data\'s frequency spectrum and this is what you get:',
  afterEnter: function(){
    picture('plot_PSD_1.png', 600)
    msg('You notice that there is a spike at 50Hz and overal a lot of frequencies that we don\'t care about - after all, relevant brain signals happen in the lower frequency bands.')
  },
  synonyms:['raw data spectrum','frequency', 'frequency spectrum', 'the data spectrum'],
  //dirAlias: 'Plotting the raw data',
  dests:[
    new Exit('plot_raw_data'),
    new Exit('lp_filter'),
  ],
})

createRoom('lp_filter', {
  headingAlias:'Low-pass Filter',
  desc:'You decide to apply a low-pass filter to your data to get rid of those pesky artefacts! Just to be safe you plot the frequency spectrum again: ',
  afterEnter: function(){
    picture('plot_PSD_0Hz_40Hz.png', 600)
    msg('Indeed, now you don\t have powerline noise anymore ^_^')
  },
  synonyms:['filtered data spectrum','plot filtered frequency', 'plot the filtered data spectrum', 'low-pass filter', 'filter data'],
  //dirAlias: 'Plotting the raw data',
  dests:[
    new Exit('do_a_Nietzsche'),
  ],
})

createRoom('do_a_Nietzsche', {
  headingAlias:'Do a Nietzsche',
  desc:'You\'ve killed God.',
  afterEnter: function(){
  },
  synonyms:['kill God'],
  //dirAlias: 'Plotting the raw data',
  dests:[
  ],
})