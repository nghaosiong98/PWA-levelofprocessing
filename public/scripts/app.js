(function() {
  'use strict';
  const myQuestions = [
    {
      question: "android",
      answers: {
        a: "Is the word in capital letter?"
      }
    },
    {
      question: "APPLE?",
      answers: {
        a: "Is the word in capital letter?"
      }
    },
    {
      question: "COMPUTER",
      answers: {
        a: "Is the word in capital letter?"
      }
    },
    {
      question: "dog",
      answers: {
        a: "Does the word rhyme with frog?"
      }
    },
    {
      question: "trumpet",
      answers: {
        a: "Does the word rhyme with trombone?"
      }
    },
    {
      question: "library",
      answers: {
        a: "Does the word rhyme with liability?"
      }
    },
    {
      question: "banana",
      answers: {
        a: "Does the word go in this sentence?",
        b: "Banana is yellow."
      }
    },,
    {
      question: "smart",
      answers: {
        a: "Does the word go in this sentence?",
        b: "I am smart."
      }
    },
    {
      question: "egg",
      answers: {
        a: "Does the word go in this sentence?",
        b: "Cat lays egg."
      }
    }
  ];

  const finalCollection = ["library", "fish", "android", "egg", "chicken", "pineapple", "cat", "dog", "banana", "computer", "pizza", "ipad", "apple", "smart", "trumpet", "trombone", "burger", "laptop"];

  const correctAnswer = [
    {
      code: 1,
      answers:["android", "apple", "computer"]
    },
    {
      code:2,
      answers:["dog", "trumpet", "library"]
    },
    {
      code:3,
      answers:["banana", "smart", "egg"]
    }
  ];


  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (var letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<p>${currentQuestion.answers[letter]}</p>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === slides.length - 1){
      clearInterval(myTimer)
      submitButton.style.display = "inline-block"
    }
    // if (currentSlide === 0) {
    //   previousButton.style.display = "none";
    // } else {
    //   previousButton.style.display = "inline-block";
    // }
    
    // if (currentSlide === slides.length - 1) {
    //   nextButton.style.display = "none";
    //   submitButton.style.display = "inline-block";
    // } else {
    //   nextButton.style.display = "inline-block";
    //   submitButton.style.display = "none";
    // }
  }
  

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const submitButton = document.getElementById("submit");

  // // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  previousButton.style.display = "none";
  nextButton.style.display = "none";
  submitButton.style.display = "none";

  
  showSlide(0);

  // sleep time expects milliseconds
  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  var myTimer;
  // Usage!
  sleep(1000).then(() => {
    myTimer = setInterval(showNextSlide, 3500);
  });

  
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);

  function buildFinal() {
    // we'll need a place to store the HTML output
    const output = [];

    const words = [];

    for(var word in finalCollection){
      words.push(
        `<label><input class="optionCheckbox" type="checkbox" name="word" value="${finalCollection[word]}">${finalCollection[word]}</label>`
      );
    }

    // add this question and its answers to the output
    output.push(
      `<fieldset class="checkboxgroup"> 
        <legend>Pick the original words.</legend>
        ${words.join("")}
      </fieldset>`
    );

    finalContainer.innerHTML = output.join("");
  }

  const finalContainer = document.getElementById("final");

  var checkedValue = []
  var pickCorrectAnswer = []
  var pickWrongAnswer = []
  var correct01 = 0
  var correct02 = 0
  var correct03 = 0
  var numCorrect = 0;
  var numWrong = 0;

  buildFinal();

  function showResult(checkedValue){
    for (var word in checkedValue) {
      // console.log(checkedValue[word]);
      var indicator = false;
      correctAnswer.forEach((currentSection)=>{
        // console.log(currentSection.code)
        // console.log(currentSection.answers)
        
        for (var answer in currentSection.answers){
          // console.log(currentSection.answers[answer])
          // console.log(checkedValue[word])
          // console.log(currentSection.answers[answer].includes(checkedValue[word]))
          // console.log(numCorrect + " " + numWrong)
          if (currentSection.answers[answer].includes(checkedValue[word])){
            if (currentSection.code === 1)
              correct01++;
            else if (currentSection.code === 2)
              correct02++;
            else if (currentSection.code === 3)
              correct03++;
            numCorrect++;
            pickCorrectAnswer.push(checkedValue[word])
            indicator = true;
            break;
          }
        }
      })
      if (indicator === false){
        numWrong++;
        pickWrongAnswer.push(checkedValue[word])
      }
    }
    console.log(correct01)
    console.log(correct02)
    console.log(correct03)
    var output = [];
    var list01 = [];
    var list02 = [];

    for (var index in pickCorrectAnswer){
      list01.push(
        `<li>${pickCorrectAnswer[index]}</li>`
      )
    }

    for (var index in pickWrongAnswer){
      list02.push(
        `<li>${pickWrongAnswer[index]}</li>`
      )
    }

    output.push(
      `<p>Correct words: ${numCorrect}/9</p>
      <ul>
      ${list01.join('')}
      </ul>
      <p>Wrong words selected: ${numWrong}/9</p>
      <ul>
      ${list02.join("")}
      </ul>`
    )

    resultContainer.innerHTML = output.join("");
    upload(numWrong)
  }

  const resultContainer = document.getElementById("result");

  $('#done').click(()=>{
    $.each($("input[name='word']:checked"),function(){
      if (checkedValue.includes($(this).val())){
        // console.log("existed")
      }else
        checkedValue.push($(this).val());
    })

    $("#finalQuestion").hide();
    $("#resultPage").show(500);
    showResult(checkedValue);
  })

  $('#submit').click(()=>{
    $("#question").hide();
    $("#finalQuestion").show(500);
  })

  $('#start-button').click(() => {
    $("main").hide();
    $("#finalQuestion").show(500);
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
  
  var db = firebase.firestore();

  function upload(numWrong) {
    db.collection("test").add({
      time: new Date().getTime() + "",
      correct_01: correct01 + "",
      correct_02: correct02 + "",
      correct_03: correct03 + "",
      wrong: numWrong + ""
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
})();
