# Praktikum 09: JSON Web Token (JWT)

###### Nama: Muhammad Razzaaq Zulkahfi<br>NIM: 215150700111047<br>Kelas: Pemrograman Integratif-A

# DASAR TEORI

## JSON Web Token

JSON Web Token (JWT) adalah standar terbuka yang mendefinisikan cara ringkas dan mandiri untuk transmisi informasi antar
pihak secara aman dalam bentuk objek JSON. Informasi ini dapat diverifikasi karena ditandatangani secara digital
menggunakan secret key (dengan algoritma HMAC) atau pasangan kunci publik/pribadi menggunakan RSA atau ECSDA.

### Penggunaan

1. Authorization
   <br>
   Setelah user masuk, setiap request perlu menyertakan. Hal ini mengizinkan user untuk mengakses route, service, dan
   resource yang diizinkan menggunakan token.
1. Information Exchange
   <br>
   JWT dapat digunakan untuk mengamankan transmisi data antar pihak. Hal ini dimungkinkan karena JWT dapat
   ditandatangani untuk memastikan data dikirimkan oleh pengirim yang benar. Penggunaan signature yang dihitung dengan
   header dan payload dapat memverifikasi data yang dikirimkan tidak diubah di tengah jalan.

### Strukur

JSON Web Token menggunakan pola berikut. Header, payload, signature dipisahkan dengan titik.

```
xxxxx.yyyyy.zzzzz
```

1. Header
   <br>
   Berisi algoritma yang digunakan serta jenis token.

```JSON
{
    "alg": "HS256",
    "typ": "JWT"
}
```

Data di atas akan di-encode menjadi Base64

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

2. Payload
   <br>
   Berisi data yang ditransmisikan. Walaupun JWT memastikan dapat yang dikirim tidak diubah, Base64 yang digunakan dapat
   di-decode. Hal ini membuat JWT tidak dapat digunakan untuk transmisi data rahasia seperti plain text password.

```JSON
{
    "sub": "1234567890",
    "name": "Nilou",
    "iat": 1516239022
}
```

Data di atas akan di-encode menjadi Base64

```
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik5pbG91IiwiaWF0IjoxNTE2MjM5MDIyfQ
```

3. Signature
   <br>
   Hasil penandatanganan yang dilakukan dengan header dan payload yang sudah di-encode diikuti dengan secret key
   menggunakan algoritma yang didefinisikan di header.
   Proses penandatanganan menggunakan rumus sebagai berikut

```JSON
HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    secret)
```

Yang menghasilkan signature sebagai berikut

```
58_9vUl1BQN7Fpqs7u7r4tyJC_wvFJ5n4GibGTVnGpU
```

# Langkah Percobaaan

## Penyesuaian Database

> **#1**

Lakukan perubahan pada length kolom token dengan menghapus parameter 72 di belakangnya

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnTokenToUsers extends Migration
{
/**
* Run the migrations.
*
* @return void
*/
// from this
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('token', 72)->unique()->nullable(); //
        });
    }
    // to this
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('token')->unique()->nullable();
        });
    }
...
}

```

![](<../Screenshoot/assets_praktikum_9/langkah_9_ (2).png>)

### Penjelasan:

kode tersebut memperbaiki migrasi sebelumnya dengan menghapus panjang maksimum 72 karakter dari tipe data string, sehingga tipe data 'token' hanya menjadi string biasa dengan properti unik dan nullable.

<br>

> **#2**

Jalankan perintah di bawah untuk memperbaharui migrasi dan menghapus data yang lama

```php
php artisan migrate:fresh
```

![](<../Screenshoot/assets_praktikum_9/langkah_9_ (3).png>)

<br>

> **#3**

Jalankan aplikasi pada endpoint /auth/register dengan body berikut.

```json
{
  "name": "Scaramouche",
  "email": "scaramouche@fatui.org",
  "password": "wanderer"
}
```

![](<../Screenshoot/assets_praktikum_9/langkah_9_ (4).png>)

### Penjelasan:

Mendaftarkan user baru.

<br>

## JWT MANUAL

> **#1**

Tambahkan ketiga fungsi berikut pada AuthController.php

```php
<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
    {
    ...
    private function base64url_encode(String $data): String
    {
        $base64 = base64_encode($data); // ubah json string menjadi base64
        $base64url = strtr($base64, '+/', '-_'); // ubah char '+' -> '-' dan '/' -> '_'
        return rtrim($base64url, '='); // menghilangkan '=' pada akhir string
    }

    private function sign(String $header, String $payload, String $secret): String
    {
        $signature = hash_hmac('sha256', "{$header}.{$payload}", $secret, true);
        $signature_base64url = $this->base64url_encode($signature);
        return $signature_base64url;
    }

    private function jwt(array $header, array $payload, String $secret): String
    {
        $header_json = json_encode($header);
        $payload_json = json_encode($payload);
        $header_base64url = $this->base64url_encode($header_json);
        $payload_base64url = $this->base64url_encode($payload_json);
        $signature_base64url = $this->sign($header_base64url, $payload_base64url, $secret);
        $jwt = "{$header_base64url}.{$payload_base64url}.{$signature_base64url}";
        return $jwt;
    }
}

```

![](<../Screenshoot/assets_praktikum_9/langkah_9_ (5).png>)

### Penjelasan:

1. `base64url_encode`: Metode ini mengambil sebuah string dan mengubahnya menjadi format base64url yang digunakan dalam JWT. Ini melibatkan encoding string menjadi base64, mengganti karakter '+' dengan '-', karakter '/' dengan '\_', dan menghilangkan karakter '=' dari akhirnya.

2. `sign`: Metode ini digunakan untuk menghasilkan tanda tangan (signature) untuk JWT. Tanda tangan dibuat dengan menggunakan HMAC-SHA256 dari gabungan header dan payload JWT, yang kemudian diubah menjadi format base64url menggunakan metode base64url_encode.

3. `jwt`: Metode ini mengambil header dan payload dalam bentuk array, dan sebuah secret key. Metode ini mengubah header dan payload ke dalam format JSON, kemudian mengencode keduanya menjadi base64url. Setelah itu, metode ini menggunakan metode sign untuk membuat tanda tangan, dan akhirnya menggabungkan header, payload, dan tanda tangan untuk membentuk token JWT yang valid.

<br>

> **#2**

Lakukan perubahan pada fungsi login

```php
<?php
namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class AuthController extends Controller
{
...
    public function login(Request $request)
    {
        $email = $request->email;
        $password = $request->password;
        $user = User::where('email', $email)->first();

        if (!$user) {
        return response()->json([
            'status' => 'Error',
            'message' => 'user not exist',
        ],404);
        }

        if (!Hash::check($password, $user->password)) {
        return response()->json([
            'status' => 'Error',
            'message' => 'wrong password',
        ],400);
        }
        //
        $jwt = $this->jwt(
        [
            'alg' => 'HS256',
            'typ' => 'JWT'
        ],
        [
            'id' => $user->id,
        ],
            'secret'
        );
        $user->token = $jwt;
        //
        $user->save();
        return response()->json([
            'status' => 'Success',
            'message' => 'successfully login',
            'data' => [
                'user' => $user,
            ]
        ],200);
    }
    ...
}

```

![](<../Screenshoot/assets_praktikum_9/langkah_9_ (6).png>)

### Penjelasan:

1. Metode `login`: Metode ini digunakan untuk menangani permintaan login dari seorang pengguna. Ia mengambil data email dan password dari permintaan POST yang diterima.

2. Pengecekan User `(!user)`: Terlebih dahulu, kode memeriksa apakah pengguna dengan alamat email yang diberikan ada dalam database. Jika tidak, ia mengembalikan respons JSON dengan status "Error" dan pesan "user not exist" dengan kode status 404 (Not Found).

3. Pengecekan Password: Jika pengguna dengan email tersebut ada, maka kode memeriksa apakah password yang diberikan sesuai dengan password yang disimpan dalam database. Jika tidak cocok, ia mengembalikan respons JSON dengan status "Error" dan pesan "wrong password" dengan kode status 400 (Bad Request).

4. Pembuatan JWT `($jwt)`: Jika email dan password valid, maka sebuah token `JWT` dibuat dengan menggunakan metode `jwt` dengan header dan payload yang sesuai. Token ini kemudian disimpan dalam kolom `'token'` di record pengguna dalam database.

5. Penyimpanan Token: Token JWT yang telah dibuat disimpan dalam kolom 'token' untuk pengguna yang berhasil login.

6. Respon Sukses: Akhirnya, respons JSON sukses dikembalikan dengan status "Success", pesan "successfully login", dan data pengguna yang terkait. Kode status respons adalah 200 (OK).

<br>

> **#3**

Tambahkan keempat fungsi berikut pada Middleware/Authorization.php

```php
<?php
namespace App\Http\Middleware;
use App\Models\User;
use Closure;
class Authorization
{
...
    private function base64url_encode(string $data): string
    {
        $base64 = base64_encode($data);
        $base64url = strtr($base64, '+/', '-_');
        return rtrim($base64url, '=');
    }
    private function base64url_decode(string $base64url): string
    {
        $base64 = strtr($base64url, '-_', '+/');
        $json = base64_decode($base64);
        return $json;
    }
    private function sign(string $header_base64url, string $payload_base64url, string $secret): string
    {
        $signature = hash_hmac('sha256', "{$header_base64url}.{$payload_base64url}", $secret, true);
        $signature_base64url = $this->base64url_encode($signature);
        return $signature_base64url;
    }
    private function verify(string $signature_base64url, string $header_base64url, string $payload_base64url, string $secret): bool
    {
        $signature = $this->base64url_decode($signature_base64url);
        $expected_signature = $this->base64url_decode($this->sign($header_base64url, $payload_base64url, $secret));
        return hash_equals($expected_signature, $signature);
    }
}

```

![](<../Screenshoot/assets_praktikum_9/langkah_9_ (7).png>)

### Penjelasan:

1. `base64url_encode`: Mengubah string ke format base64url.
2. `base64url_decode`: Melakukan dekode dari base64url ke JSON.
3. `sign`: Membuat tanda tangan JWT dengan HMAC-SHA256.
4. `verify`: Memverifikasi apakah tanda tangan JWT cocok dengan yang diharapkan.

<br>

> **#4**

Lakukan perubahan pada fungsi handle

```php
<?php
namespace App\Http\Middleware;
use App\Models\User;
use Closure;

class Authorization
{
/**
* Handle an incoming request.
*
* @param \Illuminate\Http\Request $request
* @param \Closure $next
* @return mixed
*/
public function handle($request, Closure $next)
{
    $token = $request->header('token') ?? $request->query('token');
    if (!$token) {
        return response()->json([
            'status' => 'Error',
            'message' => 'token not provided',
        ],400);
    }
    //
    [
        $header_base64url,
        $payload_base64url,
        $signature_base64url
    ] = explode('.', $token);

    $header = $this->base64url_decode($header_base64url);
    $json_header = json_decode($header);

    if (!$json_header->alg || $json_header->alg !== 'HS256') {
        return response()->json([
            'status' => 'Error',
            'message' => 'type of token not valid',
        ],401);
    }

    if (!$json_header->typ || $json_header->typ !== 'JWT') {
        return response()->json([
            'status' => 'Error',
            'message' => 'type of token not valid',
        ],401);
    }

    $payload = $this->base64url_decode($payload_base64url);
    $json_payload = json_decode($payload);
    if (!$json_payload->id) {
        return response()->json([
            'status' => 'Error',
            'message' => 'invalid token',
        ],400);;
    }

    $verified = $this->verify($signature_base64url, $header_base64url, $payload_base64url, 'secret');
    if (!$verified) {
        return response()->json([
            'status' => 'Error',
            'message' => 'invalid sign token',
        ],400);;
    }
    $id = $json_payload->id;
    $user = User::where('id', $id)->first();
    //
    if (!$user) {
        return response()->json([
            'status' => 'Error',
            'message' => 'invalid token',
        ],400);
    }
    $request->user = $user;
    return $next($request);
    }
...
}

```

![](<../Screenshoot/assets_praktikum_9/langkah_9_ (8).png>)

### Penjelasan:

1. Kode pertama mengambil dan mencoba menemukan token dari header permintaan atau parameter query. Jika tidak ada, mengembalikan respons JSON "token not provided" (kode 400).

2. Token JWT dipisahkan menjadi bagian header, payload, dan tanda tangan, lalu didekode menjadi format JSON.

3. Kode memeriksa header token untuk memastikan bahwa algoritma adalah 'HS256' dan tipe adalah 'JWT'. Jika tidak valid, mengembalikan respons "type of token not valid" (kode 401).

4. Payload token didekode dan dicek keberadaan field 'id'. Jika tidak ada, mengembalikan respons "invalid token" (kode 400).

5. Dilakukan verifikasi tanda tangan dengan menggunakan metode verify. Jika verifikasi gagal, mengembalikan respons "invalid sign token" (kode 400).

6. Jika semua verifikasi berhasil, ID dari payload diambil dan digunakan untuk mencari pengguna dalam database.

7. Jika pengguna tidak ditemukan, mengembalikan respons "invalid token" (kode 400).

8. Jika semuanya valid, pengguna ditambahkan ke request, dan kontrol dilewatkan ke lapisan middleware selanjutnya menggunakan $next($request).

<br>

> **#5**

Jalankan aplikasi pada endpoint /auth/login dengan body berikut. Salinlah token yang didapat ke notepad

```JSON
{
    "email": "scaramouche@fatui.org",
    "password": "wanderer"
}

```

![](<../Screenshoot/assets_praktikum_9/langkah_9_ (9).png>)

<br>

> **#6**

Jalankan aplikasi pada endpoint /home dengan melampirkan nilai token yang didapat setelah login pada header

![](<../Screenshoot/assets_praktikum_9/langkah_9_ (10).png>)

## JWT Library

<br>

> **#1**

Lakukan generate jwt key secara online menggunakan website Djecrety ― Django Secret Key Generator

![](<../Screenshoot/assets_praktikum_9/langkah_9_ (11).png>)
![](<../Screenshoot/assets_praktikum_9/langkah_9_ (12).png>)

### Penjelasan:

Setelah mendapatkan secret key kita akan memasukkan secret key tersebut pada file .env dengan membuat variable baru
bernama JWT_SECRET

<br>

> **#2**

Lakukan instalasi package jwt firebase dengan menggunakan command berikut

```php
composer require firebase/php-jwt
```

![](<../Screenshoot/assets_praktikum_9/langkah_9_ (13).png>)

<br>

> **#3**

Tambahkan fungsi berikut pada file AuthController

```php
<?php
namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
//
use Firebase\JWT\JWT;
class AuthController extends Controller
{
    /**
    * Create a new controller instance.
    *
    * @return void
    */
    public function __construct(Request $request) //
    {
    //
        $this->request = $request;
    }
    //

    protected function jwt(User $user)
    {
    $payload = [
        'iss' => 'lumen-jwt', //issuer of the token
        'sub' => $user->id, //subject of the token
        'iat' => time(), //time when JWT was issued.
        'exp' => time() + 60 * 60 //time when JWT will expire
    ];
    return JWT::encode($payload, env('JWT_SECRET'), 'HS256');
    }
...
}

```

![](<../Screenshoot/assets_praktikum_9/langkah_9_ (14).png>)

### Penjelasan:

1. Kode constructor digunakan untuk menginisialisasi objek $request untuk digunakan dalam kelas.

2. Metode jwt menerima objek pengguna (User) dan membuat payload JWT dengan klaim "iss" (issuer), "sub" (subject), "iat" (waktu penerbitan), dan "exp" (waktu kadaluwarsa). Payload ini kemudian dienkripsi menggunakan kunci rahasia dari environment (env('JWT_SECRET')) dengan algoritma HS256, dan hasilnya adalah token JWT yang digunakan untuk otentikasi.

<br>

> **#4**

Lakukan perubahan pada fungsi login menjadi seperti berikut

```php
<?php
namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
//
use Firebase\JWT\JWT;
class AuthController extends Controller
{
...
public function login(Request $request)
{
    $email = $request->email;
    $password = $request->password;
    $user = User::where('email', $email)->first();
    if (!$user) {
        return response()->json([
            'status' => 'Error',
            'message' => 'user not exist',
        ], 404);
    }

    if (!Hash::check($password, $user->password)) {
        return response()->json([
            'status' => 'Error',
            'message' => 'wrong password',
        ], 400);
    }
    $user->token = $this->jwt($user); //
    $user->save();
    return response()->json([
        'status' => 'Success',
        'message' => 'successfully login',
        'data' => [
            'user' => $user,
        ]
    ], 200);
}
}

```

![](<../Screenshoot/assets_praktikum_9/langkah_9_ (15).png>)

### Penjelasan:

Menambahkan ``   `$user->token = $this->jwt($user); //```

<br>

> **#5**

Buatlah file JwtMiddleware.php dan isikan baris code berikut

```php
<?php
namespace App\Http\Middleware;
use Closure;
use Exception;
use App\Models\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;

class JwtMiddleware
{
function handle($request, Closure $next, $guard = null)
{
    $token = $request->header('token') ?? $request->query('token');
    // $token = $request->get('token');
    if (!$token) {
    //Unauthorized response if token not there
    return response()->json([
        'error' => 'Token not provded.'
    ], 401);
    }
    try {
        $credentials =
        JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));
    } catch (ExpiredException $e) {
        return response()->json([
            'error' => 'Provided token is expired.'
        ], 400);
    } catch (Exception $e) {
        return response()->json([
            'error' => 'An error while decoding token.'
        ], 400);
    }
    $user = User::find($credentials->sub);
    $request->user = $user;
    return $next($request);
}
}

```

![](<../Screenshoot/assets_praktikum_9/langkah_9_ (16).png>)

### Penjelasan:

1. Kode pertama mencoba mengambil token dari header permintaan atau parameter query. Jika token tidak ada, itu mengembalikan respons JSON dengan pesan "Token not provided" dan kode status 401.

2. Kemudian, kode mencoba mendekode token dengan menggunakan kunci rahasia dari environment (env('JWT_SECRET')) dan algoritma HS256. Jika token telah kadaluwarsa, kode mengembalikan respons JSON dengan pesan "Provided token is expired" dan kode status 400.

3. Jika terjadi kesalahan lain saat mendekode token, kode mengembalikan respons JSON dengan pesan kesalahan "An error while decoding token" dan kode status 400.

4. Jika token berhasil didekode dan valid, kode mencari pengguna dengan ID yang terkandung dalam token, kemudian menambahkan pengguna ke objek request.

5. Terakhir, kontrol dilewatkan ke lapisan middleware berikutnya dengan menggunakan $next($request).

<br>

> **#6**

Daftarkan middleware yang telah dibuat pada bootstrap/app.php

```php
$app->routeMiddleware([
    'jwt.auth' => App\Http\Middleware\JwtMiddleware::class,
]);

```

![](<../Screenshoot/assets_praktikum_9/langkah_9_ (17).png>)

<br>

> **#7**

Tambahkan baris berikut pada file web.php

```php
$router->get('/home', ['middleware' => 'jwt.auth', 'uses' => 'HomeController@home']);
```

![](<../Screenshoot/assets_praktikum_9/langkah_9_ (18).png>)

> **#8**

Jalankan aplikasi pada endpoint /auth/login dengan body berikut. Salinlah token yang didapat ke notepad

```JSON

{
    "email": "scaramouche@fatui.org",
    "password": "wanderer"
}
```

![](<../Screenshoot/assets_praktikum_9/langkah_9_ (19).png>)

> **#9**

Jalankan aplikasi pada endpoint /home dengan melampirkan nilai token yang didapat setelah login pada header

![](<../Screenshoot/assets_praktikum_9/langkah_9_ (20).png>)
