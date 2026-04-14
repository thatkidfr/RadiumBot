# Radium Bot

I DO NOT THINK CHEATING IN CHESS IS GOOD. I MADE THIS A CHALLENGE FOR MYSELF. IF YOU GET BANNED WITH THIS BOT THAT IS YOUR FAULT. I DO NOT RECOMMEND USING THIS!!!!

**#1** undetectable [chess.com](https://www.chess.com/) stockfish bot out there ._.

## Setup
Copy the contents of the file:
```file
minified.txt
```
Next, add a bookmark to your chrome browser.

In your bookmarks bar: right click -> add page

<br>For the name, enter *"Radium Bot"*

For the url, paste in what you copied earlier from minified.txt<br>

## How to run
Begin by getting into a game on [chess.com](https://www.chess.com/).

Once you are in a game, **IMMEDIATELY** left click the bookmark you just created (before the first move is played)

You should see an overlay appear on the right side of your screen labled *Radium Bot* :)

## How to use - IMPORTANT

Firstly, here are all of the settings and what they do:
- depth
- eval diff
- reveal move
- reset fen
- toggle overlay
- toggle eval

### Depth
Depth represents the strength of the engine that the overlay uses. Using the default depth of 15 is highly reccomended. Any more or less will result in the engine taking too long or inaccurate moves.

### Eval Difference
The eval difference is the minimum eval difference for another alternative green arrow to appear with a cyan arrow. If you don't understand what that means, just keep it at the default value of 30.

### Reveal Move
Changes the keybind that reveals the best move(s).

### Reset Fen
Changes the keybind that resets fen. You should only manually reset fen if the engine begins to bug out. It is not perfect and may continue to result in a bugged engine.

### Toggle Overlay
Changes the keybind needed to toggle the overlay on and off.

### Toggle Eval
This toggles wether the eval of the position will be displayed on the overlay.

<br><br><br>

### Extra
MAKE SURE YOU ARE IN A GAME BEFORE CLICKING THE BOOKMARK!!!!

Avoid premoves as much as possible. Generally, premoving is safe. However, it runs the risk of the engine bugging out.

The eval displayed on the overlay might seem glitchy, but it's not. A positive eval value(+) represents that a player is winning - THIS PLAYER CHANGES EVERY TURN. For example, if it's your turn, and the eval bar displays a positive number, then you are winning.
If it's the opponents turn and the eval is positive, then the opponent is winning. 

You can view your opponents best move(s) during your turn as well.

The rapid time controls and up are the only time controls recommended if you don't want to get caught.

Especially if you don't want to get caught: ONLY USE THIS ENGINE A FEW MOVES PER GAME - particularly when you are wasting time and not sure what to play. The goal is to boost elo by a significant amount, not blatantly cheat and get banned. 
DO NOT play "robotic" moves that are obviously not human. 

This overlay is targeted towards more advanced chess players, particularly around 1300-1500 and up. Beginners may be more tempted to blatantly cheat with it more often and get banned.

## Error Logs
 - *Premove played - try manual reset*: This happens if a premove is played and the auto-restore fails. Try using the reset fen keybind - THIS DOES NOT GARENTEE THE ENGINE WILL STOP BUGGING OUT
 - *Auto-restore success*: This happens if a premove is played and the auto-restore is successful. No further action is needed, but proceed with caution. The engine may still bug out.
 - *Cache not found - please wait*: This happens if the cache for the top engine move is gone. No further action needed, simply wait for the engine move to appear.
 - *Restoration Failed*: The position was unsuccessfully restored after manually resetting fen. You will have to finish the rest of the game without the bot.
 - *Restoration Success - moves may be inaccurate*: The position was successfully restored after a manual reset. PROCEED WITH CAUTION - HIGH CHANCE BOT MAY BUG OUT.
