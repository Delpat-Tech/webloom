"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Upload } from "lucide-react";
import { FormData, PartnerFormProps } from "@/types";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import FormFeedback, { useFormFeedback } from "@/components/ui/FormFeedback";
import { validateForm, COMMON_VALIDATION_RULES, getFirstError } from "@/utils/formValidation";

export default function PartnerForm({ onSuccess, onError }: PartnerFormProps) {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    projectType: "",
    timeline: "",
    budget: "",
    description: "",
    portfolio: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { feedback, showSuccess, showError, showLoading, clearFeedback } = useFormFeedback();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      portfolio: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear any existing feedback
    clearFeedback();
    
    // Validate form
    const validationRules = {
      companyName: { ...COMMON_VALIDATION_RULES.company, required: true },
      contactName: COMMON_VALIDATION_RULES.name,
      email: COMMON_VALIDATION_RULES.email,
      phone: COMMON_VALIDATION_RULES.phone,
      website: COMMON_VALIDATION_RULES.url,
      projectType: { required: true },
      description: COMMON_VALIDATION_RULES.description,
      portfolio: COMMON_VALIDATION_RULES.file,
    };

    const validation = validateForm(formData, validationRules);
    
    if (!validation.isValid) {
      const firstError = getFirstError(validation.errors);
      showError("Please fix the following errors", firstError || "One or more fields have errors");
      return;
    }

    setIsSubmitting(true);
    showLoading("Submitting your partnership request...");

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      showSuccess(
        "Partnership request submitted successfully!", 
        "We'll review your agency details and get back to you within 24 hours to discuss next steps."
      );
      
      // Reset form
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        website: "",
        projectType: "",
        timeline: "",
        budget: "",
        description: "",
        portfolio: null,
      });
      
      onSuccess?.();
    } catch (error) {
      showError(
        "Failed to submit partnership request", 
        "Please try again or contact us directly at hello@delpat.com"
      );
      onError?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Form Container */}
      <div className="p-8 md:p-12 rounded-3xl bg-card/80 backdrop-blur-sm border border-border">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Feedback */}
          {feedback && (
            <FormFeedback
              type={feedback.type}
              message={feedback.message}
              details={feedback.details}
              onClose={clearFeedback}
            />
          )}

          {/* Company & Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Company Name *
              </label>
              <Input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                placeholder="Your Agency Name"
              />
            </div>
            <div>
              <label
                htmlFor="contactName"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Contact Name *
              </label>
              <Input
                type="text"
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleInputChange}
                required
                placeholder="Your Name"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email Address *
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your@agency.com"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Phone Number
              </label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Website
            </label>
            <Input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://youragency.com"
            />
          </div>

          {/* Project Type & Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="projectType"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Partnership Type *
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="">Select type</option>
                <option value="white-label">White-label Development</option>
                <option value="project-basis">Project-by-project</option>
                <option value="ongoing">Ongoing Partnership</option>
                <option value="specific-project">Specific Project</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="timeline"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="">Select timeline</option>
                <option value="immediate">Start immediately</option>
                <option value="2-4-weeks">2-4 weeks</option>
                <option value="1-2-months">1-2 months</option>
                <option value="3-months">3+ months</option>
              </select>
            </div>
          </div>

          {/* Budget */}
          <div>
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Estimated Budget Range
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            >
              <option value="">Select budget range</option>
              <option value="40k-1L">₹40k - ₹1L per project</option>
              <option value="1L-3L">₹1L - ₹3L per project</option>
              <option value="3L-5L">₹3L - ₹5L per project</option>
              <option value="5L+">₹5L+ per project</option>
              <option value="monthly-retainer">Monthly retainer</option>
            </select>
          </div>

          {/* Portfolio Upload */}
          <div>
            <label
              htmlFor="portfolio"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Portfolio / Work Samples
            </label>
            <div className="relative">
              <input
                type="file"
                id="portfolio"
                name="portfolio"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                className="hidden"
              />
              <label
                htmlFor="portfolio"
                className="flex items-center justify-center w-full px-4 py-6 bg-background border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-all"
              >
                <div className="text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {formData.portfolio
                      ? formData.portfolio.name
                      : "Click to upload portfolio or drag & drop"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, DOC, DOCX, PPT, PPTX up to 10MB
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Project Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Tell us about your agency and partnership goals *
            </label>
            <TextArea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={6}
              placeholder="Tell us about your agency, your clients, the type of projects you work on, and what you&#39;re looking for in a development partner..."
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting Partnership Request...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Start Our Partnership
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
