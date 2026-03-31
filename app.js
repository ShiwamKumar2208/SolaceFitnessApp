window.addEventListener("load", () => {
  setTimeout(() => {
    const splash = document.getElementById("splash");
    if (splash) splash.style.display = "none";
  }, 800); // smooth delay
});

let taps = 0;

document.addEventListener("click", () => {
  taps++;
  if (taps === 5) {
    localStorage.clear();
    location.reload();
  }

  setTimeout(() => (taps = 0), 2000);
});

const app = document.getElementById("app");

function getToday() {
  return new Date().toISOString().split("T")[0];
}

let state = JSON.parse(localStorage.getItem("solace")) || {
  day: 1,
  streak: 0,
  lastWorkoutDate: null,
  workoutsDone: 0,
};

function save() {
  localStorage.setItem("solace", JSON.stringify(state));
}

let index = 0;
let mode = "idle";
// idle | ready | running | rest | paused
let timer = null;
let timeLeft = 0;
let paused = false;
let totalExercises = 0;
let todayWorkout = []; // ✅ GLOBAL WORKOUT

const REST_TIME = 10;

// 🔊 SOUND
const bell = new Audio(
  "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
);

function beep() {
  bell.currentTime = 0;
  bell.play();
}

function speak(text) {
  speechSynthesis.cancel(); // 🔥 stops queue buildup
  const msg = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(msg);
}

// ----------------------

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function togglePause() {
  if (mode === "paused") {
    paused = false;

    // restore previous mode
    mode = timeLeft > 0 ? modeBeforePause || "running" : "running";
  } else {
    modeBeforePause = mode; // 🔥 store where we came from
    paused = true;
    mode = "paused";
  }

  // 🔥 render based on actual context
  if (modeBeforePause === "rest") {
    renderRestUI();
  } else {
    renderExercise(todayWorkout[index]);
  }
}

function renderRestUI() {
  const current = todayWorkout[index];
  const next = todayWorkout[index + 1] || { name: "Finish" };

  const progress = ((index + 1) / todayWorkout.length) * 100;

  app.innerHTML = `
    <div class="container">
      <h2>Rest</h2>

      <p>Done: ${current.name}</p>
      <p style="color: var(--accent)">Next: ${next.name}</p>

      <div style="width:80%;height:10px;background:#222;border-radius:10px;">
        <div style="width:${progress}%;height:100%;background:var(--accent);border-radius:10px;"></div>
      </div>

      <p id="timer">${timeLeft} sec</p>

      <button onclick="skipRest()">SKIP</button>

      <button onclick="togglePause()">
        ${paused ? "UNPAUSE" : "PAUSE"}
      </button>
    </div>
  `;
}

function skipRest() {
  clearInterval(timer);
  index++;
  startExercise();
}

function beginTimed() {
  if (mode !== "ready") return;

  mode = "running";

  renderExercise(todayWorkout[index]); // update UI

  startTimer(() => {
    nextStep();
  });
}

// ----------------------
// WORKOUT GENERATION

function getPhase(day) {
  if (day <= 30) return "beginner";
  if (day <= 60) return "medium";
  if (day <= 90) return "hard";
  return "infinite";
}

function scaleExercise(ex, day) {
  const factor = 1 + day * 0.01;

  if (ex.reps) return { ...ex, reps: Math.round(ex.reps * factor) };
  if (ex.time) return { ...ex, time: Math.round(ex.time * factor) };

  return ex;
}

function generateWorkout(day) {
  const phase = getPhase(day);
  let workout = [];

  workout.push(random(EXERCISES.warmup));

  if (phase === "beginner") {
    workout.push(random(EXERCISES.push));
    workout.push(random(EXERCISES.legs));
    workout.push(random(EXERCISES.core));
  }

  if (phase === "medium") {
    workout.push(random(EXERCISES.push));
    workout.push(random(EXERCISES.legs));
    workout.push(random(EXERCISES.core));
    workout.push(random(EXERCISES.hiit));
  }

  if (phase === "hard" || phase === "infinite") {
    workout.push(random(EXERCISES.push));
    workout.push(random(EXERCISES.legs));
    workout.push(random(EXERCISES.core));
    workout.push(random(EXERCISES.hiit));
    workout.push(random(EXERCISES.hiit));
  }

  workout.push(random(EXERCISES.stretch));

  return workout.map((ex) => scaleExercise(ex, day));
}

function getTodayWorkout() {
  const key = "workout-" + state.day;

  let saved = localStorage.getItem(key);
  if (saved) return JSON.parse(saved);

  const workout = generateWorkout(state.day);
  localStorage.setItem(key, JSON.stringify(workout));

  return workout;
}

// ----------------------
// UI

function renderHome() {
  clearInterval(timer);

  todayWorkout = getTodayWorkout(); // ✅ use cached
  totalExercises = todayWorkout.length;

  app.innerHTML = `
  <div class="container">
    <h1>Day ${state.day} / 90</h1>
    <p>${totalExercises} exercises</p>

    <p style="color: var(--accent)">🔥 Streak: ${state.streak}</p>
    <p>🏋️ ${state.workoutsDone} workouts</p>

    <button class="start-btn" onclick="startWorkout()">START</button>
  </div>
`;
}

function startWorkout() {
  index = 0;
  paused = false;
  mode = "ready";

  todayWorkout = getTodayWorkout();
  startExercise();
}

function startExercise() {
  if (index >= todayWorkout.length) index = 0;

  const ex = todayWorkout[index];

  beep();
  speak(ex.name);

  timeLeft = ex.time || 0;
  mode = ex.time ? "ready" : "running";

  renderExercise(ex);

  if (!ex.time) {
    // reps → no timer → directly active
    mode = "running";
  }
}

function renderExercise(ex) {
  const isRunning = mode === "running";
  const isPaused = mode === "paused";
  const isReady = mode === "ready";

  app.innerHTML = `
    <div class="container">
      <h2>${ex.name}</h2>

      ${ex.img ? `<img src="${ex.img}" width="200">` : ""}
      ${ex.video ? `<a href="${ex.video}" target="_blank">Watch Video</a>` : ""}

      <p id="info">
        ${ex.reps ? ex.reps + " reps" : timeLeft + " sec"}
      </p>

      ${
        ex.time
          ? `
        <button 
          onclick="beginTimed()" 
          ${!isReady ? "disabled" : ""}
          style="background:${isReady ? "var(--accent)" : "#444"}"
        >
          START
        </button>

        <button 
          onclick="nextStep()" 
          ${isRunning ? "" : "disabled"}
        >
          SKIP
        </button>
      `
          : `
        <button onclick="nextStep()">DONE</button>
      `
      }

      <button onclick="togglePause()" ${
        !isRunning && !isPaused ? "disabled" : ""
      }>
        ${isPaused ? "UNPAUSE" : "PAUSE"}
      </button>
    </div>
  `;
}

// ----------------------
// TIMER

function startTimer(callback) {
  clearInterval(timer);

  timer = setInterval(() => {
    if (paused) return;

    timeLeft--;

    const el =
      document.getElementById("timer") || document.getElementById("info");
    if (el) el.textContent = timeLeft + " sec";

    if (timeLeft <= 5 && timeLeft > 0) {
      speak(timeLeft.toString());
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      callback();
    }
  }, 1000);
}

// ----------------------
// REST

function startRest() {
  mode = "rest";
  timeLeft = REST_TIME;

  renderRestUI();

  startTimer(() => {
    index++;
    startExercise();
  });
}

// ----------------------

function nextStep() {
  if (index < todayWorkout.length - 1) {
    startRest();
  } else {
    completeWorkout();
  }
}

function completeWorkout() {
  beep();
  speak("Workout complete");

  const today = getToday();

  if (state.lastWorkoutDate) {
    const last = new Date(state.lastWorkoutDate);
    const diff = (new Date(today) - last) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      state.streak++; // continued
    } else if (diff > 1) {
      state.streak = 1; // broke streak
    }
    // same day → no streak change
  } else {
    state.streak = 1;
  }

  // ✅ increment workout count always
  state.workoutsDone++;

  // ✅ update last workout date
  state.lastWorkoutDate = today;

  save();

  app.innerHTML = `
    <div class="container">
      <h1>Workout Complete</h1>
      <p>🔥 Streak: ${state.streak}</p>
      <p>🏋️ Workouts: ${state.workoutsDone}</p>
      <button onclick="done()">DONE</button>
    </div>
  `;
}

function done() {
  const today = getToday();

  // only increase day if it's a new day
  if (state.lastWorkoutDate === today) {
    // already counted today → do nothing
  } else {
    state.day++;
  }

  save();
  renderHome();
}

renderHome();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
