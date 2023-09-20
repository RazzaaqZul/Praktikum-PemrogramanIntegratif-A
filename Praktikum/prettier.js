const Book = require("../models/book.model");

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
