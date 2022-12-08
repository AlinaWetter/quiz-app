let questions = [
    {
        'question': 'Woraus besteht der erste Zauberstab, den Mr Ollivander Harry Potter testen lässt?',
        'answer_1': 'Buchenholz und Drachenherzfasern. Neun Zoll. Handlich und biegsam.',
        'answer_2': 'Ahorn und Phönixfeder. Sieben Zoll. Peitscht so richtig.',
        'answer_3': 'Ebenholz und Einhornhaare, achteinhalb Zoll, federnd.',
        'correct_answer': 1
    },
    {
        'question': 'Welche Wirkung hat der Zauber "Aparecium"?',
        'answer_1': 'Belebt bewusstlose Menschen',
        'answer_2': 'Zerstört ein beliebiges Objekt',
        'answer_3': 'Enthüllt verborgene Dinge',
        'correct_answer': 3
    },
    {
        'question': 'Wie viel zahlt Harry für sein fahrendere Ritter Ticket inklusive heißer Schokolade an diesem Tag?',
        'answer_1': '13 Sickel',
        'answer_2': '4 Sickel',
        'answer_3': '15 Sickel',
        'correct_answer': 1
    },
    {
        'question': 'Auf welche Geschwindigkeit kann der Feuerblitz innerhalb von 10 Sekunden beschleunigen?',
        'answer_1': '150 km/h',
        'answer_2': '300 km/h',
        'answer_3': '250 km/h',
        'correct_answer': 3
    },
    {
        'question': 'Und wenn wir schon beim Thema sind: die wievielte Quidditch-Weltmeisterschaft besucht Harry mit den Weasleys?',
        'answer_1': '389.',
        'answer_2': '422.',
        'answer_3': '778.',
        'correct_answer': 2
    },
    {
        'question': 'Was befindet sich in dem Zauber-Knallbonbon, den er mit Fred an Weihnachten knallen lässt?',
        'answer_1': 'Ein Zauberschachset und Berty Botts Bohnen.',
        'answer_2': 'Der Hut eines Admirals und mehrere lebende weiße Mäus',
        'answer_3': 'Ein spitzer Zauberhut und eine Kröte.',
        'correct_answer': 1
    },
    {
        'question': 'Wie lautet der vollständige Name von Dumbledore',
        'answer_1': 'Albus Magnus Severus Dumbledore',
        'answer_2': 'Albus Percival Wulfric Brian Dumbledore',
        'answer_3': 'Albus Brian Christopher Damian Earl Dumbledore',
        'correct_answer': 2
    },
    {
        'question': 'Welchen Code muss man eingeben, um Zutritt durch die Telefonzelle zu erlangen?',
        'answer_1': '62443',
        'answer_2': '62334',
        'answer_3': '26334',
        'correct_answer': 1
    },
    {
        'question': 'Welche Note erlangt er in in der Zauberergrad-Prüfung im Fach Astronomie?',
        'answer_1': 'M - Mies',
        'answer_2': 'A - Annehmbar',
        'answer_3': 'E - Erwartungen übertroffen',
        'correct_answer': 2
    },
    {
        'question': 'In welchem Jahr ist Sir Nicholas gestorben?',
        'answer_1': '1492',
        'answer_2': '1538',
        'answer_3': '1624',
        'correct_answer': 1
    }
]

let rightAnswers = []

let currentQuestion = 0;

let AUDIO_SUCCESS = new Audio('./sounds/right.mp3')
let AUDIO_FAIL = new Audio('./sounds/wrong.mp3')
let AUDIO_CONGRATS = new Audio('./sounds/congrats.lq.mp3')

function init() {
    showtotalQuestions()
    showQuestion()
    showQuestionNumber()
    progressBar()
    hideStartingPage()
}

function hideStartingPage() {
    document.getElementById('startingPage').style.display = ('none')
    document.getElementById('card').style.display = ('flex')
}

function progressBar() {
    document.getElementById('progressBar').style.width = ('0%')
}

function showtotalQuestions() {
    document.getElementById('all-questions').innerHTML = questions.length;
    document.getElementById('all-questions-end').innerHTML = questions.length;
    document.getElementById('right-answers').innerHTML = rightAnswers.length;
}

function showQuestionNumber() {
    document.getElementById('numberOfQuestion').innerHTML = currentQuestion + 1;
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        showEndScreen()
    } else {
        showQuestionScreen()
    }
}

function showEndScreen() {
    document.getElementById('endPicture').style.display = ('flex');
    document.getElementById('card').style.display = ('none');
    document.getElementById('endPicture').classList.add('end-card')
    document.getElementById('trophy').style.display = ('block')
    AUDIO_CONGRATS.play();
    showtotalQuestions();
}

function showQuestionScreen() {
    let question = questions[currentQuestion];
    document.getElementById('questiontext').innerHTML = question['question']
    document.getElementById('answer_1').innerHTML = ` <div class="abcd">A</div>` + `<span>` + question['answer_1'] + `</span>`
    document.getElementById('answer_2').innerHTML = ` <div class="abcd">B</div>` + `<span>` + question['answer_2'] + `</span>`
    document.getElementById('answer_3').innerHTML = ` <div class="abcd">C</div>` + `<span>` + question['answer_3'] + `</span>`
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['correct_answer']}`;

    if (selectedQuestionNumber == question['correct_answer']) {
        rightAnswer(selection)
    } else {
        wrongAnswer(selection, idOfRightAnswer)
    }

    document.getElementById('nextButton').disabled = false;
}

function rightAnswer(selection) {
    document.getElementById(selection).parentNode.classList.add('bg-success', 'bg-opacity-50')
    rightAnswers.push(1);
    AUDIO_SUCCESS.play();
}

function wrongAnswer(selection, idOfRightAnswer) {
    document.getElementById(selection).parentNode.classList.add('bg-danger', 'bg-opacity-50')
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success', 'bg-opacity-50')
    AUDIO_FAIL.play();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger', 'bg-opacity-50')
    document.getElementById('answer_1').parentNode.classList.remove('bg-success', 'bg-opacity-50')
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger', 'bg-opacity-50')
    document.getElementById('answer_2').parentNode.classList.remove('bg-success', 'bg-opacity-50')
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger', 'bg-opacity-50')
    document.getElementById('answer_3').parentNode.classList.remove('bg-success', 'bg-opacity-50')
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('nextButton').disabled = true;
    resetAnswerButtons();
    showQuestion();
    showQuestionNumber();
}

function restart() {
    window.location.reload();
}

function checkCurrentPercentage() {
    let percentage = ((currentQuestion + 1) / questions.length) * 100
    document.getElementById('progressBar').style.width = (`${percentage}%`)
}