import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Focus Tomato 🍅</h1>
        
        <div className="text-center mb-6">
          <p className="text-gray-700">
            A modern, clean Pomodoro timer Chrome extension to boost your productivity.
          </p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">How to install the extension</h2>
          <ol className="list-decimal pl-5 text-gray-700 space-y-2">
            <li>Run <code className="bg-gray-100 px-1 rounded">npm run build:extension</code> to build the extension</li>
            <li>Open Chrome and go to <code className="bg-gray-100 px-1 rounded">chrome://extensions/</code></li>
            <li>Enable "Developer mode" in the top-right corner</li>
            <li>Click "Load unpacked" and select the <code className="bg-gray-100 px-1 rounded">dist</code> directory</li>
            <li>The extension should now appear in your Chrome toolbar</li>
          </ol>
        </div>
        
        <div className="text-center text-gray-600 text-sm">
          <p>The extension files are in the root directory of this project.</p>
          <p className="mt-2">Visit the GitHub repository for more information.</p>
        </div>
      </div>
    </div>
  );
}

export default App;