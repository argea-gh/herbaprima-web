import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const db = globalThis.DB;
    
    if (!db) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }
    
    const { results } = await db.prepare("SELECT * FROM products ORDER BY created_at DESC").all();
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const db = globalThis.DB;
    
    if (!db) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }
    
    const body = await request.json();
    await db.prepare(
      `INSERT INTO products (name, slug, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(body.name, body.slug, body.description, body.price, body.stock, body.image_url).run();
    
    return NextResponse.json({ message: "Product created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
