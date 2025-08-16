import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className=" border-t border-gray-200 bg-white/90 backdrop-blur">
            {/* Tricolor divider */}
            <div className="h-1 w-full bg-tricolor" />

            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto py-10 grid gap-10 md:grid-cols-3 items-center">
                    {/* Brand */}
                    <div className="flex flex-col items-center text-center">
                        <Link to="/" className="flex items-center justify-center">
                            <img
                                src="/jeevanIdLogo.png"
                                alt="JeevanID Logo"
                                className="h-40 w-auto object-contain"
                            />
                        </Link>
                        <p className="mt-3 text-sm text-gray-600">
                            Care that arrives faster.
                        </p>
                        <div className="mt-4 flex gap-4 text-gray-600">
                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-orange-600"
                                aria-label="GitHub"
                            >
                                <FaGithub className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-orange-600"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-orange-600"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center">
                        <h4 className="font-semibold text-gray-800 mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li>
                                <Link to="/register" className="hover:text-orange-600">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link to="/report" className="hover:text-orange-600">
                                    Report an Incident
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="hover:text-orange-600">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* CTA + Legal */}
                    <div className="text-center md:text-right">
                        <Link
                            to="/report"
                            className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 bg-tricolor"
                        >
                            Report Emergency
                        </Link>
                        <div className="mt-4 space-x-4 text-sm text-gray-600">
                            <Link to="/privacy" className="hover:text-orange-600">
                                Privacy
                            </Link>
                            <Link to="/terms" className="hover:text-orange-600">
                                Terms
                            </Link>
                            <Link to="/contact" className="hover:text-orange-600">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} JeevanID. Built for faster emergency response | A Digital India Initiative.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
