/**
 * WordBuddy UI Manager
 * Handles all UI updates, screen management, and visual feedback
 */

import { GameData } from './game-data.js';

export class UIManager {
    constructor() {
        this.currentScreen = 'loading';
        this.messageTimeout = null;
    }

    showScreen(screenName) {
        console.log(`📱 Switching to screen: ${screenName}`);
        
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenName;
        } else {
            console.error(`Screen not found: ${screenName}-screen`);
        }
    }

    displayWord(word) {
        // Update UI elements
        const wordText = document.getElementById('word-text');
        const phoneticHint = document.getElementById('phonetic-hint');
        
        if (wordText) wordText.textContent = word.word;
        if (phoneticHint) phoneticHint.textContent = word.phonetic;
        
        // Handle image display
        this.displayWordImage(word);
        
        // Reset next button
        const nextBtn = document.getElementById('next-word-btn');
        if (nextBtn) nextBtn.disabled = true;
        
        console.log(`🔤 Displaying word: ${word.word}`);
    }

    displayWordImage(word) {
        const imgContainer = document.querySelector('.word-image-container');
        if (!imgContainer) {
            console.warn('Image container not found');
            return;
        }
        
        // Clear container completely and reset
        imgContainer.innerHTML = '';
        
        // Create new image element
        const newImg = document.createElement('img');
        newImg.id = 'word-image';
        newImg.className = 'word-image';
        newImg.src = word.image;
        newImg.alt = word.word;
        newImg.style.display = 'none'; // Hide initially
        
        newImg.onload = () => {
            newImg.style.display = 'block';
            console.log(`✅ Image loaded for: ${word.word}`);
        };
        
        newImg.onerror = () => {
            console.log(`📷 Image failed for: ${word.word}, showing emoji fallback`);
            // Remove the failed image and show emoji instead
            newImg.remove();
            this.showEmojiFallback(word.word, imgContainer);
        };
        
        // Add the image to container
        imgContainer.appendChild(newImg);
    }

    showEmojiFallback(word, container) {
        const emojiDiv = document.createElement('div');
        emojiDiv.className = 'emoji-fallback';
        emojiDiv.style.cssText = 'font-size: 4rem; display: flex; align-items: center; justify-content: center; height: 100%; background: white; border-radius: 20px;';
        emojiDiv.textContent = GameData.getEmojiForWord(word);
        container.appendChild(emojiDiv);
    }

    updateGameProgress(currentIndex, totalWords, score) {
        const progress = (currentIndex / totalWords) * 100;
        const progressBar = document.getElementById('game-progress');
        const scoreDisplay = document.getElementById('current-score');
        
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        if (scoreDisplay) {
            scoreDisplay.textContent = `⭐ ${score}/${totalWords}`;
        }
    }

    updateProgressIndicators(progress, gameData) {
        Object.keys(progress).forEach(category => {
            const indicator = document.getElementById(`${category}-progress`);
            if (indicator && gameData[category]) {
                const totalWords = gameData[category].length;
                const completedWords = progress[category].length;
                const percentage = (completedWords / totalWords) * 100;
                indicator.style.width = `${percentage}%`;
            }
        });
    }

    showMessage(message, type = 'info', duration = 3000) {
        // Remove any existing message
        this.clearMessage();
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'game-message';
        messageDiv.textContent = message;
        
        let backgroundColor;
        switch (type) {
            case 'listening':
                backgroundColor = 'rgba(156, 39, 176, 0.9)';
                break;
            case 'success':
                backgroundColor = 'rgba(76, 175, 80, 0.9)';
                break;
            case 'error':
                backgroundColor = 'rgba(244, 67, 54, 0.9)';
                break;
            default:
                backgroundColor = 'rgba(33, 150, 243, 0.9)';
        }
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.2rem;
            color: white;
            background: ${backgroundColor};
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 1000;
            animation: messageSlideIn 0.3s ease;
            max-width: 90%;
            text-align: center;
        `;
        
        document.body.appendChild(messageDiv);
        
        // Auto-remove after specified duration (except for listening messages)
        if (type !== 'listening' && duration > 0) {
            this.messageTimeout = setTimeout(() => {
                this.clearMessage();
            }, duration);
        }
    }

    clearMessage() {
        const existingMessage = document.querySelector('.game-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
            this.messageTimeout = null;
        }
    }

    showCelebration() {
        // Create temporary celebration element
        const celebration = document.createElement('div');
        celebration.innerHTML = '🎉 Great Job! 🎉';
        celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 2rem;
            color: white;
            background: rgba(76, 175, 80, 0.9);
            padding: 20px 40px;
            border-radius: 15px;
            z-index: 1000;
            animation: celebrationPop 1.5s ease;
        `;
        
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            if (document.body.contains(celebration)) {
                document.body.removeChild(celebration);
            }
        }, 1500);
    }

    showEncouragement() {
        const encouragements = ['Try again! 💪', 'You can do it! 🌟', 'Keep trying! 🚀', 'Almost there! 💫'];
        const message = encouragements[Math.floor(Math.random() * encouragements.length)];
        
        const encouragement = document.createElement('div');
        encouragement.innerHTML = message;
        encouragement.style.cssText = `
            position: fixed;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.5rem;
            color: white;
            background: rgba(255, 193, 7, 0.9);
            padding: 15px 30px;
            border-radius: 10px;
            z-index: 1000;
            animation: encouragementFade 2s ease;
        `;
        
        document.body.appendChild(encouragement);
        
        setTimeout(() => {
            if (document.body.contains(encouragement)) {
                document.body.removeChild(encouragement);
            }
        }, 2000);
    }

    showSuccessScreen(score, totalWords) {
        const stars = Math.min(5, Math.max(1, score));
        const starText = '⭐'.repeat(stars);
        
        const successMessage = document.getElementById('success-message');
        const starsEarned = document.getElementById('stars-earned');
        
        if (successMessage) {
            successMessage.textContent = `You completed ${score} out of ${totalWords} words!`;
        }
        
        if (starsEarned) {
            starsEarned.textContent = starText;
        }
        
        this.showScreen('success');
        console.log(`🏆 Game completed! Score: ${score}/${totalWords}`);
    }

    showAudioFallback() {
        const wordText = document.getElementById('word-text');
        const phoneticHint = document.getElementById('phonetic-hint');
        
        if (wordText) {
            // Visual pronunciation animation
            wordText.style.animation = 'none';
            wordText.offsetHeight; // Trigger reflow
            wordText.style.animation = 'pronounceWord 1s ease';
        }
        
        if (phoneticHint) {
            // Show pronunciation hint
            phoneticHint.style.animation = 'none';
            phoneticHint.offsetHeight; // Trigger reflow
            phoneticHint.style.animation = 'highlightPhonetic 1s ease';
        }
        
        setTimeout(() => {
            if (wordText) wordText.style.animation = '';
            if (phoneticHint) phoneticHint.style.animation = '';
        }, 1000);
    }

    updateSpeechUI(speechAvailable) {
        const speechControls = document.getElementById('speech-controls');
        const recordBtn = document.getElementById('record-btn');
        const goodJobBtn = document.getElementById('good-job-btn');
        
        if (speechAvailable) {
            if (speechControls) speechControls.style.display = 'flex';
            if (recordBtn) recordBtn.style.display = 'block';
            if (goodJobBtn) goodJobBtn.style.display = 'block';
        } else {
            if (recordBtn) recordBtn.style.display = 'none';
            if (goodJobBtn) goodJobBtn.style.display = 'block';
        }
    }

    updateListenButton(state) {
        const listenBtn = document.getElementById('play-audio-btn');
        if (!listenBtn) return;

        switch (state) {
            case 'listening':
                listenBtn.innerHTML = '<span>🎤 Listening...</span>';
                listenBtn.style.background = 'linear-gradient(45deg, #FF5722, #FF9800)';
                listenBtn.disabled = true;
                break;
            case 'ready':
            default:
                listenBtn.innerHTML = '<span>🎤 Listen to Me</span>';
                listenBtn.style.background = 'linear-gradient(45deg, #4ECDC4, #44A08D)';
                listenBtn.disabled = false;
                break;
        }
    }

    updateMicrophoneButton(state) {
        const micBtn = document.getElementById('mic-permission-btn');
        if (!micBtn) return;

        const micIcon = micBtn.querySelector('.mic-icon');
        const micText = micBtn.querySelector('.mic-text');
        
        // Remove all state classes
        micBtn.classList.remove('granted', 'denied');
        
        switch (state) {
            case 'requesting':
                if (micIcon) micIcon.textContent = '⏳';
                if (micText) micText.textContent = 'Requesting...';
                micBtn.disabled = true;
                break;
            case 'granted':
                micBtn.classList.add('granted');
                if (micIcon) micIcon.textContent = '✅';
                if (micText) micText.textContent = 'Microphone Ready';
                micBtn.disabled = false;
                break;
            case 'denied':
                micBtn.classList.add('denied');
                if (micIcon) micIcon.textContent = '❌';
                if (micText) micText.textContent = 'Microphone Blocked';
                micBtn.disabled = false;
                break;
            default:
                if (micIcon) micIcon.textContent = '🎤';
                if (micText) micText.textContent = 'Allow Microphone';
                micBtn.disabled = false;
        }
    }

    showMicrophoneFeedback(message, type) {
        // Create a temporary feedback element
        const feedback = document.createElement('div');
        feedback.className = `mic-feedback ${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            animation: slideInDown 0.3s ease-out;
            max-width: 90%;
            text-align: center;
        `;
        
        document.body.appendChild(feedback);
        
        // Remove feedback after 3 seconds
        setTimeout(() => {
            feedback.style.animation = 'slideOutUp 0.3s ease-in';
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.parentNode.removeChild(feedback);
                }
            }, 300);
        }, 3000);
    }

    updateSettingsUI(settings) {
        setTimeout(() => {
            const volumeSlider = document.getElementById('volume-slider');
            const speechToggle = document.getElementById('speech-toggle');
            
            if (volumeSlider) {
                volumeSlider.value = settings.volume * 100;
            }
            
            if (speechToggle) {
                speechToggle.classList.toggle('active', settings.speechRecognition);
                speechToggle.textContent = settings.speechRecognition ? 'ON' : 'OFF';
            }
        }, 100);
    }

    addButtonPressEffect(button) {
        if (button) {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);
        }
    }

    enableNextButton() {
        const nextBtn = document.getElementById('next-word-btn');
        if (nextBtn) {
            nextBtn.disabled = false;
        }
    }
}
