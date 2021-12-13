"use strict"

createItem("me", PLAYER(), {
  loc:"A0",
  synonyms:['me', 'myself'],
  examine: "An excited BCI student.",
})

createRoom("A0", {
  headingAlias: 'Introduction',
  desc:"Hi! Welcome to this interactive BCI experience! In this little game you will go through a short story and analysis pipeline. No fear, no 'spooky' code this time. The game is structured as follows: you move between states by performing certain actions, these actions can be performed by typing out what has to be done (e.g., 'plot frequency spectrun' / 'inspect marker file' / 'apply PCA' etc.). It is important that you always start your action with one of the following words: perform/plot/apply. If at any point you are lost or unsure how things work, you can always type 'help'. <br> <br> Are you ready? Type: 'go to first thesis meeting'",
  afterEnter: function(){
    findCmd('MetaHint').script = function() {
      metamsg("Go ahead - type 'go to the first meeting' ")
      return world.SUCCESS_NO_TURNSCRIPTS
    }},
  dests:[
    new Exit('A1')
  ],
})

//begin game

createRoom("A1", {
  headingAlias: 'The First Thesis Meeting',
  desc: "Your silly thesis supervisor has bought some EEG data from some sketchy website. He just clicked 'Download' on the zip file and then cleared his browser history. Now you have no idea what experiment the data came from and what it's specs are. Your supervisor is persistent in that you should be able to get a good model from this data. 'I had a PhD student that worked on that data! When he had a breakthrough, he called me that he was on his way to show me, but then mysterously vanished... So now it's up to you to do put your BCI skills to some good use, go get me some results!' <br> <br> You: 'Where exactly did you get the data from?' <br> Sup: 'Uuuuuhm.... the internet?'  <br> You: 'Do you remember what the experiment was?' <br> Sup: 'Nope, but inspecting the data and looking at the markers should be a good starting point, off you go!' ",
  regex:/^(.*)(meeting|thesis)(.*)$/,
  afterEnter: function(){
    findCmd('MetaHint').script = function() {
      metamsg("Hmm.. the supervisor told me to inspect the data and especially the markers, I guess I'll should do that")
      return world.SUCCESS_NO_TURNSCRIPTS
  }},
  dests:[
    new Exit('A2'),
    new Exit('A3'),
    new Exit('A4'),
    new Exit('A5'),
  ],

})

// EXPLORATORY PHASE

let b_gate = 1; 
let b_string = " You already have all the important information. You can probably move on to the preprocessing phase - type 'go to preprocessing phase'."

createRoom("A2", {
  headingAlias: 'Plotting the data',
  desc: "You plot the raw data and the raw data's frequency spectrum (PSD)",
  afterEnter: function(){
    let bn = ""
    if (b_gate % 6 === 0){
      bn = b_string
      if (settings.playMode == 'dev'){
        console.log('next bottleneck accessible')
      }
    }
    findCmd('MetaHint').script = function() {
      metamsg("Remember, this 50Hz peak isn't due to brain activity." + bn)
      return world.SUCCESS_NO_TURNSCRIPTS
    }
    picture('A2_1.png', 600)
    picture('A2_2.png', 600)
  },
  regex:/^(.*)(data|frequency spectrum|spectrum|spectrogram|PSD)(.*)$/,
  synonyms: [''],
  dests:[
    new Exit('A3'),
    new Exit('A4'),
    new Exit('A5'),
    new Exit('B0', {
      simpleUse:function(char){
        if (b_gate % 6 === 0){
          return util.defaultSimpleExitUse(char, this)
        }else return falsemsg("You can probably still explore a bit more ;)")
      }
    })
  ],
})


createRoom("A3", {
  headingAlias: 'Exploring the markers',
  desc: "You take a look at the markers encoded in the metadata of the files, it appears that there are a few markers used in this dataset:  <br> Event - Description <br>276 - Idling EEG (eyes open) <br>277- Idling EEG (eyes closed) <br>768 - Start of a trial <br>769 - Cue onset left hand MI (class 1) <br>770 - Cue onset right hand MI (class 2) <br>783 - Cue unknown <br>1023 - Rejected trial <br>1072 - Eye movements <br>32766 - Start of a new run <br> <br> You also see that there is roughly 10 seconds between markers. That is quite long for events?",
  afterFirstEnter: function(){
    b_gate = b_gate*2
    if (settings.playMode==='dev'){
      console.log("success marker")
      if (b_gate % 6 === 0){
        let bn = b_string
        findCmd('MetaHint').script = function() {
          metamsg("What does timing of the events tell us about the type of paradigm? Is it an ERP experiment? Or are we in the oscillatory domain?" + bn)
          return world.SUCCESS_NO_TURNSCRIPTS
        }
        console.log('next bottleneck accessible')
      }
    }
  },
  afterEnter: function(){
    let bn = ""
    if (b_gate % 6 === 0){
      bn = b_string
      if (settings.playMode == 'dev'){
        console.log('next bottleneck accessible')
      }
    }
    findCmd('MetaHint').script = function() {
      metamsg("What does timing of the events tell us about the type of paradigm? Is it an ERP experiment? Or are we in the oscillatory domain?" + bn)
      return world.SUCCESS_NO_TURNSCRIPTS
    }
  },
  regex:/^(.*)(events|markers)(.*)$/,
  dests:[
    new Exit('A2'),
    new Exit('A4'),
    new Exit('A5'),
    new Exit('B0', {
      simpleUse:function(char){
        if (b_gate % 6 === 0){
          return util.defaultSimpleExitUse(char, this)
        }else return falsemsg("You can probably still explore a bit more ;)")
      }
    })
  ],
})

createRoom("A4", {
  headingAlias: 'Sampling frequency',
  afterFirstEnter: function(){
    b_gate = b_gate*3
    if (settings.playMode==='dev'){
      console.log("success marker")
      if (b_gate % 6 === 0){
        let bn = b_string
        console.log('next bottleneck accessible')
        findCmd('MetaHint').script = function() {
          metamsg("" + bn)
          return world.SUCCESS_NO_TURNSCRIPTS
        }
      }
    }
  },
  afterEnter: function(){
    let bn = ""
    if (b_gate % 6 === 0){
      bn = b_string
      if (settings.playMode == 'dev'){
        console.log('next bottleneck accessible')
      }
    }

    findCmd('MetaHint').script = function() {
      metamsg("" + bn)
      return world.SUCCESS_NO_TURNSCRIPTS
    }

  },
  desc: "You take a look at the sampling frequency encoded in the metadata of the files, it appears that the data was sampled at 250Hz.",
  regex:/^(.*)(sampling frequency|sampling rate)(.*)$/,
  dests:[
    new Exit('A2'),
    new Exit('A3'),
    new Exit('A5'),
    new Exit('B0', {
      simpleUse:function(char){
        if (b_gate % 6 === 0){
          return util.defaultSimpleExitUse(char, this)
        }else return falsemsg("You can probably still explore a bit more ;)")
      }
    })
  ],
})

createRoom('A5', {
  headingAlias:'Channels',
  desc: "There are 22 EEG channels, sadly their naming scheme isn't very informative about the layout",
  afterEnter: function(){
    if (settings.playMode == 'dev' && b_gate % 6 === 0){
      console.log('next bottleneck accessible')
    }
  },
  regex:/^(.*)(channels)(.*)$/,
  dests:[
    new Exit('A2'),
    new Exit('A3'),
    new Exit('A4'),
    new Exit('B0', {
      simpleUse:function(char){
        if (b_gate % 6 === 0){
          return util.defaultSimpleExitUse(char, this)
        }else return falsemsg("You can probably still explore a bit more ;)")
      }
    })
  ],
})

// PREPROCESSING PHASE

let c_gate = 1

createRoom("B0", {
  headingAlias: 'Preprocessing Phase',
  desc: "You have done some exploration, now it's time to start preprocessing the data. Think about all the steps you've learned throughout the course.",
  regex:/^(.*)(preprocessing)(.*)$/,
  dests:[
    new Exit('B1'),
    new Exit('B2'),
    new Exit('B3'),
    new Exit('B4'),
    new Exit('B5'),
    new Exit('B6')
  ],
})

createRoom('B1', {
  headingAlias: 'Eye artefacts',
  desc: "From the markers we know when the participant performed large eye-movements:",
  afterEnter: function(){
    picture("B1.png", 600)
  },
  regex:/^(.*)(artefacts)(.*)$/,
  dests:[
    new Exit('B2'),
    new Exit('B3'),
    new Exit('B4'),
    new Exit('B5'),
    new Exit('B6'),
    new Exit('C0')
  ]
})


createRoom('B2', {
  headingAlias: 'Analyze frequency spectrum',
  desc: "You plot the PSD (power spectral density) function of the data.",
  afterEnter: function(){
    picture("B2.png", 600)
    msg("You observe a peak at 50Hz. Where does this peak come from?")
  },
  regex:/^(.*)(PSD|frequency spectrum|spectrum)(.*)$/,
  dests:[
    new Exit('B1'),
    new Exit('B3'),
    new Exit('B4'),
    new Exit('B5'),
    new Exit('B6'),
    new Exit('C0')
  ]
})

createRoom('B3', {
  headingAlias: 'Removing noisy channels',
  desc: "You tried removing noisy channels by using a min-max threshold criterion. It seems that the data had already been cleaned as no channels were removed from the data.",
  afterEnter: function(){
  },
  regex:/^(.*)(artefacts)(.*)$/,
  dests : [
    new Exit('B1'),
    new Exit('B2'),
    new Exit('B4'),
    new Exit('B5'),
    new Exit('B6'),
    new Exit('C0')
  ]
})

createRoom('B4', {
  headingAlias: 'Downsampling',
  desc: "You down-sample the data to 100Hz. Why can we do this? Will it not cause important information to be lost?",
  afterEnter: function(){
  },
  regex:/^(.*)(resample|downsample)(.*)$/,
  dests : [
    new Exit('B1'),
    new Exit('B2'),
    new Exit('B3'),
    new Exit('B5'),
    new Exit('B6'),
    new Exit('C0')
  ]
})

// we can try to make a button? 
createRoom('B5', {
  headingAlias: 'Spectral filtering',
  desc: "You want to spectral filter the data, smart! What frequency range do you think is best in this scenario?: <br> <br> A: [1 - 10] Hz <br> B: [7-20] Hz <br> <br> type: 'apply filter A/B' ",
  afterEnter: function(){
  },
  regex:/^(.*)(spectral filter|filter)(.*)$/,
  dests : [
    new Exit('B5A', {
      simpleUse:function(char){
        if (false){
          return util.defaultSimpleExitUse(char, this)
        }else return falsemsg("Are you sure about that? Remember what the markers were? What frequency range would this type of task entail? type: 'apply filter A/B' to continue ")
    }}),
    new Exit('B5B'),
  ]
})

createRoom('B5A', {
  headingAlias: '[1-10] Hz band-pass filter',
  desc: "",
  regex:/^(.*)(filter A)(.*)$/,
  dests : []
})

createRoom('B5B', {
  headingAlias: '[7-20] Hz band-pass filter',
  desc: "You applied a band pass filter that limited the frequency contents to the [7-20] Hz band. Hopefully you did this because you know this is a motor imagery task and attempted to preserve content related to this task and didn't just guess the answer..",
  afterEnter: function(){
  },
  regex:/^(.*)(filter B)(.*)$/,
  dests : [
    new Exit('B1'),
    new Exit('B2'),
    new Exit('B3'),
    new Exit('B4'),
    new Exit('B6'),
    new Exit('C0')
  ]
})

createRoom('B6', {
  headingAlias: 'Spectral filtering',
  desc: "",
  afterEnter: function(){
  },
  regex:/^(.*)(filter A)(.*)$/,
  dests : [
    new Exit('B1'),
    new Exit('B2'),
    new Exit('B3'),
    new Exit('B5'),
    new Exit('B6'),
    new Exit('C0')
  ]
})

createRoom('C0', {
  headingAlias: 'Spectral filtering',
  desc: "",
  afterEnter: function(){
  },
  regex:/^(.*)(filter A)(.*)$/,
  dests : [
    new Exit('B1'),
    new Exit('B2'),
    new Exit('B3'),
    new Exit('B5'),
    new Exit('B6'),
    new Exit('C0')
  ]
})




// DEPRECATED

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

