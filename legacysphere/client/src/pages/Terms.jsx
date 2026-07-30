import { Link } from "react-router-dom";
import {
  GraduationCap,
  FileCheck,
  Scale,
  AlertCircle,
  Clock,
  Users,
} from "lucide-react";

export default function Terms() {
  const sections = [
    {
      icon: FileCheck,
      title: "Acceptance of Terms",
      description:
        "By using LegacySphere, you agree to these terms. If you don't agree, please discontinue use. We reserve the right to update these terms at any time.",
      image:
        "https://images.unsplash.com/photo-1589829545456-3c7c7f5a7f5a?w=600&h=400&fit=crop",
    },
    {
      icon: Scale,
      title: "User Obligations",
      description:
        "You are responsible for maintaining accurate profile information and safeguarding your account. You must not misuse the platform, harass others, or violate any laws.",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
    },
    {
      icon: AlertCircle,
      title: "Content & Intellectual Property",
      description:
        "You retain ownership of content you post, but grant LegacySphere a license to display and distribute it. We own the platform's design, logos, and software.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    },
    {
      icon: Clock,
      title: "Termination",
      description:
        "We may suspend or terminate your account for violations of these terms. You can also delete your account at any time from your settings.",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop",
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
            Terms of Service
          </h1>
          <p className="text-gray-500 mt-4 text-lg">
            Understand the rules and guidelines for using LegacySphere.
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
              Limitation of Liability
            </h2>
            <p className="text-gray-600">
              LegacySphere is provided "as is." We are not liable for any
              indirect, incidental, or consequential damages arising from your
              use of the platform. We do not guarantee that the service will be
              uninterrupted or error-free.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Governing Law
            </h2>
            <p className="text-gray-600">
              These terms are governed by the laws of the State of New York. Any
              disputes shall be resolved in the courts of New York County.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Contact
            </h2>
            <p className="text-gray-600">
              For any questions about these terms, please email us at{" "}
              <a
                href="mailto:legal@legacysphere.com"
                className="text-gray-900 underline"
              >
                legal@legacysphere.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Have questions about our terms?
          </h2>
          <p className="text-gray-500 mt-2">
            We're here to clarify. Reach out anytime.
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
