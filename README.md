# Web Security Sandbox

Selamat datang di modul pembelajaran Web Security! 
Di sini, Anda akan belajar mengenai pilar keamanan web dasar melalui simulasi eksploitasi dan mitigasi secara langsung.

## Capaian Pembelajaran
Anda akan menguasai 4 materi inti keamanan web:
1. **SOP (Same-Origin Policy)**
2. **CORS (Cross-Origin Resource Sharing)**
3. **XSS (Cross-Site Scripting)**
4. **CSRF (Cross-Site Request Forgery)**

## Struktur Proyek
1. `starter-project/`: Proyek awal yang memiliki antarmuka (UI) dan server, **tetapi sengaja dibuat rentan**. Anda akan mengerjakan misi Anda di folder ini. Terdapat komentar `// TODO:` di dalam kode untuk memandu Anda.
2. `solution/`: Kunci jawaban dari `starter-project` yang sudah aman dan ditambal (patched). Jadikan folder ini sebagai referensi jika Anda kesulitan.

## Cara Menjalankan Aplikasi

Anda akan perlu membuka beberapa terminal terpisah.

### Menjalankan Backend (Server Bank API)
```bash
cd starter-project/backend
npm install
node server.js
```
*Server akan berjalan di port 5000*

### Menjalankan Frontend Bank (Web Korban)
```bash
cd starter-project/frontend-bank
npm install
npm run dev
```
*Web akan berjalan di port 5173 (atau port lain yang ditampilkan Vite)*

### Menjalankan Frontend Hacker (Simulasi Penyerang)
Anda bisa menggunakan ekstensi *Live Server* di VS Code atau web server sederhana:
```bash
cd starter-project/frontend-hacker
npx serve .
```

## Misi Anda! 🎯

### Misi 1: CORS & SOP
1. Buka aplikasi Frontend Bank. Buka *Developer Tools -> Console* di browser.
2. Saat mencoba Login atau melihat Saldo, Anda akan melihat pesan error berwarna merah terkait CORS.
3. **Tugas Anda:** Buka `backend/server.js`, cari `// TODO 1`, dan konfigurasikan `cors` agar menerima *request* dari Frontend Bank.

### Misi 2: XSS (Cross-Site Scripting)
1. Buka halaman Buku Tamu (Guestbook) di aplikasi Bank.
2. Masukkan komentar dengan *script* jahat: `<img src="x" onerror="alert('Hacked via XSS!')">`
3. Lihat apa yang terjadi! 
4. **Tugas Anda:** Buka `frontend-bank/src/App.jsx`, cari `// TODO 2`, lalu gunakan `DOMPurify` untuk mensanitasi komentar sebelum dirender.

### Misi 3: CSRF (Cross-Site Request Forgery)
1. Pastikan Anda sudah Login di Frontend Bank.
2. Buka Frontend Hacker di tab browser lain, lalu tekan tombol **"Klaim Hadiah 1 Juta!"**.
3. Cek kembali saldo Anda di aplikasi Bank. Saldo Anda akan berkurang!
4. **Tugas Anda:** Buka `backend/server.js`, terapkan proteksi CSRF di `// TODO 3` (misalnya dengan menyetel `SameSite: 'Lax'` pada Cookie Login atau menambahkan proteksi Token). 

---
Selamat meretas dan menambal!
