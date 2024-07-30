
// import { useLocation, useNavigate } from 'react-router-dom';
// import React, { useState,useEffect } from 'react';
// import axios from 'axios';
// import api from './api';
// import config from './Config';
// import { Link } from 'react-router-dom';


// const PremiumMembershipCard = ({ title, price, icon, onProceed }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-lg p-6 m-4">
//       <div className="flex items-center justify-center mb-4">
//         {icon}
//       </div>
//       <h2 className="text-2xl font-bold mb-2">{title}</h2>
//       <p className="text-gray-600 mb-4">Access premium content for 30 days</p>
//       <p className="text-3xl font-bold mb-4">₹{price}</p>
//       <button 
//         onClick={() => onProceed({ title, price })}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Proceed to Payment
//       </button>
//     </div>
//   );
// };

// const PremiumMembership = () => {
//   const [selectedMembership, setSelectedMembership] = useState(null);
//   const [couponCode, setCouponCode] = useState('');
//   const [price, setPrice] = useState(0);
//   const [showPayment, setShowPayment] = useState(false);
//   const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
//   const [paymentStatus, setPaymentStatus] = useState(null);
//   const [activeMembership, setActiveMembership] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   // useEffect(() => {
//   //   const queryParams = new URLSearchParams(location.search);
//   //   const status = queryParams.get('status');
//   //   const txnid = queryParams.get('txnid');
//   //   const amount = queryParams.get('amount');
//   //   const error = queryParams.get('error');
//   //   const errorMessage = queryParams.get('message');

//   //   if (status === 'success') {
//   //     setPaymentStatus({ status: 'success', txnid, amount });
//   //   } else if (error) {
//   //     setPaymentStatus({ status: 'error', error, message: errorMessage });
//   //   }
//   // }, [location]);
//   // const handlePaymentResult = () => {
//   //   if (paymentStatus) {
//   //     if (paymentStatus.status === 'success') {
//   //       return (
//   //         <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
//   //           <p className="font-bold">Payment Successful!</p>
//   //           <p>Transaction ID: {paymentStatus.txnid}</p>
//   //           <p>Amount: ₹{paymentStatus.amount}</p>
//   //           <Link
//   //             to={`/paid-content/${selectedMembership.title}`}
//   //             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block mt-4"
//   //           >
//   //             Access Content
//   //           </Link>
//   //         </div>
//   //       );
//   //     } 
//   useEffect(() => {
//     checkActiveMembership();
//   }, []);

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const status = queryParams.get('status');
//     if (status === 'success') {
//       checkActiveMembership();
//     }
//   }, [location]);

//   const checkActiveMembership = async () => {
//     try {
//       const response = await api.get(`${config.backendUrl}/api/premium/active-membership`);
//       if (response.data.activeMembership) {
//         setActiveMembership(response.data.activeMembership);
//       }
//     } catch (error) {
//       console.error('Error checking active membership:', error);
//     }
//   };

//   const handlePaymentResult = () => {
//     if (paymentStatus) {
//       if (paymentStatus.status === 'success') {
//         return (
//           <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
//             <p className="font-bold">Payment Successful!</p>
//             <p>Transaction ID: {paymentStatus.txnid}</p>
//             <p>Amount: ₹{paymentStatus.amount}</p>
//             <button
//               onClick={() => navigate(`/paid-content/${selectedMembership.title}`)}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
//             >
//               Access Content
//             </button>
//           </div>
//         );
//       } else  {

//         return (
//           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
//             <p className="font-bold">Payment Failed</p>
//             <p>Error: {paymentStatus.error}</p>
//             <p>Message: {paymentStatus.message}</p>
//           </div>
//         );
//       }
//     }
//     return null;
//   };

//   const memberships = [
//     { title: 'Quizzo', price: 1500, icon: '🎯' },
//     { title: 'Interview Prep', price: 2250, icon: '📚' },
//     { title: 'Last Min', price: 1150, icon: '⏰' },
//     { title: 'Basic to Advanced', price: 3000, icon: '🚀' },
//   ];


//   const handleInputChange = (e) => {
//     setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
//   };


//   const handleProceedToPayment = (membership) => {
//     setSelectedMembership(membership);
//     setPrice(parseFloat(membership.price));
//     setShowPayment(true);
//   };

//   const handleApplyCoupon = async () => {
//     try {
//       const response = await api.post(`${config.backendUrl}/api/premium/apply-coupon`, {
//         membershipType: selectedMembership.title,
//         couponCode,
//       });
//       setPrice(parseFloat(response.data.discountedPrice));
//     } catch (error) {
//       console.error('Error applying coupon:', error);
//       alert('Invalid coupon code');
//     }
//   };

//   const handleInitiatePayment = async () => {
//     try {
//       const response = await api.post(`${config.backendUrl}/api/premium/initiate-payment`, {
//         membershipType: selectedMembership.title,
//         couponCode,
//         amount: price,
//         name: userInfo.name,
//         email: userInfo.email,
//         phone: userInfo.phone
//       });
      
//       // Create a form and submit it to PayU
//       const form = document.createElement('form');
//       form.method = 'POST';
//       form.action = response.data.paymentUrl;

//       for (const key in response.data.paymentData) {
//         const input = document.createElement('input');
//         input.type = 'hidden';
//         input.name = key;
//         input.value = response.data.paymentData[key];
//         form.appendChild(input);
//       }

//       document.body.appendChild(form);
//       form.submit();
//     } catch (error) {
//       console.error('Error initiating payment:', error.response?.data || error.message);
//       alert('Error initiating payment. Please try again.');
//     }
//   };

//   if (activeMembership) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold mb-8">Your Active Membership</h1>
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <p className="text-xl font-semibold mb-2">{activeMembership.membershipType}</p>
//           <p>Start Date: {new Date(activeMembership.startDate).toLocaleDateString()}</p>
//           <p>End Date: {new Date(activeMembership.endDate).toLocaleDateString()}</p>
//           <button
//             onClick={() => navigate(`/paid-content/${activeMembership.membershipType}`)}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
//           >
//             Access Content
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold mb-8">Premium Memberships</h1>
//       {handlePaymentResult()}
//       {!showPayment ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {memberships.map((membership) => (
//             <PremiumMembershipCard
//               key={membership.title}
//               title={membership.title}
//               price={membership.price}
//               icon={membership.icon}
//               onProceed={handleProceedToPayment}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="max-w-md mx-auto">
//         <h2 className="text-2xl font-bold mb-4">Checkout</h2>
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <p className="text-xl font-semibold mb-2">{selectedMembership.title}</p>
//           <p className="text-2xl font-bold mb-4">₹{parseFloat(price).toFixed(2)}</p>
//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Coupon Code"
//               value={couponCode}
//               onChange={(e) => setCouponCode(e.target.value)}
//               className="border p-2 w-full mb-2"
//             />
//             <button
//               onClick={handleApplyCoupon}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
//             >
//               Apply Coupon
//             </button>
//           </div>
//           <div className="mb-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={userInfo.name}
//               onChange={handleInputChange}
//               className="border p-2 w-full mb-2"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={userInfo.email}
//               onChange={handleInputChange}
//               className="border p-2 w-full mb-2"
//               required
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={userInfo.phone}
//               onChange={handleInputChange}
//               className="border p-2 w-full mb-2"
//               required
//             />
//           </div>
//           <button
//             onClick={handleInitiatePayment}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
//           >
//             Proceed to Payment
//           </button>
//         </div>
//       </div>
//     )}
//     </div>
//   );
// };

// export default PremiumMembership;



import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from './api';
import config from './Config';
import { Link } from 'react-router-dom';

const PremiumMembershipCard = ({ title, price, icon, onProceed }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 m-4">
      <div className="flex items-center justify-center mb-4">
        {icon}
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">Access premium content for 30 days</p>
      <p className="text-3xl font-bold mb-4">₹{price}</p>
      <button 
        onClick={() => onProceed({ title, price })}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Proceed to Payment
      </button>
    </div>
  );
};


  const PremiumMembership = () => {
    const [selectedMembership, setSelectedMembership] = useState(null);
    const [couponCode, setCouponCode] = useState('');
    const [price, setPrice] = useState(0);
    const [showPayment, setShowPayment] = useState(false);
    const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [activeMembership, setActiveMembership] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
      checkActiveMembership();
    }, []);
  
    const checkActiveMembership = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`${config.backendUrl}/api/premium/active-membership`);
        console.log('Active membership response:', response.data); // Add this log
        if (response.data.activeMembership) {
          setActiveMembership(response.data.activeMembership);
        } else {
          setActiveMembership(null);
        }
      } catch (error) {
        console.error('Error checking active membership:', error);
        setError('Failed to check membership status');
      } finally {
        setIsLoading(false);
      }
    };
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    if (status === 'success') {
      checkActiveMembership();
    }
  }, [location]);



  const handlePaymentResult = () => {
    if (paymentStatus) {
      if (paymentStatus.status === 'success') {
        return (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
            <p className="font-bold">Payment Successful!</p>
            <p>Transaction ID: {paymentStatus.txnid}</p>
            <p>Amount: ₹{paymentStatus.amount}</p>
            <button
              onClick={() => navigate(`/paid-content/${activeMembership.membershipType}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              Access Content
            </button>
          </div>
        );
      } else {
        return (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p className="font-bold">Payment Failed</p>
            <p>Error: {paymentStatus.error}</p>
            <p>Message: {paymentStatus.message}</p>
          </div>
        );
      }
    }
    return null;
  };

  const memberships = [
    { title: 'Quizzo', price: 1500, icon: '🎯' },
    { title: 'Interview Prep', price: 2250, icon: '📚' },
    { title: 'Last Min', price: 1150, icon: '⏰' },
    { title: 'Basic to Advanced', price: 3000, icon: '🚀' },
  ];

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

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
      const response = await api.post(`${config.backendUrl}/api/premium/initiate-payment`, {
        membershipType: selectedMembership.title,
        couponCode,
        amount: price,
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone
      });

      // Create a form and submit it to PayU
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = response.data.paymentUrl;

      for (const key in response.data.paymentData) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = response.data.paymentData[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('Error initiating payment:', error.response?.data || error.message);
      alert('Error initiating payment. Please try again.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  if (activeMembership) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Your Active Membership</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-xl font-semibold mb-2">{activeMembership.membershipType}</p>
          <p>Start Date: {new Date(activeMembership.startDate).toLocaleDateString()}</p>
          <p>End Date: {new Date(activeMembership.endDate).toLocaleDateString()}</p>
          <button
            onClick={() => navigate(`/paid-content/${activeMembership.membershipType}`)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
          >
            Access Content
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Premium Memberships</h1>
      {handlePaymentResult()}
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
            <p className="text-2xl font-bold mb-4">₹{parseFloat(price).toFixed(2)}</p>
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
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={userInfo.name}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userInfo.email}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={userInfo.phone}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
                required
              />
            </div>
            <button
              onClick={handleInitiatePayment}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumMembership;
