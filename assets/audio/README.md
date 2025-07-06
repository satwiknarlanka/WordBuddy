# WordBuddy Audio Files

This directory contains pronunciation audio files for the WordBuddy game.

## Required Audio Files

### Word Pronunciation Files
- cat.mp3, dog.mp3, bird.mp3, fish.mp3, cow.mp3, duck.mp3, pig.mp3, sheep.mp3
- red.mp3, blue.mp3, green.mp3, yellow.mp3, pink.mp3, orange.mp3, purple.mp3, black.mp3  
- one.mp3, two.mp3, three.mp3, four.mp3, five.mp3, six.mp3, seven.mp3, eight.mp3
- circle.mp3, square.mp3, triangle.mp3, star.mp3, heart.mp3, diamond.mp3, oval.mp3, rectangle.mp3

### System Sound Files
- success.mp3 - Played when child completes a word successfully
- button.mp3 - Played when buttons are pressed

## Audio Requirements
- Format: MP3 for broad iOS compatibility
- Quality: Clear, child-friendly voice
- Duration: 1-3 seconds per word
- Volume: Normalized levels

## Creating Audio Files

### Using Text-to-Speech (Quick Solution)
You can use online TTS services or system TTS to generate audio files:

**macOS:**
```bash
say "cat" -o cat.wav && ffmpeg -i cat.wav cat.mp3
```

**Windows:**
Use PowerShell with built-in TTS or online services

### Professional Audio (Recommended)
- Record with clear, friendly voice
- Use child-appropriate tone and pace
- Ensure consistent volume levels
- Include slight pause before/after word

## File Naming Convention
- Use exact word text as filename
- All lowercase
- No spaces or special characters  
- .mp3 extension

Example: "cat" word → cat.mp3
