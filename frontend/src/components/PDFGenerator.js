import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { styles } from '../styles'; // Update import path

const InvoicePDF = ({ invoice, subtotal, tax, total, company }) => {
  const pdfStyles = StyleSheet.create({
    ...styles,
    companyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20
    },
    invoiceInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  });

  return (
    <Document>
      <Page style={pdfStyles.page}>
        <View style={pdfStyles.companyHeader}>
          <View>
            <Text>{company.name}</Text>
            <Text>{company.address}</Text>
            <Text>{company.contact}</Text>
          </View>
          <Text style={pdfStyles.header}>INVOICE #{invoice.invoiceNumber}</Text>
        </View>

        <View style={pdfStyles.invoiceInfo}>
          <View>
            <Text>Bill To: {invoice.customerName}</Text>
            <Text>{invoice.customerAddress}</Text>
          </View>
          <View>
            <Text>Date: {new Date().toLocaleDateString()}</Text>
            <Text>Due Date: {invoice.dueDate}</Text>
          </View>
        </View>

        {/* Item table */}
        <View style={pdfStyles.table}>
          {/* Table headers */}
          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableColHeader}>Item</Text>
            <Text style={pdfStyles.tableColHeader}>Price</Text>
            <Text style={pdfStyles.tableColHeader}>Qty</Text>
            <Text style={pdfStyles.tableColHeader}>Total</Text>
          </View>
          
          {/* Table rows */}
          {invoice.items.filter(item => item.name).map((item, index) => (
            <View key={index} style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableCol}>{item.name}</Text>
              <Text style={pdfStyles.tableCol}>${item.price.toFixed(2)}</Text>
              <Text style={pdfStyles.tableCol}>{item.quantity}</Text>
              <Text style={pdfStyles.tableCol}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={{ marginTop: 20 }}>
          <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
          {invoice.discount > 0 && <Text>Discount: ${invoice.discount.toFixed(2)}</Text>}
          <Text>Tax ({invoice.taxRate}%): ${tax.toFixed(2)}</Text>
          <Text style={{ fontWeight: 'bold', marginTop: 5 }}>Total: ${total.toFixed(2)}</Text>
        </View>

        {/* Payment terms */}
        <View style={{ marginTop: 30 }}>
          <Text>Payment Terms: {invoice.paymentTerms}</Text>
          <Text>Thank you for your business!</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;