import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const db = (globalThis as any).DB;
    
    if (!db) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }
    
    const { results } = await db.prepare("SELECT * FROM products ORDER BY created_at DESC").all();
    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json({ 
      error: "Gagal mengambil data", 
      details: error.message || String(error) 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = (globalThis as any).DB;
    
    if (!db) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }
    
    const body = await request.json();
    await db.prepare(
      `INSERT INTO products (name, slug, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(body.name, body.slug, body.description, body.price, body.stock, body.image_url).run();
    
    return NextResponse.json({ message: "Produk berhasil ditambahkan" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ 
      error: "Gagal menambah produk", 
      details: error.message || String(error) 
    }, { status: 500 });
  }
}
