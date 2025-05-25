import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    const links = ["Home", "About", "Services", "Contact"];

    useEffect(() => {
        const user = sessionStorage.getItem("user");
        if (user) setIsLoggedIn(true);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        setIsLoggedIn(false);
        setDropdownOpen(false);
    };

    const handleSignIn = () => navigate("sign-in");

    return (
        <nav className="bg-[#121212] shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo + Links */}
                    <div className="flex items-center space-x-8">
                        <span className="text-xl font-semibold text-[#E0E0E0]">MyLogo</span>
                        <div className="hidden md:flex space-x-6">
                            {links.map((link) => (
                                <a
                                    key={link}
                                    href={`#${link.toLowerCase()}`}
                                    className="text-[#E0E0E0] hover:bg-[#2c2c2c] px-3 py-2 rounded transition"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Auth Actions */}
                    <div className="hidden md:flex items-center relative space-x-4">
                        {!isLoggedIn ? (
                            <button
                                className="text-[#121212] px-4 py-2 rounded transition bg-[#BB86FC] hover:bg-[#a97aff]"
                                onClick={handleSignIn}
                            >
                                Sign In
                            </button>
                        ) : (
                            <div ref={dropdownRef} className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="w-10 h-10 rounded-full bg-transparent text-[#E0E0E0] flex items-center justify-center hover:bg-[#2c2c2c] transition"
                                    aria-label="Profile"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z"
                                            fill="none"
                                        />
                                        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth={2} />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 12c-4 0-6 2-6 4v1h12v-1c0-2-2-4-6-4z"
                                        />
                                    </svg>
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-[#2c2c2c] border border-[#444444] rounded shadow-md py-2 z-10">
                                        <a
                                            href="/dashboard"
                                            className="block px-4 py-2 hover:bg-[#444444] text-[#E0E0E0] transition"
                                        >
                                            Dashboard
                                        </a>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 hover:bg-[#444444] text-[#03DAC6] transition"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Hamburger Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#E0E0E0] text-2xl bg-transparent hover:bg-[#2c2c2c] rounded px-2 py-1 transition"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? "×" : "☰"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[#121212] px-4 pb-4 space-y-2">
                    {links.map((link) => (
                        <a
                            key={link}
                            href={`#${link.toLowerCase()}`}
                            className="block text-[#E0E0E0] hover:bg-[#2c2c2c] px-3 py-2 rounded transition"
                            onClick={() => setIsOpen(false)}
                        >
                            {link}
                        </a>
                    ))}
                    {!isLoggedIn ? (
                        <button
                            className="w-full text-left text-[#121212] bg-[#BB86FC] px-4 py-2 rounded hover:bg-[#a97aff] transition"
                            onClick={() => {
                                handleSignIn();
                                setIsOpen(false);
                            }}
                        >
                            Sign In
                        </button>
                    ) : (
                        <div className="space-y-1">
                            <a
                                href="/dashboard"
                                className="block text-[#E0E0E0] hover:bg-[#2c2c2c] px-3 py-2 rounded transition"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </a>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="block text-[#03DAC6] hover:text-[#00b8a9] px-3 py-2 rounded transition"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
