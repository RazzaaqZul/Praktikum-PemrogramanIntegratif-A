# Praktikum 04: Basic Routing dan Migration

###### Nama: Muhammad Razzaaq Zulkahfi<br>NIM: 215150700111047<br>Kelas: Pemrograman Integratif-A

## **Langkah Percobaan**

> **#1**

_**GET**_

Untuk menambahkan endpoint dengan method GET pada aplikasi kita, kita dapat
mengunjungi file web.php pada folder routes. Kemudian tambahkan baris ini pada akhir
file.

```PHP
$router->get('/ get', function () {
    return 'GET';
});

```

![lumen/lumenapi/routes/web.php](<../Screenshoot/assets_praktikum_4/langkah_4_ (1).png> "lumen/lumenapi/routes/web.php")

<p style="text-align: center;"><i>Gambar 1.1 Membuka web.php pada folder lumen/lumenapi/routes/web.php</i></p>

![lumen/lumenapi/routes/web.php](<../Screenshoot/assets_praktikum_4/langkah_4_ (2).png> "lumen/lumenapi/routes/web.php")

<p style="text-align: center;"><i>Gambar 1.2 Melakukan konfigurasi router pada web.php</i></p>

Setelah itu coba jalankan aplikasi dengan command,

```
php -S localhost:8000 -t public
```

Setelah aplikasi berhasil dijalankan, kita dapat membuka browser dengan url, `http://localhost:8000/get` , path yang akan kita akses akan berbentuk demikian, `http://{BASE_URL}{PATH}` , jika BASE_URL kita adalah `localhost:8000` dan PATH kita adalah /get , maka url akan berbentuk seperti diatas.

![Terminal](<../Screenshoot/assets_praktikum_4/langkah_4_ (3).png> "Terminal")

<p style="text-align: center;"><i>Gambar 1.3 Menjalankan command php -S localhost:8000 -t public</i></p>

![Browser](<../Screenshoot/assets_praktikum_4/langkah_4_ (5).png> "Browser")

<p style="text-align: center;"><i>Gambar 1.4 Menjalankan dalam browser</i></p><br>

> **#2**

_**POST, PUT, PATCH, DELETE, dan OPTIONS**_

Sama halnya saat menambahkan method GET, kita dapat menambahkan methode POST, PUT, PATCH, DELETE, dan OPTIONS pada file web.php dengan code seperti
ini,

```php
...
$router->post('/post', function () {
    return 'POST';
});
$router->put('/put', function () {
    return 'PUT';
});
$router->patch('/patch', function () {
    return 'PATCH';
});
$router->delete('/delete', function () {
    return 'DELETE';
});
$router->options('/options', function () {
    return 'OPTIONS';
});


```

![file web.php](<../Screenshoot/assets_praktikum_4/langkah_4_ (6).png> "file web.php")

<p style="text-align: center; "><i>Gambar 2.1 menambahkan methode POST, PUT, PATCH, DELETE, dan OPTIONS</i></p><br>

Setelah selesai menambahkan route untuk method POST, PUT, PATCH, DELETE, dan OPTIONS, kita dapat menjalankan server seperti pada saat percobaan GET. Setelah server berhasil menyala, kita dapat membuka aplikasi Postman atau Insomnia atau kita juga dapat menggunakan PowerShell (Windows) / Terminal (Linux atau Mac) untuk melakukan request ke server. Namun, pada percobaan kali ini kita akan menggunakan extensions pada VSCode yaitu Thunder Client.

1. Kita dapat menginstall ekstensi dengan membuka panel extensions lalu mencari thunder client<br><br>![Thunder Client](<../Screenshoot/assets_praktikum_4/langkah_4_ (7).png> "Thunder Client")
<p style="text-align: center; "><i>Gambar 2.2 Install Thunder Client</i></p><br>

2. Setelah menginstall Thunder Client, kita akan melihat logo seperti petir pada activity bar kita (sebelah kiri).

3. Kita dapat membuat request dengan menekan "New Request" pada ekstensi<br><br> ![Thunder Client](<../Screenshoot/assets_praktikum_4/langkah_4_ (8).png> "Thunder Client")
<p style="text-align: center; "><i>Gambar 2.3 Menekan "New Request" pada Thunder Client</i></p><br>

4. Setelah itu kita dapat memasukkan method dan url yang dituju<br><br> ![Thunder Client](<../Screenshoot/assets_praktikum_4/langkah_4_ (22).png> "Thunder Client")
<p style="text-align: center; "><i>Gambar 2.4 Memasukkan method dan url yang dituju "/GET"</i></p><br>

5. Akses url yang baru saja ditambahkan pada aplikasi dengan methodnya<br><br>

![Thunder Client](<../Screenshoot/assets_praktikum_4/langkah_4_ (23).png> "Thunder Client")

<p style="text-align: center; "><i>Gambar 2.5 Memasukkan method dan url yang dituju "/POST"</i></p><br>

![Thunder Client](<../Screenshoot/assets_praktikum_4/langkah_4_ (24).png> "Thunder Client")

<p style="text-align: center; "><i>Gambar 2.6 Memasukkan method dan url yang dituju "/PUT"</i></p><br>

![Thunder Client](<../Screenshoot/assets_praktikum_4/langkah_4_ (25).png> "Thunder Client")

<p style="text-align: center; "><i>Gambar 2.7 Memasukkan method dan url yang dituju "/PATCH"</i></p><br>

![Thunder Client](<../Screenshoot/assets_praktikum_4/langkah_4_ (26).png> "Thunder Client")

<p style="text-align: center; "><i>Gambar 2.8 Memasukkan method dan url yang dituju "/DELETE"</i></p><br>

![Thunder Client](<../Screenshoot/assets_praktikum_4/langkah_4_ (27).png> "Thunder Client")

<p style="text-align: center; "><i>Gambar 2.9 Memasukkan method dan url yang dituju "/OPTIONS"</i></p><br>

> **#3**

_**Migrasi Database**_

1.&nbsp;&nbsp; Sebelum melakukan migrasi database pastikan server database aktif kemudian pastikan sudah membuat database dengan nama `lumenapi`<br><br>

![phpmyadmin](<../Screenshoot/assets_praktikum_4/langkah_4_ (9).png> "phpmyadmin")

<p style="text-align: center; "><i>Gambar 3.1 Membuat database "lumenapi"</i></p><br>

2.&nbsp;&nbsp; Kemudian ubah konfigurasi database pada file .env menjadi seperti ini

```PHP
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=lumenapi
DB_USERNAME=root
DB_PASSWORD=<<password masing-masing>>
```

![file .env](<../Screenshoot/assets_praktikum_4/langkah_4_ (11).png> "file .env")

<p style="text-align: center; "><i>Gambar 3.2 Konfigurasi database pada file .env</i></p><br>

3.&nbsp;&nbsp;Setelah mengubah konfigurasi pada file .env, kita juga perlu menghidupkan beberapa library bawaan dari lumen dengan membuka file app.php pada folder bootstrap dan mengubah baris ini,

```
//$app->withFacades();
//$app->withEloquent();
```

Menjadi,

```php
$app->withFacades();
$app->withEloquent();
```

![file app.php](<../Screenshoot/assets_praktikum_4/langkah_4_ (12).png> "app.php")

<p style="text-align: center; "><i>Gambar 3.3 Menghidupkan beberapa library bawaan pada file app.php</i></p><br>

4.&nbsp;&nbsp;Setelah itu jalankan command berikut untuk membuat file migration,

```
php artisan make:migration create_users_table # membuat migrasi untuk tabel users
php artisan make:migration create_products_table # membuat migrasi untuk tabel products
```

![terminal](<../Screenshoot/assets_praktikum_4/langkah_4_ (13).png> "terminal")

<p style="text-align: center; "><i>Gambar 3.4 Melakukan migration</i></p><br>

Setelah menjalankan 2 syntax diatas akan terbuat 2 file pada folder `database/migrations` dengan format YYYY_MM_DD_HHmmss_nama_migrasi. Pada file migrasi kita akan menemukan fungsi up() dan fungsi down(), fungsi up() akan digunakan pada saat kita melakukan migrasi, fungsi down() akan digunakan saat kita ingin me-rollback migrasi.

![folder](<../Screenshoot/assets_praktikum_4/langkah_4_ (14).png> "folder   ")

<p style="text-align: center; "><i>Gambar 3.5  Dua file pada folder database/migrations</i></p><br>

5.&nbsp;&nbsp;Ubah fungsi up pada file migrasi `create_users_table`

```php
# sebelumnya
...
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
    });
}
...
# diubah menjadi
...
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->string('email');
            $table->string('password');
    });
}
...
```

![file migrasi create_users_table   ](<../Screenshoot/assets_praktikum_4/langkah_4_ (15).png> "file migrasi create_users_table   ")

<p style="text-align: center; "><i>Gambar 3.6  File migrasi create_users_table (Sebelum)</i></p><br>

![file migrasi create_users_table   ](<../Screenshoot/assets_praktikum_4/langkah_4_ (16).png> "file migrasi create_users_table   ")

<p style="text-align: center; "><i>Gambar 3.7  File migrasi create_users_table (Sesudah)   </i></p><br>

5.&nbsp;&nbsp;Ubah fungsi up pada file migrasi `create_products_table`<br><br>

```php
# sebelumnya
...
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });
    }
...
# diubah menjadi
...
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->integer('category_id');
            $table->string('slug');
            $table->integer('price');
            $table->integer('weight');
            $table->text('description');
        });
    }
...

```

![file migrasi create_products_table](<../Screenshoot/assets_praktikum_4/langkah_4_ (17).png> "file migrasi create_products_table")

<p style="text-align: center; "><i>Gambar 3.8 File migrasi create_products_table (Sebelum)   </i></p><br>

![file migrasi create_products_table](<../Screenshoot/assets_praktikum_4/langkah_4_ (18).png> "file migrasi create_products_table")

<p style="text-align: center; "><i>Gambar 3.9 File migrasi create_products_table (Sesudah) </i></p><br>

6.&nbsp;&nbsp;Kemudian jalankan command,<br>

```
php artisan migrate
```

![Terminal](<../Screenshoot/assets_praktikum_4/langkah_4_ (19).png> "Terminal")

<p style="text-align: center; "><i>Gambar 3.10 Menjalankan php artisan migrate pada terminal</i></p><br>

![phpmyadmin](<../Screenshoot/assets_praktikum_4/langkah_4_ (20).png> "phpmyadmin")

<p style="text-align: center; "><i>Gambar 3.11 Melakukan cek pada phpmyadmin pada tabel "lumenapi"</i></p><br>
