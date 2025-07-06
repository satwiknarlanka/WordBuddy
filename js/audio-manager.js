/**
 * WordBuddy Audio Manager
 * Handles audio playback and speech synthesis
 */

export class AudioManager {
    constructor() {
        this.audioContext = null;
        this.audioInitialized = false;
        this.preferredVoice = null;
        this.availableVoices = [];
        this.volume = 0.8;
        
        this.initializeAudio();
        this.initializeVoices();
    }

    async initializeAudio() {
        try {
            // Create audio context for iOS
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('🎵 Audio context created');
        } catch (error) {
            console.warn('🎵 Audio context not supported:', error);
        }
    }

    async unlockAudio() {
        if (!this.audioInitialized && this.audioContext) {
            try {
                await this.audioContext.resume();
                this.audioInitialized = true;
                console.log('🎵 Audio unlocked for iOS');
                return true;
            } catch (error) {
                console.warn('🎵 Failed to unlock audio:', error);
                return false;
            }
        }
        return true;
    }

    initializeVoices() {
        if ('speechSynthesis' in window) {
            // Wait for voices to be loaded
            const loadVoices = () => {
                this.availableVoices = speechSynthesis.getVoices();
                this.selectPreferredVoice();
            };
            
            // Voices might already be loaded
            if (speechSynthesis.getVoices().length > 0) {
                loadVoices();
            } else {
                // Wait for voices to load
                speechSynthesis.addEventListener('voiceschanged', loadVoices);
            }
        }
    }

    selectPreferredVoice() {
        // Look for British English female voices first
        const britishFemaleVoices = this.availableVoices.filter(voice => 
            voice.lang.includes('en-GB') && 
            (voice.name.toLowerCase().includes('female') || 
             voice.name.toLowerCase().includes('woman') ||
             voice.name.toLowerCase().includes('kate') ||
             voice.name.toLowerCase().includes('serena') ||
             voice.name.toLowerCase().includes('stephanie'))
        );
        
        // If no specific British female voice, look for any English female voice
        const englishFemaleVoices = this.availableVoices.filter(voice => 
            voice.lang.includes('en') && 
            (voice.name.toLowerCase().includes('female') || 
             voice.name.toLowerCase().includes('woman') ||
             voice.name.toLowerCase().includes('kate') ||
             voice.name.toLowerCase().includes('serena') ||
             voice.name.toLowerCase().includes('stephanie') ||
             voice.name.toLowerCase().includes('samantha') ||
             voice.name.toLowerCase().includes('victoria'))
        );
        
        // Fallback to any British English voice
        const britishVoices = this.availableVoices.filter(voice => 
            voice.lang.includes('en-GB')
        );
        
        // Select the best available voice
        if (britishFemaleVoices.length > 0) {
            this.preferredVoice = britishFemaleVoices[0];
            console.log(`🎭 Selected British female voice: ${this.preferredVoice.name}`);
        } else if (englishFemaleVoices.length > 0) {
            this.preferredVoice = englishFemaleVoices[0];
            console.log(`🎭 Selected English female voice: ${this.preferredVoice.name}`);
        } else if (britishVoices.length > 0) {
            this.preferredVoice = britishVoices[0];
            console.log(`🎭 Selected British voice: ${this.preferredVoice.name}`);
        } else {
            // Fallback to default voice
            this.preferredVoice = this.availableVoices[0];
            console.log(`🎭 Using default voice: ${this.preferredVoice?.name || 'system default'}`);
        }
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    async playWordAudio(audioSrc) {
        const audio = document.getElementById('word-audio');
        if (!audio) {
            console.warn('🎵 Audio element not found');
            return false;
        }

        try {
            audio.volume = this.volume;
            audio.src = audioSrc;
            
            // Add a loading event to detect if file exists
            return new Promise((resolve) => {
                const timeoutId = setTimeout(() => {
                    console.warn(`🎵 Audio file not found: ${audioSrc}`);
                    resolve(false);
                }, 2000);
                
                audio.addEventListener('canplaythrough', () => {
                    clearTimeout(timeoutId);
                    audio.play().then(() => {
                        console.log(`🎵 Playing word audio: ${audioSrc}`);
                        resolve(true);
                    }).catch(error => {
                        console.warn('🎵 Audio play failed:', error);
                        resolve(false);
                    });
                }, { once: true });
                
                audio.addEventListener('error', () => {
                    clearTimeout(timeoutId);
                    console.warn(`🎵 Audio file error: ${audioSrc}`);
                    resolve(false);
                }, { once: true });
                
                audio.load(); // Trigger loading
            });
        } catch (error) {
            console.warn('🎵 Audio setup failed:', error);
            return false;
        }
    }

    speakWord(word) {
        if (!('speechSynthesis' in window)) {
            console.warn('🗣️ Speech synthesis not supported');
            return false;
        }

        try {
            // Cancel any ongoing speech
            speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.rate = 0.8;
            utterance.pitch = 1.2;
            utterance.volume = this.volume;
            utterance.lang = 'en-GB'; // British English
            
            // Set the preferred voice if available
            if (this.preferredVoice) {
                utterance.voice = this.preferredVoice;
            }
            
            utterance.onstart = () => {
                console.log(`🗣️ Speaking word: "${word}" with ${this.preferredVoice?.name || 'default'} voice`);
            };
            
            utterance.onerror = (error) => {
                console.warn('🗣️ Speech synthesis error:', error);
            };
            
            speechSynthesis.speak(utterance);
            return true;
        } catch (error) {
            console.warn('🗣️ Speech synthesis failed:', error);
            return false;
        }
    }

    playSuccessSound(message = 'Brilliant!') {
        if (!('speechSynthesis' in window)) {
            return false;
        }

        try {
            const utterance = new SpeechSynthesisUtterance(message);
            utterance.volume = this.volume * 0.7;
            utterance.rate = 1.2;
            utterance.pitch = 1.3;
            utterance.lang = 'en-GB';
            
            // Use preferred voice if available
            if (this.preferredVoice) {
                utterance.voice = this.preferredVoice;
            }
            
            speechSynthesis.speak(utterance);
            return true;
        } catch (error) {
            console.warn('🎵 Success speech failed:', error);
            return false;
        }
    }

    playButtonSound() {
        if (!('speechSynthesis' in window)) {
            return false;
        }

        try {
            // Use a very short beep sound with speech synthesis
            const utterance = new SpeechSynthesisUtterance('');
            utterance.volume = this.volume * 0.1;
            utterance.rate = 10;
            speechSynthesis.speak(utterance);
            return true;
        } catch (error) {
            // Silent fail for button sounds
            return false;
        }
    }

    stopSpeech() {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
    }
}
