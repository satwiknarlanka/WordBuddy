# WordBuddy - Pronunciation Learning Game 🎯

A mobile-friendly pronunciation learning game designed for 4-year-olds, featuring British English speech recognition and scrollable categories.

## 🚀 Live Demo
Visit: [Your GitHub Pages URL will be here]

## 📱 Features
- **7 Learning Categories**: Animals, Alphabets, Days, Months, Colors, Numbers, Shapes
- **British English Speech Recognition**: Kids practice pronunciation with real feedback
- **Mobile Optimized**: iPhone 8 optimized, works on all devices
- **Offline Capable**: Service worker for offline play
- **Progress Tracking**: Saves progress locally
- **Microphone Permission Management**: Easy setup for speech recognition
- **Scrollable Interface**: Access all categories easily
- **Child-Friendly UI**: Large buttons, bright colors, encouraging feedback

## 🎮 How to Play
1. **Start Playing** - Click the rocket button
2. **Allow Microphone** - Click the microphone button to enable speech recognition
3. **Choose Category** - Scroll through and select a category
4. **Listen & Repeat** - Hear the word, then say it back
5. **Get Feedback** - Visual and audio feedback for correct pronunciation
6. **Progress Tracking** - Complete words to unlock new content

## 🛠️ Technical Features
- **Speech Recognition**: Web Speech API with British English (en-GB)
- **Audio Synthesis**: British English female voice preferred
- **PWA Support**: Add to home screen like a native app
- **Responsive Design**: Works on phones, tablets, and desktops
- **Error Handling**: Robust speech recognition with fallbacks
- **Local Storage**: Progress and settings persistence

## 📁 Build Contents
This build folder contains all files ready for GitHub Pages deployment:

```
build/
├── index.html              # Main game file
├── style.css               # All styles and responsive design
├── script.js               # Game logic and speech recognition
├── sw.js                   # Service worker for offline support
├── manifest.json           # PWA manifest for app-like experience
└── assets/
    ├── images/             # Game images and icons
    │   └── README.md       # Image requirements and structure
    └── audio/              # Pronunciation audio files
        └── README.md       # Audio requirements and structure
```

## 🚀 Deployment Instructions

### Quick Deploy to GitHub Pages
1. **Create Repository**: Create a new public repository on GitHub
2. **Upload Build**: Upload all files from this `build/` folder to your repository
3. **Enable Pages**: Go to Settings → Pages → Deploy from branch (main)
4. **Access Game**: Your game will be live at `https://username.github.io/repository-name/`

### Manual Upload Steps
1. Go to your GitHub repository
2. Click "Add file" → "Upload files"
3. Drag all files from the `build/` folder
4. Commit with message: "Deploy WordBuddy pronunciation game"
5. Wait 1-2 minutes for deployment

### Using Git Commands
```bash
# Clone or create your repository
git clone https://github.com/username/repository-name.git
cd repository-name

# Copy build files
cp -r /path/to/WordBuddy/build/* .

# Commit and push
git add .
git commit -m "Deploy WordBuddy pronunciation game"
git push origin main
```

## 📱 Mobile Setup Instructions
After deployment, users can add the game to their phone's home screen:

### iPhone/iPad:
1. Open Safari and go to your game URL
2. Tap the Share button (square with arrow)
3. Select "Add to Home Screen"
4. The game now works like a native app!

### Android:
1. Open Chrome and go to your game URL
2. Tap the three dots menu
3. Select "Add to Home screen"
4. Confirm installation

## 🔊 Adding Your Own Content

### Images
- Add images to `assets/images/[category]/`
- Use JPG or PNG format, 300x300px recommended
- Name files to match the words (e.g., `cat.jpg` for "cat")

### Audio
- Add MP3 files to `assets/audio/[category]/`
- Use clear British English pronunciation
- Keep files under 1MB each
- Name files to match the words (e.g., `cat.mp3` for "cat")

### Words
- Edit `script.js` to add new words
- Follow the existing data structure
- Include word, phonetic notation, image path, and audio path

## 🐛 Troubleshooting

### Speech Recognition Issues
- Ensure microphone permission is granted
- Use Chrome or Safari for best compatibility
- Check internet connection (required for speech recognition)
- Use "I Said It!" button as fallback

### Mobile Issues
- Refresh the page if microphone stops working
- Close other apps using the microphone
- Try different browsers (Chrome/Safari recommended)

### Deployment Issues
- Ensure all files are in repository root (not in a subfolder)
- Wait up to 10 minutes for first deployment
- Check GitHub Pages settings in repository

## 🎯 Game Design Philosophy
- **Child-Centered**: Designed specifically for 4-year-olds
- **Encouraging**: Positive feedback and celebration of attempts
- **Accessible**: Works without audio files (emoji fallbacks)
- **Progressive**: Difficulty appropriate for early learners
- **Inclusive**: Alternative interaction methods for all abilities

## 🌟 Future Enhancements
- More categories (food, vehicles, etc.)
- Difficulty levels
- Multiplayer family mode
- Achievement system
- Parent dashboard
- Custom word lists

## 📄 License
This project is designed for educational use. Feel free to modify and share!

---

**Happy Learning! 🎉**

Made with ❤️ for young learners everywhere.
