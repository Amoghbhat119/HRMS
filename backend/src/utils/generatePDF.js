const fs = require("fs");
const PDFDocument = require("pdfkit");

exports.generatePDF = (filePath, title, data) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text(title, { align: "center" });
  doc.moveDown();

  data.forEach(item => {
    doc.fontSize(12).text(JSON.stringify(item));
    doc.moveDown();
  });

  doc.end();
};
