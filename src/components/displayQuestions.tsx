import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoginRequiredModal from "./LoginRequired";
import { supabase } from "../api/config";

type Question = {
  id: number;
  title: string;
  options: string[];
  correct_answer: number;
  correct_score: number;
  negative_score: number;
};

const DisplayQuestions: React.FC = () => {
  const { id } = useParams();
  const quizId = parseInt(id || "0", 10);

  const [isUserValid, setIsUserValid] = useState<boolean | null>(null);
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [completedStatus, setCompletedStatus] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalScore, setTotalScore] = useState<number>(0);

  useEffect(() => {
    const user_id = sessionStorage.getItem("user");
    setIsUserValid(!!user_id);

    const fetchQuizData = async () => {
      const { data: quizData, error: quizError } = await supabase
        .from("quizzes")
        .select("title")
        .eq("id", quizId)
        .single();
      if (quizError) console.error("Error fetching quiz:", quizError.message);
      else setQuizTitle(quizData.title);

      const { data: questionsData, error: questionsError } = await supabase
        .from("questions")
        .select("*")
        .eq("quiz_id", quizId);
      if (questionsError) console.error("Error fetching questions:", questionsError.message);
      else setQuestions(questionsData || []);

      setLoading(false);
    };

    fetchQuizData();
  }, [quizId]);

  const handleOptionChange = (qIdx: number, optIdx: number) => {
    if (completedStatus) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmit = async () => {
    let final = 0, total = 0;
    questions.forEach((q, idx) => {
      total += q.correct_score;
      const sel = selectedAnswers[idx];
      if (sel === q.correct_answer) final += q.correct_score;
      else if (sel !== undefined) final -= q.negative_score;
    });
    setScore(final);
    setTotalScore(total);
    setCompletedStatus(true);

    const user_id = sessionStorage.getItem("user");
    if (!user_id) return;
    const { data: attemptData, error: attemptError } = await supabase
      .from("attempts")
      .insert([{ user_id: +user_id, quiz_id: quizId, score: final }])
      .select()
      .single();
    if (attemptError) return console.error(attemptError.message);

    const answers = Object.entries(selectedAnswers).map(([i, sel]) => ({
      attempt_id: attemptData.id,
      question_id: questions[+i].id,
      selected_option: sel,
    }));
    const { error: answersError } = await supabase.from("answers").insert(answers);
    if (answersError) console.error(answersError.message);
  };

  if (isUserValid === null || loading)
    return (
      <div className="text-center font-semibold text-2xl pt-10 text-[#E0E0E0]">
        Loading quiz...
      </div>
    );
  if (isUserValid === false) return <LoginRequiredModal />;
  if (!questions.length)
    return (
      <div className="text-center text-red-600 pt-10">
        No questions found.
      </div>
    );

  return (
    <div className="bg-[#121212] min-h-screen px-4 py-6">
      <h1 className="text-center p-5 text-3xl font-semibold text-[#E0E0E0]">
        {quizTitle}
      </h1>
      <ol className="list-decimal list-inside space-y-6 ml-4 font-medium text-[#E0E0E0]">
        {questions.map((q, i) => (
          <li key={q.id}>
            <span className="font-medium text-[#E0E0E0]">{q.title}</span>
            <div className="text-sm text-[#B0B0B0] mt-1 mb-2">
              <span className="mr-4">✅ +{q.correct_score}</span>
              <span>❌ -{q.negative_score}</span>
            </div>
            <ul className="list-none ml-5 space-y-2">
              {q.options.map((opt, j) => {
                const correct = j === q.correct_answer;
                const selected = selectedAnswers[i] === j;
                let style = "text-[#E0E0E0]";
                if (completedStatus) {
                  if (correct) style = "text-green-400 font-semibold";
                  else if (selected) style = "text-red-400";
                }
                return (
                  <li key={j}>
                    <label className={`flex items-center space-x-2 cursor-pointer ${style}`}>
                      <input
                        type="radio"
                        name={`q-${i}`}
                        checked={selected}
                        onChange={() => handleOptionChange(i, j)}
                        disabled={completedStatus}
                        className="accent-[#BB86FC]"
                      />
                      <span>{opt}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>

      <button
        onClick={handleSubmit}
        disabled={completedStatus}
        className={`mt-10 mx-auto block px-6 py-2 rounded-md font-semibold transition duration-300 ${
          completedStatus
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-[#BB86FC] text-[#121212] hover:bg-[#a97aff]"
        }`}
      >
        Submit Test
      </button>

      {completedStatus && (
        <div
          className={`text-center text-xl font-semibold my-6 ${
            score > 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          You scored {score} out of {totalScore} point{totalScore !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
};

export default DisplayQuestions;
