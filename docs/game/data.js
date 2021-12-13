"use strict"

createItem("me", PLAYER(), {
  loc:"A0",
  synonyms:['me', 'myself'],
  examine: "An excited BCI student.",
})

function setHint(hint, phase){
  findCmd('MetaHint').script = function() {
    metamsg(hint+phase.hint)
    return world.SUCCESS_NO_TURNSCRIPTS
  }
}

function mandatory(phase, prime){
  phase.gate = phase.gate*prime
  if (phase.gate % phase.condition === 0) {
    phase.hint = phase.available
    msg(phase.available)
  }
}

// EXPLORATORY PHASE DATA

var phase_a = []
phase_a.gate = 1;
phase_a.condition = 6;
phase_a.unavailable = "You can probably still explore a bit more ;)"
phase_a.available = " You already have all the important information. You can probably move on to the preprocessing phase - type 'go to preprocessing phase'."
phase_a.hint = ""

phase_a.a0 = []
phase_a.a0.alias = "Introduction"
phase_a.a0.desc = "Hi! Welcome to this interactive BCI experience! In this little game you will go through a short story and analysis pipeline. No fear, no 'spooky' code this time. The game is structured as follows: you move between states by performing certain actions, these actions can be performed by typing out what has to be done (e.g., 'plot frequency spectrun' / 'inspect marker file' / 'apply PCA' etc.). It is important that you always start your action with one of the following words: perform/plot/apply. If at any point you are lost or unsure how things work, you can always type 'help'. <br> <br> Are you ready? Type: 'go to first thesis meeting'"
phase_a.a0.hint = "Go ahead - type 'go to the first meeting'"
phase_a.a0.dests = ['A1']

phase_a.a1 = []
phase_a.a1.alias = "The First Thesis Meeting"
phase_a.a1.desc = "Your silly thesis supervisor has bought some EEG data from some sketchy website. He just clicked 'Download' on the zip file and then cleared his browser history. Now you have no idea what experiment the data came from and what it's specs are. Your supervisor is persistent in that you should be able to get a good model from this data. 'I had a PhD student that worked on that data! When he had a breakthrough, he called me that he was on his way to show me, but then mysterously vanished... So now it's up to you to do put your BCI skills to some good use, go get me some results!' <br> <br> You: 'Where exactly did you get the data from?' <br> Sup: 'Uuuuuhm.... the internet?'  <br> You: 'Do you remember what the experiment was?' <br> Sup: 'Nope, but inspecting the data and looking at the markers should be a good starting point, off you go!'"
phase_a.a1.hint = "Hmm.. the supervisor told me to inspect the data and especially the markers, I guess I should do that"
phase_a.a1.dests = ['A2','A3','A4','A5']
phase_a.a1.regex = /^(.*)(meeting|thesis)(.*)$/

phase_a.a2 = []
phase_a.a2.alias = "Plotting the data"
phase_a.a2.desc = "You plot the raw data and the raw data's frequency spectrum (PSD)"
phase_a.a2.hint = "Remember, this 50Hz peak isn't due to brain activity."
phase_a.a2.images = ['A2_1.png', 'A2_2.png']
phase_a.a2.dests = ['A3','A4','A5']
phase_a.a2.regex = /^(.*)(data|frequency spectrum|spectrum|spectrogram|psd)(.*)$/

phase_a.a3 = []
phase_a.a3.alias = "Exploring the markers"
phase_a.a3.desc = "You take a look at the markers encoded in the metadata of the files, it appears that there are a few markers used in this dataset:  <br> Event - Description <br>276 - Idling EEG (eyes open) <br>277- Idling EEG (eyes closed) <br>768 - Start of a trial <br>769 - Cue onset left hand MI (class 1) <br>770 - Cue onset right hand MI (class 2) <br>783 - Cue unknown <br>1023 - Rejected trial <br>1072 - Eye movements <br>32766 - Start of a new run <br> <br> You also see that there is roughly 10 seconds between markers. That is quite long for events? "
phase_a.a3.hint = "What does timing of the events tell us about the type of paradigm? Is it an ERP experiment? Or are we in the oscillatory domain?"
phase_a.a3.dests = ['A2','A4','A5']
phase_a.a3.regex = /^(.*)(events|markers)(.*)$/

phase_a.a4 = []
phase_a.a4.alias = "Sampling frequecy"
phase_a.a4.desc = "You take a look at the sampling frequency encoded in the metadata of the files, it appears that the data was sampled at 250Hz."
phase_a.a4.hint = ""
phase_a.a4.dests = ['A2','A3','A5']
phase_a.a4.regex = /^(.*)(sampling frequency|sampling rate)(.*)$/

phase_a.a5 = []
phase_a.a5.alias = "Exploring the EEG Channels"
phase_a.a5.desc = "There are 22 EEG channels, sadly their naming scheme isn't very informative about the layout"
phase_a.a5.hint = ""
phase_a.a5.dests = ['A2','A3','A4']
phase_a.a5.regex = /^(.*)(channels)(.*)$/


// PREPROCESSING PHASE DATA

var phase_b = []
phase_b.gate = 1;
phase_b.condition = 30;
phase_b.unavailable = "You can probably do something else as well ;)"
phase_b.available = " You've already done the most important steps. You can probably move on to the spatial filter selection phase - type 'go to spatial filtering phase'."
phase_b.hint = ""

phase_b.b0 = []
phase_b.b0.alias = "Start Preprocessing"
phase_b.b0.desc = "You have done some exploration, now it's time to start preprocessing the data. Think about all the steps you've learned throughout the course."
phase_b.b0.hint = "There are many tricks discussed in the lectures and in the assignment notebooks. Think about how we altered the data as a whole, what is the correct order of these operations?"
phase_b.b0.dests = ['B1','B2','B3','B4','B5','B6','B7','B8']
phase_b.b0.regex = /^(.*)(preprocessing|pre-processing)(.*)$/

phase_b.b1 = []
phase_b.b1.alias = "Eye blinks"
phase_b.b1.desc = "From the markers we know when the participant performed large eye-movements:"
phase_b.b1.hint = "The activity does not seem very extreme nor does it differ much per channel, the electrodes are probably not close to the eyes of the participant."
phase_b.b1.images = ['B1.png']
phase_b.b1.dests = ['B2','B3','B4','B5','B6','B7','B8']
phase_b.b1.regex = /^(.*)(eye|blink)(.*)$/

phase_b.b2 = []
phase_b.b2.alias = "Plotting the PSD"
phase_b.b2.desc = "You plot the PSD (power spectral density) function of the data and observe a peak at 50Hz. Where does this peak come from?"
phase_b.b2.hint = "What can we do to counteract this peak at 50 Hz?"
phase_b.b2.images = ['B2.png']
phase_b.b2.dests = ['B1','B3','B4','B5','B6','B7','B8']
phase_b.b2.regex = /^(.*)(frequency spectrum|spectrum|spectrogram|psd)(.*)$/

phase_b.b3 = []
phase_b.b3.alias = "Remove noisy channels"
phase_b.b3.desc = "You tried removing noisy channels by using a min-max threshold criterion. No channels were removed from the data."
phase_b.b3.hint = "There are already only 22 channels in the data, perhaps the noisy channels were already removed before publication."
phase_b.b3.dests = ['B1','B2','B4','B5','B6','B7','B8']
phase_b.b3.regex = /^(.*)(noisy channel)(.*)$/

phase_b.b4 = []
phase_b.b4.alias = "Downsampling"
phase_b.b4.desc = "You down-sample the data to 100Hz. Why can we do this? Will it not cause important information to be lost?"
phase_b.b4.hint = "Remember, this 50Hz peak isn't due to brain activity."
phase_b.b4.dests = ['B1','B2','B3','B5','B6','B7','B8']
phase_b.b4.regex = /^(.*)(resampl|downsampl)(.*)$/

phase_b.b5 = []
phase_b.b5.alias = "Spectral filtering"
phase_b.b5.desc = "You want to spectral filter the data, smart! What frequency range do you think is best in this scenario?: <br> <br> A: [1 - 10] Hz <br> B: [7-20] Hz <br> <br> type: 'apply filter A/B' "
phase_b.b5.hint = "Do you know what the paradigm is? What were the markers? What frequency band should at least be in the range of our filter?"
phase_b.b5.dests = [] // manually
phase_b.b5.regex = /^(.*)(spectral filter|bandpass filter|frequency filter)(.*)$/

phase_b.b5A = []
phase_b.b5A.alias = "Filter A"
phase_b.b5A.desc = "sinkstate"
phase_b.b5A.hint = "Are you sure about that? Remember what the markers were? What frequency range would this type of task entail? type: 'apply filter A/B' to continue "
phase_b.b5A.dests = [] //sinkstate
phase_b.b5A.regex = /^(.*)(filter a)(.*)$/

phase_b.b5B = []
phase_b.b5B.alias = "Filter B"
phase_b.b5B.desc = "You applied a band pass filter that limited the frequency contents to the [7-20] Hz band. Hopefully you did this because you know this is a motor imagery task and attempted to preserve content related to this task and didn't just guess the answer.."
phase_b.b5B.hint = "Do you know what the paradigm is? What were the markers? What frequency band should at least be in the range of our filter?"
phase_b.b5B.images = ['B5B.png']
phase_b.b5B.dests = ['B1','B2','B3','B4','B6', 'B7', 'B8']
phase_b.b5B.regex = /^(.*)(filter b)(.*)$/

phase_b.b6 = []
phase_b.b6.alias = "Epoching"
phase_b.b6.desc = "You cut the data into epochs of [-1, 7]s, such that each epoch contains the EEG-signals of one of the two classes. Remember the markers, what were the classes?"
phase_b.b6.hint = "This could be the last step of the preprocessing phase. You could try to 'go to choosing spatial filter' or 'apply PCA/ICA/CSP/SPoC' directly. If you're not allowed to do so, you probably missed a step."
phase_b.b6.dests = ['B1','B2','B3','B4','B5']
phase_b.b6.regex = /^(.*)(epoch)(.*)$/

phase_b.b7 = []
phase_b.b7.alias = 'PCA'
phase_b.b7.desc = 'You apply Principle Component Analysis'
phase_b.b7.hint = 'gj'
phase_b.b7.dests = ['B1','B2','B3','B4','B6','B8']
phase_b.b7.regex = /^(.*)(pca|principle component)(.*)$/

phase_b.b8 = []
phase_b.b8.alias = 'ICA'
phase_b.b8.desc = 'You apply Independent Component Analysis'
phase_b.b8.hint = 'gj'
phase_b.b8.dests = ['B1','B2','B3','B4','B6','B7']
phase_b.b8.regex = /^(.*)(ica|independent component)(.*)$/

// SPATIAL FILTERING PHASE DATA

var phase_c = []
phase_c.gate = 1;
phase_c.condition = 30;
phase_c.unavailable = "You can probably do something else as well ;)"
phase_c.available = " You've already done the most important steps. You can probably move on to the spatial filter selection phase - type 'go to spatial filtering phase'."
phase_c.hint = ""

phase_c.c0 = []
phase_c.c0.alias = "Choosing spatial filter"
phase_c.c0.desc = "You've finished preprocessing the data. Now it's time to bring the data into a space such that we can perform some analysis or train a model."
phase_c.c0.hint = "Remember the markers, what can we do with this data? ",
phase_c.c0.dests = []
phase_c.c0.regex = /^(.*)(spatial|next)(.*)$/


// EXPLORATORY PHASE CODE

createRoom("A0", {
  headingAlias: phase_a.a0.alias,
  desc: phase_a.a0.desc,
  afterEnter: function(){setHint(phase_a.a0.hint, phase_a)},
  dests: phase_a.a0.dests.map(x => new Exit(x))
})

//begin game

createRoom("A1", {
  headingAlias: phase_a.a1.alias,
  desc: phase_a.a1.desc,
  regex:phase_a.a1.regex,
  afterEnter: function(){setHint(phase_a.a1.hint, phase_a)},
  dests: phase_a.a1.dests.map(x => new Exit(x))
})


createRoom("A2", {
  headingAlias: phase_a.a2.alias,
  desc: phase_a.a2.desc,
  afterEnter: function(){
    setHint(phase_a.a2.hint, phase_a)
    phase_a.a2.images.forEach(element => {picture(element,600)})
  },
  regex: phase_a.a2.regex,
  dests: phase_a.a2.dests.map(x => new Exit(x)).concat(
      new Exit('B0', {
        simpleUse:function(char){
        if (phase_a.gate % phase_a.condition === 0){
          return util.defaultSimpleExitUse(char, this)
          }else return falsemsg(phase_a.unavailable)
        } 
      })
    )
})


createRoom("A3", {
  headingAlias: phase_a.a3.alias,
  desc: phase_a.a3.desc,
  afterFirstEnter: function(){mandatory(phase_a, 2)},
  afterEnter: function(){setHint(phase_a.a3.hint, phase_a)},
  regex:phase_a.a3.regex,
  dests:phase_a.a3.dests.map(x => new Exit(x)).concat(
    new Exit('B0', {
      simpleUse:function(char){
      if (phase_a.gate % phase_a.condition === 0){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(phase_a.unavailable)
      } 
    })
  )
})

createRoom("A4", {
  headingAlias: phase_a.a4.alias,
  afterFirstEnter: function(){mandatory(phase_a, 3)},
  afterEnter: function(){setHint("",phase_a)},
  desc: phase_a.a4.desc,
  regex: phase_a.a4.regex,
  dests:phase_a.a4.dests.map(x => new Exit(x)).concat(
    new Exit('B0', {
      simpleUse:function(char){
      if (phase_a.gate % phase_a.condition === 0){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(phase_a.unavailable)
      } 
    })
  ),
})

createRoom('A5', {
  headingAlias: phase_a.a5.alias,
  desc: phase_a.a5.desc,
  afterEnter: function(){setHint(phase_a.a5.hint,phase_a)},
  regex:phase_a.a5.regex,
  dests:phase_a.a5.dests.map(x => new Exit(x)).concat(
    new Exit('B0', {
      simpleUse:function(char){
      if (phase_a.gate % phase_a.condition === 0){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(phase_a.unavailable)
      } 
    })
  ),
})

// PREPROCESSING PHASE CODE

createRoom("B0", {
  headingAlias: phase_b.b0.alias,
  desc: phase_b.b0.desc,
  regex:phase_b.b0.regex,
  dests: phase_b.b0.dests.map(x => new Exit(x))
})

createRoom('B1', {
  headingAlias: phase_b.b1.alias,
  desc: phase_b.b1.desc,
   afterEnter: function(){
    setHint(phase_b.b1.hint, phase_b)
    phase_b.b1.images.forEach(element => {picture(element,600)})
  },
  regex:phase_b.b1.regex,
  dests:phase_b.b1.dests.map(x => new Exit(x)).concat(
    new Exit('C0', {
      simpleUse:function(char){
      if (phase_b.gate % phase_b.condition === 0){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(phase_b.unavailable)
      } 
    })
  ),
})


createRoom('B2', {
  headingAlias: phase_b.b2.alias,
  desc: phase_b.b2.desc,
  afterEnter: function(){
    setHint(phase_b.b2.hint, phase_b)
    phase_b.b2.images.forEach(element => {picture(element,600)})
  },
  regex:phase_b.b2.regex,
  dests:phase_b.b2.dests.map(x => new Exit(x)).concat(
    new Exit('C0', {
      simpleUse:function(char){
      if (phase_b.gate % phase_b.condition === 0){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(phase_b.unavailable)
      } 
    })
  ),
})

createRoom('B3', {
  headingAlias: phase_b.b3.alias,
  desc: phase_b.b3.desc,
  afterEnter: function(){setHint(phase_b.b3.hint, phase_b)},
  regex:phase_b.b3.regex,
  dests:phase_b.b3.dests.map(x => new Exit(x)).concat(
    new Exit('C0', {
      simpleUse:function(char){
      if (phase_b.gate % phase_b.condition === 0){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(phase_b.unavailable)
      } 
    })
  ),
})

createRoom('B4', {
  headingAlias: phase_b.b4.alias,
  desc: phase_b.b4.desc,
  afterFirstEnter: function(){mandatory(phase_b, 5)},
  afterEnter: function(){setHint(phase_b.b4.hint, phase_b)},
  regex:phase_b.b4.regex,
  dests:phase_b.b4.dests.map(x => new Exit(x)).concat(
    new Exit('C0', {
      simpleUse:function(char){
      if (phase_b.gate % phase_b.condition === 0){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(phase_b.unavailable)
      } 
    })
  ),
})

createRoom('B5', {
  headingAlias: phase_b.b5.alias,
  desc: phase_b.b5.desc,
  afterEnter: function(){setHint(phase_b.b5.hint, phase_b)},
  regex:phase_b.b5.regex,
  dests:[
    new Exit('B5A',{
      simpleUse:function(char){
        if (false){
            return util.defaultSimpleExitUse(char, this)
          }else return falsemsg(phase_b.b5A.hint)
        } 
    }),
    new Exit('B5B'),
  ]
  
})

createRoom('B5A', {
  headingAlias: phase_b.b5A.alias,
  desc: phase_b.b5A.desc,
  afterEnter: function(){setHint(phase_b.b5A.hint, phase_b)},
  regex:phase_b.b5A.regex,
  synonyms: phase_b.b5A.synonyms,
  dests:[]
})

createRoom('B5B', {
  headingAlias: phase_b.b5B.alias,
  desc: phase_b.b5B.desc,
  afterFirstEnter: function(){mandatory(phase_b, 3)},
  afterEnter: function(){
    setHint(phase_b.b5B.hint, phase_b)
    phase_b.b5B.images.forEach(element => {picture(element,600)})
  },
  regex:phase_b.b5B.regex,
  synonyms: phase_b.b5B.synonyms,
  dests:phase_b.b5B.dests.map(x => new Exit(x)).concat(
    new Exit('C0', {
      simpleUse:function(char){
      if (phase_b.gate % phase_b.condition === 0){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(phase_b.unavailable)
      } 
    })
  ),
})

createRoom('B6', {
  headingAlias: phase_b.b6.alias,
  desc: phase_b.b6.desc,
  afterFirstEnter: function(){mandatory(phase_b, 2)},
  afterEnter: function(){setHint(phase_b.b6.hint, phase_b)},
  regex:phase_b.b6.regex,
  dests:phase_b.b6.dests.map(x => new Exit(x)).concat(
    new Exit('C0', {
      simpleUse:function(char){
      if (phase_b.gate % phase_b.condition === 0){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(phase_b.unavailable)
      } 
    })
  ),
})

createRoom('B7', {
  headingAlias: phase_b.b7.alias,
  desc: phase_b.b7.desc,
  afterEnter: function(){setHint(phase_b.b7.hint, phase_b)},
  regex:phase_b.b7.regex,
  dests:phase_b.b7.dests.map(x => new Exit(x)).concat(
    new Exit('C0', {
      simpleUse:function(char){
      if (phase_b.gate % phase_b.condition === 0){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(phase_b.unavailable)
      } 
    })
  ),
})

createRoom('B8', {
  headingAlias: phase_b.b8.alias,
  desc: phase_b.b8.desc,
  afterEnter: function(){setHint(phase_b.b8.hint, phase_b)},
  regex:phase_b.b8.regex,
  dests:phase_b.b8.dests.map(x => new Exit(x)).concat(
    new Exit('C0', {
      simpleUse:function(char){
      if (phase_b.gate % phase_b.condition === 0){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(phase_b.unavailable)
      } 
    })
  ),
})

// SPATIAL FILTER PHASE DATA

createRoom('C0', {
  headingAlias: phase_c.c0.alias,
  desc: phase_c.c0.desc,
  afterEnter: function(){setHint(phase_c.c0.hint, phase_c)},
  regex:phase_c.c0.regex,
  dests:phase_c.c0.dests.map(x => new Exit(x))
})