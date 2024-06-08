# API Gateway Microservice
API Gateway microservice adalah bagian dari arsitektur microservice yang dibangun untuk mengelola API aplikasi belajar online (kelas digital). Service ini digunakan untuk menggabungkan dan mengelola semua service dalam satu tempat.

## Daftar Isi
1. [Prasyarat](#prasyarat)
2. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
3. [Fitur-fitur](#fitur---fitur)
4. [Pemasangan](#pemasangan)

## Prasyarat
- [GIT](https://www.git-scm.com/downloads)
- [Node 20.14](https://nodejs.org/en/download/package-manager/current)
- [MySQL 8.0](https://dev.mysql.com/downloads/installer/)

## Teknologi yang Digunakan
- Express 4
- Cors
- Dotenv
- Axios
- Multer
- Form Data
- JSON Web Token

## Fitur - fitur
1. **Autentikasi Pengguna:**
    - Register dan login pengguna.

2. **Manajemen User:**
    - Menampilkan data pengguna.
    - Memperbarui data pengguna.

3. **Manajemen Media:**
    - Menampilkan, mengunggah, dan menghapus file.

4. **Manajemen Course:**
    - Menampilkan, membuat, dan mengubah kursus.

5. **Manajemen Chapter:**
    - Menampilkan, membuat, mengubah, dan menghapus chapter.

6. **Manajemen Lesson:**
    - Menampilkan, membuat, mengubah, dan menghapus lesson.

7. **Manajemen Course Image:**
    - Mengunggah dan menghapus course image.

8. **Manajemen My Course:**
    - Menampilkan dan menambahkan pengguna ke dalam kursus.

9. **Manajemen Review:**
    - Membuat, mengubah, dan menghapus ulasan.

10. **Manajemen Order:**
    - Pengguna melakukan join kursus.

## Pemasangan
Langkah-langkah untuk menginstall proyek ini.

Clone proyek
```bash
git clone https://github.com/DimasPondra/api-gateway-microservice.git
```

Masuk ke dalam folder proyek
```bash
cd api-gateway-microservice
```

Install depedencies
```bash
npm install
```

Buat konfigurasi file
```bash
cp .env-example .env
```

Rubah `.env` untuk konfigurasi sesuai variabel
- `URL_SERVICE_MEDIA` - Url untuk mengakses service media.
- `URL_SERVICE_USER` - Url untuk mengakses service user.
- `URL_SERVICE_COURSE` - Url untuk mengakses service course.
- `URL_SERVICE_ORDER` - Url untuk mengakses service order.
- `JWT_SECRET_KEY` - Kunci rahasia yang digunakan untuk menandatangani dan memverifikasi token JWT.

Mulai server
```bash
npm run start
```

Dengan mengikuti langkah-langkah di atas, Anda akan dapat menjalankan API Gateway Microservice yang mengelola berbagai service dalam aplikasi belajar online Anda.
