const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

let from, to;
let resume = true;

const question1 = () => {
return new Promise((resolve, reject) => {
    rl.question('From: ', (answer) => {
    from = answer;
    resolve();
    })
})
}

const question2 = () => {
return new Promise((resolve, reject) => {
    rl.question('To: ', (answer) => {
    to = answer;
    resolve();
    })
})
}

// define initial composition of the beakers
let beakers = {
    1: [1, 0, 0],
    2: [2, 1, 2],
    3: [2, 1, 0],
};

let drop = [];

// function to handle the pouring action
function check(from, to){
    drop = [];
    let last = 0;

    // go in reverse through the from breaker to select the drops
    for(let i = beakers[from].length-1; i >= 0; i--){
        if(beakers[from][i] != 0){
            if(drop.length == 0){
                drop.push(beakers[from][i]);
                last = beakers[from][i];
            } else if(beakers[from][i] == last){
                drop.push(beakers[from][i]);
            } else if(beakers[from][i] != last){
                break;
            }
        }
    }

    // check if the pouring of the drop is possible
    for(let i = 0; i < beakers[to].length; i++){
        if(beakers[to][i] == 0){
            if((beakers[to][i-1] == drop[0] && beakers[to].length - i >= drop.length) || i == 0){
                return true;
            } 
        }
    }

    return false;
}

function pour() {
    // go in reverse through the from breaker to remove the drop
    for(let i = beakers[from].length-1; i >= 0; i--){
        if(beakers[from][i] != 0){
            for(let j = 0; j < drop.length; j++){
                beakers[from][i-j] = 0;
            }
            break;
        }
    }

    // pour the drop to the other beaker
    for(let i = 0; i < beakers[to].length; i++){
        if(beakers[to][i] == 0){
            for(let j = 0; j < drop.length; j++){
                beakers[to][i+j] = drop[j];
            }
            break;
        }
    }
}


// check if the beakers are empty or contain only one liquid
function checkFinish() {
    for(const key in beakers){
        let unique = new Set(beakers[key])
        if(unique.size > 2 || (unique.size == 2 && !beakers[key].includes(0))){
            return true;
        }
    }
    return false;
}

// check if there are any legal moves left
function checkLose() {
    let length = Object.keys(beakers).length
    for(let i = 1; i <= length; i ++){
        for(let j = 1; j <= length; j++){
            if(i == j){
                continue;
            }
            let possible = check(i, j);
            if(possible){
                return false;
            }
        }
    }
    return true;
}


// main function to call the other function in order
async function main(){
    console.table(beakers);
    while(resume){
        if(checkLose()){
            console.log("No moves left. You lost!");
            break;
        }

        await question1();
        await question2();
        if(check(from, to)){
            pour();
            console.table(beakers);
            resume = checkFinish();
        } else {
            console.log("Move not legal!");
        }
    }
    console.log("You won!");
    rl.close();
}

main();