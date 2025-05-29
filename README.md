# Sortify Backend 🚀

Sortify adalah backend API berbasis **Express.js + TypeScript** yang digunakan untuk mengklasifikasikan sampah berdasarkan AI serta menangani komunikasi data secara real-time menggunakan **Redis** dan **Socket.IO**. Backend ini dirancang agar efisien, terintegrasi dengan database MongoDB, dan mudah di-deploy untuk berbagai keperluan produksi. 🏗️

---

## 📌 Prasyarat

Sebelum memulai, pastikan Anda sudah menginstal:

- **Node.js** (versi terbaru disarankan) 🟢
- **Git** 🖥️
- **Redis** (wajib berjalan untuk komunikasi data) 🧠
- **MongoDB** (cloud atau lokal) 🍃

---

## 📥 Clone Repository

```sh
git clone https://github.com/username/sortify-backend.git
cd sortify-backend
```

---

## 📦 Install Dependencies

Jalankan perintah berikut untuk menginstal semua dependensi yang dibutuhkan:

```sh
npm install
```

---

## ⚙️ Konfigurasi Project

Jika diperlukan, buat file **.env** untuk menyimpan variabel lingkungan:

```
MONGODB_URI=mongodb://
```

---

## 🚀 Menjalankan Server dalam Mode Development

Gunakan perintah berikut untuk menjalankan backend dengan **nodemon**:

```sh
npm run dev
```

Server akan berjalan di `http://localhost:3000/` 🌍

---

## 🏗️ Build & Menjalankan dalam Mode Production

Setelah proyek siap untuk produksi, jalankan perintah berikut:

```sh
npm run build
npm start
```

---

## 📂 Struktur Folder

```
sortify-backend/
│── src/                 // Folder utama kode sumber
│   ├── index.ts         // Entry point aplikasi
│   ├── socketHandlers/  // Langganan channel hasil klasifikasi dan kamera
│   ├── config /         // Inisialisasi dan logika koneksi MongoDB, redis, socket io
│── package.json         // File konfigurasi npm
│── tsconfig.json        // Konfigurasi TypeScript
│── nodemon.json         // Konfigurasi nodemon untuk development
```

---

## 📡 Peran Backend

Backend Sortify memiliki tanggung jawab utama sebagai berikut:

- **Subscribe data hasil klasifikasi dan kamera** melalui Redis channel untuk menerima data secara real-time dari servis Sortify Camera (python based).
- **Mengirimkan data klasifikasi dan kamera** ke frontend secara langsung menggunakan **Socket.IO** agar dapat divisualisasikan secara langsung oleh pengguna.
- **Menyimpan hasil klasifikasi ke MongoDB** hanya jika:

  - Kategori klasifikasi **berubah** dari sebelumnya (untuk menghindari penyimpanan duplikat).
  - Nilai **confidence score** memenuhi ambang batas:

    - Sampah **recycle** jika confidence > **91%**
    - Sampah **organic** jika confidence > **40%**

Dengan mekanisme ini, data yang tersimpan tetap relevan dan efisien untuk analisis.

---

## 🚀 Happy Coding!
