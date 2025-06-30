import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography
} from '@mui/material';
import { Add } from '@mui/icons-material';

const InvoiceForm = ({
  invoice,
  setInvoice,
  itemCatalog,
  selectedItem,
  setSelectedItem,
  handleAddItem
}) => {
  // Calculate due date (7 days from now)
  useEffect(() => {
    if (!invoice.dueDate) {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);
      setInvoice(prev => ({
        ...prev,
        dueDate: dueDate.toISOString().split('T')[0]
      }));
    }
  }, [invoice.dueDate, setInvoice]);

  return (
    <Box component="form" sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        {/* Customer Info */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Customer Name"
            value={invoice.customerName}
            onChange={(e) => setInvoice({ ...invoice, customerName: e.target.value })}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Customer Address"
            value={invoice.customerAddress}
            onChange={(e) => setInvoice({ ...invoice, customerAddress: e.target.value })}
          />
        </Grid>

        {/* Invoice Info */}
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Invoice Number"
            value={invoice.invoiceNumber}
            onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Tax Rate (%)"
            type="number"
            value={invoice.taxRate}
            onChange={(e) => setInvoice({ ...invoice, taxRate: parseFloat(e.target.value) || 0 })}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Discount ($)"
            type="number"
            value={invoice.discount}
            onChange={(e) => setInvoice({ ...invoice, discount: parseFloat(e.target.value) || 0 })}
          />
        </Grid>

        {/* Payment Terms */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Due Date"
            type="date"
            value={invoice.dueDate}
            onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Payment Terms"
            value={invoice.paymentTerms}
            onChange={(e) => setInvoice({ ...invoice, paymentTerms: e.target.value })}
            placeholder="e.g., Net 30"
          />
        </Grid>

        {/* Item Selection */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add Items
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={5}>
              <FormControl fullWidth>
                <InputLabel>Select Item</InputLabel>
                <Select
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  label="Select Item"
                >
                  {itemCatalog.map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      {item.name} (${item.price.toFixed(2)})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button 
                variant="contained" 
                onClick={handleAddItem}
                fullWidth
                startIcon={<Add />}
              >
                Add Item
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InvoiceForm;