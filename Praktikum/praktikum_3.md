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
![index.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (4).png> "index.js")

> **#2**<br>
> Lakukan pembuatan file `.env` dan masukkan baris berikut

```js
PORT = 5000;
```

![index.js](<../Screenshoot/assets_praktikum_3/langkah_3_ (5).png> "index.js")

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
