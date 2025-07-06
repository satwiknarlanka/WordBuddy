/**
 * WordBuddy Storage Manager
 * Handles all local storage operations
 */

export class StorageManager {
    static KEYS = {
        PROGRESS: 'wordbuddy-progress',
        SETTINGS: 'wordbuddy-settings'
    };

    static DEFAULT_PROGRESS = {
        animals: [],
        alphabets: [],
        days: [],
        months: [],
        colors: [],
        numbers: [],
        shapes: [],
        mixed: []
    };

    static DEFAULT_SETTINGS = {
        volume: 0.8,
        speechRecognition: true
    };

    static saveProgress(progress) {
        try {
            localStorage.setItem(this.KEYS.PROGRESS, JSON.stringify(progress));
            console.log('💾 Progress saved');
            return true;
        } catch (error) {
            console.error('💾 Failed to save progress:', error);
            return false;
        }
    }

    static loadProgress() {
        try {
            const saved = localStorage.getItem(this.KEYS.PROGRESS);
            if (saved) {
                const progress = JSON.parse(saved);
                console.log('💾 Progress loaded');
                return { ...this.DEFAULT_PROGRESS, ...progress };
            }
        } catch (error) {
            console.error('💾 Failed to load progress:', error);
        }
        return this.DEFAULT_PROGRESS;
    }

    static saveSettings(settings) {
        try {
            localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
            console.log('⚙️ Settings saved');
            return true;
        } catch (error) {
            console.error('⚙️ Failed to save settings:', error);
            return false;
        }
    }

    static loadSettings() {
        try {
            const saved = localStorage.getItem(this.KEYS.SETTINGS);
            if (saved) {
                const settings = JSON.parse(saved);
                console.log('⚙️ Settings loaded');
                return { ...this.DEFAULT_SETTINGS, ...settings };
            }
        } catch (error) {
            console.error('⚙️ Failed to load settings:', error);
        }
        return this.DEFAULT_SETTINGS;
    }

    static resetProgress() {
        try {
            localStorage.removeItem(this.KEYS.PROGRESS);
            console.log('🔄 Progress reset');
            return true;
        } catch (error) {
            console.error('🔄 Failed to reset progress:', error);
            return false;
        }
    }

    static clearAll() {
        try {
            localStorage.removeItem(this.KEYS.PROGRESS);
            localStorage.removeItem(this.KEYS.SETTINGS);
            console.log('🔄 All data cleared');
            return true;
        } catch (error) {
            console.error('🔄 Failed to clear data:', error);
            return false;
        }
    }
}
