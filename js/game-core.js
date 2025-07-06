/**
 * WordBuddy Game Core
 * Main game logic and coordination
 */

import { GameData } from './game-data.js';
import { StorageManager } from './storage-manager.js';
import { AudioManager } from './audio-manager.js';
import { SpeechRecognitionManager } from './speech-recognition.js';
import { UIManager } from './ui-manager.js';

export class GameCore {
    constructor() {
        // Game state
        this.currentCategory = null;
        this.currentWordIndex = 0;
        this.currentWords = [];
        this.score = 0;
        this.totalWords = GameData.getGameConfig().totalWords;
        
        // Game data and settings
        this.progress = StorageManager.DEFAULT_PROGRESS;
        this.settings = StorageManager.DEFAULT_SETTINGS;
        
        // Managers
        this.audioManager = new AudioManager();
        this.speechManager = new SpeechRecognitionManager();
        this.uiManager = new UIManager();
        
        // Initialize
        this.initialize();
    }

    async initialize() {
        console.log('🎯 WordBuddy: Initializing game...');
        
        // Load saved data
        this.loadGameData();
        
        // Setup speech recognition callbacks
        this.setupSpeechRecognition();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Update UI
        this.updateAllUI();
        
        // Show welcome screen after loading
        setTimeout(() => {
            this.uiManager.showScreen('welcome');
            console.log('🎯 Game ready to play!');
        }, 1500);
        
        console.log('🎯 WordBuddy: Game initialized successfully!');
    }

    loadGameData() {
        this.progress = StorageManager.loadProgress();
        this.settings = StorageManager.loadSettings();
        
        // Apply settings
        this.audioManager.setVolume(this.settings.volume);
        this.speechManager.setEnabled(this.settings.speechRecognition);
        
        // Update UI with settings
        this.uiManager.updateSettingsUI(this.settings);
    }

    setupSpeechRecognition() {
        // Set up speech recognition callbacks
        this.speechManager.onResult = (result, confidence) => {
            this.handleSpeechResult(result, confidence);
        };
        
        this.speechManager.onError = (errorType) => {
            this.handleSpeechError(errorType);
        };
        
        this.speechManager.onTimeout = () => {
            this.uiManager.showMessage('No speech detected. Try the microphone button again!', 'info');
            this.uiManager.updateListenButton('ready');
        };
    }

    setupEventListeners() {
        // Start button
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.audioManager.unlockAudio();
                this.audioManager.playButtonSound();
                this.uiManager.showScreen('category');
            });
        }
        
        // Settings button
        const settingsBtn = document.getElementById('settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.audioManager.playButtonSound();
                this.uiManager.showScreen('settings');
            });
        }
        
        // Back buttons
        this.setupBackButtons();
        
        // Category buttons
        this.setupCategoryButtons();
        
        // Game control buttons
        this.setupGameButtons();
        
        // Settings controls
        this.setupSettingsControls();
        
        // Prevent zoom on double tap
        this.preventZoom();
    }

    setupBackButtons() {
        const backButtons = [
            { id: 'category-back-btn', target: 'welcome' },
            { id: 'game-back-btn', target: 'category' },
            { id: 'settings-back-btn', target: 'welcome' }
        ];
        
        backButtons.forEach(({ id, target }) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', () => {
                    this.audioManager.playButtonSound();
                    this.uiManager.showScreen(target);
                });
            }
        });
    }

    setupCategoryButtons() {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.audioManager.unlockAudio();
                this.audioManager.playButtonSound();
                const category = e.currentTarget.dataset.category;
                this.startGame(category);
            });
        });
    }

    setupGameButtons() {
        // Listen button (speech recognition)
        const listenBtn = document.getElementById('play-audio-btn');
        if (listenBtn) {
            listenBtn.addEventListener('click', () => {
                this.audioManager.playButtonSound();
                this.startSpeechRecognition();
            });
        }
        
        // Say Again button
        const repeatBtn = document.getElementById('repeat-btn');
        if (repeatBtn) {
            repeatBtn.addEventListener('click', () => {
                this.audioManager.playButtonSound();
                this.playCurrentWordAudio();
            });
        }
        
        // Next Word button
        const nextBtn = document.getElementById('next-word-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.audioManager.playButtonSound();
                this.nextWord();
            });
        }
        
        // Practice Word button
        const recordBtn = document.getElementById('record-btn');
        if (recordBtn) {
            recordBtn.addEventListener('click', () => {
                this.audioManager.playButtonSound();
                this.playCurrentWordAudio();
            });
        }
        
        // I Said It button
        const goodJobBtn = document.getElementById('good-job-btn');
        if (goodJobBtn) {
            goodJobBtn.addEventListener('click', () => {
                this.audioManager.playButtonSound();
                this.handleCorrectPronunciation();
            });
        }
        
        // Success screen buttons
        const playAgainBtn = document.getElementById('play-again-btn');
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', () => {
                this.audioManager.playButtonSound();
                this.startGame(this.currentCategory);
            });
        }
        
        const chooseCategoryBtn = document.getElementById('choose-category-btn');
        if (chooseCategoryBtn) {
            chooseCategoryBtn.addEventListener('click', () => {
                this.audioManager.playButtonSound();
                this.uiManager.showScreen('category');
            });
        }
    }

    setupSettingsControls() {
        // Volume slider
        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                this.settings.volume = e.target.value / 100;
                this.audioManager.setVolume(this.settings.volume);
                this.saveSettings();
            });
        }
        
        // Speech toggle
        const speechToggle = document.getElementById('speech-toggle');
        if (speechToggle) {
            speechToggle.addEventListener('click', (e) => {
                this.audioManager.playButtonSound();
                this.settings.speechRecognition = !this.settings.speechRecognition;
                this.speechManager.setEnabled(this.settings.speechRecognition);
                e.target.classList.toggle('active', this.settings.speechRecognition);
                e.target.textContent = this.settings.speechRecognition ? 'ON' : 'OFF';
                this.saveSettings();
                this.updateSpeechUI();
            });
        }
        
        // Microphone permission button
        const micBtn = document.getElementById('mic-permission-btn');
        if (micBtn) {
            micBtn.addEventListener('click', () => {
                this.audioManager.playButtonSound();
                this.requestMicrophonePermission();
            });
        }
        
        // Reset progress button
        const resetBtn = document.getElementById('reset-progress-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.audioManager.playButtonSound();
                if (confirm('Are you sure you want to reset all progress?')) {
                    this.resetProgress();
                }
            });
        }
    }

    preventZoom() {
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    startGame(category) {
        console.log(`🎮 Starting game with category: ${category}`);
        this.currentCategory = category;
        this.currentWordIndex = 0;
        this.score = 0;
        
        // Get random words from category
        const allWords = GameData.getWordData()[category];
        this.currentWords = this.shuffleArray([...allWords]).slice(0, this.totalWords);
        
        this.uiManager.showScreen('game');
        this.displayCurrentWord();
        this.updateGameProgress();
    }

    displayCurrentWord() {
        if (this.currentWordIndex >= this.currentWords.length) {
            this.showSuccessScreen();
            return;
        }
        
        const word = this.currentWords[this.currentWordIndex];
        this.uiManager.displayWord(word);
        
        // Auto-play audio after a short delay
        setTimeout(() => {
            this.playCurrentWordAudio();
        }, GameData.getGameConfig().audioDelay);
    }

    async playCurrentWordAudio() {
        if (this.currentWordIndex >= this.currentWords.length) return;
        
        const word = this.currentWords[this.currentWordIndex];
        const audioPlayed = await this.audioManager.playWordAudio(word.audio);
        
        if (!audioPlayed) {
            // Fallback: show visual feedback and try speech synthesis
            this.uiManager.showAudioFallback();
            this.audioManager.speakWord(word.word);
        }
    }

    startSpeechRecognition() {
        if (!this.speechManager.isAvailable()) {
            console.warn('🎤 Speech recognition not available');
            this.uiManager.showMessage('Speech recognition not available. Use the "👍 I Said It!" button instead.', 'info');
            return;
        }
        
        const started = this.speechManager.start();
        if (started) {
            this.uiManager.updateListenButton('listening');
            this.uiManager.showMessage('🎤 Say the word clearly!', 'listening');
        }
    }

    handleSpeechResult(result, confidence) {
        const currentWord = this.currentWords[this.currentWordIndex].word.toLowerCase();
        console.log(`🎤 Analyzing speech: "${result}" vs "${currentWord}"`);
        
        // Clear listening UI
        this.uiManager.clearMessage();
        this.uiManager.updateListenButton('ready');
        
        // Analyze the match
        const analysis = this.speechManager.analyzeMatch(result, currentWord, confidence);
        
        console.log(`🎤 Analysis:`, analysis);
        
        if (analysis.isMatch) {
            console.log('🎉 Speech recognition SUCCESS!');
            this.uiManager.showMessage(`Excellent! You said "${result}"`, 'success');
            this.handleCorrectPronunciation();
        } else {
            console.log('🔄 Speech recognition - try again');
            this.uiManager.showMessage(`I heard "${result}". Try saying "${currentWord}" again!`, 'info');
            this.uiManager.showEncouragement();
        }
    }

    handleSpeechError(errorType) {
        console.warn('🎤 Speech recognition error:', errorType);
        
        // Clear listening UI
        this.uiManager.clearMessage();
        this.uiManager.updateListenButton('ready');
        
        // Handle language-not-supported gracefully
        if (errorType === 'language-not-supported') {
            console.warn('🎤 Speech recognition language not supported on this device');
            this.speechManager.speechSupported = false;
            this.updateSpeechUI();
            this.uiManager.showMessage('🎤 Speech recognition not available on this device. Use "👍 I Said It!" to continue playing!', 'info');
            return;
        }
        
        // Provide specific feedback based on error type
        const errorMessages = {
            'not-allowed': '🚫 Microphone access denied. Click the microphone button above to grant permission.',
            'no-speech': '🔇 No speech detected. Make sure you\'re speaking clearly into the microphone.',
            'network': '📶 Network issue. Check your internet connection and try again.',
            'audio-capture': '🎤 Microphone not working. Check if another app is using your microphone.',
            'aborted': '⏹️ Speech recognition stopped. You can try the microphone button again.'
        };
        
        const message = errorMessages[errorType] || '⚠️ Speech recognition had an issue. Try again or use the "👍 I Said It!" button.';
        this.uiManager.showMessage(message, 'error');
        
        // Suggest alternative after multiple errors
        this.speechManager.speechErrorCount = (this.speechManager.speechErrorCount || 0) + 1;
        if (this.speechManager.speechErrorCount >= 3) {
            setTimeout(() => {
                this.uiManager.showMessage('💡 Tip: You can also use "👍 I Said It!" if the microphone keeps having trouble!', 'info');
                this.speechManager.speechErrorCount = 0;
            }, 2000);
        }
    }

    handleCorrectPronunciation() {
        this.score++;
        this.audioManager.playSuccessSound();
        
        // Visual celebration
        this.uiManager.showCelebration();
        
        // Enable next button
        this.uiManager.enableNextButton();
        
        // Update progress
        this.updateGameProgress();
        
        // Save progress
        const currentWord = this.currentWords[this.currentWordIndex].word;
        if (!this.progress[this.currentCategory].includes(currentWord)) {
            this.progress[this.currentCategory].push(currentWord);
            this.saveProgress();
            this.updateProgressIndicators();
        }
        
        console.log(`✅ Correct pronunciation! Score: ${this.score}/${this.totalWords}`);
        
        // Auto-advance to next word after celebration
        setTimeout(() => {
            this.nextWord();
        }, GameData.getGameConfig().autoAdvanceDelay);
    }

    nextWord() {
        this.currentWordIndex++;
        
        if (this.currentWordIndex >= this.currentWords.length) {
            this.showSuccessScreen();
        } else {
            this.displayCurrentWord();
            this.updateGameProgress();
        }
    }

    showSuccessScreen() {
        this.uiManager.showSuccessScreen(this.score, this.totalWords);
        this.audioManager.playSuccessSound('Fantastic! Well done!');
    }

    updateGameProgress() {
        this.uiManager.updateGameProgress(this.currentWordIndex, this.totalWords, this.score);
    }

    updateProgressIndicators() {
        this.uiManager.updateProgressIndicators(this.progress, GameData.getWordData());
    }

    updateSpeechUI() {
        const speechAvailable = this.speechManager.isAvailable();
        this.uiManager.updateSpeechUI(speechAvailable);
    }

    updateAllUI() {
        this.updateProgressIndicators();
        this.updateSpeechUI();
        this.uiManager.updateSettingsUI(this.settings);
    }

    async requestMicrophonePermission() {
        this.uiManager.updateMicrophoneButton('requesting');
        
        const granted = await this.speechManager.requestMicrophonePermission();
        
        if (granted) {
            this.uiManager.updateMicrophoneButton('granted');
            this.uiManager.showMicrophoneFeedback('✅ Microphone ready! You can now use speech recognition.', 'success');
        } else {
            this.uiManager.updateMicrophoneButton('denied');
            this.uiManager.showMicrophoneFeedback('❌ Could not access microphone. Try refreshing the page.', 'error');
        }
    }

    // Utility methods
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Storage methods
    saveProgress() {
        StorageManager.saveProgress(this.progress);
    }

    saveSettings() {
        StorageManager.saveSettings(this.settings);
    }

    resetProgress() {
        this.progress = StorageManager.DEFAULT_PROGRESS;
        StorageManager.resetProgress();
        this.updateProgressIndicators();
        console.log('🔄 Progress reset');
    }

    // Debug function
    debugSpeechRecognition() {
        return this.speechManager.generateDebugReport();
    }
}
