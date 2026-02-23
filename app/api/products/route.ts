import { NextRequest, NextResponse } from 'next/server';

// GET: Ambil semua produk
export async function GET(request: NextRequest, context: any) {
  try {
    const { results } = await (context as any).env.DB.prepare(
      "SELECT * FROM products ORDER BY created_at DESC"
    ).all();
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

// POST: Tambah produk baru
export async function POST(request: NextRequest, context: any) {
  try {
    const body = await request.json();
    const { name, slug, description, price, stock, image_url } = body;

    const stmt = (context as any).env.DB.prepare(
      `INSERT INTO products (name, slug, description, price, stock, image_url) 
       VALUES (?, ?, ?, ?, ?, ?)`
    );
    
    await stmt.bind(name, slug, description, price, stock, image_url).run();

    return NextResponse.json({ message: "Produk berhasil ditambahkan" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menambah produk" }, { status: 500 });
  }
}
