"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function FormPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    allergy: "",
    emergency: "",
    pdpa: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let checked = false;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      checked = e.target.checked;
    }
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "เกิดข้อผิดพลาด");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-luxury">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="bg-white luxury-border p-8 max-w-md w-full flex flex-col items-center shadow-xl"
      >
        <div className="luxury-gold text-2xl font-bold mb-4">กรอกข้อมูลของคุณ</div>
        {submitted ? (
          <div className="text-luxury text-center text-lg">ขอบคุณสำหรับการตอบรับคำเชิญ!</div>
        ) : (
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="text-luxury font-semibold">ชื่อ-นามสกุล
              <input
                type="text"
                name="name"
                required
                className="mt-1 w-full p-2 rounded border border-luxury focus:outline-none focus:ring-2 focus:ring-luxury"
                value={form.name}
                onChange={handleChange}
              />
            </label>
            <label className="text-luxury font-semibold">การแพ้อาหาร (ถ้ามี)
              <textarea
                name="allergy"
                className="mt-1 w-full p-2 rounded border border-luxury focus:outline-none focus:ring-2 focus:ring-luxury"
                value={form.allergy}
                onChange={handleChange}
              />
            </label>
            <label className="text-luxury font-semibold">เบอร์ติดต่อฉุกเฉิน
              <input
                type="tel"
                name="emergency"
                required
                className="mt-1 w-full p-2 rounded border border-luxury focus:outline-none focus:ring-2 focus:ring-luxury"
                value={form.emergency}
                onChange={handleChange}
              />
            </label>
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                name="pdpa"
                required
                checked={form.pdpa}
                onChange={handleChange}
              />
              <span className="text-luxury text-sm">ข้าพเจ้ายินยอมให้เก็บและใช้ข้อมูลส่วนบุคคลนี้ตาม PDPA</span>
            </label>
            {error && <div className="text-red-500 text-center mb-2">{error}</div>}
            <button
              type="submit"
              className="mt-4 px-6 py-2 rounded-full bg-luxury luxury-gold text-lg font-semibold shadow hover:scale-105 transition-transform"
            >
              ส่งข้อมูล
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
} 