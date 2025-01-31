import { promises as fs } from 'node:fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const _params = await params;
    const filePath = path.join(process.cwd(), 'src/app/blogs', `${ _params.slug}.md`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return new NextResponse(fileContent, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse('error', { status: 404, });
  }
}
