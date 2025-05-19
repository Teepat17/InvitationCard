import { NextResponse } from 'next/server';
import { submissions } from '../submit/route';

export async function GET() {
  return NextResponse.json({ submissions });
} 