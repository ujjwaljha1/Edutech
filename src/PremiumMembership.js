


import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from './api';
import config from './Config'

const stripePromise = loadStripe('pk_test_51Phne0RxGDrAEmZRfxkiC4aYsqaqZBo6vzYRXKujcFOvCyevI9UV0gYfoPubFXw2ZDKqeBuMYcdr5VisdyDHUl1900mdIlQnKl');

const PremiumMembershipCard = ({ title, price, icon, onProceed }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4">
      <div className="flex items-center justify-center mb-4">
        {icon}
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">Access premium content for 30 days</p>
      <p className="text-3xl font-bold mb-4">${parseFloat(price).toFixed(2)}</p>
      <button 
        onClick={() => onProceed({ title, price })}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

const CheckoutForm = ({ clientSecret, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else {
      try {
        await api.post(`${config.backendUrl}/api/premium/confirm`, { paymentIntentId: result.paymentIntent.id });
        alert('Payment successful! Your membership is now active.');
      } catch (error) {
        setError('Error confirming membership. Please contact support.');
      }
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <CardElement className="mb-4 p-3 border rounded" />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
      >
        {processing ? 'Processing...' : `Pay $${parseFloat(price).toFixed(2)}`}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

const PremiumMembership = () => {
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [clientSecret, setClientSecret] = useState(null);
  const [price, setPrice] = useState(0);
  const [showPayment, setShowPayment] = useState(false);

  const memberships = [
    { title: 'Quizzo', price: 19.99, icon: '🎯' },
    { title: 'Interview Prep', price: 29.99, icon: '📚' },
    { title: 'Last Min', price: 14.99, icon: '⏰' },
    { title: 'Basic to Advanced', price: 39.99, icon: '🚀' },
  ];

  const handleProceedToPayment = (membership) => {
    setSelectedMembership(membership);
    setPrice(parseFloat(membership.price));
    setShowPayment(true);
  };

  const handleApplyCoupon = async () => {
    try {
      const response = await api.post(`${config.backendUrl}/api/premium/apply-coupon`, {
        membershipType: selectedMembership.title,
        couponCode,
      });
      setPrice(parseFloat(response.data.discountedPrice));
    } catch (error) {
      console.error('Error applying coupon:', error);
      alert('Invalid coupon code');
    }
  };

  const handleInitiatePayment = async () => {
    try {
      const response = await api.post(`${config.backendUrl}/api/premium`, {
        membershipType: selectedMembership.title,
        couponCode,
      });
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error.response?.data || error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Premium Memberships</h1>
      {!showPayment ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {memberships.map((membership) => (
            <PremiumMembershipCard
              key={membership.title}
              title={membership.title}
              price={membership.price}
              icon={membership.icon}
              onProceed={handleProceedToPayment}
            />
          ))}
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <p className="text-xl font-semibold mb-2">{selectedMembership.title}</p>
            <p className="text-2xl font-bold mb-4">${parseFloat(price).toFixed(2)}</p>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="border p-2 w-full mb-2"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
              >
                Apply Coupon
              </button>
            </div>
            {!clientSecret ? (
              <button
                onClick={handleInitiatePayment}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
              >
                Proceed to Payment
              </button>
            ) : (
              <Elements stripe={stripePromise}>
                <CheckoutForm clientSecret={clientSecret} price={price} />
              </Elements>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumMembership;