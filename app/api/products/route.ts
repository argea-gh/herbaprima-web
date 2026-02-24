import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest, { env }: any) {
  try {
    const db = env.DB;
    
    if (!db) {
      return NextResponse.json({ error: 'Database binding not found' }, { status: 500 });
    }
    
    const { results } = await db.prepare("SELECT * FROM products ORDER BY created_at DESC").all();
    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json({ 
      error: "Failed to fetch products", 
      details: error.message || String(error) 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { env }: any) {
  try {
    const db = env.DB;
    
    if (!db) {
      return NextResponse.json({ error: 'Database binding not found' }, { status: 500 });
    }
    
    const body = await request.json();
    await db.prepare(
      `INSERT INTO products (name, slug, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(body.name, body.slug, body.description, body.price, body.stock, body.image_url).run();
    
    return NextResponse.json({ message: "Product created" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ 
      error: "Failed to create product", 
      details: error.message || String(error) 
    }, { status: 500 });
  }
}
