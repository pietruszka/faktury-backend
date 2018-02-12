const mongoose = require("mongoose");
const Invoice = (require('./../../data/db').getConnection()).model("Invoice");
const User = (require('./../../data/db').getConnection()).model("User");
const config = require('./../../data/config');

const addInvoice = async (req, res) => {
    req.checkBody('type').exists();
    req.checkBody('date.created').exists();
    req.checkBody('date.sold').exists();
    req.checkBody('date.payment').exists();
    req.checkBody('paymentType').exists();
    req.checkBody('contractor.name').exists();
    req.checkBody('contractor.place').exists();
    req.checkBody('contractor.phone').exists();
    req.checkBody('contractor.nip').exists();
    req.checkBody('contractor.postalCode').exists();
    req.checkBody('contractor.city').exists();
    req.checkBody('items.*.name').exists();
    req.checkBody('items.*.quantity').exists();
    req.checkBody('items.*.unit').exists();
    req.checkBody('items.*.vat').exists();
    req.checkBody('items.*.priceNet').exists();
    req.checkBody('invoiceNumber')
        .exists()
        .custom(value => {
            return new Promise((resolve, reject) => {
                Invoice.findOne({invoiceNumber: value}, (err, result) => {
                    if(result) reject();
                    else resolve();
                });
            });
        })
        .withMessage("Invoice number should be unique");

    const validationResult = await req.getValidationResult();

    if(!validationResult.isEmpty()) {
        return res.status(422).json({
            success: false,
            errors: validationResult.mapped()});
    }

    const {
        type,
        paymentType,
        contractor,
        invoiceNumber,
        date
    } = req.body;

    let _invoice = await new Invoice({
        isExpense: type === 'expense',
        invoiceNumber,
        date,
        paymentType,
        contractor,
        items: (req.body.items ? req.body.items : []),
        file: (req.body.file ? req.body.file : [])
    }).save();

    await User.findByIdAndUpdate(req.user, {$addToSet: {invoices: new mongoose.mongo.ObjectId(_invoice._id)}})

    return res.status(200).json({
        success: true,
        message: "New invoices added"
    });

};

const addInvoiceItem = async (req, res) => {
    req.checkBody('invoiceID').exists();
    req.checkBody('name').exists();
    req.checkBody('quantity').exists();
    req.checkBody('unit').exists();
    req.checkBody('vat').exists();
    req.checkBody('priceNet').exists();

    const validationResult = await req.getValidationResult();

    if(!validationResult.isEmpty()) {
        return res.status(422).json({
            success: false,
            errors: validationResult.mapped()});
    }

    const {
        invoiceID,
        name,
        quantity,
        unit,
        vat,
        priceNet
    } = req.body;

    await Invoice.findByIdAndUpdate(invoiceID, {
        $addToSet: {
            items: {
                name,
                quantity: Number(quantity),
                unit,
                vat: Number(vat),
                priceNet: Number(priceNet),
            }
        }
    });

    return res.status(200).json({
        success: true,
        message: "Added new item to invoice"
    });

};

const getAllInvoices = async (req, res) => {
    req.checkQuery('type').exists();

    const validationResult = await req.getValidationResult();

    if(!validationResult.isEmpty()) {
        return res.status(422).json({
            success: false,
            errors: validationResult.mapped()});
    }

    let type = req.query.type;
    let user = await User.findById(req.user);
    let userInvoices = user.invoices.map(element => new mongoose.mongo.ObjectId(element));
    let result;

    result = await Invoice.find({
        _id: {
            $in: userInvoices
        },
        isExpense: type === "expense"
    });
    result = result.map(element => element.toObject());
    result = result.map(element => {
        const { net, gross } = _countValue(element.items);
        element.net = net;
        element.gross = gross;
        element.file = element.file.map(element => `${config.UPLOAD_PATH}${element}`);
        return element;
    });
    res.json({
        success: true,
        data: result
    })
};

const getInvoice = async (req, res) => {
    let invoiceID = req.params.id;
    let user = await User.findById(req.user);
    let userInvoices = user.invoices
        .filter(element => element.toString() === invoiceID)
        .map(element => new mongoose.mongo.ObjectId(element));
    let result = await Invoice.findOne({_id: userInvoices[0]});
    result = result.toObject();

    const { net, gross } = _countValue(result.items);

    result.net = net;
    result.gross = gross;
    result.file = result.file.map(element => `${config.UPLOAD_PATH}${element}`);
    res.json({
        success: true,
        data: result
    })
};

const _countValue = (items) => {
    let net = 0;
    let gross = 0;
    if(items.length > 1) {
        net = items.reduce((prevValue, currValue, index) => {
            console.log(prevValue)
            return prevValue.quantity * prevValue.priceNet + currValue.quantity * currValue.priceNet;
        });
        gross = items.reduce((prevValue, currValue, index) => {
            let result = prevValue.quantity * prevValue.priceNet * (1 + prevValue.vat/100) +
                currValue.quantity * currValue.priceNet * (1 + currValue.vat/100);
            return result;
        });
    } else {
        net = items[0].quantity * items[0].priceNet;
        gross = items[0].quantity * items[0].priceNet * (1 + items[0].vat/100);
    }
    return {
        net,
        gross
    }
};


module.exports = {
    addInvoice,
    addInvoiceItem,
    getAllInvoices,
    getInvoice,
};