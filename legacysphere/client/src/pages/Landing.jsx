import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  GraduationCap,
  ArrowRight,
  Users,
  Building2,
  Globe,
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle,
  Heart, // <-- new icon for the value props
} from "lucide-react";

export default function Landing() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [counters, setCounters] = useState({
    members: 0,
    universities: 0,
    countries: 0,
    satisfaction: 0,
  });
  const statsRef = useRef(null);
  const countersStarted = useRef(false);
  const location = useLocation();

  const heroImages = [
    {
      url: "https://res.cloudinary.com/durp5jwgn/image/upload/v1785339747/ChatGPT_Image_Jul_29_2026_09_12_07_PM_coziix.png",
      alt: "Students collaborating",
    },
    {
      url: "https://res.cloudinary.com/durp5jwgn/image/upload/v1785339551/ChatGPT_Image_Jul_29_2026_09_03_59_PM_lpfnhk.png",
      alt: "Graduation ceremony",
    },
    {
      url: "https://res.cloudinary.com/durp5jwgn/image/upload/v1785339551/ChatGPT_Image_Jul_29_2026_09_07_43_PM_ke8ifj.png",
      alt: "Networking event",
    },
  ];

  const stats = [
    {
      icon: Users,
      value: 50000,
      label: "Active Members",
      key: "members",
      suffix: "+",
    },
    {
      icon: Building2,
      value: 200,
      label: "Universities",
      key: "universities",
      suffix: "+",
    },
    {
      icon: Globe,
      value: 120,
      label: "Countries",
      key: "countries",
      suffix: "+",
    },
    {
      icon: Star,
      value: 95,
      label: "Satisfaction",
      key: "satisfaction",
      suffix: "%",
    },
  ];

  const testimonials = [
    {
      quote:
        "LegacySphere helped me land my dream job through alumni connections I never knew existed.",
      name: "Priya Saket",
      role: "Software Engineer",
      company: "Google",
      university: "IIT Delhi '21",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote:
        "As faculty, this platform makes it effortless to stay connected with students long after graduation.",
      name: "Dr. Akhilesh A. Waoo",
      role: "Dean of Faculty",
      company: "Computer Science",
      university: "A.K.S University",
      image:
        "https://media.licdn.com/dms/image/v2/D5603AQHurTzXrnr1uw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727707028196?e=1787184000&v=beta&t=aLy8ziUw9esxiT89np1dwhF91DKazepRlQwy3qY8WWk",
    },
    {
      quote:
        "The mentorship opportunities here are incredible. I've grown so much in just one year.",
      name: "Devesh Pathak",
      role: "Product Designer",
      company: "SiyaCreatives",
      university: "A.K.S University",
      image:
        "https://media.licdn.com/dms/image/v2/D4E35AQHlkATF8J9m8w/profile-framedphoto-shrink_800_800/B4EZstxm9EGUAk-/0/1765999538385?e=1785992400&v=beta&t=gn2Y0Y4VXj_nSGGmqnFLw4VFzQDY5Zmz1ho3YLu08iI",
    },
  ];

  const features = [
    {
      title: "Alumni Directory",
      description:
        "Find and connect with alumni based on industry, location, or graduation year.",
      icon: Users,
    },
    {
      title: "University Network",
      description:
        "Your university's private hub for events, news, and community discussions.",
      icon: Building2,
    },
    {
      title: "Global Reach",
      description:
        "Connect across borders with alumni chapters in 120+ countries worldwide.",
      icon: Globe,
    },
    {
      title: "Career Growth",
      description:
        "Access job boards, mentorship programs, and exclusive career resources.",
      icon: Star,
    },
  ];

  // ---- NEW: Value propositions for "Why LegacySphere" ----
  const valueProps = [
    {
      icon: Users,
      title: "Authentic Network",
      description:
        "Real alumni with verified profiles, built on trust and shared experience.",
    },
    {
      icon: Building2,
      title: "University‑Centric",
      description:
        "Each institution has its own private hub for tailored connections.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Connect across 120+ countries – your network knows no borders.",
    },
    {
      icon: Heart,
      title: "Community First",
      description:
        "We prioritise meaningful engagement over passive scrolling.",
    },
  ];
  // ---------------------------------------------------------

  // Counter animation
  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounters({
        members: Math.floor(progress * 50000),
        universities: Math.floor(progress * 200),
        countries: Math.floor(progress * 120),
        satisfaction: Math.floor(progress * 95),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounters({
          members: 50000,
          universities: 200,
          countries: 120,
          satisfaction: 95,
        });
      }
    }, interval);
  };

  // Scroll handler for navbar and stats counter
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (statsRef.current && !countersStarted.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          countersStarted.current = true;
          animateCounters();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate hero images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Smooth scroll to features section when hash is #features
  useEffect(() => {
    if (location.hash === "#features") {
      const element = document.getElementById("features");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ===== NAVBAR ===== */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-gray-900 rounded-lg group-hover:bg-gray-800 transition-colors">
              <GraduationCap className="text-white" size={20} />
            </div>
            <span className="text-xl font-semibold text-gray-900 tracking-tight">
              LegacySphere
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              to="/landing#features"
              className="text-gray-600 hover:text-gray-900 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-900 after:transition-all hover:after:w-full"
            >
              Services
            </Link>
            <Link
              to="/help"
              className="text-gray-600 hover:text-gray-900 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-900 after:transition-all hover:after:w-full"
            >
              Help & Support
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-gray-900 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-900 after:transition-all hover:after:w-full"
            >
              Contact
            </Link>
            <Link
              to="/terms"
              className="text-gray-600 hover:text-gray-900 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-900 after:transition-all hover:after:w-full"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/privacy"
              className="text-gray-600 hover:text-gray-900 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-900 after:transition-all hover:after:w-full"
            >
              Privacy & Policy
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                Meaningful Connections
                <br />
                <span className="text-gray-400">Limitless</span>
                <br />
                Growth...
              </h1>

              <p className="text-lg text-gray-500 mt-8 leading-relaxed max-w-lg">
                Connect with classmates, mentors, and opportunities that shape
                your career long after graduation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors group"
                >
                  Join LegacySphere
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Sign in to your account
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-12 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Free to join</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>No spam</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-green-500" />
                  <span>Secure</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden relative">
                {heroImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={image.alt}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      currentImage === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentImage === index ? "bg-white w-6" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section ref={statsRef} className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon size={24} className="text-gray-400 mx-auto mb-4" />
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {counters[stat.key].toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEW: WHY LEGACYSPHERE ===== */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Why LegacySphere
            </h2>
            <p className="text-gray-500 mt-4 max-w-md mx-auto">
              More than a network – a community built for lasting impact.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {valueProps.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-900 transition-colors duration-300">
                  <item.icon
                    size={28}
                    className="text-gray-700 group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Everything you need
            </h2>
            <p className="text-gray-500 mt-4 max-w-md mx-auto">
              Tools and connections that help you thrive in your professional
              journey.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-gray-900 transition-colors">
                  <feature.icon
                    size={22}
                    className="text-gray-600 group-hover:text-white transition-colors"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS CAROUSEL ===== */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-[12000ms] ease-out will-change-transform animate-ken-burns"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80")',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.3)_100%)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
              What our community says
            </h2>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-8 md:p-12 shadow-2xl shadow-black/20 hover:shadow-black/30 transition-shadow duration-300 relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                      <Quote size={32} className="text-white/60 mb-6" />
                      <p className="text-xl text-white leading-relaxed mb-8 drop-shadow-md">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-white/30"
                        />
                        <div>
                          <div className="font-semibold text-white drop-shadow-md">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-white/80 drop-shadow-sm">
                            {testimonial.role}, {testimonial.company} •{" "}
                            {testimonial.university}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute top-1/2 -left-4 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors shadow-lg z-20"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 -right-4 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors shadow-lg z-20"
            >
              <ChevronRight size={20} className="text-white" />
            </button>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? "bg-white w-6" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to build your legacy?
          </h2>
          <p className="text-gray-500 mb-8">
            Join thousands of students and alumni already on LegacySphere.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors group"
          >
            Get started for free
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <GraduationCap size={16} />
            <span>© 2026 LegacySphere</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link
              to="/privacy"
              className="hover:text-gray-900 transition-colors"
            >
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-gray-900 transition-colors">
              Terms
            </Link>
            <Link to="/help" className="hover:text-gray-900 transition-colors">
              Help
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
