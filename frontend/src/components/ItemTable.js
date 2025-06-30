import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField
} from '@mui/material';
import { Delete } from '@mui/icons-material';

const ItemTable = ({ items, onRemoveItem, onUpdateQuantity }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'primary.main' }}>
            <TableCell sx={{ color: 'white' }}>Item</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>Price</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>Qty</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>Total</TableCell>
            <TableCell align="right" sx={{ color: 'white' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.filter(item => item.name).map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell align="right">${item.price.toFixed(2)}</TableCell>
              <TableCell align="right">
                <TextField
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, e.target.value)}
                  inputProps={{ min: 1 }}
                  size="small"
                  sx={{ width: 70 }}
                />
              </TableCell>
              <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onRemoveItem(item.id)} color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemTable;