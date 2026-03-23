import { motion } from 'framer-motion';
import { X, Download } from 'lucide-react';
import { ASSETS, PAGE_CONTENT } from '../config';

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
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%', maxWidth: '900px', height: '85vh',
          backgroundColor: '#0a0a14',
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
            {PAGE_CONTENT.specSheetTitle}
          </h3>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a 
              href={ASSETS.specSheetUrl} 
              download
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                color: 'var(--accent-cyan)', fontSize: '0.9rem'
              }}
            >
              <Download size={18} />
              Download PDF
            </a>
            <button onClick={onClose} style={{ color: 'var(--text-secondary)', display: 'flex' }}>
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div style={{ flex: 1, width: '100%', backgroundColor: '#111' }}>
          <object 
            data={ASSETS.specSheetUrl}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p style={{ color: '#fff', padding: '20px' }}>
              Your browser does not support PDFs. <a href={ASSETS.specSheetUrl} style={{ color: 'var(--accent-cyan)' }}>Download the PDF</a>.
            </p>
          </object>
        </div>
      </motion.div>
    </motion.div>
  );
}
