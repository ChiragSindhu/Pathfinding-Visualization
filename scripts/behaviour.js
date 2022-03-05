function turnASTART(condition) {
    if (condition === 0) {
        $("#ASTART").val("");
        $("#ASTART").css("background-color", "rgb(255, 181, 70)");
        
        $("#loadingBufferASTART").css("opacity", "1");
    } else {
        $("#ASTART").val("A* Pathfinding");
        $("#ASTART").css("background-color", "rgb(255, 153, 0)");
        
        $("#loadingBufferASTART").css("opacity", "0");
    }
}

function turnGREEDY(condition) {
    if (condition === 0) {
        $("#GREEDY").val("");
        $("#GREEDY").css("background-color", "rgb(255, 116, 146)");
        
        $("#loadingBufferGREEDY").css("opacity", "1");
    } else {
        $("#GREEDY").val("Greedy Best First");
        $("#GREEDY").css("background-color", "rgb(255, 0, 55)");
        
        $("#loadingBufferGREEDY").css("opacity", "0");
    }
}

function turnDIJKSTRA(condition) {
    if (condition === 0) {
        $("#DIJKSTRA").val("");
        $("#DIJKSTRA").css("background-color", "rgb(255, 110, 166)");
        
        $("#loadingBufferDIJKSTRA").css("opacity", "1");
    } else {
        $("#DIJKSTRA").val("Dijkstra");
        $("#DIJKSTRA").css("background-color", "rgb(255, 0, 98)");
        
        $("#loadingBufferDIJKSTRA").css("opacity", "0");
    }
}

function turnBFS(condition) {
    if (condition === 0) {
        $("#BFS").val("");
        $("#BFS").css("background-color", "rgb(143, 255, 236)");
        
        $("#loadingBufferBFS").css("opacity", "1");
    } else {
        $("#BFS").val("BFS");
        $("#BFS").css("background-color", "rgb(0, 255, 213)");
        
        $("#loadingBufferBFS").css("opacity", "0");
    }
}

function turnDFS(condition) {
    if (condition === 0) {
        $("#DFS").val("");
        $("#DFS").css("background-color", "rgb(232, 155, 255)");
        
        $("#loadingBufferDFS").css("opacity", "1");
    } else {
        $("#DFS").val("DFS");
        $("#DFS").css("background-color", "rgb(195, 0, 255)");
        
        $("#loadingBufferDFS").css("opacity", "0");
    }
}