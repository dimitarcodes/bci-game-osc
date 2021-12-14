"use strict"

parser.isRoom =function(o) { return o.room }

commands.unshift(new Cmd('GoTo', {
  npcCmd:true,
  regex:/^(?:go to|go|perform|plot|apply|inspect|explore|use|ask about the|ask about|ask|remove|pick|choose|select|compute|check|look at|look for|examine) (.+)$/,
  objects:[
    {scope:parser.isRoom}
  ],
  script:function(objects) {
    const room = objects[0][0]
    if (room === currentLocation) return failedmsg("You already performed that action action just now.")
    if (!room.room) return failedmsg("{pv:item:be:true} not a destination.", {item:room})
    for (const ex of currentLocation.dests) {
      log(ex.name)
      if (room.name === ex.name) {
        return ex.use(player, ex) ? world.SUCCESS : world.FAILED
      }
    }
    return failedmsg("Oopsie woopsie! You tried to perform an action that we didn't expect you to do!", {item:room})
  },
}))