'use client';
import { useState, useEffect } from 'react';
import { getProducts, createProduct } from '../actions/products';  // ← Import server actions

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  created_at: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    stock: '',
    image_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

const fetchProducts = async () => {
  const result = await getProducts();
  if (result.data) {
    setProducts(result.data);
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');
  
  // ✅ Gunakan nama berbeda untuk FormData object
  const fd = new FormData();
  fd.append('name', formState.name);
  fd.append('slug', formState.slug);
  fd.append('description', formState.description);
  fd.append('price', String(formState.price));
  fd.append('stock', String(formState.stock));
  fd.append('image_url', formState.image_url);
  
  const result = await createProduct(fd);
  
  if (result.success) {
    setMessage('✅ Produk berhasil ditambahkan!');
    fetchProducts();
    setFormState({ name: '', slug: '', description: '', price: '', stock: '', image_url: '' });
  } else {
    setMessage('❌ ' + result.error);
  }
  
  setLoading(false);
};

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">🌿 Admin Herbaprima</h1>
          <p className="text-gray-600">Kelola produk toko herbal Anda</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-green-100 text-green-600 p-2 rounded-lg mr-2">➕</span>
                Tambah Produk
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk *</label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"  
                    placeholder="Contoh: Kopi Herbal" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL) *</label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"  
                    placeholder="kopi-herbal" 
                    value={formData.slug} 
                    onChange={e => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} 
                    required 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp) *</label>
                    <input 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"  
                      type="number" 
                      placeholder="50000" 
                      value={formData.price} 
                      onChange={e => setFormData({...formData, price: e.target.value})} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stok *</label>
                    <input 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"  
                      type="number" 
                      placeholder="100" 
                      value={formData.stock} 
                      onChange={e => setFormData({...formData, stock: e.target.value})} 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
                  <input 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"   
                    placeholder="https://..." 
                    value={formData.image_url} 
                    onChange={e => setFormData({...formData, image_url: e.target.value})} 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <textarea 
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"  
                    placeholder="Deskripsi produk..." 
                    rows={3}
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})} 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
                >
                  {loading ? 'Menyimpan...' : '💾 Simpan Produk'}
                </button>

                {message && (
                  <div className={`p-3 rounded-lg text-sm ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* List Products Section */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-2">📦</span>
                Daftar Produk ({products.length})
              </h2>

              {products.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-6xl mb-4">📭</div>
                  <p>Belum ada produk. Tambahkan produk pertama Anda!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Produk</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Harga</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Stok</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                          <td className="py-4 px-4">
                            <div className="font-bold text-gray-800">{p.name}</div>
                            <div className="text-xs text-gray-500">{p.slug}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                              Rp {p.price.toLocaleString('id-ID')}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${p.stock > 10 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                              {p.stock} unit
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



