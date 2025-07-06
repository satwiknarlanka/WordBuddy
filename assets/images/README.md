# WordBuddy Game Assets

This folder contains all the assets for the WordBuddy pronunciation learning game.

## Images Folder
Place your image files here following this structure:

### App Icons (Required for PWA)
- `app-icon-180.png` - 180x180px Apple Touch Icon
- `app-icon-192.png` - 192x192px Android Icon
- `app-icon-512.png` - 512x512px Large Icon
- `favicon.ico` - Website favicon

### Category Images
Create subfolders for each category:
- `animals/` - Animal images (cat.jpg, dog.jpg, etc.)
- `colors/` - Color images (red.jpg, blue.jpg, etc.) 
- `numbers/` - Number images (1.jpg, 2.jpg, etc.)
- `shapes/` - Shape images (circle.jpg, square.jpg, etc.)
- `alphabets/` - Letter images (a.jpg, b.jpg, etc.)
- `days/` - Day images (monday.jpg, tuesday.jpg, etc.)
- `months/` - Month images (january.jpg, february.jpg, etc.)

## Image Requirements
- Format: JPG or PNG
- Size: 300x300px recommended
- Optimized for web (under 100KB each)
- Child-friendly, clear illustrations

## Adding Your Own Images
1. Add image files to the appropriate subfolder
2. Update the image paths in script.js if needed
3. Ensure filenames match the word data in script.js

## Emoji Fallbacks
If images are not available, the game will show emoji fallbacks automatically.
