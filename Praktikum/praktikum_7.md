# Praktikum 07: Relasi One-to-Many dan Many-to-Many

###### Nama: Muhammad Razzaaq Zulkahfi<br>NIM: 215150700111047<br>Kelas: Pemrograman Integratif-A

# DASAR TEORI

## Relasi

Hubungan antar tabel yang dilakukan dengan pencocokan primary key dengan foreign key untuk mengombinasikan data dari satu tabel dengan tabel lainnya.

## Foreign Key

Properti yang digunakan untuk menandai hubungan dua tabel atau lebih. Foreign key pada tabel anak (child) akan menunjuk tabel induk (parent) yang menjadi referensinya

## One-to-Many

Relasi yang menunjukkan hubungan antar tabel dimana baris pada tabel induk dapat terhubung dengan satu atau lebih baris di tabel anak. Sementara baris pada tabel anak hanya dapat terhubung dengan satu baris di tabel induk.
Contoh penerapan one-to-many

1. Satu tutorial dapat memiliki banyak komentar, namun satu komentar hanya dapat berada di satu tutorial
2. Satu dosbing dapat memiliki banyak mahasiswa, namun mahasiswa hanya dapat
   dibimbing satu dosen

![](<../Screenshoot/assets_praktikum_7/dasar_teori (1).png>)

## Many-to-Many

Relasi yang menunjukkan hubungan antar tabel dimana baris pada tabel induk dapat terhubung dengan satu atau lebih baris di tabel anak. Berlaku sebaliknya pada tabel anak yang dapat terhubung dengan satu atau lebih baris di tabel induk.
Contoh penerapan many-to-many

1. Satu mahasiswa dapat mengambil banyak mata kuliah, namun satu mata kuliah
   dapat diambil banyak mahasiswa
2. Postingan dapat memiliki banyak tag, namun satu tag dapat dimiliki banyak
   postingan.

![](<../Screenshoot/assets_praktikum_7/dasar_teori (2).png>)

Kombinasi baris pada relasi many-to-many diatur dengan junction table.

## Junction Table

Tabel yang digunakan untuk mengatur kombinasi baris pada relasi many-to-many.
Junction table berisi foreign key dari kedua tabel yang memiliki relasi many-to-many.
Contoh penerapan junction table adalah tabel Enrollment pada relasi many-to-many di
atas

## **Langkah Percobaan**

Menjalankan localhost dengan menjalankan :

```
php -S localhost:8000 -t public
```

# PEMBUATAN TABEL

Berikut adalah tabel yang akan digunakan pada percobaan ini

| posts            | comments        | tags | post_tag |
| ---------------- | --------------- | ---- | -------- |
| id               | id              | id   | postId   |
| content (STRING) | review (STRING) | name | tagId    |
|                  |                 |      |          |

> **#1**

Sebelum membuat migrasi database atau membuat tabel pastikan server database
aktif kemudian pastikan sudah membuat database dengan nama `lumenpost`

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (1).png>)

> **#2**

Kemudian ubah konfigurasi database pada file `.env` menjadi seperti berikut

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (2).png>)

> **#3**

Setelah mengubah konfigurasi pada file `.env`, kita juga perlu menghidupkan
beberapa library bawaan dari lumen dengan membuka file `app.php` pada folder
bootstrap dan mengubah baris ini

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (3).png>)

> **#4**

Setelah itu jalankan command berikut untuk membuat file migration

```php
php artisan make:migration create_posts_table
php artisan make:migration create_comments_table
php artisan make:migration create_tags_table
php artisan make:migration create_post_tag_table
```

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (4).png>)
![](<../Screenshoot/assets_praktikum_7/langkah_7_ (5).png>)

> **#5**

Ubah fungsi `up()` pada file migrasi `create_posts_table`

```php
#sebelumnya
...
public function up()
{
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->timestamps();
    });
}
...

#diubah menjadi
...
public function up()
{
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->timestamps();
        $table->string('content');
    });
}
...

```

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (6).png>)

> **#6**

Ubah fungsi `up()` pada file migrasi `create_comments_table`

```php
#sebelumnya
...
public function up()
{
    Schema::create('comments', function (Blueprint $table) {
        $table->id();
        $table->timestamps();
    });
}
...
#diubah menjadi
...
public function up()
{
    Schema::create('comments', function (Blueprint $table) {
        $table->id();
        $table->timestamps();
        $table->string('review');
        $table->foreignId('postId')->unsigned();
    });
}
...
```

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (7).png>)

> **#7**

Ubah fungsi `up()` pada file migrasi `create_tags_table`

```php
#sebelumnya
...
public function up()
{
    Schema::create('tags', function (Blueprint $table) {
        $table->id();
        $table->timestamps();

    });
}
...
#diubah menjadi
...
public function up()
{
    Schema::create('tags', function (Blueprint $table) {
        $table->id();
        $table->timestamps();
        $table->string('name');
    });
}
...

```

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (8).png>)

> **#8**

Ubah fungsi `up()` pada file migrasi `create_post_tag_table`

```php
#sebelumnya
...
public function up()
{
    Schema::create('post_tag', function (Blueprint $table) {
        $table->id();
        $table->timestamps();
    });
}
...
#diubah menjadi
...
public function up()
{
    Schema::create('post_tag', function (Blueprint $table) {
        $table->id();
        $table->timestamps();
        $table->foreignId('postId')->unsigned();
        $table->foreignId('tagId')->unsigned();
    });
}
...
```

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (9).png>)

> **#9**

Kemudian jalankan command

```
php artisan migrate
```

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (10).png>)
![](<../Screenshoot/assets_praktikum_7/langkah_7_ (11).png>)

# PEMBUATAN MODEL

> **#1**

Buatlah file dengan nama `Post.php` dan isi dengan baris kode berikut

```PHP
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Post extends Model
    {
    /**
    * The attributes that are mass assignable.
    *
    * @var string[]
    */
    protected $fillable = [
    'content'
    ];
    /**
    * The attributes excluded from the model's JSON form.
    *
    * @var string[]
    */
    protected $hidden = [];
    }

```

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (13).png>)

> **#1**

Buatlah file dengan nama `Comment.php` dan isi dengan baris kode berikut

```PHP
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Comment extends Model
{
    /**
    * The attributes that are mass assignable.
    *
    * @var string[]
    */
    protected $fillable = [
    'review'
    ];
    /**
    * The attributes excluded from the model's JSON form.
    *
    * @var string[]
    */
    protected $hidden = [];
}

```

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (12).png>)

> **#3**

Buatlah file dengan nama `Tag.php` dan isi dengan baris kode berikut

```PHP
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Tag extends Model
    {
    /**
    * The attributes that are mass assignable.
    *
    * @var string[]
    */
    protected $fillable = [
    'name'
    ];
    /**
    * The attributes excluded from the model's JSON form.
    *
    * @var string[]
    */
    protected $hidden = [];
    }

```

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (14).png>)

Hasil pembuatan file pada folder `models`

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (15).png>)

# RELASI ONE-TO-MANY

> **#1**

Tambahkan fungsi `comments()` pada file `Post.php`

```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Post extends Model
{
    // fungsi comments
    public function comments()
    {
    return $this->hasMany(Comment::class, 'postId');
    }
}
...

```

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (16).png>)

> **#2**

Tambahkan fungsi `post()` dan atribut postId pada `$fillable` pada file `Comment.php`

```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Comment extends Model
{
...
    protected $fillable = [
        'review',
        'postId' // atribut postId
    ];
    /**
    * The attributes excluded from the model's JSON form.
    *
    * @var string[]
    */
    protected $hidden = [];
    public function post()
    {
    return $this->belongsTo(Post::class, 'postId');
    }
}

```

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (17).png>)

> **#3**

Buatlah file `PostController.php` dan isilah dengan baris kode berikut

```PHP
<?php
namespace App\Http\Controllers;
use App\Models\Post;
use Illuminate\Http\Request;
class PostController extends Controller

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
    //
    public function createPost(Request $request)
    {
        $post = Post::create([
            'content' => $request->content,
        ]);
        return response()->json([
            'success' => true,
            'message' => 'New post created',
            'data' => [
            'post' => $post
            ]
        ]);
    }
    public function getPostById(Request $request)
    {
        $post = Post::find($request->id);
        return response()->json([
            'success' => true,
            'message' => 'All post grabbed',
            'data' => [
                'post' => [
                    'id' => $post->id,
                    'content' => $post->content,
                    'comments' => $post->comments,
                ]
            ]
        ]);
    }
}

```

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (18).png>)

> **#4**

Buatlah file `CommentController.php` dan isilah dengan baris kode berikut

```PHP
<?php
namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
class CommentController extends Controller
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
//
public function createComment(Request $request)
{
    $comment = Comment::create([
        'review' => $request->review,
        'postId' => $request->postId,
    ]);
    return response()->json([
        'success' => true,
        'message' => 'New comment created',
        'data' => [
            'comment' => $comment
        ]
    ]);
}
}

```

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (19).png>)

> **#5**

Tambahkan baris berikut pada `routes/web.php`

```php
<?php
...
    $router->group(['prefix' => 'posts'], function () use ($router) {
        $router->post('/', ['uses' => 'PostController@createPost']);
        $router->get('/{id}', ['uses' => 'PostController@getPostById']);
    });

    $router->group(['prefix' => 'comments'], function () use ($router) {
        $router->post('/', ['uses' => 'CommentController@createComment']);
    });
```

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (20).png>)

> **#6**

Buatlah satu post menggunakan Postman

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (21).png>)

> **#7**

Buatlah satu comment menggunakan Postman

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (22).png>)

> **#8**

Tampilkan post menggunakan Postman

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (23).png>)

# RELASI MANY-TO-MANY

> **#1**

Tambahkan fungsi `tags()` pada file `Post.php`

```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    ...
    public function tags()
    {
    return $this->belongsToMany(Tag::class, 'post_tag', 'postId', 'tagId');
    }
}
```

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (24).png>)

> **#2**

Tambahkan fungsi `posts()` pada file `Tag.php`

```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Tag extends Model
{
...
    public function posts()
    {
    return $this->belongsToMany(Post::class, 'post_tag', 'tagId', 'postId');
    }
}
```

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (25).png>)

> **#3**

Buatlah file `TagController.php` dan isilah dengan baris kode berikut

```php
<?php
namespace App\Http\Controllers;
use App\Models\Tag;
use Illuminate\Http\Request;
class TagController extends Controller
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
    //
    public function createTag(Request $request)
    {
        $tag = Tag::create([
            'name' => $request->name
        ]);
    return response()->json([
        'success' => true,
        'message' => 'New tag created',
        'data' => [
            'tag' => $tag
        ]
        ]);
    }
}
```

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (26).png>)

> **#4**

Tambahkan fungsi `addTag` dan response tags pada `PostController.php`

```php
<?php
namespace App\Http\Controllers;
use App\Models\Post;
use Illuminate\Http\Request;
class PostController extends Controller
{
    ...
    public function getPostById(Request $request)
    {
    $post = Post::find($request->id);
    return response()->json([
        'success' => true,
        'message' => 'All post grabbed',
        'data' => [
            'post' => [
                'id' => $post->id,
                'content' => $post->content,
                'comments' => $post->comments,
                'tags' => $post->tags, //response tags
            ]
        ]
    ]);
    }
    public function addTag(Request $request)
    {
    $post = Post::find($request->id);
    $post->tags()->attach($request->tagId);
    return response()->json([
        'success' => true,
        'message' => 'Tag added to post',
    ]);
    }
}
```

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (27).png>)

> **#5**

Tambahkan baris berikut pada `routes/web.php`

```PHP
$router->group(['prefix' => 'posts'], function () use ($router) {
    $router->post('/', ['uses' => 'PostController@createPost']);
    $router->get('/{id}', ['uses' => 'PostController@getPostById']);
    $router->put('/{id}/tag/{tagId}', ['uses' => 'PostController@getPostById']); //
});
...
$router->group(['prefix' => 'tags'], function () use ($router) {
    $router->post('/', ['uses' => 'TagController@createTag']);
});
```

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (29).png>)

> **#6**

Buatlah satu tag menggunakan Postman

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (30).png>)

> **#7**

Tambahkan tag “jadul” pada post “disana engkau berdua”

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (31).png>)

> **#8**

Tampilkan post “disana engkau berdua” menggunakan Postman

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (32).png>)

> **#9**

Buatlah postingan “tanpamu apa artinya” menggunakan Postman

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (33).png>)

> **#10**

Tambahkan tag “jadul” pada postingan “tanpamu apa artinya”

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (34).png>)

> **#11**

Buatlah tag “lagu” menggunakan Postman

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (35).png>)

> **#12**

Tambahkan tag “lagu” pada postingan “tanpamu apa artinya”

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (36).png>)

> **#13**

Tampilkan post pertama

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (38).png>)

> **#14**

Tampilkan post kedua

![](<../Screenshoot/assets_praktikum_7/langkah_7_ (37).png>)
