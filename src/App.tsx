import { ArrowUpRight, ExternalLink, Facebook, Github, Menu, ChevronDown, Mail, Phone } from 'lucide-react';
import {
  motion,
  type MotionStyle,
  useScroll,
  useTransform,
  type Transition,
} from 'framer-motion';
import {
  ElementType,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const heroExpressions = [
  {
    src: '/avatars/01_smug_smirk.png',
    alt: 'Zney avatar with a smug smirk',
    label: 'Smug smirk',
  },
  {
    src: '/avatars/02_happy_smile.png',
    alt: 'Zney avatar with a happy smile',
    label: 'Happy smile',
  },
  {
    src: '/avatars/03_deadpan.png',
    alt: 'Zney avatar with a deadpan expression',
    label: 'Deadpan',
  },
  {
    src: '/avatars/04_angry.png',
    alt: 'Zney avatar with an angry expression',
    label: 'Angry mode',
  },
];

const developerFocus = [
  'Frontend architecture',
  'React and TypeScript',
  'API integration',
  'Performance tuning',
  'Product-minded UI',
  'Shipping end to end',
];

const developerStats = [
  { value: '3+', label: 'Years studying IT and building projects' },
  { value: '10+', label: 'Projects completed during coursework and personal time' },
  { value: '24/7', label: 'Learning new technologies and debugging' },
  { value: '1', label: 'Goal: become a proficient Software Engineer' },
];

const terminalPreview = [
  { prompt: 'stack', output: 'React, TypeScript, Java, C++, Python, SQL' },
  { prompt: 'focus', output: 'frontend development, AI algorithms, and clean architecture' },
  { prompt: 'workflow', output: 'learn -> design -> code -> debug -> submit' },
  { prompt: 'current', output: '3rd-year university student exploring web and AI' },
];

const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const services = [
  {
    number: '01',
    name: 'Full Stack Development',
    description:
      'Building complete web applications from end to end, handling both robust Backend architecture and interactive Frontend interfaces.',
  },
  {
    number: '02',
    name: 'Algorithm & Logic',
    description:
      'Applying data structures, algorithms, and logical problem-solving to optimize code performance and build AI-driven logic.',
  },
  {
    number: '03',
    name: 'Mobile Development',
    description:
      'Developing cross-platform and native mobile applications using React Native and Java to deliver seamless user experiences.',
  },
  {
    number: '04',
    name: 'Database Design',
    description:
      'Structuring relational databases (SQL) to ensure efficient data retrieval and maintain data integrity for web applications.',
  },
  {
    number: '05',
    name: 'Academic Research',
    description:
      'Exploring and implementing concepts from computer science coursework into practical, real-world projects.',
  },
];

const projects = [
  {
    number: '01',
    category: 'Personal',
    name: 'AI English Learning',
    image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    link: 'https://github.com/psy-zney/ai-english-learning'
  },
  {
    number: '02',
    category: 'University',
    name: 'DoAnOOP',
    image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    link: 'https://github.com/psy-zney/DoAnOOP'
  },
  {
    number: '03',
    category: 'Algorithm',
    name: 'AI Hill Climbing TSP',
    image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    link: 'https://github.com/psy-zney/AI_Hill_Climbing_TSP'
  },
  {
    number: '04',
    category: 'Personal',
    name: 'Beatsync',
    image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    link: 'https://github.com/psy-zney/beatsync'
  },
  {
    number: '05',
    category: 'Personal',
    name: 'Security',
    image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    link: 'https://github.com/psy-zney/Security'
  },
  {
    number: '06',
    category: 'Personal',
    name: 'Mandycrimson',
    image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    link: 'https://github.com/psy-zney/mandycrimson'
  }
];

type FadeInProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  onLoad?: boolean;
  x?: number;
  y?: number;
};

function FadeIn({
  as = 'div',
  children,
  className,
  delay = 0,
  duration = 0.7,
  onLoad = false,
  x = 0,
  y = 30,
}: FadeInProps) {
  const MotionTag = useMemo(() => motion.create(as), [as]);
  const transition: Transition = {
    duration,
    delay,
    ease: [0.25, 0.1, 0.25, 1],
  };

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={onLoad ? { opacity: 1, x: 0, y: 0 } : undefined}
      whileInView={onLoad ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={transition}
    >
      {children}
    </MotionTag>
  );
}

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
};

function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate3d(0, 0, 0)');
  const [transition, setTransition] = useState(inactiveTransition);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const element = ref.current;

      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const isInsideRange =
        event.clientX >= rect.left - padding &&
        event.clientX <= rect.right + padding &&
        event.clientY >= rect.top - padding &&
        event.clientY <= rect.bottom + padding;

      if (!isInsideRange) {
        setTransition(inactiveTransition);
        setTransform('translate3d(0, 0, 0)');
        return;
      }

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = (event.clientX - centerX) / strength;
      const offsetY = (event.clientY - centerY) / strength;

      setTransition(activeTransition);
      setTransform(`translate3d(${offsetX}px, ${offsetY}px, 0)`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activeTransition, inactiveTransition, padding, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform, transition, willChange: 'transform' }}
    >
      {children}
    </div>
  );
}

function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setContactOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { label: 'Zney (Main Page)', href: '#' },
    { label: 'Beatsync', href: 'https://beatsync.zney295.id.vn' },
    { label: 'Security', href: 'https://zney295.id.vn/Security/' },
    { label: 'Luckyfoods', href: 'https://github.com/psy-zney/luckyfoods' },
    { label: 'Mandycrimson', href: 'https://zney295.id.vn/mandycrimson/' },
    { label: 'Learning English', href: 'https://study.zney295.id.vn' },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 sm:p-2.5 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105"
        aria-label="Menu"
      >
        <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#D7E2EA]" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-4 flex flex-col gap-2 rounded-3xl p-3 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] min-w-[240px] z-50 backdrop-blur-xl bg-[#0c0c0c]/90">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 px-4 py-3 rounded-2xl transition-all text-sm font-bold uppercase tracking-widest text-left"
              {...(item.href.startsWith('http') ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {item.label}
            </a>
          ))}

          <div className="relative">
            <button
              onClick={() => setContactOpen(!contactOpen)}
              className="w-full flex items-center justify-between text-white hover:bg-white/10 px-4 py-3 rounded-2xl transition-all text-sm font-bold uppercase tracking-widest"
            >
              Contact
              <ChevronDown className={`w-4 h-4 transition-transform ${contactOpen ? 'rotate-180' : ''}`} />
            </button>
            {contactOpen && (
              <div className="flex flex-col gap-2 p-2 mt-1 bg-white/5 rounded-2xl">
                <a
                  href="https://www.facebook.com/psyotic.zney/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:bg-white/20 px-4 py-2 rounded-xl transition-all flex items-center gap-3 text-xs font-bold uppercase tracking-widest"
                >
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
                <a
                  href="https://github.com/psy-zney"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:bg-white/20 px-4 py-2 rounded-xl transition-all flex items-center gap-3 text-xs font-bold uppercase tracking-widest"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=lequangkhanh295@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:bg-white/20 px-4 py-2 rounded-xl transition-all flex items-center gap-3 text-xs font-bold uppercase tracking-widest"
                >
                  <Mail className="w-4 h-4" /> Gmail
                </a>
                <a
                  href="tel:0394426827"
                  className="text-white hover:bg-white/20 px-4 py-2 rounded-xl transition-all flex items-center gap-3 text-xs font-bold uppercase tracking-widest"
                >
                  <Phone className="w-4 h-4" /> 0394426827
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ContactButton() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base transition-all duration-300 hover:scale-105 bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-white/20 hover:border-white/30"
      >
        <span>Contact Me</span>
        <ArrowUpRight
          className="hidden h-4 w-4 sm:block md:h-5 md:w-5"
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full mt-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 rounded-3xl p-3 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] min-w-[220px] z-50 backdrop-blur-xl bg-white/10"
        >
          <a
            href="https://www.facebook.com/psyotic.zney/"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:bg-white/20 px-4 py-3 rounded-2xl transition-all flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest"
          >
            <Facebook className="w-5 h-5" />
            Facebook
          </a>
          <a
            href="https://github.com/psy-zney"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:bg-white/20 px-4 py-3 rounded-2xl transition-all flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest"
          >
            <Github className="w-5 h-5" />
            GitHub
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=lequangkhanh295@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:bg-white/20 px-4 py-3 rounded-2xl transition-all flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest"
          >
            <Mail className="w-5 h-5" />
            Gmail
          </a>
          <a
            href="tel:0394426827"
            className="text-white hover:bg-white/20 px-4 py-3 rounded-2xl transition-all flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest"
          >
            <Phone className="w-5 h-5" />
            0394426827 (Zalo)
          </a>
        </div>
      )}
    </div>
  );
}

function LiveProjectButton({ href }: { href?: string }) {
  const actualHref = href || "#projects";
  return (
    <a
      href={actualHref}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base"
    >
      <span>View on GitHub</span>
      <ExternalLink className="hidden h-4 w-4 sm:block" aria-hidden="true" />
    </a>
  );
}

function HeroSection() {
  const [activeExpression, setActiveExpression] = useState(0);
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const avatarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const avatarElement = avatarRef.current;

    if (!avatarElement) {
      return;
    }

    let isAvatarVisible = true;
    let lastScrollY = window.scrollY;
    let scrollAccumulator = 0;
    const scrollThreshold = 120;
    const cycleExpression = (direction: 1 | -1 = 1) => {
      setActiveExpression((current) => {
        const nextIndex =
          (current + direction + heroExpressions.length) % heroExpressions.length;
        return nextIndex;
      });
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        isAvatarVisible = entry.isIntersecting;
      },
      { threshold: 0.35 },
    );

    observer.observe(avatarElement);

    const handleScroll = () => {
      if (!isAvatarVisible) {
        lastScrollY = window.scrollY;
        scrollAccumulator = 0;
        return;
      }

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (delta === 0) {
        return;
      }

      scrollAccumulator += delta;

      if (Math.abs(scrollAccumulator) < scrollThreshold) {
        return;
      }

      cycleExpression(scrollAccumulator > 0 ? 1 : -1);
      scrollAccumulator = 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveExpression((current) => (current + 1) % heroExpressions.length);
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="relative flex h-screen flex-col overflow-x-clip bg-[#0C0C0C]">
      <FadeIn
        as="nav"
        y={-20}
        onLoad
        className="z-20 px-6 pt-6 md:px-10 md:pt-8"
      >
        <div className="flex w-full items-center justify-between gap-1 text-[10px] sm:gap-2 sm:text-sm font-medium uppercase tracking-wider text-[#D7E2EA] md:text-lg lg:text-[1.4rem]">
          {['About', 'Tech', 'Projects'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105"
            >
              {item}
            </a>
          ))}
          <HeaderMenu />
        </div>
      </FadeIn>

      <FadeIn
        delay={0.15}
        y={40}
        onLoad
        className="relative z-0 mt-6 w-full overflow-hidden sm:mt-4 md:-mt-5"
      >
        <h1
          className="hero-heading w-full whitespace-nowrap text-center text-[14vw] font-black uppercase leading-none tracking-tight sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] transition-colors duration-300"
          onMouseEnter={() => setIsTitleHovered(true)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
            e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
          }}
          onMouseLeave={() => setIsTitleHovered(false)}
          style={{
            backgroundImage: isTitleHovered
              ? 'radial-gradient(circle 250px at var(--mouse-x, 50%) var(--mouse-y, 50%), #38bdf8 0%, #d7e2ea 100%)'
              : 'linear-gradient(180deg, #9ca3af 0%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Hi, i&apos;m zney
        </h1>
      </FadeIn>

      <div className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
        <FadeIn delay={0.6} y={30} onLoad className="w-full">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="relative"
          >
            <button
              ref={avatarRef}
              type="button"
              onClick={() =>
                setActiveExpression(
                  (current) => (current + 1) % heroExpressions.length,
                )
              }
              className="group relative block w-full cursor-pointer bg-transparent text-left"
              aria-label={`Change avatar expression. Current expression: ${heroExpressions[activeExpression].label}`}
            >
              <div className="pointer-events-none absolute inset-x-[16%] bottom-[12%] h-[18%] rounded-full bg-[#f97316]/20 blur-3xl transition-opacity duration-300 group-hover:opacity-90" />
              <motion.div
                className="relative scale-[1.08] sm:scale-[1.1]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {heroExpressions.map((expression, index) => {
                  const isActive = index === activeExpression;

                  return (
                    <motion.img
                      key={expression.src}
                      src={expression.src}
                      alt={expression.alt}
                      draggable={false}
                      className="select-none object-contain"
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0.965,
                        rotate: isActive ? 0 : -1.5,
                        filter: isActive
                          ? 'drop-shadow(0 30px 55px rgba(0, 0, 0, 0.42))'
                          : 'drop-shadow(0 16px 28px rgba(0, 0, 0, 0.18))',
                      }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        position: index === 0 ? 'relative' : 'absolute',
                        inset: 0,
                        width: '100%',
                      }}
                    />
                  );
                })}
              </motion.div>
            </button>
          </Magnet>
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between gap-6 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20} onLoad>
          <p className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]">
            a developer who started coding to solve small problems, then became the problem
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} onLoad>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const rowOne = marqueeImages.slice(0, 11);
  const rowTwo = marqueeImages.slice(11);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const sectionTop = section.offsetTop;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <div className="flex flex-col gap-3">
        <MarqueeRow images={rowOne} translateX={offset - 200} />
        <MarqueeRow images={rowTwo} translateX={-(offset - 200)} />
      </div>
    </section>
  );
}

function MarqueeRow({
  images,
  translateX,
}: {
  images: string[];
  translateX: number;
}) {
  return (
    <div
      className="flex w-max gap-3"
      style={{
        transform: `translate3d(${translateX}px, 0, 0)`,
        willChange: 'transform',
      }}
    >
      {[...images, ...images, ...images].map((image, index) => (
        <img
          key={`${image}-${index}`}
          src={image}
          alt=""
          loading="lazy"
          className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
        />
      ))}
    </div>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_32%),linear-gradient(rgba(255,255,255,0.05)_1px,_transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[length:100%_100%,28px_28px,28px_28px] bg-[position:0_0,0_0,0_0] opacity-40" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:gap-16">
        <FadeIn y={40} className="flex flex-col gap-8">
          <div className="space-y-5">
            <span className="inline-flex w-fit items-center rounded-full border border-[#d7e2ea]/15 bg-white/[0.04] px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-[#8fc7de]">
              Developer profile
            </span>
            <div className="space-y-4">
              <h2 className="max-w-3xl text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.92] tracking-tight text-[#f2f7fb]">
                I build products that are clear, fast, and ready to ship.
              </h2>
              <p className="max-w-2xl text-[clamp(1rem,1.8vw,1.28rem)] leading-relaxed text-[#c3d0d8]">
                I work across frontend, backend integration, and product UX. The goal is simple: turn messy requirements into interfaces that feel stable, readable, and useful in real use.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {developerFocus.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#d7e2ea]/12 bg-white/[0.03] px-4 py-2 text-sm font-medium text-[#d7e2ea]"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {developerStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5"
              >
                <p className="text-3xl font-black uppercase text-[#f2f7fb]">
                  {stat.value}
                </p>
                <p className="mt-2 max-w-[24ch] text-sm leading-relaxed text-[#9cb0bb]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <FadeIn delay={0.15} y={20}>
              <ContactButton />
            </FadeIn>
            <FadeIn delay={0.2} y={20}>
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full border border-[#d7e2ea]/18 px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-[#d7e2ea] transition-colors duration-200 hover:bg-white/[0.06]"
              >
                See projects
              </a>
            </FadeIn>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} y={40} className="lg:pt-6">
          <div className="overflow-hidden rounded-[28px] border border-[#d7e2ea]/12 bg-[#11161a] shadow-[0_24px_90px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f97316]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#facc15]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
              </div>
              <span className="text-xs uppercase tracking-[0.24em] text-[#7c8e98]">
                dev-summary.ts
              </span>
            </div>

            <div className="space-y-4 px-5 py-5 font-mono text-sm leading-7 text-[#d7e2ea] sm:px-6 sm:py-6">
              <div>
                <span className="text-[#38bdf8]">$ whoami</span>
                <p className="mt-1 text-[#f2f7fb]">
                  3rd-year IT student passionate about frontend development and AI.
                </p>
              </div>

              {terminalPreview.map((line) => (
                <div key={line.prompt} className="grid gap-1">
                  <span className="text-[#38bdf8]">$ {line.prompt}</span>
                  <span className="text-[#9fb2bc]">{line.output}</span>
                </div>
              ))}

              <div className="rounded-[20px] border border-[#38bdf8]/20 bg-[#0c1013] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[#7c8e98]">
                  Current priorities
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[#d7e2ea]">
                  <li>Learn advanced frontend frameworks.</li>
                  <li>Improve problem-solving and algorithmic skills.</li>
                  <li>Build projects that solve real-world problems.</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section
      id="tech"
      className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <FadeIn>
        <h2 className="mb-16 text-center text-[clamp(2.5rem,10vw,140px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
          Tech & Skills
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {services.map((service, index) => (
          <FadeIn key={service.number} delay={index * 0.1}>
            <article className="grid gap-6 border-t border-[rgba(12,12,12,0.15)] py-8 last:border-b sm:grid-cols-[minmax(130px,0.32fr)_1fr] sm:gap-8 sm:py-10 md:py-12">
              <span className="text-[clamp(3rem,10vw,140px)] font-black uppercase leading-none text-[#0C0C0C]">
                {service.number}
              </span>
              <div className="flex flex-col justify-center gap-3">
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase">
                  {service.name}
                </h3>
                <p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">
                  {service.description}
                </p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  totalCards,
}: {
  project: (typeof projects)[number];
  index: number;
  totalCards: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });
  const targetScale = 1 - (totalCards - 1 - index) * 0.05;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const cardStyle: MotionStyle & { '--card-offset': string } = {
    '--card-offset': `${index * 35}px`,
    scale,
    transformOrigin: 'top center',
  };

  return (
    <motion.article
      ref={ref}
      className="sticky top-[calc(4rem+var(--card-offset))] mb-12 overflow-hidden rounded-[30px] border border-white/20 bg-[#0C0C0C] p-4 sm:rounded-[40px] sm:p-6 md:top-[calc(5rem+var(--card-offset))] md:mb-16 md:rounded-[50px] md:p-8"
      style={{ ...cardStyle }}
    >
      <div className="mb-6 grid items-end gap-4 text-[#D7E2EA] sm:grid-cols-[auto_1fr_auto] md:mb-8">
        <span className="text-[clamp(3rem,10vw,140px)] font-black uppercase leading-none">
          {project.number}
        </span>
        <div className="min-w-0">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest opacity-70 sm:text-sm">
            {project.category}
          </p>
          <h3 className="text-[clamp(1.8rem,5vw,5rem)] font-black uppercase leading-none tracking-tight">
            {project.name}
          </h3>
        </div>
        <div className="justify-self-start sm:justify-self-end">
          <LiveProjectButton href={(project as any).link} />
        </div>
      </div>

      <div className="mt-6 w-full">
        <img
          src={(project as any).image}
          alt={`${project.name} preview`}
          loading="lazy"
          className="h-[clamp(200px,35vw,450px)] w-full rounded-[24px] object-cover sm:rounded-[32px] md:rounded-[40px] border border-white/10"
        />
      </div>
    </motion.article>
  );
}

function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-32 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pb-40 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-64 md:pt-32"
    >
      <FadeIn>
        <h2 className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">
          Project
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-7xl">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={projects.length}
          />
        ))}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#0C0C0C] font-kanit">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );
}


