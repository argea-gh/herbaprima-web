import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest, context: any) {
  try {
    const db = (context as any).env.DB;
    
    if (!db) {
      console.error('DB binding not found!');
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }
    
    const { results } = await db.prepare("SELECT * FROM products ORDER BY created_at DESC").all();
    return NextResponse.json(results);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: "Gagal mengambil data", details: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest, context: any) {
  try {
    const db = (context as any).env.DB;
    
    if (!db) {
      console.error('DB binding not found!');
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }
    
    const body = await request.json();
    await db.prepare(
      `INSERT INTO products (name, slug, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(body.name, body.slug, body.description, body.price, body.stock, body.image_url).run();
    return NextResponse.json({ message: "Produk berhasil ditambahkan" }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: "Gagal menambah produk", details: String(error) }, { status: 500 });
  }
}

