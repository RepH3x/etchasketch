//grab element references
let grid = document.querySelector("#gridWrapper");
let resetButton = document.querySelector("#reset");
let colorSelect = document.querySelector("#color");
let opacitySelect = document.querySelector("#opacity");

//setup global variables
const DEFAULT_GRID_WIDTH = 16;
const DEFAULT_GRID_HEIGHT = 16;

//setup button eventlistener
resetButton.addEventListener("click", () => onResetButtonClick());

//main
generateGrid([DEFAULT_GRID_WIDTH, DEFAULT_GRID_HEIGHT]);


//functions
function generateGrid(dimensions) {
  let xUnits = dimensions[0];
  let yUnits = dimensions[1];
  let gridPieceBlueprint = document.createElement("div");
  let pieceWidth = grid.clientWidth / xUnits + "px";
  let pieceHeight = grid.clientHeight / yUnits + "px";
  gridPieceBlueprint.setAttribute("style", "width:"+pieceWidth+";height:"+pieceHeight+";opacity: 0");
  for(let i=0; i<xUnits*yUnits; i++) {
    let gridPiece = gridPieceBlueprint.cloneNode();
    gridPiece.addEventListener("mouseover", () => handleMouseover(gridPiece));
    grid.appendChild(gridPiece);
  }
}

function onResetButtonClick() {
  let dimensions = processInput(prompt("Enter dimensions for a new grid up to 100,100 ", "16,16"));
  grid.replaceChildren();
  generateGrid(dimensions);
}

function processInput(input) {
  let dimensions = input.split(",");
  if(dimensions.length != 2) {
    console.log("Invalid argument count for grid dimensions. Resetting with defaults.");
    return [DEFAULT_GRID_WIDTH, DEFAULT_GRID_HEIGHT];
  }
  for(let i=0; i<dimensions.length; i++) {
    dimensions[i] = parseInt(dimensions[i]);
    if(isNaN(dimensions[i])) { 
      console.log("Non-number arguments for grid dimensions. Resetting with defaults.");
      return [DEFAULT_GRID_WIDTH, DEFAULT_GRID_HEIGHT];
    }
    if(dimensions[i] <=0 || dimensions[i] > 100) {
      console.log("Invalid numbers for grid dimensions. Resetting with defaults.");
      return [DEFAULT_GRID_WIDTH, DEFAULT_GRID_HEIGHT];
    }
  }
  return dimensions;
}

function handleMouseover(gridPiece) {
  gridPiece.style.background = determineColor(gridPiece);
  let newOpacity = parseFloat(gridPiece.style.opacity) + parseFloat(opacitySelect.value);
  if(newOpacity > 1) { newOpacity = 1; }
  gridPiece.style.opacity = ""+newOpacity;
}

function determineColor(gridPiece) {
  if(colorSelect.value === "random") {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    return "rgb("+r+","+g+","+b+","+gridPiece.style.opacity+")";
  } else {
    return colorSelect.value;
  }
}