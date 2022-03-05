var frontier = [];
var visitedNode = [];

function dijkstraAlgo(condition) {
    if (initializeDijkstra() === 0)
        return;
    
    if (condition === 0)
        turnDIJKSTRA(0);
    else if (condition === 1)
        turnBFS(0);

    findPathDijkstra(condition);
}

function bfsAlgo() {
    dijkstraAlgo(1);
}

function findPathDijkstra(condition) {
    const startNode = convertIntoNode(document.getElementsByClassName("startNode")[0].id);
    const endNode = convertIntoNode(document.getElementsByClassName("endNode")[0].id);

    frontier.push(endNode);
    endNode.pathCost = 0;

    calc_DistanceDijkstra(startNode, endNode,condition);
}

function calc_DistanceDijkstra(startNode,endNode,condition) {
    setTimeout(function () { 
        if (resetAlgo === 1) {
            resetAlgo = 0;
            if (condition === 0)
                turnDIJKSTRA(1);
            else if (condition === 1)
                turnBFS(1);
            
            return;
        }

        var currentElement = frontier[0];

        if (currentElement.xPos === startNode.xPos && currentElement.yPos === startNode.yPos) {
            backTrace_path(startNode,endNode,startNode,condition);
            //console.log(visitedNode);
            return;
        }

        //console.log("CurrentElement => " + currentElement.xPos + " , " + currentElement.yPos);
        if (currentElement != startNode && currentElement != endNode) {
            document.getElementById("span|" + currentElement.xPos + "|" + currentElement.yPos).className = "currentNode";
            document.getElementById("span|" + currentElement.xPos + "|" + currentElement.yPos).style.animation = "bounceAnimation 0.3s linear";
        }

        checkCurrentNodeNeighbour(startNode,currentElement);

        frontier.splice(frontier.indexOf(currentElement), 1);
        visitedNode.push(currentElement);

        //console.log(visitedNode);
        
        if (frontier.length != 0) {
            calc_DistanceDijkstra(startNode,endNode,condition);
        }

        if (frontier.length== 0) {
            if (condition === 0)
                turnDIJKSTRA(1);
            else if (condition === 1)
                turnBFS(1);

            console.log("No path found!");
        }

        //console.log("-----------------------");
    },speed);
}

function backTrace_path(startNode,endNode,currentPath,condition) {
    setTimeout(function () {
        if (resetAlgo === 1) {
            resetAlgo = 0;
            if (condition === 0)
                turnDIJKSTRA(1);
            else if (condition === 1)
                turnBFS(1);

            return;
        }

        var minimumElement = currentPath;

        for (var y = -1; y <= 1; y++) {
            for (var x = -1; x <= 1; x++) {
                if (Math.abs(x) == Math.abs(y))
                    continue;

                var checkX = currentPath.xPos + x;
                var checkY = currentPath.yPos + y;

                if (checkX >= 0 && checkX < gridY && checkY >= 0 && checkY < gridX) {
                    if (Grid[checkX][checkY].isWalkble === 0 || !visitedNode.includes(convertIntoNode("span|" + checkX + "|" + checkY)) || frontier.includes(convertIntoNode("span|" + checkX + "|" + checkY))) {
                        continue;
                    }

                    if (Grid[checkX][checkY].pathCost <= minimumElement.pathCost) {
                        minimumElement = Grid[checkX][checkY];
                    }
                }
            }
        }

        currentPath = minimumElement;
        
        if(currentPath != startNode && currentPath != endNode)
            document.getElementById("span|" + currentPath.xPos + "|" + currentPath.yPos).className = "path";

        if (currentPath != endNode) {
            backTrace_path(startNode, endNode, currentPath, condition);
        }

        if (currentPath == endNode) {
            if (condition === 0)
                turnDIJKSTRA(1);
            else if (condition === 1)
                turnBFS(1);
            else
                turnDFS(1);
        }
    },speed);
}

function checkCurrentNodeNeighbour(startNode,currentElement) {
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
                neighbourElement.pathCost = Infinity;

                var newDistance = currentElement.pathCost + getDistanceDijkstra(neighbourElement.xPos,currentElement.xPos,neighbourElement.yPos,currentElement.yPos);
                neighbourElement.pathCost = Math.min(neighbourElement.pathCost, newDistance);

                if (checkX != startNode.xPos && checkY != startNode.yPos) {
                    document.getElementById("span|" + checkX + "|" + checkY).className = "neighbour";
                }
                
                //console.log(neighbourElement.xPos, neighbourElement.yPos, neighbourElement.pathCost);
                //document.getElementById("span|" + checkX + "|" + checkY).innerText = neighbourElement.pathCost;

                addNeighbourToFrontier(neighbourElement);
            }
        }
    }
}

function addNeighbourToFrontier(element) {
    if (frontier.length === 0) {
        frontier.push(element);
        return;
    }

    for (let i = 0; i < frontier.length; i++) {
        if (frontier[i].pathCost >= element.pathCost) {
            frontier.splice(i, 0, element);
            break;
        }

        if (i === frontier.length - 1) {
            frontier.push(element);
        }
    }
}

function initializeDijkstra() {
    //console.log("starting");

    if (document.getElementById("DIJKSTRA").value.length === 0 || document.getElementById("BFS").value.length === 0) {
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