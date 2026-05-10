import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { PAGE_CONTENT } from '../config';

interface VideoModalProps {
  onClose: () => void;
}

export default function VideoModal({ onClose }: VideoModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'var(--overlay-bg)',
        backdropFilter: 'blur(10px)',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking video
        style={{
          width: '80%', maxWidth: '1000px',
          backgroundColor: '#000',
          border: '1px solid var(--glass-border)',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          display: 'flex', flexDirection: 'column'
        }}
      >
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 24px', borderBottom: '1px solid #222'
        }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
            {PAGE_CONTENT.pitchVideoTitle}
          </h3>
          <button onClick={onClose} style={{ color: 'var(--text-secondary)', display: 'flex' }}>
            <X size={24} />
          </button>
        </div>
        
        <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#050510' }}>
          <iframe
            src="https://www.youtube.com/embed/xmkVBbhrE0E?si=hwom2FKlsPCLTZJe"
            title={PAGE_CONTENT.pitchVideoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
