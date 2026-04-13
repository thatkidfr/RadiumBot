// Radium Bot
// OPEN SOURCE
// get cooked suckers

// Default settings
// ======== SETTINGS ========
let evalDiffArrow = 30; // Maximum eval difference required to display an arrow
let bestMoveBind = "g"; // Bind to reveal best moves
let restoreFenBind = "r"; // Bind to restore position
let toggleOverlayBind = "t"; // Toggle overlay visibility
let depth = 15; // Stockfish depth (larger number = smarter moves but takes more time)
let showEvalBind = "e"; // Toggle showing eval
// ======== SETTINGS ========
if (localStorage.getItem("depth") == null){
  saveSettings();
} else {
  depth = Number(localStorage.getItem("depth"));
  evalDiffArrow = Number(localStorage.getItem("evalDiff"));
  restoreFenBind = localStorage.getItem("restoreFen");
  toggleOverlayBind = localStorage.getItem("toggleOverlay");
  bestMoveBind = localStorage.getItem("bestMove");
  showEvalBind = localStorage.getItem("evalBind");
}

function saveSettings(){
  localStorage.setItem("depth", depth);
  localStorage.setItem("evalDiff", evalDiffArrow);
  localStorage.setItem("restoreFen", restoreFenBind);
  localStorage.setItem("toggleOverlay", toggleOverlayBind);
  localStorage.setItem("bestMove", bestMoveBind);
  localStorage.setItem("evalBind", showEvalBind);
}
function displaySettings(){
  document.getElementById("bot-currentDepth").innerHTML = depth;
  document.getElementById("bot-currentEvalDiff").innerHTML = evalDiffArrow;
  document.getElementById("bot-currentRevealBind").innerHTML = bestMoveBind;
  document.getElementById("bot-currentResetBind").innerHTML = restoreFenBind;
  document.getElementById("bot-currentToggleBind").innerHTML = toggleOverlayBind;
  document.getElementById("bot-currentEvalBind").innerHTML = showEvalBind;
}
function displayEval(eval1){
  document.getElementById("bot-eval").innerHTML = eval1;
}
function errorMsg(msg){
  document.getElementById("bot-errorMsg").innerHTML = msg;
}
// ======== OVERLAY ========
let overlay = document.createElement("div");

overlay.style.position = "fixed";
overlay.style.top = "5%";
overlay.style.left = "60%";
overlay.style.width = "300px";
overlay.style.height = "500px";
overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
overlay.style.zIndex = "9999";
overlay.style.display = "flex";
overlay.style.justifyContent = "center";
overlay.style.color = "white";
overlay.style.padding = "5px";
overlay.style.flexDirection = "column";
overlay.style.alignItems = "center";
overlay.style.gap = "10px";
overlay.style.visibility = "visible";

overlay.innerHTML = `
<h1 id='bot-title'>Radium Bot</h1>
<img src='https://files.raycast.com/j7zpwooji0m33ycmbhcuex7raj3f' style="height:75px; width:auto;">
<div class='bot-rowContainer'><p>(<p id='bot-eval'>EVAL</p>)</p></div>
<div class='bot-rowContainer'><p>BOT SETTINGS</p></div>
<div class='bot-rowContainer'><button id='bot-depth'>depth</button><p>Set stockfish depth</p><p>(<p id='bot-currentDepth'>15</p>)</p></div>
<div class='bot-rowContainer'><button id='bot-evalDiff'>eval diff</button><p>Set eval diff</p><p>(<p id='bot-currentEvalDiff'>30</p>)</p></div>
<div class='bot-rowContainer'><button id='bot-revealMove'>reveal move</button><p>Set keybind</p><p>(<p id='bot-currentRevealBind'>g</p>)</p></div>
<div class='bot-rowContainer'><button id='bot-resetFen'>reset fen</button><p>Set keybind</p><p>(<p id='bot-currentResetBind'>r</p>)</p></div>
<div class='bot-rowContainer'><button id='bot-toggle'>toggle overlay</button><p>Set keybind</p><p>(<p id='bot-currentToggleBind'>t</p>)</p></div>
<div class='bot-rowContainer'><button id='bot-toggleEval'>toggle eval</button><p>Set keybind</p><p>(<p id='bot-currentEvalBind'>e</p>)</p></div>
<div class='bot-rowContainer'><p>ERROR LOGS</p></div>
<div class='bot-rowContainer'><p style='color:red' id='bot-errorMsg'>No error here :)</p></div>
`;

document.body.appendChild(overlay);
let rows = overlay.querySelectorAll(".bot-rowContainer");
rows.forEach(row => {
  row.style.display = "flex";
  row.style.alignItems = "center";
  row.style.gap = "10px";
});
// ======== OVERLAY ========
// ======== BUTTONS ========
let BTNbotEval = document.getElementById("bot-toggleEval");
BTNbotEval.addEventListener('click', function() {
  showEvalBind = prompt("Set toggle eval bind");
  saveSettings();
  displaySettings();
  
});
let BTNbotDepth = document.getElementById("bot-depth");
BTNbotDepth.addEventListener('click', function() {
  depth = Number(prompt("Set engine depth"));
  saveSettings();
  displaySettings();
});
let BTNbotEvalDiff = document.getElementById("bot-evalDiff");
BTNbotEvalDiff.addEventListener('click', function() {
  evalDiffArrow = Number(prompt("Set eval difference for arrows"));
  saveSettings();
  displaySettings();
});
let BTNbotRevealMoveBind = document.getElementById("bot-revealMove");
BTNbotRevealMoveBind.addEventListener('click', function() {
  bestMoveBind = prompt("Set bind to reveal the best move");
  saveSettings();
  displaySettings();
});
let BTNbotResetBind = document.getElementById("bot-resetFen");
BTNbotResetBind.addEventListener('click', function() {
  restoreFenBind = prompt("Set bind to manually reset FEN");
  saveSettings();
  displaySettings();
});
let BTNbotToggleOverlay = document.getElementById("bot-toggle");
BTNbotToggleOverlay.addEventListener('click', function() {
  toggleOverlayBind = prompt("Set bind to toggle overlay");
  saveSettings();
  displaySettings();
});
displaySettings();
// ======== BUTTONS ========


const Chess = (await import('https://cdn.jsdelivr.net/npm/chess.js@0.13.4/chess.js')).Chess;
const game = new Chess();


const path = '/bundles/app/js/vendor/jschessengine/stockfish.asm.1abfa10c.js';  // Link originally acquired from majid3612, but I don't think this counts as credit
const engine = new Worker(path);


let cachedMove = null; // Reset cache for instant move revealing

const moveList = document.querySelector('.move-list.chessboard-pkg-move-list-component');


function getLength(){ // Returns how many moves were played - used to identify when a move is played
    let white = document.querySelectorAll(".white-move");
    let black = document.querySelectorAll(".black-move");
    return white.length + black.length;
}

let previousCount = 0;
const observer = new MutationObserver((mutationsList) => { // Look for changes
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      
      let count = getLength();
      if (count != previousCount){ // Move played
        cachedMove = null;
        if (count - previousCount == 1){ // If the move registered normally
          playMove();
          console.log("Move Played");
          errorMsg("");
          cacheBestMove();
          if (showEval == "y"){
            getEval();
          }
        } else { // If more than 1 piece changed in a single game tick, a premove is detected
          if (!game.load(restoreFEN()[0])){ // Attempts to restore the game with FEN
            errorMsg("Premove played - try manual reset"); // If it bugs out, resort to manual restoration
          } else {
            errorMsg("Auto-restore success");
          }
        }
        
        previousCount = count;
          
      }
    }
  }
});

async function getEval(){
  let resbestmove = await cachedMove;
  displayEval(resbestmove[0].eval/100);
}
function cacheBestMove(){ // Save best move after a move is played to save time 
  cachedMove = getTop3MovesWithEval(engine, game.fen(), depth);
}


function restoreFEN(){ // This function is used as a backup if determineMove fails - it can lead to impossible positions
  // Convert DOM to FEN, can be innacurate due to the end metadata failing
  
  let board = document.getElementById(moveList.boardId); // Grab chess board
  const childrenArray = Array.from(board.children); // Get sub elements (pieces)

  // Get the piece positions
  let pieceARR = []; 
  let positionARR = [];
  
  for (let x = 0; x < childrenArray.length; x++){
    
      let classname = childrenArray[x].classList.value;
    
      if (classname.startsWith("piece")){
          let parts = classname.split(" ");
          for (let y = 0; y < parts.length; y++){
              if (parts[y].length == 2){
                  pieceARR.push(parts[y]);
              }
              if (parts[y].startsWith("square-")){
                  positionARR.push(parts[y][7]+parts[y][8]);
              }
          }
          
      }
    
  }

  // Order the pieces so it's easier to translate to FEN
  let orderedPieces = [];
  let orderedPositions = [];

  for (let x = 0; x < positionARR.length; x++){
    
    let pos = positionARR[x];
    let placement = 0;
    
    for (let y = 0; y < orderedPositions.length; y++){
      ord = orderedPositions[y];
      if (Number(pos[1]) > Number(ord[1]) || (Number(pos[0]) < Number(ord[0]) && Number(pos[1]) == Number(ord[1]) )){
        placement = y;
        break;
      }

      placement ++;
    }

    orderedPositions.splice(placement, 0, pos);
    orderedPieces.splice(placement, 0, pieceARR[x]);
    
  }


  // Generate FEN from pieces
  
  let generatedFen = "";
  let yVal = null;
  let xVal = null;
  let currentX = 0;
  let currentY = 8;
  for (let x = 0; x < orderedPositions.length; x++){
    let item = orderedPositions[x];
    let piece = orderedPieces[x];
    xVal = Number(item[0]);
    yVal = Number(item[1]);

    if (currentY > yVal){

      if (currentX != 8){
        generatedFen += (8-currentX).toString();
      }

      generatedFen += "/";
      
      for (let y = 0; y < currentY - yVal - 1; y++){
        generatedFen += "8/";
      }

      if (xVal != 1){
        generatedFen += (xVal - 1).toString();
      }

      if (piece[0] == "w"){
        generatedFen += piece[1].toUpperCase();
      } else {
        generatedFen += piece[1].toLowerCase();
      }
      
    } else {
      if (xVal - currentX != 1){
        generatedFen += (xVal - currentX - 1).toString();
      }

      if (piece[0] == "w"){
        generatedFen += piece[1].toUpperCase();
      } else {
        generatedFen += piece[1].toLowerCase();
      }
    }

    currentX = xVal;
    currentY = yVal;
    if (x == orderedPositions.length-1 && !(xVal == 8 && yVal == 1)){
      xVal = 9;
      yVal = 1;

      if (currentY > yVal){

        if (currentX != 8){
          generatedFen += (8-currentX).toString();
        }

        generatedFen += "/";
      
        for (let y = 0; y < currentY - yVal - 1; y++){
          generatedFen += "8/";
        }

        if (xVal != 1){
          generatedFen += (xVal - 1).toString();
        }

      
      } else {
        if (xVal - currentX != 1){
          generatedFen += (xVal - currentX - 1).toString();
        }

      }
    }
  }


  // Add the final metdata from game load and hope the two moves played didn't drastically affect the metadata
  // NOTE FOR FUTURE - ADD EXTRA SAFETY MECHANISMS TO DETERMINE IF A PLAYER CAN STILL CASTLE OR NOT TO DECREASE ODDS OF IMPOSSIBLE FEN POSITIONS

  let finalPart = "";
  let active = false;
  let seperatorPos = 0;
  for (let x = 0; x < game.fen().length; x++){
    if ((!active) && game.fen()[x] == " "){
      active = true;
      seperatorPos = x;
    }
    if (!active){continue;}
    finalPart += game.fen()[x];
  }

  generatedFen += finalPart;

  return [generatedFen, seperatorPos];
}

async function showBestMove(){
  
  let bestMoves = await cachedMove;
  if (bestMoves == null){
    errorMsg("Cache not found - please wait");
    bestMoves = await getTop3MovesWithEval(engine, game.fen(), depth);
  }
  


  let arrowL = document.querySelector('svg.arrows');
  arrowL.innerHTML = "";

  drawArrow(bestMoves[0].move.slice(0,2), bestMoves[0].move.slice(2,4), true); // Draw best arrow with an aqua color
  if (Math.abs(bestMoves[0].eval-bestMoves[1].eval)<evalDiffArrow){
    drawArrow(bestMoves[1].move.slice(0,2), bestMoves[1].move.slice(2,4), false); // Second and third best moves shown if the eval difference between the move and the best move < evalDiffArrow variable
  }
  if (Math.abs(bestMoves[0].eval-bestMoves[2].eval)<evalDiffArrow){
    drawArrow(bestMoves[2].move.slice(0,2), bestMoves[2].move.slice(2,4), false);
  }
  console.log(bestMoves[0]); // Show best moves with eval to the console
  console.log(bestMoves[1]);
  console.log(bestMoves[2]);
  
}

function playMove(){
  let movePlayed = determineMove(game.fen()); // Find move played
  if (movePlayed[2]){ // Play the move on the simulated game
    game.move({from:movePlayed[0],to:movePlayed[1],promotion:movePlayed[3]})
  } else {
    game.move({from:movePlayed[0],to:movePlayed[1]});
  }

  // Remove any arrows placed by engine previously
  let arrowL = document.querySelector('svg.arrows');
  arrowL.innerHTML = "";

}


function getTop3MovesWithEval(worker, fen, depth = 15) { // This function was made by AI (sorry)
  return new Promise((resolve) => {
    const best = new Map();

    worker.onmessage = (e) => {
      const line = e.data;

      // Parse MultiPV info lines
      if (line.startsWith("info") && line.includes("multipv")) {
        const multipvMatch = line.match(/multipv (\d+)/);
        const scoreMatch = line.match(/score (cp|mate) (-?\d+)/);
        const pvMatch = line.match(/ pv (.+)/);

        if (multipvMatch && pvMatch) {
          const rank = parseInt(multipvMatch[1], 10);

          let evalScore = null;

          if (scoreMatch) {
            const type = scoreMatch[1];
            const value = parseInt(scoreMatch[2], 10);

            // convert mate to big value
            evalScore = type === "cp" ? value : (value > 0 ? 100000 : -100000);
          }

          const move = pvMatch[1].split(" ")[0];

          best.set(rank, {
            move,
            eval: evalScore
          });
        }
      }

      // final result
      if (line.startsWith("bestmove")) {
        const result = [...best.entries()]
          .sort((a, b) => a[0] - b[0])
          .slice(0, 3)
          .map(([rank, data]) => ({
            rank,
            move: data.move,
            eval: data.eval
          }));

        resolve(result);
      }
    };

    worker.postMessage("setoption name MultiPV value 3");
    worker.postMessage("position fen " + fen);
    worker.postMessage("go depth " + depth);
  });
}

function determineMove(FEN){
  let board = document.getElementById(moveList.boardId); // Grab chess board
  const childrenArray = Array.from(board.children); // Get sub elements (pieces)
  

  // Get the piece positions
  let pieceARR = []; 
  let positionARR = [];
  
  for (let x = 0; x < childrenArray.length; x++){
    
      let classname = childrenArray[x].classList.value;
    
      if (classname.startsWith("piece")){
          let parts = classname.split(" ");
          for (let y = 0; y < parts.length; y++){
              if (parts[y].length == 2){
                  pieceARR.push(parts[y]);
              }
              if (parts[y].startsWith("square-")){
                  positionARR.push(parts[y][7]+parts[y][8]);
              }
          }
          
      }
    
  }

  // Convert the current fen position to array format to compare later
  
  let fenPieceARR = [];
  let fenPositionARR = [];
  let yLevel = 8;
  let xLevel = 1;
  
  for (let x = 0; x < FEN.length; x++){
    if (FEN[x] == " "){ // Break at the near-end part of the fen
      break;
    }
    if (FEN[x] == "/"){ // New row, descrease y and set x back to 1
      yLevel--;
      xLevel = 1;
    }
    else {
      if (FEN[x] == "1" || FEN[x] == "2" || FEN[x] == "3" || FEN[x] == "4" || FEN[x] == "5" || FEN[x] == "6" || FEN[x] == "7" || FEN[x] == "8"){ // If the character is a number, than add it to the x vlaue
        xLevel += parseInt(FEN[x], 10);
      }
      else {
        let p1 = "b";
        if (FEN[x].toUpperCase() == FEN[x]){ // If uppercase(character) = character, then it must be white (w), otherwise black(b)
          p1 = "w";
        }

        let p2 = FEN[x].toLowerCase(); // Piece is lowercase no matter what in array format

        // Combine
        let totalPiece = p1+p2; // "(color)" + "(piece)"
        let totalPosition = xLevel.toString() + yLevel.toString(); // "x"+"y"
        // Add to array
        fenPieceARR.push(totalPiece);
        fenPositionARR.push(totalPosition);

        xLevel++;
      }
    }

    
  }

  // Determine the change in the position from before (FEN) to after (DOM result)
  let beforePieceARR = [];
  let beforePositionARR = [];
  let afterPieceARR = [];
  let afterPositionARR = [];

  let hasDupe = false;
  
  for (let x = 0; x < pieceARR.length; x++){

    hasDupe = false;
    for (let y = 0; y < fenPieceARR.length; y++){

      if (pieceARR[x] == fenPieceARR[y] && positionARR[x] == fenPositionARR[y]){
        fenPieceARR.splice(y, 1);
        fenPositionARR.splice(y, 1);
        hasDupe = true;
        break;
        
      }
      
    }

    if (!hasDupe){
      afterPieceARR.push(pieceARR[x]);
      afterPositionARR.push(positionARR[x]);
    }
  }

  beforePieceARR = fenPieceARR;
  beforePositionARR = fenPositionARR;

  //  DETERMINE TYPE OF MOVE PLAYED TO TRANSLATE TO chess.js FORMAT
  //   before | after
  //1) len(1) | len(1) piece is equal 1: Normal move
  //2) len(2) | len(1) piece is equal 2: Capture
  //3) len(2) | len(2) all pieces equal 3: Castle
  //4) len(1) | len(1) no piece equal 4: Promotion
  //5) len(2) | len(1) no piece equal 5: Promotion + Capture

  let fromPos = "";
  let toPos = "";
  let promotion = false;
  let promotionPiece = "";
  
  // Case 1 - normal move
  if (beforePieceARR.length == 1 && afterPieceARR.length == 1){
    if (beforePieceARR[0] == afterPieceARR[0]){
      fromPos = beforePositionARR[0];
      toPos = afterPositionARR[0];
    }
  }

  // Case 2 - capture
  if (beforePieceARR.length == 2 && afterPieceARR.length == 1){
    if (beforePieceARR[0] == afterPieceARR[0]){
      fromPos = beforePositionARR[0];
      toPos = afterPositionARR[0];
    }
    if (beforePieceARR[1] == afterPieceARR[0]){
      fromPos = beforePositionARR[1];
      toPos = afterPositionARR[0];
    }
  }

  // Case 3 - castle
  if (beforePieceARR.length == 2 && afterPieceARR.length == 2){
    if (beforePieceARR[0][1] == "k"){
      if (afterPieceARR[0][1] == "k"){
        // 0-0
        fromPos = beforePositionARR[0];
        toPos = afterPositionARR[0];
      } else {
        // 0-1
        fromPos = beforePositionARR[0];
        toPos = afterPositionARR[1];
      }
    } else {
      if (afterPieceARR[0][1] == "k"){
        // 1-0
        fromPos = beforePositionARR[1];
        toPos = afterPositionARR[0];
      } else {
        // 1-1
        fromPos = beforePositionARR[1];
        toPos = afterPositionARR[1];
      }
    }
  }

  // Case 4 - promotion
  if (beforePieceARR.length == 1 && afterPieceARR.length == 1){
    if (beforePieceARR[0] != afterPieceARR[0]){
      fromPos = beforePositionARR[0];
      toPos = afterPositionARR[0];
      promotion = true;
      promotionPiece = afterPieceARR[0][1];
    }
  }

  // Case 5 - promotion + capture
  if (beforePieceARR.length == 2 && afterPieceARR.length == 1){
    if (!beforePieceARR.includes(afterPieceARR[0])){
      // Check which piece was the pawn that promoted (it cannot be the pawn captured because a pawn can't capture a pawn and promote at the same time)
      promotion = true;
      promotionPiece = afterPieceARR[0][1];
      if (beforePieceARR[0][1] == "p"){
        // 0
        fromPos = beforePositionARR[0];
      }  else {
        // 1
        fromPos = beforePositionARR[1];
      }
      toPos = afterPositionARR[0];
    }
  }

  // Convert format - e.g. 52 to e2

  let letters = "abcdefgh";
  fromPos = letters[Number(fromPos[0])-1]+fromPos[1];
  toPos = letters[Number(toPos[0])-1]+toPos[1];
  
  return [fromPos, toPos, promotion, promotionPiece];
  
}

function drawArrow(from, to, isBest) { // Credit for this function goes to majid3612
    let color = 'rgba(57, 143, 116, 0.7)';
    if (isBest){
       color = 'rgba(0, 221, 255, 0.7)';
    }
    const arrowLayer = document.querySelector('svg.arrows');
    if (!arrowLayer) return;
    const [fx, fy] = squareToCoords(from), [tx, ty] = squareToCoords(to);
    const dx = tx - fx, dy = ty - fy, len = Math.sqrt(dx*dx + dy*dy);
    const bodyWidth = 3, headLength = 5, bodyLength = len - headLength;
    const ux = dx / len, uy = dy / len, px = -uy, py = ux;
    const pts = [
        [fx + px * bodyWidth / 2, fy + py * bodyWidth / 2],
        [fx - px * bodyWidth / 2, fy - py * bodyWidth / 2],
        [fx + ux * bodyLength - px * bodyWidth / 2, fy + uy * bodyLength - py * bodyWidth / 2],
        [fx + ux * bodyLength + px * bodyWidth / 2, fy + uy * bodyLength + py * bodyWidth / 2]
    ];
    const body = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    body.setAttribute('points', pts.map(p => p.join(',')).join(' '));
    body.setAttribute('fill', color);
    arrowLayer.appendChild(body);
    const tipX = fx + ux * len, tipY = fy + uy * len;
    const baseLeftX = fx + ux * bodyLength + px * bodyWidth, baseLeftY = fy + uy * bodyLength + py * bodyWidth;
    const baseRightX = fx + ux * bodyLength - px * bodyWidth, baseRightY = fy + uy * bodyLength - py * bodyWidth;
    const head = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    head.setAttribute('points', `${tipX},${tipY} ${baseLeftX},${baseLeftY} ${baseRightX},${baseRightY}`);
    head.setAttribute('fill', color);
    arrowLayer.appendChild(head);
}
function squareToCoords(square) { // Credit for this function goes to majid3612
    const file = square[0].toLowerCase().charCodeAt(0) - 97, rank = 8 - parseInt(square[1]);
    return [(file + 0.5) * 12.5, (rank + 0.5) * 12.5];
}


observer.observe(moveList, { // Start observing for changes
  childList: true,
  attributes: true,
  subtree: true,
  characterData: true
});


document.addEventListener("keydown", function(event) {
  if (event.key == bestMoveBind){ // If the keybind is pressed, reveal the top engine moves
    showBestMove();
  }
});
document.addEventListener("keydown", function(event) {
  if (event.key == restoreFenBind){ // Attempt to manually restore the position by manually setting the players turn
    let restore = restoreFEN();
    let turn = prompt("RESTORE ------ White(w) or black(b) to move:");
    let fen = restore[0];
    if (turn != "w" && turn != "b"){
      console.log("Invalid Prompt");
    } else {
      fen[restore[1]] = turn;
      if (!game.load(fen)){
        errorMsg("Restoration Failed");
      } else {
        errorMsg("Restoration Success - moves may be inaccurate");
      }
    }
  }
});
document.addEventListener("keydown", function(event) {
  if (event.key == toggleOverlayBind){
    if (overlay.style.visibility  == "visible"){
        overlay.style.visibility = "hidden";
    } else {
        overlay.style.visibility = "visible";
    }
  }
});
let showEval = "y";
document.addEventListener("keydown", function(event) {
  if (event.key == showEvalBind){
    if (showEval  == "y"){
      showEval = "n";
      displayEval("EVAL");
    } else {
      showEval = "y";
      if (cachedMove != null){
        getEval();
      }
    }
  }
});
