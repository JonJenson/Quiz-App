import type {QuizType} from "../types";

 export const quizData: QuizType[] = [
    {
      name: "General Knowledge Quiz",
      questions: [
        {
          title: "What is the capital of France?",
          options: ["Berlin", "London", "Paris", "Madrid"],
          correctAnswer: 2, 
        },
        {
          title: "Which planet is known as the Red Planet?",
          options: ["Earth", "Mars", "Jupiter", "Saturn"],
          correctAnswer: 1, 
        },
      ],
    },
    {
      name: "Math Quiz",
      questions: [
        {
          title: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          correctAnswer: 1, 
        },
        {
          title: "What is the square root of 16?",
          options: ["2", "4", "8", "16"],
          correctAnswer: 1, 
        },
      ],
    },
  ];
