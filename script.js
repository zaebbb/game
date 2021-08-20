// (() => {
 

// })()


// globals
let input_start_game = document.querySelector('.input_start_name')
let btn_start_game = document.querySelector('.btn_start_game')
let bg_start = document.querySelector('.start')
let game = document.querySelector('.game')
let basket = document.querySelector('.basket img')
let fruits = document.querySelector('.fruits')
let endGame = document.querySelector('.endGame')

//  settings
let speed = 40;
let timer = 300;
let countFruit = 0


if(!input_start_game.value == "" || !input_start_game.value== " "){
    btn_start_game.disabled = false;
}

input_start_game.addEventListener('change', e => {
    if(e.value != "" && e.value != " "){
        btn_start_game.disabled = false;
    } else{
        btn_start_game.disabled = true;
    }
})

btn_start_game.addEventListener("click", () => {
    bg_start.classList.add('hidd')
    setTimeout(() => {
        bg_start.style.display = 'none'
        game.style.display = 'flex'
        setTimeout(() => {
            game.classList.remove('hidd')
            gamePlay()
        })
    }, 500)
})
   

function gamePlay(){
    function keyClick(e){
        if(e.key == "ArrowLeft"){
            if(basket.style.left != "0px"){
            basket.style.left = (parseInt(basket.style.left) || 0) - speed + "px";
            }
            basket.style.transform = "rotateY(180deg)"
        }
        if(e.key == "ArrowRight"){
            if(basket.style.left != "1000px"){
            basket.style.left = (parseInt(basket.style.left) || 0) + speed + "px";
            }
            basket.style.transform = "rotateY(0deg)"
        }
        
    }
    document.addEventListener('keydown', keyClick)
    setInterval(() => {
        let fruit = document.createElement('img');
        fruit.src = './img/fruct' + Math.floor(Math.random() * 3 + 1) + '.png';
        fruit.style.left = Math.random() * 1000 + "px";
        fruits.appendChild(fruit);
        setTimeout(() => {
            fruit.style.transform = "translateY(800px)"
        }, 1500)
            
    }, 5000)
    
    function countdown(){
        let minute = Math.floor(timer / 60);
        let seconds = (timer - minute * 60);
    
        document.querySelector('.minute').innerHTML = formatTime(minute);
        document.querySelector('.second').innerHTML = formatTime(seconds);
    }
    
    function formatTime(time){
        return time < 10 ? (`0${time}`) : time;
    }
    
    
    countdown()
    setInterval(() => {
        timer--;
        countdown()
        console.log(timer);
    }, 1000)
    setInterval(() => {
        let fruits_log = document.querySelectorAll('.fruits img')
        for(let i = 0; i < fruits_log.length; i++){
            if(
                fruits_log[i].getBoundingClientRect().left > basket.getBoundingClientRect().left &&
                fruits_log[i].getBoundingClientRect().left + 50 < basket.getBoundingClientRect().left + 100 &&
                fruits_log[i].getBoundingClientRect().bottom > 750 &&
                fruits_log[i].getBoundingClientRect().bottom < 825
                ){
                    fruits_log[i].style.display = 'none';
                    countFruit++;
                    timer += 5;
                    document.querySelector('.countFruit span').textContent = countFruit
                } else if(fruits_log[i].getBoundingClientRect().bottom > 825){
                    fruits_log[i].classList.add('hidd')
                }
        }
    document.querySelector('.countEnd').textContent = countFruit;
        if(timer == 290){
            game.classList.add('hidd')
            setTimeout(() => {
                game.style.display = "none";
                endGame.style.display = "flex";
                setTimeout(() => {
                    endGame.classList.remove('hidd')
                }, 50)
            }, 500)
            timer = 300;
            countFruit = 0;
            fruits.innerHTML = "";
            return;
        }
    }, 200)
    if(timer == 0){
        game.classList.add('hidd')
        setTimeout(() => {
            game.style.display = "none";
            endGame.style.display = "flex";
            setTimeout(() => {
                endGame.classList.remove('hidd')
            }, 50)
        }, 500)
        timer = 300;
        countFruit = 0;
        fruits.innerHTML = "";
        return;
    }
}

document.querySelector('.newGame').addEventListener('click', () => {
    endGame.classList.add('hidd')
    setTimeout(() => {
        endGame.style.display = "none";
        bg_start.style.display = "flex";
        setTimeout(() => {
            bg_start.classList.remove('hidd')
            location.reload();
        }, 50)
    }, 500)
})
