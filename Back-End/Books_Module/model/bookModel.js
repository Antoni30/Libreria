class Book {
    constructor(id_publisher, book_title, book_author, book_isbn, book_publication_year, book_quantity_available, book_status, book_cover_image, id_book = 0) {
        this.id_book = id_book;
        this.id_publisher = id_publisher;
        this.book_title = book_title;
        this.book_author = book_author;
        this.book_isbn = book_isbn;
        this.book_publication_year = book_publication_year;
        this.book_quantity_available = book_quantity_available;
        this.book_status = book_status;
        this.book_cover_image = book_cover_image;
    }

    getBookId() {
        return this.id_book;
    }
    getBookIsrin(){
        return this.getBookIsrin
    }

    getPublisherId() {
        return this.id_publisher;
    }

    getBookTitle() {
        return this.book_title;
    }

    getBookAuthor() {
        return this.book_author;
    }

    getBookIsbn() {
        return this.book_isbn;
    }

    getBookPublicationYear() {
        return this.book_publication_year;
    }

    getBookQuantityAvailable() {
        return this.book_quantity_available;
    }

    getBookStatus() {
        return this.book_status;
    }

    getBookCoverImage() {
        return this.book_cover_image;
    }

    setPublisherId(newPublisherId) {
        this.id_publisher = newPublisherId;
    }

    setBookTitle(newBookTitle) {
        this.book_title = newBookTitle;
    }

    setBookAuthor(newBookAuthor) {
        this.book_author = newBookAuthor;
    }

    setBookIsbn(newBookIsbn) {
        this.book_isbn = newBookIsbn;
    }

    setBookPublicationYear(newBookPublicationYear) {
        this.book_publication_year = newBookPublicationYear;
    }

    setBookQuantityAvailable(newBookQuantityAvailable) {
        this.book_quantity_available = newBookQuantityAvailable;
    }

    setBookStatus(newBookStatus) {
        this.book_status = newBookStatus;
    }

    setBookCoverImage(newBookCoverImage) {
        this.book_cover_image = newBookCoverImage;
    }
}

export default Book;