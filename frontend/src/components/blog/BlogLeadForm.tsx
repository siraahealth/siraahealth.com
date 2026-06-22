"use client";
import { useState } from "react";

export default function BlogLeadForm({ slug }: { slug: string }) {
  const [form, setForm] = useState({ name: "", phone: "", city: "", concern: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.phone) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/hubspot/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: form.phone,
          firstname: form.name,
          source: "Blog Lead Form",
          last_landing_page: `/blog/${slug}`,
          first_landing_page: `/blog/${slug}`,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", city: "", concern: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div id="lead-form" className="bg-teal-50 rounded-2xl p-8 mb-20">
      <h3 className="text-xl font-bold text-gray-900 mb-1">Consult our specialists today</h3>
      <p className="text-gray-500 text-sm mb-6">Get expert advice from Siraa Health doctors</p>
      {status === "success" ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-3">✅</div>
          <p className="text-lg font-semibold text-gray-900">Thank you! We'll be in touch shortly.</p>
          <p className="text-gray-500 text-sm mt-1">Our specialists will call you within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text" placeholder="Your name"
            value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm w-full bg-white"
          />
          <input
            type="tel" placeholder="Mobile number" required
            value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm w-full bg-white"
          />
          <input
            type="text" placeholder="City"
            value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm w-full bg-white"
          />
          <input
            type="text" placeholder="Concern / Treatment"
            value={form.concern} onChange={e => setForm(f => ({ ...f, concern: e.target.value }))}
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm w-full bg-white"
          />
          {status === "error" && (
            <p className="md:col-span-2 text-red-500 text-sm">Something went wrong. Please try again.</p>
          )}
          <button
            type="submit" disabled={status === "loading"}
            className="md:col-span-2 bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition disabled:opacity-60"
          >
            {status === "loading" ? "Submitting..." : "Submit enquiry"}
          </button>
        </form>
      )}
    </div>
  );
}
