# Praktikum 02: CRUD MongoDB Compass dan Shell

_Nama: Muhammad Razzaaq Zulkahfi<br>
NIM: 215150700111047<br>
Kelas: Pemrograman Integratif-A_

## **Langkah Percobaan**

_MongoDB Compass_

1. Lakukan koneksi ke MongoDB menggunakan connection string <br><br>![Koneksi ke MongoDB](<../Screenshoot/assets_praktikum_2/langkah_%20(1).png> "Koneksi ke MongoDB")

2. Buat database dengan melakukan klik “Create Database”<br><br>![Create Database](<../Screenshoot/assets_praktikum_2/langkah_%20(2).png> "Create Database")

3. Lakukan insert buku pertama dengan melakukan klik “Add Data”, pilih “Insert Document”, isi dengan data yang diinginkan dan klik “Insert”<br><br>![Insert Document](<../Screenshoot/assets_praktikum_2/langkah_%20(3).png> "Insert Document")<br>![Memasukkan data ke 1](../Screenshoot/assets_praktikum_2/langkah_terlewat.png "Masukkan data ke 1")

4. Lakukan insert buku kedua dengan cara yang sama.<br><br>![Memasukkan data ke 2](<../Screenshoot/assets_praktikum_2/langkah_%20(4).png> "Masukkan data ke 2")

5. Lakukan pencarian buku dengan author “Osamu Dazai" dengan mengisi filter yang diinginkan dan klik “Find”<br><br>![Find Osamu Dazai](<../Screenshoot/assets_praktikum_2/langkah_%20(5).png> "Find Osamu Dazai")

6. Lakukan perubahan summary pada buku “No Longer Human” menjadi “Buku yang
   bagus (`<NAMA>,<NIM>`) dengan melakukan klik “Edit Document” (berlambang pensil), mengisi nilai summary yang baru, dan melakukan klik “Update”<br><br>![Melakukan klik “Edit Document” ](<../Screenshoot/assets_praktikum_2/langkah_%20(6).png> "Melakukan klik “Edit Document” ")

7. Lakukan penghapusan pada buku “I Am a Cat” dengan melakukan klik “Remove Document” (berlambang tong sampah) dan melakukan klik “Delete”<br><br>![Penghapusan pada buku “I Am a Cat”](<../Screenshoot/assets_praktikum_2/langkah_%20(7).png> "Penghapusan pada buku “I Am a Cat”")

_MongoDB Shell_

1. Lakukan koneksi ke MongoDB Server dengan menjalankan command mongosh bagi yang menggunakan terminal build in OS sehingga tampilan terminal kalian akan
   menjadi seperti berikut<br><br>![Menjalankan command mongosh](<../Screenshoot/assets_praktikum_2/langkah_%20(8).png> "Menjalankan command mongosh")

2. Mencoba melihat list database yang ada di server dengan menjalankan command _show dbs_<br><br>![Melihat list database](<../Screenshoot/assets_praktikum_2/langkah_%20(9).png> "Melihat list database")
   <br><br>
   Untuk berpindah ke database “bookstore” gunakan command _use bookstore_ , kalian dapat memastikan telah berpindah ke database yang benar dengan melihat tulisan sebelum tanda “>”<br><br>![Berpindah ke database “bookstore”](<../Screenshoot/assets_praktikum_2/langkah_%20(10).png> "Berpindah ke database “bookstore”")
   <br><br>Cobalah untuk melihat collection yang ada pada database tersebut dengan menggunakan command _show collections_<br><br>![Melihat collection yang ada pada database ](<../Screenshoot/assets_praktikum_2/langkah_%20(11).png> "Melihat collection yang ada pada database ")

3. Lakukan insert buku “Overlord I” dengan menggunakan command
   db.books.insertOne(`<data kalian>`) , setelah insert buku berhasil maka MongoDB akan
   mengembalikan pesan sebagai berikut.<br><br>![Lakukan insert buku “Overlord I”](<../Screenshoot/assets_praktikum_2/langkah_%20(12).png> "Lakukan insert buku “Overlord I”")

4. Lakukan insert buku “The Setting Sun” dan “Hujan” dengan insert many dengan menggunakan command db.books.insertMany(`<data kalian>`) , dan akan mengembalikan pesan sebagai berikut.<br><br>![Lakukan insert buku “The Setting Sun” dan “Hujan” dengan insert many](<../Screenshoot/assets_praktikum_2/langkah_%20(14).png> "Lakukan insert buku “The Setting Sun” dan “Hujan” dengan insert many")

5. Lakukan pencarian buku dengan menggunakan command db.books.find() untuk melakukan pencarian semua buku.<br><br>![pencarian buku](<../Screenshoot/assets_praktikum_2/langkah_%20(16).png> "pencarian buku")

6. Tampilkan seluruh buku dengan author “Osamu Dazai” dengan mengisi argument pada find() dengan menggunakan command db.books.find({`<filter yang ingin
diisi>`})<br><br>![Tampilkan seluruh buku dengan author “Osamu Dazai”](<../Screenshoot/assets_praktikum_2/langkah_%20(17).png> "Tampilkan seluruh buku dengan author “Osamu Dazai”")

7. Lakukan perubahan summary pada buku “Hujan” menjadi “Buku yang bagus(`<NAMA>,<NIM>`) dengan mengunakan command `db.books.updateOne({<filter>}, {$set: {<data yang akan di update>}}) `sehingga output yang dihasilkan oleh MongoDB akan menjadi seperti berikut <br><br>![Lakukan perubahan summary](<../Screenshoot/assets_praktikum_2/langkah_%20(18).png> "Lakukan perubahan summary")

8. Lakukan perubahan publisher menjadi “Yen Press” pada semua buku “Osamu Dazai” dengan menggunakan command `db.books.updateMany({<filter>}, {$set: {<data yang akan di update>}})`<br><br>![Lakukan perubahan publisher ](<../Screenshoot/assets_praktikum_2/langkah_%20(20).png> "Lakukan perubahan publisher ")

9. Lakukan penghapusan pada buku “Overlord I” dengan menggunakan command `db.books.deleteOne({<argument>})`<br><br>![Lakukan penghapusan pada buku](<../Screenshoot/assets_praktikum_2/langkah_%20(21).png> "Lakukan penghapusan pada buku")

10. Lakukan penghapusan pada semua buku “Osamu Dazai dengan menggunakan
    command `db.books.deleteMany({<argument>})`<br><br>![Lakukan penghapusan pada semua buku](<../Screenshoot/assets_praktikum_2/langkah_%20(22).png> "Lakukan penghapusan pada semua buku")
