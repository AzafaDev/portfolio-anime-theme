export const siteConfig = {
  personal: {
    name: 'Akmal Dzakwan Faiz',
    title: 'Software Engineer | Web Developer',
    tagline: 'Full-stack engineer forging scalable and high-performance web applications --- with the heart of a warrior.',
    bio: `Seorang prajurit kode yang berangkat dari rasa penasaran sederhana: bagaimana website benar‑benar bekerja. Tumbuh bersama ayah seorang SEO specialist, saya sudah akrab dengan website dan traffic sejak dini. Sebelum menyelami framework modern, saya membangun website bisnis nyata menggunakan WordPress---menangani tata letak, SEO, hingga integrasi WhatsApp commerce. Titik balik terjadi saat melihat website Next.js dengan performa sempurna di YouTube; sejak itu saya mendalami full‑stack secara otodidak dan melalui pelatihan intensif. Kini senjata utama saya adalah Next.js, React, Node.js, TypeScript, PostgreSQL, Prisma, dan Tailwind. Di luar jam bertempur, saya juga menjelajahi Golang secara otodidak untuk menempa diri di sisi backend yang lebih tangguh.`,
    photo: '/src/assets/images/your-photo.jpeg',
  },

  socials: [
    { name: 'GitHub', url: 'https://github.com/AzafaDev', icon: 'FiGithub' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'FaInstagram' },
  ],

  projects: [
    {
      id: 0,
      title: 'Kinetix Events',
      slug: 'kinetix-events',
      shortDesc: 'Platform manajemen acara end-to-end dengan transaksi atomik dan sistem referral.',
      description: 'Platform manajemen acara end-to-end berskala enterprise yang memfasilitasi transaksi tiket secara aman, sistem referral berbasis poin, dan manajemen organizer yang komprehensif.',
      fullDescription: 'Kinetix Events adalah platform manajemen acara end-to-end berskala enterprise yang saya kembangkan dari nol. Proyek ini memfasilitasi transaksi tiket secara atomik (menggunakan Prisma transaction API), sistem referral berbasis poin yang bisa ditukar menjadi diskon, serta manajemen organizer yang komprehensif. Dibangun dengan fokus pada integritas data transaksional, skalabilitas arsitektur, dan pengalaman pengguna yang mulus. Setiap pembelian tiket berjalan dalam satu transaksi database untuk mencegah kehilangan data saat pembayaran gagal. Sistem verifikasi email OTP memastikan keamanan akun pengguna, sementara rate limiter melindungi endpoint dari abuse.',
      tech: [
        'Node.js', 'Express 5', 'TypeScript', 'PostgreSQL', 'Prisma',
        'JWT', 'Cloudinary', 'Resend', 'Handlebars', 'React 19',
        'Vite', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'Formik + Zod',
      ],
      features: [
        {
          title: 'Atomic Transaction',
          desc: 'Pembelian tiket, pemotongan poin, dan kupon berjalan dalam satu transaksi database Prisma untuk mencegah kehilangan data.',
          icon: '🔒',
        },
        {
          title: 'OTP Email Verification',
          desc: 'Sistem verifikasi email menggunakan OTP yang dikirim via Resend, dengan rate limiter untuk keamanan.',
          icon: '✉️',
        },
        {
          title: 'Referral Point System',
          desc: 'Pengguna mendapat poin dari referral dan bisa digunakan sebagai diskon, meningkatkan retensi.',
          icon: '🎁',
        },
        {
          title: 'Organizer Management',
          desc: 'Dashboard lengkap untuk organizer mengelola acara, tiket, dan laporan penjualan.',
          icon: '📊',
        },
        {
          title: 'Event Discovery',
          desc: 'Pencarian dan filter acara berdasarkan kategori, lokasi, dan tanggal dengan UI responsif.',
          icon: '🔍',
        },
        {
          title: 'Secure Authentication',
          desc: 'Autentikasi JWT dengan role-based access control (user, organizer, admin).',
          icon: '🔐',
        },
      ],
      image: '/images/projects/project1a.png',
      images: [
        '/images/projects/project1a.png',
        '/images/projects/project1b.png',
        '/images/projects/project1c.png',
        '/images/projects/project1d.png',
      ],
      link: 'https://kinetix-events.vercel.app/',
      github: 'https://github.com/AzafaDev/kinetix-events',
    }
  ],

  skills: [
    { name: 'React', level: 92, icon: 'SiReact' },
    { name: 'Next.js', level: 85, icon: 'SiNextdotjs' },
    { name: 'JavaScript', level: 88, icon: 'SiJavascript' },
    { name: 'TypeScript', level: 80, icon: 'SiTypescript' },
    { name: 'Tailwind CSS', level: 95, icon: 'SiTailwindcss' },
    { name: 'Node.js', level: 78, icon: 'SiNodedotjs' },
    { name: 'Express', level: 75, icon: 'SiExpress' },
    { name: 'PostgreSQL', level: 72, icon: 'SiPostgresql' },
    { name: 'Prisma', level: 70, icon: 'SiPrisma' },
    { name: 'GitHub', level: 90, icon: 'SiGithub' },
    { name: 'Vercel', level: 82, icon: 'SiVercel' },
    { name: 'NPM', level: 88, icon: 'SiNpm' },
    { name: 'GSAP', level: 85, icon: 'SiGreensock' },
    { name: 'Golang', level: 65, icon: 'SiGo' },
  ],

  experience: [
    {
      id: 1,
      period: '2025',
      label: '// Self-Learning',
      title: 'Started Web Development Journey',
      description: 'Began exploring modern web development after discovering the performance potential of frameworks like Next.js. This sparked a deeper interest in building fast and scalable web applications.',
      tags: ['Learning JavaScript fundamentals', 'Exploring modern web frameworks', 'Building small hands-on projects'],
    },
    {
      id: 2,
      period: '2025',
      label: '// Independent Projects',
      title: 'Freelance WordPress Developer',
      description: 'Built several business websites for real clients, including company profiles and product catalog sites. Gained experience in layout design, theme customization, and client requirements.',
      tags: ['WordPress theme setup and customization', 'Website layout and visual design', 'SEO optimization and integration', 'WhatsApp commerce integration'],
    },
    {
      id: 3,
      period: '2026 -- Present',
      label: '// Purwadhika Digital Technology School',
      title: 'Full-Stack Software Development Student',
      description: 'Participating in an intensive bootcamp program focused on modern full‑stack development with the JavaScript ecosystem, emphasizing scalable and performant web applications.',
      tags: ['Next.js & React web development', 'Node.js API development', 'Database design with PostgreSQL and Prisma', 'Building scalable, maintainable, and performant web apps'],
    },
  ],

  animeFavorites: [
    {
      title: 'Sousou no Frieren',
      quote: 'Aku... tidak akan membiarkan dia mati.',
      character: 'Stark',
      image: '/src/assets/images/anime/frieren.jpg',
    },
    {
      title: 'Vinland Saga',
      quote: 'Kau tidak punya musuh. Tidak ada seorang pun yang pantas kau sakiti.',
      character: 'Thors',
      image: '/src/assets/images/anime/vinland.jpg',
    },
    {
      title: 'Attack on Titan',
      quote: 'Jika kau menang, kau hidup. Jika kau kalah, kau mati.',
      character: 'Eren Yeager',
      image: '/src/assets/images/anime/aot.jpg',
    },
    {
      title: 'Demon Slayer',
      quote: 'Bekerja keras dan jangan pernah menyerah.',
      character: 'Tanjiro',
      image: '/src/assets/images/anime/demonslayer.jpg',
    },
  ],

  contact: {
    email: 'akmal.dz.f@gmail.com',
    whatsapp: '6288225659672',
    location: 'Tangerang, ID',
  },

  stats: [
    { label: 'Tahun Pengalaman', value: 0, suffix: '+' },
    { label: 'Proyek Selesai', value: 3, suffix: '+' },
    { label: 'Teknologi Dikuasai', value: 12, suffix: '' },
  ],
};
