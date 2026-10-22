const openButton = document.querySelector("#open-button");
const backButton = document.querySelector("#back-button");
const retryButton = document.querySelector("#retry-button");
const passwordForm = document.querySelector("#password-form");
const passwordInput = document.querySelector("#password-input");
const passwordHint = document.querySelector("#password-hint");
const letterCard = document.querySelector("#letter-card");
const passwordCard = document.querySelector("#password-card");
const resultCard = document.querySelector("#result-card");
const storyCard = document.querySelector("#story-card");
const storyQuestion = document.querySelector("#story-question");
const questionText = document.querySelector("#question-text");
const yesButton = document.querySelector("#yes-button");
const noButton = document.querySelector("#no-button");
const saveStatus = document.querySelector("#save-status");

const SECRET_ANSWER = "05112008";
const storyTitle = "oh keng kern hu la hud eik";
const storyParagraphs = [
  "sg t yark brk ka br me yh laiy drk yark khr thod lhg 1 kup ph zaung mar ph sia ahh kh h to son kerb sh ph kern trn laek ka yark pob u tae ton nun br kar lw yarn to eng jai on lw jah von kup pai pen khue kao eik.",
"tae trn ni ka ha ma kit dai lhae vah to eng ni sh khue dex noy ni khied neo br pen ta lery h hai tud sin jai bb ni.",
"yh me laiy lhg u tae ya thc karn phim lw ery y me eik yarng t si brk zuang nun zuang t ph z ma tharm kiw kup lhg bod taeng ni lhae kh pha ya yarm harm jai to eng br hai khit kup pai bb kao jon ton ni ka h dai lw",
" khun arn ma hrd ni ka thx q t arn jop nah kup kh vah jah sarng web ni don lw ha ka ma h lww trn ni🙃.",
"thar ngong ka von kup pai arn mai dr kh arn ka ngong2 khue kun😹"
];
const questions = [
  "ຖ້າກັບມາເປັນຄືເກົ່າ ຈະເປັນໄປໄດ້ບໍ່?",
  "ບໍ່ໄດ້ແທ້ຫວາ",
  "ແທ້ນິ🥺",
  "ອີຫຼີຫວາ😢",
];
const noButtonScales = [0.84, 0.68, 0.52, 0.38];
const yesButtonScales = [1.15, 1.32, 1.5, 1.7];
let noClickCount = 0;

async function saveResponse(answer) {
  const endpoint = "/api/answer";

  saveStatus.textContent = "Saving your answer...";
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer, noClicks: noClickCount, submittedAt: new Date().toISOString() }),
    });
    if (!response.ok) throw new Error("The response could not be saved.");
    saveStatus.textContent = "Your answer was sent 💌";
  } catch {
    saveStatus.textContent = "Could not save right now. Please tell me your answer another way.";
  }
}

function showCard(cardToShow) {
  [letterCard, passwordCard, resultCard, storyCard].forEach((card) => {
    card.hidden = card !== cardToShow;
  });
}

openButton.addEventListener("click", () => {
  showCard(passwordCard);
  passwordInput.focus();
});

backButton.addEventListener("click", () => showCard(letterCard));

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const answer = passwordInput.value.trim();
  if (!answer) return;

  const normalizedAnswer = answer.replace(/[.\-/\s]/g, "");
  const matches = normalizedAnswer === SECRET_ANSWER;
  if (matches) {
    startStory();
    showCard(storyCard);
    return;
  }

  document.querySelector("#result-icon").textContent = "💌";
  document.querySelector("#result-title").textContent = "Not quite...";
  document.querySelector("#result-message").textContent = "ຄຳຕອບຍັງບໍ່ຖືກເທື່ອ... ລອງຄິດດີໆເບີ່ງມັນໂຄ້ດ Easy ເລີຍ";
  retryButton.hidden = false;
  showCard(resultCard);
});

retryButton.addEventListener("click", () => {
  passwordInput.value = "";
  passwordHint.classList.remove("error");
  showCard(passwordCard);
  passwordInput.focus();
});

function startStory() {
  document.querySelector("#story-title").textContent = storyTitle;
  document.querySelector("#story-message").textContent = storyParagraphs.join("\n\n");
  storyQuestion.hidden = false;
  noClickCount = 0;
  yesButton.style.transform = "scale(1)";
  noButton.style.transform = "scale(1)";
  questionText.textContent = questions[noClickCount];
}

noButton.addEventListener("click", () => {
  if (noClickCount >= questions.length) return;

  yesButton.style.transform = `scale(${yesButtonScales[noClickCount]})`;
  noButton.style.transform = `scale(${noButtonScales[noClickCount]})`;
  noClickCount += 1;
  saveResponse(noClickCount === questions.length ? "Br" : "Br (not final)");

  if (noClickCount < questions.length) {
    questionText.textContent = questions[noClickCount];
    return;
  }

  document.querySelector("#result-icon").textContent = "💌";
  document.querySelector("#result-title").textContent = "I understand...";
  document.querySelector("#result-message").textContent = "Ok ເຂົ້າໃຈແລ້ວ ຖາມຊໍ່ານີ້ແຫຼະ ບໍ່ມີເຮັດຊ້ວງນິ😢";
  retryButton.hidden = true;
  showCard(resultCard);
});

yesButton.addEventListener("click", () => {
  saveResponse("Ok");
  document.querySelector("#result-icon").textContent = "💚";
  document.querySelector("#result-title").textContent = "Hue!! Thae wah ni 💚";
  document.querySelector("#result-message").textContent = "thae sbc👀.";
  retryButton.hidden = true;
  showCard(resultCard);
});
