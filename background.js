// Background script for the Focus Tomato extension

// Listen for alarms
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'pomodoroTimer') {
    // Timer completed, show notification
    chrome.storage.sync.get('pomodoroState', (data) => {
      const state = data.pomodoroState || {};
      let title, message;
      
      if (state.currentMode === 'pomodoro') {
        title = 'Pomodoro Completed!';
        message = 'Time for a break!';
      } else {
        title = 'Break Completed!';
        message = 'Time to focus!';
      }
      
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: title,
        message: message
      });
    });
  }
});

// Initialize extension
chrome.runtime.onInstalled.addListener(() => {
  // Set default settings if not already set
  chrome.storage.sync.get('pomodoroSettings', (data) => {
    if (!data.pomodoroSettings) {
      const defaultSettings = {
        pomodoroDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        autoStartBreaks: false,
        autoStartPomodoros: false,
        notificationSound: 'bell'
      };
      
      chrome.storage.sync.set({ pomodoroSettings: defaultSettings });
    }
  });
  
  console.log('Focus Tomato extension installed successfully!');
});