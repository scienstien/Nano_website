import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, FileText } from 'lucide-react';
import { PAGE_CONTENT } from '../config';
import VideoModal from './VideoModal';
import SpecModal from './SpecModal';

export default function OverlayUI() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isSpecOpen, setIsSpecOpen] = useState(false);

  return (
    <>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', 
        justifyContent: 'center', alignItems: 'flex-start',
        padding: '10%', zIndex: 10,
        pointerEvents: 'none' // Let clicks pass through to 3D canvas except on children
      }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          style={{ maxWidth: '600px', pointerEvents: 'auto' }}
        >
          <h2 style={{ 
            color: 'var(--accent-cyan)', 
            fontSize: '1rem', 
            letterSpacing: '4px', 
            marginBottom: '10px',
            textTransform: 'uppercase'
          }}>
            {PAGE_CONTENT.tagline}
          </h2>
          
          <h1 className="outfit-font" style={{ 
            fontSize: '5rem', 
            fontWeight: 700, 
            letterSpacing: '-2px',
            lineHeight: 1,
            marginBottom: '20px',
            textShadow: '0 0 20px rgba(0, 240, 255, 0.3)'
          }}>
            {PAGE_CONTENT.title}
          </h1>
          
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '1.1rem', 
            lineHeight: 1.6,
            marginBottom: '40px',
            fontWeight: 300
          }}>
            {PAGE_CONTENT.description}
          </p>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsVideoOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '14px 28px',
                backgroundColor: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid var(--accent-cyan)',
                color: 'white',
                borderRadius: '4px',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease'
              }}
            >
              <Play size={18} color="var(--accent-cyan)" />
              Pitch Video
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsSpecOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '14px 28px',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'var(--text-secondary)',
                borderRadius: '4px',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease'
              }}
            >
              <FileText size={18} />
              Spec Sheet
            </motion.button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isVideoOpen && <VideoModal onClose={() => setIsVideoOpen(false)} />}
        {isSpecOpen && <SpecModal onClose={() => setIsSpecOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
