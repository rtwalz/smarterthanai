
let number = 0
let chosenAnswer
let models = [
  {
    id: "you",
    short: "YOU",
    icon: "you.png",
    correct: 0
  },
  {
    id: "meta-llama/Meta-Llama-3-70B-Instruct",
    short: "llama3-70b-instruct",
    icon: "meta.png",
    correct: 0
  },
  {
    id: "meta-llama/Meta-Llama-3-8B-Instruct",
    short: "llama3-8b-instruct",
    icon: "meta.png",
    correct: 0
  },
  {
    id: "meta-llama/Llama-2-7b-chat-hf",
    short: "llama2-7b-chat",
    icon: "meta.png",
    correct: 0
  },
  {
    id: "microsoft/wizardLM-2-7B",
    short: "wizardlm-2-7b",
    icon: "microsoft.png",
    correct: 0
  },
  {
    id: "gemma-1.1-7b-it",
    short: "gemma-1.1-7b-it",
    icon: "google.png",
    correct: 0
  },
  {
    id: 'openai/gpt-4o',
    short: "gpt-4o",
    icon: "openai.png",
    correct: 0
  },
  {
    id: "openai/gpt-3.5-turbo",
    short: "gpt-3.5-turbo",
    icon: "openai.png",
    correct: 0
  },
  {
    id: "mistralai/Mixtral-8x22B-Instruct-v0.1",
    short: "mixtral-8x22b-instruct",
    icon: "mistral.png",
    correct: 0
  },
  {
    id: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    short: "mixtral-8x7b-instruct",
    icon: "mistral.png",
    correct: 0
  },
  {
    id: "mistralai/Mistral-7B-Instruct-v0.2",
    short: "mistral-7b-instruct",
    icon: "mistral.png",
    correct: 0
  },
  {
    id: "01-ai/Yi-34B-Chat",
    short: "yi-34b-chat",
    icon: "01.svg",
    correct: 0
  }
]
  


function updateLeaderboard(showBG){
  models.sort((a, b) => b.correct - a.correct)
  document.getElementById("tbody").innerHTML = ""
  let modelRank = 1
  let lastScore = 100000
  for (let model of models){
    let bg = "#CCFEFF"
    if (!model.last) bg = "#FFCCCB"

    let displayScore = ""
    if (number == 0 && !showBG) displayScore = ""
    else if (lastScore == model.correct) displayScore = "-"
    else displayScore = modelRank
    console.log(displayScore)
    document.getElementById("tbody").insertAdjacentHTML("beforeend", `<tr ${showBG ? 'style="background-color:'+bg+';"' : ""} ${model.id == "you" ? 'class="you"' : ""}><td>${displayScore}</td><td title="${model.id}"><img src="/${model.icon}" style="width: 15px; margin-right: 3px; vertical-align: middle;"/>${model.short}</td><td>${model.correct}</td></tr>`)
    modelRank++
    lastScore = model.correct
  }
}

function byID(d){return document.getElementById(d)}

function updateQuestion(q, choice, showAnswer){
  updateLeaderboard()
  if (!choice) chosenAnswer = null
  chosenAnswer = choice
  let question = _data[q]
  console.log(showAnswer, question.correctchoice)

  byID("number").innerText = "#" + (q + 1)
  byID("question").innerText = question.question
  byID("answers").innerHTML = ""
  for (let i=1; i<5; i++){
    byID("answers").insertAdjacentHTML("beforeend", `<li class="answer ${showAnswer && ["A", "B", "C", "D"][i-1] == question.correctchoice ? `bold` : ""}" onclick="updateQuestion(${q}, ${i})">${choice === i ? `<img class="sketch" src="/sketch.png"/>` : ""}${question["choice"+i]} ${showAnswer && ["A", "B", "C", "D"][i-1] == question.correctchoice ? `<img class="check" src="/check.png"/>` : ""}</li>`)
  }
  
}

function checkAnswer(){
  if (!chosenAnswer) return alert("Please click on an answer choice.")
  let question = _data[number]
  for (let model of models) {
    if (model.id == "you"){
      let mappings = ["A", "B", "C", "D"]
      let answer = mappings[chosenAnswer-1]
      if (question.correctchoice == answer) {
        model.correct++
        model.last = true
      } else {
        model.last = false
      }
      console.log(chosenAnswer, answer, question.correctchoice)

    } else if (question[model.id] === question.correctchoice) {
      model.correct++
      model.last = true
    } else {
      model.last = false
    }
  }
  
  updateQuestion(number, chosenAnswer, true)
  updateLeaderboard(true)
  byID("check").innerText = "Next question"
  byID("check").onclick = function(){
    number++;
    updateQuestion(number)
    byID("check").onclick= checkAnswer
    byID("check").innerText = "Check"
  }
}

updateLeaderboard()
updateQuestion(0, 1)