const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Generate PDF
app.post('/api/invoice', (req, res) => {
  const { customerName, items, taxRate } = req.body;

  // Calculate total
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  // Create PDF
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream('invoice.pdf'));
  
  // Add content
  doc.fontSize(20).text('INVOICE', { align: 'center' });
  doc.fontSize(14).text(`Customer: ${customerName}`);
  doc.text('----------------------------------');
  
  // Items table
  doc.text('Item          Price    Qty    Total');
  items.forEach(item => {
    doc.text(`${item.name}    $${item.price}    ${item.quantity}    $${item.price * item.quantity}`);
  });
  
  doc.text('----------------------------------');
  doc.text(`Subtotal: $${subtotal.toFixed(2)}`);
  doc.text(`Tax (${taxRate}%): $${tax.toFixed(2)}`);
  doc.text(`Total: $${total.toFixed(2)}`);
  
  doc.end();
  res.send({ success: true, file: 'invoice.pdf' });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));