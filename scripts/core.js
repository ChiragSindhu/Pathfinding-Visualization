var gridX = 50;
var gridY = 3;
var Grid = new Array(gridX);

function Node() { 
    this.xPos = 0;
    this.yPos = 0;
    this.GCost = 0;
    this.HCost = 0;
    this.pathCost = Infinity;
    this.isWalkble = 1;
    this.parent = null;
}

document.addEventListener('DOMContentLoaded', () => {
    var nodeWidth = 25.8;
    gridX = Math.floor((screen.width) / nodeWidth);
    gridY = Math.floor((screen.height / 2 + nodeWidth * 3) / nodeWidth);

    console.log(gridX,gridY);
    createGrid();
    visualizeGrid(nodeWidth);

    turnASTART(1);
    turnGREEDY(1);
    turnDIJKSTRA(1);
    turnBFS(1);
    turnDFS(1);
});

function visualizeGrid(nodeWidth) {
    const mapElement = document.getElementById("gameMap");
    mapElement.style.width = (gridX * nodeWidth) + "px";

    const rootElement = document.getElementById("root");
    creatingVisualGridStyle(rootElement);

    for (var x = 0; x < gridY; x++) {
        for (var y = 0; y < gridX; y++) {
            let spanElement = document.createElement("SPAN");
            spanElement.id = "span" + "|" + Grid[x][y].xPos + "|" + Grid[x][y].yPos;
            spanElement.className = "node";

            spanElement.onmousedown = function () { createStartNodePoints(spanElement); };

            rootElement.appendChild(spanElement);
        }
    }
}

function creatingVisualGridStyle(rootElement) {
    var gridProperty = "";

    for (let i = 0; i < gridX; i++) {
        gridProperty += "auto ";        
    }

    rootElement.style.setProperty("grid-template-columns", gridProperty)
}

function createGrid() {
    for (var i = 0; i < gridX; i++) {
        Grid[i] = new Array(gridY);
    }   
  
    for (var x = 0; x < gridY; x++) {
        for (var y = 0; y < gridX; y++) {
            Grid[x][y] = new Node();
            
            Grid[x][y].xPos = x;
            Grid[x][y].yPos = y;
        }
    }
}

function getDistance(xPos, x2Pos, yPos, y2Pos) {
    var distX = Math.abs(yPos - y2Pos);
    var distY = Math.abs(xPos - x2Pos);

    if (distX > distY) {
        return 14 * distY + 10 * (distX - distY);
    } else {
        return 14 * distX + 10 * (distY - distX);
    }
}

function getDistanceDijkstra(xPos, x2Pos, yPos, y2Pos) {
    var distX = Math.abs(xPos - x2Pos);
    var distY = Math.abs(yPos - y2Pos);

    //console.log("10 x (" + xPos + " - " + x2Pos + ") + (" + yPos + " - " + y2Pos + ") = " + (10 * (distX + distY)));
    return 10 * (distX + distY);
}