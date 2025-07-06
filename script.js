// WordBuddy - Pronunciation Learning Game for 4-Year-Olds
// Main Game Controller

class WordBuddyGame {
    constructor() {
        this.currentScreen = 'loading';
        this.currentCategory = null;
        this.currentWordIndex = 0;
        this.currentWords = [];
        this.score = 0;
        this.totalWords = 5;
        this.settings = {
            volume: 0.8,
            speechRecognition: true
        };
        this.preferredVoice = null;
        this.availableVoices = [];
        this.progress = {
            animals: [],
            alphabets: [],
            days: [],
            months: [],
            colors: [],
            numbers: [],
            shapes: []
        };
        
        // Audio context for iOS
        this.audioContext = null;
        this.audioInitialized = false;
        
        // Speech recognition
        this.speechRecognition = null;
        this.speechSupported = false;
        
        this.init();
    }
    
    // Word data structure
    getWordData() {
        return {
            animals: [
                { word: 'cat', phonetic: '/kæt/', image: 'assets/images/cat.jpg', audio: 'assets/audio/cat.mp3' },
                { word: 'dog', phonetic: '/dɒɡ/', image: 'assets/images/dog.jpg', audio: 'assets/audio/dog.mp3' },
                { word: 'bird', phonetic: '/bɜːd/', image: 'assets/images/bird.jpg', audio: 'assets/audio/bird.mp3' },
                { word: 'fish', phonetic: '/fɪʃ/', image: 'assets/images/fish.jpg', audio: 'assets/audio/fish.mp3' },
                { word: 'cow', phonetic: '/kaʊ/', image: 'assets/images/cow.jpg', audio: 'assets/audio/cow.mp3' },
                { word: 'duck', phonetic: '/dʌk/', image: 'assets/images/duck.jpg', audio: 'assets/audio/duck.mp3' },
                { word: 'pig', phonetic: '/pɪɡ/', image: 'assets/images/pig.jpg', audio: 'assets/audio/pig.mp3' },
                { word: 'sheep', phonetic: '/ʃiːp/', image: 'assets/images/sheep.jpg', audio: 'assets/audio/sheep.mp3' },
                { word: 'elephant', phonetic: '/ˈeləfənt/', image: 'assets/images/elephant.jpg', audio: 'assets/audio/elephant.mp3' },
                { word: 'lion', phonetic: '/ˈlaɪən/', image: 'assets/images/lion.jpg', audio: 'assets/audio/lion.mp3' },
                { word: 'tiger', phonetic: '/ˈtaɪɡə/', image: 'assets/images/tiger.jpg', audio: 'assets/audio/tiger.mp3' },
                { word: 'bear', phonetic: '/beə/', image: 'assets/images/bear.jpg', audio: 'assets/audio/bear.mp3' },
                { word: 'monkey', phonetic: '/ˈmʌŋki/', image: 'assets/images/monkey.jpg', audio: 'assets/audio/monkey.mp3' },
                { word: 'rabbit', phonetic: '/ˈræbɪt/', image: 'assets/images/rabbit.jpg', audio: 'assets/audio/rabbit.mp3' },
                { word: 'horse', phonetic: '/hɔːs/', image: 'assets/images/horse.jpg', audio: 'assets/audio/horse.mp3' },
                { word: 'zebra', phonetic: '/ˈzebrə/', image: 'assets/images/zebra.jpg', audio: 'assets/audio/zebra.mp3' },
                { word: 'giraffe', phonetic: '/dʒɪˈrɑːf/', image: 'assets/images/giraffe.jpg', audio: 'assets/audio/giraffe.mp3' },
                { word: 'penguin', phonetic: '/ˈpeŋɡwɪn/', image: 'assets/images/penguin.jpg', audio: 'assets/audio/penguin.mp3' },
                { word: 'frog', phonetic: '/frɒɡ/', image: 'assets/images/frog.jpg', audio: 'assets/audio/frog.mp3' },
                { word: 'turtle', phonetic: '/ˈtɜːtl/', image: 'assets/images/turtle.jpg', audio: 'assets/audio/turtle.mp3' }
            ],
            alphabets: [
                { word: 'A', phonetic: '/eɪ/', image: 'assets/images/letter_a.jpg', audio: 'assets/audio/letter_a.mp3' },
                { word: 'B', phonetic: '/biː/', image: 'assets/images/letter_b.jpg', audio: 'assets/audio/letter_b.mp3' },
                { word: 'C', phonetic: '/siː/', image: 'assets/images/letter_c.jpg', audio: 'assets/audio/letter_c.mp3' },
                { word: 'D', phonetic: '/diː/', image: 'assets/images/letter_d.jpg', audio: 'assets/audio/letter_d.mp3' },
                { word: 'E', phonetic: '/iː/', image: 'assets/images/letter_e.jpg', audio: 'assets/audio/letter_e.mp3' },
                { word: 'F', phonetic: '/ef/', image: 'assets/images/letter_f.jpg', audio: 'assets/audio/letter_f.mp3' },
                { word: 'G', phonetic: '/dʒiː/', image: 'assets/images/letter_g.jpg', audio: 'assets/audio/letter_g.mp3' },
                { word: 'H', phonetic: '/eɪtʃ/', image: 'assets/images/letter_h.jpg', audio: 'assets/audio/letter_h.mp3' },
                { word: 'I', phonetic: '/aɪ/', image: 'assets/images/letter_i.jpg', audio: 'assets/audio/letter_i.mp3' },
                { word: 'J', phonetic: '/dʒeɪ/', image: 'assets/images/letter_j.jpg', audio: 'assets/audio/letter_j.mp3' },
                { word: 'K', phonetic: '/keɪ/', image: 'assets/images/letter_k.jpg', audio: 'assets/audio/letter_k.mp3' },
                { word: 'L', phonetic: '/el/', image: 'assets/images/letter_l.jpg', audio: 'assets/audio/letter_l.mp3' },
                { word: 'M', phonetic: '/em/', image: 'assets/images/letter_m.jpg', audio: 'assets/audio/letter_m.mp3' },
                { word: 'N', phonetic: '/en/', image: 'assets/images/letter_n.jpg', audio: 'assets/audio/letter_n.mp3' },
                { word: 'O', phonetic: '/əʊ/', image: 'assets/images/letter_o.jpg', audio: 'assets/audio/letter_o.mp3' },
                { word: 'P', phonetic: '/piː/', image: 'assets/images/letter_p.jpg', audio: 'assets/audio/letter_p.mp3' },
                { word: 'Q', phonetic: '/kjuː/', image: 'assets/images/letter_q.jpg', audio: 'assets/audio/letter_q.mp3' },
                { word: 'R', phonetic: '/ɑː/', image: 'assets/images/letter_r.jpg', audio: 'assets/audio/letter_r.mp3' },
                { word: 'S', phonetic: '/es/', image: 'assets/images/letter_s.jpg', audio: 'assets/audio/letter_s.mp3' },
                { word: 'T', phonetic: '/tiː/', image: 'assets/images/letter_t.jpg', audio: 'assets/audio/letter_t.mp3' },
                { word: 'U', phonetic: '/juː/', image: 'assets/images/letter_u.jpg', audio: 'assets/audio/letter_u.mp3' },
                { word: 'V', phonetic: '/viː/', image: 'assets/images/letter_v.jpg', audio: 'assets/audio/letter_v.mp3' },
                { word: 'W', phonetic: '/ˈdʌbəljuː/', image: 'assets/images/letter_w.jpg', audio: 'assets/audio/letter_w.mp3' },
                { word: 'X', phonetic: '/eks/', image: 'assets/images/letter_x.jpg', audio: 'assets/audio/letter_x.mp3' },
                { word: 'Y', phonetic: '/waɪ/', image: 'assets/images/letter_y.jpg', audio: 'assets/audio/letter_y.mp3' },
                { word: 'Z', phonetic: '/zed/', image: 'assets/images/letter_z.jpg', audio: 'assets/audio/letter_z.mp3' }
            ],
            days: [
                { word: 'Monday', phonetic: '/ˈmʌndeɪ/', image: 'assets/images/monday.jpg', audio: 'assets/audio/monday.mp3' },
                { word: 'Tuesday', phonetic: '/ˈtjuːzdeɪ/', image: 'assets/images/tuesday.jpg', audio: 'assets/audio/tuesday.mp3' },
                { word: 'Wednesday', phonetic: '/ˈwenzdeɪ/', image: 'assets/images/wednesday.jpg', audio: 'assets/audio/wednesday.mp3' },
                { word: 'Thursday', phonetic: '/ˈθɜːzdeɪ/', image: 'assets/images/thursday.jpg', audio: 'assets/audio/thursday.mp3' },
                { word: 'Friday', phonetic: '/ˈfraɪdeɪ/', image: 'assets/images/friday.jpg', audio: 'assets/audio/friday.mp3' },
                { word: 'Saturday', phonetic: '/ˈsætədeɪ/', image: 'assets/images/saturday.jpg', audio: 'assets/audio/saturday.mp3' },
                { word: 'Sunday', phonetic: '/ˈsʌndeɪ/', image: 'assets/images/sunday.jpg', audio: 'assets/audio/sunday.mp3' }
            ],
            months: [
                { word: 'January', phonetic: '/ˈdʒænjʊəri/', image: 'assets/images/january.jpg', audio: 'assets/audio/january.mp3' },
                { word: 'February', phonetic: '/ˈfebrʊəri/', image: 'assets/images/february.jpg', audio: 'assets/audio/february.mp3' },
                { word: 'March', phonetic: '/mɑːtʃ/', image: 'assets/images/march.jpg', audio: 'assets/audio/march.mp3' },
                { word: 'April', phonetic: '/ˈeɪprəl/', image: 'assets/images/april.jpg', audio: 'assets/audio/april.mp3' },
                { word: 'May', phonetic: '/meɪ/', image: 'assets/images/may.jpg', audio: 'assets/audio/may.mp3' },
                { word: 'June', phonetic: '/dʒuːn/', image: 'assets/images/june.jpg', audio: 'assets/audio/june.mp3' },
                { word: 'July', phonetic: '/dʒʊˈlaɪ/', image: 'assets/images/july.jpg', audio: 'assets/audio/july.mp3' },
                { word: 'August', phonetic: '/ˈɔːɡəst/', image: 'assets/images/august.jpg', audio: 'assets/audio/august.mp3' },
                { word: 'September', phonetic: '/sepˈtembə/', image: 'assets/images/september.jpg', audio: 'assets/audio/september.mp3' },
                { word: 'October', phonetic: '/ɒkˈtəʊbə/', image: 'assets/images/october.jpg', audio: 'assets/audio/october.mp3' },
                { word: 'November', phonetic: '/nəʊˈvembə/', image: 'assets/images/november.jpg', audio: 'assets/audio/november.mp3' },
                { word: 'December', phonetic: '/dɪˈsembə/', image: 'assets/images/december.jpg', audio: 'assets/audio/december.mp3' }
            ],
            colors: [
                { word: 'red', phonetic: '/red/', image: 'assets/images/red.jpg', audio: 'assets/audio/red.mp3' },
                { word: 'blue', phonetic: '/bluː/', image: 'assets/images/blue.jpg', audio: 'assets/audio/blue.mp3' },
                { word: 'green', phonetic: '/ɡriːn/', image: 'assets/images/green.jpg', audio: 'assets/audio/green.mp3' },
                { word: 'yellow', phonetic: '/ˈjeləʊ/', image: 'assets/images/yellow.jpg', audio: 'assets/audio/yellow.mp3' },
                { word: 'pink', phonetic: '/pɪŋk/', image: 'assets/images/pink.jpg', audio: 'assets/audio/pink.mp3' },
                { word: 'orange', phonetic: '/ˈɒrɪndʒ/', image: 'assets/images/orange.jpg', audio: 'assets/audio/orange.mp3' },
                { word: 'purple', phonetic: '/ˈpɜːpəl/', image: 'assets/images/purple.jpg', audio: 'assets/audio/purple.mp3' },
                { word: 'black', phonetic: '/blæk/', image: 'assets/images/black.jpg', audio: 'assets/audio/black.mp3' }
            ],
            numbers: [
                { word: 'one', phonetic: '/wʌn/', image: 'assets/images/one.jpg', audio: 'assets/audio/one.mp3' },
                { word: 'two', phonetic: '/tuː/', image: 'assets/images/two.jpg', audio: 'assets/audio/two.mp3' },
                { word: 'three', phonetic: '/θriː/', image: 'assets/images/three.jpg', audio: 'assets/audio/three.mp3' },
                { word: 'four', phonetic: '/fɔː/', image: 'assets/images/four.jpg', audio: 'assets/audio/four.mp3' },
                { word: 'five', phonetic: '/faɪv/', image: 'assets/images/five.jpg', audio: 'assets/audio/five.mp3' },
                { word: 'six', phonetic: '/sɪks/', image: 'assets/images/six.jpg', audio: 'assets/audio/six.mp3' },
                { word: 'seven', phonetic: '/ˈsevən/', image: 'assets/images/seven.jpg', audio: 'assets/audio/seven.mp3' },
                { word: 'eight', phonetic: '/eɪt/', image: 'assets/images/eight.jpg', audio: 'assets/audio/eight.mp3' }
            ],
            shapes: [
                { word: 'circle', phonetic: '/ˈsɜːkəl/', image: 'assets/images/circle.jpg', audio: 'assets/audio/circle.mp3' },
                { word: 'square', phonetic: '/skweə/', image: 'assets/images/square.jpg', audio: 'assets/audio/square.mp3' },
                { word: 'triangle', phonetic: '/ˈtraɪæŋɡəl/', image: 'assets/images/triangle.jpg', audio: 'assets/audio/triangle.mp3' },
                { word: 'star', phonetic: '/stɑː/', image: 'assets/images/star.jpg', audio: 'assets/audio/star.mp3' },
                { word: 'heart', phonetic: '/hɑːt/', image: 'assets/images/heart.jpg', audio: 'assets/audio/heart.mp3' },
                { word: 'diamond', phonetic: '/ˈdaɪəmənd/', image: 'assets/images/diamond.jpg', audio: 'assets/audio/diamond.mp3' },
                { word: 'oval', phonetic: '/ˈəʊvəl/', image: 'assets/images/oval.jpg', audio: 'assets/audio/oval.mp3' },
                { word: 'rectangle', phonetic: '/ˈrektæŋɡəl/', image: 'assets/images/rectangle.jpg', audio: 'assets/audio/rectangle.mp3' }
            ]
        };
    }
    
    async init() {
        console.log('🎯 WordBuddy: Initializing game...');
        
        // Load saved data
        this.loadProgress();
        this.loadSettings();
        
        // Initialize audio
        await this.initializeAudio();
        
        // Initialize voices for speech synthesis
        this.initializeVoices();
        
        // Initialize speech recognition
        this.initializeSpeechRecognition();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Update progress indicators
        this.updateProgressIndicators();
        
        // Show welcome screen after loading
        setTimeout(() => {
            this.showScreen('welcome');
            console.log('🎯 Game ready to play!');
        }, 1500);
        
        console.log('🎯 WordBuddy: Game initialized successfully!');
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
            } catch (error) {
                console.warn('🎵 Failed to unlock audio:', error);
            }
        }
    }
    
    initializeSpeechRecognition() {
        console.log('🎤 Initializing speech recognition...');
        
        // Check browser support first
        const hasWebkitSpeechRecognition = 'webkitSpeechRecognition' in window;
        const hasSpeechRecognition = 'SpeechRecognition' in window;
        
        console.log('🎤 Browser support check:');
        console.log('  - webkitSpeechRecognition:', hasWebkitSpeechRecognition);
        console.log('  - SpeechRecognition:', hasSpeechRecognition);
        console.log('  - User Agent:', navigator.userAgent);
        console.log('  - Protocol:', window.location.protocol);
        console.log('  - Is secure context:', window.isSecureContext);
        
        if (hasWebkitSpeechRecognition || hasSpeechRecognition) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            console.log('🎤 SpeechRecognition class found:', SpeechRecognition);
            
            try {
                this.speechRecognition = new SpeechRecognition();
                this.speechRecognition.continuous = false;
                this.speechRecognition.interimResults = false;
                
                // Try a simple English language code - some browsers need this
                try {
                    this.speechRecognition.lang = 'en-US'; // Most widely supported
                    console.log('🎤 Language set to en-US');
                } catch (error) {
                    console.warn('Could not set language, using default:', error);
                }
                
                // Mobile-specific optimizations
                this.speechRecognition.maxAlternatives = 3;                
                this.speechRecognition.onstart = () => {
                    console.log('🎤 Speech recognition started');
                    this.speechRecognitionActive = true;
                };
                
                this.speechRecognition.onend = () => {
                    console.log('🎤 Speech recognition ended');
                    this.speechRecognitionActive = false;
                    this.resetListenButton();
                };
                
                this.speechRecognition.onresult = (event) => {
                    const result = event.results[0][0].transcript.toLowerCase().trim();
                    const confidence = event.results[0][0].confidence;
                    console.log(`🎤 Speech result: "${result}" (confidence: ${confidence})`);
                    this.handleSpeechResult(result, confidence);
                };
                
                this.speechRecognition.onerror = (event) => {
                    console.warn('🎤 Speech recognition error:', event.error, event);
                    console.log('🎤 Full error event:', event); // DEBUG: Let's see exactly what's happening
                    this.handleSpeechError(event.error);
                };
                
                this.speechSupported = true;
                this.speechRecognitionActive = false;
                console.log('🎤 Speech recognition initialized successfully');
                
            } catch (error) {
                console.error('🎤 Failed to create speech recognition:', error);
                this.speechSupported = false;
            }
        } else {
            console.warn('🎤 Speech recognition not supported');
            console.warn('  - Possible reasons:');
            console.warn('    1. Browser does not support Web Speech API');
            console.warn('    2. Not running on HTTPS (required for most browsers)');
            console.warn('    3. Browser privacy settings blocking speech recognition');
            this.speechSupported = false;
        }
        
        // Log final state
        console.log('🎤 Final speech recognition state:');
        console.log('  - speechSupported:', this.speechSupported);
        console.log('  - settings.speechRecognition:', this.settings.speechRecognition);
        console.log('  - Will show speech controls:', this.speechSupported && this.settings.speechRecognition);
        
        // Update UI based on speech support
        this.updateSpeechUI();
        
        // Check microphone permission status on load
        this.checkMicrophonePermission();
    }
    
    async requestMicrophonePermission() {
        try {
            console.log('🎤 Requesting microphone permission...');
            
            // Show loading state
            this.updateMicrophoneButtonState('requesting');
            
            // Request microphone access with specific constraints for mobile
            const constraints = {
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                    sampleRate: 44100
                }
            };
            
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            
            // Test the stream briefly to ensure it's working
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            source.connect(analyser);
            
            // Stop the stream after testing
            stream.getTracks().forEach(track => track.stop());
            audioContext.close();
            
            console.log('🎤 Microphone permission granted and tested');
            this.updateMicrophoneButtonState('granted');
            
            // Show success feedback
            this.showMicrophoneFeedback('✅ Microphone ready! You can now use speech recognition.', 'success');
            
            // Reset error count
            this.speechErrorCount = 0;
            
        } catch (error) {
            console.warn('🎤 Microphone permission denied:', error);
            this.updateMicrophoneButtonState('denied');
            
            // Provide specific error feedback
            let errorMessage = '❌ ';
            if (error.name === 'NotAllowedError') {
                errorMessage += 'Please allow microphone access in your browser settings.';
            } else if (error.name === 'NotFoundError') {
                errorMessage += 'No microphone found. Check your device.';
            } else if (error.name === 'NotReadableError') {
                errorMessage += 'Microphone is being used by another app.';
            } else {
                errorMessage += 'Could not access microphone. Try refreshing the page.';
            }
            
            this.showMicrophoneFeedback(errorMessage, 'error');
        }
    }
    
    async checkMicrophonePermission() {
        try {
            if ('permissions' in navigator) {
                const permission = await navigator.permissions.query({ name: 'microphone' });
                
                switch (permission.state) {
                    case 'granted':
                        this.updateMicrophoneButtonState('granted');
                        break;
                    case 'denied':
                        this.updateMicrophoneButtonState('denied');
                        break;
                    default:
                        this.updateMicrophoneButtonState('prompt');
                }
                
                // Listen for permission changes
                permission.addEventListener('change', () => {
                    this.checkMicrophonePermission();
                });
            }
        } catch (error) {
            console.warn('🎤 Could not check microphone permission:', error);
        }
    }
    
    updateMicrophoneButtonState(state) {
        const micBtn = document.getElementById('mic-permission-btn');
        const micIcon = micBtn.querySelector('.mic-icon');
        const micText = micBtn.querySelector('.mic-text');
        
        // Remove all state classes
        micBtn.classList.remove('granted', 'denied');
        
        switch (state) {
            case 'requesting':
                micIcon.textContent = '⏳';
                micText.textContent = 'Requesting...';
                micBtn.disabled = true;
                break;
            case 'granted':
                micBtn.classList.add('granted');
                micIcon.textContent = '✅';
                micText.textContent = 'Microphone Ready';
                micBtn.disabled = false;
                break;
            case 'denied':
                micBtn.classList.add('denied');
                micIcon.textContent = '❌';
                micText.textContent = 'Microphone Blocked';
                micBtn.disabled = false;
                break;
            default:
                micIcon.textContent = '🎤';
                micText.textContent = 'Allow Microphone';
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
    
    initializeVoices() {
        if ('speechSynthesis' in window) {
            // Wait for voices to be loaded
            const loadVoices = () => {
                this.availableVoices = speechSynthesis.getVoices();
                this.selectFemaleVoice();
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
    
    selectFemaleVoice() {
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
    
    setupEventListeners() {
        // Start button
        document.getElementById('start-btn').addEventListener('click', () => {
            this.unlockAudio();
            this.playButtonSound();
            this.showScreen('category');
        });
        
        // Settings button
        document.getElementById('settings-btn').addEventListener('click', () => {
            this.playButtonSound();
            this.showScreen('settings');
        });
        
        // Back buttons
        document.getElementById('category-back-btn').addEventListener('click', () => {
            this.playButtonSound();
            this.showScreen('welcome');
        });
        
        document.getElementById('game-back-btn').addEventListener('click', () => {
            this.playButtonSound();
            this.showScreen('category');
        });
        
        document.getElementById('settings-back-btn').addEventListener('click', () => {
            this.playButtonSound();
            this.showScreen('welcome');
        });
        
        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.unlockAudio();
                this.playButtonSound();
                const category = e.currentTarget.dataset.category;
                this.startGame(category);
            });
        });
        
        // Game controls
        document.getElementById('play-audio-btn').addEventListener('click', () => {
            this.playButtonSound();
            this.startSpeechRecognition(); // Listen button should listen to speech
        });
        
        document.getElementById('repeat-btn').addEventListener('click', () => {
            this.playButtonSound();
            this.playCurrentWordAudio(); // Say Again button plays the word
        });
        
        document.getElementById('next-word-btn').addEventListener('click', () => {
            this.playButtonSound();
            this.nextWord();
        });
        
        // Speech controls
        document.getElementById('record-btn').addEventListener('click', () => {
            this.playButtonSound();
            this.playCurrentWordAudio(); // Try Saying It button now plays the word for practice
        });
        
        document.getElementById('good-job-btn').addEventListener('click', () => {
            this.playButtonSound();
            this.handleCorrectPronunciation();
        });
        
        // Success screen controls
        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.playButtonSound();
            this.startGame(this.currentCategory);
        });
        
        document.getElementById('choose-category-btn').addEventListener('click', () => {
            this.playButtonSound();
            this.showScreen('category');
        });
        
        // Settings controls
        document.getElementById('volume-slider').addEventListener('input', (e) => {
            this.settings.volume = e.target.value / 100;
            this.saveSettings();
        });
        
        document.getElementById('speech-toggle').addEventListener('click', (e) => {
            this.playButtonSound();
            this.settings.speechRecognition = !this.settings.speechRecognition;
            e.target.classList.toggle('active', this.settings.speechRecognition);
            e.target.textContent = this.settings.speechRecognition ? 'ON' : 'OFF';
            this.saveSettings();
            this.updateSpeechUI();
        });
        
        // Microphone permission button
        document.getElementById('mic-permission-btn').addEventListener('click', () => {
            this.playButtonSound();
            this.requestMicrophonePermission();
        });
        
        document.getElementById('reset-progress-btn').addEventListener('click', () => {
            this.playButtonSound();
            if (confirm('Are you sure you want to reset all progress?')) {
                this.resetProgress();
            }
        });
        
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
    
    showScreen(screenName) {
        console.log(`📱 Switching to screen: ${screenName}`);
        
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        document.getElementById(`${screenName}-screen`).classList.add('active');
        this.currentScreen = screenName;
        
        // Screen-specific actions
        if (screenName === 'game') {
            this.displayCurrentWord();
        }
    }
    
    startGame(category) {
        console.log(`🎮 Starting game with category: ${category}`);
        this.currentCategory = category;
        this.currentWordIndex = 0;
        this.score = 0;
        
        // Get random words from category
        const allWords = this.getWordData()[category];
        this.currentWords = this.shuffleArray([...allWords]).slice(0, this.totalWords);
        
        this.showScreen('game');
        this.updateGameProgress();
    }
    
    displayCurrentWord() {
        if (this.currentWordIndex >= this.currentWords.length) {
            this.showSuccessScreen();
            return;
        }
        
        const word = this.currentWords[this.currentWordIndex];
        
        // Update UI elements
        document.getElementById('word-text').textContent = word.word;
        document.getElementById('phonetic-hint').textContent = word.phonetic;
        
        // Get the image container directly (more reliable)
        const imgContainer = document.querySelector('.word-image-container');
        
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
            const emojiDiv = document.createElement('div');
            emojiDiv.className = 'emoji-fallback';
            emojiDiv.style.cssText = 'font-size: 4rem; display: flex; align-items: center; justify-content: center; height: 100%; background: white; border-radius: 20px;';
            emojiDiv.textContent = this.getEmojiForWord(word.word);
            imgContainer.appendChild(emojiDiv);
        };
        
        // Add the image to container
        imgContainer.appendChild(newImg);
        
        // Preload audio with error handling
        const audio = document.getElementById('word-audio');
        audio.src = word.audio;
        audio.onerror = () => {
            console.warn(`🎵 Audio file not found: ${word.audio}`);
        };
        audio.oncanplaythrough = () => {
            console.log(`🎵 Audio loaded: ${word.audio}`);
        };
        
        // Reset next button
        document.getElementById('next-word-btn').disabled = true;
        
        // Auto-play audio after a short delay
        setTimeout(() => {
            this.playCurrentWordAudio();
        }, 500);
        
        console.log(`🔤 Displaying word: ${word.word}`);
    }
    
    async playCurrentWordAudio() {
        const audio = document.getElementById('word-audio');
        try {
            audio.volume = this.settings.volume;
            await audio.play();
            console.log('🎵 Playing word audio');
        } catch (error) {
            console.warn('🎵 Audio play failed:', error);
            // Fallback: show visual feedback and create synthetic speech if available
            this.showAudioFallback();
            this.trySpeechSynthesis();
        }
    }
    
    trySpeechSynthesis() {
        if ('speechSynthesis' in window) {
            const currentWord = this.currentWords[this.currentWordIndex].word;
            const utterance = new SpeechSynthesisUtterance(currentWord);
            utterance.rate = 0.8;
            utterance.pitch = 1.2;
            utterance.volume = this.settings.volume;
            utterance.lang = 'en-GB'; // British English
            
            // Set the preferred voice if available
            if (this.preferredVoice) {
                utterance.voice = this.preferredVoice;
            }
            
            try {
                speechSynthesis.speak(utterance);
                console.log(`🗣️ Using ${this.preferredVoice?.name || 'default'} voice for pronunciation`);
            } catch (error) {
                console.warn('🗣️ Speech synthesis failed:', error);
            }
        }
    }
    
    showAudioFallback() {
        const wordText = document.getElementById('word-text');
        const originalColor = wordText.style.color;
        
        // Visual pronunciation animation
        wordText.style.animation = 'none';
        wordText.offsetHeight; // Trigger reflow
        wordText.style.animation = 'pronounceWord 1s ease';
        
        // Show pronunciation hint
        const phoneticHint = document.getElementById('phonetic-hint');
        phoneticHint.style.animation = 'none';
        phoneticHint.offsetHeight; // Trigger reflow
        phoneticHint.style.animation = 'highlightPhonetic 1s ease';
        
        setTimeout(() => {
            wordText.style.animation = '';
            phoneticHint.style.animation = '';
        }, 1000);
    }
    
    playButtonSound() {
        if ('speechSynthesis' in window) {
            // Use a very short beep sound with speech synthesis
            const utterance = new SpeechSynthesisUtterance('');
            utterance.volume = this.settings.volume * 0.1;
            utterance.rate = 10;
            try {
                speechSynthesis.speak(utterance);
            } catch (error) {
                // Silent fail for button sounds
            }
        }
        
        // Visual feedback for button press
        const buttons = document.querySelectorAll('button:active');
        buttons.forEach(btn => {
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 100);
        });
    }
    
    playSuccessSound() {
        if ('speechSynthesis' in window) {
            // Use speech synthesis for success sound
            const utterance = new SpeechSynthesisUtterance('Brilliant!');
            utterance.volume = this.settings.volume * 0.7;
            utterance.rate = 1.2;
            utterance.pitch = 1.3;
            utterance.lang = 'en-GB'; // British English
            
            // Use preferred voice if available
            if (this.preferredVoice) {
                utterance.voice = this.preferredVoice;
            }
            
            try {
                speechSynthesis.speak(utterance);
            } catch (error) {
                console.warn('🎵 Success speech failed:', error);
            }
        }
    }
    
    startSpeechRecognition() {
        console.log('🎤 startSpeechRecognition called');
        console.log('  - speechSupported:', this.speechSupported);
        console.log('  - settings.speechRecognition:', this.settings.speechRecognition);
        console.log('  - speechRecognition object:', this.speechRecognition);
        
        if (!this.speechSupported || !this.settings.speechRecognition) {
            console.warn('🎤 Speech recognition not available');
            if (!this.speechSupported) {
                console.warn('  - Reason: Browser does not support speech recognition');
            }
            if (!this.settings.speechRecognition) {
                console.warn('  - Reason: Speech recognition disabled in settings');
            }
            this.showMessage('Speech recognition not available. Use the "👍 I Said It!" button instead.', 'info');
            return;
        }
        
        // Check if already listening
        if (this.speechRecognitionActive) {
            console.log('🎤 Speech recognition already active, stopping first');
            this.speechRecognition.stop();
            return;
        }
        
        try {
            // Ensure clean state before starting
            this.speechRecognitionActive = false;
            
            // Start recognition
            console.log('🎤 Starting speech recognition...');
            this.speechRecognition.start();
            
            // Visual feedback
            const recordBtn = document.getElementById('play-audio-btn');
            recordBtn.innerHTML = '<span>🎤 Listening...</span>';
            recordBtn.style.background = 'linear-gradient(45deg, #FF5722, #FF9800)';
            recordBtn.disabled = true;
            
            // Show listening indicator
            this.showMessage('🎤 Say the word clearly!', 'listening');
            
            // Auto-timeout after 8 seconds (longer for mobile)
            this.speechTimeout = setTimeout(() => {
                if (this.speechRecognitionActive) {
                    console.log('🎤 Speech recognition timeout');
                    this.speechRecognition.stop();
                    this.showMessage('No speech detected. Try the microphone button again!', 'info');
                }
            }, 8000);
            
        } catch (error) {
            console.error('🎤 Speech recognition start failed:', error);
            this.handleSpeechError('not-allowed');
        }
    }
    
    handleSpeechResult(result, confidence = 0) {
        const currentWord = this.currentWords[this.currentWordIndex].word.toLowerCase();
        console.log(`🎤 Speech result: "${result}" vs expected: "${currentWord}" (confidence: ${confidence})`);
        
        // Clear timeout
        if (this.speechTimeout) {
            clearTimeout(this.speechTimeout);
        }
        
        // Remove listening message
        const listeningMessage = document.querySelector('.game-message');
        if (listeningMessage) {
            listeningMessage.remove();
        }
        
        this.resetListenButton();
        
        // Enhanced matching with multiple strategies
        const similarity = this.calculateSimilarity(result, currentWord);
        const containsWord = result.includes(currentWord);
        const soundsLike = this.phoneticMatch(result, currentWord);
        
        // More lenient matching for children
        const isMatch = containsWord || 
                       similarity > 0.5 || 
                       soundsLike ||
                       (confidence > 0.7 && similarity > 0.4);
        
        console.log(`🎤 Analysis: similarity=${similarity}, contains=${containsWord}, soundsLike=${soundsLike}, confidence=${confidence}`);
        
        if (isMatch) {
            console.log('🎉 Speech recognition SUCCESS!');
            this.showMessage(`Excellent! You said "${result}"`, 'success');
            this.handleCorrectPronunciation();
        } else {
            console.log('🔄 Speech recognition - try again');
            this.showMessage(`I heard "${result}". Try saying "${currentWord}" again!`, 'info');
            this.showEncouragement();
        }
    }
    
    // Simple phonetic matching for common mispronunciations
    phoneticMatch(spoken, target) {
        const phoneticMap = {
            'c': 'k', 'ph': 'f', 'gh': 'f', 'ck': 'k',
            'qu': 'kw', 'x': 'ks', 'th': 't'
        };
        
        let phoneticSpoken = spoken.toLowerCase();
        let phoneticTarget = target.toLowerCase();
        
        Object.keys(phoneticMap).forEach(key => {
            const value = phoneticMap[key];
            phoneticSpoken = phoneticSpoken.replace(new RegExp(key, 'g'), value);
            phoneticTarget = phoneticTarget.replace(new RegExp(key, 'g'), value);
        });
        
        return this.calculateSimilarity(phoneticSpoken, phoneticTarget) > 0.6;
    }
    
    handleSpeechError(errorType = 'unknown') {
        console.warn('🎤 Speech recognition error:', errorType);
        
        // Clear timeout
        if (this.speechTimeout) {
            clearTimeout(this.speechTimeout);
        }
        
        // Remove listening message
        const listeningMessage = document.querySelector('.game-message');
        if (listeningMessage) {
            listeningMessage.remove();
        }
        
        this.resetListenButton();
        
        // For language-not-supported, just disable speech recognition gracefully
        if (errorType === 'language-not-supported') {
            console.warn('� Speech recognition language not supported on this device');
            this.speechSupported = false;
            this.updateSpeechUI();
            this.showMessage('🎤 Speech recognition not available on this device. Use "👍 I Said It!" to continue playing!', 'info');
            return;
        }
        
        // Provide specific feedback based on error type
        let message = '';
        let suggestion = '';
        
        switch (errorType) {
            case 'not-allowed':
            case 'permission-denied':
                message = '🚫 Microphone access denied';
                suggestion = 'Click the microphone button above to grant permission, then try again.';
                break;
            case 'no-speech':
                message = '🔇 No speech detected';
                suggestion = 'Make sure you\'re speaking clearly into the microphone.';
                break;
            case 'network':
                message = '📶 Network issue';
                suggestion = 'Check your internet connection and try again.';
                break;
            case 'audio-capture':
                message = '🎤 Microphone not working';
                suggestion = 'Check if another app is using your microphone.';
                break;
            case 'aborted':
                message = '⏹️ Speech recognition stopped';
                suggestion = 'You can try the microphone button again.';
                break;
            default:
                message = '⚠️ Speech recognition had an issue';
                suggestion = 'Try again or use the "👍 I Said It!" button.';
        }
        
        this.showMessage(`${message}. ${suggestion}`, 'error');
        
        // Suggest alternative after multiple errors
        if (!this.speechErrorCount) this.speechErrorCount = 0;
        this.speechErrorCount++;
        
        if (this.speechErrorCount >= 3) {
            setTimeout(() => {
                this.showMessage('💡 Tip: You can also use "👍 I Said It!" if the microphone keeps having trouble!', 'info');
                this.speechErrorCount = 0; // Reset counter
            }, 2000);
        }
    }
    
    resetRecordButton() {
        const recordBtn = document.getElementById('record-btn');
        recordBtn.innerHTML = '<span>🔄 Practice Word</span>';
        recordBtn.style.background = 'linear-gradient(45deg, #9C27B0, #E91E63)';
        recordBtn.disabled = false;
    }
    
    resetListenButton() {
        const listenBtn = document.getElementById('play-audio-btn');
        if (listenBtn) {
            listenBtn.innerHTML = '<span>🎤 Listen to Me</span>';
            listenBtn.style.background = 'linear-gradient(45deg, #4ECDC4, #44A08D)';
            listenBtn.disabled = false;
        }
        
        // Clear any pending timeouts
        if (this.speechTimeout) {
            clearTimeout(this.speechTimeout);
            this.speechTimeout = null;
        }
        
        // Reset active state
        this.speechRecognitionActive = false;
    }

    handleCorrectPronunciation() {
        this.score++;
        this.playSuccessSound();
        
        // Visual celebration
        this.showCelebration();
        
        // Enable next button
        document.getElementById('next-word-btn').disabled = false;
        
        // Update progress
        this.updateGameProgress();
        
        // Save progress
        if (!this.progress[this.currentCategory].includes(this.currentWords[this.currentWordIndex].word)) {
            this.progress[this.currentCategory].push(this.currentWords[this.currentWordIndex].word);
            this.saveProgress();
            this.updateProgressIndicators();
        }
        
        console.log(`✅ Correct pronunciation! Score: ${this.score}/${this.totalWords}`);
        
        // Auto-advance to next word after celebration (more kid-friendly)
        setTimeout(() => {
            this.nextWord();
        }, 2000);
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
            document.body.removeChild(celebration);
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
            document.body.removeChild(encouragement);
        }, 2000);
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
    
    updateGameProgress() {
        const progress = (this.currentWordIndex / this.totalWords) * 100;
        document.getElementById('game-progress').style.width = `${progress}%`;
        document.getElementById('current-score').textContent = `⭐ ${this.score}/${this.totalWords}`;
    }
    
    showSuccessScreen() {
        const stars = Math.min(5, Math.max(1, this.score));
        const starText = '⭐'.repeat(stars);
        
        document.getElementById('success-message').textContent = `You completed ${this.score} out of ${this.totalWords} words!`;
        document.getElementById('stars-earned').textContent = starText;
        
        this.showScreen('success');
        this.playSuccessSound();
        
        console.log(`🏆 Game completed! Score: ${this.score}/${this.totalWords}`);
    }
    
    updateProgressIndicators() {
        Object.keys(this.progress).forEach(category => {
            const indicator = document.getElementById(`${category}-progress`);
            if (indicator) {
                const totalWords = this.getWordData()[category].length;
                const completedWords = this.progress[category].length;
                const percentage = (completedWords / totalWords) * 100;
                indicator.style.setProperty('--progress', `${percentage}%`);
            }
        });
    }
    
    updateSpeechUI() {
        const speechControls = document.getElementById('speech-controls');
        const recordBtn = document.getElementById('record-btn');
        const goodJobBtn = document.getElementById('good-job-btn');
        
        if (this.speechSupported && this.settings.speechRecognition) {
            speechControls.style.display = 'flex';
            recordBtn.style.display = 'block';
            goodJobBtn.style.display = 'block';
        } else {
            recordBtn.style.display = 'none';
            goodJobBtn.style.display = 'block';
        }
    }
    
    showMessage(message, type = 'info') {
        // Remove any existing message
        const existingMessage = document.querySelector('.game-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
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
        `;
        
        document.body.appendChild(messageDiv);
        
        // Auto-remove after 3 seconds (except for listening messages)
        if (type !== 'listening') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 3000);
        }
    }

    // Utility functions
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    calculateSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        const editDistance = this.levenshteinDistance(longer, shorter);
        return (longer.length - editDistance) / longer.length;
    }
    
    levenshteinDistance(str1, str2) {
        const matrix = [];
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[str2.length][str1.length];
    }
    
    getEmojiForWord(word) {
        const emojiMap = {
            // Animals
            cat: '🐱', dog: '🐶', bird: '🐦', fish: '🐟', cow: '🐄',
            duck: '🦆', pig: '🐷', sheep: '🐑', elephant: '🐘', lion: '🦁',
            tiger: '🐅', bear: '🐻', monkey: '🐵', rabbit: '🐰', horse: '🐴',
            zebra: '🦓', giraffe: '🦒', penguin: '🐧', frog: '🐸', turtle: '🐢',
            // Alphabets
            A: '🅰️', B: '🅱️', C: '🇨', D: '🇩', E: '🇪', F: '🇫', G: '🇬', H: '🇭',
            I: '🇮', J: '🇯', K: '🇰', L: '🇱', M: '🇲', N: '🇳', O: '🅾️', P: '🅿️',
            Q: '🇶', R: '🇷', S: '🇸', T: '🇹', U: '🇺', V: '🇻', W: '🇼', X: '❌',
            Y: '🇾', Z: '🇿',
            // Days of the week
            Monday: '📅', Tuesday: '📅', Wednesday: '📅', Thursday: '📅',
            Friday: '🎉', Saturday: '🎊', Sunday: '☀️',
            // Months of the year
            January: '❄️', February: '💝', March: '🌱', April: '🌷',
            May: '🌸', June: '☀️', July: '🏖️', August: '🌞',
            September: '🍂', October: '🎃', November: '🦃', December: '🎄',
            // Colors
            red: '🔴', blue: '🔵', green: '🟢', yellow: '🟡',
            pink: '🩷', orange: '🟠', purple: '🟣', black: '⚫',
            // Numbers
            one: '1️⃣', two: '2️⃣', three: '3️⃣', four: '4️⃣', five: '5️⃣',
            six: '6️⃣', seven: '7️⃣', eight: '8️⃣',
            // Shapes
            circle: '⭕', square: '⬜', triangle: '🔺', star: '⭐',
            heart: '❤️', diamond: '💎', oval: '⭕', rectangle: '⬜'
        };
        return emojiMap[word.toLowerCase()] || emojiMap[word.toUpperCase()] || emojiMap[word] || '❓';
    }
    
    // Local storage functions
    saveProgress() {
        localStorage.setItem('wordbuddy-progress', JSON.stringify(this.progress));
        console.log('💾 Progress saved');
    }
    
    loadProgress() {
        const saved = localStorage.getItem('wordbuddy-progress');
        if (saved) {
            this.progress = JSON.parse(saved);
            console.log('💾 Progress loaded');
        }
    }
    
    saveSettings() {
        localStorage.setItem('wordbuddy-settings', JSON.stringify(this.settings));
        console.log('⚙️ Settings saved');
    }
    
    loadSettings() {
        const saved = localStorage.getItem('wordbuddy-settings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
            
            // Apply settings to UI after DOM is ready
            setTimeout(() => {
                const volumeSlider = document.getElementById('volume-slider');
                const speechToggle = document.getElementById('speech-toggle');
                
                if (volumeSlider) {
                    volumeSlider.value = this.settings.volume * 100;
                }
                
                if (speechToggle) {
                    speechToggle.classList.toggle('active', this.settings.speechRecognition);
                    speechToggle.textContent = this.settings.speechRecognition ? 'ON' : 'OFF';
                }
            }, 100);
            
            console.log('⚙️ Settings loaded');
        }
    }
    
    resetProgress() {
        this.progress = {
            animals: [],
            alphabets: [],
            days: [],
            months: [],
            colors: [],
            numbers: [],
            shapes: []
        };
        this.saveProgress();
        this.updateProgressIndicators();
        console.log('🔄 Progress reset');
    }
}

// Add celebration animation CSS
const celebrationCSS = `
@keyframes celebrationPop {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
}

@keyframes encouragementFade {
    0% { transform: translate(-50%, -50%) translateY(-20px); opacity: 0; }
    20% { transform: translate(-50%, -50%) translateY(0); opacity: 1; }
    80% { transform: translate(-50%, -50%) translateY(0); opacity: 1; }
    100% { transform: translate(-50%, -50%) translateY(-20px); opacity: 0; }
}

@keyframes messageSlideIn {
    0% { transform: translate(-50%, -60%); opacity: 0; }
    100% { transform: translate(-50%, -50%); opacity: 1; }
}

@keyframes pronounceWord {
    0% { transform: scale(1); color: inherit; }
    50% { transform: scale(1.1); color: #4CAF50; }
    100% { transform: scale(1); color: inherit; }
}

@keyframes highlightPhonetic {
    0% { transform: scale(1); background-color: transparent; }
    50% { transform: scale(1.05); background-color: rgba(255, 193, 7, 0.3); }
    100% { transform: scale(1); background-color: transparent; }
}

@keyframes slideInDown {
    0% { transform: translateX(-50%) translateY(-100%); opacity: 0; }
    100% { transform: translateX(-50%) translateY(0); opacity: 1; }
}

@keyframes slideOutUp {
    0% { transform: translateX(-50%) translateY(0); opacity: 1; }
    100% { transform: translateX(-50%) translateY(-100%); opacity: 0; }
}
`;

// Inject animation CSS
const style = document.createElement('style');
style.textContent = celebrationCSS;
document.head.appendChild(style);

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 WordBuddy: DOM loaded, starting game...');
    window.wordBuddyGame = new WordBuddyGame();
    
    // Make debug function available globally
    window.wordBuddyGame.makeDebugAvailable();
    
    // Optional: run debug immediately to help troubleshooting
    // Uncomment the next line if you want automatic debug on load
    setTimeout(() => window.wordBuddyGame.debugSpeechRecognition(), 2000);
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
    }
});

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('🔧 Service Worker registered successfully');
            })
            .catch(error => {
                console.log('🔧 Service Worker registration failed');
            });
    });
}
