"use strict"

parser.isRoom =function(o) { return o.room }

commands.unshift(new Cmd('GoTo', {
  npcCmd:true,
  regex:/^(?:go to|go|perform|plot) (.+)$/,
  objects:[
    {scope:parser.isRoom}
  ],
  script:function(objects) {
    const room = objects[0][0]
    if (room === currentLocation) return failedmsg("As if by magic, you are suddenly... where you already were.")
    if (!room.room) return failedmsg("{pv:item:be:true} not a destination.", {item:room})
    for (const ex of currentLocation.dests) {
      log(ex.name)
      if (room.name === ex.name) {
        return ex.use(player, ex) ? world.SUCCESS : world.FAILED
      }
    }
    return failedmsg("{pv:item:be:true} is... something you probably shouldn't be doing right now.", {item:room})
  },
}))