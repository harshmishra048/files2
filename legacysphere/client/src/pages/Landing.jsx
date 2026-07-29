import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
      alt: "Students collaborating",
    },
    {
      url: "https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?q=80&w=733&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Graduation ceremony",
    },
    {
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
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
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "Google",
      university: "IIT Delhi '21",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote:
        "As faculty, this platform makes it effortless to stay connected with students long after graduation.",
      name: "Dr. Rajesh Kumar",
      role: "Professor",
      company: "Computer Science",
      university: "BITS Pilani",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote:
        "The mentorship opportunities here are incredible. I've grown so much in just one year.",
      name: "Alex Chen",
      role: "Product Designer",
      company: "Stripe",
      university: "NUS '20",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Start counters when stats section is visible
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
      {/* Navbar */}
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
                    ></div>
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  Trusted by 200+ universities
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                Your alumni
                <br />
                <span className="text-gray-400">network,</span>
                <br />
                reimagined.
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

              {/* Quick Stats */}
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

            {/* Hero Image with Auto Carousel */}
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

                {/* Image Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentImage === index ? "bg-white w-6" : "bg-white/50"
                      }`}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      1,200+ online now
                    </div>
                    <div className="text-xs text-gray-500">
                      from 45 universities
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
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

      {/* Features Grid */}
      <section className="py-20 px-6">
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

      {/* Testimonials Carousel */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
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
                    <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-12">
                      <Quote size={32} className="text-gray-200 mb-6" />
                      <p className="text-xl text-gray-700 leading-relaxed mb-8">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-gray-500">
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

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 -left-4 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 -right-4 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? "bg-gray-900 w-6" : "bg-gray-300"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Footer */}
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
