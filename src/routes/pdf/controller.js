const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const PDFdocument = require('pdfkit');
const PdfTable = require('voilab-pdf-table');
const fs = require('fs');
const User = (require('./../../data/db').getConnection()).model('User');
const Invoice = (require('./../../data/db').getConnection()).model('Invoice');
const config = require('./../../data/config');

const generatePDFInvoice = async (req, res) => {
    req.checkParams('invoice').exists();

    const validationResult = await req.getValidationResult();

    if(!validationResult.isEmpty()) {
        return res.status(422).json({
            success: false,
            errors: validationResult.mapped()});
    }

    let _invoice = await Invoice.findById(req.params.invoice);
    let doc = new PDFdocument();
        //doc
        //     .fontSize(25)
        //     .text(`Faktura nr ${_invoice.invoiceNumber}`, {align: 'center'})
        //     .fontSize(15)
        //     .text(`Data wystawienia:  ${_invoice.dateCreated.toISOString().split('T')[0]}`, {align: 'right'})
        //     .fontSize(15)
        //     .text(`Miejsce wystawienia:  ${_invoice.createdPlace}`, {align: 'right'})
        //     .moveDown()
        //
        // _generateSellerData(doc, 50, 200, {
        //     contractor: _invoice.contractor,
        //     place: _invoice.place,
        //     postalCode: _invoice.postalCode,
        //     city: _invoice.city,
        //     nip: _invoice.nip,
        //     phone: _invoice.phone
        // });
        //
        // _generateBuyerData(doc, 400,200, {
        //     contractor: _invoice.contractor,
        //     place: _invoice.place,
        //     postalCode: _invoice.postalCode,
        //     city: _invoice.city,
        //     nip: _invoice.nip,
        //     phone: _invoice.phone
        // });
    doc.moveTo(50, 140)
        .lineTo(570,140)
        .stroke()

    doc.addPage()
        .fontSize(25)
        .text('Here is some vector gra1111phics...', 100, 100)
    doc.end()
    doc.pipe(res);
};

const _generateSellerData = (doc, x, y, data) => {
    const {
        contractor,
        place,
        postalCode,
        city,
        nip,
        phone
    } = data;

    doc
        .fontSize(12)
        .text(`Sprzedawca:`, x, y)
        .font('Helvetica-Bold').text(`${contractor}`)
    //.font('Helvetica').text(`${contractor}`)
        .font('Helvetica').text(`${place}`)
        .text(`${postalCode} ${city}`)
        .text(`NIP: ${nip}`)
        .text(`Tel.: ${phone}`)
};

const _generateBuyerData = (doc, x, y, data) => {
    const {
        contractor,
        place,
        postalCode,
        city,
        nip,
        phone
    } = data;

    doc
        .fontSize(12)
        .text(`Nabywca:`, x,y)
        .font('Helvetica-Bold').text(`${contractor}`)
        //.font('Helvetica').text(`${contractor}`)
        .font('Helvetica').text(`${place}`)
        .text(`${postalCode} ${city}`)
        .text(`NIP: ${nip}`)
        .text(`Tel.: ${phone}`)
};

const _generateItems = (doc, x, y, data) => {
    let table = new PdfTable(doc, {
        bottomMargin: 30
    });
};

const _generateSummary = (doc, x, y, data) => {
    let table = new PdfTable(doc, {
        bottomMargin: 30
    });
};

const _generateSignaturePlace = (doc, x, y, text) => {

};

module.exports = {
    generatePDFInvoice,
};