//This service returns dimensions for cases of non rectangle maps and map with directions object

const MapUtils = {
  getDimensions,
  getMap
};

const vectorsMap = {
  ">": [1, 0],
  "<": [-1, 0],
  v: [0, 1],
  "^": [0, -1]
};
const directions = [">", "<", "^", "v"];

class Position {
  constructor(x, y, direction, parent) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.parent = parent;
  }
  get id() {
    return `${this.x}_${this.y}_${this.direction}`;
  }
}
class Move {
  constructor(resultPosition, text="", type, duration = 1) {
    this.duration = duration;
    this.text = text;
    this.positions = [{x:resultPosition.x,y:resultPosition.y}];
    this.direction = resultPosition.direction;
    this.type = type;
  }
  increaseDuration(resultPosition) {
    this.positions.push({x:resultPosition.x,y:resultPosition.y});
    this.duration++;
    this.text = `Move ${this.duration} steps forward`;
  }
  get positionsCount(){
      return this.positions.length;
  }
}

function getMap(str) {
  let { initPosition, matrix, dimensions } = parseStr(str);

  const lastPos = getFinalPosition(initPosition, matrix, dimensions);
  const {wayMatrix, moves}=getWayDirections(matrix, lastPos, initPosition);

  return {
      initPosition,
      wayMatrix,
      dimensions,
      moves
  }
}

//Method for recovering path from end to finish via position's parent
function getWayDirections(matrix, lastPos, initPosition) {
  const wayMatrix = [...matrix];
  const moves = [];
  if(!lastPos){
    moves.unshift(new Move(initPosition, "Seems you're trapped", "NOWAY", 1));
    wayMatrix[initPosition.y][initPosition.x] = "*";
    return { wayMatrix, moves };
  }
  let parentPos = lastPos.parent;
  let currentMove = null;
  while (parentPos.parent) {
    let nextPos = parentPos.parent;
    let nextMove = getMove(parentPos, nextPos);
    if (
      currentMove &&
      currentMove.type === "FORWARD" &&
      nextMove.type === "FORWARD"
    ) {
      currentMove.increaseDuration(parentPos);
    } else {
      moves.unshift(nextMove);
      currentMove = nextMove;
    }

    wayMatrix[parentPos.y][parentPos.x] = "*";

    parentPos = nextPos;
  }
  wayMatrix[parentPos.y][parentPos.x] = "*";
  return { wayMatrix, moves };
}

function parseStr(str) {
  let initPosition = null;
  const matrix = str.split("\n").map((row, i) => {
    if (!initPosition) {
      let j = row.search(new RegExp("[v><^]"));
      if (j > -1) {
        initPosition = new Position(j, i, row[j], null);
      }
    }
    return row.split("");
  });
  const dimensions = getDimensions(matrix);
  return {
    initPosition,
    matrix,
    dimensions
  };
}

//Method for finding exit position with retaining previous position for each step
function getFinalPosition(initialPosition, matrix, dimensions) {
  const visitedSet = new Set();   //Need to remember visited cells
  const queue = [initialPosition];
  let finishPosition = null;
  visitedSet.add(initialPosition.id);

  while (queue.length) {
    let currentPosition = queue.shift();
    exploreMoves(currentPosition);
    if (finishPosition) {
      break;
    }
  }

  return finishPosition || null;

  //Trying each possible move from current position and put it in queue.
  function exploreMoves(pos) {
    const pf = new Position(              //position forward
      pos.x + vectorsMap[pos.direction][0],
      pos.y + vectorsMap[pos.direction][1],
      pos.direction,
      pos
    );
    if (
      pf.x === dimensions.x ||
      pf.y === dimensions.y ||
      pf.x < 0 ||
      pf.y < 0
    ) {
      finishPosition = pf;
      return;
    }
    if (matrix[pf.y][pf.x] !== "#" && !visitedSet.has(pf.id)) {
      queue.push(pf);
      visitedSet.add(pf.id);
    }
    directions.forEach(direction => {
      let pr = new Position(pos.x, pos.y, direction, pos);
      if (direction !== pos.direction && !visitedSet.has(pr.id)) {
        queue.push(pr);
        visitedSet.add(pr.id);
      }
    });
  }
}

function getMove(parentPos, currentPos) {
  if (parentPos.x !== currentPos.x || parentPos.y !== currentPos.y) {
    return new Move(parentPos, "Move Foward", "FORWARD", 1);
  } else {
    const turnText = getTurnText(parentPos.direction, currentPos.direction);
    return new Move(parentPos, turnText, "TURN", 1);
  }
}

function getDimensions(matrix) {
  return {
    x: Math.max(...matrix.map(row => row.length)), //Decided to implement this for cases when user enters lines of different length
    y: matrix.length
  };
}

function getTurnText(currentDirection, nextDirection) {
  switch (nextDirection+currentDirection) {
    case ">v":
    case "v<":
    case "<^":
    case "^>":
      return "Turn Right";
    case ">^":
    case "^<":
    case "<v":
    case "v>":
      return "Turn Left";
    case "><":
    case "<>":
    case "^v":
    case "v^":
      return "Turn Around";
    default:
      return "";
  }
}

export default MapUtils;
