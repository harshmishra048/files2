import { useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  ArrowRight,
  Search,
  Mail,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  FileText,
  Clock,
} from "lucide-react";

export default function Help() {
  // Accordion state: track which FAQ is open (index or null)
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // FAQ data
  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "You can reset your password by clicking 'Forgot password?' on the login page. We'll send a reset link to your registered email address.",
    },
    {
      question: "How can I connect with alumni?",
      answer:
        "Use the Alumni Directory to search by industry, location, or graduation year. You can send connection requests and start messaging once they accept.",
    },
    {
      question: "Is LegacySphere free to join?",
      answer:
        "Yes, joining LegacySphere is completely free. We offer premium features for universities and organizations, but individual members always have free access.",
    },
    {
      question: "How do I update my profile information?",
      answer:
        "Go to your Profile page and click 'Edit Profile'. You can update your photo, bio, work experience, education, and privacy settings.",
    },
    {
      question: "What should I do if I encounter a bug?",
      answer:
        "Please report any bugs through our Support form or email us at support@legacysphere.com. We'll investigate and get back to you within 24 hours.",
    },
    {
      question: "Can I delete my account?",
      answer:
        "Yes, you can delete your account permanently from the Account Settings page. All your data will be removed within 30 days.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ===== NAVBAR (exactly the same as landing) ===== */}
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
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            How can we help?
          </h1>
          <p className="text-gray-500 mt-4 text-lg">
            Find answers, get support, or reach out to our team.
          </p>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow"
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
              Search
            </button>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <span className="text-sm text-gray-500">Popular:</span>
            <Link
              to="#"
              className="text-sm text-gray-700 hover:text-gray-900 underline-offset-2 hover:underline"
            >
              Password reset
            </Link>
            <Link
              to="#"
              className="text-sm text-gray-700 hover:text-gray-900 underline-offset-2 hover:underline"
            >
              Alumni directory
            </Link>
            <Link
              to="#"
              className="text-sm text-gray-700 hover:text-gray-900 underline-offset-2 hover:underline"
            >
              Profile settings
            </Link>
            <Link
              to="#"
              className="text-sm text-gray-700 hover:text-gray-900 underline-offset-2 hover:underline"
            >
              Account deletion
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 mt-2">
              Quick answers to the most common questions.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp
                      size={20}
                      className="text-gray-500 flex-shrink-0 ml-4"
                    />
                  ) : (
                    <ChevronDown
                      size={20}
                      className="text-gray-500 flex-shrink-0 ml-4"
                    />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT OPTIONS ===== */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Still need help?
            </h2>
            <p className="text-gray-500 mt-2">
              Reach out to us through any of these channels.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {/* Email */}
            <div className="p-8 bg-white border border-gray-100 rounded-2xl text-center hover:border-gray-200 hover:shadow-sm transition-all">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail size={22} className="text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Email</h3>
              <p className="text-sm text-gray-500 mt-1">
                support@legacysphere.com
              </p>
              <p className="text-xs text-gray-400 mt-2">Response within 24h</p>
            </div>

            {/* Phone */}
            <div className="p-8 bg-white border border-gray-100 rounded-2xl text-center hover:border-gray-200 hover:shadow-sm transition-all">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone size={22} className="text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Phone</h3>
              <p className="text-sm text-gray-500 mt-1">+1 (800) 555‑0199</p>
              <p className="text-xs text-gray-400 mt-2">Mon–Fri, 9AM–6PM EST</p>
            </div>

            {/* Live Chat */}
            <div className="p-8 bg-white border border-gray-100 rounded-2xl text-center hover:border-gray-200 hover:shadow-sm transition-all">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={22} className="text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Live Chat</h3>
              <p className="text-sm text-gray-500 mt-1">Chat with our team</p>
              <p className="text-xs text-gray-400 mt-2">
                Available during business hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ADDITIONAL RESOURCES ===== */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            <Link
              to="#"
              className="flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-shadow"
            >
              <FileText size={24} className="text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">Documentation</div>
                <div className="text-sm text-gray-500">Guides & tutorials</div>
              </div>
            </Link>
            <Link
              to="#"
              className="flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-shadow"
            >
              <Clock size={24} className="text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">System Status</div>
                <div className="text-sm text-gray-500">
                  All systems operational
                </div>
              </div>
            </Link>
            <Link
              to="#"
              className="flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-xl hover:shadow-sm transition-shadow"
            >
              <HelpCircle size={24} className="text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">Community Forum</div>
                <div className="text-sm text-gray-500">Ask the community</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-500 mb-8">
            Our support team is here to help you personally.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors group"
          >
            Contact us
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </section>

      {/* ===== FOOTER (same as landing) ===== */}
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
