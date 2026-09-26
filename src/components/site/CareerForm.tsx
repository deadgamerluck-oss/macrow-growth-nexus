import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Paperclip } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import emailjs from "@emailjs/browser";

interface CareerFormProps {
  jobTitle?: string;
  onSuccess?: () => void;
}

export function CareerForm({ jobTitle, onSuccess }: CareerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a PDF file to upload.");
      return;
    }

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Only PDF resumes are allowed.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const phone = formData.get("phone") as string;
      const position = formData.get("subject") as string;

      // 1. Upload PDF to Supabase Storage
      const fileExt = file.name.split(".").pop() || "pdf";
      const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;
      const filePath = `applications/${fileName}`;

      const { error: uploadError } = await supabase.storage.from("resumes").upload(filePath, file, {
        contentType: "application/pdf",
        upsert: false,
      });

      if (uploadError) {
        throw new Error(`Failed to upload resume: ${uploadError.message}`);
      }

      // 2. Get the public URL for the uploaded file
      const {
        data: { publicUrl },
      } = supabase.storage.from("resumes").getPublicUrl(filePath);

      // 3. Insert application into Supabase DB
      const applicationData = {
        name,
        email,
        phone,
        position,
        resume_path: filePath,
        resume_url: publicUrl,
        status: "new",
      };

      const { error: dbError } = await supabase
        .from("career_applications")
        .insert([applicationData]);

      if (dbError) {
        // Attempt cleanup if DB insert fails
        await supabase.storage
          .from("resumes")
          .remove([filePath])
          .catch((err) => {
            console.error("Failed to cleanup uploaded file:", err);
          });
        throw new Error(`Failed to save application: ${dbError.message}`);
      }

      // 4. Send email using EmailJS
      const templateParams = {
        name,
        email,
        phone,
        position,
        subject: position,
        resume_url: publicUrl,
      };

      try {
        await emailjs.send(
          import.meta.env.VITE_CAREER_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_CAREER_EMAILJS_TEMPLATE_ID,
          templateParams,
          { publicKey: import.meta.env.VITE_CAREER_EMAILJS_PUBLIC_KEY }
        );
      } catch (emailError) {
        console.error("EmailJS error:", emailError);
        // Do NOT throw error, as the application was successfully saved to the database
      }

      toast.success("Application submitted successfully!");
      if (onSuccess) onSuccess();
      formRef.current?.reset();
      if (resumeInputRef.current) {
        resumeInputRef.current.value = "";
      }
      setFile(null);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error instanceof Error ? error.message : "An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please upload a PDF file.");
        e.target.value = "";
        setFile(null);
        return;
      }
      setFile(selectedFile);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" required placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="john@example.com" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" type="tel" required placeholder="+1 (555) 000-0000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            name="subject"
            required
            defaultValue={jobTitle ? `Application: ${jobTitle}` : ""}
            placeholder="Application for..."
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="resume">Resume / CV (PDF)</Label>
        <div className="flex items-center gap-4">
          <Input
            id="resume"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
            className="hidden"
            ref={resumeInputRef}
          />
          <Button
            type="button"
            variant="outline"
            className="w-full justify-start text-muted-foreground"
            onClick={() => document.getElementById("resume")?.click()}
          >
            <Paperclip className="mr-2 h-4 w-4" />
            {file ? file.name : "Upload PDF..."}
          </Button>
        </div>
      </div>

      <Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Apply Now"}
      </Button>
    </form>
  );
}
