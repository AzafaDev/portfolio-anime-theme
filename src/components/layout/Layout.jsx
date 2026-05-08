import { useEffect } from 'react';
import { gsap } from 'gsap';
import useLenis from '../../hooks/useLenis';
import Navbar from './Navbar';
import Footer from './Footer';
import CursorChibi from '../animations/CursorChibi';
import ParticleEffect from '../animations/ParticleEffect';
import DynamicLighting from '../effects/DynamicLighting';
import { MusicProvider } from '../../contexts/MusicContext';
import BackToTop from '../ui/BackToTop';

const Layout = ({ children }) => {
  useLenis();

  useEffect(() => {
    gsap.fromTo(
      'main',
      { opacity: 0, filter: 'blur(10px)' },
      { opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out' },
    );
  }, []);

  return (
    <MusicProvider>
      <div className="relative min-h-screen bg-stark-black overflow-hidden">
        <ParticleEffect />
        <DynamicLighting />
        <CursorChibi />
        <Navbar />
        <main className="md:pl-16">{children}</main>
        <BackToTop />
        <Footer />
      </div>
    </MusicProvider>
  );
};

export default Layout;
