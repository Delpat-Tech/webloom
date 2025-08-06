"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Upload } from "lucide-react";
import { FormData, PartnerFormProps } from "@/types";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import FormFeedback, { useFormFeedback } from "@/components/ui/FormFeedback";
import {
  validateForm,
  COMMON_VALIDATION_RULES,
  getFirstError,
} from "@/utils/formValidation";
import { API_CONFIG, apiUtils } from "@/lib/api-client";

export default function PartnerForm({ onSuccess, onError }: PartnerFormProps) {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string[] }>(
    {}
  );
  const { feedback, showSuccess, showError, showLoading, clearFeedback } =
    useFormFeedback();

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

    // Clear error for this field when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      portfolio: file,
    }));

    // Clear error for portfolio field when user selects a file
    if (fieldErrors.portfolio) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.portfolio;
        return newErrors;
      });
    }
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
      description: COMMON_VALIDATION_RULES.description,
      
    };

    const validation = validateForm(formData, validationRules);

    if (!validation.isValid) {
      const firstError = getFirstError(validation.errors);

      // Store field errors for visual feedback
      setFieldErrors(validation.errors);

      // Create a more helpful error message
      const errorMessages = [];
      if (validation.errors.companyName)
        errorMessages.push("Please enter your company name");
      if (validation.errors.contactName)
        errorMessages.push("Please enter your contact name");
      if (validation.errors.email)
        errorMessages.push("Please enter a valid email address");
      if (validation.errors.phone)
        errorMessages.push("Please enter a valid phone number");
      if (validation.errors.description)
        errorMessages.push(
          "Please provide a description (at least 10 characters)"
        );

      const helpfulMessage =
        errorMessages.length > 0
          ? errorMessages.join(", ")
          : "Please fill in all required fields marked with *";

      showError("Please complete the form", helpfulMessage);
      return;
    }

    // Clear field errors if validation passes
    setFieldErrors({});

    setIsSubmitting(true);
    showLoading("Submitting your partnership request...");

    try {
      const response = await apiUtils.post(API_CONFIG.ENDPOINTS.PARTNERS, {
        companyName: formData.companyName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        description: formData.description,
      });

      if (response.ok) {
        const responseData = await response.json();
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
         description: "",
        });

        // Clear field errors
        setFieldErrors({});

        onSuccess?.();
      } else {
        const errorData = await response.json();
        showError(
          "Failed to submit partnership request",
          errorData.message ||
            "Please try again or contact us directly at hello@delpat.com"
        );
        onError?.();
      }
    } catch (error) {
      showError(
        "Network error",
        "Please check your internet connection and try again."
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
                className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground placeholder:text-muted-foreground ${
                  fieldErrors.companyName
                    ? "border-destructive focus:ring-destructive focus:border-destructive"
                    : "border-border"
                }`}
                placeholder="Your Agency Name"
              />
              {fieldErrors.companyName && (
                <p className="text-sm text-destructive mt-1">
                  {fieldErrors.companyName[0]}
                </p>
              )}
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
                className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground placeholder:text-muted-foreground ${
                  fieldErrors.contactName
                    ? "border-destructive focus:ring-destructive focus:border-destructive"
                    : "border-border"
                }`}
                placeholder="Your Name"
              />
              {fieldErrors.contactName && (
                <p className="text-sm text-destructive mt-1">
                  {fieldErrors.contactName[0]}
                </p>
              )}
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
                className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground placeholder:text-muted-foreground ${
                  fieldErrors.email
                    ? "border-destructive focus:ring-destructive focus:border-destructive"
                    : "border-border"
                }`}
                placeholder="your@agency.com"
              />
              {fieldErrors.email && (
                <p className="text-sm text-destructive mt-1">
                  {fieldErrors.email[0]}
                </p>
              )}
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
                className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground placeholder:text-muted-foreground ${
                  fieldErrors.phone
                    ? "border-destructive focus:ring-destructive focus:border-destructive"
                    : "border-border"
                }`}
                placeholder="+91 98765 43210"
              />
              {fieldErrors.phone && (
                <p className="text-sm text-destructive mt-1">
                  {fieldErrors.phone[0]}
                </p>
              )}
            </div>
          </div>

          {/* Website
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
              className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground placeholder:text-muted-foreground ${
                fieldErrors.website
                  ? "border-destructive focus:ring-destructive focus:border-destructive"
                  : "border-border"
              }`}
              placeholder="https://youragency.com"
            />
            {fieldErrors.website && (
              <p className="text-sm text-destructive mt-1">
                {fieldErrors.website[0]}
              </p>
            )}
          </div> */}

          {/* Project Type & Timeline */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground ${
                  fieldErrors.projectType
                    ? "border-destructive focus:ring-destructive focus:border-destructive"
                    : "border-border"
                }`}
              >
                <option value="">Select type</option>
                <option value="white-label">White-label Development</option>
                <option value="project-basis">Project-by-project</option>
                <option value="ongoing">Ongoing Partnership</option>
                <option value="specific-project">Specific Project</option>
              </select>
              {fieldErrors.projectType && (
                <p className="text-sm text-destructive mt-1">
                  {fieldErrors.projectType[0]}
                </p>
              )}
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
                className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground ${
                  fieldErrors.timeline
                    ? "border-destructive focus:ring-destructive focus:border-destructive"
                    : "border-border"
                }`}
              >
                <option value="">Select timeline</option>
                <option value="immediate">Start immediately</option>
                <option value="2-4-weeks">2-4 weeks</option>
                <option value="1-2-months">1-2 months</option>
                <option value="3-months">3+ months</option>
              </select>
              {fieldErrors.timeline && (
                <p className="text-sm text-destructive mt-1">
                  {fieldErrors.timeline[0]}
                </p>
              )}
            </div>
          </div>

          {/* Budget */}
          {/* <div>
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
              className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground ${
                fieldErrors.budget
                  ? "border-destructive focus:ring-destructive focus:border-destructive"
                  : "border-border"
              }`}
            >
              <option value="">Select budget range</option>
              <option value="40k-1L">₹40k - ₹1L per project</option>
              <option value="1L-3L">₹1L - ₹3L per project</option>
              <option value="3L-5L">₹3L - ₹5L per project</option>
              <option value="5L+">₹5L+ per project</option>
              <option value="monthly-retainer">Monthly retainer</option>
            </select>
            {fieldErrors.budget && (
              <p className="text-sm text-destructive mt-1">
                {fieldErrors.budget[0]}
              </p>
            )}
          </div> */}

          {/* Portfolio Upload */}
          {/* <div>
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
                className={`flex items-center justify-center w-full px-4 py-6 bg-background border-2 border-dashed rounded-xl cursor-pointer hover:border-primary/50 transition-all ${
                  fieldErrors.portfolio ? "border-destructive" : "border-border"
                }`}
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
            {fieldErrors.portfolio && (
              <p className="text-sm text-destructive mt-1">
                {fieldErrors.portfolio[0]}
              </p>
            )}
          </div>  */}

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
              className={`w-full px-4 py-3 bg-background border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground placeholder:text-muted-foreground ${
                fieldErrors.description
                  ? "border-destructive focus:ring-destructive focus:border-destructive"
                  : "border-border"
              }`}
              placeholder="Tell us about your agency, your clients, the type of projects you work on, and what you&#39;re looking for in a development partner..."
            />
            {fieldErrors.description && (
              <p className="text-sm text-destructive mt-1">
                {fieldErrors.description[0]}
              </p>
            )}
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
