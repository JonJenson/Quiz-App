import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../api/config";

type Quiz = {
  id: number;
  title: string;
  description: string | null;
  questions: { id: number }[];
};

const DisplayQuizzes: React.FC = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const { data, error } = await supabase
        .from("quizzes")
        .select("id, title, description, questions(id)");

      if (error) {
        console.error("Error fetching quizzes:", error);
      } else {
        setQuizzes(data || []);
      }

      setLoading(false);
    };

    fetchQuizzes();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-10 text-[#E0E0E0]">
        Loading quizzes...
      </div>
    );

  return (
    <div className="px-4 bg-[#121212] min-h-screen">
      <h1 className="text-3xl font-bold text-center my-6 text-[#E0E0E0]">
        Available Quizzes
      </h1>
      <div className="flex flex-col gap-6 max-w-xl mx-auto">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="border border-[#333333] rounded-xl p-5 shadow-sm hover:shadow-md transition bg-[#1F1F1F]"
          >
            <h2 className="text-xl font-semibold text-[#E0E0E0]">{quiz.title}</h2>
            {quiz.description && (
              <p className="text-gray-400 text-sm mt-1">{quiz.description}</p>
            )}
            <p className="text-md text-[#BB86FC] mt-2">
              {quiz.questions.length} {quiz.questions.length === 1 ? "question" : "questions"}
            </p>
            <button
              onClick={() => navigate(`/quiz/${quiz.id}`)}
              className="mt-4 px-4 py-2 bg-[#BB86FC] text-[#121212] rounded-md hover:bg-[#a97aff] transition"
            >
              Take Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayQuizzes;
