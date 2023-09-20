# Praktikum 03: Integrasi MongoDB dan Express

###### Nama: Muhammad Razzaaq Zulkahfi<br>NIM: 215150700111047<br>Kelas: Pemrograman Integratif-A

## **Langkah Percobaan**

<!-- <br><br>![InstalasiNodeJs](<../Screenshoot/assets_praktikum_3/langkah_3_ (0).png>) -->

1. Instalasi Node.js<br><br>
   ![InstalasiNodeJs](<../Screenshoot/assets_praktikum_3/langkah_3_ (0).png>)

## Inisiasi project Express dan pemasangan package

1. Lakukan pembuatan folder dengan nama express-mongodb dan masuk ke dalam folder tersebut lalu buka melalui text editor masing-masing

2. Lakukan npm init untuk mengenerate file package.json dengan menggunakan `command npm init -y`<br><br>
   ![npm init](<../Screenshoot/assets_praktikum_3/langkah_3_ (1).png> "npm init")

3. Lakukan instalasi express, mongoose, dan dotenv dengan menggunakan command `npm i express mongoose dotenv` <br><br>
   ![instalasi express, mongoose, dan dotenv ](<../Screenshoot/assets_praktikum_3/langkah_3_ (2).png> "instalasi express, mongoose, dan dotenv ")

## Koneksi Express ke MongoDB

> **#1** <br>
> Buatlah file `index.js` pada root foler dan masukkan kode di bawah ini<br>

```js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "<nama>,<nim>",
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
```

![index.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (3).png> "index.js")

Setelah itu coba jalankan aplikasi dengan command node `index.js` <br><br>
![command node `index.js`](<../Screenshoot/assets_praktikum_3/langkah_3_ (4).png> "command node `index.js`")

> **#2**<br>
> Lakukan pembuatan file `.env` dan masukkan baris berikut

```js
PORT = 5000;
```

![.env](<../Screenshoot/assets_praktikum_3/langkah_3_ (5).png> ".env")

Setelah itu ubahlah kode pada listening port menjadi berikut dan coba jalankan aplikasi kembali

```js
...
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
console.log(`Running on port ${PORT}`);
})
```

![index.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (6).png> "index.js")

> **#3**<br>
> Copy connection string yang terdapat pada compas atau atlas dan paste kan pada`.env` seperti berikut

```js
MONGO_URI=<Connection string masing-masing>
```

![.env](<../Screenshoot/assets_praktikum_3/langkah_3_ (7).png> ".env")

> **#4**<br>
> Tambahkan baris kode berikut pada file `index.js`

```js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("connected", () => {
  console.log("Mongo connected");
});
```

![index.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (8).png> "index.js")

Setelah itu coba jalankan aplikasi kembali

![index.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (9).png> "index.js")

## Pembuatan Routing

> **#1**<br>
> Lakukan pembuatan direktori routes di tingkat yang sama dengan index.js

> **#2**<br>
> Buatlah file `book.route.js` di dalamnya

![book.route.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (10).png> "book.route.js")

> **#3**<br>
> Tambahkan baris kode berikut untuk fungsi getAllBooks

```js
const router = require("express").Router();
router.get("/", function getAllBooks(req, res) {
  res.status(200).json({
    message: "mendapatkan semua buku",
  });
});
module.exports = router;
```

![book.route.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (11).png> "book.route.js")

> **#4**
> Lakukan hal yang sama untuk getOneBook, createBook, updateBook, dan deleteBook

```js
const router = require("express").Router();
...
router.get("/:id", function getOneBook(req, res) {
  const id = req.params.id;
  res.status(200).json({
    message: "mendapatkan satu buku",
    id,
  });
});
router.post("/", function createBook(req, res) {
  res.status(200).json({
    message: "membuat buku baru",
  });
});
router.put("/:id", function updateBook(req, res) {
  const id = req.params.id;
  res.status(200).json({
    message: "memperbaharui satu buku",
    id,
  });
});
router.delete("/:id", function deleteBook(req, res) {
  const id = req.params.id;
  res.status(200).json({
    message: "menghapus satu buku",
    id,
  });
});
module.exports = router;
```

![book.route.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (12).png> "book.route.js")

> **#5**
> Lakukan import book.route.js pada file index.js dan tambahkan baris kode berikut

```js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/book.route"); //
...
app.get("/", (req, res) => {
  res.status(200).json({
    message: "<nama>,<nim>",
  });
});
app.use("/books", bookRoutes); //
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

```

![index.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (13).png> "index.js")

> **#6**
> Uji salah satu endpoint dengan Postman

![Postman](<../Screenshoot/assets_praktikum_3/langkah_3_ (14).png> "Postman")

## Pembuatan Controller

> **#1**<br>
> Lakukan pembuatan direktori controllers di tingkat yang sama dengan index.js

> **#2**<br>
> Buatlah file book.controller.js di dalamnya

![Controller.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (16).png> "Controller.js")

> **#3**<br>
> Salin baris kode dari routes untuk fungsi getAllBooks

```js
function getAllBooks(req, res) {
  res.status(200).json({
    message: "mendapatkan semua buku",
  });
}
module.exports = {
  getAllBooks,
};
```

> **#4**<br>
> Lakukan hal yang sama untuk getOneBook, createBook, updateBook, dan deleteBook

```js
...
function getOneBook(req, res) {
  const id = req.params.id;
  res.status(200).json({
    message: "mendapatkan satu buku",
    id,
  });
}
function createBook(req, res) {
  res.status(200).json({
    message: "membuat buku baru",
  });
}
function updateBook(req, res) {
  const id = req.params.id;
  res.status(200).json({
    message: "memperbaharui satu buku",
    id,
  });
}
function deleteBook(req, res) {
  const id = req.params.id;
  res.status(200).json({
    message: "menghapus satu buku",
    id,
  });
}
module.exports = {
  getAllBooks,
  getOneBook, //
  createBook, //
  updateBook, //
  deleteBook, //
};

```

![Controller.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (15).png> "Controller.js")

> **#5**<br>
> Lakukan import `book.controller.js` pada file `book.route.js`

```js
const router = require('express').Router();
const book = require('../controllers/book.controller'); //

...

module.exports = router;
```

![book.route.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (17).png> "book.route.js")

> **#6**<br>
> Lakukan perubahan pada fungsi agar dapat memanggil fungsi dari `book.controller.js`

```js
const router = require("express").Router();
const book = require("../controllers/book.controller");

router.get("/", book.getAllBooks);

router.get("/:id", book.getOneBook);

router.post("/", book.createBook);

router.put("/:id", book.updateBook);

router.delete("/:id", book.deleteBook);

module.exports = router;
```

![book.route.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (18).png> "book.route.js")

> **#7**<br>
> Lakukan pengujian kembali, pastikan response tetap sama

![postman.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (19).png> "postman.js")

## Pembuatan Model

Berikut adalah gambaran bentuk data dari modul sebelumnya

| data      | tipe data |
| --------- | --------- |
| title     | string    |
| author    | string    |
| year      | number    |
| pages     | number    |
| summary   | string    |
| publisher | string    |

> **#1**<br>
> Lakukan pembuatan direktori models di tingkat yang sama dengan `index.js`

> **#2**<br>
> Buatlah file `book.model.js` di dalamnya

![book.model.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (20).png> "book.model.js")

> **#3**<br>
> Tambahkan baris kode berikut sesuai dengan tabel di atas

```js
const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  year: {
    type: Number,
  },
  pages: {
    type: Number,
  },
  summary: {
    type: String,
  },
  publisher: {
    type: String,
  },
});
module.exports = mongoose.model("book", bookSchema);
```

![book.model.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (21).png> "book.model.js")

## Operasi CRUD

> **#1**<br>
> Hapus semua data pada collection books

![mongodb](<../Screenshoot/assets_praktikum_3/langkah_3_ (22).png> "mongodb")

> **#2**<br>
> Lakukan import book.model.js pada file `book.controller.js`

```js
const Book = require('../models/book.model');
...
```

> **#3**<br>
> Lakukan perubahan pada fungsi createBook

```js
const Book = require("../models/book.model");
...
async function createBook(req, res) {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
    pages: req.body.pages,
    summary: req.body.summary,
    publisher: req.body.publisher,
  });
  try {
    const savedBook = await book.save();
    res.status(200).json({
      message: "membuat buku baru",
      book: savedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "kesalahan pada server",
      error: error.message,
    });
  }
}
...
```

![book.controller.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (23).png> "book.controller.js")

> **#4**<br>
> Buatlah dua buah buku dengan data di bawah ini dengan Postman

```JSON
{
    "title": "Dilan 1990",
    "author": "Pidi Baiq",
    "year": 2014,
    "pages": 332,
    "summary": "Mirea, anata wa utsukushī",
    "publisher": "Pastel Books"
}
```

![JSON](<../Screenshoot/assets_praktikum_3/langkah_3_ (27).png> "JSON")

```JSON
{
    "title": "Dilan 1991",
    "author": "Pidi Baiq",
    "year": 2015,
    "pages": 344,
    "summary": "Watashi ga kare o aishite iru to ittara",
    "publisher": "Pastel Books"
}
```

![JSON](<../Screenshoot/assets_praktikum_3/langkah_3_ (26).png> "JSON")

> **#5**<br>
> Lakukan perubahan pada fungsi getAllBooks

```js
const Book = require("../models/book.model");
async function getAllBooks(req, res) {
  try {
    const books = await Book.find();
    res.status(200).json({
      message: "mendapatkan semua buku",
      books,
    });
  } catch (error) {
    res.status(500).json({
      message: "kesalahan pada server",
      error: error.message,
    });
  }
}
```

![book.controller.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (24).png> "book.controller.js")

> **#6**<br>
> Lakukan perubahan pada fungsi getOneBook

```js
const Book = require("../models/book.model");
...
async function getOneBook(req, res) {
  const id = req.params.id;
  try {
    const book = await Book.findById(id);
    res.status(200).json({
      message: "mendapatkan satu buku",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: "kesalahan pada server",
      error: error.message,
    });
  }
}
...
```

![book.controller.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (25).png> "book.controller.js")

> **#7**<br>
> Tampilkan semua buku dengan Postman

![JSON](<../Screenshoot/assets_praktikum_3/langkah_3_ (30).png> "JSON")

> **#8**<br>
> Tampilkan buku Dilan 1990 dengan Postman

![JSON](<../Screenshoot/assets_praktikum_3/langkah_3_ (31).png> "JSON")

> **#9**<br>
> Lakukan perubahan pada fungsi updateBook

```js
const Book = require("../models/book.model");
...
async function updateBook(req, res) {
  const id = req.params.id;
  try {
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      message: "memperbaharui satu buku",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: "kesalahan pada server",
      error: error.message,
    });
  }
}
...
```

![book.controller.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (28).png> "book.controller.js")

> **#10**<br>
> Ubah judul buku Dilan 1991 menjadi `“<NAMA PANGGILAN> 1991”` dengan
> Postman

![JSON](<../Screenshoot/assets_praktikum_3/langkah_3_ (32).png> "JSON")

> **#11**<br>
> Lakukan perubahan pada fungsi deleteBook

```js
const Book = require("../models/book.model");
...
async function deleteBook(req, res) {
  const id = req.params.id;
  try {
    const book = await Book.findByIdAndDelete(id);
    res.status(200).json({
      message: "menghapus satu buku",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: "kesalahan pada server",
      error: error.message,
    });
  }
}
...
```

![book.controller.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (29).png> "book.controller.js")

> **#12**<br>
> Hapus buku Dilan 1990 dengan Postman

![book.controller.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (33).png> "book.controller.js")
