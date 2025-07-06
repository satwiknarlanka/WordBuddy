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
        
        // Show browser compatibility warning if needed
        if (!this.speechManager.speechSupported) {
            const userAgent = navigator.userAgent.toLowerCase();
            const browserInfo = {
                isChrome: userAgent.includes('chrome') && !userAgent.includes('edg'),
                isEdge: userAgent.includes('edg'),
                isSafari: userAgent.includes('safari') && !userAgent.includes('chrome'),
                isFirefox: userAgent.includes('firefox')
            };
            
            // Show warning after a delay so it doesn't interfere with loading
            setTimeout(() => {
                this.uiManager.showBrowserCompatibilityWarning(browserInfo);
            }, 2000);
        }
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
            
            // Show browser-specific message
            const userAgent = navigator.userAgent.toLowerCase();
            let message = 'Speech recognition not available. ';
            
            if (userAgent.includes('edg')) {
                message += 'Edge has known issues with speech recognition. Please try Chrome for the best experience, or use "👍 I Said It!" button.';
            } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
                message += 'Safari has limited support. Try Chrome for better experience, or use "👍 I Said It!" button.';
            } else if (userAgent.includes('firefox')) {
                message += 'Firefox doesn\'t support speech recognition. Try Chrome, or use "👍 I Said It!" button.';
            } else {
                message += 'Use the "👍 I Said It!" button instead.';
            }
            
            this.uiManager.showMessage(message, 'info', 5000);
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
        this.updateBrowserCompatibilityUI();
    }

    updateBrowserCompatibilityUI() {
        const userAgent = navigator.userAgent.toLowerCase();
        const isChrome = userAgent.includes('chrome') && !userAgent.includes('edg');
        const isEdgeChromium = userAgent.includes('edg/');
        const isEdgeLegacy = userAgent.includes('edge/');
        const isEdge = isEdgeChromium || isEdgeLegacy;
        const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');
        const isFirefox = userAgent.includes('firefox');
        
        // Show browser compatibility banner for non-Chrome browsers
        if (!this.speechManager.isAvailable() && !isChrome) {
            this.showBrowserCompatibilityBanner(isEdge, isSafari, isFirefox);
        }
        
        // Update listen button with browser-specific text
        const listenBtn = document.getElementById('play-audio-btn');
        if (listenBtn && !this.speechManager.isAvailable()) {
            if (isEdge) {
                listenBtn.innerHTML = '<span>🎤 Not Available (Edge)</span>';
                listenBtn.title = 'Edge has known issues with speech recognition. Try Chrome for better experience.';
            } else if (isSafari) {
                listenBtn.innerHTML = '<span>🎤 Limited Support (Safari)</span>';
                listenBtn.title = 'Speech recognition has limited support in Safari. Try Chrome for better experience.';
            } else if (isFirefox) {
                listenBtn.innerHTML = '<span>🎤 Not Available (Firefox)</span>';
                listenBtn.title = 'Firefox doesn\'t support speech recognition. Try Chrome for better experience.';
            } else {
                listenBtn.innerHTML = '<span>🎤 Not Available</span>';
                listenBtn.title = 'Speech recognition not supported in this browser.';
            }
            listenBtn.disabled = true;
            listenBtn.style.opacity = '0.6';
        }
    }

    showBrowserCompatibilityBanner(isEdge, isSafari, isFirefox) {
        // Create a banner to inform users about browser compatibility
        const banner = document.createElement('div');
        banner.id = 'browser-compatibility-banner';
        banner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(45deg, #FF9800, #FF5722);
            color: white;
            padding: 10px;
            text-align: center;
            z-index: 10000;
            font-size: 0.9rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        
        let message = '';
        if (isEdge) {
            message = '🎤 Edge has known issues with speech recognition. For the full experience with voice input, please try Chrome! You can still play using "👍 I Said It!" button.';
        } else if (isSafari) {
            message = '🎤 Limited speech support in Safari. For the best experience, try Chrome! You can still play using "👍 I Said It!" button.';
        } else if (isFirefox) {
            message = '🎤 Firefox doesn\'t support speech recognition. For the best experience, try Chrome! You can still play using "👍 I Said It!" button.';
        } else {
            message = '🎤 Speech recognition not available. You can still play using "👍 I Said It!" button.';
        }
        
        banner.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-left: 10px;">×</button>
            </div>
        `;
        
        // Only show if not already shown
        if (!document.getElementById('browser-compatibility-banner')) {
            document.body.insertBefore(banner, document.body.firstChild);
            
            // Auto-hide after 10 seconds
            setTimeout(() => {
                if (banner.parentNode) {
                    banner.remove();
                }
            }, 10000);
        }
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
