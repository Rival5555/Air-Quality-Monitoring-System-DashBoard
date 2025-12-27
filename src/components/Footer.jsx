import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import LegalModal from './LegalModal';
import { legalContent } from '../utils/legalContent';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [selectedLegalContent, setSelectedLegalContent] = useState(null);

    const openModal = (key) => {
        if (legalContent[key]) {
            setSelectedLegalContent(legalContent[key]);
        }
    };

    const closeModal = () => setSelectedLegalContent(null);


    const footerLinks = {
        support: [
            { name: "Phone: +92 3095436018", href: "tel:+923095436018" },
            { name: "Email: hassanali93r@gmail.com", href: "mailto:hassanali93r@gmail.com" },
            { name: "Feedback", href: "mailto:hassanali93r@gmail.com?subject=Dashboard%20Feedback" }
        ],
        legal: [
            { name: "Terms of Service", key: "terms" },
            { name: "Privacy Policy", key: "privacy" },
            { name: "Disclaimer", key: "disclaimer" }
        ]
    };

    return (
        <>
            <Motion.footer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="w-full mt-16 pb-8 px-4"
            >
                <div className="max-w-7xl mx-auto">
                    {/* Main Glass Container */}
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl">
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-30 pointer-events-none" />

                        <div className="relative z-10 px-8 py-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

                                {/* 1. Brand Section */}
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                                            Air Quality System
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                                            Real-time IoT Environmental Monitoring Dashboard.
                                            Advanced sensor data visualization for safer living spaces.
                                        </p>
                                    </div>
                                </div>

                                {/* 2. Help & Support */}
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wide mb-4">
                                        Support
                                    </h4>
                                    <ul className="space-y-2.5">
                                        {footerLinks.support.map((link) => (
                                            <li key={link.name}>
                                                <a href={link.href} className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 block w-fit">
                                                    {link.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* 3. Legal Section */}
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wide mb-4">
                                        Legal
                                    </h4>
                                    <ul className="space-y-2.5">
                                        {footerLinks.legal.map((link) => (
                                            <li key={link.name}>
                                                <button
                                                    onClick={() => openModal(link.key)}
                                                    className="text-xs text-left text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 block w-fit"
                                                >
                                                    {link.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* 4. Social Media */}
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wide mb-4">
                                        Connect
                                    </h4>
                                    <div className="flex items-center gap-4">
                                        <a href="https://github.com/Rival5555/Air-Quality-Monitoring-System-DashBoard" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 border border-transparent hover:border-white/10 group">
                                            <FaGithub size={16} />
                                        </a>
                                        <a href="https://linkedin.com/in/hasanali09" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 border border-transparent hover:border-white/10">
                                            <FaLinkedin size={16} />
                                        </a>
                                        <a href="https://x.com/IamHassan_09" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-all duration-300 border border-transparent hover:border-white/10">
                                            <FaTwitter size={16} />
                                        </a>
                                        <a href="hassanali93r@gmail.com" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-all duration-300 border border-transparent hover:border-white/10">
                                            <FaEnvelope size={16} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent opacity-50" />

                            {/* 5. Bottom Bar */}
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium">
                                <p>
                                    © {currentYear} Air Quality Monitoring System. All rights reserved.
                                </p>
                                <p className="opacity-70 italic">
                                    Built for academic and research purposes
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Motion.footer>

            {/* Legal Modal */}
            <LegalModal
                isOpen={!!selectedLegalContent}
                onClose={closeModal}
                title={selectedLegalContent?.title}
                content={selectedLegalContent?.content}
            />
        </>
    );
};

export default Footer;
