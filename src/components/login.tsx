import { useState } from "react";
import { supabase } from "../api/config";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleReset=()=>{
    setUsername('');
    setPassword('');
  }
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('users')
      .select("*")
      .eq('username', username)
      .single();
    if (error) {
      console.log("Error logging in", error.message);
      toast.error("Login failed");
      setTimeout(()=>{
        handleReset();
      },2000)
      return;
    }
    if (!data) {
      console.log("Username not found");
      toast.error('User not found . Login failed');
      setTimeout(()=>{
        handleReset();
      },2000)
      return;
    }
    if (data.password !== password) {
      console.log("Wrong password");
      toast.error("Invalid password");
      setTimeout(()=>{
        handleReset();
      },2000)
      return;
    }
    else {
      console.log('Login succesfull');
      toast.success("Login verified");
      sessionStorage.setItem('user',data.user_id);
      sessionStorage.setItem('name',data.name);
      setTimeout(()=>{
        navigate(-1);
      },2000)
      return;
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md text-white border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=""
              required
              className="w-full p-2 rounded-lg bg-white/20 backdrop-blur text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              required
              className="w-full p-2 rounded-lg bg-white/20 backdrop-blur text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-white/30 hover:bg-white/40 transition mt-2 text-white font-semibold"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
