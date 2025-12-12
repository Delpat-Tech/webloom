"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, FileText } from "lucide-react";
import FormFeedback, { useFormFeedback } from "@/components/ui/FormFeedback";
import { validateForm, COMMON_VALIDATION_RULES, getFirstError } from "@/utils/formValidation";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";

/**
 * Example component demonstrating how to implement form feedback
 * This shows the complete pattern for forms with validation and feedback
 */
export default function FormFeedbackExample() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use the form feedback hook
  const { feedback, showSuccess, showError, showLoading, clearFeedback } = useFormFeedback();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any existing feedback
    clearFeedback();

    // Define validation rules
    const validationRules = {
      name: COMMON_VALIDATION_RULES.name,
      email: COMMON_VALIDATION_RULES.email,
      message: COMMON_VALIDATION_RULES.description,
    };

    // Validate form
    const validation = validateForm(formData, validationRules);

    if (!validation.isValid) {
      const firstError = getFirstError(validation.errors);
      showError("Please fix the following errors", firstError || "One or more fields have errors");
      return;
    }

    setIsSubmitting(true);
    showLoading("Sending your message...");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate random success/failure for demo
      const isSuccess = Math.random() > 0.3;

      if (isSuccess) {
        showSuccess(
          "Message sent successfully!",
          "We'll get back to you within 24 hours."
        );

        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error("Simulated server error");
      }
    } catch {
      showError(
        "Failed to send message",
        "Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl p-6 border border-border"
      >
        <h2 className="text-2xl font-bold mb-6">Contact Form Example</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form Feedback - This will show all feedback states */}
          {feedback && (
            <FormFeedback
              type={feedback.type}
              message={feedback.message}
              details={feedback.details}
              onClose={clearFeedback}
            />
          )}

          {/* Name Field */}
          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
              <User className="w-4 h-4" />
              Name *
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Your full name"
              disabled={isSubmitting}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4" />
              Email *
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="your@email.com"
              disabled={isSubmitting}
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4" />
              Message *
            </label>
            <TextArea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Tell us about your project..."
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </motion.button>
        </form>

        {/* Demo Instructions */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-medium mb-2">Demo Instructions:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Try submitting with empty fields to see validation</li>
            <li>• Enter invalid email to see email validation</li>
            <li>• Submit with valid data to see success/error states</li>
            <li>• Form has 70% success rate for demo purposes</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
} 