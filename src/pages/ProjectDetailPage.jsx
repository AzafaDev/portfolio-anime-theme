import { useParams } from 'react-router-dom';
import { siteConfig } from '../config/portfolio.config';
import SectionTitle from '../components/ui/SectionTitle';
import SkillPill from '../components/ui/SkillPill';
import ScrollReveal from '../components/animations/ScrollReveal';
import AnimatedButton from '../components/ui/AnimatedButton';
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = siteConfig.projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-body text-stark-gray text-xl">Proyek tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <AnimatedButton
            text="Kembali ke Beranda"
            variant="secondary"
            onClick={() => window.history.back()}
            icon={FiArrowLeft}
            className="mb-8"
          />
        </ScrollReveal>

        <ScrollReveal direction="up" blur>
          <h1 className="font-warrior text-4xl md:text-6xl text-stark-cream mb-4">
            {project.title}
          </h1>
          <p className="font-body text-stark-gray text-lg max-w-2xl">
            {project.description}
          </p>
          <div className="flex gap-4 mt-6">
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <AnimatedButton text="Live Demo" variant="primary" icon={FiExternalLink} />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <AnimatedButton text="GitHub" variant="secondary" icon={FiGithub} />
              </a>
            )}
          </div>
        </ScrollReveal>

        <section className="mt-20">
          <SectionTitle title="Tech Stack" subtitle="Senjata yang digunakan dalam misi ini." glitch />
          <div className="flex flex-wrap gap-3 justify-center">
            {project.tech.map((tech, i) => (
              <SkillPill key={tech} skill={{ name: tech, level: 80 }} index={i} />
            ))}
          </div>
        </section>

        <section className="mt-20">
          <SectionTitle title="Fitur Unggulan" subtitle="Inovasi yang membuat proyek ini tangguh." />
          <div className="grid md:grid-cols-2 gap-6">
            {project.features.map((feature, i) => (
              <ScrollReveal key={i} direction={i % 2 === 0 ? 'left' : 'right'}>
                <div className="p-6 bg-stark-black/60 border border-stark-red/20 rounded-xl backdrop-blur-md hover:border-stark-red/50 transition-all">
                  <span className="text-3xl mb-3 block">{feature.icon}</span>
                  <h3 className="font-warrior text-stark-red text-xl mb-2">{feature.title}</h3>
                  <p className="font-body text-stark-gray text-sm">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <SectionTitle title="Galeri" subtitle="Tampilan medan pertempuran." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((img, i) => (
              <ScrollReveal key={i} blur>
                <img
                  src={img}
                  alt={`Screenshot ${i + 1}`}
                  className="w-full h-auto rounded-lg border border-stark-red/20 hover:scale-105 transition-transform duration-500"
                />
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="mt-20 text-center">
          <SectionTitle title="Arsitektur Misi" subtitle="Bagaimana semua sistem terhubung." />
          <div className="bg-stark-black/60 p-8 rounded-xl border border-stark-red/20">
            <p className="text-stark-gray">[ Diagram arsitektur akan ditampilkan di sini ]</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
