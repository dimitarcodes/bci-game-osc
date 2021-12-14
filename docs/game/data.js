"use strict"

createItem("me", PLAYER(), {
  loc:"A0",
  synonyms:['me', 'myself'],
  examine: "An excited BCI student.",
})

function setHint(hint, phase){
  findCmd('MetaHint').script = function() {
    metamsg(hint+" "+phase.hint)
    return world.SUCCESS_NO_TURNSCRIPTS
  }
}

function mandatory(phase, prime, print_phase_available=true){
  phase.gate = phase.gate*prime
  if (phase.gate % phase.condition === 0) {
    phase.hint = phase.available
    if (print_phase_available){
      msg(phase.available)
    }
  }
}

function getRandomInt(max) {
  return 1 + Math.floor(Math.random() * max);
}

// EXPLORATORY PHASE DATA

var phase_a = []
phase_a.gate = 1;
phase_a.condition = 6;
phase_a.unavailable = "You can probably still explore a bit more. Do you know if the experiment was focussed on ERPs or oscillations? ;)"
phase_a.available = " You already have all the important information. You can probably move on to the preprocessing phase - type 'go to preprocessing phase'."
phase_a.hint = ""

phase_a.a0 = []
phase_a.a0.alias = "Introduction"
phase_a.a0.desc = "Hi! Welcome to this interactive BCI experience! In this little game you will go through a short story and analysis pipeline. No fear, no 'spooky' code this time. The game is structured as follows: you move between states by performing certain actions, these actions can be performed by typing out what has to be done (e.g., 'plot frequency spectrum' / 'inspect marker file' / 'apply PCA' etc.). <br> It is important that you always start your action with one of the following words: <br><br><i>perform / plot/ apply / inspect / exammine /look at/ explore / use / remove / pick / choose / select / compute / ask about / go to</i><br><br> If at any point you are lost or unsure how things work, you can always type 'help'. <br> <br> Are you ready? Type: 'go to first thesis meeting'"
phase_a.a0.hint = "Go ahead - type 'go to the first meeting'"
phase_a.a0.dests = ['A1']

phase_a.a1 = []
phase_a.a1.alias = "The First Thesis Meeting"
phase_a.a1.desc = "Your silly thesis supervisor has bought some EEG data from some sketchy website. He just clicked 'Download' on the zip file and then cleared his browser history. Now you have no idea what experiment the data came from and what its specs are. Your supervisor is persistent in that you should be able to get a good model from this data. 'I had a PhD student that worked on that data! When he had trained a good model, he called me that he was on his way to show me, but then mysterously vanished... So now it's up to you to do put your BCI skills to some good use, go get me some results!' <br> You: 'Where exactly did you get the data from?' <br> Sup: 'Uuuuuhm.... the internet?'  <br> You: 'Do you remember what the experiment was?' <br> Sup: 'Nope, but inspecting the data and looking at the markers should be a good starting point, off you go!'"
phase_a.a1.hint = "Hmm.. the supervisor told me to inspect the data and especially the markers, I guess I should do that."
phase_a.a1.dests = ['M0','A3','A4','A5']
phase_a.a1.regex = /^(.*)(meeting|thesis)(.*)$/

phase_a.a3 = []
phase_a.a3.alias = "Exploring the markers"
phase_a.a3.desc = "You take a look at the markers encoded in the metadata of the files, it appears that there are a few markers used in this dataset:  <br> Event - Description <br>276 - Idling EEG (eyes open) <br>277- Idling EEG (eyes closed) <br>768 - Start of a trial <br>769 - Cue onset left hand MI (class 1) <br>770 - Cue onset right hand MI (class 2) <br>783 - Cue unknown <br>1023 - Rejected trial <br>1072 - Eye movements <br>32766 - Start of a new run <br> <br> You also see that there is roughly 10 seconds between markers. That is quite long for events? "
phase_a.a3.hint = "What does timing of the events tell us about the type of paradigm? Is it an ERP experiment? Or are we in the oscillatory domain? What does the naming of the markers tell us about the paradigm? <br> I should probably also check the specs of the recordings, like the sampling frequency, before I start preprocessing."
phase_a.a3.dests = ['M0','A4','A5']
phase_a.a3.regex = /^(.*)(event|marker)(.*)$/

phase_a.a4 = []
phase_a.a4.alias = "Sampling frequecy"
phase_a.a4.desc = "You take a look at the sampling frequency encoded in the metadata of the files, it appears that the data was sampled at 250Hz."
phase_a.a4.hint = "I now know the sampling frequency, if I also know the type of paradigm I can start preprocessing!"
phase_a.a4.dests = ['M0','A3','A5']
phase_a.a4.regex = /^(.*)(sampl(.*)frequency|sampl(.*)rate)$/
///^(.*)(sampling frequency|sampling rate)(.*)$/

phase_a.a5 = []
phase_a.a5.alias = "Exploring the EEG Channels"
phase_a.a5.desc = "There are 22 EEG channels, sadly their naming scheme isn't very informative about the layout"
phase_a.a5.hint = "I need to know some information before I can start preprocessing... What is the experimental setup such as task and sampling frequency?"
phase_a.a5.dests = ['M0','A3','A4']
phase_a.a5.regex = /^(.*)(channels)(.*)$/

// PREPROCESSING PHASE DATA

var phase_b = []
phase_b.gate = 1;
phase_b.condition = 14;
phase_b.unavailable = "You can probably still do something else as well. Have you made sure the time and frequency domains of the data are in the shape we expect them to be? ;)"
phase_b.available = " You've already done the most important steps of this phase. You can probably move on to the spatial filter selection phase - type 'go to spatial filtering phase'."
phase_b.hint = ""

phase_b.b0 = []
phase_b.b0.alias = "Start Preprocessing"
phase_b.b0.desc = "You have done some exploration, now it's time to start preprocessing the data. Think about all the steps you've learned throughout the course. There are numerous things to be done here, what is typically done before we move to actual analysis or training models? Think about the time and frequency domain of the signal, what can we alter/limit such that we can reap the benefits later on? "
phase_b.b0.hint = "Can we reduce the sampling rate to speed up later processes? Should we split up the data?"
phase_b.b0.dests = ['B1','M0','B3','B4','B5','B6']
phase_b.b0.regex = /^(.*)(preprocess|pre-process)(.*)$/

phase_b.b1 = []
phase_b.b1.alias = "Eye movements"
phase_b.b1.desc = "From the markers we know when the participant performed large eye-movements: The activity does not seem very extreme nor does it differ much per channel, the electrodes are probably not close to the eyes of the participant."
phase_b.b1.hint = "We can still try to check for and remove noisy channels! Go ahead ;) It is however also crucial we limit the number of samples in some way to speed up later processes."
phase_b.b1.images = ['B1.png']
phase_b.b1.dests = ['M0','B3','B4','B5','B6']
phase_b.b1.regex = /^(.*)(eye|blink)(.*)$/

phase_b.b3 = []
phase_b.b3.alias = "Remove noisy channels"
phase_b.b3.desc = "You tried removing noisy channels by using a min-max threshold criterion. No channels were removed from the data. There are already only 22 channels in the data, perhaps the noisy channels were already removed before publication."
phase_b.b3.hint = "There are other steps in the preprocessing phase that are also required. Can we limit the number of samples for example? Do we have to split up the signals in some way?"
phase_b.b3.dests = ['B1','M0','B4','B5','B6']
phase_b.b3.regex = /^(.*)(nois|outlier)(.*)$/

phase_b.b4 = []
phase_b.b4.alias = "Downsampling"
phase_b.b4.desc = "You down-sample the data to 100Hz. This will speed up future processes significantly."
phase_b.b4.hint = "This was a step we wanted you to do, good job. It is however still important you do at least 1 other important step in the preprocessing phase before we can learn anything."
phase_b.b4.dests = ['B1','M0','B3','B5','B6']
phase_b.b4.regex = /^(.*)(resampl|downsampl)(.*)$/

phase_b.b5 = []
phase_b.b5.alias = "Spectral filtering"
phase_b.b5.desc = "You want to spectral filter the data, smart! What frequency band do you think is best in this scenario?: <br> <br> A: [1 - 10] Hz <br> B: [7-20] Hz <br> <br> type: 'choose band A' or 'choose band B' to continue "
phase_b.b5.desc_epoched = "You want to spectral filter the data, smart! Usually this would be a bad idea after epoching, but thankfully you took epochs with enough time for the filters to warm up. What frequency band do you think is best in this scenario?: <br> <br> A: [1 - 10] Hz <br> B: [7-20] Hz <br> <br> type: 'choose band A' or 'choose band B' to continue "
phase_b.b5.hint = "Do you know what the paradigm is? What were the markers? What frequency band should at least be in the range of our filter?"
phase_b.b5.dests = ['B5A', 'B5B'] // manually
phase_b.b5.regex = /^(.*)(spectr(.*)filter|bandpass filter|frequency filter)(.*)$/

phase_b.b5A = []
phase_b.b5A.alias = "Filter band A"
phase_b.b5A.desc = "You applied a band pass filter that limited the frequency contents to the [1-10] Hz band."
phase_b.b5A.hint = "Did you already limit the number of samples to speed up processing later on?"
phase_b.b5A.images = ['B5A.png']
phase_b.b5A.dests = ['B1','M0','B3','B4','B6']
phase_b.b5A.regex = /^(.*)(band a)(.*)$/

phase_b.b5B = []
phase_b.b5B.alias = "Filter band B"
phase_b.b5B.desc = "You applied a band pass filter that limited the frequency contents to the [7-20] Hz band. Hopefully you did this because you know this is a motor imagery task and attempted to preserve content related to this task and didn't just guess the answer.."
phase_b.b5B.hint = "Did you already limit the number of samples to speed up processing later on?"
phase_b.b5B.images = ['B5B.png']
phase_b.b5B.dests = ['B1','M0','B3','B4','B6']
phase_b.b5B.regex = /^(.*)(band b)(.*)$/

phase_b.b6 = []
phase_b.b6.alias = "Epoching"
phase_b.b6.desc = "You cut the data into epochs of [-1, 7]s, such that each epoch contains the EEG-signals of one of the two classes. Remember the markers, these contain the classes we are interested in."
phase_b.b6.hint = "This could be the last step of the preprocessing phase. You could try to 'go to choosing spatial filter'. If you're not allowed to do so, you probably missed a step."
phase_b.b6.dests = ['B1','M0','B3','B4','B5']
phase_b.b6.regex = /^(.*)(epoch)(.*)$/

// SPATIAL FILTERING PHASE DATA
var phase_c = []
phase_c.gate = 1;
phase_c.condition = 2;
phase_c.unavailable = "You're still missing a crucial step!"
phase_c.available = ""
phase_c.hint = ""

phase_c.c0 = []
phase_c.c0.alias = "Choosing spatial filter"
phase_c.c0.desc = "You've finished preprocessing the data. Now it's time to bring the data into a space such that we can perform some analysis or train a model."
phase_c.c0.hint = "Remember the markers, what can we do with this data? We want to bring the data into a space/shape such that we can learn something useful from this paradigm.",
phase_c.c0.dests = ['C1', 'C2', 'C3']
phase_c.c0.regex = /^(.*)(spatial)(.*)$/

phase_c.c1 = []
phase_c.c1.alias = 'PCA'
phase_c.c1.desc = 'You apply Principal Component Analysis and receive 22 components. What else can you do, what are we working towards?'
phase_c.c1.hint = 'Remember the markers, what are the targets? Do we want to work towards classification or regression?'
phase_c.c1.dests = ['C2', 'C3']
phase_c.c1.unavailable = "Great that you're already thinking about PCA, but we'll keep that along with other spatial filtering methods for the next phase - 'spatial filter phase'. We'll tell you once you can move on to that phase ;)"
phase_c.c1.regex = /^(.*)(pca|principal component)(.*)$/

phase_c.c2 = []
phase_c.c2.alias = 'ICA'
phase_c.c2.desc = 'You apply Independent Component Analysis and receive 22 components. What else can you do, what are we working towards?'
phase_c.c2.hint = 'Remember the markers, what are the targets? Do we want to work towards classification or regression?'
phase_c.c2.dests = ['C1', 'C3']
phase_c.c2.unavailable = "Great that you're already thinking about ICA, but we'll keep that along with other spatial filtering methods for the next phase - 'spatial filter phase'. We'll tell you once you can move on to that phase ;)"
phase_c.c2.regex = /^(.*)(ica|independent component)(.*)$/

phase_c.c3 = []
phase_c.c3.alias = "CSP"
phase_c.c3.desc = "You use CSP to project the data. You receive 22 components. You decided to select 4 out of these 22 CSP components, which ones do you take?: <br> <br> A: 4 with the largest eigenvalues <br> B: 2 from both sides of the eigenvalue spectrum <br> C: 4 with the smallest eigenvalues <br> <br> type: 'select component set A', 'select component set B' or 'select component set C' to continue."
phase_c.c3.hint = "What do the filters of CSP learn? What do the filters from both sides of the spectrum stand for? What information does the band-power of the CSP components have? Can you transform this information into features?"
phase_c.c3.dests = ['D1A','D1B','D1C']
phase_c.c3.regex = /^(.*)(csp|common spatial pattern)(.*)$/

phase_c.c4 = []
phase_c.c4.alias = "SPoC"
phase_c.c4.desc = "Are you sure? What were the markers? What is SPoC used for? Is there a better method?"
phase_c.c4.dests = [] //sinkstate
phase_c.c4.regex = /^(.*)(spoc|source power comodulation)(.*)$/

var phase_d = []
phase_d.gate = 1
phase_d.condition = 1
phase_d.unavailable = "You're still missing a crucial step!"
phase_d.available = "You *could* already go to the next phase: 'model selection'. IF you wish to do that, type 'go to model selection'."
phase_d.hint = ""

phase_d.d1A = []
phase_d.d1A.alias = "Components with the largest eigenvalues"
phase_d.d1A.desc = "For each epoch, you reduce t he number of components to only 4, namely the ones with the largest corresponding eigenvalues. Can you transform these components into features for a model to train on?"
phase_d.d1A.hint = "What information does the power of the CSP components have? Can you transform this information into features?"
phase_d.d1A.dests = ['D2', 'D3', 'D4', 'E0']
phase_d.d1A.regex = /^(.*)(component set a)(.*)$/

phase_d.d1B = []
phase_d.d1B.alias = "Components from both sides of the spectrum"
phase_d.d1B.desc = "For each epoch, you reduce the number components to only 4 in total, 2 from both sides of the eigenvalue spectrum. Can you transform these components into features for a model to train on?"
phase_d.d1B.hint = "What information does the power of the CSP components have? Can you transform this information into features?"
phase_d.d1B.dests = ['D2', 'D3', 'D4', 'E0']
phase_d.d1B.regex = /^(.*)(component set b)(.*)$/

phase_d.d1C = []
phase_d.d1C.alias = "Components with the smallest eigenvalues"
phase_d.d1C.desc = "For each epoch, you reduce t he number of components to only 4, namely the ones with the smallest corresponding eigenvalues. Can you transform these components into features for a model to train on?"
phase_d.d1C.hint = "What information does the power of the CSP components have? Can you transform this information into features?"
phase_d.d1C.dests = ['D2', 'D3', 'D4', 'E0']
phase_d.d1C.regex = /^(.*)(component set c)(.*)$/

phase_d.d2 = []
phase_d.d2.alias = "Compute average amplitdue"
phase_d.d2.desc = "For each component, you compute the average amplitude. <br> You have now entered the 'model selection' phase as there was nothing left for you to do in this feature extraction phase."
phase_d.d2.hint = "Why the average? What can we do with these values?"
phase_d.d2.dests = ['E0']
phase_d.d2.regex = /^(.*)(average amplitude|average csp component|average component)(.*)$/

phase_d.d3 = []
phase_d.d3.alias = "Compute average log-band power"
phase_d.d3.desc = "For each component, you compute the average log band power. <br> You have now entered the 'model selection' phase as there was nothing left for you to do in this feature extraction phase."
phase_d.d3.hint = "Why the average? What can we do with these values?"
phase_d.d3.dests = ['E0']
phase_d.d3.regex = /^(.*)(band-power|bandpower|band power)(.*)$/

phase_d.d4 = []
phase_d.d4.alias = "Compute average Hilbert transform / envelope"
phase_d.d4.desc = "For each component, you compute the average envelope. <br> You have now entered the 'model selection' phase as there was nothing left for you to do in this feature extraction phase."
phase_d.d4.hint = "Why the average? What can we do with these values?"
phase_d.d4.dests = ['E0']
phase_d.d4.regex = /^(.*)(hilbert|envelope)(.*)$/

var phase_e = []
phase_e.gate = 1
phase_e.condition = 30
phase_e.unavailable = "You're still missing a step."
phase_e.available = "You've already done the most important steps of this phase. You can probably move on to deciding on what model you're going to use - type 'select model'"
phase_e.hint = ""

phase_e.e0 = []
phase_e.e0.alias = "Model selection"
phase_e.e0.desc = "You've entered the model selection phase. Now it's time to choose what type of model you'll be using to make predictions about the data."
phase_e.e0.hint = "You have extracted features from last phase and already have labels (epoch markers), what model is suited for training on this data?",
phase_e.e0.dests = ['E1A', 'E1B','E3']
phase_e.e0.regex = /^(model)(.*)$/

phase_e.e1A = []
phase_e.e1A.alias = "LDA"
phase_e.e1A.desc = "You decided to use LDA for classification. You have now entered the 'evaluation strategy selection' phase."
phase_e.e1A.hint = "You haven't yet trained your model, how do you evaluate your decision?",
phase_e.e1A.dests = ['E1B']
phase_e.e1A.regex = /^(lda|linear discriminant analysis)(.*)$/

phase_e.e1B = []
phase_e.e1B.alias = "Shrinkage LDA"
phase_e.e1B.desc = "You decided to use LDA with shrinkage for classification. You have now entered the 'evaluation strategy selection' phase."
phase_e.e1B.hint = "You haven't yet trained your model, how do you evaluate your decision?",
phase_e.e1B.dests = []
phase_e.e1B.regex = /^(.*)(shrinkage|regularize|regularise)(.*)$/

phase_e.e2 = []
phase_e.e2.alias = "Linear regression"
phase_e.e2.desc = "You wanted to use linear regression. Are you sure about that? What were the markers? Is there a better model for this situation?"
phase_e.e2.hint = "Is this a classification or regression problem?",
phase_e.e2.dests = [] //sinkstate
phase_e.e2.regex = /^(.*)(linear regression|least squares)(.*)$/

phase_e.e3 = []
phase_e.e3.alias = "Logistic regression"
phase_e.e3.desc = "You decided to use logistic regression for classification. You have now entered the 'evaluation strategy selection' phase."
phase_e.e3.hint = "You haven't yet trained your model, how do you evaluate your decision?",
phase_e.e3.dests = []
phase_e.e3.regex = /^(.*)(logistic regression)(.*)$/

var phase_f = []
phase_f.gate = 1
phase_f.condition = 30
phase_f.unavailable = "You're still missing a step."
phase_f.available = "You've already done the most important steps of this phase. You can probably move on to the evaluation phase - type 'select validation strategy'"
phase_f.hint = ""

phase_f.f0 = []
phase_f.f0.alias = "Evaluation strategy selection"
phase_f.f0.desc = "Now it's time to determine how you will be evaluating your model."
phase_f.f0.hint = "What validation methods have been discussed? Is there a way to get a performance metric?",
phase_f.f0.dests = ['F1', 'F2', 'F3'] 
phase_f.f0.regex = /^(.*)(evaluation|validation)(.*)$/

phase_f.f1 = []
phase_f.f1.alias = "AUC ROC"
phase_f.f1.desc = "You decide to evaluate your model using ROC-AUC."
phase_f.f1.dests = [] 
phase_f.f1.regex = /^(.*)(auc|area under the curve)(.*)$/

phase_f.f2 = []
phase_f.f2.alias = "Classification accuracy"
phase_f.f2.desc = "You decide to evaluate your model using classification accuracy."
phase_f.f2.dests = []
phase_f.f2.regex = /^(.*)(accuracy)(.*)$/

phase_f.f3 = []
phase_f.f3.alias = "Cross-validation"
phase_f.f3.desc = "You decide to evaluate your model using cross-validation."
phase_f.f3.dests = [] 
phase_f.f3.regex = /^(.*)(cross-validation|cross validation)(.*)$/


var phase_g = []
phase_g.hint = "",
phase_g.available = "",
phase_g.unavailable = "",
phase_g.gate = 1,
phase_g.condition = 2,
phase_g.g0 = []
phase_g.g0.alias = "Running the pipeline..."
phase_g.g0.msg1 = "Performing awesome analysis..."
phase_g.g0.msg2 = "Any second now..."
phase_g.g0.msg3 = "aaaand we're done :) you can now inspect your results"
phase_g.g0.desc = ""
phase_g.g0.hint = "Go ahead - type 'inspect results' to see how well you did :)"
phase_g.g0.dests=['G1']

phase_g.g1 = []
phase_g.g1.alias = "Results"
phase_g.g1.hint = "You can post these results on brightspace if you're proud of them, or if you think you can do better - refresh the page and start over :) <br><br> note that refreshing the page means you will lose all your progress so write down the steps you took somewhere - we'll probably ask you about how you got to that state if you're one of the winners."
phase_g.g1.desc = ""
phase_g.g1.regex = /^(.*)(results|performance)(.*)$/

var data_state = 0;
var phase_counter = 0;
// miscelleneaous 1 - plot PSD

var misc = []
misc.psd = []
misc.psd.alias = "Plot PSD"
misc.psd.desc = ["You plot the raw data and the raw data's frequency spectrum (PSD)", "You plot the data's frequency spectrum (PSD)", "You plot the data's frequency spectrum (PSD)"]
misc.psd.images = [['A2_1.png', 'A2_2.png'], ['B5A.png'], ['B5B.png']]
misc.psd.denied  = ["You're no longer in exploratory phase", "You're not in the preprocessing phase right now."]
misc.psd.regex = /^(.*)(data|frequency spectrum|spectrum|spectrogram|psd)(.*)$/

createRoom("M0", {
  headingAlias: misc.psd.alias,
  desc: "",
  afterEnter: function(){
    msg(misc.psd.desc[data_state])
    misc.psd.images[data_state].forEach(element => {picture(element,600)})
  },
  regex: misc.psd.regex,
  dests: [ 
    new Exit('A3', { simpleUse : function(char){
      if (phase_counter === 0){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(misc.psd.denied[0])
      } 
    }),
    new Exit('A4', { simpleUse : function(char){
      if (phase_counter === 0){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(misc.psd.denied[0])
      } 
    }),
    new Exit('A5', { simpleUse : function(char){
      if (phase_counter === 0){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(misc.psd.denied[0])
      } 
    }),
    new Exit('B0', { simpleUse : function(char){
      if (phase_counter ===0 && phase_a.gate % phase_a.condition === 0){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(phase_a.unavailable)
      } 
    }),
    new Exit('B1', { simpleUse : function(char){
      if (phase_counter === 1){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(misc.psd.denied[1])
      } 
    }),
    new Exit('B3', { simpleUse : function(char){
      if (phase_counter === 1){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(misc.psd.denied[1])
      } 
    }),
    new Exit('B4', { simpleUse : function(char){
      if (phase_counter === 1){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(misc.psd.denied[1])
      } 
    }),
    new Exit('B5', { simpleUse : function(char){
      if (phase_counter === 1){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(misc.psd.denied[1])
      } 
    }),
    new Exit('B6', { simpleUse : function(char){
      if (phase_counter === 1){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(misc.psd.denied[1])
      } 
    }),
    new Exit('C1', { simpleUse : function(char){
      if (phase_counter === 2){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(misc.psd.denied[1])
      } 
    }),
    new Exit('C2', { simpleUse : function(char){
      if (phase_counter === 2){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(misc.psd.denied[1])
      } 
    }),
    new Exit('C0', { simpleUse : function(char){
      if (phase_counter === 1 && phase_b.gate % phase_b.condition === 0){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(phase_b.unavailable)
      } 
    }),
  ]
})

// EXPLORATION PHASE CODE

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
  afterFirstEnter: function(){phase_counter = 1},
  headingAlias: phase_b.b0.alias,
  desc: phase_b.b0.desc,
  regex: phase_b.b0.regex,
  dests: phase_b.b0.dests.map(x => new Exit(x)),
  afterEnter: function(){setHint(phase_b.b0.hint, phase_b)}
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
    new Exit('C1',{
      simpleUse:function(char){
        if (false){
            return util.defaultSimpleExitUse(char, this)
          }else return falsemsg(phase_c.c1.unavailable)
        } 
    }),
    new Exit('C2',{
      simpleUse:function(char){
        if (false){
            return util.defaultSimpleExitUse(char, this)
          }else return falsemsg(phase_c.c2.unavailable)
        } 
    }),
    new Exit('C0', {
      simpleUse:function(char){
      if (phase_b.gate % phase_b.condition === 0){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(phase_b.unavailable)
      } 
    })
  ) 
})


createRoom('B3', {
  headingAlias: phase_b.b3.alias,
  desc: phase_b.b3.desc,
  afterEnter: function(){setHint(phase_b.b3.hint, phase_b)},
  regex:phase_b.b3.regex,
  dests:phase_b.b3.dests.map(x => new Exit(x)).concat(
    new Exit('C1',{
      simpleUse:function(char){
        if (false){
            return util.defaultSimpleExitUse(char, this)
          }else return falsemsg(phase_c.c1.unavailable)
        } 
    }),
    new Exit('C2',{
      simpleUse:function(char){
        if (false){
            return util.defaultSimpleExitUse(char, this)
          }else return falsemsg(phase_c.c2.unavailable)
        } 
    }),
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
  afterFirstEnter: function(){mandatory(phase_b, 2)},
  afterEnter: function(){setHint(phase_b.b4.hint, phase_b)},
  regex:phase_b.b4.regex,
  dests:phase_b.b4.dests.map(x => new Exit(x)).concat(
    new Exit('C1',{
      simpleUse:function(char){
        if (false){
            return util.defaultSimpleExitUse(char, this)
          }else return falsemsg(phase_c.c1.unavailable)
        } 
    }),
    new Exit('C2',{
      simpleUse:function(char){
        if (false){
            return util.defaultSimpleExitUse(char, this)
          }else return falsemsg(phase_c.c2.unavailable)
        } 
    }),
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
  desc: "", // so we can change the description dynamically
  afterEnter: function(){
    setHint(phase_b.b5.hint, phase_b)
    msg(phase_b.b5.desc)
  },
  regex:phase_b.b5.regex,
  dests: phase_b.b5.dests.map(x => new Exit(x))
})

createRoom('B5A', {
  headingAlias: phase_b.b5A.alias,
  desc: phase_b.b5A.desc,
  afterFirstEnter: function(){
    mandatory(phase_b, 3)
    data_state = 1
  },
  afterEnter: function(){
    setHint(phase_b.b5A.hint, phase_b)
    phase_b.b5A.images.forEach(element => {picture(element,600)})
  },
  regex:phase_b.b5A.regex,
  synonyms: phase_b.b5A.synonyms,
  dests:phase_b.b5A.dests.map(x => new Exit(x)).concat(
    new Exit('C1',{
      simpleUse:function(char){
        if (false){
            return util.defaultSimpleExitUse(char, this)
          }else return falsemsg(phase_c.c1.unavailable)
        } 
    }),
    new Exit('C2',{
      simpleUse:function(char){
        if (false){
            return util.defaultSimpleExitUse(char, this)
          }else return falsemsg(phase_c.c2.unavailable)
        } 
    }),
    new Exit('C0', {
      simpleUse:function(char){
      if (phase_b.gate % phase_b.condition === 0){
        return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(phase_b.unavailable)
      } 
    })
  ),
})

createRoom('B5B', {
  headingAlias: phase_b.b5B.alias,
  desc: phase_b.b5B.desc,
  afterFirstEnter: function(){
    mandatory(phase_b, 5)
    data_state = 2
  },
  afterEnter: function(){
    setHint(phase_b.b5B.hint, phase_b)
    phase_b.b5B.images.forEach(element => {picture(element,600)})
  },
  regex:phase_b.b5B.regex,
  synonyms: phase_b.b5B.synonyms,
  dests:phase_b.b5B.dests.map(x => new Exit(x)).concat(
    new Exit('C1',{
      simpleUse:function(char){
        if (false){
            return util.defaultSimpleExitUse(char, this)
          }else return falsemsg(phase_c.c1.unavailable)
        } 
    }),
    new Exit('C2',{
      simpleUse:function(char){
        if (false){
            return util.defaultSimpleExitUse(char, this)
          }else return falsemsg(phase_c.c2.unavailable)
        } 
    }),
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
  afterFirstEnter: function(){
    mandatory(phase_b, 7)
    if (!(phase_b.gate % 3 === 0 || phase_b.gate % 5 === 0)){
      phase_b.b5.desc = phase_b.b5.desc_epoched
    }
  },
  afterEnter: function(){setHint(phase_b.b6.hint, phase_b)},
  regex:phase_b.b6.regex,
  dests:phase_b.b6.dests.map(x => new Exit(x)).concat(
    new Exit('C1',{
      simpleUse:function(char){
        if (false){
            return util.defaultSimpleExitUse(char, this)
          }else return falsemsg(phase_c.c1.unavailable)
        } 
    }),
    new Exit('C2',{
      simpleUse:function(char){
        if (false){
            return util.defaultSimpleExitUse(char, this)
          }else return falsemsg(phase_c.c2.unavailable)
        } 
    }),
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
  afterFirstEnter: function(){phase_counter = 2},
  afterEnter: function(){setHint(phase_c.c0.hint, phase_c)},
  regex:phase_c.c0.regex,
  dests:phase_c.c0.dests.map(x => new Exit(x)).concat(
    new Exit('C4',{
    simpleUse:function(char){
      if (false){
          return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(phase_c.c4.desc)
      } 
  })),
})

createRoom('C1', {
  headingAlias: phase_c.c1.alias,
  desc: phase_c.c1.desc,
  afterEnter: function(){setHint(phase_c.c1.hint, phase_c)},
  regex:phase_c.c1.regex,
  dests:phase_c.c1.dests.map(x => new Exit(x)).concat(
    new Exit('C4',{
    simpleUse:function(char){
      if (false){
          return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(phase_c.c4.desc)
      } 
  })),
})

createRoom('C2', {
  headingAlias: phase_c.c2.alias,
  desc: phase_c.c2.desc,
  afterEnter: function(){setHint(phase_c.c2.hint, phase_c)},
  regex:phase_c.c2.regex,
  dests:phase_c.c2.dests.map(x => new Exit(x)).concat(
    new Exit('C4',{
    simpleUse:function(char){
      if (false){
          return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(phase_c.c4.desc)
      } 
  })),
})

createRoom('C3', {
  headingAlias: phase_c.c3.alias,
  desc: phase_c.c3.desc,
  afterFirstEnter: function(){mandatory(phase_c, 2)},
  afterEnter: function(){setHint(phase_c.c3.hint, phase_c)},
  regex:phase_c.c3.regex,
  dests:phase_c.c3.dests.map(x => new Exit(x))
})

createRoom('C4', {
  headingAlias: phase_c.c4.alias,
  desc: phase_c.c4.desc,
  regex:phase_c.c4.regex,
  dests:[]
})

createRoom('D1A', {
  headingAlias: phase_d.d1A.alias,
  desc: phase_d.d1A.desc,
  afterFirstEnter: function(){mandatory(phase_d, 2)},
  afterEnter: function(){
    setHint(phase_d.d1A.hint, phase_d)},
  regex:phase_d.d1A.regex,
  dests:phase_d.d1A.dests.map(x => new Exit(x))
})
createRoom('D1B', {
  headingAlias: phase_d.d1B.alias,
  desc: phase_d.d1B.desc,
  afterFirstEnter: function(){mandatory(phase_d, 3)},
  afterEnter: function(){
    setHint(phase_d.d1B.hint, phase_d)},
  regex:phase_d.d1B.regex,
  dests:phase_d.d1B.dests.map(x => new Exit(x))
})

createRoom('D1C', {
  headingAlias: phase_d.d1C.alias,
  desc: phase_d.d1C.desc,
  afterFirstEnter: function(){mandatory(phase_d, 5)},
  afterEnter: function(){
    setHint(phase_d.d1C.hint, phase_d)},
  regex:phase_d.d1C.regex,
  dests:phase_d.d1C.dests.map(x => new Exit(x))
})

createRoom('D2', {
  headingAlias: phase_d.d2.alias,
  desc: phase_d.d2.desc,
  afterEnter: function(){
    mandatory(phase_d, 7, false)
    util.defaultSimpleExitUse(game.player, new Exit('E0'))},
  regex:phase_d.d2.regex,
  dests:phase_d.d2.dests.map(x => new Exit(x))
})

createRoom('D3', {
  headingAlias: phase_d.d3.alias,
  desc: phase_d.d3.desc,
  afterEnter: function(){
    mandatory(phase_d, 11,false)
    util.defaultSimpleExitUse(game.player, new Exit('E0'))},
  regex:phase_d.d3.regex,
  dests:phase_d.d3.dests.map(x => new Exit(x))
})

createRoom('D4', {
  headingAlias: phase_d.d4.alias,
  desc: phase_d.d4.desc,
  afterEnter: function(){
    mandatory(phase_d, 13,false)
    util.defaultSimpleExitUse(game.player, new Exit('E0'))},
  regex:phase_d.d4.regex,
  dests:phase_d.d4.dests.map(x => new Exit(x))
})


createRoom('E0', {
  headingAlias: phase_e.e0.alias,
  desc: phase_e.e0.desc,
  regex: phase_e.e0.regex,
  afterEnter: function(){setHint(phase_e.e0.hint, phase_e)},
  dests:phase_e.e0.dests.map(x => new Exit(x)).concat(
    new Exit('E2',{
    simpleUse:function(char){
      if (false){
          return util.defaultSimpleExitUse(char, this)
        }else return falsemsg(phase_e.e2.desc)
      } 
  })),
})

createRoom('E1A', {
  headingAlias: phase_e.e1A.alias,
  desc: phase_e.e1A.desc,
  regex: phase_e.e1A.regex,
  afterEnter: function(){
    mandatory(phase_e,2)
    util.defaultSimpleExitUse(game.player, new Exit('F0'))},
  dests:phase_e.e1A.dests.map(x => new Exit(x))
})

createRoom('E1B', {
  headingAlias: phase_e.e1B.alias,
  desc: phase_e.e1B.desc,
  regex: phase_e.e1B.regex,
  afterEnter: function(){
    mandatory(phase_e,3)
    util.defaultSimpleExitUse(game.player, new Exit('F0'))},
  dests:phase_e.e1B.dests.map(x => new Exit(x))
})


createRoom('E2', {
  headingAlias: phase_e.e2.alias,
  regex: phase_e.e2.regex,
  desc: phase_e.e2.desc,
  afterEnter: function(){setHint(phase_e.e2.hint, phase_e)},
  dests:[]
})


createRoom('E3', {
  headingAlias: phase_e.e3.alias,
  desc: phase_e.e3.desc,
  regex: phase_e.e3.regex,
  afterEnter: function(){
    mandatory(phase_e, 5)
    util.defaultSimpleExitUse(game.player, new Exit('F0'))
  },
  dests:phase_e.e3.dests.map(x => new Exit(x))
})

createRoom('F0', {
  headingAlias: phase_f.f0.alias,
  desc: phase_f.f0.desc,
  afterEnter: function(){setHint(phase_f.f0.hint, phase_f)},
  dests:phase_f.f0.dests.map(x => new Exit(x))
})

createRoom('F1', {
  headingAlias: phase_f.f1.alias,
  desc: phase_f.f1.desc,
  regex: phase_f.f1.regex,
  afterEnter: function(){
    mandatory(phase_f,2)
    util.defaultSimpleExitUse(game.player, new Exit('G0'))},
  dests:phase_f.f1.dests.map(x => new Exit(x))
})


createRoom('F2', {
  headingAlias: phase_f.f2.alias,
  desc: phase_f.f2.desc,
  regex: phase_f.f2.regex,
  afterEnter: function(){
    mandatory(phase_f,3)
    util.defaultSimpleExitUse(game.player, new Exit('G0'))},
  dests:phase_f.f2.dests.map(x => new Exit(x))
})


createRoom('F3', {
  headingAlias: phase_f.f3.alias,
  desc: phase_f.f3.desc,
  regex: phase_f.f3.regex,
  afterEnter: function(){
    mandatory(phase_e,5)
    util.defaultSimpleExitUse(game.player, new Exit('G0'))},
  dests:phase_f.f3.dests.map(x => new Exit(x))
})


createRoom('G0', {
  headingAlias: phase_g.g0.alias,
  desc: phase_g.g0.desc,
  afterEnter: function(){
    setHint(phase_g.g0.hint, phase_g)
    msg(phase_g.g0.msg1)
    picture("loading" + getRandomInt(11) + '.gif', 600)
    msg(phase_g.g0.msg2)
    //picture("loading" + getRandomInt(11) + '.gif', 600)
    msg(phase_g.g0.msg3)
  },
  dests:phase_g.g0.dests.map(x => new Exit(x))
})

createRoom('G1', {
  headingAlias: phase_g.g1.alias,
  desc: phase_g.g1.desc,
  regex: phase_g.g1.regex,
  afterEnter: function(){
    setHint(phase_g.g1.hint, phase_g)
    if (phase_b.gate % 5 == 0){
      if (phase_d.gate % 3 == 0){
        if (phase_d.gate % 7 == 0){
          if (phase_e.gate % 2 == 0){
            if (phase_f.gate % 2 == 0){
              picture('F1_E1A_D2.png', 600)
            }else if (phase_f.gate % 3 == 0){
              msg("You get accuracy of 57.14285714285714\%! That's pretty low :/")
            }else if (phase_f.gate % 5 == 0){
              msg("You get average cross-validation score of 50.02463054187192\%! Yikes D:")
            }
          } else if (phase_e.gate%3 == 0){
              if (phase_f.gate % 2 == 0){
                picture('F1_E1B_D2.png', 600)
              }else if (phase_f.gate % 3 == 0){ 
                msg("You get accuracy of 57.14285714285714\%! That's pretty low :/")
              }else if (phase_f.gate % 5 == 0){
                msg("You get average cross-validation score of 50.71428571428571\%! Yikes D:")
              }
            } else if (phase_e.gate%5 == 0){ 
              if (phase_f.gate % 2 == 0){ 
                picture('F1_E3_D2.png', 600)
              }else if (phase_f.gate % 3 == 0){
                msg("You get accuracy of 50\%! Yikes D:")
              }else if (phase_f.gate % 5 == 0){ 
                msg("You get average cross-validation score of 50.04926108374385\%! Yikes D:")
              }
            }
          } else if (phase_d.gate % 11 == 0){
            if (phase_e.gate % 2 == 0){ 
              if (phase_f.gate % 2 == 0){ 
                picture('F1_E1A_D3.png', 600)
              }else if (phase_f.gate % 3 == 0){ 
                msg("You get accuracy of 78.57142857142857\%!")
              }else if (phase_f.gate % 5 == 0){
                msg("You get average cross-validation score of 85.36945812807882\%!")
              }
            } else if (phase_e.gate%3 == 0){
                if (phase_f.gate % 2 == 0){ 
                  picture('F1_E1B_D3.png', 600)
                }else if (phase_f.gate % 3 == 0){ 
                  msg("You get accuracy of 78.57142857142857\%!")
                }else if (phase_f.gate % 5 == 0){
                  msg("You get average cross-validation score of 87.4384236453202\%!")
                }
              } else if (phase_e.gate%5 == 0){ 
                if (phase_f.gate % 2 == 0){ 
                  picture('F1_E3_D3.png', 600)
                }else if (phase_f.gate % 3 == 0){
                  msg("You get accuracy of 78.57142857142857\%!")
                }else if (phase_f.gate % 5 == 0){
                  msg("You get average cross-validation score of 87.41379310344828\%!")
                }
              }
          } else if (phase_d.gate % 13 == 0){ 
            if (phase_e.gate % 2 == 0){ 
              if (phase_f.gate % 2 == 0){ 
                picture('F1_E1A_D4.png', 600)
              }else if (phase_f.gate % 3 == 0){
                msg("You get accuracy of 71.42857142857143\%!")
              }else if (phase_f.gate % 5 == 0){ 
                msg("You get average cross-validation score of 81.92118226600984\%!")
              }
            } else if (phase_e.gate%3 == 0){ 
                if (phase_f.gate % 2 == 0){
                  picture('F1_E1B_D4.png', 600)
                }else if (phase_f.gate % 3 == 0){ 
                  msg("You get accuracy of 71.42857142857143\%!")
                }else if (phase_f.gate % 5 == 0){ 
                  msg("You get average cross-validation score of 79.08866995073891\%!")
                }
              } else if (phase_e.gate%5 == 0){ 
                if (phase_f.gate % 2 == 0){
                  picture('F1_E3_D4.png', 600)
                }else if (phase_f.gate % 3 == 0){
                  msg("You get accuracy of 71.42857142857143\%!")
                }else if (phase_f.gate % 5 == 0){
                  msg("You get average cross-validation score of 79.08866995073891\%!")
                }
              }
          }
          
      } else if (phase_d.gate % 2 == 0 || phase_d.gate % 5 == 0){
        msg("Yikes, you took the wrong CSP components and got chance-level performance :( Should've picked components from both ends of the eigenvalue spectrum")
      }
    } else if (phase_b.gate % 3 == 0) {
      msg("Yikes, you spectrally filtered the data to a band you don't care about. You obtained chance level performance, as the task at hand has information in the other band. Reload the page to try again, pay attention to the markers!")
    } else if (!(phase_b.gate % 3 == 0 ||  phase_b.gate%5 == 0)){
      if (phase_d.gate % 3 == 0){
        if (phase_d.gate % 7 == 0){
          if (phase_e.gate % 2 == 0){ 
            if (phase_f.gate % 2 == 0){ 
              picture('nf_F1_E1A_D2.png', 600)
            }else if (phase_f.gate % 3 == 0){
              msg("You get accuracy of 50\%! That's pretty low :/")
            }else if (phase_f.gate % 5 == 0){
              msg("You get average cross-validation score of 53.49753694581281\%! Yikes D:")
            }
          } else if (phase_e.gate%3 == 0){ 
              if (phase_f.gate % 2 == 0){ 
                picture('nf_F1_E1B_D2.png', 600)
              }else if (phase_f.gate % 3 == 0){ 
                msg("You get accuracy of 50\%! That's pretty low :/")
              }else if (phase_f.gate % 5 == 0){ 
                msg("You get average cross-validation score of 0.49334975369458134\%! Yikes D:")
              }
            } else if (phase_e.gate%5 == 0){ 
              if (phase_f.gate % 2 == 0){ 
                picture('nf_F1_E3_D2.png', 600)
              }else if (phase_f.gate % 3 == 0){ 
                msg("You get accuracy of 46.42857142857143\%! Yikes D:")
              }else if (phase_f.gate % 5 == 0){
                msg("You get average cross-validation score of 51.40394088669951\%! Yikes D:")
              }
            }
          } else if (phase_d.gate % 11 == 0){ 
            if (phase_e.gate % 2 == 0){ 
              if (phase_f.gate % 2 == 0){
                picture('nf_F1_E1A_D3.png', 600)
              }else if (phase_f.gate % 3 == 0){ 
                msg("You get accuracy of 75\%!")
              }else if (phase_f.gate % 5 == 0){ 
                msg("You get average cross-validation score of 62.63546798029557\%!")
              }
            } else if (phase_e.gate%3 == 0){ 
                if (phase_f.gate % 2 == 0){ 
                  picture('nf_F1_E1B_D3.png', 600)
                }else if (phase_f.gate % 3 == 0){ 
                  msg("You get accuracy of 60.71428571428571\%!")
                }else if (phase_f.gate % 5 == 0){
                  msg("You get average cross-validation score of 62.61083743842365\%!")
                }
              } else if (phase_e.gate%5 == 0){ 
                if (phase_f.gate % 2 == 0){ 
                  picture('nf_F1_E3A_D3.png', 600)
                }else if (phase_f.gate % 3 == 0){ 
                  msg("You get accuracy of 71.42857142857143\%!")
                }else if (phase_f.gate % 5 == 0){
                  msg("You get average cross-validation score of 62.61083743842364\%!")
                }
              }
          } else if (phase_d.gate % 13 == 0){ 
            if (phase_e.gate % 2 == 0){ 
              if (phase_f.gate % 2 == 0){ 
                picture('nf_F1_E1A_D4.png', 600)
              }else if (phase_f.gate % 3 == 0){ 
                msg("You get accuracy of 75\%!")
              }else if (phase_f.gate % 5 == 0){ 
                msg("You get average cross-validation score of 64.67980295566502\%!")
              }
            } else if (phase_e.gate%3 == 0){ 
                if (phase_f.gate % 2 == 0){ 
                  picture('nf_F1_E1B_D4.png', 600)
                }else if (phase_f.gate % 3 == 0){ 
                  msg("You get accuracy of 75\%!")
                }else if (phase_f.gate % 5 == 0){
                  msg("You get average cross-validation score of 64.67980295566502\%!")
                }
              } else if (phase_e.gate%5 == 0){ 
                if (phase_f.gate % 2 == 0){ 
                  picture('nf_F1_E3_D4.png', 600)
                }else if (phase_f.gate % 3 == 0){
                  msg("You get accuracy of 75\%!")
                }else if (phase_f.gate % 5 == 0){
                  msg("You get average cross-validation score of 62.58620689655172\%!")
                }
              }
          }
      }else if (phase_d.gate % 2 == 0 || phase_d.gate % 5 == 0){
        msg("Yikes, you took the wrong CSP components and got chance-level performance :( Should've picked components from both ends of the eigenvalue spectrum. You can reload the page to try again!")
      }
    } else {
      msg("Yikes, you applied both filters thinking we wouldn't think of that outcome, didn't you? Well now your data is just messed up, so of course you're gonna get chance level performance. What did you expect?")
    }
  },
  dests:[]
})
