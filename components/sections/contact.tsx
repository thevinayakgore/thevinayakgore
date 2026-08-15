"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquareQuote, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // Validate form
    if (!formData.email || !formData.projectType || !formData.message) {
      setSubmitStatus({
        type: "error",
        message:
          "Please fill in all required fields (Email, Project Type, and Message).",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          projectType: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "Network error. Please check your connection and try again." + error,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="flex flex-col gap-5 md:gap-10 max-w-6xl m-auto w-full"
    >
      <h2 className="sansita-swashed text-center p-5 text-7xl md:text-[15rem] bg-clip-text text-transparent bg-linear-to-b from-primary/60 via-primary/20 to-transparent tracking-tighter font-light leading-none">
        Let&apos;s Build
      </h2>

      <div className="p-5 md:p-10 bg-foreground/5 border rounded-3xl w-full">
        <div className="flex items-start justify-between w-full">
          <div className="w-full">
            <span className="text-base md:text-lg font-medium text-foreground/50 leading-none">
              For more information
            </span>
            <h2 className="text-xl md:text-3xl font-medium mt-5 mb-3">
              Send a clear message.
            </h2>
            <p className="text-sm md:text-base leading-none tracking-wide text-foreground/60">
              Fill in the form and I&apos;ll get back to you within 24 hours.
            </p>
          </div>
          <div className="hidden rounded-lg border border-green-500/50 bg-green-500/10 p-3 text-green-500 md:block">
            <MessageSquareQuote className="size-6" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 md:mt-10 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground/72">Name</p>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name (optional)"
                className="h-12 w-full rounded-lg border border-foreground/10 bg-foreground/3 px-4 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground/72">
                Email <span className="text-red-500">*</span>
              </p>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
                className="h-12 w-full rounded-lg border border-foreground/10 bg-foreground/3 px-4 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground/72">
              Project type <span className="text-red-500">*</span>
            </p>
            <Input
              type="text"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              placeholder="Landing page, MVP, design system, AI feature, website redesign..."
              required
              className="h-12 w-full rounded-lg border border-foreground/10 bg-foreground/3 px-4 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground/72">
              Message <span className="text-red-500">*</span>
            </p>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell me what you are building, what stage you are at, and what kind of help you need."
              className="w-full rounded-xl border border-foreground/10 bg-foreground/3 px-4 py-3 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none h-25!"
            />
          </div>

          {/* Status Messages */}
          {submitStatus.type === "success" && (
            <p className="p-3 text-sm font-medium bg-green-500/10 border border-green-500/50 rounded-lg text-green-500">
              {submitStatus.message} wfvwrf
            </p>
          )}

          {submitStatus.type === "error" && (
            <p className="p-3 text-sm font-medium bg-red-500/10 border border-red-500/50 rounded-lg text-red-500">
              {submitStatus.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="p-5.5! mt-5 border-[0.8px] border-secondary/70! ring-2 ring-foreground bg-foreground! text-secondary! font-medium disabled:opacity-50 disabled:cursor-not-allowed w-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Submit Message
                <Send className="size-4" />
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
