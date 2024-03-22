const questionEl = document.getElementById("question");
let storedAnswer;
score = localStorage.getItem("score");
const inputEl = document.getElementById("answerInput")
const finalAnswerEl = document.getElementById("finalAnswer")
const submitEl = document.querySelector(".primary-btn");
const scoreEl = document.getElementById("score");

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateQuestion = () => {
    const randomNumber1 = +randomNumber(1, 10);
    const randomNumber2 = +randomNumber(1, 10);
    const questionType = randomNumber(1, 4)
    let question;
    let answer;
    let firstNumber;
    let secondNumber;
    if(randomNumber1 > randomNumber2 && questionType === 3 || questionType === 4){
        firstNumber = randomNumber1;
        secondNumber = randomNumber2;
    } else{
        firstNumber = randomNumber2;
        secondNumber = randomNumber1;
    }
    switch (questionType) {
        case 1: question = `Q. What is ${firstNumber} multiply by ${secondNumber} ?`;
                answer = firstNumber * secondNumber; 
                break;
        case 2: question = `Q. What is ${firstNumber} addition by ${secondNumber} ?`;
                answer = firstNumber + secondNumber;
                break;
        case 3: question = `Q. What is ${firstNumber} substraction by ${secondNumber} ?`;
                answer = firstNumber - secondNumber;
                break;
        case 4: question = `Q. What is ${firstNumber} division by ${secondNumber} ?`
                answer = Math.floor(firstNumber/ secondNumber);
                break;
    }

    return { question, answer };
};

const showQuestion = () => {
    const { question, answer } = generateQuestion();
    questionEl.innerHTML = question;
    scoreEl.innerText = score;
    storedAnswer = answer;
};

const checkAnswer = () => {
    const userAnswer = +inputEl.value;
    console.log(userAnswer, storedAnswer);
    if (userAnswer === storedAnswer) {
        score ++;
        scoreEl.innerText = score;
        localStorage.setItem("score",score)
        inputEl.value = ""
        Toastify({
            text: `Your are right and your score is ${score}`,
            gravity: "bottom",
            position: "center",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
        showQuestion();
        return false;
        
    }
    else {
        score --;
        scoreEl.innerText = score;
        localStorage.setItem("score",score)
        inputEl.value = ""
        Toastify({
            text: `Your are wrong and your score is ${score}`,
            gravity: "bottom",
            position: "center",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
        showQuestion();
        return false;
    }
}

// submitEl.addEventListener("submit",checkAnswer);
showQuestion();


