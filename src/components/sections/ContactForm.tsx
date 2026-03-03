"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  Code,
  Clock,
  FileText,
  Send,
} from "lucide-react";
import TextArea from "@/components/ui/TextArea";
import Input from "@/components/ui/Input";
import FormFeedback, { useFormFeedback } from "@/components/ui/FormFeedback";
import { trackContactForm } from "@/lib/analytics";
import { validateForm, COMMON_VALIDATION_RULES } from "@/utils/formValidation";
import { API_CONFIG, apiUtils } from "@/lib/api-client";
import { getUTMsFromCookie } from "@/lib/utm";

import { ContactFormProps } from '@/types';

export default function ContactForm({ selectedGoal, selectedTier }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    projectType: "",
    timeline: "",
    description: "",
    page: "contact",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string[] }>({});
  const { feedback, showSuccess, showError, showLoading, clearFeedback } = useFormFeedback();

  // Auto-populate form based on selected goal and tier
  useEffect(() => {
    if (selectedGoal && selectedTier && selectedGoal.trim() !== '' && selectedTier.trim() !== '') {
      const goalMapping: { [key: string]: string } = {
        'mvp': 'mvp',
        'internal': 'webapp',
        'automation': 'automation'
      };

      const tierMapping: { [key: string]: string } = {
        'validate': 'fast',
        'launch': 'standard',
        'scale': 'flexible'
      };

      // Build a more tailored description per goal/tier
      let descriptionText = '';
      const tierLabel = selectedTier === 'validate' ? 'Fast (4-8 weeks)'
        : selectedTier === 'launch' ? 'Standard (2-3 months)'
        : 'Flexible (3+ months)';

      if (selectedGoal === 'automation') {
        descriptionText = `I'm looking to automate manual processes to save time and reduce errors. Preferred timeline: ${tierLabel}. Please suggest the best automation approach and next steps.`;
      } else if (selectedGoal === 'internal') {
        descriptionText = `I need an internal tool to streamline operations and improve team efficiency. Preferred timeline: ${tierLabel}. Please recommend an approach and outline the build.`;
      } else if (selectedGoal === 'mvp' && selectedTier === 'validate') {
        // Special copy for the "I'm not sure" path coming from quiz (we set tier to validate)
        descriptionText = `I'm exploring options and would like guidance on the best path forward. A quick recommendation and outline would be helpful. Preferred timeline: ${tierLabel}.`;
      } else {
        // Default MVP copy
        descriptionText = `I'm interested in MVP Development with ${tierLabel}. Please provide a clear recommendation and next steps to move forward.`;
      }

      setFormData(prev => ({
        ...prev,
        projectType: goalMapping[selectedGoal] || '',
        timeline: tierMapping[selectedTier] || '',
        description: descriptionText
      }));
    }
  }, [selectedGoal, selectedTier]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any existing feedback
    clearFeedback();
    
    // Validate form
    const validationRules = {
      name: { required: true, minLength: 2, maxLength: 50 },
      email: COMMON_VALIDATION_RULES.email,
      phone: { required: false }, // Make phone optional
      company: { required: false }, // Make company optional
      role: { required: true },
      projectType: { required: true },
      timeline: { required: true },
      description: { required: true, minLength: 10, maxLength: 1000 },
    };

    const validation = validateForm(formData, validationRules);
    
    if (!validation.isValid) {
      // Store field errors for visual feedback
      setFieldErrors(validation.errors);
      
      // Create a more helpful error message
      const errorMessages = [];
      if (validation.errors.name) errorMessages.push("Please enter your full name");
      if (validation.errors.email) errorMessages.push("Please enter a valid email address");
      if (validation.errors.role) errorMessages.push("Please select your role");
      if (validation.errors.projectType) errorMessages.push("Please select a project type");
      if (validation.errors.timeline) errorMessages.push("Please select a timeline");
      if (validation.errors.description) errorMessages.push("Please provide a project description (at least 10 characters)");
      
      const helpfulMessage = errorMessages.length > 0 
        ? errorMessages.join(", ") 
        : "Please fill in all required fields marked with *";
      
      showError("Please complete the form", helpfulMessage);
      return;
    }
    
    // Clear field errors if validation passes
    setFieldErrors({});

    setIsSubmitting(true);
    showLoading("Sending your project details...");

    try {
      const message = `
        Primary Goal: ${selectedGoal || "Not selected"}
        Project Description: ${formData.description}
        Phone: ${formData.phone || "Not provided"}
        Role: ${formData.role || "Not provided"}
        Project Type: ${formData.projectType || "Not provided"}
        Timeline: ${formData.timeline || "Not provided"}
      `.trim();

      const utms = getUTMsFromCookie();

      const response = await apiUtils.post(API_CONFIG.ENDPOINTS.LEADS, {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message,
        page: formData.page,
        ...utms,
        landing_page_url: window.location.href,
      });

      if (response.ok) {
        showSuccess(
          "Project details sent successfully!", 
          "We'll review your requirements and get back to you within 24 hours."
        );
        
        // Track successful form submission
        trackContactForm('contact_page');
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          role: "",
          projectType: "",
          timeline: "",
          description: "",
          page: "contact",
        });
        // Clear field errors
        setFieldErrors({});
      } else {
        const errorData = await response.json();
        showError(
          "Failed to send message", 
          errorData.message || "Please try again or contact us directly."
        );
      }
    } catch {
      showError(
        "Network error", 
        "Please check your internet connection and try again."
      );
    } finally {
      setIsSubmitting(false);
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
      {/* Form Feedback */}
      {feedback && (
        <FormFeedback
          type={feedback.type}
          message={feedback.message}
          details={feedback.details}
          onClose={clearFeedback}
        />
      )}

      {/* Basic Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name *
          </label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground placeholder:text-muted-foreground ${
              fieldErrors.name ? 'border-destructive focus:ring-destructive focus:border-destructive' : 'border-border'
            }`}
            placeholder="Your full name"
          />
          {fieldErrors.name && (
            <p className="text-sm text-destructive mt-1">{fieldErrors.name[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address *
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground placeholder:text-muted-foreground ${
              fieldErrors.email ? 'border-destructive focus:ring-destructive focus:border-destructive' : 'border-border'
            }`}
            placeholder="your@email.com"
          />
          {fieldErrors.email && (
            <p className="text-sm text-destructive mt-1">{fieldErrors.email[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone Number
          </label>
          <Input
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
          <Input
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
            className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground ${
              fieldErrors.role ? 'border-destructive focus:ring-destructive focus:border-destructive' : 'border-border'
            }`}
          >
            <option value="">Select your role</option>
            <option value="founder">Founder/CEO</option>
            <option value="cto">CTO/Tech Lead</option>
            <option value="operations">Operations Manager</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </select>
          {fieldErrors.role && (
            <p className="text-sm text-destructive mt-1">{fieldErrors.role[0]}</p>
          )}
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
            className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground ${
              fieldErrors.projectType ? 'border-destructive focus:ring-destructive focus:border-destructive' : 'border-border'
            }`}
          >
            <option value="">Select project type</option>
            <option value="mvp">MVP Development</option>
            <option value="automation">Process Automation</option>
            <option value="webapp">Web Application</option>
            <option value="mobile">Mobile App</option>
            <option value="integration">System Integration</option>
            <option value="other">Other</option>
          </select>
          {fieldErrors.projectType && (
            <p className="text-sm text-destructive mt-1">{fieldErrors.projectType[0]}</p>
          )}
        </div>
      </div>
      {/* Timeline */}
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
            className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground ${
              fieldErrors.timeline ? 'border-destructive focus:ring-destructive focus:border-destructive' : 'border-border'
            }`}
          >
            <option value="">Select timeline</option>
            <option value="urgent">ASAP (2-4 weeks)</option>
            <option value="fast">Fast (4-8 weeks)</option>
            <option value="standard">Standard (2-3 months)</option>
            <option value="flexible">Flexible (3+ months)</option>
          </select>
          {fieldErrors.timeline && (
            <p className="text-sm text-destructive mt-1">{fieldErrors.timeline[0]}</p>
          )}
        </div>
      </div>
      {/* Project Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Project Description *
        </label>
        <TextArea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={5}
          className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground placeholder:text-muted-foreground ${
            fieldErrors.description ? 'border-destructive focus:ring-destructive focus:border-destructive' : 'border-border'
          }`}
          placeholder="Describe your project, current challenges, and what success looks like..."
        />
        {fieldErrors.description && (
          <p className="text-sm text-destructive mt-1">{fieldErrors.description[0]}</p>
        )}
      </div>
      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        whileHover={{
          scale: isSubmitting ? 1 : 1.02,
          y: isSubmitting ? 0 : -2,
        }}
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
      
      {/* Privacy Note */}
      <p className="text-sm text-muted-foreground text-center">
        We respect your privacy. Your information is secure and won&apos;t be shared
        with third parties.
      </p>
    </motion.form>
  );
}
