# Focus Tomato 🍅

A modern, clean Pomodoro timer Chrome extension to boost your productivity.

![Focus Tomato Screenshot](https://i.imgur.com/placeholder.png)

## Features

- 🎯 Clean, modern UI with a circular progress indicator
- ⏱️ Three timer modes:
  - Pomodoro (default: 25 minutes)
  - Short Break (default: 5 minutes)
  - Long Break (default: 15 minutes)
- ⚙️ Customizable timer durations
- 🔄 Auto-start options for breaks and pomodoros
- 🔔 Notification sounds
- 📱 Chrome notifications when timers complete

## Installation

### From Chrome Web Store (Coming Soon)

1. Visit the Chrome Web Store
2. Search for "Focus Tomato"
3. Click "Add to Chrome"

### Manual Installation (Developer Mode)

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/focus-tomato.git
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Build the extension:
   ```
   npm run build:extension
   ```
4. Open Chrome and navigate to `chrome://extensions/`
5. Enable "Developer mode" in the top-right corner
6. Click "Load unpacked" and select the `dist` directory
7. The extension should now be installed and visible in your toolbar

## Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. For testing as a Chrome extension, build the extension:
   ```
   npm run build:extension
   ```

## Usage

1. Click the extension icon in your Chrome toolbar to open the timer
2. Select your desired timer mode (Pomodoro, Short Break, or Long Break)
3. Click "Start" to begin the timer
4. Use "Pause" to temporarily stop the timer and "Reset" to start over
5. Access settings by clicking the gear icon to customize your experience

## Customization

Click the settings icon to customize:

- Pomodoro duration (1-60 minutes)
- Short break duration (1-30 minutes)
- Long break duration (1-60 minutes)
- Auto-start breaks after completing a pomodoro
- Auto-start pomodoros after completing a break
- Notification sound preferences

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.