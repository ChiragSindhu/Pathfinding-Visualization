var PointEnabled = 1;
var isObstacleEnabled = 0;
var resetAlgo = 0;
var speed = 50;

function createStartNodePoints(nodeElement) {
    if (PointEnabled === 1) {
        if (document.getElementsByClassName("startNode").length > 0) {
            document.getElementsByClassName("startNode")[0].className = "node";
        }

        convertIntoNode(nodeElement.id).isWalkble = 1;
        nodeElement.className = "startNode";
    } else if(PointEnabled === 2) {
        if (document.getElementsByClassName("endNode").length > 0) {
            document.getElementsByClassName("endNode")[0].className = "node";
        }

        convertIntoNode(nodeElement.id).isWalkble = 1;
        nodeElement.className = "endNode";
    }

    if (isObstacleEnabled === 1) {
        nodeElement.className = "obstacle";

        convertIntoNode(nodeElement.id).isWalkble = 0;
    } else if (isObstacleEnabled === 2) {
        nodeElement.className = "node";
        convertIntoNode(nodeElement.id).isWalkble = 1;
    }
}

function changeStartPointEnabled() {
    PointEnabled = 1;
    isObstacleEnabled = 0;
}

function changeEndPointEnabled() {
    PointEnabled = 2;
    isObstacleEnabled = 0;
}

function changeObstacleEnabled() {
    isObstacleEnabled = 1;
    PointEnabled = 0;
}

function changePathEnabled() { 
    isObstacleEnabled = 2;
    PointEnabled = 0;
}

function resetMap() {  
    if(document.getElementById("ASTART").value.length === 0 || document.getElementById("DIJKSTRA").value.length === 0 || document.getElementById("BFS").value.length === 0 || document.getElementById("DFS").value.length === 0)
        resetAlgo = 1;
    
    if (document.getElementById("GREEDY").value.length === 0)
        resetAlgo = 1;
    
    var currentArray = document.getElementsByClassName("currentNode");

    while (currentArray.length != 0) {
        for (let i = 0; i < currentArray.length; i++) {
            convertIntoNode(currentArray[i].id).isWalkble = 1;
            currentArray[i].className = "node"
        }
        currentArray = document.getElementsByClassName("currentNode");
    }

    var neighbourArray = document.getElementsByClassName("neighbour");

    while (neighbourArray.length != 0) {
        for (let i = 0; i < neighbourArray.length; i++) {
            convertIntoNode(neighbourArray[i].id).isWalkble = 1;
            neighbourArray[i].className = "node"
        }
        neighbourArray = document.getElementsByClassName("neighbour");
    }

    var pathArray = document.getElementsByClassName("path");

    while (pathArray.length != 0) {
        for (let i = 0; i < pathArray.length; i++) {
            convertIntoNode(pathArray[i].id).isWalkble = 1;
            pathArray[i].className = "node"
        }
        pathArray = document.getElementsByClassName("path");
    }
}

function resetWalls() {
    var obsArray = document.getElementsByClassName("obstacle");

    while (obsArray.length != 0) {
        for (let i = 0; i < obsArray.length; i++) {
            convertIntoNode(obsArray[i].id).isWalkble = 1;
            obsArray[i].className = "node"
        }
        obsArray = document.getElementsByClassName("obstacle");
    }
}

function changeSpeed() {
    if (speed === 50) {
        speed = 25;
        $("#changeSpeed").val("Speed Average");
    } else if (speed === 25) {
        speed = 1;
        $("#changeSpeed").val("Speed Fast");
    } else if (speed === 1) {
        speed = 300;
        $("#changeSpeed").val("Speed very Slow");
    } else if (speed === 300) {
        speed = 50;
        $("#changeSpeed").val("Speed Slow");
    }
}

function randomMaze() {
    resetWalls();

    for (let x = 0; x < gridY; x++) {
        for (let y = 0; y < gridX; y++) {
            if (Math.floor(Math.random() * 100) % (Math.floor(Math.random() * 3) + 3) === 0 && document.getElementById("span|" + x + "|" + y).className !== "startNode" && document.getElementById("span|" + x + "|" + y).className !== "endNode") {
                Grid[x][y].isWalkble = 0;
                document.getElementById("span|" + x + "|" + y).className = "obstacle";
            }
        }
    }
}

function convertIntoNode(elementID) {
    const settingList = elementID.split('|');
    const xPos = settingList[1];
    const yPos = settingList[2];

    return Grid[xPos][yPos];
}