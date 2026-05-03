import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Moon, Sun, MessageSquareText, Maximize, Printer, Download, BrainCircuit, CalendarDays, Key, Sparkles, Zap, TrendingUp, Target, ShieldCheck, CheckCircle2, Users, Briefcase, Layers, MapPin, Clock, PieChart, DollarSign, BarChart4 } from 'lucide-react';
import { slides, SlideData } from './data/slides';
import { exportToPPTX } from './lib/pptxExport';

const Icons: any = {
  BrainCircuit, CalendarDays, Key, Sparkles, Zap, TrendingUp, Target, ShieldCheck, CheckCircle2, Users, Briefcase, Layers, MapPin, Clock, PieChart, DollarSign, BarChart4
};

function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [showHints, setShowHints] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = useCallback(() => {
    setIsPrinting(true);
    setShowHints(false); // Hide hints for print
    // Need to give framer motion time to finish load animations
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 1500);
  }, []);

  const handleExportPPTX = useCallback(async () => {
    setIsExporting(true);
    try {
      await exportToPPTX(slides);
    } catch (error) {
      console.error("Failed to export PPTX", error);
    } finally {
      setIsExporting(false);
    }
  }, []);

  // Toggle theme class on body
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  // Keyboard navigation
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'PageDown') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const slide = slides[currentSlideIndex];

  // Motion variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      rotateY: direction > 0 ? 15 : -15
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 30,
        mass: 0.8
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      rotateY: direction < 0 ? 15 : -15,
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 30,
        mass: 0.8
      }
    })
  };

  // Swipe support for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // threshold of 50px
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStart(null);
  };

  if (isPrinting) {
    return (
      <div className="bg-[var(--color-base)] w-full flex flex-col text-[var(--color-text-main)] overflow-visible">
        {slides.map((s, idx) => (
          <div key={idx} className="w-full h-screen flex flex-col items-center justify-center p-8 print-page relative">
            <div className="w-full h-full max-w-6xl neo-card flex flex-col p-12 relative overflow-hidden shrink-0" style={{ transformStyle: 'flat' }}>
              <SlideRenderer slide={s} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-[var(--color-base)] perspective-1000"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* Dynamic Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none no-print z-0 delay-1000">
        <div className="bg-orb w-[60vw] h-[60vw] bg-blue-500/30 top-[-20%] left-[-10%]" style={{ animationDelay: '0s' }} />
        <div className="bg-orb w-[50vw] h-[50vw] bg-purple-500/30 bottom-[-20%] right-[-10%]" style={{ animationDelay: '-5s' }} />
        <div className="bg-orb w-[40vw] h-[40vw] bg-indigo-500/20 top-[30%] left-[40%]" style={{ animationDelay: '-10s' }} />
      </div>

      {/* Top Controls */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-3 glass-panel px-4 py-2 opacity-80 hover:opacity-100 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold title-display text-sm">
            AI
          </div>
          <span className="font-semibold tracking-wide text-sm">RentAI<span className="opacity-50">2026</span></span>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={handleExportPPTX}
            disabled={isExporting}
            className={`neo-element p-3 transition-colors ${isExporting ? 'opacity-50 cursor-not-allowed' : 'hover:text-[var(--color-accent)]'}`}
            title="Скачать в формате PowerPoint (.pptx)"
          >
            <Download size={20} className={isExporting ? 'animate-bounce' : ''} />
          </button>
          <button 
            onClick={handlePrint}
            className="neo-element p-3 hover:text-[var(--color-accent)] transition-colors"
            title="Экспорт в PDF / Печать"
          >
            <Printer size={20} />
          </button>
          <button 
            onClick={() => setShowHints(!showHints)}
            className={`neo-element p-3 transition-colors ${showHints ? 'text-[var(--color-accent)] neo-pressed' : ''}`}
            title="AI Speaker Hints"
          >
            <MessageSquareText size={20} />
          </button>
          <button 
            onClick={() => setIsDark(!isDark)}
            className="neo-element p-3"
            title="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={toggleFullScreen}
            className="neo-element p-3"
            title="Fullscreen"
          >
            <Maximize size={20} />
          </button>
        </div>
      </div>

      {/* Main Slide Content */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={currentSlideIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute w-[95%] md:w-[90%] max-w-6xl h-[85%] md:h-[75%] neo-card flex flex-col p-6 md:p-12 lg:p-16 overflow-y-auto overflow-x-hidden stylish-scrollbar"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Internal content rendering based on type */}
          <SlideRenderer slide={slide} />
        </motion.div>
      </AnimatePresence>

      {/* AI Hint Panel */}
      <AnimatePresence>
        {showHints && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="absolute bottom-24 glass-panel border-l-4 border-l-[var(--color-accent)] p-6 max-w-2xl z-40 text-sm md:text-base font-medium flex items-start gap-4"
          >
            <BrainCircuit className="text-[var(--color-accent)] shrink-0" />
            <p><span className="opacity-50 uppercase text-xs block mb-1 tracking-wider">AI Speaker Hint</span>{slide.aiHint}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center z-50">
        <div className="flex gap-4">
          <button 
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="neo-element p-4 disabled:opacity-30 disabled:cursor-not-allowed hover:text-[var(--color-accent)] transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentSlideIndex === slides.length - 1}
            className="neo-element p-4 disabled:opacity-30 disabled:cursor-not-allowed hover:text-[var(--color-accent)] transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* Progress Indicators */}
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentSlideIndex ? 1 : -1);
                setCurrentSlideIndex(idx);
              }}
              className={`w-12 h-2 rounded-full transition-all duration-300 ${
                idx === currentSlideIndex 
                  ? 'bg-[var(--color-accent)] neo-shallow' 
                  : 'bg-[var(--color-text-muted)] opacity-30 hover:opacity-60'
              }`}
            />
          ))}
        </div>
        
        <div className="text-sm font-semibold tracking-widest opacity-60 w-32 text-right">
          {String(currentSlideIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}

// Sub-component to render different slide types
function SlideRenderer({ slide }: { slide: SlideData }) {
  const tiltProps = {
    whileHover: { rotateX: 2, rotateY: -2, scale: 1.02 },
    transition: { type: 'spring', stiffness: 300 }
  };

  switch (slide.type) {
    case 'hero':
      return (
        <div className="h-full flex flex-col justify-center items-center text-center space-y-8 relative z-10 w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,var(--accent-glow)_0%,transparent_70%)] opacity-40 pointer-events-none -z-10 blur-3xl mix-blend-screen" />
          <motion.h1 
            initial={{ y: 30, opacity: 0, filter: 'blur(10px)' }} animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }} transition={{ delay: 0.1, duration: 0.8 }}
            className="text-7xl md:text-9xl lg:text-[10rem] font-bold title-display text-gradient pb-4 leading-none"
          >
            {slide.title}
          </motion.h1>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-medium max-w-4xl leading-relaxed text-[var(--color-text-main)]"
          >
             {slide.subtitle}
          </motion.h2>
          
          <div className="flex flex-wrap justify-center gap-8 mt-16 w-full pt-12">
            {slide.metrics?.map((m, i) => (
              <motion.div 
                {...tiltProps}
                initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }}
                key={i} className="neo-element px-10 py-8 w-full md:w-auto min-w-[280px]"
              >
                <div className="text-5xl lg:text-6xl font-bold title-display text-gradient mb-3">{m.value}</div>
                <div className="text-sm uppercase tracking-widest text-[var(--color-text-muted)] font-bold">{m.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-auto opacity-30 text-xs font-bold tracking-[0.2em] uppercase">
            {slide.footer}
          </div>
        </div>
      );

    case 'problem':
    case 'solution':
      return (
        <div className="h-full flex flex-col">
          <PageHeader title={slide.title} subtitle={slide.subtitle} />
          
          <div className="flex-1 flex flex-col lg:flex-row gap-12 mt-8">
            {slide.content && (
              <div className="flex-1 flex flex-col justify-center gap-6">
                {slide.content.map((item, i) => (
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                    key={i} className="flex items-start gap-4 text-xl md:text-2xl font-medium"
                  >
                    <div className="p-2 neo-pressed rounded-full shrink-0 mt-1">
                      {slide.type === 'problem' ? <Sparkles className="opacity-50" /> : <CheckCircle2 className="text-[var(--color-accent)]" />}
                    </div>
                    <span className="leading-snug">{item}</span>
                  </motion.div>
                ))}
              </div>
            )}
            
            {slide.items && (
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {slide.items.map((col, i) => (
                  <motion.div 
                    {...tiltProps}
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                    key={i} className={`neo-element p-8 h-full flex flex-col ${col.isNegative ? 'opacity-70' : 'border border-[var(--color-accent)]'}`}
                  >
                    <h3 className="text-2xl font-bold title-display mb-6 opacity-80">{col.title}</h3>
                    <ul className="space-y-4 flex-1">
                      {col.points.map((p: string, j: number) => (
                        <li key={j} className="flex gap-3 text-lg">
                          <span className={`${col.isNegative ? 'text-red-500' : 'text-green-500'} shrink-0 mt-1`}>•</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            )}

             {/* Metric highlight logic for problem */}
             {slide.metrics && !slide.items && (
               <div className="flex-1 flex items-center justify-center">
                 <motion.div 
                   {...tiltProps}
                   initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }}
                   className="neo-element p-12 text-center max-w-sm border-l-4 border-l-[var(--color-accent)]"
                 >
                   <div className="text-6xl font-bold title-display text-gradient mb-4">{slide.metrics[0].value}</div>
                   <div className="text-xl font-medium text-[var(--color-text-muted)] leading-relaxed">{slide.metrics[0].label}</div>
                 </motion.div>
               </div>
             )}
          </div>
        </div>
      );

    case 'modules':
      return (
        <div className="h-full flex flex-col">
          <PageHeader title={slide.title} subtitle={slide.subtitle} />
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 auto-rows-fr">
            {slide.items?.map((item, i) => {
              const Icon = Icons[item.icon] || Sparkles;
              return (
                <motion.div 
                  {...tiltProps}
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                  key={i} className="neo-element p-8 flex flex-col group relative overflow-hidden"
                >
                  <div className="absolute -right-4 -bottom-4 opacity-[0.03] scale-150 rotate-12 transition-transform group-hover:rotate-0">
                    <Icon size={120} />
                  </div>
                  <div className="p-4 neo-pressed rounded-2xl w-fit mb-6 text-[var(--color-accent)]">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold title-display mb-3">{item.title}</h3>
                  <p className="text-[var(--color-text-muted)] text-lg leading-relaxed flex-1">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      );

    case 'steps':
      return (
        <div className="h-full flex flex-col">
          <PageHeader title={slide.title} subtitle={slide.subtitle} />
          
          <div className="flex-1 flex flex-col justify-center gap-6 mt-8">
            {slide.items?.map((item, i) => (
              <motion.div 
                initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                key={i} className="flex items-center gap-6 glass-panel px-8 py-5 w-full max-w-4xl hover:border-[var(--color-accent)] transition-colors group cursor-default"
              >
                <div className="text-5xl font-bold title-display opacity-20 group-hover:opacity-100 group-hover:text-[var(--color-accent)] transition-all shrink-0 w-16">
                  {item.step}.
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                  <p className="text-[var(--color-text-muted)] text-lg">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );
      
    case 'market':
      return (
        <div className="h-full flex flex-col relative z-10 w-full">
          <PageHeader title={slide.title} subtitle={slide.subtitle} />
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            {slide.items?.map((item, i) => {
              const Icon = Icons[item.icon] || Zap;
              const isHeroMetric = i === 0 || i === 4; // Make the first and 5th items large
              const colSpan = isHeroMetric ? 'md:col-span-2 md:row-span-2' : 'md:col-span-2';
              const paddingClass = isHeroMetric ? 'p-10 lg:p-14 flex-col justify-center' : 'p-8 flex-row items-center';
              const valueSizeClass = isHeroMetric ? 'text-6xl lg:text-8xl mb-3' : 'text-3xl lg:text-5xl mb-1';
              const iconSize = isHeroMetric ? 40 : 28;
              
              return (
                <motion.div 
                  {...tiltProps}
                  initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.1 }}
                  key={i} className={`neo-element flex gap-6 ${colSpan} ${paddingClass}`}
                >
                  <div className={`p-4 neo-pressed rounded-full shrink-0 text-[var(--color-accent)] w-fit ${isHeroMetric ? 'mb-6 scale-125' : ''}`}>
                    <Icon size={iconSize} />
                  </div>
                  <div>
                    <div className={`${valueSizeClass} font-bold title-display text-gradient`}>{item.value}</div>
                    <div className={`${isHeroMetric ? 'text-2xl' : 'text-lg lg:text-xl'} text-[var(--color-text-muted)] font-medium leading-tight`}>{item.label}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      );

    case 'pricing':
      return (
        <div className="h-full flex flex-col text-center md:text-left">
          <PageHeader title={slide.title} subtitle={slide.subtitle} />
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mb-6 items-end">
            {slide.items?.map((item, i) => (
              <motion.div 
                {...tiltProps}
                initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                key={i} className={`neo-element p-8 flex flex-col h-full ${item.highlight ? 'border-2 border-[var(--color-accent)] scale-105 z-10 bg-[var(--color-surface)] shadow-2xl relative' : 'opacity-90'}`}
              >
                {item.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-accent)] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">Популярный</div>}
                
                <h3 className="text-2xl font-bold title-display mb-2">{item.title}</h3>
                <div className="text-[var(--color-text-muted)] font-medium mb-6 flex-1">{item.desc}</div>
                
                <div className="text-3xl lg:text-4xl font-bold title-display mb-8 font-mono">{item.price}<span className="text-base text-[var(--color-text-muted)] font-sans font-medium">/мес</span></div>
                
                <ul className="space-y-4 mb-2">
                  {item.features.map((f: string, j: number) => (
                    <li key={j} className="flex gap-3 text-sm md:text-base font-medium text-[var(--color-text-muted)]">
                       <CheckCircle2 size={18} className="text-[var(--color-accent)] shrink-0 mt-0.5" />
                       <span className="leading-tight">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center opacity-50 uppercase text-xs tracking-widest font-bold">
            {slide.footer}
          </div>
        </div>
      );

    case 'timeline':
      return (
        <div className="h-full flex flex-col">
          <PageHeader title={slide.title} subtitle={slide.subtitle} />
          
          <div className="flex-1 flex flex-col justify-center gap-4 mt-8 relative">
            <div className="absolute left-[39px] top-4 bottom-4 w-1 bg-[var(--color-text-muted)] opacity-20 rounded-full"></div>
            
            {slide.items?.map((item, i) => (
              <motion.div 
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                key={i} className="flex items-center gap-8 group"
              >
                <div className="w-20 shrink-0 flex justify-end">
                  <div className={`w-5 h-5 rounded-full neo-element z-10 transition-colors group-hover:bg-[var(--color-accent)] outline outline-4 outline-[var(--color-base)]`} />
                </div>
                <div className="neo-element p-6 flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4 group-hover:border-l-[var(--color-accent)] border-l-4 border-transparent transition-all">
                  <div>
                    <div className="text-sm font-bold text-[var(--color-accent)] uppercase tracking-wider mb-1">{item.date}</div>
                    <h4 className="text-2xl font-bold title-display">{item.title}</h4>
                  </div>
                  {item.target && (
                    <div className="glass-panel px-6 py-3 shrink-0">
                      <span className="font-semibold text-lg">{item.target}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case 'team':
      return (
         <div className="h-full flex flex-col">
          <PageHeader title={slide.title} subtitle={slide.subtitle} />
          
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 content-center items-stretch">
             {slide.items?.map((item, i) => (
               <motion.div 
                {...tiltProps}
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.1 }}
                key={i} className="neo-element p-8 flex flex-col items-center text-center group"
               >
                 <div className="w-24 h-24 rounded-full neo-pressed mb-6 flex items-center justify-center outline outline-2 outline-offset-4 outline-[var(--color-border)] group-hover:outline-[var(--color-accent)] transition-all">
                    <span className="text-3xl font-display font-medium text-[var(--color-text-muted)]">
                      {item.name.split(' ')[0][0]}{item.name.split(' ')[1]?.[0]}
                    </span>
                 </div>
                 <h4 className="text-xl font-bold mb-2 title-display">{item.name}</h4>
                 <p className="text-[var(--color-text-muted)] font-medium leading-snug">{item.role}</p>
               </motion.div>
             ))}
          </div>
         </div>
      );

    case 'contact':
      return (
        <div className="h-full flex flex-col justify-center items-center text-center">
           <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold title-display text-gradient pb-4"
          >
            {slide.title}
          </motion.h1>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-2xl font-medium mb-16 text-[var(--color-text-muted)]"
          >
             {slide.subtitle}
          </motion.h2>

          <div className="flex flex-col md:flex-row gap-6 mb-20 w-full max-w-4xl">
             {slide.content?.map((item, i) => (
               <motion.div 
                 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
                 key={i} className="neo-element p-6 flex-1 text-center font-semibold text-lg flex items-center justify-center"
               >
                 {item}
               </motion.div>
             ))}
          </div>

          <motion.div
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
             className="text-lg text-[var(--color-text-muted)] font-medium tracking-widest leading-loose"
             style={{ whiteSpace: 'pre-line' }}
          >
            {slide.footer}
          </motion.div>
        </div>
      )

    default:
      return <div>Unknown Slide Type</div>;
  }
}

function PageHeader({ title, subtitle }: { title?: string, subtitle?: string }) {
  return (
    <div className="mb-4">
      <motion.h2 
        initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        className="text-4xl md:text-5xl font-bold title-display mb-3"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-[var(--color-text-muted)] font-medium"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export default App;
