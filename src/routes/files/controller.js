
const sendInvoice = (req, res) => {
    let filenames = req.files.map(element => element.filename)
    res.status(200).json({
        success: true,
        message: "The file was saved",
        data: filenames,
    });
};

module.exports = {
    sendInvoice,
};