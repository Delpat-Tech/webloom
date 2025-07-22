import { Shield, Users, FileText, Globe, Mail, Clock, AlertCircle, Eye } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-card shadow-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Terms & Conditions</h1>
              <p className="text-muted-foreground flex items-center gap-2 mt-2">
                <Clock className="h-4 w-4" />
                Last updated: June 2024
              </p>
            </div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-primary/90">
              Welcome to <strong>Delpat</strong>. These terms outline how you can use our services. 
              We&apos;ve written them in plain English to keep things transparent and straightforward.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid gap-8">
          
          {/* Acceptable Use */}
          <section className="bg-card rounded-xl shadow-sm p-8 border border-border">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 rounded-lg flex-shrink-0">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-foreground mb-4">How to Use Our Platform</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="bg-accent/5 border-l-4 border-accent p-4 rounded">
                    <h3 className="font-medium text-accent/90 mb-2">✓ What&apos;s Encouraged</h3>
                    <ul className="space-y-1 text-accent/80">
                      <li>• Explore our services and solutions</li>
                      <li>• Share constructive feedback</li>
                      <li>• Connect with us for genuine business inquiries</li>
                    </ul>
                  </div>
                  <div className="bg-destructive/5 border-l-4 border-destructive p-4 rounded">
                    <h3 className="font-medium text-destructive/90 mb-2">✗ What&apos;s Not Allowed</h3>
                    <ul className="space-y-1 text-destructive/80">
                      <li>• Attempting to breach security or disrupt our services</li>
                      <li>• Using our content or branding without explicit permission</li>
                      <li>• Engaging in any illegal or harmful activities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="bg-card rounded-xl shadow-sm p-8 border border-border">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary/10 rounded-lg flex-shrink-0">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Content & Intellectual Property</h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    All materials on this website—including text, graphics, logos, designs, and code—are owned by 
                    Delpat or our licensed partners. This represents years of creative work and innovation.
                  </p>
                  <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-lg p-4 mt-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-yellow-600/90 font-medium">Need to use our content?</p>
                        <p className="text-yellow-600/80 mt-1">
                          We&apos;re happy to discuss licensing opportunities. Just reach out to us first.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* User Content & Privacy */}
          <section className="bg-card rounded-xl shadow-sm p-8 border border-border">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Your Content & Privacy</h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    When you share feedback, testimonials, or project information with us, you grant us permission 
                    to use this content to improve our services and showcase our work.
                  </p>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
                    <h3 className="font-medium text-primary/90 mb-2">Our Privacy Promise</h3>
                    <ul className="text-primary/80 space-y-1">
                      <li>• We&apos;ll always ask before sharing anything publicly</li>
                      <li>• Your personal information stays protected</li>
                      <li>• We only use your content to better serve you and future clients</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Disclaimers & Liability */}
          <section className="bg-card rounded-xl shadow-sm p-8 border border-border">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-destructive/10 rounded-lg flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Important Disclaimers</h2>
                <div className="space-y-4">
                  <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                    <h3 className="font-medium text-destructive/90 mb-2">Service Accuracy</h3>
                    <p className="text-destructive/80">
                      We strive for accuracy and keep our content up-to-date, but we can&apos;t guarantee perfection. 
                      Technology and business environments change rapidly.
                    </p>
                  </div>
                  <div className="bg-muted border border-border rounded-lg p-4">
                    <h3 className="font-medium text-muted-foreground mb-2">Limitation of Liability</h3>
                    <p className="text-muted-foreground">
                      While we work hard to provide reliable services, Delpat cannot be held responsible for 
                      any indirect losses or damages resulting from your use of our website or services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* External Links */}
          <section className="bg-card rounded-xl shadow-sm p-8 border border-border">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary/10 rounded-lg flex-shrink-0">
                <Globe className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-foreground mb-4">External Links & Third Parties</h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    Our website may contain links to external sites and resources that we find valuable. 
                    However, we don&apos;t control these third-party sites and aren&apos;t responsible for their content, 
                    privacy practices, or terms of service.
                  </p>
                  <p className="text-sm text-muted-foreground mt-3">
                    Always review the terms and privacy policies of external sites before sharing personal information.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Updates & Changes */}
          <section className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8 border border-primary/20">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Terms Updates</h2>
              <p className="text-muted-foreground mb-4">
                As we grow and improve our services, these terms may need updates. We&apos;ll always notify users 
                of significant changes, and continued use of our services indicates acceptance of updated terms.
              </p>
              <div className="inline-flex items-center gap-2 text-primary/90 bg-primary/10 px-4 py-2 rounded-full text-sm">
                <Clock className="h-4 w-4" />
                We&apos;ll email users about major changes
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Contact Footer */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <Mail className="h-6 w-6 text-accent" />
              <h2 className="text-xl font-semibold">Questions About These Terms?</h2>
            </div>
            <p className="text-gray-300 mb-6">
              We believe in clear communication. If anything isn&apos;t clear or you need clarification, 
              we&apos;re here to help.
            </p>
            <a 
              href="mailto:contact@delpat.com"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Mail className="h-5 w-5" />
              contact@delpat.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}