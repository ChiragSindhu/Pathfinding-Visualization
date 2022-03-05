function dfsAlgo() {
    if (initializeDFS() === 0)
        return;
    
    turnDFS(0);

    findPathDFS();
}

function findPathDFS() {
    const startNode = convertIntoNode(document.getElementsByClassName("startNode")[0].id);
    const endNode = convertIntoNode(document.getElementsByClassName("endNode")[0].id);

    frontier.push(startNode);

    calc_DistanceDFS(startNode, endNode);
}

function calc_DistanceDFS(startNode,endNode) {
    setTimeout(function () { 
        if (resetAlgo === 1) {
            resetAlgo = 0;
            turnDFS(1);
            
            return;
        }

        var currentElement = frontier[0];

        if (currentElement.xPos === endNode.xPos && currentElement.yPos === endNode.yPos) {
            backTrace_pathDFS(startNode,endNode,endNode);
            //console.log(visitedNode);
            return;
        }

        //console.log("CurrentElement => " + currentElement.xPos + " , " + currentElement.yPos);
        if (currentElement != startNode && currentElement != endNode) {
            document.getElementById("span|" + currentElement.xPos + "|" + currentElement.yPos).className = "currentNode";
            document.getElementById("span|" + currentElement.xPos + "|" + currentElement.yPos).style.animation = "bounceAnimation 0.3s linear";
        }

        checkCurrentNodeNeighbourDFS(startNode,endNode,currentElement);

        frontier.splice(frontier.indexOf(currentElement), 1);
        visitedNode.push(currentElement);

        //console.log(visitedNode);
        
        if (frontier.length != 0) {
            calc_DistanceDFS(startNode,endNode);
        }

        if (frontier.length== 0) {
            turnDFS(1);
            console.log("No path found!");
        }

        //console.log("-----------------------");
    },speed);
}

function backTrace_pathDFS(startNode,endNode,currentPath) {
    setTimeout(function () {
        if (resetAlgo === 1) {
            resetAlgo = 0;
            turnDFS(1);
            return;
        }

        currentPath = currentPath.parent;

        if (currentPath != null && currentPath != startNode && currentPath != endNode)
            document.getElementById("span|" + currentPath.xPos + "|" + currentPath.yPos).className = "path";

        
        if (currentPath != startNode) {
            backTrace_pathDFS(startNode, endNode, currentPath);
        }

        if (currentPath == startNode) {
            turnDFS(1);
            return;
        }
    },speed);
}

function checkCurrentNodeNeighbourDFS(startNode,endNode,currentElement) {
    for (var y = -1; y <= 1; y++) {
        for (var x = -1; x <= 1; x++) {
            if (Math.abs(x) == Math.abs(y))
                continue;
            
            var checkX = currentElement.xPos + x;
            var checkY = currentElement.yPos + y;
            
            if (checkX >= 0 && checkX < gridY && checkY >= 0 && checkY < gridX) {
                if (Grid[checkX][checkY].isWalkble === 0 || visitedNode.includes(convertIntoNode("span|" + checkX + "|" + checkY)) || frontier.includes(convertIntoNode("span|" + checkX + "|" + checkY))){
                    continue;
                }

                var neighbourElement = convertIntoNode("span|" + checkX + "|" + checkY);

                if (neighbourElement != endNode && neighbourElement != startNode) {
                    document.getElementById("span|" + checkX + "|" + checkY).className = "neighbour";
                }
                
                //console.log(neighbourElement.xPos, neighbourElement.yPos);
                //document.getElementById("span|" + checkX + "|" + checkY).innerText = neighbourElement.pathCost;
                neighbourElement.parent = currentElement;
                frontier.unshift(neighbourElement);
            }
        }
    }
}

function initializeDFS() {
    //console.log("starting");

    if (document.getElementById("DFS").value.length === 0) {
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
    frontier.length = 0;
    visitedNode.length = 0;

    return 1
}