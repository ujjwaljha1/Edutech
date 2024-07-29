// client/src/CouponGenerator.js

import React, { useState } from 'react';
import axios from 'axios';
import api from "./api"
const CouponGenerator = () => {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('http://localhost:5000/api/premium/coupons', {
        code: couponCode,
        discount: parseFloat(discount),
        validUntil: new Date(validUntil),
      });
      setMessage('Coupon created successfully');
      setCouponCode('');
      setDiscount('');
      setValidUntil('');
    } catch (error) {
      setMessage('Error creating coupon');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Coupon Generator</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <input
          type="number"
          placeholder="Discount (%)"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <input
          type="date"
          placeholder="Valid Until"
          value={validUntil}
          onChange={(e) => setValidUntil(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Create Coupon
        </button>
      </form>
      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
};

export default CouponGenerator;