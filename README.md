# Radium Bot

I DO NOT THINK CHEATING IN CHESS IS GOOD. I MADE THIS A CHALLENGE FOR MYSELF. IF YOU GET BANNED WITH THIS BOT THAT IS YOUR FAULT. I DO NOT RECOMMEND USING THIS!!!!

**#1** undetectable [chess.com](https://www.chess.com/) stockfish bot out there ._.

Currently in development, expect much more to come out!

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

Once you are in a game, left click the bookmark you just created

You should see an overlay appear on the right side of your screen labled *Radium Bot* :)

## How to use - IMPORTANT

Firstly, here are all of the settings and what they do:
- depth
- eval diff
- reveal move
- reset position
- toggle overlay
- toggle eval

### Depth
Depth represents the strength of the engine that the overlay uses. Using the default depth of 15 is highly reccomended. Any more or less will result in the engine taking too long or inaccurate moves.

### Eval Difference
The eval difference is the minimum eval difference for another alternative green arrow to appear with a blue arrow. If you don't understand what that means, just keep it at the default value of 30.

### Reveal Move
Changes the keybind that reveals the best move(s).

ARROW COLOR: blue - best move; green - alternative move; orange - predicted opponent response to the best move (blue arrow)

### Reset Position
Changes the keybind that restores the position. If the engine bugs out, make sure the move list is visible and then press the keybind.

### Toggle Overlay
Changes the keybind needed to toggle the overlay on and off.

### Toggle Eval
This toggles wether the eval of the position will be displayed on the overlay.

<br><br><br>

## Extra

The eval displayed on the overlay might seem glitchy, but it's not. A positive eval value(+) represents that a player is winning - THIS PLAYER CHANGES EVERY TURN. For example, if it's your turn, and the eval bar displays a positive number, then you are winning.
If it's the opponents turn and the eval is positive, then the opponent is winning. 

You can view your opponents best move(s) during your turn as well.

The 5 minute time control and up are the only time controls recommended if you don't want to get caught.

Especially if you don't want to get caught: ONLY USE THIS ENGINE A FEW MOVES PER GAME - particularly when you are wasting time and not sure what to play. The goal is to boost elo by a significant amount, not blatantly cheat and get banned. 
DO NOT play "robotic" moves that are obviously not human. 

This overlay is targeted towards more advanced chess players, particularly around 1300-1500 and up. Beginners may be more tempted to blatantly cheat with it more often and get banned.

## Error Logs
 - *Cache not found - please wait*: This happens if the cache for the top engine move is gone. No further action needed, simply wait for the engine move to appear.
 - *Game not found - waiting...*: This happens if the move list on the right isn't visible. To fix, have the move list be visible and then manually reset the position with your keybind.


## Development
 - Initial Release - April 13 2026 - Can often bug out; not reccomended for usage.
 - PGN Update - May 16 2026 - Switched to a much less buggy PGN board identifier. Extra features such as opponent move predictions also added.
