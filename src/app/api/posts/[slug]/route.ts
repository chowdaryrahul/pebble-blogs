import { promises as fs } from 'node:fs';
import path from 'path';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const slug = (await params).slug;
    const filePath = path.join(process.cwd(), 'src/app/blogs', `${slug}.md`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return new NextResponse(fileContent, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse('error', { status: 404, });
  }
}
