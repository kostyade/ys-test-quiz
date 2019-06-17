const MapUtils={
    convertString,
    getDimensions,
    getMap
}

const vectorsMap={
    '>':[1,0],
    '<':[-1,0],
    'v':[0,1],
    '^':[0,-1]
}

const directions = ['>','<','^','v'];

class Position{
    constructor(x,y,direction,parent){
        this.x=x;
        this.y=y;
        this.direction=direction;
        this.parent=parent;
    }
    get id(){
        return `${this.x}_${this.y}_${this.direction}`
    }
}

class UserMap{
    constructor(matrix,dimensions){
        this.matrix=matrix;
        this.dimensions=dimensions;
    }
}

function getMap(str){
    let initPosition=null;
    const matrix=str.split('\n').map((row,i)=>{
        if(!initPosition){
            let j = row.search(new RegExp("[v><^]"));
            if(j>-1){
                initPosition=new Position(j,i,row[j],null);
            }
        }
        return row.split('')
    });
    const dimensions=getDimensions(matrix);
    const userMap=new UserMap(matrix,dimensions);
    
    console.log(getSolutionPosition(initPosition,matrix,dimensions));
}

function getSolutionPosition(initialPosition,matrix,dimensions){
  const visitedSet=new Set();
  const queue=[initialPosition];
  let finishPosition=null;
  visitedSet.add(initialPosition.id);

  while (queue.length){
      let currentPosition=queue.shift();
      exploreMoves(currentPosition)
    if (finishPosition){
        break
    }
  }

  return finishPosition||null;

  function exploreMoves(pos){
     const pf=new Position(pos.x+vectorsMap[pos.direction][0],pos.y+vectorsMap[pos.direction][1],pos.direction,pos);
     if(pf.x===dimensions.x||pf.y===dimensions.y||pf.x<0||pf.y<0){
         finishPosition=pf;
         return;
     }
     if(matrix[pf.y][pf.x]!=='#'&&!visitedSet.has(pf.id)){
        queue.push(pf);
        visitedSet.add(pf.id);
     }
     directions.forEach(direction=>{
         let pr=new Position(pos.x,pos.y,direction,pos)
         if(direction!==pos.direction&&!visitedSet.has(pr.id)){
            queue.push(pr);
            visitedSet.add(pr.id);
         }
     })
     
  }
}

function convertString(str){
    let matrix=[];
    matrix=str.split('\n').map(row=>row.split(''));
    getMap(str)

    return matrix
}

function getDimensions(matrix){  
    return {
        x:Math.max(...matrix.map(row=>row.length)),   //Decided to implement this for cases when user enters lines of different length
        y:matrix.length
    }
}

export default MapUtils;