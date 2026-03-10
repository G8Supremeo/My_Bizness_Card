import React, { useState } from 'react';
import type { MouseEvent } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Moon, Sun, Download, Sparkles, RefreshCw } from 'lucide-react';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import CardImage from './assets/D_Card.jpeg';

const BusinessCard: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    // 1. 3D TILT EFFECT: Smooth mouse coordinates tracking with spring
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    // Map mapped percentages to rotation (-15 to 15 degrees)
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const resetMouse = () => { x.set(0); y.set(0); };

    // 2. VCARD GENERATOR: Creates a downloadable contact file
    const downloadVCard = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent flipping when clicking download
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:Supreme Oghenewoakpo\nORG:Creative Dev\nTEL;TYPE=CELL:+13433426280\nEMAIL:supremeoghenewoakpo@gmail.com\nURL:https://g8supremeo.github.io\nEND:VCARD`;
        const blob = new Blob([vcard], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Supreme_Ogh.vcf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const toggleFlip = () => setIsFlipped(!isFlipped);

    return (
        <div className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-700 font-inter ${isDarkMode ? 'bg-sky-950 text-white' : 'bg-rose-50 text-rose-950'}`}>

            {/* BACKGROUND DECORATION: Essential for Glassmorphism */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] rounded-full blur-3xl animate-pulse mix-blend-screen transition-colors duration-1000 ${isDarkMode ? 'bg-rose-600/30' : 'bg-rose-300/40'}`} />
                <div className={`absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-3xl mix-blend-screen transition-colors duration-1000 ${isDarkMode ? 'bg-sky-600/20' : 'bg-sky-300/40'}`} />
            </div>

            {/* THEME TOGGLE BUTTON */}
            <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`z-50 absolute top-6 right-6 p-3 rounded-full backdrop-blur-xl border hover:scale-110 active:scale-95 transition-all shadow-lg ${isDarkMode ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/10'}`}
            >
                {isDarkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-slate-700" />}
            </button>

            {/* FLIP INSTRUCTION */}
            <div className="absolute top-24 text-sm font-medium opacity-60 tracking-wider uppercase animate-bounce text-center w-full pointer-events-none flex items-center justify-center gap-2">
                <RefreshCw size={14} /> Click card to flip
            </div>

            {/* OUTER 3D CONTAINER FOR TILT */}
            <motion.div
                style={{ rotateX, rotateY, perspective: 1200 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={resetMouse}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-sm h-[520px] cursor-pointer touch-none"
                onClick={toggleFlip}
            >
                {/* INNER CONTAINER FOR FLIP */}
                <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 20 }}
                    className="w-full h-full relative preserve-3d"
                >
                    {/* --- FRONT FACE --- */}
                    <div className={`absolute inset-0 backface-hidden rounded-[2.5rem] border p-6 shadow-2xl backdrop-blur-2xl flex flex-col justify-between ${isDarkMode ? 'bg-sky-900/60 border-sky-400/20' : 'bg-rose-100/60 border-rose-300/50'}`}>
                        {/* HEADER: Profile Image & Name */}
                        <div className="flex flex-col items-center">
                            <div className="relative group mt-1">
                                <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-rose-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000"></div>
                                <div className={`relative h-24 w-24 rounded-full border-4 flex items-center justify-center overflow-hidden shadow-xl ${isDarkMode ? 'border-sky-800 bg-sky-900' : 'border-white bg-rose-50'}`}>
                                    <img src={CardImage} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <h1 className="mt-3 text-2xl font-extrabold tracking-tight font-outfit whitespace-nowrap">Supreme Oghenewoakpo</h1>
                            <p className="flex items-center gap-1.5 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-rose-400 font-bold text-xs uppercase tracking-widest mt-1">
                                <Sparkles size={12} className="text-sky-400" /> AI/ML Engineer
                            </p>
                        </div>

                        {/* ABOUT & INTERESTS */}
                        <div className="mt-3 space-y-3">
                            <div className={`rounded-2xl p-4 border ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-white/50 border-black/5'}`}>
                                <h3 className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-white/50' : 'text-slate-500'}`}>About Me</h3>
                                <p className={`mt-1 text-xs font-medium leading-relaxed ${isDarkMode ? 'text-white/80' : 'text-slate-700'}`}>
                                    Lead AI/ML Engineer | MSc Data Science Architecting production-grade AI for complex industries. Expertise: Generative AI, RAG, Agentic Workflows.
                                    Languages & Tools: Python, JavaScript, PyTorch, Databricks. Impact: Translating massive telemetry into automated ROI.
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2">
                                {[
                                    { name: 'Computer Vision', url: 'https://github.com/g8supremeo' },
                                    { name: 'CNNs', url: 'https://github.com/g8supremeo' },
                                    { name: 'Transformers', url: 'https://github.com/g8supremeo' },
                                    { name: 'NLP', url: 'https://github.com/g8supremeo' },
                                    { name: 'Fullstack ML Eng', url: 'https://github.com/g8supremeo' }
                                ].map((tag, i) => (
                                    <motion.a
                                        key={tag.name}
                                        href={tag.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ y: -2, scale: 1.05 }}
                                        transition={{ delay: 0.5 + (i * 0.1) }}
                                        className={`px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-wide transition-colors cursor-pointer ${isDarkMode ? 'bg-white/5 border-white/10 text-white/90 hover:bg-sky-500/20 hover:border-sky-500/50 hover:text-sky-300' : 'bg-black/5 border-black/10 text-slate-800 hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-600'}`}
                                    >
                                        {tag.name}
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* MINIMAL SOCIAL TAGS IN FRONT */}
                        <div className="mt-3 flex justify-center gap-6">
                            {[
                                { Icon: FaLinkedin, url: 'https://linkedin.com/in/supreme-oghenewoakpo-195ab134' },
                                { Icon: FaGithub, url: 'https://github.com/g8supremeo' },
                                { Icon: FaGlobe, url: 'https://g8supremeo.github.io' }
                            ].map(({ Icon, url }, idx) => (
                                <motion.a
                                    key={idx}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    onClick={(e) => e.stopPropagation()}
                                    className={`transition-colors cursor-pointer ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* --- BACK FACE --- */}
                    <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-[2.5rem] border p-6 shadow-2xl backdrop-blur-2xl flex flex-col items-center justify-center text-center ${isDarkMode ? 'bg-sky-950/80 border-sky-400/30' : 'bg-rose-50/90 border-rose-300/60'}`}>

                        <div className="flex flex-col items-center justify-center gap-6 w-full">
                            <h2 className="text-2xl font-bold font-outfit">Connect with me</h2>

                            <div className={`p-4 rounded-3xl shadow-inner ${isDarkMode ? 'bg-white' : 'bg-white shadow-xl'}`}>
                                {/* Generate QR Code that is easily scannable */}
                                <QRCodeSVG value="https://g8supremeo.github.io" size={160} level="H" includeMargin={false} />
                            </div>

                            <p className={`text-xs font-semibold tracking-widest uppercase ${isDarkMode ? 'text-sky-400' : 'text-sky-600'}`}>Scan to visit portfolio</p>

                            <div className="w-full h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent my-4"></div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={downloadVCard}
                                className={`flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold tracking-wide transition-all shadow-lg text-white ${isDarkMode ? 'bg-gradient-to-r from-sky-600 to-rose-600 hover:from-sky-500 hover:to-rose-500' : 'bg-gradient-to-r from-sky-500 to-rose-500 hover:from-sky-400 hover:to-rose-400'}`}
                            >
                                <Download size={16} /> SAVE CONTACT
                            </motion.button>
                        </div>

                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default BusinessCard;
