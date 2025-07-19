import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, Building, Briefcase, Code, Clock, DollarSign, FileText, Send, CheckCircle, AlertCircle
} from 'lucide-react';
import Button from '../ui/Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    projectType: '',
    timeline: '',
    budget: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '', email: '', phone: '', company: '', role: '', projectType: '', timeline: '', budget: '', description: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Basic Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
            placeholder="Your full name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
            placeholder="your@email.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
            placeholder="+91 98765 43210"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Building className="w-4 h-4" />
            Company Name
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
            placeholder="Your company"
          />
        </div>
      </div>
      {/* Role and Project Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Your Role *
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground"
          >
            <option value="">Select your role</option>
            <option value="founder">Founder/CEO</option>
            <option value="cto">CTO/Tech Lead</option>
            <option value="operations">Operations Manager</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Code className="w-4 h-4" />
            Project Type *
          </label>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground"
          >
            <option value="">Select project type</option>
            <option value="mvp">MVP Development</option>
            <option value="automation">Process Automation</option>
            <option value="webapp">Web Application</option>
            <option value="mobile">Mobile App</option>
            <option value="integration">System Integration</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      {/* Timeline and Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Timeline *
          </label>
          <select
            name="timeline"
            value={formData.timeline}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground"
          >
            <option value="">Select timeline</option>
            <option value="urgent">ASAP (2-4 weeks)</option>
            <option value="fast">Fast (4-8 weeks)</option>
            <option value="standard">Standard (2-3 months)</option>
            <option value="flexible">Flexible (3+ months)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Budget Range *
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground"
          >
            <option value="">Select budget</option>
            <option value="40k-80k">₹40k - ₹80k</option>
            <option value="80k-150k">₹80k - ₹1.5L</option>
            <option value="150k-300k">₹1.5L - ₹3L</option>
            <option value="300k+">₹3L+</option>
            <option value="discuss">Let's discuss</option>
          </select>
        </div>
      </div>
      {/* Project Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Project Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={5}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground placeholder:text-muted-foreground resize-none"
          placeholder="Describe your project, current challenges, and what success looks like..."
        />
      </div>
      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <>
            <motion.div
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Send Project Details</span>
          </>
        )}
      </motion.button>
      {/* Submit Status */}
      {submitStatus && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl ${
            submitStatus === 'success'
              ? 'bg-green-500/10 border border-green-500/20 text-green-600'
              : 'bg-red-500/10 border border-red-500/20 text-red-600'
          }`}
        >
          <div className="flex items-center gap-2">
            {submitStatus === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-medium">
              {submitStatus === 'success'
                ? "Thanks! We'll respond within 24 hours."
                : "Something went wrong. Please try again or contact us directly."
              }
            </span>
          </div>
        </motion.div>
      )}
      {/* Privacy Note */}
      <p className="text-sm text-muted-foreground text-center">
        We respect your privacy. Your information is secure and won't be shared with third parties.
      </p>
    </motion.form>
  );
} 