import { FiGithub } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';
import { siteConfig } from '../../config/portfolio.config';

const iconMap = {
  FiGithub: FiGithub,
  FaInstagram: FaInstagram,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-stark-black border-t border-stark-red/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <img
                src="/images/anime/stark_frieren_chibi.png"
                alt="Stark chibi mascot"
                className="w-8 h-8 object-contain animate-float inline-block align-middle"
                style={{ animationDuration: '4s' }}
                title="Stark Chibi"
              />
              <span className="font-warrior text-xl text-stark-red tracking-wider">
                ⚔ AZAFA
              </span>
            </div>
            <p className="text-stark-gray text-sm mt-1">
              &copy; {currentYear} {siteConfig.personal.name}. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {siteConfig.socials.map((social) => {
              const Icon = iconMap[social.icon];
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stark-cream/60 hover:text-stark-red transition-colors"
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
