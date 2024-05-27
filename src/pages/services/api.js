import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api", //setiap aws launch ini ganti untuk ipnya jadi ya harus edit setiap kaoli open itunya hehe
  // Setiap permintaan yang dikirim tidak akan secara otomatis menyertakan header CSRF
  // Anda juga bisa menambahkan konfigurasi tambahan sesuai kebutuhan
  // Contoh:
  // timeout: 10000, // Timeout permintaan 10 detik
  // headers: {
  //   'Authorization': 'Bearer ' + token, // Jika Anda menggunakan autentikasi token
  // }
});

export default instance;
