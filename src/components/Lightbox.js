// src/components/Lightbox.js
// Full-screen image viewer. Closes on the × button, Escape, or a click on the backdrop.
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 300;
  display: grid;
  place-items: center;
  padding: 4.5rem 1rem 2rem;
  background: rgba(5, 5, 5, 0.82);
  backdrop-filter: blur(10px);
`;

const Frame = styled(motion.figure)`
  position: relative;
  margin: 0;
  max-width: min(1100px, 100%);
  max-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;

  img {
    display: block;
    max-width: 100%;
    max-height: calc(100vh - 10rem);
    object-fit: contain;
    border-radius: 14px;
    background: #fff;
    box-shadow: 0 30px 90px -20px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 42, 31, 0.35);
  }

  figcaption {
    text-align: center;
    font-size: 0.9rem;
    color: #d4d4d4;
  }
  figcaption strong { color: #fff; font-weight: 600; }
`;

const Close = styled.button`
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(20, 20, 20, 0.9);
  color: #fff;
  font-size: 1.3rem;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: #e10600;
    border-color: #e10600;
  }
`;

const Lightbox = ({ image, onClose }) => {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!image) return undefined;
    const previouslyFocused = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      // Only the close button is focusable inside, so keep Tab on it.
      if (e.key === 'Tab') {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [image, onClose]);

  return createPortal(
    <AnimatePresence>
      {image && (
        <Backdrop
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Close ref={closeRef} type="button" aria-label="Close" onClick={onClose}>
            <FiX />
          </Close>
          <Frame
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={image.src} alt={image.alt} />
            {image.caption && <figcaption>{image.caption}</figcaption>}
          </Frame>
        </Backdrop>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Lightbox;
