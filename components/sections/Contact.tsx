
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
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Please write at least 10 characters"),
});

export function Contact() {
  const methods = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
  const [sent, setSent] = React.useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    methods.handleSubmit(() => {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      methods.reset();
    })(e);
  }

  return (
    <section id="contact" className="scroll-mt-24 py-32">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto scrollbar-hide">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid gap-20 lg:grid-cols-2"
          >
            <div className="space-y-12">
              <div className="space-y-8">
                <h2 className="text-5xl md:text-6xl font-light tracking-tight">
                  Let&apos;s Work<br />
                  <span className="text-accent">Together</span>
                </h2>
                <p className="text-xl font-light text-muted leading-relaxed max-w-lg">
                  Ready to bring your vision to life? Let&apos;s discuss your next project and create something extraordinary.
                </p>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-center gap-4 text-lg font-light">
                  <Mail className="h-6 w-6 text-accent" /> 
                  <span>selihom2001@gmail.com</span>
                </div>
                {/* <div className="flex items-center gap-4 text-lg font-light">
                  <Phone className="h-6 w-6 text-accent" /> 
                  <span>+251 996 986 266</span>
                </div> */}
                <div className="flex items-center gap-4 text-lg font-light">
                  <MapPin className="h-6 w-6 text-accent" /> 
                  <span>Addis Ababa, Ethiopia</span>
                </div>
              </div>
            </div>
<div className="space-y-8">
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
                className="text-lg min-h-32 border-border/50 rounded-2xl font-light resize-none" 
                placeholder="Tell me about your project..." 
                {...field} 
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full text-lg py-6 rounded-full font-light group mt-8"
      >
        Send Message
        <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Button>
    </form>
  </Form>

  {sent && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-2xl border border-accent/20 bg-accent/10 p-6 text-center"
    >
      <div className="text-lg font-light text-accent">
        ✨ Message sent successfully! I&apos;ll get back to you soon.
      </div>
    </motion.div>
  )}
</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

