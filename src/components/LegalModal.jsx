import React from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const LegalModal = ({ isOpen, onClose, title, content }) => {
    // Helper to render simple markdown-like content
    const renderContent = (text) => {
        if (!text) return null;
        return text.split('\n').map((line, index) => {
            if (line.trim().startsWith('###')) {
                return <h3 key={index} className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">{line.replace('###', '').trim()}</h3>;
            }
            if (line.trim().startsWith('**')) {
                return <p key={index} className="text-sm text-gray-600 dark:text-gray-300 font-bold mb-2">{line.replaceAll('**', '').trim()}</p>;
            }
            if (line.trim() === '') {
                return <br key={index} />;
            }
            return <p key={index} className="text-sm text-gray-600 dark:text-gray-300 mb-1 leading-relaxed">{line}</p>;
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Container */}
                        <Motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden border border-gray-100 dark:border-gray-700"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            {/* Content - Scrollable */}
                            <div className="p-6 overflow-y-auto custom-scrollbar">
                                <div className="space-y-1">
                                    {renderContent(content)}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </Motion.div>
                    </Motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default LegalModal;
