import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, FileText } from 'lucide-react';
import { PAGE_CONTENT } from '../config';
import VideoModal from './VideoModal';
import SpecModal from './SpecModal';
import WaveCanvas from './WaveCanvas';

export default function LandingPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isSpecOpen, setIsSpecOpen] = useState(false);

  return (
    <div style={{
      width: '100%', minHeight: '100vh',
      backgroundColor: '#020205',
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', 
      fontFamily: "'Courier New', Courier, monospace"
    }}>
      
      <WaveCanvas />

      {/* Analytical Grid Overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
        backgroundSize: '80px 80px', pointerEvents: 'none', zIndex: 1
      }} />

      {/* Main Content Layout positioned to the left structural axis */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column', 
        justifyContent: 'center', alignItems: 'flex-start',
        padding: '8% 8%', height: '100vh',
        maxWidth: '1400px', width: '100%', margin: '0'
      }}>
        
        {/* Status Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            marginBottom: '40px'
          }}
        >
          <div style={{ width: '8px', height: '8px', backgroundColor: '#00f0ff', borderRadius: '50%' }} />
          <span style={{ color: '#00f0ff', fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase' }}>
            System // Active Attenuation Test
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          style={{ 
            fontSize: 'clamp(3.5rem, 6vw, 6rem)', 
            fontWeight: 300, letterSpacing: '-1px', lineHeight: 1.0,
            color: '#ffffff',
            marginBottom: '24px',
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          FT-NAS<br/>
          <span style={{ color: '#556677', fontSize: 'clamp(1.5rem, 3vw, 3rem)' }}>Coating Array</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          style={{ 
            color: '#8899aa', fontSize: '0.9rem', 
            lineHeight: 1.8, marginBottom: '60px', fontWeight: 400,
            maxWidth: '450px', borderLeft: '1px solid rgba(0, 240, 255, 0.3)', paddingLeft: '24px',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          {PAGE_CONTENT.description}
        </motion.div>
        
        {/* Wireframe Precision Buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.8, ease: "easeOut" }}
          style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ backgroundColor: 'rgba(0, 240, 255, 0.1)', borderColor: '#00f0ff' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsVideoOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 24px', background: 'transparent',
              border: '1px solid rgba(0, 240, 255, 0.4)',
              color: '#00f0ff', borderRadius: '0px',
              fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px',
              transition: 'all 0.3s ease', cursor: 'pointer',
              fontFamily: "'Courier New', Courier, monospace"
            }}
          >
            <Play size={14} /> Sequence
          </motion.button>
          
          <motion.button
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: '#ffffff' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsSpecOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 24px', background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff', borderRadius: '0px',
              fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px',
              transition: 'all 0.3s ease', cursor: 'pointer',
              fontFamily: "'Courier New', Courier, monospace"
            }}
          >
            <FileText size={14} /> Telemetry
          </motion.button>
        </motion.div>
        
        {/* Pure Terminal Data Matrix */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
           style={{
             display: 'flex', 
             gap: '40px', marginTop: 'auto',
             pointerEvents: 'none'
           }}
        >
          {[{
            lbl: "RADAR ABS", val: "99.8%"
          }, {
            lbl: "THERMAL DIS", val: "1.2ms"
          }, {
            lbl: "AERO PROFILE", val: "0.5mm"
          }].map((data, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.65rem', color: '#556677', letterSpacing: '2px' }}>[M_0{i+1}] {data.lbl}</span>
              <span style={{ fontSize: '1.25rem', color: '#ffffff', letterSpacing: '1px', fontFamily: "'Inter', sans-serif" }}>{data.val}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {isVideoOpen && <VideoModal onClose={() => setIsVideoOpen(false)} />}
        {isSpecOpen && <SpecModal onClose={() => setIsSpecOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
