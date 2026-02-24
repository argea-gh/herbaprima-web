import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-green-700 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">🌿 Herbaprima</h1>
          <nav>
            <Link href="/admin" className="bg-white text-green-700 px-4 py-2 rounded hover:bg-green-100">
              Admin Panel
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <h2 className="text-5xl font-bold text-green-800 mb-4">
          Produk Herbal Alami
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Solusi kesehatan dari alam untuk kehidupan yang lebih baik
        </p>
        <Link href="/admin" className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-green-700">
          Lihat Produk
        </Link>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-green-800 mb-12">
            Keunggulan Kami
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🌱</div>
              <h4 className="text-xl font-semibold mb-2">100% Alami</h4>
              <p className="text-gray-600">Bahan baku pilihan dari alam tanpa bahan kimia</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">✅</div>
              <h4 className="text-xl font-semibold mb-2">Teruji Klinis</h4>
              <p className="text-gray-600">Sudah teruji keamanan dan khasiatnya</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🚚</div>
              <h4 className="text-xl font-semibold mb-2">Pengiriman Cepat</h4>
              <p className="text-gray-600">Layanan pengiriman ke seluruh Indonesia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 text-center">
        <p>&copy; 2026 Herbaprima. All rights reserved.</p>
      </footer>
    </div>
  );
}
