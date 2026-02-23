'use client';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    stock: '',
    image_url: ''
  });

  // Load products saat halaman dibuka
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      }),
    });
    alert('Produk berhasil ditambahkan!');
    fetchProducts();
    // Reset form
    setFormData({ name: '', slug: '', description: '', price: '', stock: '', image_url: '' });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Admin Herbaprima</h1>
      
      {/* Form Input */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Tambah Produk Baru</h2>
        <div className="grid grid-cols-2 gap-4">
          <input className="border p-2 rounded" placeholder="Nama Produk" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          <input className="border p-2 rounded" placeholder="Slug (url)" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} required />
          <input className="border p-2 rounded" type="number" placeholder="Harga (Rp)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
          <input className="border p-2 rounded" type="number" placeholder="Stok" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
          <input className="border p-2 rounded col-span-2" placeholder="URL Gambar" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
          <textarea className="border p-2 rounded col-span-2" placeholder="Deskripsi" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
        </div>
        <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Simpan Produk</button>
      </form>

      {/* List Produk */}
      <h2 className="text-xl font-semibold mb-4">Daftar Produk</h2>
      <div className="grid gap-4">
        {products.map((p: any) => (
          <div key={p.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold">{p.name}</h3>
              <p className="text-sm text-gray-500">Stok: {p.stock} | Harga: Rp {p.price}</p>
            </div>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">ID: {p.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}