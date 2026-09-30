// Sokratik Mobil Öğrenme Uygulaması Mantığı
(function() {
  'use strict';

  // State Management
  const state = {
    studentName: localStorage.getItem('SOCRATIC_STUDENT_NAME') || 'Emir',
    currentFilter: 'all', // 'all', 'quiz-1', 'quiz-2', 'quiz-3', 'quiz-4'
    filteredQuestions: [],
    currentIndex: 0,
    startTime: Date.now(),
    questionStartTime: Date.now(),
    
    // Per question tracking: { [qId]: { attempts: [], hintsUsed: 0, timeSpentMs: 0, solved: false, solvedWithHint: false } }
    progress: JSON.parse(localStorage.getItem('SOCRATIC_PROGRESS_DATA') || '{}'),
    
    // Socratic Hint stage for active question (0: none, 1: prompt 1, 2: prompt 2, 3: prompt 3)
    currentHintStage: 0,
    
    // Scratchpad
    scratchpadOpen: false
  };

  // Broadcast Channel for live teacher sync
  const channel = window.BroadcastChannel ? new BroadcastChannel('socratic_telemetry') : null;

  function broadcastEvent(type, payload) {
    const eventObj = {
      type,
      studentName: state.studentName,
      timestamp: Date.now(),
      payload
    };

    // Save to global history for teacher retrieval
    const history = JSON.parse(localStorage.getItem('SOCRATIC_EVENT_LOGS') || '[]');
    history.unshift(eventObj);
    if (history.length > 300) history.pop();
    localStorage.setItem('SOCRATIC_EVENT_LOGS', JSON.stringify(history));

    // Save student state
    localStorage.setItem('SOCRATIC_STUDENT_STATE', JSON.stringify({
      studentName: state.studentName,
      currentIndex: state.currentIndex,
      currentQId: getCurrentQuestion()?.id,
      progress: state.progress,
      lastActive: Date.now()
    }));

    if (channel) {
      try {
        channel.postMessage(eventObj);
      } catch (e) {
        console.warn('Broadcast failed:', e);
      }
    }
  }

  // DOM Elements
  let el = {};

  function initDOMElements() {
    el = {
      studentNameInput: document.getElementById('studentNameInput'),
      timerDisplay: document.getElementById('timerDisplay'),
      progressMeta: document.getElementById('progressMeta'),
      progressBarFill: document.getElementById('progressBarFill'),
      testPills: document.querySelectorAll('.test-pill'),
      activeTestTitle: document.getElementById('activeTestTitle'),
      
      qBadge: document.getElementById('qBadge'),
      qHintCount: document.getElementById('qHintCount'),
      questionText: document.getElementById('questionText'),
      optionsStack: document.getElementById('optionsStack'),
      
      socraticDrawer: document.getElementById('socraticDrawer'),
      socraticBubble: document.getElementById('socraticBubble'),
      socraticStageBadge: document.getElementById('socraticStageBadge'),
      requestHintBtn: document.getElementById('requestHintBtn'),
      deeperHintBtn: document.getElementById('deeperHintBtn'),
      
      toggleScratchpadBtn: document.getElementById('toggleScratchpadBtn'),
      scratchpadContainer: document.getElementById('scratchpadContainer'),
      scratchpadCanvas: document.getElementById('scratchpadCanvas'),
      clearScratchpadBtn: document.getElementById('clearScratchpadBtn'),
      
      prevBtn: document.getElementById('prevBtn'),
      nextBtn: document.getElementById('nextBtn')
    };
  }

  function filterQuestions() {
    const all = window.SOCRATIC_QUESTIONS || [];
    if (state.currentFilter === 'all') {
      state.filteredQuestions = all;
    } else {
      state.filteredQuestions = all.filter(q => q.testId === state.currentFilter);
    }
    state.currentIndex = 0;
  }

  function getCurrentQuestion() {
    return state.filteredQuestions[state.currentIndex];
  }

  function renderQuestion() {
    const q = getCurrentQuestion();
    if (!q) return;

    state.questionStartTime = Date.now();
    state.currentHintStage = 0;

    // Ensure progress record exists
    if (!state.progress[q.id]) {
      state.progress[q.id] = {
        qId: q.id,
        globalIndex: q.globalIndex,
        testNo: q.testNo,
        questionNo: q.questionNo,
        attempts: [],
        hintsUsed: 0,
        timeSpentMs: 0,
        solved: false,
        solvedWithHint: false
      };
    }
    const qProg = state.progress[q.id];

    // Top progress
    const total = state.filteredQuestions.length;
    const current = state.currentIndex + 1;
    const pct = Math.round((current / total) * 100);
    el.progressMeta.textContent = `Soru ${current} / ${total} • %${pct}`;
    el.progressBarFill.style.width = `${pct}%`;

    // Badges
    el.qBadge.textContent = `TEST ${q.testNo} • Soru ${q.questionNo}`;
    el.qHintCount.innerHTML = `🦉 İpuçları: <strong>${qProg.hintsUsed}</strong>/3`;

    // Text formatting
    let formattedText = q.text
      .replace(/\\n\\n/g, '<br><br>')
      .replace(/\\n/g, '<br>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    el.questionText.innerHTML = formattedText;

    // Render Options
    el.optionsStack.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D', 'E'];

    q.options.forEach((optText, idx) => {
      const letter = letters[idx];
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.dataset.letter = letter;

      // Clean prefix if any
      let cleanOpt = optText;
      if (optText.startsWith(letter + ')')) {
        cleanOpt = optText.substring(2).trim();
      }

      btn.innerHTML = `
        <span class="option-key">${letter}</span>
        <span class="option-text">${cleanOpt}</span>
      `;

      // If already solved, highlight correct
      if (qProg.solved && letter === q.correctAnswer) {
        btn.classList.add('selected-correct');
      }

      btn.addEventListener('click', () => handleOptionClick(letter, btn, q));
      el.optionsStack.appendChild(btn);
    });

    // Reset Socratic Drawer
    el.socraticDrawer.style.display = 'block';
    if (qProg.hintsUsed > 0) {
      showSocraticPrompt(qProg.hintsUsed);
    } else {
      el.socraticStageBadge.textContent = 'DÜŞÜNME ASİSTANI';
      el.socraticBubble.innerHTML = 'Soruyu dikkatle oku. Takıldığın bir nokta olursa aşağıdaki butona basarak <strong>Sokratik İpucu</strong> isteyebilirsin. Doğrudan cevap verilmez; sana doğru yolu bulduracak sorular sorulur.';
      el.deeperHintBtn.style.display = 'none';
    }

    // Navigation buttons
    el.prevBtn.disabled = state.currentIndex === 0;
    el.nextBtn.disabled = state.currentIndex === state.filteredQuestions.length - 1;
    if (qProg.solved) {
      el.nextBtn.classList.add('celebrate');
    } else {
      el.nextBtn.classList.remove('celebrate');
    }

    // Clear and hide scratchpad on new question
    clearScratchpad();

    // Trigger MathJax / KaTeX rendering
    if (window.renderMathInElement) {
      renderMathInElement(el.questionText, {
        delimiters: [
          {left: "$$", right: "$$", display: true},
          {left: "$", right: "$", display: false}
        ],
        throwOnError: false
      });
      renderMathInElement(el.optionsStack, {
        delimiters: [
          {left: "$$", right: "$$", display: true},
          {left: "$", right: "$", display: false}
        ],
        throwOnError: false
      });
      renderMathInElement(el.socraticBubble, {
        delimiters: [
          {left: "$$", right: "$$", display: true},
          {left: "$", right: "$", display: false}
        ],
        throwOnError: false
      });
    }

    // Broadcast question view event
    broadcastEvent('QUESTION_VIEWED', {
      qId: q.id,
      globalIndex: q.globalIndex,
      testNo: q.testNo,
      questionNo: q.questionNo
    });
  }

  function handleOptionClick(letter, btn, q) {
    const qProg = state.progress[q.id];
    if (qProg.solved) return; // Already solved

    const timeSpent = Date.now() - state.questionStartTime;
    qProg.attempts.push(letter);
    qProg.timeSpentMs += timeSpent;

    const isCorrect = (letter === q.correctAnswer);

    if (isCorrect) {
      btn.classList.add('selected-correct');
      qProg.solved = true;
      qProg.solvedWithHint = (qProg.hintsUsed > 0);

      el.socraticStageBadge.textContent = '🎉 TEBRİKLER! DOĞRU DÜŞÜNCE';
      el.socraticBubble.innerHTML = `<strong>Harika bir akıl yürütme!</strong> Doğru cevap <strong>${letter}</strong> seçeneğidir. Kavramı ve adımları başarıyla modelledin. Sıradaki soruya geçebilirsin.`;
      el.deeperHintBtn.style.display = 'none';

      el.nextBtn.classList.add('celebrate');
      if (state.currentIndex < state.filteredQuestions.length - 1) {
        el.nextBtn.disabled = false;
      }

      saveProgress();

      broadcastEvent('ANSWER_SUBMITTED', {
        qId: q.id,
        testNo: q.testNo,
        questionNo: q.questionNo,
        chosen: letter,
        correct: true,
        attemptsCount: qProg.attempts.length,
        hintsUsed: qProg.hintsUsed,
        timeSpentMs: qProg.timeSpentMs
      });

    } else {
      btn.classList.add('selected-wrong');
      setTimeout(() => btn.classList.remove('selected-wrong'), 1200);

      // Check for specific distractor trap feedback
      const trapExplanation = q.distractors && q.distractors[letter] 
        ? q.distractors[letter] 
        : `<strong>${letter}</strong> seçeneğini seçtin. Acaba bir işlem ya da katsayı basamağını gözden kaçırmış olabilir misin? Aşağıdaki Sokratik ipuçlarını inceleyerek tekrar dene.`;

      el.socraticStageBadge.textContent = '🤔 ÇELDİRİCİ TUZAĞI & DÜŞÜNME İPUCU';
      el.socraticBubble.innerHTML = `
        <div style="color:#fb7185; margin-bottom:6px; font-weight:700;">⚠️ Dikkat: Bu şıkta yaygın bir kavram tuzağı var!</div>
        ${trapExplanation}
      `;
      
      if (window.renderMathInElement) {
        renderMathInElement(el.socraticBubble, {
          delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false}
          ],
          throwOnError: false
        });
      }

      saveProgress();

      broadcastEvent('ANSWER_SUBMITTED', {
        qId: q.id,
        testNo: q.testNo,
        questionNo: q.questionNo,
        chosen: letter,
        correct: false,
        attemptsCount: qProg.attempts.length,
        trapTriggered: q.distractors && q.distractors[letter] ? true : false,
        hintsUsed: qProg.hintsUsed,
        timeSpentMs: qProg.timeSpentMs
      });
    }
  }

  function showSocraticPrompt(stage) {
    const q = getCurrentQuestion();
    if (!q) return;

    const prompts = q.socraticPrompts || [];
    const promptText = prompts[stage - 1] || prompts[prompts.length - 1];

    el.socraticStageBadge.textContent = `🦉 SOKRATİK REHBERLİK (SEVİYE ${stage}/3)`;
    el.socraticBubble.innerHTML = `<strong>Düşünme Sorusu:</strong> ${promptText}`;

    if (stage < 3) {
      el.deeperHintBtn.style.display = 'inline-flex';
      el.deeperHintBtn.textContent = `Hala takıldın mı? → 2. Seviye İpucu (${stage + 1}/3)`;
    } else {
      el.deeperHintBtn.style.display = 'none';
    }

    if (window.renderMathInElement) {
      renderMathInElement(el.socraticBubble, {
        delimiters: [
          {left: "$$", right: "$$", display: true},
          {left: "$", right: "$", display: false}
        ],
        throwOnError: false
      });
    }
  }

  function handleHintRequest(increment = true) {
    const q = getCurrentQuestion();
    if (!q) return;

    const qProg = state.progress[q.id];
    if (increment) {
      state.currentHintStage = Math.min(3, state.currentHintStage + 1);
      qProg.hintsUsed = Math.max(qProg.hintsUsed, state.currentHintStage);
      saveProgress();
      el.qHintCount.innerHTML = `🦉 İpuçları: <strong>${qProg.hintsUsed}</strong>/3`;

      broadcastEvent('HINT_REQUESTED', {
        qId: q.id,
        testNo: q.testNo,
        questionNo: q.questionNo,
        stage: state.currentHintStage
      });
    }

    showSocraticPrompt(state.currentHintStage);
  }

  function saveProgress() {
    localStorage.setItem('SOCRATIC_PROGRESS_DATA', JSON.stringify(state.progress));
  }

  // Scratchpad logic
  let isDrawing = false;
  let ctx = null;

  function initScratchpad() {
    const canvas = el.scratchpadCanvas;
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    // Resize canvas
    function resizeCanvas() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 150;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function startPos(e) {
      isDrawing = true;
      draw(e);
    }
    function endPos() {
      isDrawing = false;
      ctx.beginPath();
    }
    function draw(e) {
      if (!isDrawing) return;
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }

    canvas.addEventListener('mousedown', startPos);
    canvas.addEventListener('mouseup', endPos);
    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('touchstart', startPos, { passive: false });
    canvas.addEventListener('touchend', endPos);
    canvas.addEventListener('touchmove', draw, { passive: false });

    el.toggleScratchpadBtn.addEventListener('click', () => {
      state.scratchpadOpen = !state.scratchpadOpen;
      el.scratchpadContainer.classList.toggle('open', state.scratchpadOpen);
      if (state.scratchpadOpen) resizeCanvas();
    });

    el.clearScratchpadBtn.addEventListener('click', clearScratchpad);
  }

  function clearScratchpad() {
    if (ctx && el.scratchpadCanvas) {
      ctx.clearRect(0, 0, el.scratchpadCanvas.width, el.scratchpadCanvas.height);
    }
  }

  // Timer tick
  function startTimer() {
    setInterval(() => {
      const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
      const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const s = String(elapsed % 60).padStart(2, '0');
      if (el.timerDisplay) el.timerDisplay.textContent = `⏱️ ${m}:${s}`;
    }, 1000);
  }

  // Event Listeners setup
  function setupListeners() {
    el.studentNameInput.value = state.studentName;
    el.studentNameInput.addEventListener('change', (e) => {
      state.studentName = e.target.value.trim() || 'Öğrenci';
      localStorage.setItem('SOCRATIC_STUDENT_NAME', state.studentName);
      broadcastEvent('STUDENT_RENAMED', { newName: state.studentName });
    });

    const testTitles = {
      'all': '<strong>Tüm Sorular:</strong> 4 Test • 40 Sokratik Soru',
      'quiz-1': '<strong>Test 01:</strong> Temel Düzey & Hata Tuzakları (10 Soru)',
      'quiz-2': '<strong>Test 02:</strong> Ortak Parantez & Taban Dönüşümleri (10 Soru)',
      'quiz-3': '<strong>Test 03:</strong> Analitik Cebirsel Denklemler & SAT (10 Soru)',
      'quiz-4': '<strong>Test 04:</strong> Beceri Temelli Problem Modelleme (10 Soru)'
    };

    el.testPills.forEach(pill => {
      pill.addEventListener('click', () => {
        el.testPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.currentFilter = pill.dataset.filter;
        if (el.activeTestTitle) {
          el.activeTestTitle.innerHTML = testTitles[state.currentFilter] || 'Test';
        }
        filterQuestions();
        renderQuestion();
      });
    });

    el.requestHintBtn.addEventListener('click', () => handleHintRequest(true));
    el.deeperHintBtn.addEventListener('click', () => handleHintRequest(true));

    el.prevBtn.addEventListener('click', () => {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        renderQuestion();
      }
    });

    el.nextBtn.addEventListener('click', () => {
      if (state.currentIndex < state.filteredQuestions.length - 1) {
        state.currentIndex++;
        renderQuestion();
      }
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    initDOMElements();
    filterQuestions();
    initScratchpad();
    setupListeners();
    startTimer();
    renderQuestion();
  });

})();
