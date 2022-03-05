function greedBestFirst() {
    if (initializeGREEDY() === 0)
        return;

    turnGREEDY(0);

    findPathGREEDY();
}

function findPathGREEDY() { 
    const startNode = convertIntoNode(document.getElementsByClassName("startNode")[0].id);
    const endNode = convertIntoNode(document.getElementsByClassName("endNode")[0].id);

    openList.push(startNode);

    calc_DistanceGREEDY(startNode,endNode);
}

function calc_DistanceGREEDY(startNode,endNode) {
    setTimeout(function () {
        if (resetAlgo === 1) {
            resetAlgo = 0;
            turnGREEDY(1);
            return;
        }

        var currentNode = openList[0];

        for (let i = 0; i < openList.length; i++) {
            //console.log(openList[i].xPos,openList[i].yPos,openList[i].GCost,openList[i].HCost,getNodeFCost(openList[i].xPos,openList[i].yPos));
            if (openList[i].HCost < currentNode.HCost) {
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
            retracePathGREEDY(startNode,endNode);
            //console.log("Path Found!");
            return;
        }
        
        checkNeigbourNodeGREEDY(currentNode, endNode);

        //console.log("----------------------");

        if (openList.length != 0) {
            calc_DistanceGREEDY(startNode,endNode);
        }

        if (openList.length == 0) {
            turnGREEDY(1);
            console.log("No path found!");
        }
    }, speed);
}

function retracePathGREEDY(startNode,endNode) {
    var currentNode = endNode;

    while (currentNode != startNode) {
        path.push(currentNode);
        currentNode = currentNode.parent;
    }
    
    calc_pathReverseGREEDY(path,1);
}

function calc_pathReverseGREEDY(path,i) {
    setTimeout(function () {
        if (resetAlgo === 1) {
            resetAlgo = 0;
            turnGREEDY(1);
            return;
        }

        document.getElementById("span|" + path[i].xPos + "|" + path[i].yPos).className = "path";
        
        if (i < path.length - 1) {
            calc_pathReverseGREEDY(path, ++i);
        }

        if (i == path.length - 2)
            turnGREEDY(1);
     },speed);
 }

function checkNeigbourNodeGREEDY(currentElement, endNode) {
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

                if (!openList.includes(Grid[checkX][checkY])) {
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

function initializeGREEDY() {
    //console.log("starting");

    if (document.getElementById("GREEDY").value.length === 0) {
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