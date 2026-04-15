import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1419] via-[#1a1f2e] to-[#0f1419] font-sans text-[#e8ecf1]">
      {/* Hero Section */}
      <section className="w-full py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-10 w-96 h-96 bg-orange-600 rounded-full filter blur-3xl opacity-10"
          />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#e8ecf1] to-[#a0aec0] bg-clip-text text-transparent"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#cbd5e1] font-medium"
          >
            Have questions or feedback? We'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-24 px-6 bg-[#1a1f2e] border-t border-[#2d3748]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-extrabold mb-8">Contact Information</h2>

              <div className="space-y-8">
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 p-6 bg-[#2d3748] rounded-xl border border-[#3d4a5c] hover:border-orange-500 transition-all"
                >
                  <div className="w-14 h-14 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-orange-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#e8ecf1] mb-1">Email</h3>
                    <p className="text-[#cbd5e1]">support@resumebuilder.com</p>
                    <p className="text-[#94a3b8] text-sm">We'll respond within 24 hours</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 p-6 bg-[#2d3748] rounded-xl border border-[#3d4a5c] hover:border-orange-500 transition-all"
                >
                  <div className="w-14 h-14 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-orange-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#e8ecf1] mb-1">Phone</h3>
                    <p className="text-[#cbd5e1]">+91 7204059922</p>
                    <p className="text-[#94a3b8] text-sm">Mon-Fri: 9AM-6PM IST</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 p-6 bg-[#2d3748] rounded-xl border border-[#3d4a5c] hover:border-orange-500 transition-all"
                >
                  <div className="w-14 h-14 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="text-orange-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#e8ecf1] mb-1">Live Chat</h3>
                    <p className="text-[#cbd5e1]">Available 24/7</p>
                    <p className="text-[#94a3b8] text-sm">Start a conversation instantly</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 p-6 bg-[#2d3748] rounded-xl border border-[#3d4a5c] hover:border-orange-500 transition-all"
                >
                  <div className="w-14 h-14 bg-orange-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-orange-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#e8ecf1] mb-1">Office</h3>
                    <p className="text-[#cbd5e1]">123 Business Ave, Suite 100</p>
                    <p className="text-[#94a3b8] text-sm">Bangalore, Karnataka</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#2d3748] to-[#1a202c] border border-[#3d4a5c] rounded-2xl p-8 md:p-12"
            >
              <h2 className="text-3xl font-extrabold mb-8">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[#cbd5e1] font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1a202c] border border-[#3d4a5c] rounded-lg text-[#e8ecf1] placeholder-[#64748b] focus:border-[#60a5fa] focus:outline-none transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#cbd5e1] font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1a202c] border border-[#3d4a5c] rounded-lg text-[#e8ecf1] placeholder-[#64748b] focus:border-[#60a5fa] focus:outline-none transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#cbd5e1] font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1a202c] border border-[#3d4a5c] rounded-lg text-[#e8ecf1] placeholder-[#64748b] focus:border-[#60a5fa] focus:outline-none transition-colors"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#cbd5e1] font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 bg-[#1a202c] border border-[#3d4a5c] rounded-lg text-[#e8ecf1] placeholder-[#64748b] focus:border-[#60a5fa] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us more about your message..."
                    required
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/50 transition-all"
                >
                  <Send size={20} />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-24 px-6 bg-gradient-to-b from-[#0f1419] to-[#1a1f2e] border-t border-[#2d3748]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold mb-4">Frequently Asked Questions</h2>
            <p className="text-[#cbd5e1] text-lg">Find answers to common questions</p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: 'How much does it cost to use the resume builder?',
                a: 'Our basic resume builder is completely free! Premium features like advanced templates and AI suggestions are available with a paid subscription starting at $9.99/month.'
              },
              {
                q: 'Can I download my resume as PDF?',
                a: 'Yes! You can download your resume in multiple formats including PDF, Word (.docx), and plain text. Premium users get unlimited downloads.'
              },
              {
                q: 'Are your templates ATS-compatible?',
                a: 'Absolutely! All our templates are designed and tested to pass through Applicant Tracking Systems (ATS) used by most recruiters.'
              },
              {
                q: 'How long does it take to build a resume?',
                a: 'Most users complete their resume in 15-30 minutes using our templates and AI-powered suggestions. The entire process is designed to be quick and efficient.'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#2d3748] border border-[#3d4a5c] rounded-xl p-6 hover:border-[#60a5fa] transition-all"
              >
                <h3 className="font-bold text-[#e8ecf1] text-lg mb-3">{item.q}</h3>
                <p className="text-[#cbd5e1]">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
