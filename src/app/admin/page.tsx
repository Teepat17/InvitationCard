"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [data, setData] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin")
      .then((res) => res.json())
      .then((d) => {
        setData(d.submissions || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-luxury flex flex-col items-center py-12">
      <div className="luxury-gold text-3xl font-bold mb-8">ข้อมูลผู้ตอบรับ</div>
      {loading ? (
        <div className="text-white">กำลังโหลด...</div>
      ) : data.length === 0 ? (
        <div className="text-white">ยังไม่มีข้อมูล</div>
      ) : (
        <div className="overflow-x-auto w-full max-w-2xl">
          <table className="min-w-full bg-white luxury-border">
            <thead>
              <tr className="bg-luxury text-white">
                <th className="px-4 py-2 luxury-gold">ชื่อ-นามสกุล</th>
                <th className="px-4 py-2 luxury-gold">การแพ้อาหาร</th>
                <th className="px-4 py-2 luxury-gold">เบอร์ติดต่อฉุกเฉิน</th>
                <th className="px-4 py-2 luxury-gold">เวลา</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className="border-t border-luxury">
                  <td className="px-4 py-2 text-luxury">{item.name}</td>
                  <td className="px-4 py-2 text-luxury">{item.allergy || '-'}</td>
                  <td className="px-4 py-2 text-luxury">{item.emergency}</td>
                  <td className="px-4 py-2 text-luxury text-xs">{new Date(item.createdAt).toLocaleString("th-TH")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 