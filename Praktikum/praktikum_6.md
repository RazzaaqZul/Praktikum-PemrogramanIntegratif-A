# Praktikum 06: Model Controller & Request Response

###### Nama: Muhammad Razzaaq Zulkahfi<br>NIM: 215150700111047<br>Kelas: Pemrograman Integratif-A

## **Langkah Percobaan**

Menjalankan localhost dengan menjalankan :

```
php -S localhost:8000 -t public
```

> **#1**

# MODEL

Pastikan terdapat tabel users yang dibuat menggunakan migration pada bab
sebelumnya. Berikut informasi kolom yang harus ada:

![lumen/lumenapi/routes/web.php](<../Screenshoot/assets_praktikum_6/Langkah_6_  (2).png> "lumen/lumenapi/routes/web.php")

\*_Penulis telah melakukan migration pada bab 04: Basic Routing dan Migration_

> **#2**

Menuliskan syntax untuk membuat model pada User.php seperti dibawah:

```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class User extends Model
{
    /**
    * The attributes that are mass assignable.
    *
    * @var array
    */
    protected $fillable = [
    'name', 'email', 'password'
    ];
    /**
    * The attributes excluded from the model's JSON form.
    *
    * @var array
    */
    protected $hidden = [];
}
```

![](<../Screenshoot/assets_praktikum_6/Langkah_6_  (1).png>)

Penulis menuliskan pada `Models/User.php` Model untuk menyiapkan, mengatur, memanipulasi, dan mengorganisasikan data yang ada di database. Model merepresentasikan kolom apa saja yang ada pada databas, termasuk relasi dan primary key dapat didefinisikan di dalam model.

# CONTROLLER

> **#1**

Menuliskan syntax untuk membuat Controller `app/Http/Controllers` dengan nama HomeController.php dan membuat fungsi index():

```php
<?php
namespace App\Http\Controllers;
class HomeController extends Controller
{
/**
* Create a new controller instance.
*
* @return void
*/
public function __construct()
{
    //
}
// Pembuatan fungsi index() //
public function index()
{
return 'Hello, from lumen!';
}
// Pembuatan fungsi index() //
//
}
```

![](<../Screenshoot/assets_praktikum_6/Langkah_6_  (3).png>)

> **#2**

Mengubah route pada `web.php`

```php
# Sebelum,
$router->get('/', function () use ($router) {
return $router->app->version();
});
# Setelah,
$router->get('/', ['uses' => 'HomeController@index']);
```

![](<../Screenshoot/assets_praktikum_6/Langkah_6_  (4).png>)

Penulis membuat fungsi dan route yang akan di uji coba pada kelas web.php

![](<../Screenshoot/assets_praktikum_6/Langkah_6_  (5).png>)

**Controller** merupakan bagian yang menjadi **tempat** berkumpulnya **logika pemrograman** yang digunakan untuk memisahkan organisasi data pada database. Dalam beberapa kasus, controller menjadi penghubung antara model dan view pada arsitektur MVCs.

# REQUEST HANDLER

> **#1**

Melakukan import library Request dengan menambahkan baris berikut di bagian atas file

```php
<?php
namespace App\Http\Controllers;
// Import Library Request
use Illuminate\Http\Request;

```

![](<../Screenshoot/assets_praktikum_6/Langkah_6_  (6).png>)

`use Illuminate\Http\Request;` mendeklarasikan kelas Request yang disediakan oleh Lumen dalam file PHP. `Request` ini digunakan untuk mengelola permintaan HTTP.

> **#2**

Mengubah fungsi Index

```php
<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
class HomeController extends Controller
{
    /**
    * Create a new controller instance.
    *
    * @return void
    */
    public function __construct()
    {
    //
    }
    // Perubahan fungsi index
    public function index (Request $request)
    {
    return 'Hello, from lumen! We got your request from endpoint: ' . $request->path();
    }
    // Perubahan fungsi index
    //
}
```

![](<../Screenshoot/assets_praktikum_6/Langkah_6_  (7).png>)

Penulis menuliskan logika yang akan me-return nilai tertentu.

> **#3**

![](<../Screenshoot/assets_praktikum_6/Langkah_6_  (8).png>)

Penulis menjalankan `/` dan akan meuncul hasil diatas. **Request handler** adalah **fungsi** yang digunakan **untuk berinteraksi dengan request yang datang**. Request handler dapat digunakan untuk **melihat** apa saja yang dikirimkan oleh user seperti **parameter, query, dan body**.

# RESPONSE HANDLER

> **#1**

Melakukan import library Response dengan menambahkan baris berikut di bagian
atas file:

```php
<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\Response; // import library Response

```

![](<../Screenshoot/assets_praktikum_6/Langkah_6_  (9).png>)

`use Illuminate\Http\Response; `untuk mengontrol berbagai aspek respons HTTP, seperti status kode, header, dan isi respons yang dikirimkan kembali ke klien setelah menerima permintaan HTTP. Anda dapat menggunakan kelas Response ini untuk menghasilkan respons dengan status yang sesuai dan isi yang diinginkan sesuai dengan kebutuhan aplikasi web Anda.

> **#2**

Membuat fungsi hello:

```php
<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
class HomeController extends Controller
{
    /**
    * Create a new controller instance.
    *
    * @return void
    */
    public function __construct()
    {
    //
    }
    public function index (Request $request)
    {
    return 'Hello, from lumen! We got your request from endpoint: ' . $request->path();
    }
    //
    // Pembuatan fungsi hello
    public function hello()
    {
    $data['status'] = 'Success';
    $data['message'] = 'Hello, from lumen!';
    return (new Response($data, 201))
    ->header('Content-Type', 'application/json');
    }
}
```

![](<../Screenshoot/assets_praktikum_6/Langkah_6_  (10).png>)

> **#3**

Tambahkan route /hello pada file routes/web.php

```php
<?php
$router->get('/', ['uses' => 'HomeController@index']);
$router->get('/hello', ['uses' => 'HomeController@hello']); // route hello
```

![](<../Screenshoot/assets_praktikum_6/Langkah_6_  (11).png>)

Membuat path `/hello` yang akan menjalankan fungsi `hello` yang telah dibuat dalam `HomeController`.

> **#4**

Menjalankan path `/hello`

![](<../Screenshoot/assets_praktikum_6/Langkah_6_  (12).png>)

# Penerapan

> **#1**

Lakukan import model User dengan menambahkan baris berikut di bagian atas file

```php
<?php
namespace App\Http\Controllers;
use App\Models\User; // import model User
use Illuminate\Http\Request;
use Illuminate\Http\Response;
```

![](<../Screenshoot/assets_praktikum_6/Langkah_6_  (13).png>)

> **#2**

Tambahkan ketiga fungsi berikut di HomeController.php

```php
<?php
namespace App\Http\Controllers;
use App\Models\User; // import model User
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class HomeController extends Controller
{
    ...
    // Tiga Fungsi
    public function defaultUser()
    {
    $user = User::create([
        'name' => 'Nahida',
        'email' => 'nahida@akademiya.ac.id',
        'password' => 'smol'
    ]);
    return response()->json([
        'status' => 'Success',
        'message' => 'default user created',
        'data' => [
        'user' => $user,
         ]
    ],200);
    }
    public function createUser(Request $request)
    {
        $name = $request->name;
        $email = $request->email;
        $password = $request->password;
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => $password
        ]);
    return response()->json([
        'status' => 'Success',
        'message' => 'new user created',
        'data' => [
        'user' => $user,
        ]
    ],200);
    }
    public function getUsers()
    {
    $users = User::all();
    return response()->json([
        'status' => 'Success',
        'message' => 'all users grabbed',
        'data' => [
        'users' => $users,
        ]
    ],200);
    }
    // Tiga Fungsi
}
```

![](<../Screenshoot/assets_praktikum_6/Langkah_6_  (14).png>)

![](<../Screenshoot/assets_praktikum_6/Langkah_6_  (15).png>)

> **#3**

Tambahkan ketiga route pada file routes/web.php menggunakan group route

```php
$router->get('/', ['uses' => 'HomeController@index']);
$router->get('/hello', ['uses' => 'HomeController@hello']);

// Tiga Route
$router->group(['prefix' => 'users'], function () use ($router) {
    $router->post('/default', ['uses' => 'HomeController@defaultUser']);
    $router->post('/new', ['uses' => 'HomeController@createUser']);
    $router->get('/all', ['uses' => 'HomeController@getUsers']);
});
```

![](<../Screenshoot/assets_praktikum_6/Langkah_6_  (16).png>)

> **#4**

Jalankan aplikasi pada route /users/default menggunakan Postman

![](<../Screenshoot/assets_praktikum_6/Langkah_6_  (17).png>)

Menajalankan path `/users/default` dengan method `POST`. Tidak perlu mengirimkan value, karena telah di atur secara default pada function `defaultUser` di dalam `HomeController.php`

![](<../Screenshoot/assets_praktikum_6/Langkah_6_  (18).png>)

Menjalankan path `users/new` dengan method `POST` dan mengirimkan value berupa nama (Cyno), email (cyno@akademiya.ac.id), dan password (mahamatra).

![](<../Screenshoot/assets_praktikum_6/Langkah_6_  (19).png>)

Menjalankan oath `users/all` dengan method `GET`.

![](<../Screenshoot/assets_praktikum_6/Langkah_6_  (20).png>)

Memeriksa apakah data yang telah di `POST` masuk ke dalam Database atau tidak.
