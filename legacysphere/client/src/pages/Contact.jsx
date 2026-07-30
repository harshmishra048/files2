import { useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    // Reset form after submission (optional)
    // setFormData({ name: "", email: "", subject: "", message: "" });
    // For demo, we just show a success message
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ===== NAVBAR (identical to landing) ===== */}
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

      {/* ===== HERO ===== */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Get in touch
          </h1>
          <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
            Have a question, feedback, or need support? We’d love to hear from
            you. Fill out the form below or reach out through our channels.
          </p>
        </div>
      </section>

      {/* ===== CONTACT FORM & INFO ===== */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form - takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Send us a message
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Message sent!
                    </h3>
                    <p className="text-gray-500 mt-2">
                      Thank you for reaching out. We’ll get back to you within
                      24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Full name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow"
                          placeholder="enter your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow"
                          placeholder="enter your mail"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow"
                        placeholder="How can we help?"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow resize-none"
                        placeholder="Write your message here..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-gray-800 transition-colors group"
                    >
                      Send message
                      <Send
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info - 1 column */}
            <div className="space-y-6">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Contact information
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100">
                      <Mail size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Email
                      </div>
                      <a
                        href="mailto:support@legacysphere.com"
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        support@legacysphere.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100">
                      <Phone size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Phone
                      </div>
                      <a
                        href="tel:+18005550199"
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        +1 (800) 555‑0199
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100">
                      <MapPin size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Office
                      </div>
                      <div className="text-sm text-gray-500">
                        123 Alumni Way, Suite 100
                        <br />
                        New York, NY 10001
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Business hours
                </h3>
                <div className="space-y-1 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span>9:00 AM – 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM – 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAP PLACEHOLDER ===== */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-100 rounded-2xl overflow-hidden h-64 md:h-80 flex items-center justify-center border border-gray-200">
            <div className="text-center text-gray-500">
              <MapPin size={32} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm">Find us on Google Maps</p>
              <p className="text-xs text-gray-400 mt-1">
                123 Alumni Way, New York, NY
              </p>
            </div>
            {/* You can replace this with an actual iframe map */}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prefer to chat?
          </h2>
          <p className="text-gray-500 mb-8">
            Our support team is available via live chat during business hours.
          </p>
          <Link
            to="/help"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors group"
          >
            Visit Help Center
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
