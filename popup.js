// DOM Elements
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const progressRing = document.getElementById('progress-ring-circle');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const pomodoroBtn = document.getElementById('pomodoro-btn');
const shortBreakBtn = document.getElementById('short-break-btn');
const longBreakBtn = document.getElementById('long-break-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.getElementById('close-settings');
const saveSettingsBtn = document.getElementById('save-settings');

// Settings elements
const pomodoroDurationInput = document.getElementById('pomodoro-duration');
const shortBreakDurationInput = document.getElementById('short-break-duration');
const longBreakDurationInput = document.getElementById('long-break-duration');
const autoStartBreaksInput = document.getElementById('auto-start-breaks');
const autoStartPomodorosInput = document.getElementById('auto-start-pomodoros');
const notificationSoundInput = document.getElementById('notification-sound');

// Timer variables
let timer;
let isRunning = false;
let timeLeft = 25 * 60; // in seconds
let totalTime = 25 * 60; // in seconds
let currentMode = 'pomodoro';

// Settings
let settings = {
  pomodoroDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  notificationSound: 'bell'
};

// Progress ring setup
const radius = 100;
const circumference = 2 * Math.PI * radius;
progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
progressRing.style.strokeDashoffset = 0;

// Check if running in Chrome extension context
const isExtensionContext = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync;

// Load settings from storage
function loadSettings() {
  if (isExtensionContext) {
    chrome.storage.sync.get('pomodoroSettings', (data) => {
      if (data.pomodoroSettings) {
        settings = data.pomodoroSettings;
        
        // Update input fields
        updateSettingsInputs();
        
        // Update timer based on current mode
        updateTimerDisplay();
      }
    });
  } else {
    // In development environment, use default settings
    console.log('Running in development mode. Using default settings.');
    updateSettingsInputs();
    updateTimerDisplay();
  }
}

// Update settings input fields
function updateSettingsInputs() {
  pomodoroDurationInput.value = settings.pomodoroDuration;
  shortBreakDurationInput.value = settings.shortBreakDuration;
  longBreakDurationInput.value = settings.longBreakDuration;
  autoStartBreaksInput.checked = settings.autoStartBreaks;
  autoStartPomodorosInput.checked = settings.autoStartPomodoros;
  notificationSoundInput.value = settings.notificationSound;
}

// Save settings to storage
function saveSettings() {
  settings = {
    pomodoroDuration: parseInt(pomodoroDurationInput.value, 10),
    shortBreakDuration: parseInt(shortBreakDurationInput.value, 10),
    longBreakDuration: parseInt(longBreakDurationInput.value, 10),
    autoStartBreaks: autoStartBreaksInput.checked,
    autoStartPomodoros: autoStartPomodorosInput.checked,
    notificationSound: notificationSoundInput.value
  };
  
  if (isExtensionContext) {
    chrome.storage.sync.set({ pomodoroSettings: settings }, () => {
      console.log('Settings saved');
      settingsModal.style.display = 'none';
      
      // Reset timer based on current mode
      resetTimer();
    });
  } else {
    console.log('Settings saved (development mode):', settings);
    settingsModal.style.display = 'none';
    
    // Reset timer based on current mode
    resetTimer();
  }
}

// Update timer display
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  minutesEl.textContent = minutes.toString().padStart(2, '0');
  secondsEl.textContent = seconds.toString().padStart(2, '0');
  
  // Update progress ring
  const progress = 1 - (timeLeft / totalTime);
  const offset = circumference * progress;
  progressRing.style.strokeDashoffset = offset;
}

// Start timer
function startTimer() {
  if (isRunning) return;
  
  isRunning = true;
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      
      // Play notification sound
      playNotificationSound();
      
      // Show notification
      showNotification();
      
      // Auto-start next timer if enabled
      if (currentMode === 'pomodoro' && settings.autoStartBreaks) {
        switchMode('short-break');
        startTimer();
      } else if ((currentMode === 'short-break' || currentMode === 'long-break') && settings.autoStartPomodoros) {
        switchMode('pomodoro');
        startTimer();
      } else {
        resetTimer();
      }
    }
  }, 1000);
}

// Pause timer
function pauseTimer() {
  if (!isRunning) return;
  
  clearInterval(timer);
  isRunning = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

// Reset timer
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  
  // Set time based on current mode
  if (currentMode === 'pomodoro') {
    timeLeft = settings.pomodoroDuration * 60;
    totalTime = settings.pomodoroDuration * 60;
  } else if (currentMode === 'short-break') {
    timeLeft = settings.shortBreakDuration * 60;
    totalTime = settings.shortBreakDuration * 60;
  } else if (currentMode === 'long-break') {
    timeLeft = settings.longBreakDuration * 60;
    totalTime = settings.longBreakDuration * 60;
  }
  
  updateTimerDisplay();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

// Switch timer mode
function switchMode(mode) {
  // Reset active state for all mode buttons
  pomodoroBtn.classList.remove('active');
  shortBreakBtn.classList.remove('active');
  longBreakBtn.classList.remove('active');
  
  currentMode = mode;
  
  // Set active state for selected mode button
  if (mode === 'pomodoro') {
    pomodoroBtn.classList.add('active');
  } else if (mode === 'short-break') {
    shortBreakBtn.classList.add('active');
  } else if (mode === 'long-break') {
    longBreakBtn.classList.add('active');
  }
  
  // Reset timer with new mode
  resetTimer();
}

// Play notification sound
function playNotificationSound() {
  if (settings.notificationSound === 'none') return;
  
  try {
    const soundUrl = `sounds/${settings.notificationSound}.mp3`;
    const audio = new Audio(soundUrl);
    audio.play().catch(error => {
      console.warn('Could not play notification sound:', error);
    });
  } catch (error) {
    console.warn('Error playing notification sound:', error);
  }
}

// Show notification
function showNotification() {
  let title, message;
  
  if (currentMode === 'pomodoro') {
    title = 'Pomodoro Completed!';
    message = 'Time for a break!';
  } else {
    title = 'Break Completed!';
    message = 'Time to focus!';
  }
  
  if (isExtensionContext) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: title,
      message: message
    });
  } else {
    // In development environment, use browser notification if available
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(title, { body: message });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(title, { body: message });
          }
        });
      }
    } else {
      // Fallback to alert if notifications are not available
      alert(`${title}\n${message}`);
    }
  }
}

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

pomodoroBtn.addEventListener('click', () => switchMode('pomodoro'));
shortBreakBtn.addEventListener('click', () => switchMode('short-break'));
longBreakBtn.addEventListener('click', () => switchMode('long-break'));

settingsBtn.addEventListener('click', () => {
  settingsModal.style.display = 'block';
});

closeSettingsBtn.addEventListener('click', () => {
  settingsModal.style.display = 'none';
});

saveSettingsBtn.addEventListener('click', saveSettings);

// Close modal when clicking outside
window.addEventListener('click', (event) => {
  if (event.target === settingsModal) {
    settingsModal.style.display = 'none';
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  resetTimer();
});