import { Link } from "react-router-dom";
import { GraduationCap, Shield, Lock, Eye, Users } from "lucide-react";

export default function Privacy() {
  const sections = [
    {
      icon: Shield,
      title: "Information We Collect",
      description:
        "We collect personal information you provide directly, such as your name, email, university, and profile details. We also automatically collect usage data to improve your experience.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    },
    {
      icon: Lock,
      title: "How We Use Your Data",
      description:
        "Your data is used to connect you with alumni, personalize content, send notifications, and improve our platform. We never sell your personal information to third parties.",
      image:
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop",
    },
    {
      icon: Eye,
      title: "Data Security",
      description:
        "We implement industry-standard encryption, access controls, and regular security audits to protect your data. Your privacy is our top priority.",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    },
    {
      icon: Users,
      title: "Sharing & Disclosure",
      description:
        "We may share data with your consent, with service providers, or when required by law. Your profile information is visible to other alumni based on your privacy settings.",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ===== EMBEDDED NAVBAR ===== */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
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
              to="/landing#features"
              className="text-gray-600 hover:text-gray-900 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-900 after:transition-all hover:after:w-full"
            >
              Services
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

      {/* ===== HERO ===== */}
      <section className="pt-32 pb-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-500 mt-4 text-lg">
            Your privacy matters to us. Learn how we collect, use, and protect
            your information.
          </p>
          <div className="mt-4 text-sm text-gray-400">
            Last updated: July 30, 2026
          </div>
        </div>
      </section>

      {/* ===== CONTENT CARDS WITH BACKGROUND IMAGES ===== */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden group min-h-[280px] hover:shadow-xl transition-shadow"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${section.image})` }}
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors" />
              <div className="relative z-10 p-8 flex flex-col justify-between h-full text-white">
                <div>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                    <section.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{section.title}</h3>
                  <p className="text-white/90 leading-relaxed">
                    {section.description}
                  </p>
                </div>
                <div className="mt-6 w-16 h-1 bg-white/30 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ADDITIONAL LEGAL TEXT ===== */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Rights & Choices
            </h2>
            <p className="text-gray-600">
              You have the right to access, correct, or delete your personal
              data at any time. You can manage your privacy settings from your
              profile page. For any questions, contact us at{" "}
              <a
                href="mailto:privacy@legacysphere.com"
                className="text-gray-900 underline"
              >
                privacy@legacysphere.com
              </a>
              .
            </p>
            <p className="text-gray-600 mt-4">
              We may update this policy occasionally. We’ll notify you of
              significant changes via email or platform notification.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Questions about your privacy?
          </h2>
          <p className="text-gray-500 mt-2">
            Reach out to our privacy team anytime.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 mt-6 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            Contact us
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
