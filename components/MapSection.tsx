'use client';

import { motion } from 'framer-motion';

export default function MapSection() {
  return (
    <motion.section
      className="h-full w-screen flex flex-col items-center justify-center bg-gray-100"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.674052471982!2d13.060287876240748!3d43.82111994155404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132d11945d75a00b%3A0x15cfb90735af8e88!2sStr.%20Nazionale%20Adriatica%20Sud%2C%2044%2C%2061032%20Fano%20PU!5e0!3m2!1sit!2sit!4v1753086123982!5m2!1sit!2sit" // ← Inserisci il tuo link qui
        className="w-screen h-screen border-0"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </motion.section>
  );
}

