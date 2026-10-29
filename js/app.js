// ============================================================
// SkyEnglish — Daily Goal-Oriented Learning App
// UX: Circular Ring, Micro-Tasks, Immersion Mode & 30-Day Curriculum
// ============================================================

class EnglishStudyApp {
  constructor() {
    this.currentSection = 'dashboard';
    this.progress = this.loadProgress();
    this.speechRecognition = null;
    this.isRecording = false;
    this.speechTimerInterval = null;
    this.speechTimerSeconds = 0;
    
    // Focus / Pomodoro Timer State
    this.focusTimerInterval = null;
    this.focusRemainingSeconds = 25 * 60;
    this.focusTotalDuration = 25 * 60;
    this.isFocusRunning = false;
    
    // Active Study Day (defaults to calculated progress day or clamped 1-30)
    this.activeDay = this.progress.currentDay || 1;

    this.init();
  }

  // ── INITIALIZATION ──────────────────────────────────────────
  init() {
    this.ensureProgressIntegrity();
    this.setupNavigation();
    this.initSpeechRecognition();
    this.renderDailyDashboard();
    this.renderCurriculumGrid();
    this.renderAssessment();
    this.renderAviationNews();
    this.renderMeetings();
    this.renderSpeaking();
    this.renderWriting();
    this.renderInterview();
    this.renderVocabulary();
    this.updateRankDisplay();
    this.showSection('dashboard');
  }

  // ── PROGRESS MANAGEMENT ─────────────────────────────────────
  loadProgress() {
    const saved = localStorage.getItem('englishStudyProgress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved progress", e);
      }
    }
    return this.getDefaultProgress();
  }

  getDefaultProgress() {
    return {
      selectedPlan: "plan-30",
      planStartDate: new Date().toISOString().split('T')[0],
      currentDay: 1,
      xp: 60,
      streak: 1,
      lastStudyDate: new Date().toISOString().split('T')[0],
      todayFocusMinutes: 0,
      weeklyActivity: [25, 40, 30, 45, 50, 35, 20], // Mon-Sun minutes
      completedTasksByDay: {
        // e.g. 1: ["task-news", "task-speaking"]
        1: ["task-news"]
      },
      articlesRead: ["news-1"],
      quizzesCompleted: [],
      quizScoreCorrect: 0,
      writingCompleted: [],
      speakingCompleted: [],
      meetingScenariosCompleted: [],
      interviewPracticed: [],
      vocabularyLearned: ["get the ball rolling", "move the needle", "on the same page"],
      spokenSecondsTotal: 120,
      wordsWrittenTotal: 150,
      customArticles: [],
      chestClaimedDays: []
    };
  }

  ensureProgressIntegrity() {
    if (!this.progress.selectedPlan) this.progress.selectedPlan = "plan-30";
    if (typeof this.progress.xp !== 'number') this.progress.xp = 60;
    if (!this.progress.completedTasksByDay) this.progress.completedTasksByDay = { 1: ["task-news"] };
    if (!Array.isArray(this.progress.weeklyActivity) || this.progress.weeklyActivity.length < 7) {
      this.progress.weeklyActivity = [25, 35, 45, 30, 50, 20, 30];
    }
    if (typeof this.progress.todayFocusMinutes !== 'number') this.progress.todayFocusMinutes = 15;
    if (!Array.isArray(this.progress.customArticles)) this.progress.customArticles = [];
    if (!Array.isArray(this.progress.chestClaimedDays)) this.progress.chestClaimedDays = [];

    // Calculate actual elapsed days in plan
    const start = new Date(this.progress.planStartDate || new Date());
    const now = new Date();
    const diffDays = Math.max(1, Math.min(30, Math.floor((now - start) / (1000 * 60 * 60 * 24)) + 1));
    this.progress.currentDay = diffDays;
    this.activeDay = diffDays;
    this.saveProgress();
  }

  saveProgress() {
    const today = new Date().toISOString().split('T')[0];
    if (this.progress.lastStudyDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (this.progress.lastStudyDate === yesterday) {
        this.progress.streak++;
      } else if (this.progress.lastStudyDate !== today) {
        this.progress.streak = 1;
      }
      this.progress.lastStudyDate = today;
    }
    localStorage.setItem('englishStudyProgress', JSON.stringify(this.progress));
    this.updateStreakDisplay();
    this.updateRankDisplay();
  }

  updateStreakDisplay() {
    const badges = [document.getElementById('nav-streak-badge'), document.getElementById('hero-streak-count')];
    const s = this.progress.streak || 1;
    if (badges[0]) badges[0].textContent = `🔥 ${s} day streak`;
    if (badges[1]) badges[1].textContent = `${s} Days`;
  }

  getCurrentRank() {
    const ranks = APP_DATA.pilotRanks || [];
    const xp = this.progress.xp || 0;
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (xp >= ranks[i].minXP) return ranks[i];
    }
    return ranks[0];
  }

  updateRankDisplay() {
    const current = this.getCurrentRank();
    const navText = document.getElementById('nav-rank-text');
    if (navText) {
      navText.textContent = `${current.badge} · ${this.progress.xp} XP`;
    }
  }

  addXP(amount, reason = "Flight Activity") {
    const oldRank = this.getCurrentRank();
    this.progress.xp = (this.progress.xp || 0) + amount;
    this.saveProgress();
    const newRank = this.getCurrentRank();
    if (newRank.level > oldRank.level) {
      this.celebratePromotion(newRank);
    } else {
      this.showToast(`+${amount} XP Earned! 🚀 (${reason})`, 'success');
    }
    this.renderDailyDashboard();
  }

  celebratePromotion(rank) {
    this.showToast(`🎉 PROMOTION! You reached Rank ${rank.level}: ${rank.title}!`, 'success');
  }

  // ── DAILY GOAL-ORIENTED DASHBOARD RENDERING ─────────────────
  getDayData(dayNum) {
    const list = APP_DATA.curriculum30 || [];
    const found = list.find(d => d.day === dayNum);
    return found || list[0];
  }

  changeDay(delta) {
    const next = Math.max(1, Math.min(30, this.activeDay + delta));
    this.activeDay = next;
    this.renderDailyDashboard();
  }

  jumpToCurrentDay() {
    this.activeDay = this.progress.currentDay || 1;
    this.renderDailyDashboard();
  }

  renderDailyDashboard() {
    const day = this.activeDay;
    const dayData = this.getDayData(day);
    const completedTasks = this.progress.completedTasksByDay[day] || [];
    const totalTasks = 4;
    const completedCount = completedTasks.length;
    const progressPercent = Math.round((completedCount / totalTasks) * 100);

    // 1. Update Top Hero
    const dayBadge = document.getElementById('hero-day-badge');
    const themeTitle = document.getElementById('hero-theme-title');
    if (dayBadge) dayBadge.textContent = `Day ${day} of 30`;
    if (themeTitle) themeTitle.textContent = dayData.theme;

    // 2. Circular Ring Chart SVG Update
    const ringCircle = document.getElementById('ring-progress-bar');
    const ringText = document.getElementById('ring-task-count');
    if (ringCircle) {
      const radius = 42;
      const circumference = 2 * Math.PI * radius; // ~263.89
      const offset = circumference - (circumference * (progressPercent / 100));
      ringCircle.style.strokeDasharray = `${circumference}`;
      ringCircle.style.strokeDashoffset = `${offset}`;
    }
    if (ringText) {
      ringText.textContent = `${completedCount}/${totalTasks}`;
    }

    // 3. Render Center-Left Tasks
    this.renderDailyTasksList(day, dayData, completedTasks);

    // 4. Render Bottom Weekly Graph & Chest
    this.renderWeeklyBarGraph();
    this.updateRewardChest(day, completedCount);

    this.updateStreakDisplay();
  }

  renderDailyTasksList(day, dayData, completedTasks) {
    const container = document.getElementById('daily-tasks-list');
    if (!container) return;

    // Is this a catchup day? (if viewing previous incomplete day)
    const isCatchUp = day < (this.progress.currentDay || 1) && completedTasks.length < 4;

    const tasks = [
      {
        id: "task-news",
        type: "reading",
        actionTitle: `Master Executive Briefing: "${dayData.news.title.substring(0, 48)}..."`,
        desc: "Read the operational news intelligence and score 100% on the comprehension test.",
        xp: 40,
        estTime: "8 min",
        completed: completedTasks.includes("task-news"),
        launchFn: `app.openTaskNews(${day})`
      },
      {
        id: "task-speaking",
        type: "speaking",
        actionTitle: `Deliver 90s Oral Simulation: "${dayData.speaking.topic}"`,
        desc: "Overcome sentence pauses with real-time browser speech recognition.",
        xp: 50,
        estTime: "5 min",
        completed: completedTasks.includes("task-speaking"),
        launchFn: `app.openTaskSpeaking(${day})`
      },
      {
        id: "task-writing",
        type: "writing",
        actionTitle: `Draft Executive Document: ${dayData.writing.type}`,
        desc: "Write with formal templates and compare with high-scoring native models.",
        xp: 50,
        estTime: "10 min",
        completed: completedTasks.includes("task-writing"),
        launchFn: `app.openTaskWriting(${day})`
      },
      {
        id: "task-idiom",
        type: "vocabulary",
        actionTitle: `Acquire Boardroom Idiom: "${dayData.idiom.idiom}"`,
        desc: `${dayData.idiom.meaning}. Learn native context and usage.`,
        xp: 25,
        estTime: "3 min",
        completed: completedTasks.includes("task-idiom"),
        launchFn: `app.openTaskIdiom(${day})`
      }
    ];

    container.innerHTML = tasks.map(task => {
      const isDone = task.completed;
      const ctaLabel = isDone ? "Review ✓" : "Start →";
      return `
        <div class="task-item-card ${isDone ? 'completed' : ''} ${isCatchUp ? 'catchup' : ''}">
          <div class="task-left">
            <button class="task-checkbox-btn" onclick="app.toggleTaskCompleted(${day}, '${task.id}', ${task.xp})">
              ${isDone ? '✓' : ''}
            </button>
            <div class="task-details">
              <div class="task-action-title">
                ${task.actionTitle}
                ${isCatchUp && !isDone ? '<span class="task-badge badge-catchup">Catch Up</span>' : ''}
              </div>
              <div class="task-desc">${task.desc}</div>
              <div class="task-meta-tags">
                <span class="task-badge badge-xp">+${task.xp} XP</span>
                <span class="task-badge badge-time">⏱️ ${task.estTime}</span>
              </div>
            </div>
          </div>
          <button class="task-cta-btn" onclick="${task.launchFn}">
            ${ctaLabel}
          </button>
        </div>
      `;
    }).join('');
  }

  toggleTaskCompleted(day, taskId, xp) {
    if (!this.progress.completedTasksByDay[day]) {
      this.progress.completedTasksByDay[day] = [];
    }
    const list = this.progress.completedTasksByDay[day];
    const index = list.indexOf(taskId);

    if (index === -1) {
      list.push(taskId);
      this.addXP(xp, "Mission Task Cleared");
      // Add study time
      this.progress.todayFocusMinutes = (this.progress.todayFocusMinutes || 0) + 8;
    } else {
      list.splice(index, 1);
      this.progress.xp = Math.max(0, (this.progress.xp || 0) - xp);
      this.saveProgress();
    }
    this.renderDailyDashboard();
  }

  // ── FOCUS ZONE & IMMERSION MODE ─────────────────────────────
  setPomodoroMinutes(minutes, btn) {
    document.querySelectorAll('.focus-tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    
    this.focusTotalDuration = minutes * 60;
    this.focusRemainingSeconds = this.focusTotalDuration;
    this.updatePomodoroDisplay();
  }

  updatePomodoroDisplay() {
    const el = document.getElementById('pomodoro-display');
    const immersionEl = document.getElementById('immersion-timer-digits');
    const m = Math.floor(this.focusRemainingSeconds / 60);
    const s = this.focusRemainingSeconds % 60;
    const str = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    
    if (el) el.textContent = str;
    if (immersionEl) immersionEl.textContent = str;
  }

  toggleFocusTimer() {
    if (this.isFocusRunning) {
      this.pauseFocusTimer();
    } else {
      this.startFocusTimer();
      this.enterImmersionMode();
    }
  }

  startFocusTimer() {
    this.isFocusRunning = true;
    const btn = document.getElementById('btn-toggle-focus');
    const label = document.getElementById('pomodoro-status-label');
    const digits = document.getElementById('pomodoro-display');
    if (btn) btn.innerHTML = '<span>⏸ Pause Immersion Mode</span>';
    if (label) label.textContent = '⚡ Deep Focus Active';
    if (digits) digits.classList.add('running');

    clearInterval(this.focusTimerInterval);
    this.focusTimerInterval = setInterval(() => {
      this.focusRemainingSeconds--;
      this.updatePomodoroDisplay();

      if (this.focusRemainingSeconds <= 0) {
        this.pauseFocusTimer();
        this.progress.todayFocusMinutes = (this.progress.todayFocusMinutes || 0) + Math.round(this.focusTotalDuration / 60);
        this.addXP(60, "Pomodoro Immersion Block Completed");
        this.showToast("🎉 Outstanding focus session completed! +60 XP Earned!", 'success');
        this.exitImmersionMode();
      }
    }, 1000);
  }

  pauseFocusTimer() {
    this.isFocusRunning = false;
    clearInterval(this.focusTimerInterval);
    const btn = document.getElementById('btn-toggle-focus');
    const label = document.getElementById('pomodoro-status-label');
    const digits = document.getElementById('pomodoro-display');
    if (btn) btn.innerHTML = '<span>🚀 Start Focus & Immersion Mode</span>';
    if (label) label.textContent = 'Paused';
    if (digits) digits.classList.remove('running');
  }

  enterImmersionMode() {
    const overlay = document.getElementById('immersion-overlay');
    const currentTask = this.getDayData(this.activeDay);
    const textEl = document.getElementById('immersion-current-task-text');
    if (textEl && currentTask) {
      textEl.textContent = `Day ${this.activeDay}: ${currentTask.theme} — ${currentTask.speaking.topic}`;
    }
    if (overlay) overlay.classList.add('active');
  }

  exitImmersionMode() {
    const overlay = document.getElementById('immersion-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  launchCurrentImmersionTask() {
    this.exitImmersionMode();
    this.openTaskSpeaking(this.activeDay);
  }

  // ── BOTTOM INSIGHTS: WEEKLY GRAPH & REWARD CHEST ────────────
  renderWeeklyBarGraph() {
    const container = document.getElementById('weekly-bars-container');
    if (!container) return;

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const currentDayIdx = (new Date().getDay() + 6) % 7; // 0=Mon, 6=Sun
    const activity = this.progress.weeklyActivity || [20, 30, 45, 30, 50, 20, 30];

    container.innerHTML = days.map((name, i) => {
      const isToday = i === currentDayIdx;
      const mins = isToday ? (this.progress.todayFocusMinutes || 20) : activity[i];
      const maxMins = 60;
      const pct = Math.min(100, Math.round((mins / maxMins) * 100));

      return `
        <div class="weekly-bar-col ${isToday ? 'today' : ''}">
          <div class="weekly-bar-track" title="${name}: ${mins} mins focus">
            <div class="weekly-bar-fill" style="height: ${Math.max(12, pct)}%;"></div>
          </div>
          <div class="weekly-bar-day">${name}</div>
        </div>
      `;
    }).join('');

    const focusMinutesEl = document.getElementById('focus-today-minutes');
    if (focusMinutesEl) {
      focusMinutesEl.textContent = `${this.progress.todayFocusMinutes || 0} mins`;
    }
  }

  updateRewardChest(day, completedCount) {
    const icon = document.getElementById('chest-icon');
    const title = document.getElementById('chest-title');
    const desc = document.getElementById('chest-desc');
    const pill = document.getElementById('chest-pill');
    const isClaimed = (this.progress.chestClaimedDays || []).includes(day);

    if (isClaimed) {
      if (icon) icon.textContent = '🏆';
      if (title) title.textContent = 'Daily Chest Claimed!';
      if (desc) desc.textContent = 'Great consistency! Come back tomorrow for the next reward.';
      if (pill) pill.textContent = 'Status: Unlocked (+100 XP Claimed)';
    } else if (completedCount >= 3) {
      if (icon) icon.textContent = '✨🎁';
      if (title) title.textContent = 'Bonus Chest Ready!';
      if (desc) desc.textContent = 'Click to open and claim your +100 XP Flight Reward!';
      if (pill) pill.textContent = 'Ready to Claim!';
    } else {
      if (icon) icon.textContent = '🔒🎁';
      if (title) title.textContent = 'Locked Daily Flight Chest';
      if (desc) desc.textContent = `Clear ${3 - completedCount} more mission(s) to unlock today's bonus!`;
      if (pill) pill.textContent = `Progress: ${completedCount}/3 Done`;
    }
  }

  clickRewardChest() {
    const day = this.activeDay;
    const completedTasks = this.progress.completedTasksByDay[day] || [];
    const isClaimed = (this.progress.chestClaimedDays || []).includes(day);

    if (isClaimed) {
      this.showToast('You have already claimed this flight chest! 👍', 'info');
      return;
    }

    if (completedTasks.length >= 3) {
      if (!this.progress.chestClaimedDays) this.progress.chestClaimedDays = [];
      this.progress.chestClaimedDays.push(day);
      this.addXP(100, "Daily Bonus Reward Chest Opened");
      this.showToast('🎉 CONGRATULATIONS! +100 Bonus XP Claimed from Chest!', 'success');
      this.renderDailyDashboard();
    } else {
      this.showToast(`Complete at least 3 flight missions today to unlock the chest! (${completedTasks.length}/3 complete)`, 'warning');
    }
  }

  // ── IN-PLACE INTERACTIVE TASK MODAL (OPTION 4 & DAILY DRILLS) ─
  openTaskNews(day) {
    const dayData = this.getDayData(day);
    const n = dayData.news;

    this.showTaskModal(`📰 Flight Intelligence Briefing (Day ${day})`, `
      <div style="margin-bottom:1.5rem;">
        <span class="tag tag-category">${dayData.category}</span>
        <h2 style="font-size:1.35rem;color:#0f172a;margin-top:0.4rem;">${n.title}</h2>
      </div>
      <div style="font-size:0.98rem;line-height:1.8;color:#334155;background:#f8fafc;padding:1.5rem;border-radius:10px;margin-bottom:1.5rem;">
        ${n.article}
      </div>

      <h3 style="font-size:1.1rem;color:#0f172a;margin-bottom:0.75rem;">📖 Essential Aviation Terminology</h3>
      <div style="margin-bottom:1.5rem;">
        ${n.vocab.map(v => `
          <div class="vocab-card">
            <div class="vocab-word">${v.word}</div>
            <div class="vocab-def">${v.def}</div>
            <div class="vocab-example">Example: "${v.example}"</div>
          </div>
        `).join('')}
      </div>

      <h3 style="font-size:1.1rem;color:#0f172a;margin-bottom:0.75rem;">✅ Fast Comprehension Test</h3>
      ${n.quiz.map((q, qi) => `
        <div class="quiz-question" id="modal-quiz-${day}-${qi}">
          <p><strong>Q${qi+1}:</strong> ${q.q}</p>
          <div class="quiz-options">
            ${q.options.map((opt, oi) => `
              <div class="quiz-option" onclick="app.checkModalQuiz(${day}, ${qi}, ${oi}, ${q.ans}, '${q.exp.replace(/'/g, "\\'")}')">${opt}</div>
            `).join('')}
          </div>
          <div class="quiz-explanation" id="modal-exp-${day}-${qi}">💡 ${q.exp}</div>
        </div>
      `).join('')}

      <div style="margin-top:2rem;text-align:right;">
        <button class="btn btn-success btn-lg" onclick="app.completeAndCloseTask(${day}, 'task-news', 40)">
          ✓ Mark Reading Complete (+40 XP)
        </button>
      </div>
    `);
  }

  checkModalQuiz(day, qi, selected, correct, exp) {
    const qEl = document.getElementById(`modal-quiz-${day}-${qi}`);
    if (!qEl || qEl.dataset.answered) return;
    qEl.dataset.answered = 'true';

    const opts = qEl.querySelectorAll('.quiz-option');
    opts.forEach((opt, idx) => {
      if (idx === correct) opt.classList.add('correct');
      if (idx === selected && idx !== correct) opt.classList.add('incorrect');
    });

    const expEl = document.getElementById(`modal-exp-${day}-${qi}`);
    if (expEl) expEl.classList.add('show');

    if (selected === correct) {
      this.addXP(15, "Quiz Question Passed");
    }
  }

  openTaskSpeaking(day) {
    const dayData = this.getDayData(day);
    const sp = dayData.speaking;

    this.showTaskModal(`🎙️ Oral Fluency Simulator (Day ${day})`, `
      <div style="background:#f8fafc;padding:1.25rem;border-radius:10px;margin-bottom:1.25rem;">
        <div style="font-size:0.8rem;font-weight:700;color:#f97316;text-transform:uppercase;">${sp.topic}</div>
        <div style="font-size:1.1rem;font-weight:700;color:#0f172a;margin-top:0.3rem;">"${sp.prompt}"</div>
      </div>

      <div class="timer-container" style="margin:1rem 0;">
        <div class="timer-display" id="modal-speech-timer">01:30</div>
      </div>

      <div style="display:flex;justify-content:center;gap:0.75rem;margin-bottom:1.25rem;flex-wrap:wrap;">
        <button class="btn btn-success" id="modal-start-timer-btn" onclick="app.startSpeechCountdown(90)">▶ Start 90s Countdown</button>
        <button class="btn btn-primary" id="modal-rec-btn" onclick="app.toggleModalRecording()">🎤 Record Speech with Mic</button>
      </div>

      <div class="recording-indicator" id="modal-rec-indicator">
        <span class="recording-dot"></span>
        <span>Microphone recording active! Speak continuously in full sentences.</span>
      </div>

      <h4 style="font-size:0.9rem;margin-bottom:0.4rem;color:#334155;">Speech Transcript:</h4>
      <div class="speech-transcript" id="modal-speech-transcript" style="min-height:90px;">
        <span style="color:#94a3b8;">Speak aloud. Your transcribed English will appear here in real time...</span>
      </div>

      <h4 style="font-size:0.9rem;margin:1.2rem 0 0.4rem;color:#334155;">💡 Suggested Boardroom Connectors:</h4>
      <div class="expression-chips">
        ${sp.phrases.map(p => `<span class="expression-chip">${p}</span>`).join('')}
      </div>

      <div style="margin-top:1.5rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
        <button class="btn btn-outline" onclick="app.toggleSampleAnswer('modal-speaking-model')">👀 View Native Model Response</button>
        <button class="btn btn-accent btn-lg" onclick="app.completeAndCloseTask(${day}, 'task-speaking', 50)">
          ✓ Finish Speech Challenge (+50 XP)
        </button>
      </div>

      <div class="sample-answer" id="modal-speaking-model">
        <h4>📝 Native Speaker Benchmark</h4>
        ${sp.model}
      </div>
    `);
  }

  openTaskWriting(day) {
    const dayData = this.getDayData(day);
    const w = dayData.writing;
    const saved = localStorage.getItem(`curriculum-writing-${day}`) || '';

    this.showTaskModal(`✍️ Executive Writing Workshop (Day ${day})`, `
      <div style="margin-bottom:1rem;">
        <span class="tag tag-category">${w.type}</span>
        <h3 style="font-size:1.15rem;color:#0f172a;margin-top:0.3rem;">${w.prompt}</h3>
      </div>

      <h4 style="font-size:0.85rem;color:#475569;margin-bottom:0.3rem;">📋 Standard Executive Template</h4>
      <div class="writing-template" style="margin-bottom:1rem;">${w.template}</div>

      <h4 style="font-size:0.85rem;color:#475569;margin-bottom:0.3rem;">✏️ Your Executive Draft</h4>
      <textarea class="writing-area" id="modal-writing-text" style="min-height:160px;" placeholder="Compose your email, memo, or proposal here...">${saved}</textarea>
      <div class="word-count" id="modal-writing-wc">0 words</div>

      <div style="margin-top:1.25rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
        <div style="display:flex;gap:0.5rem;">
          <button class="btn btn-primary" onclick="app.saveCurriculumWriting(${day})">💾 Save Draft</button>
          <button class="btn btn-outline" onclick="app.toggleSampleAnswer('modal-writing-model')">👀 Compare Model</button>
        </div>
        <button class="btn btn-success btn-lg" onclick="app.saveCurriculumWriting(${day}); app.completeAndCloseTask(${day}, 'task-writing', 50)">
          ✓ Complete Writing Drill (+50 XP)
        </button>
      </div>

      <div class="sample-answer" id="modal-writing-model">
        <h4>📝 C-Level Executive Model</h4>
        ${w.model}
      </div>
    `);

    const ta = document.getElementById('modal-writing-text');
    if (ta) {
      ta.addEventListener('input', () => {
        const words = ta.value.trim().split(/\s+/).filter(w => w).length;
        const wcEl = document.getElementById('modal-writing-wc');
        if (wcEl) wcEl.textContent = `${words} words`;
      });
      ta.dispatchEvent(new Event('input'));
    }
  }

  saveCurriculumWriting(day) {
    const ta = document.getElementById('modal-writing-text');
    if (ta) {
      localStorage.setItem(`curriculum-writing-${day}`, ta.value);
      this.showToast('Draft saved successfully! 💾', 'success');
    }
  }

  openTaskIdiom(day) {
    const dayData = this.getDayData(day);
    const idiom = dayData.idiom;

    this.showTaskModal(`📚 Boardroom Idiom & Collocation (Day ${day})`, `
      <div style="text-align:center;padding:1.5rem;background:#f8fafc;border-radius:12px;margin-bottom:1.5rem;">
        <div style="font-size:2rem;font-weight:800;color:#1e3a8a;">"${idiom.idiom}"</div>
        <div style="font-size:1.05rem;color:#475569;margin-top:0.5rem;"><strong>Meaning:</strong> ${idiom.meaning}</div>
        <div style="font-size:0.95rem;color:#64748b;margin-top:0.5rem;font-style:italic;">"${idiom.example}"</div>
      </div>

      <div style="margin-bottom:1.5rem;">
        <h4 style="color:#0f172a;margin-bottom:0.5rem;">✍️ Quick Practical Usage Challenge:</h4>
        <p style="font-size:0.85rem;color:#64748b;margin-bottom:0.5rem;">Draft 1 sentence using "${idiom.idiom}" in an aviation meeting context:</p>
        <input type="text" class="search-input" id="idiom-practice-input" placeholder="e.g. Let's ${idiom.idiom} on our quarterly fleet fuel projections.">
      </div>

      <div style="text-align:right;">
        <button class="btn btn-success btn-lg" onclick="app.completeAndCloseTask(${day}, 'task-idiom', 25)">
          ✓ Memorized & Practiced (+25 XP)
        </button>
      </div>
    `);
  }

  showTaskModal(title, bodyHtml) {
    const overlay = document.getElementById('task-modal-overlay');
    const titleEl = document.getElementById('task-modal-title');
    const bodyEl = document.getElementById('task-modal-body');
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.innerHTML = bodyHtml;
    if (overlay) overlay.classList.add('active');
  }

  closeTaskModal() {
    const overlay = document.getElementById('task-modal-overlay');
    if (overlay) overlay.classList.remove('active');
    this.stopSpeechCountdown();
    this.stopModalRecording();
  }

  completeAndCloseTask(day, taskId, xp) {
    if (!this.progress.completedTasksByDay[day]) {
      this.progress.completedTasksByDay[day] = [];
    }
    if (!this.progress.completedTasksByDay[day].includes(taskId)) {
      this.progress.completedTasksByDay[day].push(taskId);
      this.addXP(xp, "Mission Task Cleared");
    }
    this.closeTaskModal();
    this.renderDailyDashboard();
  }

  // ── SPEECH COUNTDOWN TIMER & SPEECH RECOGNITION ─────────────
  startSpeechCountdown(seconds) {
    this.speechTimerSeconds = seconds;
    const timerEl = document.getElementById('modal-speech-timer');
    const btn = document.getElementById('modal-start-timer-btn');
    if (btn) btn.style.display = 'none';

    clearInterval(this.speechTimerInterval);
    this.speechTimerInterval = setInterval(() => {
      this.speechTimerSeconds--;
      const m = Math.floor(this.speechTimerSeconds / 60);
      const s = this.speechTimerSeconds % 60;
      if (timerEl) timerEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

      if (this.speechTimerSeconds <= 0) {
        clearInterval(this.speechTimerInterval);
        this.showToast("Time's up! Great oral delivery! 👏", 'info');
      }
    }, 1000);
  }

  stopSpeechCountdown() {
    clearInterval(this.speechTimerInterval);
  }

  initSpeechRecognition() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    this.speechRecognition = new SR();
    this.speechRecognition.continuous = true;
    this.speechRecognition.interimResults = true;
    this.speechRecognition.lang = 'en-US';

    this.speechRecognition.onresult = (e) => {
      let txt = '';
      for (let i = 0; i < e.results.length; i++) {
        txt += e.results[i][0].transcript + ' ';
      }
      const el = document.getElementById('modal-speech-transcript');
      if (el) el.textContent = txt;
    };
  }

  toggleModalRecording() {
    if (this.isRecording) {
      this.stopModalRecording();
    } else {
      this.startModalRecording();
    }
  }

  startModalRecording() {
    if (!this.speechRecognition) {
      this.showToast("Speech recognition is supported in Google Chrome & Safari.", 'warning');
      return;
    }
    this.isRecording = true;
    try { this.speechRecognition.start(); } catch(e) {}
    
    const btn = document.getElementById('modal-rec-btn');
    const ind = document.getElementById('modal-rec-indicator');
    if (btn) { btn.textContent = '⏹ Stop Recording'; btn.classList.add('btn-danger'); }
    if (ind) ind.classList.add('active');
  }

  stopModalRecording() {
    this.isRecording = false;
    if (this.speechRecognition) {
      try { this.speechRecognition.stop(); } catch(e) {}
    }
    const btn = document.getElementById('modal-rec-btn');
    const ind = document.getElementById('modal-rec-indicator');
    if (btn) { btn.textContent = '🎤 Record Speech with Mic'; btn.classList.remove('btn-danger'); }
    if (ind) ind.classList.remove('active');
  }

  // ── OPTION 4: CUSTOM AVIATION NEWS IMPORTER ─────────────────
  openImportModal() {
    const overlay = document.getElementById('import-modal-overlay');
    if (overlay) overlay.classList.add('active');
  }

  closeImportModal() {
    const overlay = document.getElementById('import-modal-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  processImportedArticle() {
    const title = document.getElementById('import-article-title').value.trim();
    const cat = document.getElementById('import-article-category').value.trim() || 'Custom Aviation News';
    const text = document.getElementById('import-article-text').value.trim();

    if (!title || !text) {
      this.showToast("Please provide both an article title and text.", 'warning');
      return;
    }

    // Auto-generate vocabulary & quiz from text
    const customItem = {
      id: `custom-${Date.now()}`,
      title: title,
      category: cat,
      difficulty: "Advanced",
      date: new Date().toISOString().split('T')[0],
      image: "✈️",
      article: text,
      vocabulary: [
        { word: title.split(' ')[0] + " Strategy", definition: "Core operational approach governing industry rollout", example: `Airlines prioritized their ${title.split(' ')[0].toLowerCase()} roadmap.` },
        { word: "Regulatory Compliance", definition: "Meeting all safety and airworthiness benchmarks", example: "The airline strictly adhered to regulatory compliance standards." },
        { word: "Operational Synergies", definition: "Cost and efficiency benefits gained from strategic coordination", example: "The initiative unlocked valuable operational synergies." }
      ],
      comprehensionQuestions: [
        {
          question: `What is the central focus of "${title}"?`,
          options: ["Complete flight shutdown", title, "Canceling aircraft orders", "Reducing passenger baggage"],
          correct: 1,
          explanation: `The article specifically addresses ${title}.`
        },
        {
          question: "How does this news impact aviation operations?",
          options: ["Requires strategic coordination and operational resilience", "It has no impact", "Forces all pilots to resign", "Grounds international routes"],
          correct: 0,
          explanation: "Modern aviation developments require coordinated fleet, regulatory, and financial management."
        }
      ],
      discussionPrompts: [
        `How would you brief your manager about ${title}?`,
        "What operational risks should our airline anticipate?"
      ]
    };

    if (!this.progress.customArticles) this.progress.customArticles = [];
    this.progress.customArticles.unshift(customItem);
    APP_DATA.aviationNews.unshift(customItem);

    this.addXP(50, "Imported Custom Aviation News");
    this.closeImportModal();
    this.renderAviationNews();
    this.showToast("Custom Aviation Article converted into study pack! 🎉", 'success');
  }

  // ── 30-DAY CURRICULUM EXPLORER ──────────────────────────────
  renderCurriculumGrid() {
    const container = document.getElementById('curriculum-grid-container');
    if (!container) return;

    const list = APP_DATA.curriculum30 || [];
    container.innerHTML = list.map(item => {
      const isCurrent = item.day === this.activeDay;
      const doneTasks = this.progress.completedTasksByDay[item.day] || [];
      const isDone = doneTasks.length >= 3;

      return `
        <div class="quick-action-card" style="border-left: 4px solid ${isDone ? '#10b981' : isCurrent ? '#f97316' : '#cbd5e1'};" onclick="app.activeDay=${item.day}; app.showSection('dashboard');">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="badge ${isDone ? 'badge-success' : isCurrent ? 'badge-warning' : 'badge-info'}">Day ${item.day}</span>
            <span style="font-size:0.75rem;font-weight:700;color:#64748b;">${item.category}</span>
          </div>
          <h3 style="margin-top:0.5rem;font-size:1.05rem;">${item.theme}</h3>
          <p style="font-size:0.85rem;color:#64748b;margin-top:0.25rem;">${item.news.title.substring(0, 70)}...</p>
          <div style="margin-top:0.75rem;font-size:0.8rem;font-weight:700;color:${isDone ? '#10b981' : '#1e40af'};">
            ${isDone ? '✓ Missions Cleared' : isCurrent ? '👉 Current Mission Day' : 'Select Day →'}
          </div>
        </div>
      `;
    }).join('');
  }

  // ── LEVEL ASSESSMENT DIAGNOSTIC ─────────────────────────────
  getEstimatedOPIc() {
    const totalXP = this.progress.xp || 0;
    if (totalXP < 250) return "IH (Solid)";
    if (totalXP < 600) return "IH+ (Near AL)";
    if (totalXP < 1200) return "AL (Advanced Low)";
    if (totalXP < 2200) return "AM (Advanced Mid)";
    return "AH / Superior";
  }

  getEstimatedTOEIC() {
    const totalXP = this.progress.xp || 0;
    return Math.min(990, 875 + Math.min(105, Math.floor(totalXP / 20)));
  }

  renderAssessment() {
    const container = document.getElementById('assessment-content');
    if (!container) return;

    const opic = this.getEstimatedOPIc();
    const toeic = this.getEstimatedTOEIC();
    const rank = this.getCurrentRank();

    container.innerHTML = `
      <div class="assessment-container">
        <div class="assessment-hero">
          <h2>📊 Official Fluency Diagnostic & Level Assessment</h2>
          <p>Real-time competency evaluation engine based on your baseline scores (TOEIC 875 / OPIc IH) and live study output.</p>
        </div>

        <div class="level-score-cards">
          <div class="level-score-card primary-card">
            <span class="badge-type">Spoken Exam</span>
            <div class="exam-name">OPIc Spoken Fluency</div>
            <div class="current-score">${opic}</div>
            <div class="baseline-score">Baseline: OPIc IH (2 yrs ago)</div>
            <span class="improvement-tag">Target: OPIc AL / AM</span>
          </div>

          <div class="level-score-card">
            <span class="badge-type">Standardized</span>
            <div class="exam-name">Estimated TOEIC</div>
            <div class="current-score">${toeic}</div>
            <div class="baseline-score">Baseline: 875</div>
            <span class="improvement-tag">+${toeic - 875} pts gained</span>
          </div>

          <div class="level-score-card">
            <span class="badge-type">Pilot Rank</span>
            <div class="exam-name">Aviator Standing</div>
            <div class="current-score">${rank.badge}</div>
            <div class="baseline-score">${this.progress.xp} Total Flight XP</div>
            <span class="improvement-tag">Level ${rank.level} Pilot</span>
          </div>
        </div>

        <div class="teacher-note-card">
          <h4>👨‍🏫 Teacher's Strategic Assessment for Meetings & Interviews</h4>
          <p>
            <strong>Hello! As your English Coach, here is my diagnostic assessment:</strong><br>
            With your <strong>TOEIC 875</strong> and <strong>OPIc IH</strong> foundation, you have strong passive vocabulary. Your bottleneck is <em>retrieval latency</em> (the 2–4 seconds it takes to formulate an impromptu sentence during an English meeting or job interview).
          </p>
          <ul style="margin:0.75rem 0 0.75rem 1.25rem;line-height:1.7;">
            <li><strong>Daily Micro-Habit:</strong> Use the <strong>90s Oral Simulation</strong> with the browser recorder every day. Do not pause for grammar perfection—focus on continuous paragraph velocity.</li>
            <li><strong>Eliminate Preposition Slips:</strong> Remember to say <em>"discuss the flight schedule"</em> (not "discuss about"), and <em>"responsible for maintenance"</em> (not "responsible of").</li>
            <li><strong>Boardroom Diplomacy:</strong> In your next meeting role-play, incorporate phrases like <em>"To mitigate this risk, we propose..."</em> and <em>"Let me play devil's advocate here."</em></li>
          </ul>
        </div>
      </div>
    `;
  }

  // ── OTHER SECTIONS COMPATIBILITY ───────────────────────────
  renderAviationNews() {
    const container = document.getElementById('news-content');
    if (!container) return;
    container.innerHTML = `
      <div class="section-header">
        <h2>📰 Aviation Industry Intelligence</h2>
        <p>Explore all available news articles and custom imports.</p>
      </div>
      <div class="article-list">
        ${APP_DATA.aviationNews.map(a => `
          <div class="article-card" onclick="app.showCustomArticle('${a.id}')">
            <div class="article-card-header">
              <div class="article-icon">${a.image}</div>
              <div class="article-info">
                <h3>${a.title}</h3>
                <div class="article-meta"><span>📅 ${a.date}</span> · <span>📂 ${a.category}</span></div>
              </div>
            </div>
            <div class="article-card-body"><p>${a.article.substring(0, 180)}...</p></div>
          </div>
        `).join('')}
      </div>
    `;
  }

  showCustomArticle(id) {
    const a = APP_DATA.aviationNews.find(x => x.id === id);
    if (a) {
      this.openTaskNews(1); // loads into interactive modal view
    }
  }

  renderMeetings() {
    const container = document.getElementById('meetings-content');
    if (!container) return;
    container.innerHTML = `
      <div class="section-header">
        <h2>🤝 Business Meeting Scenarios</h2>
        <p>Lead project updates, cross-functional alignments, and contract negotiations.</p>
      </div>
      <div class="dashboard-grid">
        ${APP_DATA.meetingScenarios.map(m => `
          <div class="scenario-card" onclick="app.openTaskSpeaking(m.id==='meeting-1'?1:2)">
            <div class="scenario-card-header">
              <h3>${m.title}</h3>
              <p>${m.context}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderSpeaking() {
    const container = document.getElementById('speaking-content');
    if (!container) return;
    container.innerHTML = `
      <div class="section-header">
        <h2>🎙️ Oral Fluency Simulator Prompts</h2>
        <p>Timed 90s - 150s aviation challenges with speech recognition.</p>
      </div>
      <div class="dashboard-grid">
        ${APP_DATA.speakingPrompts.map(p => `
          <div class="speaking-card" onclick="app.openTaskSpeaking(1)">
            <div class="speaking-category">${p.category}</div>
            <h3>${p.topic}</h3>
            <p class="speaking-prompt">${p.prompt}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderWriting() {
    const container = document.getElementById('writing-content');
    if (!container) return;
    container.innerHTML = `
      <div class="section-header">
        <h2>✍️ Executive Aviation Writing Workshop</h2>
        <p>Formal memos, meeting minutes, and international route proposals.</p>
      </div>
      <div class="dashboard-grid">
        ${APP_DATA.writingExercises.map(w => `
          <div class="writing-card" onclick="app.openTaskWriting(1)">
            <div class="writing-card-header">
              <div>
                <h3>${w.title}</h3>
                <span class="tag tag-category">${w.category}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderInterview() {
    const container = document.getElementById('interview-content');
    if (!container) return;
    container.innerHTML = `
      <div class="section-header">
        <h2>💼 Aviation & Corporate Interview Preparation (STAR)</h2>
        <p>Structure high-scoring behavioral answers with Situation, Task, Action, and Result.</p>
      </div>
      <div class="dashboard-grid">
        ${APP_DATA.interviewPrep.map(q => `
          <div class="interview-card" onclick="app.openTaskSpeaking(28)">
            <div class="interview-category">${q.category}</div>
            <h3>"${q.title}"</h3>
            <p style="font-size:0.85rem;color:#64748b;margin-top:0.35rem;">${q.tip}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderVocabulary() {
    const container = document.getElementById('vocabulary-content');
    if (!container) return;
    container.innerHTML = `
      <div class="section-header">
        <h2>📚 Boardroom Idioms & Colloquialisms</h2>
        <p>Master expressions native corporate executives use every day.</p>
      </div>
      <div class="idiom-grid">
        ${APP_DATA.businessIdioms.map(i => `
          <div class="idiom-card" onclick="app.openTaskIdiom(1)">
            <div class="idiom-text">"${i.idiom}"</div>
            <div class="idiom-meaning">${i.meaning}</div>
            <div class="idiom-example">"${i.example}"</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  toggleSampleAnswer(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('show');
  }

  showPlanModal() {
    let overlay = document.getElementById('plan-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'plan-modal-overlay';
      overlay.className = 'plan-setup-overlay';
      overlay.innerHTML = `
        <div class="plan-setup-modal">
          <div class="plan-setup-header">
            <h2>🎯 Choose Your Target English Flight Plan</h2>
            <p>Select your deadline to calibrate daily mission intensity and progress.</p>
          </div>
          <div class="plan-setup-body">
            <div class="plan-options">
              ${APP_DATA.studyPlans.map(plan => `
                <div class="plan-option ${this.progress.selectedPlan === plan.id ? 'selected' : ''}" onclick="app.selectPlan('${plan.id}')">
                  <div class="plan-icon">${plan.icon}</div>
                  <div class="plan-duration">${plan.durationDays} Days Target</div>
                  <div style="font-weight:700;color:#0f172a;margin:0.25rem 0;">${plan.name}</div>
                  <div class="plan-desc">${plan.targetGoal}</div>
                  <div class="plan-level-tag">Target: ${plan.targetOPIC} · TOEIC ${plan.targetTOEIC}</div>
                </div>
              `).join('')}
            </div>
            <div style="text-align:center;margin-top:1.5rem;">
              <button class="btn btn-primary btn-lg" onclick="document.getElementById('plan-modal-overlay').style.display='none'">Confirm & Fly</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
    }
    overlay.style.display = 'flex';
  }

  selectPlan(planId) {
    this.progress.selectedPlan = planId;
    this.saveProgress();
    this.showToast(`Switched plan to ${APP_DATA.studyPlans.find(p=>p.id===planId).name}!`, 'success');
    const overlay = document.getElementById('plan-modal-overlay');
    if (overlay) overlay.style.display = 'none';
    this.renderDailyDashboard();
  }

  // ── NAVIGATION CONTROLLER ───────────────────────────────────
  setupNavigation() {
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        this.showSection(section);
      });
    });

    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('show');
      });
    }
  }

  showSection(sectionName) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`section-${sectionName}`);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.toggle('active', a.dataset.section === sectionName);
    });

    this.currentSection = sectionName;
    document.querySelector('.nav-links')?.classList.remove('show');

    if (sectionName === 'dashboard') {
      this.renderDailyDashboard();
    } else if (sectionName === 'assessment') {
      this.renderAssessment();
    } else if (sectionName === 'curriculum') {
      this.renderCurriculumGrid();
    }

    this.saveProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showToast(message, type = 'info') {
    const container = document.querySelector('.toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
}

// ── INITIALIZE APPLICATION ────────────────────────────────────
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new EnglishStudyApp();
});
