// define initial composition of the beakers
let beakers = {
    1: [1, 0, 0],
    2: [2, 1, 2],
    3: [2, 1, 0]
};

// function to handle the pouring action
function pour(from, to){
    let drop = 0;

    for(let i = beakers[from].length-1; i >= 0; i--){
        if(beakers[from][i] != 0){
            drop = beakers[from][i];
            break;
        }
    }

    for(let i = 0; i < beakers[to].length; i++){
        if(beakers[to][i] == 0){
            beakers[to][i] = drop;
            break;
        }
    }
}

pour(2, 3);
console.log(beakers)