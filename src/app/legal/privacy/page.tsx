import { Shield, Eye, Database, Cookie, Lock, Users, Settings, Mail, Clock, CheckCircle, AlertTriangle, Globe } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-card shadow-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
              <p className="text-muted-foreground flex items-center gap-2 mt-2">
                <Clock className="h-4 w-4" />
                Last updated: June 2024
              </p>
            </div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-primary/90">
              At <strong>Delpat</strong>, your privacy isn&apos;t just a policy—it&apos;s a promise. We&apos;re here to help you execute, 
              not to sell your data or waste your trust. This page explains exactly what we collect, why we need it, and how we protect it.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">No Data Sales</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Lock className="h-5 w-5" />
              <span className="font-medium">Industry Security</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Eye className="h-5 w-5" />
              <span className="font-medium">Full Transparency</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid gap-8">

          {/* What We Collect */}
          <section className="bg-card rounded-xl shadow-sm p-8 border border-border">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary/10 rounded-lg flex-shrink-0">
                <Database className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-foreground mb-4">What Information We Collect</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-secondary/90 mb-2">Contact Information</h3>
                        <ul className="text-secondary/80 space-y-1 text-sm">
                          <li>• Name and email address</li>
                          <li>• Company and job title</li>
                          <li>• Project details and requirements</li>
                          <li>• Communication preferences</li>
                        </ul>
                        <p className="text-secondary/70 text-xs mt-2 italic">
                          Only collected when you reach out or work with us
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Eye className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-accent/90 mb-2">Usage Analytics</h3>
                        <ul className="text-accent/80 space-y-1 text-sm">
                          <li>• Pages visited and time spent</li>
                          <li>• Device type and browser info</li>
                          <li>• Geographic location (city level)</li>
                          <li>• Referral sources</li>
                        </ul>
                        <p className="text-accent/70 text-xs mt-2 italic">
                          Anonymized data to improve our website
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Data */}
          <section className="bg-card rounded-xl shadow-sm p-8 border border-border">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 rounded-lg flex-shrink-0">
                <Settings className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-accent bg-accent/5 p-4 rounded-r-lg">
                    <h3 className="font-medium text-accent/90 mb-2">✓ Service Delivery</h3>
                    <p className="text-accent/80 text-sm">
                      Responding to inquiries, delivering projects, and providing ongoing support for our services.
                    </p>
                  </div>
                  <div className="border-l-4 border-secondary bg-secondary/5 p-4 rounded-r-lg">
                    <h3 className="font-medium text-secondary/90 mb-2">✓ Website Improvement</h3>
                    <p className="text-secondary/80 text-sm">
                      Understanding how visitors use our site to optimize performance and create better user experiences.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-lg">
                    <h3 className="font-medium text-primary/90 mb-2">✓ Important Communications</h3>
                    <p className="text-primary/80 text-sm">
                      Sending project updates, service announcements, and policy changes. No spam, ever—we promise.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies & Tracking */}
          <section className="bg-card rounded-xl shadow-sm p-8 border border-border">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-yellow-400/10 rounded-lg flex-shrink-0">
                <Cookie className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies & Website Tracking</h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    We use cookies and similar technologies to enhance your browsing experience and understand how our website performs.
                  </p>
                  <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-lg p-4 mt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium text-yellow-600/90 mb-2">Essential Cookies</h3>
                        <p className="text-yellow-600/80 text-sm">
                          Required for basic website functionality, security, and user preferences.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-yellow-600/90 mb-2">Analytics Cookies</h3>
                        <p className="text-yellow-600/80 text-sm">
                          Help us understand visitor behavior to improve our website and services.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-background border border-yellow-400/20 rounded text-center">
                      <p className="text-yellow-600/90 text-sm">
                        💡 <strong>Your Choice:</strong> You can disable cookies in your browser settings at any time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Security & Third Parties */}
          <div className="grid md:grid-cols-2 gap-8">
            <section className="bg-card rounded-xl shadow-sm p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <Lock className="h-5 w-5 text-destructive" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Data Security</h2>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Industry-standard encryption</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Secure data transmission (HTTPS)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Regular security audits</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Limited access controls</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-destructive/80 text-xs">
                    While no system is 100% secure, we continuously invest in protecting your information and take your trust seriously.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-xl shadow-sm p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Third-Party Services</h2>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                We work with trusted partners to provide better services:
              </p>
              <div className="space-y-3 text-sm">
                <div className="bg-primary/5 border border-primary/20 rounded p-3">
                  <div className="font-medium text-primary/90">Analytics Providers</div>
                  <div className="text-primary/80 text-xs">Help us understand website usage patterns</div>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded p-3">
                  <div className="font-medium text-primary/90">Email Services</div>
                  <div className="text-primary/80 text-xs">Secure communication and updates</div>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded p-3">
                  <div className="font-medium text-primary/90">Hosting Providers</div>
                  <div className="text-primary/80 text-xs">Reliable and secure website infrastructure</div>
                </div>
              </div>
              <p className="text-primary/70 text-xs mt-3 italic">
                All partners must meet our privacy and security standards.
              </p>
            </section>
          </div>

          {/* Your Rights */}
          <section className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl p-8 border border-accent/20">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-semibold text-foreground">Your Privacy Rights</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                You have complete control over your personal information. Here&apos;s what you can do:
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg p-4 text-center shadow-sm">
                <Eye className="h-8 w-8 text-secondary mx-auto mb-2" />
                <h3 className="font-medium text-foreground mb-2">Access</h3>
                <p className="text-muted-foreground text-sm">See what data we have about you</p>
              </div>
              <div className="bg-card rounded-lg p-4 text-center shadow-sm">
                <Settings className="h-8 w-8 text-accent mx-auto mb-2" />
                <h3 className="font-medium text-foreground mb-2">Update</h3>
                <p className="text-muted-foreground text-sm">Correct or modify your information</p>
              </div>
              <div className="bg-card rounded-lg p-4 text-center shadow-sm">
                <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
                <h3 className="font-medium text-foreground mb-2">Delete</h3>
                <p className="text-muted-foreground text-sm">Remove your data from our systems</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-accent/80 text-sm mb-4">
                Want to exercise any of these rights? Just send us an email—we&apos;ll respond within 48 hours.
              </p>
              <a 
                href="mailto:contact@delpat.com"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Mail className="h-5 w-5" />
                contact@delpat.com
              </a>
            </div>
          </section>

          {/* Policy Updates */}
          <section className="bg-card rounded-xl shadow-sm p-8 border border-border">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="h-6 w-6 text-muted-foreground" />
                <h2 className="text-2xl font-semibold text-foreground">Policy Updates</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                As we evolve our services, this privacy policy may need updates. We believe in transparency, 
                so we&apos;ll always notify you of significant changes.
              </p>
              <div className="bg-muted border border-border rounded-lg p-4 max-w-md mx-auto">
                <p className="text-muted-foreground text-sm">
                  <strong>Our Promise:</strong> Major changes will be communicated via email with at least 30 days notice.
                </p>
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
              <h2 className="text-xl font-semibold">Questions About Your Privacy?</h2>
            </div>
            <p className="text-gray-300 mb-6">
              We&apos;re real people who care about your privacy. If you have any questions or concerns, 
              don&apos;t hesitate to reach out—we&apos;re here to help.
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