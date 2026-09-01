import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Primitives";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | MACROW" },
      { name: "description", content: "Privacy Policy for MACROW Growth Nexus" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        intro="Last updated: August 2026. We believe in transparency about how we collect and use your data."
      />
      <Section className="py-20 max-w-4xl mx-auto">
        <div className="prose prose-slate lg:prose-lg mx-auto">
          <p className="lead text-xl text-slate-600 mb-8">
            This Privacy Policy describes how MACROW ("we", "us", or "our") collects, uses, and shares your personal information when you visit or interact with our website and services.
          </p>

          <h2 className="text-3xl font-serif mt-12 mb-6">1. Information We Collect</h2>
          <p className="mb-4 text-slate-700 leading-relaxed">
            We collect information you provide directly to us when you fill out a form, request a consultation, or communicate with us. This may include:
          </p>
          <ul className="list-disc pl-6 mb-8 text-slate-700 space-y-2">
            <li>Name and contact information (email address, phone number)</li>
            <li>Company details and professional titles</li>
            <li>Messages or inquiries submitted through our contact forms</li>
          </ul>

          <h2 className="text-3xl font-serif mt-12 mb-6">2. Automatically Collected Data</h2>
          <p className="mb-4 text-slate-700 leading-relaxed">
            When you access our website, we may automatically collect certain information about your device and usage patterns, including:
          </p>
          <ul className="list-disc pl-6 mb-8 text-slate-700 space-y-2">
            <li>IP address and browser type</li>
            <li>Pages visited and time spent on the site</li>
            <li>Referring website addresses</li>
          </ul>

          <h2 className="text-3xl font-serif mt-12 mb-6">3. Use of Cookies</h2>
          <p className="mb-4 text-slate-700 leading-relaxed">
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our site.
          </p>

          <h2 className="text-3xl font-serif mt-12 mb-6">4. How We Use Your Information</h2>
          <p className="mb-4 text-slate-700 leading-relaxed">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-8 text-slate-700 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Communicate with you regarding your inquiries or projects</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our website</li>
            <li>Detect, investigate, and prevent fraudulent transactions or other illegal activities</li>
          </ul>

          <h2 className="text-3xl font-serif mt-12 mb-6">5. Contact Us</h2>
          <p className="mb-4 text-slate-700 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            <a href="mailto:privacy@macrow.com" className="text-[#ff3b00] hover:underline font-semibold mt-2 inline-block">
              privacy@macrow.com
            </a>
          </p>
        </div>
      </Section>
    </>
  );
}
