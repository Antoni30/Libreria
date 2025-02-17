import env from "dotenv";
import pg from "pg";

env.config();

export const pool = new pg.Pool({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DB,
    port: process.env.PORT
});

class BookSale {
    constructor(idUser, saleDate, quantitySold, unitPrice, totalSale = 0, idBookSale = 0) {
        this.idBookSale = idBookSale;
        this.idUser = idUser;
        this.saleDate = saleDate;
        this.quantitySold = quantitySold;
        this.unitPrice = unitPrice;
        this.totalSale = totalSale || this.calculateTotalSale();
    }

    calculateTotalSale() {
        return this.quantitySold * this.unitPrice;
    }

    getIdBookSale() {
        return this.idBookSale;
    }

    getIdUser() {
        return this.idUser;
    }

    getSaleDate() {
        return this.saleDate;
    }

    getQuantitySold() {
        return this.quantitySold;
    }

    getUnitPrice() {
        return this.unitPrice;
    }

    getTotalSale() {
        return this.totalSale;
    }

    setQuantitySold(newQuantity) {
        this.quantitySold = newQuantity;
        this.totalSale = this.calculateTotalSale();
    }

    setUnitPrice(newPrice) {
        this.unitPrice = newPrice;
        this.totalSale = this.calculateTotalSale();
    }
}

export default BookSale;
