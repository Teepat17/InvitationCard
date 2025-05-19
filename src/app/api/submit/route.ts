import { NextRequest, NextResponse } from 'next/server';

// In-memory store for submissions
export const submissions: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Basic validation
    if (!data.name || !data.emergency || !data.pdpa) {
      return NextResponse.json({ error: 'ข้อมูลไม่ครบถ้วน' }, { status: 400 });
    }
    submissions.push({ ...data, createdAt: new Date().toISOString() });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 });
  }
} 