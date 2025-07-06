/**
 * WordBuddy Speech Recognition Manager
 * Handles speech recognition functionality and microphone permissions
 */

export class SpeechRecognitionManager {
    constructor() {
        this.speechRecognition = null;
        this.speechSupported = false;
        this.speechRecognitionActive = false;
        this.speechTimeout = null;
        this.speechErrorCount = 0;
        this.enabled = true;
        
        this.initialize();
    }

    initialize() {
        console.log('🎤 Initializing speech recognition...');
        
        // Detect browser type with more specific Edge detection
        const userAgent = navigator.userAgent.toLowerCase();
        const isChrome = userAgent.includes('chrome') && !userAgent.includes('edg');
        const isEdgeChromium = userAgent.includes('edg/'); // New Chromium-based Edge
        const isEdgeLegacy = userAgent.includes('edge/'); // Old Edge
        const isEdge = isEdgeChromium || isEdgeLegacy;
        const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');
        const isFirefox = userAgent.includes('firefox');
        const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
        
        console.log('🎤 Browser detection:');
        console.log('  - Chrome:', isChrome);
        console.log('  - Edge (Chromium):', isEdgeChromium);
        console.log('  - Edge (Legacy):', isEdgeLegacy);
        console.log('  - Safari:', isSafari);
        console.log('  - Firefox:', isFirefox);
        console.log('  - Mobile:', isMobile);
        console.log('  - User Agent:', navigator.userAgent);
        console.log('  - Protocol:', window.location.protocol);
        console.log('  - Is secure context:', window.isSecureContext);
        
        // Edge-specific blocking - Edge has known issues with Web Speech API
        if (isEdge) {
            console.warn('🎤 Edge detected: Disabling speech recognition due to known compatibility issues');
            console.warn('  - Edge (both Legacy and Chromium) has unreliable Web Speech API support');
            console.warn('  - Speech recognition may fail silently or not work at all');
            console.warn('  - Recommend using Chrome for speech recognition features');
            this.speechSupported = false;
            this.showBrowserSpecificMessage(isChrome, isEdge, isSafari, isFirefox);
            return;
        }
        
        // Check browser support with more specific detection
        const hasWebkitSpeechRecognition = 'webkitSpeechRecognition' in window;
        const hasSpeechRecognition = 'SpeechRecognition' in window;
        
        console.log('🎤 API availability:');
        console.log('  - webkitSpeechRecognition:', hasWebkitSpeechRecognition);
        console.log('  - SpeechRecognition:', hasSpeechRecognition);
        
        // Browser-specific warnings
        if (isSafari) {
            console.warn('🎤 Safari: Speech recognition has limited support');
            console.warn('  - May not work in private browsing mode');
            console.warn('  - Requires user gesture to activate');
            console.warn('  - May have permission issues');
        }
        
        if (isEdge) {
            console.warn('🎤 Edge: Speech recognition support varies by version');
            console.warn('  - Older Edge versions may not support Web Speech API');
            console.warn('  - Try Chrome for better compatibility');
        }
        
        if (isFirefox) {
            console.warn('🎤 Firefox: Limited speech recognition support');
            console.warn('  - Web Speech API not fully supported in Firefox');
        }
        
        // Protocol check
        if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
            console.error('🎤 HTTPS required: Speech recognition requires HTTPS in production');
            this.speechSupported = false;
            return;
        }
        
        if (hasWebkitSpeechRecognition || hasSpeechRecognition) {
            try {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                console.log('🎤 SpeechRecognition class found:', SpeechRecognition);
                
                this.speechRecognition = new SpeechRecognition();
                this.setupSpeechRecognition();
                this.speechSupported = true;
                console.log('🎤 Speech recognition initialized successfully');
                
                // Test if it actually works (Safari sometimes lies about support)
                this.testSpeechRecognition();
                
            } catch (error) {
                console.error('🎤 Failed to create speech recognition:', error);
                this.speechSupported = false;
                this.showBrowserSpecificMessage(isChrome, isEdge, isSafari, isFirefox);
            }
        } else {
            console.warn('🎤 Speech recognition not supported');
            this.speechSupported = false;
            this.showBrowserSpecificMessage(isChrome, isEdge, isSafari, isFirefox);
        }
        
        // Log final state
        console.log('🎤 Final speech recognition state:');
        console.log('  - speechSupported:', this.speechSupported);
        console.log('  - enabled:', this.enabled);
        console.log('  - Will be available:', this.isAvailable());
    }

    setupSpeechRecognition() {
        if (!this.speechRecognition) return;

        this.speechRecognition.continuous = false;
        this.speechRecognition.interimResults = false;
        this.speechRecognition.maxAlternatives = 3;
        
        // Try to set language
        try {
            this.speechRecognition.lang = 'en-US'; // Most widely supported
            console.log('🎤 Language set to en-US');
        } catch (error) {
            console.warn('Could not set language, using default:', error);
        }
        
        // Event handlers
        this.speechRecognition.onstart = () => {
            console.log('🎤 Speech recognition started');
            this.speechRecognitionActive = true;
            
            if (this.onListeningStart) {
                this.onListeningStart();
            }
        };
        
        this.speechRecognition.onend = () => {
            console.log('🎤 Speech recognition ended');
            this.speechRecognitionActive = false;
            
            if (this.onListeningEnd) {
                this.onListeningEnd();
            }
        };
        
        this.speechRecognition.onresult = (event) => {
            const result = event.results[0][0].transcript.toLowerCase().trim();
            const confidence = event.results[0][0].confidence;
            console.log(`🎤 Speech result: "${result}" (confidence: ${confidence})`);
            
            if (this.onResult) {
                this.onResult(result, confidence);
            }
        };
        
        this.speechRecognition.onerror = (event) => {
            console.warn('🎤 Speech recognition error:', event.error, event);
            
            if (this.onError) {
                this.onError(event.error);
            }
        };
    }

    isAvailable() {
        return this.speechSupported && this.enabled;
    }

    setEnabled(enabled) {
        this.enabled = enabled;
        console.log('🎤 Speech recognition enabled:', enabled);
    }

    start() {
        if (!this.isAvailable()) {
            console.warn('🎤 Speech recognition not available');
            return false;
        }
        
        // Check if already listening
        if (this.speechRecognitionActive) {
            console.log('🎤 Speech recognition already active, stopping first');
            this.stop();
            return false;
        }
        
        try {
            // Ensure clean state before starting
            this.speechRecognitionActive = false;
            
            // Start recognition
            console.log('🎤 Starting speech recognition...');
            this.speechRecognition.start();
            
            // Auto-timeout after 8 seconds (longer for mobile)
            this.speechTimeout = setTimeout(() => {
                if (this.speechRecognitionActive) {
                    console.log('🎤 Speech recognition timeout');
                    this.stop();
                    if (this.onTimeout) {
                        this.onTimeout();
                    }
                }
            }, 8000);
            
            return true;
            
        } catch (error) {
            console.error('🎤 Speech recognition start failed:', error);
            if (this.onError) {
                this.onError('not-allowed');
            }
            return false;
        }
    }

    stop() {
        if (this.speechRecognition && this.speechRecognitionActive) {
            this.speechRecognition.stop();
        }
        
        // Clear timeout
        if (this.speechTimeout) {
            clearTimeout(this.speechTimeout);
            this.speechTimeout = null;
        }
        
        this.speechRecognitionActive = false;
    }

    async requestMicrophonePermission() {
        try {
            console.log('🎤 Requesting microphone permission...');
            
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
            this.speechErrorCount = 0;
            return true;
            
        } catch (error) {
            console.warn('🎤 Microphone permission denied:', error);
            return false;
        }
    }

    async checkMicrophonePermission() {
        try {
            if ('permissions' in navigator) {
                const permission = await navigator.permissions.query({ name: 'microphone' });
                return permission.state;
            }
        } catch (error) {
            console.warn('🎤 Could not check microphone permission:', error);
        }
        return 'unknown';
    }

    testSpeechRecognition() {
        // Test if speech recognition actually works (Safari sometimes reports support but fails)
        if (!this.speechRecognition) return;
        
        try {
            // Try to access properties to see if it really works
            const testLang = this.speechRecognition.lang;
            const testContinuous = this.speechRecognition.continuous;
            console.log('🎤 Speech recognition test passed');
        } catch (error) {
            console.warn('🎤 Speech recognition test failed:', error);
            this.speechSupported = false;
        }
    }

    showBrowserSpecificMessage(isChrome, isEdge, isSafari, isFirefox) {
        console.warn('🎤 Browser-specific guidance:');
        
        if (isSafari) {
            console.warn('  Safari: Try using Chrome for better speech recognition support');
            console.warn('  - Speech recognition may not work in private browsing');
            console.warn('  - Make sure microphone permissions are allowed');
        } else if (isEdge) {
            console.warn('  Edge: Try using Chrome for better speech recognition support');
            console.warn('  - Older Edge versions have limited Web Speech API support');
        } else if (isFirefox) {
            console.warn('  Firefox: Speech recognition not supported');
            console.warn('  - Firefox doesn\'t support Web Speech API');
            console.warn('  - Try using Chrome instead');
        } else {
            console.warn('  Unknown browser: Try using Chrome for best compatibility');
        }
    }

    // Utility methods for speech analysis
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
                        Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
                    );
                }
            }
        }
        return matrix[str2.length][str1.length];
    }
    
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

    analyzeMatch(spoken, target, confidence = 0) {
        const similarity = this.calculateSimilarity(spoken, target);
        const containsWord = spoken.includes(target);
        const soundsLike = this.phoneticMatch(spoken, target);
        
        // More lenient matching for children
        const isMatch = containsWord || 
                       similarity > 0.5 || 
                       soundsLike ||
                       (confidence > 0.7 && similarity > 0.4);
        
        return {
            isMatch,
            similarity,
            containsWord,
            soundsLike,
            confidence
        };
    }

    // Debug function for troubleshooting
    generateDebugReport() {
        console.log('=== SPEECH RECOGNITION DEBUG REPORT ===');
        
        console.log('\n1. BROWSER DETECTION:');
        console.log('  User Agent:', navigator.userAgent);
        console.log('  Language:', navigator.language);
        console.log('  Languages:', navigator.languages);
        
        console.log('\n2. API AVAILABILITY:');
        console.log('  window.SpeechRecognition:', 'SpeechRecognition' in window);
        console.log('  window.webkitSpeechRecognition:', 'webkitSpeechRecognition' in window);
        console.log('  navigator.mediaDevices:', 'mediaDevices' in navigator);
        console.log('  navigator.mediaDevices.getUserMedia:', 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices);
        
        console.log('\n3. SECURITY CONTEXT:');
        console.log('  Protocol:', window.location.protocol);
        console.log('  Is HTTPS:', window.location.protocol === 'https:');
        console.log('  Is localhost:', window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        console.log('  Is secure context:', window.isSecureContext);
        
        console.log('\n4. SPEECH RECOGNITION STATE:');
        console.log('  speechSupported:', this.speechSupported);
        console.log('  enabled:', this.enabled);
        console.log('  speechRecognitionActive:', this.speechRecognitionActive);
        console.log('  speechRecognition object:', this.speechRecognition);
        
        console.log('\n=== END DEBUG REPORT ===');
        
        return {
            supported: this.speechSupported,
            enabled: this.enabled,
            active: this.speechRecognitionActive,
            browser: navigator.userAgent,
            protocol: window.location.protocol,
            isSecure: window.isSecureContext
        };
    }
}
