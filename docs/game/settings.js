"use strict"

settings.title = "The Mad Thesis Supervisor"
settings.author = "Da TAs 😎"
settings.version = "0.4"
settings.thanks = ["Michael Tangermann and Jordy Thielen for getting us the extra $$$"]
settings.warnings = "No warnings have been set for this game."
settings.playMode = "dev"

//turn off compass
settings.compassPane = false
settings.statusPane = false
settings.inventoryPane = [] // disable inventory pane while keeping the refresh
settings.go_successful = [] //disable the annoying message that says go to (prev room)


settings.setup = function() {
    createAdditionalPane(0, "Skills", 'toolbox', function() {
        let html = ''
        for (const ex of currentLocation.dests) {
        const dest = w[ex.name]
        html += '<div style="margin-bottom: 10px;"><p class="item" onclick="runCmd(\'perform ' + dest.alias.toLowerCase() + '\')">' + dest.headingAlias + '</p></div>'
        }
        return html
    })
}
settings.roomCreateFunc = function(o) {
    if (o.dests) {
        for (const ex of o.dests) {
        ex.origin = o
        ex.dir = 'to ' + (o.dirAlias ? o.dirAlias : o.alias)
        }
    }
}

const walkthroughs = {
    a:[
        "go to meeting",
        "explore markers",
        "inspect sampling rate",
        "go to preprocessing phase",
        "plot PSD",
        "apply spectral filter",
        "choose band A",
        "plot PSD",
        "apply downsampling",
        "apply epoching",
        "apply spectral filter",
        "choose band A",
        //"go to spatial filtering phase"
    ],
    
    b:[
        "go to meeting",
        "explore markers",
        "inspect sampling rate",
        "go to preprocessing phase",
        "plot PSD",
        "apply spectral filter",
        "choose band B",
        "plot PSD",
        "apply downsampling",
        "apply epoching",
        "go to spatial filtering phase",
        "apply ICA",
        "apply SPoC",
        "apply CSP",
        "select component set B",
        "compute average amplitude"
    ]

  }
  