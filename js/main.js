/**
 * WordBuddy Main Entry Point
 * Initializes the game and handles global setup
 */

import { GameCore } from './game-core.js';

// Global game instance
let wordBuddyGame = null;

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 WordBuddy: DOM loaded, starting game...');
    
    // Create game instance
    wordBuddyGame = new GameCore();
    
    // Make game instance available globally for debugging
    window.wordBuddyGame = wordBuddyGame;
    
    // Make debug function available globally
    window.debugSpeech = () => wordBuddyGame.debugSpeechRecognition();
    
    console.log('🎯 WordBuddy: Debug functions available:');
    console.log('  - window.wordBuddyGame (main game instance)');
    console.log('  - window.debugSpeech() (speech recognition debug)');
});

// Handle page visibility for audio management
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause any playing audio when page is hidden
        document.querySelectorAll('audio').forEach(audio => {
            if (!audio.paused) {
                audio.pause();
            }
        });
        
        // Stop speech synthesis
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
        
        // Stop speech recognition
        if (wordBuddyGame && wordBuddyGame.speechManager) {
            wordBuddyGame.speechManager.stop();
        }
    }
});

// Handle errors gracefully
window.addEventListener('error', (event) => {
    console.error('🚨 Game Error:', event.error);
    
    // Show user-friendly error message
    if (wordBuddyGame && wordBuddyGame.uiManager) {
        wordBuddyGame.uiManager.showMessage(
            'Something went wrong. Please refresh the page to continue.', 
            'error', 
            5000
        );
    }
});

// Export for potential use in other modules
export { wordBuddyGame };
