// seedQuestions.js
import mongoose from "mongoose";
import { Question } from "./models/questionModel.js";
import 'dotenv/config'

const questions = [
  // 🌍 Geography
  {
    question: "Which country has the largest population in the world?",
    options: ["India", "USA", "China", "Russia"],
    answer: 0
  },
  {
    question: "Mount Everest lies on the border of which two countries?",
    options: ["India and Nepal", "China and Nepal", "India and China", "Nepal and Bhutan"],
    answer: 1
  },
  {
    question: "Which river flows through Egypt?",
    options: ["Amazon", "Nile", "Ganga", "Yangtze"],
    answer: 1
  },
  {
    question: "Which ocean is on the east coast of the United States?",
    options: ["Atlantic", "Pacific", "Indian", "Arctic"],
    answer: 0
  },
  {
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: 2
  },

  // 📖 History
  {
    question: "Who was the first President of the United States?",
    options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"],
    answer: 2
  },
  {
    question: "In which year did India gain independence?",
    options: ["1942", "1945", "1947", "1950"],
    answer: 2
  },
  {
    question: "Who was known as the 'Iron Lady'?",
    options: ["Indira Gandhi", "Margaret Thatcher", "Angela Merkel", "Golda Meir"],
    answer: 1
  },
  {
    question: "The Great Wall of China was mainly built to protect against which group?",
    options: ["Romans", "Huns", "Mongols", "Turks"],
    answer: 2
  },
  {
    question: "Who discovered America in 1492?",
    options: ["Christopher Columbus", "Vasco da Gama", "Ferdinand Magellan", "Marco Polo"],
    answer: 0
  },

  // 🔬 Science
  {
    question: "What is the chemical symbol for Sodium?",
    options: ["Na", "So", "S", "Sn"],
    answer: 0
  },
  {
    question: "What part of the cell contains genetic material?",
    options: ["Nucleus", "Cytoplasm", "Ribosome", "Mitochondria"],
    answer: 0
  },
  {
    question: "What is the powerhouse of the cell?",
    options: ["Chloroplast", "Nucleus", "Mitochondria", "Golgi body"],
    answer: 2
  },
  {
    question: "Which gas do humans exhale when breathing?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: 1
  },
  {
    question: "Which vitamin is produced when our skin is exposed to sunlight?",
    options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
    answer: 3
  },

  // ➗ Math & Logic
  {
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "13"],
    answer: 2
  },
  {
    question: "Simplify: 3(2 + 4) - 5",
    options: ["7", "13", "15", "19"],
    answer: 1
  },
  {
    question: "If a train travels 60 km in 1 hour, how far will it travel in 2.5 hours?",
    options: ["100 km", "120 km", "150 km", "180 km"],
    answer: 2
  },
  {
    question: "What is the next prime number after 7?",
    options: ["9", "10", "11", "13"],
    answer: 2
  },
  {
    question: "A triangle has angles 90°, 45°, and __?",
    options: ["30°", "45°", "60°", "90°"],
    answer: 1
  },

  // 🎨 Arts & Literature
  {
    question: "Who wrote 'Pride and Prejudice'?",
    options: ["Jane Austen", "Emily Brontë", "Charlotte Brontë", "Mary Shelley"],
    answer: 0
  },
  {
    question: "Who painted 'The Starry Night'?",
    options: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"],
    answer: 0
  },
  {
    question: "Which Shakespeare play features the characters Romeo and Juliet?",
    options: ["Macbeth", "Hamlet", "Romeo and Juliet", "Othello"],
    answer: 2
  },
  {
    question: "In George Orwell’s '1984', what is the name of the dictator?",
    options: ["Big Brother", "O'Brien", "Winston", "Goldstein"],
    answer: 0
  },
  {
    question: "The Mona Lisa is displayed in which museum?",
    options: ["Louvre", "British Museum", "Metropolitan Museum", "Vatican Museum"],
    answer: 0
  },

  // 🌌 General Knowledge
  {
    question: "Which language has the most native speakers worldwide?",
    options: ["English", "Mandarin Chinese", "Spanish", "Hindi"],
    answer: 0
  },
  {
    question: "Which is the longest bone in the human body?",
    options: ["Femur", "Tibia", "Fibula", "Humerus"],
    answer: 0
  },
  {
    question: "What is the currency of Japan?",
    options: ["Yuan", "Won", "Yen", "Ringgit"],
    answer: 2
  },
  {
    question: "Which sport is known as the 'king of sports'?",
    options: ["Cricket", "Football", "Tennis", "Basketball"],
    answer: 1
  },
  {
    question: "Which organ in the human body purifies blood?",
    options: ["Heart", "Pancreas", "Lungs", "Liver"],
    answer: 3
  },

  // Extra mix
  {
    question: "Which scientist discovered gravity?",
    options: ["Albert Einstein", "Isaac Newton", "Galileo", "Nikola Tesla"],
    answer: 1
  },
  {
    question: "Which planet has the most moons?",
    options: ["Earth", "Saturn", "Jupiter", "Neptune"],
    answer: 1
  },
  {
    question: "Which blood type is known as the universal donor?",
    options: ["A", "B", "AB", "O negative"],
    answer: 3
  },
  {
    question: "What is the boiling point of water at sea level?",
    options: ["50°C", "100°C", "150°C", "212°C"],
    answer: 1
  },
  {
    question: "Which is the tallest mountain in Africa?",
    options: ["Kilimanjaro", "Mount Kenya", "Ruwenzori", "Elgon"],
    answer: 0
  },

  {
    question: "Which is the smallest planet in the Solar System?",
    options: ["Mercury", "Mars", "Venus", "Pluto"],
    answer: 0
  },
  {
    question: "What is the SI unit of force?",
    options: ["Newton", "Joule", "Pascal", "Watt"],
    answer: 0
  },
  {
    question: "Which desert is the largest hot desert in the world?",
    options: ["Gobi", "Kalahari", "Sahara", "Arabian"],
    answer: 2
  },
  {
    question: "In which country did the Olympic Games originate?",
    options: ["Italy", "Greece", "France", "Egypt"],
    answer: 1
  },
  {
    question: "What does DNA stand for?",
    options: [
      "Deoxyribonucleic Acid",
      "Dinucleic Acid",
      "Dioxynucleic Acid",
      "None of the above"
    ],
    answer: 0
  },

  {
    question: "Which metal is liquid at room temperature?",
    options: ["Mercury", "Iron", "Sodium", "Aluminium"],
    answer: 0
  },
  {
    question: "Which famous scientist introduced the idea of natural selection?",
    options: ["Darwin", "Newton", "Galileo", "Einstein"],
    answer: 0
  },
  {
    question: "What is the national animal of India?",
    options: ["Lion", "Tiger", "Elephant", "Peacock"],
    answer: 1
  },
  {
    question: "What is the freezing point of water in Celsius?",
    options: ["0°C", "32°C", "100°C", "273°C"],
    answer: 0
  },
  {
    question: "Which planet is closest to the Sun?",
    options: ["Mercury", "Venus", "Earth", "Mars"],
    answer: 0
  }
];

// 🚀 Seed script
mongoose.connect(process.env.MONGODB_URL)
  .then(async () => {
    console.log("MongoDB connected ✅");
    await Question.deleteMany();
    await Question.insertMany(questions);
    console.log(`${questions.length} questions inserted successfully 🎉`);
    mongoose.connection.close();
  })
  .catch(err => console.error("Error:", err));
