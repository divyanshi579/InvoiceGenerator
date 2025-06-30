import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Add, Delete, Download } from '@mui/icons-material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// PDF Styles
const pdfStyles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  header: { fontSize: 20, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  table: { display: "table", width: "100%", borderStyle: "solid", borderWidth: 1, borderColor: '#bfbfbf' },
  tableRow: { flexDirection: "row" },
  tableColHeader: { width: "25%", borderStyle: "solid", borderWidth: 1, borderColor: '#bfbfbf', padding: 5, fontWeight: 'bold' },
  tableCol: { width: "25%", borderStyle: "solid", borderWidth: 1, borderColor: '#bfbfbf', padding: 5 }
});

// PDF Component
const InvoicePDF = ({ invoice, subtotal, tax, total }) => (
  <Document>
    <Page style={pdfStyles.page}>
      <Text style={pdfStyles.header}>INVOICE #{invoice.invoiceNumber}</Text>
      <Text>Date: {new Date().toLocaleDateString()}</Text>
      <Text>Customer: {invoice.customerName}</Text>
      
      <View style={pdfStyles.table}>
        <View style={pdfStyles.tableRow}>
          <Text style={pdfStyles.tableColHeader}>Item</Text>
          <Text style={pdfStyles.tableColHeader}>Price</Text>
          <Text style={pdfStyles.tableColHeader}>Qty</Text>
          <Text style={pdfStyles.tableColHeader}>Total</Text>
        </View>
        
        {invoice.items.map((item, index) => (
          <View key={index} style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableCol}>{item.name}</Text>
            <Text style={pdfStyles.tableCol}>${item.price.toFixed(2)}</Text>
            <Text style={pdfStyles.tableCol}>{item.quantity}</Text>
            <Text style={pdfStyles.tableCol}>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
      <Text>Tax ({invoice.taxRate}%): ${tax.toFixed(2)}</Text>
      <Text style={{ fontWeight: 'bold' }}>Total: ${total.toFixed(2)}</Text>
    </Page>
  </Document>
);

// Main App Component
export default function App() {
  const itemCatalog = [
    { name: "Web Development", price: 999 },
    { name: "Graphic Design", price: 499 },
    { name: "Consulting", price: 199 }
  ];

  const [invoice, setInvoice] = useState({
    customerName: '',
    invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
    taxRate: 10,
    items: []
  });

  const [selectedItem, setSelectedItem] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  // Calculate totals
  useEffect(() => {
    const newSubtotal = invoice.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newTax = newSubtotal * (invoice.taxRate / 100);
    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newSubtotal + newTax);
  }, [invoice.items, invoice.taxRate]);

  // Add item from dropdown
  const handleAddItem = () => {
    const selectedProduct = itemCatalog.find(item => item.name === selectedItem);
    if (!selectedProduct) return;
    
    setInvoice({
      ...invoice,
      items: [...invoice.items, {
        id: Date.now(),
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: 1
      }]
    });
    setSelectedItem('');
  };

  const removeItem = (id) => {
    setInvoice({
      ...invoice,
      items: invoice.items.filter(item => item.id !== id)
    });
  };

  const updateQuantity = (id, value) => {
    setInvoice({
      ...invoice,
      items: invoice.items.map(item => 
        item.id === id ? { ...item, quantity: parseInt(value) || 0 } : item
      )
    });
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 50%, #80deea 100%)',
      p: 3
    }}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.9)' }}>
          <Typography variant="h4" sx={{ 
            mb: 3, 
            color: '#003366',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            Invoice Generator
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Customer Name"
                value={invoice.customerName}
                onChange={(e) => setInvoice({...invoice, customerName: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tax Rate (%)"
                type="number"
                value={invoice.taxRate}
                onChange={(e) => setInvoice({...invoice, taxRate: parseFloat(e.target.value) || 0})}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Add Item</InputLabel>
              <Select
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                label="Add Item"
              >
                {itemCatalog.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name} (${item.price})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button 
              variant="contained" 
              onClick={handleAddItem}
              startIcon={<Add />}
              sx={{ backgroundColor: '#40E0D0', '&:hover': { backgroundColor: '#00CED1' } }}
            >
              Add Item
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#003366' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Item</TableCell>
                  <TableCell align="right" sx={{ color: 'white' }}>Price</TableCell>
                  <TableCell align="right" sx={{ color: 'white' }}>Qty</TableCell>
                  <TableCell align="right" sx={{ color: 'white' }}>Total</TableCell>
                  <TableCell align="right" sx={{ color: 'white' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoice.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                    <TableCell align="right">
                      <TextField
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                        size="small"
                        sx={{ width: 70 }}
                      />
                    </TableCell>
                    <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => removeItem(item.id)}>
                        <Delete color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ 
            mt: 3, 
            p: 2, 
            backgroundColor: '#003366',
            color: 'white',
            borderRadius: 1
          }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Summary</Typography>
            <Grid container>
              <Grid item xs={6}>Subtotal:</Grid>
              <Grid item xs={6} textAlign="right">${subtotal.toFixed(2)}</Grid>
              <Grid item xs={6}>Tax ({invoice.taxRate}%):</Grid>
              <Grid item xs={6} textAlign="right">${tax.toFixed(2)}</Grid>
              <Grid item xs={6} sx={{ fontWeight: 'bold', mt: 1 }}>Total:</Grid>
              <Grid item xs={6} textAlign="right" sx={{ fontWeight: 'bold', mt: 1 }}>
                ${total.toFixed(2)}
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <PDFDownloadLink
              document={<InvoicePDF invoice={invoice} subtotal={subtotal} tax={tax} total={total} />}
              fileName={`invoice_${invoice.invoiceNumber}.pdf`}
            >
              {({ loading }) => (
                <Button
                  variant="contained"
                  startIcon={<Download />}
                  disabled={loading}
                  sx={{ 
                    backgroundColor: '#40E0D0',
                    '&:hover': { backgroundColor: '#00CED1' }
                  }}
                >
                  {loading ? 'Generating...' : 'Download Invoice'}
                </Button>
              )}
            </PDFDownloadLink>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}