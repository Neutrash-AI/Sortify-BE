# Sortify Backend 🚀

Sortify adalah backend API berbasis **Express.js + TypeScript** yang digunakan untuk mengklasifikasikan sampah berdasarkan AI. Ikuti langkah-langkah berikut untuk menjalankan proyek ini secara lokal. 🏗️

---

## 📌 Prasyarat

Sebelum memulai, pastikan Anda sudah menginstal:

- **Node.js** (versi terbaru disarankan) 🟢
- **Git** 🖥️

## 📥 Clone Repository

```sh
 git clone https://github.com/username/sortify-backend.git
 cd sortify-backend
```

## 📦 Install Dependencies

Jalankan perintah berikut untuk menginstal semua dependensi yang dibutuhkan:

```sh
npm install
```

## ⚙️ Konfigurasi Project

Jika diperlukan, buat file **.env** untuk menyimpan variabel lingkungan:

```
PORT=3000
```

## 🚀 Menjalankan Server dalam Mode Development

Gunakan perintah berikut untuk menjalankan backend dengan **nodemon**:

```sh
npm run dev
```

Server akan berjalan di `http://localhost:3000/` 🌍

## 🏗️ Build & Menjalankan dalam Mode Production

Setelah proyek siap untuk produksi, jalankan perintah berikut:

```sh
npm run build
npm start
```

## 📂 Struktur Folder

```
sortify-backend/
│── src/                 // Folder utama kode sumber
│   ├── index.ts         // Entry point aplikasi
│── package.json         // File konfigurasi npm
│── tsconfig.json        // Konfigurasi TypeScript
│── nodemon.json         // Konfigurasi nodemon untuk development
```

## 📡 API Endpoints

| Method | Endpoint | Description                   |
| ------ | -------- | ----------------------------- |
| GET    | `/`      | Cek apakah server berjalan ✅ |
