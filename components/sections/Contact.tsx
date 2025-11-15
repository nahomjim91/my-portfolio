"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, MapPin, Copy, ArrowUpRight, Send, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Please write at least 10 characters"),
});

// Letter reveal animation (from Skills)
const letterVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -90,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  })as const,
} ;

// Floating particles (from Skills)
function FloatingParticles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-accent/50"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function Contact() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const methods = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
  const [sent, setSent] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);

  // Scroll-based animations (from Skills)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scale = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.7]
  );

  const opacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.3]
  );

  // Watch all form fields
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
  }

  const copyEmail = () => {
    navigator.clipboard.writeText("selihom2001@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openEmailClient = () => {
    window.open("mailto:selihom2001@gmail.com", '_blank');
  };

  const title = "Let's Chat".split("");

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="scroll-mt-24 py-32 relative overflow-hidden"
    >
      {/* Background effects */}
      <FloatingParticles />

      {/* Gradient orb (from Skills) */}
      <motion.div
        className="absolute top-1/3 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <motion.div
            style={{ scale, opacity }}
            className="text-center space-y-16"
          >
            {/* Header with letter animation */}
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
              
              <div className="overflow-visible" style={{ perspective: "1000px" }}>
                <h2 className="text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter">
                  {title.map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{  }}
                      variants={letterVariants}
                      style={{
                        display: "inline-block",
                        transformOrigin: "50% 50%",
                      }}
                      className={letter === "C" ? "text-accent" : ""}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </h2>
              </div>
            </div>

            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-4"
            >
              <motion.div 
                className="flex items-center justify-center gap-4 text-2xl font-light group cursor-pointer" 
                onClick={copyEmail}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="hover:text-accent transition-colors">selihom2001@gmail.com</span>
                <Copy className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              <motion.div 
                className="flex items-center justify-center gap-4 text-lg font-light text-muted"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <MapPin className="h-5 w-5" /> 
                <span>Winnipeg, Canada</span>
              </motion.div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-full sm:w-auto"
              >
                <Button
                  onClick={openEmailClient}
                  className="text-xl py-8 px-12 rounded-full font-light group w-full min-w-64"
                >
                  <Mail className="mr-3 h-6 w-6" />
                  Direct Email
                  <ArrowUpRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-full sm:w-auto"
              >
                <Button
                  onClick={() => window.open('https://t.me/seli_kidu', '_blank')}
                  variant="outline"
                  className="text-xl py-8 px-12 rounded-full font-light group w-full min-w-64"
                >
                  <MessageCircle className="mr-3 h-6 w-6" />
                  Telegram Chat
                  <Send className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Secondary Form Option */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6 }}
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowForm(false)}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-4 sm:inset-8 md:inset-16 lg:inset-24 bg-background border border-border shadow-2xl z-50 overflow-hidden rounded-3xl"
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-8 border-b border-border">
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl font-light"
                  >
                    Send a Message
                  </motion.h3>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      onClick={() => setShowForm(false)}
                      variant="ghost"
                      size="sm"
                      className="rounded-full p-2"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto p-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl mx-auto"
                  >
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
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1"
                          >
                            <Button 
                              type="button"
                              onClick={() => handleSendMessage('email')}
                              disabled={!isFormValid}
                              className="w-full text-lg py-6 rounded-full font-light group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Mail className="mr-2 h-5 w-5" />
                              Send via Email
                              <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1"
                          >
                            <Button 
                              type="button"
                              onClick={() => handleSendMessage('telegram')}
                              disabled={!isFormValid}
                              variant="outline"
                              className="w-full text-lg py-6 rounded-full font-light group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <MessageCircle className="mr-2 h-5 w-5" />
                              Send via Telegram
                              <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Button>
                          </motion.div>
                        </div>

                        {!isFormValid && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 text-center"
                          >
                            <p className="text-sm text-muted font-light">
                              Please fill out all fields to send your message
                            </p>
                          </motion.div>
                        )}
                      </form>
                    </Form>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}