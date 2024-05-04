import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  // Setiap permintaan yang dikirim tidak akan secara otomatis menyertakan header CSRF
  // Anda juga bisa menambahkan konfigurasi tambahan sesuai kebutuhan
  // Contoh:
  // timeout: 10000, // Timeout permintaan 10 detik
  // headers: {
  //   'Authorization': 'Bearer ' + token, // Jika Anda menggunakan autentikasi token
  // }
});

export default instance;
