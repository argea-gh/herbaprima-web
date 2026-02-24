'use server';

export async function getProducts() {
  try {
    // @ts-ignore - Cloudflare injects DB at runtime
    const db = globalThis.DB;
    
    if (!db) {
      console.error('DB not found');
      return { error: 'Database not configured' };
    }
    
    const { results } = await db.prepare(
      "SELECT * FROM products ORDER BY created_at DESC"
    ).all();
    
    return { data: results };
  } catch (error: any) {
    console.error('Get products error:', error);
    return { error: error.message || 'Failed to fetch' };
  }
}

export async function createProduct(formData: FormData) {
  try {
    // @ts-ignore - Cloudflare injects DB at runtime
    const db = globalThis.DB;
    
    if (!db) {
      console.error('DB not found');
      return { error: 'Database not configured' };
    }
    
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const price = Number(formData.get('price'));
    const stock = Number(formData.get('stock'));
    const image_url = formData.get('image_url') as string;

    await db.prepare(
      `INSERT INTO products (name, slug, description, price, stock, image_url) 
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(name, slug, description, price, stock, image_url).run();

    return { success: true };
  } catch (error: any) {
    console.error('Create product error:', error);
    return { error: error.message || 'Failed to create' };
  }
}
