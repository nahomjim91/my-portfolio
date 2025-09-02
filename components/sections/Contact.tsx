// /components/sections/Contact.tsx
"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, MapPin, Phone, ArrowUpRight, Copy, ExternalLink, Send, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Please write at least 10 characters"),
});

export function Contact() {
  const methods = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
  const [sent, setSent] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);

  // Watch all form fields to enable/disable buttons
  const watchedFields = methods.watch();
  const isFormValid = React.useMemo(() => {
    const { name, email, subject, message } = watchedFields;
    return name && 
           email && 
           subject && 
           message && 
           name.length >= 2 && 
           email.includes('@') && 
           subject.length >= 2 && 
           message.length >= 10;
  }, [watchedFields]);

  async function handleSendMessage(method: 'email' | 'telegram') {
    // Double check validation
    const isValid = await methods.trigger();
    if (!isValid) return;

    const formData = methods.getValues();

    if (method === 'email') {
      const emailBody = encodeURIComponent(
        `Hi Selihom,\n\n${formData.message}\n\nBest regards,\n${formData.name}\nEmail: ${formData.email}`
      );
      const emailSubject = encodeURIComponent(formData.subject);
      window.open(`mailto:selihom2001@gmail.com?subject=${emailSubject}&body=${emailBody}`, '_blank');
    } else {
      const telegramMessage = encodeURIComponent(
        `📧 ${formData.subject}\n\nFrom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.open(`https://t.me/seli_kidu?text=${telegramMessage}`, '_blank');
    }
    
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    methods.reset();
    setShowForm(false);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // This will be handled by the choice buttons now
  }

  const copyEmail = () => {
    navigator.clipboard.writeText("selihom2001@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openEmailClient = () => {
    window.open("mailto:selihom2001@gmail.com", '_blank');
  };

  return (
    <section id="contact" className="scroll-mt-24 py-32 relative">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto scrollbar-hide">
          
          {/* Main Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-16"
          >
            {/* Header */}
            <div className="space-y-6">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-xl font-light text-muted tracking-wide"
              >
                Have a project in mind?
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative"
              >
                {/* Decorative element */}
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-accent/10 hidden lg:block">
                  <div className="w-full h-full rounded-full border-2 border-accent/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                  </div>
                </div>
                
                <h2 className="text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter">
                  Let&apos;s <span className="text-accent">Chat</span>
                </h2>
              </motion.div>
            </div>

            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-center gap-4 text-2xl font-light group cursor-pointer" onClick={copyEmail}>
                <span className="hover:text-accent transition-colors">selihom2001@gmail.com</span>
                <Copy className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-center gap-4 text-lg font-light text-muted">
                <MapPin className="h-5 w-5" /> 
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto"
            >
              <Button
                onClick={openEmailClient}
                className="text-xl py-8 px-12 rounded-full font-light group w-full sm:w-auto min-w-64"
              >
                <Mail className="mr-3 h-6 w-6" />
                Direct Email
                <ArrowUpRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
              
              <Button
                onClick={() => window.open('https://t.me/seli_kidu', '_blank')}
                variant="outline"
                className="text-xl py-8 px-12 rounded-full font-light group w-full sm:w-auto min-w-64"
              >
                <MessageCircle className="mr-3 h-6 w-6" />
                Telegram Chat
                <Send className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </motion.div>

            {/* Secondary Form Option */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.6 }}
              className="pt-16"
            >
              <Button
                onClick={() => setShowForm(true)}
                variant="ghost"
                className="text-lg font-light text-muted hover:text-accent group"
              >
                Or send a detailed message
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </motion.div>

            {/* Success Message */}
            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  className="fixed top-8 right-8 z-50 rounded-2xl border border-accent/20 bg-background/95 backdrop-blur-sm p-6 shadow-2xl max-w-sm"
                >
                  <div className="text-lg font-light text-accent mb-2">
                    ✨ Message sent successfully!
                  </div>
                  <div className="text-sm font-light text-muted">
                    Your message has been opened in your preferred app. I&apos;ll get back to you soon!
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Copy Success */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  className="fixed top-8 right-8 z-50 rounded-2xl border border-accent/20 bg-background/95 backdrop-blur-sm p-4 shadow-2xl"
                >
                  <div className="text-sm font-light text-accent">
                    ✅ Email copied to clipboard!
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/80 backdrop-blur-sm z-40"
              onClick={() => setShowForm(false)}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed inset-4 sm:inset-8 md:inset-16 lg:inset-24 bg-foreground  border border-border shadow-2xl z-50 overflow-hidden rounded-3xl"
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-8 border-b border-border">
                  <h3 className="text-2xl font-light">Send a Message</h3>
                  <Button
                    onClick={() => setShowForm(false)}
                    variant="ghost"
                    size="sm"
                    className="rounded-full p-2"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto p-8">
                  <div className="max-w-2xl mx-auto">
                    <Form {...methods}>
                      <form onSubmit={onSubmit}>
                        <div className="space-y-6">
                          <FormField 
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-light">Name</FormLabel>
                                <Input 
                                  className="text-lg py-6 border-border/50 rounded-2xl font-light" 
                                  placeholder="Your name" 
                                  {...field} 
                                />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField 
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-light">Email</FormLabel>
                                <Input 
                                  type="email" 
                                  className="text-lg py-6 border-border/50 rounded-2xl font-light" 
                                  placeholder="you@example.com" 
                                  {...field} 
                                />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField 
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-light">Subject</FormLabel>
                                <Input 
                                  className="text-lg py-6 border-border/50 rounded-2xl font-light" 
                                  placeholder="Project inquiry" 
                                  {...field} 
                                />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField 
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-light">Message</FormLabel>
                                <Textarea 
                                  className="text-lg min-h-40 border-border/50 rounded-2xl font-light resize-none" 
                                  placeholder="Tell me about your project..." 
                                  {...field} 
                                />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        {/* Send Options */}
                        <div className="flex gap-4 mt-8">
                          <Button 
                            type="button"
                            onClick={() => handleSendMessage('email')}
                            disabled={!isFormValid}
                            className="flex-1 text-lg py-6 rounded-full font-light group disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Mail className="mr-2 h-5 w-5" />
                            Send via Email
                            <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </Button>
                          <Button 
                            type="button"
                            onClick={() => handleSendMessage('telegram')}
                            disabled={!isFormValid}
                            variant="outline"
                            className="flex-1 text-lg py-6 rounded-full font-light group disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <MessageCircle className="mr-2 h-5 w-5" />
                            Send via Telegram
                            <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </Button>
                        </div>

                        {/* Helper text when form is incomplete */}
                        {!isFormValid && (
                          <div className="mt-4 text-center">
                            <p className="text-sm text-muted font-light">
                              Please fill out all fields to send your message
                            </p>
                          </div>
                        )}
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}