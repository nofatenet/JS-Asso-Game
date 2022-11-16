const scoreDisplay = document.querySelector("#score-display");
const questionDisplay = document.querySelector("#question-display");

const questionsArr = [
    {
        correct: 2,
        option: ['befolgen', 'darstellen'],
        quiz: ['spielen', 'agieren', 'mimen'],
    },
    {
        correct: 2,
        option: ['trace', 'adjacent'],
        quiz: ['close', 'near', 'next'],
    },
    {
        correct: 2,
        option: ['mad', 'exotic'],
        quiz: ['foreign', 'national', 'ethnic'],
    },
    {
        correct: 1,
        option: ['forecast', 'sustainable'],
        quiz: ['assume', 'insight', 'weather'],
    },
    {
        correct: 2,
        option: ['charity', 'rapid'],
        quiz: ['fast', 'quick', 'prompt'],
    },
];

let order = 0;

let score = 0;
scoreDisplay.textContent = score;

// Message if Right or Wrong:
const msgDOM = document.createElement("div");
msgDOM.textContent = "";
msgDOM.classList.add("answer-msg");
document.body.append(msgDOM);

//Remember: Arrow-Functions are not hoisting, as they are handled like variables, so we declare them here.

const msgMeaning = (meaning) => {
    if (meaning == "Right!") {
        msgDOM.classList.remove("wrong");
        msgDOM.classList.add("right");
    } else {
        msgDOM.classList.remove("right");
        msgDOM.classList.add("wrong");
    }
    msgDOM.textContent = meaning;
};

const checkAnswer = (questionButton, option, optionIndex, correct) => {
    console.log("option", option);
    console.log("optionIndex", optionIndex);
    if (optionIndex == correct) {
        console.log("YEPP!");
        score++;
        scoreDisplay.textContent = score;
        msgMeaning("Right!");
    }
    else {
        console.log("Nooooooo...");
        score--;
        scoreDisplay.textContent = score;
        msgMeaning("Wrong!");
    }

    order++;
    document.querySelector(".quest-box").remove();

    setTimeout(() => {
        createQuestions();
    }, 100);
    
};

const createQuestions = () => {
    questionsArr.forEach((question, questionIndex) => {

        if( questionIndex == order ) {
        const questBox = document.createElement("div");
        questBox.classList.add("quest-box");

        const logoDisplay = document.createElement("h1");
        logoDisplay.textContent = "¤";
        questBox.append(logoDisplay);

        question.quiz.forEach(tip => {
            const tipText = document.createElement("p");
            tipText.textContent = tip;
            questBox.append(tipText);
        });

        const questOptions = document.createElement("div");
        questOptions.classList.add("quest-btns");
        questBox.append(questOptions);

        question.option.forEach((option, optionIndex) => {
            const questionButton = document.createElement("button");
            questionButton.classList.add("quest-btn");
            questionButton.textContent = option;

            questionButton.addEventListener("click", () => checkAnswer(questionButton, option, optionIndex + 1, question.correct));

            questOptions.append(questionButton);
        });

        questionDisplay.append(questBox);

        } else if (order == questionsArr.length) {
            console.log("Game Over");
        } //EndIf

    });
};

createQuestions();
