/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Mail, 
  MapPin, 
  Phone, 
  ExternalLink, 
  ChevronRight, 
  Layout, 
  PenTool, 
  Home, 
  User, 
  Briefcase, 
  MessageSquare,
  Play
} from 'lucide-react';

// --- Types ---
interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  video?: string;
  pdf: string;
  description: string;
  fullDescription?: string;
  specs?: string[];
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'PROJECT RUMAH KAMPUNG',
    category: 'Traditional Architecture',
    image: 'https://storage.googleapis.com/static.antigravity.ai/projects/b4zmmbjtoyuejnxvoz4qzi/64049292-f02a-474d-9104-e53748282828.png',
    pdf: 'https://drive.google.com/file/d/1Pvm_-8ru8CTDxfI4i6Kaa7PrxkH8rGo2/view?usp=drive_link',
    description: 'A modern reinterpretation of traditional Malay kampung house architecture.',
    fullDescription: 'This project pays homage to traditional architectural wisdom while incorporating modern comforts. The design features elevated floors, large openings for cross-ventilation, and intricate timber detailing characteristic of the region.',
    specs: ['Style: Vernacular Modern', 'Material: Sustainable Chengal wood', 'Foundation: Elevated stilts', 'Roofing: Traditional gable design']
  },
  {
    id: '2',
    title: 'LANDSCAPE PROJECT',
    category: 'Landscape Design',
    image: 'https://storage.googleapis.com/static.antigravity.ai/projects/b4zmmbjtoyuejnxvoz4qzi/76149272-f155-475a-a4a9-7756f6f94787.png',
    pdf: 'https://drive.google.com/file/d/1Qq1-h7icqRdmFf2nxkgcp58S0Ns79cA1/view?usp=drive_link',
    description: 'An integrated landscape design that harmonizes natural elements with architectural forms.',
    fullDescription: 'This landscape project focuses on creating a seamless transition between indoor and outdoor spaces. The design incorporates native plant species, sustainable water management systems, and interactive hardscape elements.',
    specs: ['Site Area: 3,000 sqm', 'Planting: Native drought-tolerant species', 'Irrigation: Greywater recycling', 'Features: Zen garden']
  },
  {
    id: '3',
    title: 'LANDSCAPE FINAL PROJECT',
    category: 'Landscape Architecture',
    image: 'https://storage.googleapis.com/static.antigravity.ai/projects/b4zmmbjtoyuejnxvoz4qzi/66049282-f04c-474d-9104-e53748282828.png',
    pdf: 'https://drive.google.com/file/d/11vMWJh69uimZzXYlA5-lHR4iV9G2e-3z/view?usp=drive_link',
    description: 'A comprehensive landscape masterplan for a large-scale urban development.',
    fullDescription: 'The final project in a series of landscape studies, this masterplan addresses complex urban challenges through green infrastructure. It includes detailed designs for public parks, pedestrian corridors, and ecological restoration zones.',
    specs: ['Scale: Urban Masterplan', 'Focus: Ecological Restoration', 'Software: AutoCAD, SKECTHUP,ENSCAPE', 'Year: 2025']
  },
  {
    id: '4',
    title: 'INPROGRESS PROJECT',
    category: 'Ongoing Work',
    image: 'https://storage.googleapis.com/static.antigravity.ai/projects/b4zmmbjtoyuejnxvoz4qzi/11649938-f100-475a-a4a9-7756f6f94787.png',
    pdf: 'https://drive.google.com/file/d/1tJwMUgZi2RMMOW8NHG_pJ9HH3wMjf48F/view?usp=drive_link',
    description: 'A preview of a current architectural exploration focusing on sustainable urban development.',
    fullDescription: 'Currently in the conceptual phase, this project investigates new ways to integrate green spaces into high-density urban environments. The focus is on modular construction and adaptive reuse of existing structures.',
    specs: ['Phase: Schematic Design', 'Focus: Urban Sustainability', 'Software: SKECHTUP,ENSCAPE', 'Expected Completion: 2026']
  },
  {
    id: '5',
    title: 'DOUBLE STOREY PROJECT',
    category: 'Residential Architecture',
    image: 'https://storage.googleapis.com/static.antigravity.ai/projects/b4zmmbjtoyuejnxvoz4qzi/74048995-f12a-430c-8798-2947137f88a9.png',
    pdf: 'https://drive.google.com/file/d/1l4ZAUVYKyAcUwC6LsRSBd3dioD89A0Jx/view?usp=drive_link',
    description: 'A contemporary double-storey residence focusing on spatial efficiency and modern aesthetics.',
    fullDescription: 'This project explores the potential of vertical living in a compact urban lot. The design maximizes natural light and ventilation through a central atrium, creating a sense of openness and connectivity between floors.',
    specs: ['Bedrooms: 4', 'Bathrooms: 3', 'Style: Contemporary Minimalist', 'HVAC: Energy-efficient VRF system']
  },
  {
    id: '6',
    title: 'ARCH LEARNING HUB',
    category: 'Educational Architecture',
    image: 'https://drive.google.com/uc?export=view&id=1JmfnPJWW5IMJbfdti8TZf9kJNphCwKwY',
    pdf: 'https://drive.google.com/file/d/1YqsCc1ZodjCOZ7w-I30OkoE3xj8a7WFc/view?usp=drive_link',
    description: 'A modern educational facility designed to foster collaborative learning and creative exploration.',
    fullDescription: 'The Arch Learning Hub is a state-of-the-art educational center that integrates flexible learning spaces with sustainable design principles. The project focuses on creating an environment that adapts to various teaching methodologies while maintaining a strong connection to the surrounding urban fabric.',
    specs: ['Site Area: 2,500 sqm', 'Capacity: 20 Students', 'Structure: Steel & Glass', 'Sustainability: LEED Gold Certified']
  },
  {
    id: '7',
    title: 'COMMUNITY CENTER',
    category: 'Public Space Design',
    image: 'https://storage.googleapis.com/static.antigravity.ai/projects/b4zmmbjtoyuejnxvoz4qzi/25449262-f02a-474d-9104-e53748282828.png',
    pdf: 'https://drive.google.com/file/d/1Z8d7oYwA34CKuZu41WhZPvqRyESJxddo/view?usp=drive_link',
    description: 'A vibrant hub for community engagement, featuring multi-purpose halls and recreational zones.',
    fullDescription: 'This community center serves as a focal point for local social interaction. The design emphasizes accessibility and inclusivity, providing spaces for workshops, cultural events, and community gatherings under one roof.',
    specs: ['Total Floor Area: 1,800 sqm', 'Facilities: Theater, Library, Gym', 'Materials: Recycled brick, local timber', 'Accessibility: Fully ADA compliant']
  },
  {
    id: '8',
    title: 'MY HOUSE PROJECT',
    category: 'Interior Design',
    image: 'https://picsum.photos/seed/myhouse/800/600',
    pdf: 'https://drive.google.com/file/d/1_2x8yjlFQlZC29MW6llgfDEob1ZIHEPd/view?usp=drive_link',
    description: 'A personal exploration of residential interior spaces and functional layout optimization.',
    fullDescription: 'An intimate look at interior space planning. This project explores how minimalist design can enhance daily life through clever storage solutions and a neutral color palette.',
    specs: ['Theme: Minimalist Zen', 'Lighting: Indirect LED systems', 'Furniture: Custom built-ins', 'Flooring: Polished concrete']
  }
];

const SECTIONS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
  { id: 'contact', label: 'Contact', icon: MessageSquare },
];

// --- Components ---

const ProgressIndicator = ({ activeSection }: { activeSection: string }) => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-8">
      <div className="relative w-[1px] h-64 bg-white/10 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] origin-top"
          style={{ scaleY }}
        />
      </div>
      <div className="flex flex-col gap-6">
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <a 
              key={section.id}
              href={`#${section.id}`}
              className="group relative flex items-center gap-4"
            >
              <div 
                className={`w-[25px] h-[25px] rounded-[25px] border transition-all duration-500 flex items-center justify-center
                  ${isActive 
                    ? 'bg-white border-white shadow-[0_0_15px_rgba(255,255,255,0.4)] text-primary' 
                    : 'border-white/20 hover:border-white/50 text-white/40'}`}
              >
                <section.icon size={12} />
              </div>
              <span 
                className={`absolute left-10 whitespace-nowrap text-xs font-mono uppercase tracking-widest transition-all duration-500
                  ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
              >
                {section.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative glass rounded-[25px] overflow-hidden flex flex-col"
    >
      <div className="aspect-[4/3] overflow-hidden rounded-[25px] m-2">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{project.category}</span>
        <h3 className="text-xl font-bold mt-2 mb-4">{project.title}</h3>
        
        <div className="relative">
          <p className={`text-sm text-white/60 mb-4 transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
            {isExpanded ? project.fullDescription || project.description : project.description}
          </p>
          
          <AnimatePresence>
            {isExpanded && project.specs && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-white/10 space-y-2 mb-6">
                  <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Technical Specs</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {project.specs.map((spec, i) => (
                      <li key={i} className="text-xs text-white/70 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-white/30" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex gap-4">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
              <ChevronRight size={12} className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
            </button>
            <button 
              onClick={() => window.open(project.pdf)}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
            >
              <Download size={14} />
              PDF
            </button>
          </div>
          <ChevronRight size={16} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-white selection:text-black">
      {/* Background Grid */}
      <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />

      {/* Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-4xl glass rounded-[25px] px-8 py-4 flex items-center justify-between">
        <div className="font-mono text-sm tracking-tighter font-bold">M. DANIAL</div>
        <div className="hidden md:flex items-center gap-8">
          {SECTIONS.map((s) => (
            <a 
              key={s.id} 
              href={`#${s.id}`}
              className={`text-xs uppercase tracking-widest font-medium transition-colors hover:text-white
                ${activeSection === s.id ? 'text-white' : 'text-white/40'}`}
            >
              {s.label}
            </a>
          ))}
        </div>
        <button 
          onClick={() => window.open('https://drive.google.com/file/d/1OCtlbgOFNtBnihcWJ82yAr_h1SlN2h95/view?usp=drive_link', '_blank')}
          className="glass px-6 py-2 rounded-[25px] text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-primary transition-all flex items-center gap-2"
        >
          <Download size={14} />
          CV
        </button>
      </nav>

      <ProgressIndicator activeSection={activeSection} />

      <main className="relative z-10 container mx-auto px-6 lg:pl-32">
        
        {/* HOME SECTION */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full h-[80vh] md:h-[90vh] glass rounded-[32px] relative overflow-hidden flex flex-col items-center justify-center text-center p-6 md:p-12"
          >
            {/* Background Image with Subject */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://storage.googleapis.com/static.antigravity.ai/projects/b4zmmbjtoyuejnxvoz4qzi/95d7f482-f777-4049-bdbc-9f8a104a0bac.png" 
                alt="Muhammad Danial - Architectural Portfolio" 
                className="w-full h-full object-cover opacity-60 scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/10 to-primary" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mb-4"
              >
                <span className="text-[10px] font-mono text-white/60 uppercase tracking-[0.5em]">Architectural Portfolio</span>
              </motion.div>

              <motion.h1 
                initial={{ letterSpacing: '0.1em', opacity: 0 }}
                animate={{ letterSpacing: '0.2em', opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] font-black uppercase mb-6 leading-none"
              >
                Danial
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xs sm:text-sm md:text-xl text-white/80 tracking-[0.3em] uppercase max-w-2xl px-4 font-light"
              >
                Architectural Portfolio
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-12 flex flex-col sm:flex-row gap-6 w-full sm:w-auto px-6 sm:px-0"
              >
                <a href="#portfolio" className="bg-white text-primary px-10 py-5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform text-center shadow-2xl shadow-white/10">
                  Explore Work
                </a>
                <a href="#contact" className="glass px-10 py-5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors text-center border border-white/20">
                  Contact Me
                </a>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="min-h-screen py-24">
          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-bold uppercase tracking-tighter">Spec Sheet</h2>
              <div className="h-[1px] flex-1 bg-white/10" />
              <span className="font-mono text-xs text-white/40">01 / 04</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Academic History */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass rounded-[25px] p-10 flex flex-col gap-8"
              >
                <div className="flex items-center gap-3 text-white/60">
                  <PenTool size={18} />
                  <h3 className="text-xs uppercase tracking-widest font-bold">Academic History</h3>
                </div>
                
                <div className="space-y-8">
                  <div className="relative pl-6 border-l border-white/10">
                    <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-white" />
                    <span className="text-[10px] font-mono text-white/40 uppercase">2024 - Present</span>
                    <h4 className="text-xl font-bold mt-1">Diploma Seni Bina</h4>
                    <p className="text-sm text-white/60">Politeknik Merlimau, Melaka</p>
                    <div className="mt-2 inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono">CGPA: 3.67</div>
                  </div>

                  <div className="relative pl-6 border-l border-white/10">
                    <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-white/40" />
                    <span className="text-[10px] font-mono text-white/40 uppercase">2021 - 2023</span>
                    <h4 className="text-xl font-bold mt-1">Sijil Teknologi Seni Bina</h4>
                    <p className="text-sm text-white/60">Kolej Komuniti Segamat 2</p>
                    <div className="mt-2 inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono">CGPA: 3.69</div>
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-white/10">
                  <p className="text-sm leading-relaxed text-white/70 italic">
                    "Highly motivated third-year Architecture student focused on building a career through practical exposure and professional skill development."
                  </p>
                </div>
              </motion.div>

              {/* Technical Skills */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass rounded-[25px] p-10 flex flex-col gap-8"
              >
                <div className="flex items-center gap-3 text-white/60">
                  <Layout size={18} />
                  <h3 className="text-xs uppercase tracking-widest font-bold">Technical Proficiency</h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { name: 'AutoCAD', level: 'Intermediate' },
                    { name: 'SketchUp', level: 'Advanced' },
                    { name: 'Enscape', level: 'Advanced' },
                    { name: 'Revit', level: 'Basic' },
                    { name: 'Presentation', level: 'Intermediate' },
                    { name: 'Canva', level: 'Advanced' },
                  ].map((skill) => (
                    <div key={skill.name} className="flex flex-col gap-2">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-bold">{skill.name}</span>
                        <span className="text-[10px] font-mono text-white/40">{skill.level}</span>
                      </div>
                      <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: skill.level === 'Advanced' ? '90%' : skill.level === 'Intermediate' ? '65%' : '30%' }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between p-4 glass rounded-[15px]">
                    <span className="text-xs uppercase tracking-widest font-bold">Communicative English</span>
                    <span className="text-[10px] font-mono px-2 py-1 bg-white/10 rounded">Intermediate</span>
                  </div>
                  <div className="flex items-center justify-between p-4 glass rounded-[15px]">
                    <span className="text-xs uppercase tracking-widest font-bold">Malay Language</span>
                    <span className="text-[10px] font-mono px-2 py-1 bg-white/10 rounded">Advanced</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="min-h-screen py-24">
          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-bold uppercase tracking-tighter">Production Line</h2>
              <div className="h-[1px] flex-1 bg-white/10" />
              <span className="font-mono text-xs text-white/40">02 / 04</span>
            </div>

            {/* Video Showcase */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full aspect-video glass rounded-[25px] overflow-hidden relative group cursor-pointer"
              onClick={() => window.open('https://drive.google.com/file/d/1Qj5VePoFHoe_HNeBvCNgpoyHTX-y--kU/view?usp=drive_link', '_blank')}
            >
              <img 
                src="https://storage.googleapis.com/static.antigravity.ai/projects/b4zmmbjtoyuejnxvoz4qzi/25449262-f02a-474d-9104-e53748282828.png" 
                alt="Community Center Showcase" 
                className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform group">
                  <Play fill="white" className="ml-1" />
                </div>
              </div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-bold uppercase">Project Showcase</h3>
                <p className="text-sm text-white/60">Architectural Walkthrough & Design Process</p>
              </div>
            </motion.div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROJECTS.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="min-h-screen py-24 flex items-center justify-center">
          <div className="w-full max-w-4xl px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-6xl md:text-8xl font-black uppercase mb-12 tracking-tighter">Contact</h2>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
                <div className="flex flex-col items-center gap-4 group cursor-pointer">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all duration-500">
                    <Mail size={24} />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-white/40 group-hover:text-white">Email</span>
                  <span className="text-sm font-medium">muhammaddanialkasim003@gmail.com</span>
                </div>

                <div className="flex flex-col items-center gap-4 group cursor-pointer">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all duration-500">
                    <Phone size={24} />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-white/40 group-hover:text-white">Phone</span>
                  <span className="text-sm font-medium">+601139626121</span>
                </div>

                <div className="flex flex-col items-center gap-4 group cursor-pointer">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all duration-500">
                    <MapPin size={24} />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-white/40 group-hover:text-white">Location</span>
                  <span className="text-sm font-medium uppercase">Sungai Buloh, Selangor</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 lg:pl-32 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
            © 2026 MUHAMMAD DANIAL. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
