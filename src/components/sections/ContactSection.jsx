import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { FiSend, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { siteConfig } from '../../config/portfolio.config';
import SectionTitle from '../ui/SectionTitle';
import AnimatedButton from '../ui/AnimatedButton';

const ContactSection = () => {
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const fields = formRef.current.querySelectorAll('.form-field');
      gsap.fromTo(
        fields,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, formRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    window.location.href = `mailto:${siteConfig.contact.email}?subject=Portfolio Contact - ${name}&body=${encodeURIComponent(`From: ${email}\n\n${message}`)}`;
  };

  return (
    <section id="contact" className="diagonal-section relative py-28 md:py-32 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-stark-black/70 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-[0_0_30px_rgba(211,47,47,0.3)] border border-stark-red/10">
          <SectionTitle
            title="Hubungi Prajurit"
            subtitle="Kirim misi atau sekadar sapa di medan digital"
            glitch
          />

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="form-field">
              <label className="block font-body text-stark-cream text-sm mb-1.5">
                Nama
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 bg-stark-black/80 border border-stark-red/20 rounded-lg font-body text-stark-cream placeholder-stark-gray/50 focus:outline-none focus:border-stark-red/60 transition-colors"
                placeholder="Namamu..."
              />
            </div>

            <div className="form-field">
              <label className="block font-body text-stark-cream text-sm mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-stark-black/80 border border-stark-red/20 rounded-lg font-body text-stark-cream placeholder-stark-gray/50 focus:outline-none focus:border-stark-red/60 transition-colors"
                placeholder="email@kamu.com"
              />
            </div>

            <div className="form-field">
              <label className="block font-body text-stark-cream text-sm mb-1.5">
                Pesan
              </label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 bg-stark-black/80 border border-stark-red/20 rounded-lg font-body text-stark-cream placeholder-stark-gray/50 focus:outline-none focus:border-stark-red/60 transition-colors resize-none"
                placeholder="Tulis pesanmu..."
              />
            </div>

            <div className="form-field flex justify-center pt-2">
              <AnimatedButton
                text="Kirim Misi"
                variant="primary"
                magnetic
                type="submit"
                icon={FiSend}
              />
            </div>
          </form>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="group p-6 bg-stark-black/60 backdrop-blur-md border border-stark-red/10 rounded-xl hover:border-stark-red/40 transition-all duration-300 hover:-translate-y-1"
            >
              <FiMail className="w-7 h-7 text-stark-red mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-warrior text-stark-cream text-sm tracking-wider mb-1">Email</h3>
              <p className="font-body text-stark-gray text-sm break-all">{siteConfig.contact.email}</p>
            </a>

            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-stark-black/60 backdrop-blur-md border border-stark-red/10 rounded-xl hover:border-stark-red/40 transition-all duration-300 hover:-translate-y-1"
            >
              <FiPhone className="w-7 h-7 text-stark-red mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-warrior text-stark-cream text-sm tracking-wider mb-1">WhatsApp</h3>
              <p className="font-body text-stark-gray text-sm">+{siteConfig.contact.whatsapp}</p>
            </a>

            <div className="p-6 bg-stark-black/60 backdrop-blur-md border border-stark-red/10 rounded-xl hover:-translate-y-1 transition-all duration-300">
              <FiMapPin className="w-7 h-7 text-stark-red mx-auto mb-3" />
              <h3 className="font-warrior text-stark-cream text-sm tracking-wider mb-1">Lokasi</h3>
              <p className="font-body text-stark-gray text-sm">{siteConfig.contact.location}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
