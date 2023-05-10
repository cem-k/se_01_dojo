const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

let from, to;

const question1 = () => {
return new Promise((resolve, reject) => {
    rl.question('From: ', (answer) => {
    from = answer;
    resolve()
    })
})
}

const question2 = () => {
return new Promise((resolve, reject) => {
    rl.question('To: ', (answer) => {
    to = answer;
    console.log(pour())
    resolve()
    })
})
}

// define initial composition of the beakers
let beakers = {
    1: [1, 0, 0],
    2: [2, 1, 2],
    3: [2, 1, 1]
};

// function to handle the pouring action
function pour(){
    let drop = [];
    let last = 0;

    // go in reverse through the from breaker to select the drops
    for(let i = beakers[from].length-1; i >= 0; i--){
        if(beakers[from][i] != 0){
            if(drop.length == 0){
                drop.push(beakers[from][i]);
                last = beakers[from][i]
            } else if(beakers[from][i] == last){
                drop.push(beakers[from][i]);
            }
        }
    }

    // check if the pouring of the drop is possible
    for(let i = 0; i < beakers[to].length; i++){
        if(beakers[to][i] == 0){
            if(beakers[to][i-1] == drop[0]){
                return true;
            } 
        }
    }

    return false
}

async function main(){
    await question1()
    await question2()
    rl.close()
}
main()