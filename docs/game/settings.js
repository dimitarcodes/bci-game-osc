"use strict"

settings.title = "The Mad Thesis Supervisor"
settings.author = "Da TAs 😎"
settings.version = "0.68"
settings.thanks = ["Michael Tangermann and Jordy Thielen for getting us the extra $$$"]
settings.warnings = "No warnings have been set for this game."
settings.playMode = "beta"

//turn off compass
settings.compassPane = false
settings.statusPane = false
settings.inventoryPane = [] // disable inventory pane while keeping the refresh
settings.go_successful = [] //disable the annoying message that says go to (prev room)

settings.roomCreateFunc = function(o) {
    if (o.dests) {
        for (const ex of o.dests) {
        ex.origin = o
        ex.dir = 'to ' + (o.dirAlias ? o.dirAlias : o.alias)
        }
    }
}