// Updated: 2026-02-23 - Fix context type for Cloudflare Pages
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, context: any) {
  const db = (context as any).env.DB;
  const { results } = await db.prepare("SELECT * FROM products ORDER BY created_at DESC").all();
  return NextResponse.json(results);
}

export async function POST(request: NextRequest, context: any) {
  const db = (context as any).env.DB;
  const body = await request.json();
  await db.prepare(
    `INSERT INTO products (name, slug, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(body.name, body.slug, body.description, body.price, body.stock, body.image_url).run();
  return NextResponse.json({ message: "Produk berhasil ditambahkan" }, { status: 201 });
}
