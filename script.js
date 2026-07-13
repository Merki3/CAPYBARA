const messages = [
      {
        title: "I hope you heal.",
        text: "I hope you heal from the things you do not talk about, the silent battles, the heavy thoughts, and the pain you hide behind a smile. You deserve softness, patience, and the kind of peace that reaches every tired part of you."
      },
      {
        title: "You are not alone.",
        text: "Even when it feels like nobody understands, your feelings are real and your presence matters. There are people who would rather hear your story a hundred times than live in a world where you gave up."
      },
      {
        title: "Rest is not failure.",
        text: "You do not always have to be strong. It is okay to pause, breathe, cry, sleep, and begin again slowly. Resting does not mean you are losing. It means you are giving your heart enough space to keep going."
      },
      {
        title: "Please stay.",
        text: "Stay for the mornings you have not seen, the songs you have not heard, the places you have not visited, and the version of you who will someday look back and feel proud that you kept fighting."
      },
      {
        title: "You are still becoming.",
        text: "A difficult chapter is not the ending of your story. You are allowed to grow at your own pace. You are allowed to outgrow old pain. You are allowed to become someone who feels safe inside their own life."
      },
      {
        title: "I have something for you…",
        text: "The capybara has been keeping a little surprise. Press the button when you are ready."
      },
      {
        title: "Tadaa! A flower for you.",
        text: "Not because you need to earn it. Not because you have everything figured out. Simply because you are here, and that alone is worth celebrating."
      }
    ];

    const welcome = document.getElementById("welcome");
    const messageArea = document.getElementById("messageArea");
    const nameInput = document.getElementById("nameInput");
    const startBtn = document.getElementById("startBtn");
    const nextBtn = document.getElementById("nextBtn");
    const backBtn = document.getElementById("backBtn");
    const hugBtn = document.getElementById("hugBtn");
    const soundBtn = document.getElementById("soundBtn");
    const messageNumber = document.getElementById("messageNumber");
    const messageTitle = document.getElementById("messageTitle");
    const messageText = document.getElementById("messageText");
    const finalNote = document.getElementById("finalNote");
    const progress = document.getElementById("progress");
    const capybara = document.getElementById("capybara");

    let current = 0;
    let visitorName = "";
    let audioContext = null;
    let soundOn = false;
    let ambientTimer = null;

    messages.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.setAttribute("aria-hidden", "true");
      dot.dataset.index = index;
      progress.appendChild(dot);
    });

    function renderMessage() {
      const item = messages[current];
      const isFinal = current === messages.length - 1;
      const isSurprise = current === messages.length - 2;

      messageNumber.textContent = `Message ${current + 1} of ${messages.length}`;
      messageTitle.textContent = item.title;
      messageText.textContent = item.text;

      [...progress.children].forEach((dot, index) => {
        dot.classList.toggle("active", index === current);
      });

      backBtn.textContent = current === 0 ? "Start Over" : "Back";
      nextBtn.textContent = isSurprise
        ? "Show me"
        : isFinal
          ? "Read again"
          : "Next";

      capybara.classList.toggle("holding", isFinal);
      capybara.classList.toggle("happy", isFinal);

      finalNote.classList.toggle("show", isFinal);

      if (isFinal) {
        const name = visitorName ? visitorName : "you";
        finalNote.textContent =
          `This is for ${name}. Keep this flower as a small reminder: you are loved, you are needed, and your story deserves more pages.`;
        celebrate();
      } else {
        finalNote.textContent = "";
      }
    }

    function startExperience() {
      visitorName = nameInput.value.trim();
      current = 0;
      welcome.style.display = "none";
      messageArea.classList.add("active");
      renderMessage();
      createHearts(8);
    }

    function goNext() {
      if (current === messages.length - 1) {
        current = 0;
        capybara.classList.remove("holding", "happy");
      } else {
        current += 1;
      }
      renderMessage();
    }

    function goBack() {
      if (current === 0) {
        messageArea.classList.remove("active");
        welcome.style.display = "block";
        capybara.classList.remove("holding", "happy");
        finalNote.classList.remove("show");
        return;
      }

      current -= 1;
      renderMessage();
    }

    function createHearts(amount = 10) {
      const icons = ["♥", "♡", "✦", "•"];

      for (let i = 0; i < amount; i++) {
        const heart = document.createElement("span");
        heart.className = "floating-heart";
        heart.textContent = icons[Math.floor(Math.random() * icons.length)];
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.bottom = "-30px";
        heart.style.fontSize = `${12 + Math.random() * 18}px`;
        heart.style.color = Math.random() > .5 ? "#cf7f86" : "#f5d475";
        heart.style.animationDuration = `${4.5 + Math.random() * 3}s`;
        heart.style.animationDelay = `${Math.random() * .7}s`;
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 8500);
      }
    }

    function celebrate() {
      createHearts(24);

      for (let i = 0; i < 25; i++) {
        const petal = document.createElement("span");
        petal.className = "falling-petal";
        petal.textContent = "❀";
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.bottom = "-25px";
        petal.style.color = Math.random() > .5 ? "#efb3b4" : "#f6d778";
        petal.style.fontSize = `${12 + Math.random() * 16}px`;
        petal.style.animationDuration = `${5 + Math.random() * 4}s`;
        petal.style.animationDelay = `${Math.random() * 1.2}s`;
        document.body.appendChild(petal);

        setTimeout(() => petal.remove(), 10000);
      }
    }

    function tinyHug() {
      hugBtn.textContent = "Hug sent ♡";
      createHearts(15);
      capybara.classList.add("happy");

      setTimeout(() => {
        hugBtn.textContent = "Send a tiny hug";
        if (current !== messages.length - 1) {
          capybara.classList.remove("happy");
        }
      }, 1800);
    }

    function playSoftTone() {
      if (!soundOn || !audioContext) return;

      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = [261.63, 329.63, 392, 523.25][Math.floor(Math.random() * 4)];

      gain.gain.setValueAtTime(0, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(0.018, audioContext.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2.2);

      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 2.3);
    }

    async function toggleSound() {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }

      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      soundOn = !soundOn;
      soundBtn.textContent = soundOn ? "♫" : "♪";
      soundBtn.title = soundOn ? "Turn sound off" : "Turn gentle sound on";

      if (soundOn) {
        playSoftTone();
        ambientTimer = setInterval(playSoftTone, 2600);
      } else {
        clearInterval(ambientTimer);
        ambientTimer = null;
      }
    }

    startBtn.addEventListener("click", startExperience);
    nextBtn.addEventListener("click", goNext);
    backBtn.addEventListener("click", goBack);
    hugBtn.addEventListener("click", tinyHug);
    soundBtn.addEventListener("click", toggleSound);

    nameInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        startExperience();
      }
    });
