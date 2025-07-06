/**
 * WordBuddy Game Data
 * Contains all word categories and game configuration
 */

export class GameData {
    static getWordData() {
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
            ],
            mixed: [
                // A fun mix from all categories
                { word: 'cat', phonetic: '/kæt/', image: 'assets/images/cat.jpg', audio: 'assets/audio/cat.mp3' },
                { word: 'red', phonetic: '/red/', image: 'assets/images/red.jpg', audio: 'assets/audio/red.mp3' },
                { word: 'three', phonetic: '/θriː/', image: 'assets/images/three.jpg', audio: 'assets/audio/three.mp3' },
                { word: 'circle', phonetic: '/ˈsɜːkəl/', image: 'assets/images/circle.jpg', audio: 'assets/audio/circle.mp3' },
                { word: 'A', phonetic: '/eɪ/', image: 'assets/images/letter_a.jpg', audio: 'assets/audio/letter_a.mp3' },
                { word: 'Monday', phonetic: '/ˈmʌndeɪ/', image: 'assets/images/monday.jpg', audio: 'assets/audio/monday.mp3' },
                { word: 'dog', phonetic: '/dɒɡ/', image: 'assets/images/dog.jpg', audio: 'assets/audio/dog.mp3' },
                { word: 'blue', phonetic: '/bluː/', image: 'assets/images/blue.jpg', audio: 'assets/audio/blue.mp3' },
                { word: 'star', phonetic: '/stɑː/', image: 'assets/images/star.jpg', audio: 'assets/audio/star.mp3' },
                { word: 'five', phonetic: '/faɪv/', image: 'assets/images/five.jpg', audio: 'assets/audio/five.mp3' },
                { word: 'bird', phonetic: '/bɜːd/', image: 'assets/images/bird.jpg', audio: 'assets/audio/bird.mp3' },
                { word: 'green', phonetic: '/ɡriːn/', image: 'assets/images/green.jpg', audio: 'assets/audio/green.mp3' },
                { word: 'heart', phonetic: '/hɑːt/', image: 'assets/images/heart.jpg', audio: 'assets/audio/heart.mp3' },
                { word: 'B', phonetic: '/biː/', image: 'assets/images/letter_b.jpg', audio: 'assets/audio/letter_b.mp3' },
                { word: 'elephant', phonetic: '/ˈeləfənt/', image: 'assets/images/elephant.jpg', audio: 'assets/audio/elephant.mp3' },
                { word: 'yellow', phonetic: '/ˈjeləʊ/', image: 'assets/images/yellow.jpg', audio: 'assets/audio/yellow.mp3' },
                { word: 'square', phonetic: '/skweə/', image: 'assets/images/square.jpg', audio: 'assets/audio/square.mp3' },
                { word: 'seven', phonetic: '/ˈsevən/', image: 'assets/images/seven.jpg', audio: 'assets/audio/seven.mp3' },
                { word: 'lion', phonetic: '/ˈlaɪən/', image: 'assets/images/lion.jpg', audio: 'assets/audio/lion.mp3' },
                { word: 'Friday', phonetic: '/ˈfraɪdeɪ/', image: 'assets/images/friday.jpg', audio: 'assets/audio/friday.mp3' }
            ]
        };
    }

    static getEmojiForWord(word) {
        const emojiMap = {
            // Animals
            cat: '🐱', dog: '🐶', bird: '🐦', fish: '🐟', cow: '🐄',
            duck: '🦆', pig: '🐷', sheep: '🐑', elephant: '🐘', lion: '🦁',
            tiger: '🐅', bear: '🐻', monkey: '🐵', rabbit: '🐰', horse: '🐴',
            zebra: '🦓', giraffe: '🦒', penguin: '🐧', frog: '🐸', turtle: '🐢',
            
            // Letters
            A: '🅰️', B: '🅱️', C: '🇨', D: '🇩', E: '🇪', F: '🇫', G: '🇬', H: '🇭',
            I: '🇮', J: '🇯', K: '🇰', L: '🇱', M: '🇲', N: '🇳', O: '🅾️', P: '🅿️',
            Q: '🇶', R: '🇷', S: '🇸', T: '🇹', U: '🇺', V: '🇻', W: '🇼', X: '❌',
            Y: '🇾', Z: '🇿',
            
            // Days
            Monday: '📅', Tuesday: '📅', Wednesday: '📅', Thursday: '📅',
            Friday: '🎉', Saturday: '🎊', Sunday: '☀️',
            
            // Months
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

    static getGameConfig() {
        return {
            totalWords: 5,
            speechTimeout: 8000,
            celebrationDuration: 1500,
            autoAdvanceDelay: 2000,
            audioDelay: 500
        };
    }
}
