import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface SpecModalProps {
  onClose: () => void;
}

export default function SpecModal({ onClose }: SpecModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
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
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '95%', maxWidth: '1200px', height: '90vh',
          backgroundColor: '#0a0f1c',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)',
          display: 'flex', flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)',
          backgroundColor: '#0a0f1c',
          flexShrink: 0
        }}>
          <h3 style={{
            fontSize: '0.8rem', color: '#00f0ff',
            letterSpacing: '3px', textTransform: 'uppercase',
            fontFamily: "'Courier New', Courier, monospace",
            margin: 0
          }}>
            FT-NAS // Spec Sheet
          </h3>
          <button
            onClick={onClose}
            style={{
              color: '#556677', display: 'flex', alignItems: 'center',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#556677')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Iframe containing the Ftnasspecsheet app */}
        <div style={{ flex: 1, width: '100%', overflow: 'hidden' }}>
          <iframe
            src="/specsheet/index.html"
            title="FT-NAS Spec Sheet"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: '#0a0f1c'
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
