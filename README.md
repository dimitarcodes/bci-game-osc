# bci-game

# room template:

```javascript
let socing = 1; // use a variable to check if other rooms have been visited
createRoom("room_name", {
  alias: 'The actual room name that will be printed',
  desc: 'Text that will be displayed upon entering the room',
  afterFirstEnter: function(){
    // stuff inside this function will happen only after the first time the player enters the room
    socing = socing*3 // mark the room as visited using prime integer multiplication
  }
  afterEnter: function(){
    // stuff inside this function will happen every time the player enters the room entering
    msg("This will print a message)
  },
  dirAlias: 'Origin of the data',
  regex:/^(.*)(meeting|thesis)(.*)$/, //regex to match "(any number of symbols) meeting (any number of symbols)" or "(any number of symbols) thesis (any number of symbols)"
  synonyms: ['alternative name', 'another alternative name'], //alternative names that may be used by player to enter room
  dests:[
    new Exit('next_room'),
    new Exit('other_next_room'),
    new Exit('conditional_room', {
      simpleUse:function(char){ // char = player or another character that the player may ask to go through this exit
        if (socing % 30 === 0){ // if condition
          return util.defaultSimpleExitUse(char, this) // let the user pass through this Exit
        }else if (socing % 210 === 0){
            return util.defaultSimpleExitUse(char, new Exit('fake_room')) // if the other condition is met lead them to a different Exit
        }else return falsemsg("You can probably still explore a bit more ;)") // otherwise display a message and keep them in current room
      }
    })
  ],
})
```