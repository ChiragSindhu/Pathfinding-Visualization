var openList = [];
var closedList = [];
var path = [];

function aPathfinding() {
    if (initializeAStart() === 0)
        return;

    turnASTART(0);

    findPathAStart();
}

function findPathAStart() { 
    const startNode = convertIntoNode(document.getElementsByClassName("startNode")[0].id);
    const endNode = convertIntoNode(document.getElementsByClassName("endNode")[0].id);

    openList.push(startNode);

    calc_Distance(startNode,endNode);
}

function calc_Distance(startNode,endNode) {
    setTimeout(function () {
        if (resetAlgo === 1) {
            resetAlgo = 0;
            turnASTART(1);
            return;
        }

        var currentNode = openList[0];

        for (let i = 0; i < openList.length; i++) {
            //console.log(openList[i].xPos,openList[i].yPos,openList[i].GCost,openList[i].HCost,getNodeFCost(openList[i].xPos,openList[i].yPos));
            if (getNodeFCost(openList[i].xPos, openList[i].yPos) < getNodeFCost(currentNode.xPos, currentNode.yPos) || openList[i].HCost < currentNode.HCost) {
                currentNode = openList[i];
            }
        }

        //console.log("CurrentNode = " + currentNode.xPos + " " + currentNode.yPos);
        if (currentNode != startNode && currentNode != endNode) {
            document.getElementById("span|" + currentNode.xPos + "|" + currentNode.yPos).className = "currentNode";
            document.getElementById("span|" + currentNode.xPos + "|" + currentNode.yPos).style.animation = "bounceAnimation 0.3s linear";
        }

        openList.splice(openList.indexOf(currentNode), 1);
        closedList.push(currentNode);

        if (currentNode.xPos === endNode.xPos && currentNode.yPos === endNode.yPos) {
            retracePath(startNode,endNode);
            //console.log("Path Found!");
            return;
        }
        
        checkNeigbourNode(currentNode, endNode);

        //console.log("----------------------");

        if (openList.length != 0) {
            calc_Distance(startNode,endNode);
        }

        if (openList.length == 0) {
            turnASTART(1);
            console.log("No path found!");
        }
    }, speed);
}

function retracePath(startNode,endNode) {
    var currentNode = endNode;

    while (currentNode != startNode) {
        path.push(currentNode);
        currentNode = currentNode.parent;
    }
    
    calc_pathReverse(path,1);
}

function calc_pathReverse(path,i) {
    setTimeout(function () {
        if (resetAlgo === 1) {
            resetAlgo = 0;
            turnASTART(1);
            return;
        }

        document.getElementById("span|" + path[i].xPos + "|" + path[i].yPos).className = "path";
        
        if (i < path.length - 1) {
            calc_pathReverse(path, ++i);
        }

        if (i == path.length - 2)
            turnASTART(1);
     },speed);
 }

function checkNeigbourNode(currentElement, endNode) {
    for (var y = -1; y <= 1; y++) {
        for (var x = -1; x <= 1; x++) {
            if (x === 0 && y === 0)
                continue;
            
            let checkX = currentElement.xPos + x;
            let checkY = currentElement.yPos + y;
            
            if (checkX >= 0 && checkX < gridY && checkY >= 0 && checkY < gridX) { 
                if (Grid[checkX][checkY].isWalkble === 0 || closedList.includes(convertIntoNode("span|" + checkX + "|" + checkY))) {
                    continue;
                }

                let newMovementCostToNeighbour = currentElement.GCost + getDistance(currentElement.xPos, checkX, currentElement.yPos, checkY);
                if (newMovementCostToNeighbour < Grid[checkX][checkY].GCost || !openList.includes(Grid[checkX][checkY])) {
                    Grid[checkX][checkY].GCost = newMovementCostToNeighbour;
                    Grid[checkX][checkY].HCost = getDistance(checkX,endNode.xPos,checkY,endNode.yPos);
                    Grid[checkX][checkY].parent = currentElement;
                }

                if (!openList.includes(Grid[checkX][checkY])) {
                    if (checkX != endNode.xPos && checkY != endNode.yPos) {
                        document.getElementById("span|" + checkX + "|" + checkY).className = "neighbour";
                    }
                    openList.push(Grid[checkX][checkY]);
                }
            }
        }
    }
}

function getNodeFCost(xPos,yPos) {
    return Grid[xPos][yPos].GCost + Grid[xPos][yPos].HCost;
 }

function initializeAStart() {
    //console.log("starting");

    if (document.getElementById("ASTART").value.length === 0) {
        console.log("Pathfinding already started!");
        return 0;
    }else if (document.getElementsByClassName("startNode").length === 0) {
        console.log("No Starting Point");
        return 0;
    } else if (document.getElementsByClassName("endNode").length === 0) {
        console.log("No Ending Point");
        return 0;
    } else if (document.getElementsByClassName("startNode")[0] === document.getElementsByClassName("endNode")[0]) {
        console.log("Start and End are same Node!!!");
        return 0;
    }

    resetMap();
    openList.length = 0;
    closedList.length = 0;
    path.length = 0;

    return 1
}