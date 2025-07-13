import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#0369A1] text-white text-sm mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-8">
        
        {/* Logo dan Kontak */}
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <img
              src="https://i.postimg.cc/dVwcbSWF/bps-logo.png"
              alt="Logo BPS"
              className="h-12 w-auto"
            />
            <span className="text-base font-bold uppercase tracking-wide">
              Badan Pusat Statistik
            </span>
          </div>
          <p className="leading-relaxed text-white/90">
            Jl. Dr. Sutomo 6-8<br />
            Jakarta 10710 Indonesia<br />
            Telp (62-21) 3841195; 3842508; 3810291<br />
            Faks (62-21) 3857046<br />
            Mailbox:{' '}
            <a
              href="mailto:bpshq@bps.go.id"
              className="hover:text-gray-300"
            >
              bpshq@bps.go.id
            </a>
          </p>
          <img
            src="https://i.postimg.cc/zvPQF7rw/Ber-AKHLAK.webp"
            alt="BerAKHLAK"
            className="mt-4 h-15"
          />
        </div>

        {/* Tentang Kami */}
        <div>
          <h4 className="text-white font-semibold mb-2">Tentang Kami</h4>
          <ul className="space-y-1">
            <li>
              <a
                href="https://ppid.bps.go.id/app/konten/0000/Profil-BPS.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Profil BPS
              </a>
            </li>
            <li>
              <a
                href="https://ppid.bps.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                PPID
              </a>
            </li>
            <li>
              <a
                href="https://ppid.bps.go.id/app/konten/0000/Layanan-BPS.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Kebijakan Diseminasi
              </a>
            </li>
          </ul>
        </div>

        {/* Tautan Lainnya */}
        <div>
          <h4 className="text-white font-semibold mb-2">Tautan Lainnya</h4>
          <ul className="space-y-1">
            <li><a href="https://www.aseanstats.org/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">ASEAN Stats</a></li>
            <li><a href="https://fmsindonesia.id/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Forum Statistik</a></li>
            <li><a href="https://rb.bps.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Reformasi Birokrasi</a></li>
            <li><a href="https://lpse.bps.go.id/eproc4" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Layanan Pengadaan</a></li>
            <li><a href="https://www.stis.ac.id/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Politeknik Statistika STIS</a></li>
            <li><a href="https://pusdiklat.bps.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">Pusdiklat BPS</a></li>
            <li><a href="https://jdih.web.bps.go.id/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">JDIH BPS</a></li>
          </ul>
        </div>
      </div>

      <div className="bg-[#02557f] text-center py-4 text-xs sm:text-sm">
        <p>© 2025 Politeknik Statistika STIS</p>
        <p>
          Created by Taura Davin Santosa{' '}
          <a href="mailto:222313401@stis.ac.id" className="underline hover:text-slate-100">222313401@stis.ac.id</a>
        </p>
      </div>
    </footer>
  );
}