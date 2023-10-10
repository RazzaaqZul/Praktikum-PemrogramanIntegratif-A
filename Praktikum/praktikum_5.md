# Praktikum 04: Dynamic Route dan Middleware

###### Nama: Muhammad Razzaaq Zulkahfi<br>NIM: 215150700111047<br>Kelas: Pemrograman Integratif-A

## **Langkah Percobaan**

Menjalankan localhost dengan menjalankan :

```
php -S localhost:8000 -t public
```

> **#1**

_**Dynamic Route**_

Dynamic Route memungkinkan untuk mengubah route secara dinamis ketika membuka halaman web. Sebagai contoh `users/1` atau `users/2`. Untuk menambahkan dynamic routes, penulis menggunakan syntax berikut:

```php
$router->get('/user/{id}', function ($id){
    return 'User id = ' . $id;
});
```

Dalam syntax diatas, jika berhasil maka akan menjalankan fungsi dan akan mereturn user id yang di tambahkan pada parameter. Penulis menambahkan syntax tersebut di dalam `routes/web.php` serta mennjalankan path `/user/{id}`:

![lumen/lumenapi/routes/web.php](<../Screenshoot/assets_praktikum_5/langkah_5_ (2).png> "lumen/lumenapi/routes/web.php")

Dalam Dynamic Route, bisa menambahkan parameter lebih dari 1 variabel. Penulis menggunakan syntax berikut:

```php
$router->get('/post/{postId}/comments/{commentId}', function ($postId, $commentId) {
    return 'Post ID = ' . $postId . 'Comments ID = ' . $commentId;
});
```

Syntax diatas menunjukkan penggunaan Dynamic Route dengan 2 varibel, yaitu `{postId}` dan `{commentId}`. Penulis membuat dan mengetest path menggunakan _Thunder Client_:

![lumen/lumenapi/routes/web.php](<../Screenshoot/assets_praktikum_5/langkah_5_ (3).png> "lumen/lumenapi/routes/web.php")

Kita juga dapat menambahkan Optional Routes, yang mana optional
routes tidak mengharuskan kita untuk memberi variable pada endpoint kita, namun saat kita memanggil endpoint, dapat menggunakan parameter variable ataupun tidak, seperti pada
kode dibawah ini

```php
$router->get('/users[/{userId}]', function ($userId = null){
    return $userId == null ? 'Data semua users' : 'Data user dengan id ' . $userId;
});
```

Penulis melakukan uji Path `/users` dengan `userId = null`

![lumen/lumenapi/routes/web.php](<../Screenshoot/assets_praktikum_5/langkah_5_ (4).png> "lumen/lumenapi/routes/web.php")

Penulis melakukan uji Path `/users/8000` dengan `userId = 8000`

![lumen/lumenapi/routes/web.php](<../Screenshoot/assets_praktikum_5/langkah_5_ (5).png> "lumen/lumenapi/routes/web.php")

> **#2**

_**Aliases Route**_

Aliases Route digunakan untuk memberi nama pada route yang telah kita buat, hal ini dapat membantu kita, saat kita ingin memanggil route tersebut pada aplikasi kita. Berikut syntax untuk menambahkan aliases route

```php
$router->get('/auth/login', ['as' => 'route.auth.login', function(){

}]);

$router->get('/profile', function(Request $request){
    // user diperiksa, apakah sudah login?
    // jika ($request->isLoggedIn) = true, maka redirect 'route.auth.login'
    if($request->isLoggedIn){
        return redirect()->route('route.auth.login');
    }
});
```

![lumen/lumenapi/routes/web.php](<../Screenshoot/assets_praktikum_5/langkah_5_ (6).png> "lumen/lumenapi/routes/web.php")

> **#3**

_**Group Route**_

Pada lumen, kita juga dapat memberikan grouping pada routes kita agar lebih mudah pada saat penulisan route pada web.php kita. Kita dapat melakukan grouping dengan menggunakan syntax berikut,

```php

// Group Route
// untuk mempermudah penulisan route

// semua route akan di kelompokkan pada prefix '/users'
$router->group(['prefix' => 'users'], function() use ($router) {
    // menambah route dengan path'/', sehingga saat dipanggil '/users + /'
    $router->get('/', function(){
        return "GET /users";
    });
});
```

Penulis menjalankan path `/users` dalam prefix dan menambahkan `/` sehingga di dapatkan `/users/` akan mereturn "GET /users"

![lumen/lumenapi/routes/web.php](<../Screenshoot/assets_praktikum_5/langkah_5_ (7).png> "lumen/lumenapi/routes/web.php")

> **#4**

_**Middleware**_

Middleware adalah penengah antara komunikasi aplikasi dan client. Middleware biasanya digunakan untuk membatasi siapa yang dapat berinteraksi dengan aplikasi kita dan semacamnya, kita dapat menambahkan middleware dengan menambahkan file pada folder `app/Http/Middleware` . Pada folder tersebut terdapat file ExampleMiddleware , kita dapat men-copy file tersebut untuk membuat middleware baru.

Pada praktikum kali ini akan dibuat middleware Age (`AgeMiddleware.php`) dengan isi,

```php
<?php

namespace App\Http\Middleware;

use Closure;

class AgeMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->age < 17)
            return redirect('/fail');
        return $next($request);
    }
}

```

![app/Http/Middleware/AgeMiddleware.php](<../Screenshoot/assets_praktikum_5/langkah_5_ (10).png> "app/Http/Middleware/AgeMiddleware.php")

Kemudian, setelah menambahkan filter pada `AgeMiddleware` , kita harus mendaftarkan`AgeMiddleware` pada aplikasi kita, pada file `bootstrap/app.php` seperti berikut ini,

```php
73 ...
74
75 // $app->middleware([
76 // App\Http\Middleware\ExampleMiddleware::class
77 // ]);
78
79 $app->routeMiddleware([
80      // 'auth' => App\Http\Middleware\Authenticate::class,
81      'age' => App\Http\Middleware\AgeMiddleware::class
82 ]);
83
84 ...

```

![bootstrap/app.php](<../Screenshoot/assets_praktikum_5/langkah_5_ (8).png> "bootstrap/app.php")

Lalu, kita dapat menambahkan middleware pada routes kita dengan menambahkan opsi middleware pada salah satu route, contohnya,

```php
$router->get('/admin/home/', ['middleware' => 'age', function (){
        return 'Dewasa';
}]);

$router->get('/fail', function () {
    return 'Dibawah umur';
});
```

Penulis melakukan uji coba path `admin/home?age=16` maka akan direct ke `/fail` karena kita telah mengatur logic dalam middleware. Ketika `age < 17` maka akan mendirect ke `/fail`

![lumen/lumenapi/routes/web.php](<../Screenshoot/assets_praktikum_5/langkah_5_ (9).png> "lumen/lumenapi/routes/web.php")
