import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginRequiredModalProps {
    message?: string;
}

const LoginRequiredModal: React.FC<LoginRequiredModalProps> = ({
    message = "You have to be signed in to attend this quiz",
}) => {
    const navigate = useNavigate();

    const handleRedirectToSignIn = () => {
        navigate('/sign-in');
    };

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
            <div className="bg-white max-w-md w-full mx-4 rounded-lg shadow-lg p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">{message}</h2>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={handleGoBack}
                        className="flex-1 px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition duration-300"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={handleRedirectToSignIn}
                        className="flex-1 px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300"
                    >
                        Log in to Continue
                    </button>

                </div>
            </div>
        </div>
    );
};

export default LoginRequiredModal;
