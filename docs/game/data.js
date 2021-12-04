"use strict"

createItem("me", PLAYER(), {
  loc:"introduction",
  synonyms:['me', 'myself'],
  examine: "An excited BCI student.",
})

createRoom("introduction", {
  alias: 'Introduction',
  desc:"Hi! Welcome to this interactive BCI experience! In this little game you will go through a short story "+
  "and analysis pipeline. No fear, no 'spooky' code this time. The game is structured as follows: you move between states by performing certain actions, "+
  "these actions can be performed by typing out what has to be done (e.g., 'plot frequency spectrun' / 'inspect .VMRK file' / 'apply PCA' etc.). "+
  "It is important that you always start your action with one of the following words: perform/plot/apply. If at any point you are lost or unsure how things work, you can always type 'help'. " +
  "<br> <br> Are you ready? Type: go to First Thesis Meeting ",
  afterEnter: function(){
    findCmd('MetaHint').script = function() {
    metamsg("Go ahead - type 'Go to the first meeting' ")
    return world.SUCCESS_NO_TURNSCRIPTS
  }},
  dests:[
    new Exit('meeting_1')
  ],
})

//begin game

createRoom("meeting_1", {
  alias: 'First Thesis Meeting',
  desc:"Your silly thesis supervisor has bought some EEG data from some sketchy website. He just clicked 'Download' on the zip file and then " + 
  "cleared his browser history so now you have no idea what experiment the data came from and what it's specs are - task/markers/sampling rate/etc.",
  dirAlias: 'Meeting',
  hintScript: 'ayy waddup',
  synonyms: ['first meeting', 'thesis meeting'],
  afterEnter: function(){
    findCmd('MetaHint').script = function() {
    metamsg("You need to figure out what the data is, you might as well ask your supervisor if they remember anything from the page they got it from - such as the author, name of the website, etc.")
    return world.SUCCESS_NO_TURNSCRIPTS
  }},
  dests:[
    new Exit('origin'),
    new Exit('author'),
    new Exit('experiment')
  ],

})

// SOCIAL ENGINEERING PHASE

createRoom("origin", {
  alias: 'Ask about the origin of the data',
  desc: 'Your Supervisor: The internet, duh?',
  dirAlias: 'Origin of the data',
  synonyms: ['origin of the data', 'where the data came from', 'where they got the data', 'where he got the data'],
  dests:[
    new Exit('experiment'),
    new Exit('author')
  ],
})

createRoom("author", {
  alias: 'Ask about the authors of the data',
  desc: 'How should I know? - says your supervisor, slightly annoyed at the stupid question',
  dirAlias: 'Origin of the data',
  synonyms: ['authors..', 'who created..', 'who author.. ', 'who were the authors..'],
  dests:[
    new Exit('origin'),
    new Exit('experiment')
  ],
})

createRoom("experiment", {
  alias: 'Ask about the experimental set up that produced this data',
  desc: 'How should I know? - says your supervisor, slightly annoyed at the stupid question',
  dirAlias: 'Origin of the data',
  synonyms: ['experiment ..', 'what the experiment was', 'what eperiment +'],
  dests:[
    new Exit('author'),
    new Exit('origin')
  ],
})

createRoom("preprocessing", {
  alias: 'Preprocessing',
  desc: 'How should I know? - says your supervisor, slightly annoyed at the stupid question',
  dirAlias: 'Origin of the data',
  synonyms: ['experiment ..', 'what the experiment was', 'what eperiment +'],
  dests:[
    new Exit('author'),
    new Exit('origin')
  ],
})


createRoom('plot_raw_data', {
  headingAlias:'Raw Data Plot',
  desc:'You plot the raw unprocessed data and this is what you get:',
  afterEnter: function(){
    picture('eeg_raw.png', 600)
  },
  synonyms:['raw', 'raw data', 'the raw data', 'the data'],
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

