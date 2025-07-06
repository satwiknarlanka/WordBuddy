# WordBuddy - Pronunciation Learning Game 🎯

A mobile-friendly, offline-capable pronunciation learning game designed for 4-year-olds. Features British English pronunciation, speech recognition, and multiple learning categories.

## 🎮 Game Features

- **7 Learning Categories**: Animals, Colors, Numbers, Shapes, Alphabets, Days, Months
- **British English Pronunciation** with speech synthesis
- **Speech Recognition** for interactive learning
- **Mobile-Optimized** design (perfect for iPhone 8+)
- **Offline Support** via service worker
- **Progress Tracking** with localStorage
- **Emoji Fallbacks** for missing images
- **PWA-Ready** with app icons and manifest

## 🚀 Quick Start

### Development

To run the game locally for development:

```bash
./dev-server.sh
```

Or with a custom port:

```bash
./dev-server.sh 3000
```

Then open http://localhost:8000 (or your custom port) in your browser.

### Publishing to GitHub Pages

To build and deploy the game to GitHub Pages:

```bash
./publish.sh
```

Or with a custom commit message:

```bash
./publish.sh "Add new feature: speech recognition improvements"
```

## 📁 Project Structure

```
WordBuddy/
├── index.html              # Main game HTML
├── style.css               # Game styles
├── script.js               # Game logic and functionality
├── sw.js                   # Service worker for offline support
├── manifest.json           # PWA manifest
├── assets/                 # Game assets
│   ├── images/            # Image assets (with fallbacks)
│   └── audio/             # Audio assets (with fallbacks)
├── build/                 # Production build files
├── repo/WordBuddy/        # Git repository for GitHub Pages
├── publish.sh             # Publish script
├── dev-server.sh          # Development server script
└── README.md              # This file
```

## 🛠️ Development Workflow

### 1. Make Changes
Edit the source files in the root directory:
- `index.html` - HTML structure
- `style.css` - Styling and responsive design
- `script.js` - Game logic and functionality
- `sw.js` - Service worker for offline support

### 2. Test Locally
```bash
./dev-server.sh
```

### 3. Publish
```bash
./publish.sh
```

This will:
- Copy files to the `build/` directory
- Sync with the `repo/WordBuddy/` git repository
- Commit changes with a timestamp
- Push to GitHub
- Display the GitHub Pages URL

## 🎯 Game Categories

### Animals
Cat, Dog, Bird, Fish, Cow, Duck, Pig, Sheep, Elephant, Lion, Tiger, Bear, Monkey, Rabbit, Horse, Zebra, Giraffe, Penguin, Frog, Turtle

### Alphabets
All letters A-Z with British pronunciation

### Days of the Week
Monday through Sunday

### Months
January through December

### Colors
Red, Blue, Green, Yellow, Pink, Orange, Purple, Black

### Numbers
One through Eight

### Shapes
Circle, Square, Triangle, Star, Heart, Diamond, Oval, Rectangle

## 🎤 Speech Recognition

The game includes speech recognition features:
- **British English** speech recognition
- **Fallback support** for different language codes
- **Lenient matching** for children's pronunciation
- **Visual feedback** for speech input
- **Manual override** with "I Said It!" button

## 📱 Mobile Features

- **Touch-optimized** interface
- **Responsive design** for various screen sizes
- **Microphone permission** handling
- **Offline capability** via service worker
- **PWA support** for home screen installation

## 🔧 Technical Details

### Browser Compatibility
- Modern browsers with ES6+ support
- Speech Recognition: Chrome, Edge, Safari (limited)
- Speech Synthesis: All modern browsers
- Service Workers: All modern browsers

### Performance
- Lazy loading for images
- Efficient emoji fallbacks
- Minimal JavaScript bundle
- Cached assets for offline use

### Accessibility
- Clear visual feedback
- Large touch targets
- Phonetic pronunciation guides
- Alternative input methods

## 📝 Scripts Reference

### `./publish.sh [commit_message]`
Builds and deploys the game:
- Updates `build/` directory with latest files
- Syncs to `repo/WordBuddy/` git repository
- Commits changes (with optional custom message)
- Pushes to GitHub
- Shows GitHub Pages URL

### `./dev-server.sh [port]`
Starts local development server:
- Default port: 8000
- Binds to localhost only
- Serves static files
- Auto-detects Python version

## 🌐 Deployment

The game is automatically deployed to GitHub Pages when you run `./publish.sh`. The URL format is:
```
https://[username].github.io/[repository-name]
```

Make sure your GitHub repository has Pages enabled and set to deploy from the `main` branch.

## 🤝 Contributing

1. Fork the repository
2. Make your changes in the source files
3. Test locally with `./dev-server.sh`
4. Create a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- Designed for early childhood education
- Optimized for mobile devices
- Built with modern web technologies
- Focused on accessibility and user experience
- **Speech Recognition**: Optional speech recognition to practice pronunciation
- **Offline Support**: Works without internet connection via Service Worker
- **Progress Tracking**: Saves progress locally and shows completion status
- **Visual Feedback**: Celebrations, animations, and encouraging messages

## Quick Start 🚀

1. **Start a local server**:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server -p 8000
   ```

2. **Access from iPhone**:
   - Find your computer's IP address
   - On iPhone, go to `http://YOUR_IP_ADDRESS:8000`
   - Add to home screen for app-like experience

3. **Desktop Testing**:
   - Open `http://localhost:8000` in your browser
   - Use browser dev tools to simulate mobile view

## Project Structure 📁

```
WordBuddy/
├── index.html              # Main HTML structure
├── style.css               # Mobile-responsive CSS
├── script.js               # Game logic and interactions
├── sw.js                   # Service Worker for offline support
├── assets/
│   ├── images/            # Word images (to be added)
│   │   ├── cat.jpg
│   │   ├── dog.jpg
│   │   └── ...
│   └── audio/             # Pronunciation audio files (to be added)
│       ├── cat.mp3
│       ├── dog.mp3
│       ├── success.mp3    # Success sound
│       ├── button.mp3     # Button click sound
│       └── ...
└── README.md              # This file
```

## Adding Content 📝

### Images
Add word images to `assets/images/` directory:
- Format: JPG or WebP recommended
- Size: Minimum 200x200px, square aspect ratio preferred
- Naming: Use exact word names (e.g., `cat.jpg`, `dog.jpg`)

### Audio Files
Add pronunciation audio to `assets/audio/` directory:
- Format: MP3 for broad compatibility
- Quality: Clear, child-friendly voice
- Naming: Use exact word names (e.g., `cat.mp3`, `dog.mp3`)

### Adding New Words
Edit the `getWordData()` method in `script.js`:

```javascript
animals: [
    { 
        word: 'elephant', 
        phonetic: '/ˈɛləfənt/', 
        image: 'assets/images/elephant.jpg', 
        audio: 'assets/audio/elephant.mp3' 
    },
    // ... more words
]
```

## Technical Requirements 📱

- **Target Device**: iPhone 8 (375x667px)
- **Touch Targets**: Minimum 44px as per Apple guidelines
- **Audio Format**: MP3 for iOS Safari compatibility
- **Image Format**: JPG with WebP support
- **No External Dependencies**: Pure HTML/CSS/JavaScript
- **Offline Capable**: Service Worker for offline functionality

## Features in Detail 🔍

### Game Flow
1. **Welcome Screen**: Large start button and settings access
2. **Category Selection**: Choose from Animals, Colors, Numbers, Shapes
3. **Game Screen**: Word display with image, audio, and pronunciation practice
4. **Success Screen**: Celebration and progress summary

### Audio System
- Automatic pronunciation playback
- Manual repeat functionality
- Volume controls in settings
- iOS Safari audio unlock handling

### Speech Recognition (Optional)
- Web Speech API integration
- Simple word matching
- Fallback to manual "Good Job" button
- Can be disabled in settings

### Progress Tracking
- Local storage for offline persistence
- Per-category progress indicators
- Word completion tracking
- Settings preservation

## Browser Compatibility 🌐

- **Primary Target**: iOS Safari (iPhone 8+)
- **Secondary Support**: Chrome Mobile, Firefox Mobile
- **Desktop**: All modern browsers for testing

## Performance Optimizations ⚡

- Lazy loading of images and audio
- CSS transforms for animations
- Minimal DOM manipulation
- Service Worker caching
- Compressed assets (when added)

## Accessibility 👥

- Large touch targets (60px minimum)
- High contrast colors
- Clear, readable fonts
- Visual feedback for all interactions
- Audio fallbacks for hearing impaired

## Development Tips 💡

### Testing on iPhone
1. Connect iPhone to same WiFi as development machine
2. Find computer's IP address: `ipconfig getifaddr en0` (Mac) or `ipconfig` (Windows)
3. Visit `http://[IP_ADDRESS]:8000` on iPhone
4. Add to home screen for full-screen experience

### Debugging
- Enable Web Inspector on iPhone: Settings > Safari > Advanced > Web Inspector
- Connect to Mac and use Safari Developer Tools
- Console logs are available for debugging

### Adding Content
- Use high-quality, child-appropriate images
- Record clear pronunciation audio (or use text-to-speech tools)
- Test on actual device for best user experience

## Customization 🎨

### Colors
Modify CSS custom properties in `style.css` for color scheme changes.

### Fonts
Currently uses system fonts for fast loading. Can be customized in CSS.

### Categories
Add new categories by:
1. Adding data to `getWordData()` method
2. Adding category button to HTML
3. Adding progress indicator
4. Adding images and audio files

## Troubleshooting 🔧

### Audio Issues
- Ensure HTTPS or localhost for audio autoplay
- Check iOS Silent Mode switch
- Verify audio file formats and paths

### Speech Recognition
- Requires HTTPS in production
- May not work in all browsers
- Fallback button always available

### Offline Mode
- Requires initial online load
- Service Worker needs to cache all resources
- Test offline mode after initial load

## Future Enhancements 🚀

- [ ] More word categories
- [ ] Difficulty levels
- [ ] Parent dashboard
- [ ] Multi-language support
- [ ] Achievement system
- [ ] Analytics and learning insights

## License 📄

This project is created for educational purposes. Feel free to modify and use for non-commercial applications.

---

**Made with ❤️ for young learners**
