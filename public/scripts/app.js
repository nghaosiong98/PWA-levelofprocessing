(function() {
  'use strict';
  const myQuestions = [
    {
      question: "Is the word in capital letter?",
      answers: {
        a: "android"
      }
    },
    {
      question: "Is the word in capital letter?",
      answers: {
        a: "APPLE"
      }
    },
    {
      question: "Is the word in capital letter?",
      answers: {
        a: "COMPUTER"
      }
    },
    {
      question: "Is the word in capital letter?",
      answers: {
        a: "dog"
      }
    },
    {
      question: "Is the word in capital letter?",
      answers: {
        a: "TRUMPET"
      }
    },
    {
      question: "Is the word in capital letter?",
      answers: {
        a: "dolphin"
      }
    },
    {
      question: "Is the word in capital letter?",
      answers: {
        a: "CAPITAL"
      }
    },
    {
      question: "Is the word in capital letter?",
      answers: {
        a: "ringgit"
      }
    },
    {
      question: "Is the word in capital letter?",
      answers: {
        a: "hockey"
      }
    },
    {
      question: "Is the word in capital letter?",
      answers: {
        a: "ZOO"
      }
    },
    {
      question: "Does the word go in this sentence?",
      answers: {
        a: "library",
        b: "The <u>library</u> is close today."
      }
    },
    {
      question: "Does the word go in this sentence?",
      answers: {
        a: "banana",
        b: "<u>Banana</u> is yellow."
      }
    },
    {
      question: "Does the word go in this sentence?",
      answers: {
        a: "smart",
        b: "I am <u>smart</u>."
      }
    },
    {
      question: "Does the word go in this sentence?",
      answers: {
        a: "egg",
        b: "Cat lays <u>egg</u>."
      }
    },
    {
      question: "Does the word go in this sentence?",
      answers: {
        a: "blue",
        b: "The laptop is having <u>blue</u> screen."
      }
    },
    {
      question: "Does the word go in this sentence?",
      answers: {
        a: "coffee",
        b: "The <u>coffee</u> is so black!"
      }
    },
    {
      question: "Does the word go in this sentence?",
      answers: {
        a: "lamborghini",
        b: "The <u>lamborghini</u> is the cheapest car in the world!"
      }
    },
    {
      question: "Does the word go in this sentence?",
      answers: {
        a: "rubber",
        b: "We need to wear <u>rubber</u> glove before the handling acid."
      }
    },
    {
      question: "Does the word go in this sentence?",
      answers: {
        a: "red",
        b: "Please pass me the <u>red</u> pen!"
      }
    },
    {
      question: "Does the word go in this sentence?",
      answers: {
        a: "hand",
        b: "Put your <u>hand</u> up!"
      }
    }
  ];

  const finalCollection = ["library", "fish", "android", "egg", "chicken", "lamborghini", "pineapple", "cat", "dog", "banana", "computer", "pizza", "ipad", "apple", "smart", "trumpet", "trombone", "burger", "laptop", "yellow", "dolphin", "hand", "red", "ferrari", "coffee", "rubber", "blue", "muffin", "capital", "ringgit", "basketball", "perodua", "rupee","zoo", "hockey"];

  const correctAnswer = [
    {
      code: 1,
      answers:["android", "apple", "computer","dog", "trumpet","dolphin","capital", "ringgit", "hockey", "zoo"]
    },
    {
      code:2,
      answers:["library","banana", "smart", "egg","blue","coffee","lamborghini","rubber","red","hand"]
    }
  ];


  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];
    var counter = 1;
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
          <p>Question ${counter}</p><br>
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );

      counter++;
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showSlide(n) {
    move()
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === slides.length - 1){
      clearInterval(myTimer)
      submitButton.style.display = "inline-block"
    }
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

  
  

  // sleep time expects milliseconds
  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  var myTimer;
  // Usage!
  

  
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);

  function buildFinal() {
    // we'll need a place to store the HTML output
    const output = [];

    const words = [];

    for(var word in finalCollection){
      words.push(
        `<label><input class="optionCheckbox" type="checkbox" name="word" value="${finalCollection[word]}">&nbsp;&nbsp;${finalCollection[word]}</label>`
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
      var indicator = false;
      correctAnswer.forEach((currentSection)=>{       
        for (var answer in currentSection.answers){
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
      `<p>Correct words: ${numCorrect}/20</p>
      <ul>
      ${list01.join('')}
      </ul>
      <p>Wrong words selected: ${numWrong}/13</p>
      <ul>
      ${list02.join("")}
      </ul>`
    )

    resultContainer.innerHTML = output.join("");
    upload(numWrong)
  }

  function move() {
    var elem = document.getElementById("myBar"); 
    var width = 1;
    var id = setInterval(frame, 35);
    function frame() {
      if (currentSlide === slides.length - 1){
        elem.style.width = '100%'
      }else if (width >= 100) {
        clearInterval(id);
      } else {
        width++; 
        elem.style.width = width + '%'; 
      }
    }
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
    $("#question").show(500);
    // sleep(1000).then(() => {
    //   showSlide(0);
    // });
    showSlide(0);
    myTimer = setInterval(showNextSlide, 3500);
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
  
  var db = firebase.firestore();


  function upload(numWrong) {
    var docID = new Date().getTime()+"";
    db.collection("test").doc(docID).set({
      // time: new Date().getTime() + "",
      correct_01: correct01 + "",
      correct_02: correct02 + "",
      wrong: numWrong + ""
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docID);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }
})();
