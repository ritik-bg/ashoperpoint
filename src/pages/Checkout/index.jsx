import React, { useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useGetCartItemsQuery } from '../../Store/api/cartAPi';
import { useCreateOrderMutation, useVerifyPaymentMutation } from '../../Store/api/paymentApi';
import { loadRazorpay } from '../../Utils/LoadRazorPay';
import { useForm } from 'react-hook-form';

/* ---------- Charges config (change these in one place) ---------- */
// Clothing GST slabs (per piece, on selling price):
// up to Rs 2500 -> 5%, above Rs 2500 -> 18%. Confirm current rates with your CA.
const GST_SLAB_LIMIT = 2500;
const GST_LOW = 5;
const GST_HIGH = 18;

const FREE_DELIVERY_ABOVE = 999; // free delivery if subtotal >= this
const DELIVERY_CHARGE = 60;
const PLATFORM_FEE = 10; // "other charges" - set 0 if you don't want it

/* ---------- Helpers ---------- */
const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
const inr = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(n);

const getGstRate = (unitPrice) => (unitPrice > GST_SLAB_LIMIT ? GST_HIGH : GST_LOW);

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];

// Sample data used only if the API returns nothing (remove when your API is ready)
const sampleProducts = [
  { id: 1, name: 'Cotton T-Shirt', quantity: 2, price: 499 },
  { id: 2, name: 'Denim Jacket', quantity: 1, price: 1699 },
  { id: 3, name: 'Formal Shirt', quantity: 3, price: 899 },
  { id: 4, name: 'Winter Coat', quantity: 1, price: 3499 },
];

// Your API uses `new_price` and may return an object or an array.
const normalizeItems = (data) => {
  const list = Array.isArray(data) ? data : data ? Object.values(data) : [];
  return list.map((item, i) => ({
    id: item.id ?? item._id ?? i,
    name: item.name ?? item.title ?? 'Item',
    quantity: Number(item.quantity) || 1,
    price: Number(item.new_price ?? item.price) || 0,
  }));
};

const Checkout = () => {
 const { purchase, isLoading, isFetching, isError } = useGetCartItemsQuery(
  {},
  {
    selectFromResult: ({ data, isLoading, isFetching, isError }) => ({
      purchase: data?.cart,
      isLoading,
      isFetching,
      isError,
    }),
  },
);

  // console.log(purchase,'purchase');
  

  const items = useMemo(() => {
    const fromApi = normalizeItems(purchase?.items);
    return fromApi.length ? fromApi : sampleProducts;
  }, [purchase]);

  const summary = useMemo(() => {
    const lines = items.map((item) => {
      const lineTotal = round2(item.price * item.quantity);
      const gstRate = getGstRate(item.price);
      const gst = round2((lineTotal * gstRate) / 100);
      return { ...item, lineTotal, gstRate, gst };
    });

    const subtotal = round2(lines.reduce((a, l) => a + l.lineTotal, 0));
    const gstTotal = round2(lines.reduce((a, l) => a + l.gst, 0));
    const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_CHARGE;
    const platformFee = subtotal === 0 ? 0 : PLATFORM_FEE;
    const grandTotal = round2(subtotal + gstTotal + delivery + platformFee);

    return { lines, subtotal, gstTotal, delivery, platformFee, grandTotal };
  }, [items]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      phone: '',
      pincode: '',
      addressLine1: '',
      addressLine2: '',
      landmark: '',
      city: '',
      state: '',
    },
  });

  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState('');

  // `address` is the validated form data from react-hook-form
  const handlePay = async (address) => {
    setPayError('');
    setPaying(true);

    try {
      // 1. load the Razorpay script
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error('Could not load payment window. Check your internet.');

      // 2. backend calculates the total and creates the order
      const order = await createOrder(address).unwrap();
      if (!order?.status) throw new Error(order?.msg || 'Could not start payment');

      // 3. open the Razorpay popup
      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.razorpayOrderId,
        name: 'ShoperPoint', // <- change
        description: 'Thanks From ShoperPoint!',
        // prefill: { name: user.name, email: user.email, contact: user.phone },
        theme: { color: '#f97316' },

        // 4. payment done -> verify on backend
        handler: async (response) => {
          try {
            const result = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }).unwrap();

            if (result?.status) {
              navigate(`/order-success/${result.orderId}`);
            } else {
              setPayError(result?.msg || 'Payment could not be verified.');
            }
          } catch (err) {
            setPayError(
              'Payment received but verification failed. Please contact support before paying again.',
            );
          } finally {
            setPaying(false);
          }
        },

        modal: {
          // user closed the popup without paying
          ondismiss: () => setPaying(false),
        },
      });

      rzp.on('payment.failed', (resp) => {
        setPayError(resp?.error?.description || 'Payment failed. Please try again.');
        setPaying(false);
      });

      rzp.open();
    } catch (err) {
      setPayError(err?.data?.msg || err?.message || 'Something went wrong.');
      setPaying(false);
    }
  };

  if (isLoading) return <p className="p-4 text-center">Loading your cart...</p>;

  return (
    <div className="bg-orange-200 w-full h-auto p-4 flex flex-col">
      <h1 className="text-black text-center text-lg font-bold">Checkout</h1>

      {isError && (
        <p className="text-center text-red-700 mt-2">
          Could not load your cart. Showing sample items.
        </p>
      )}

      {/* Items */}
      <div className="w-full mt-3 overflow-x-auto">
        <table className="w-full text-left bg-white rounded-md">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="p-2">Product</th>
              <th className="p-2 text-right">Price</th>
              <th className="p-2 text-center">Qty</th>
              <th className="p-2 text-right">Amount</th>
              <th className="p-2 text-right">GST</th>
            </tr>
          </thead>
          <tbody>
            {summary.lines.map((l) => (
              <tr key={l.id} className="border-b border-gray-200">
                <td className="p-2">{l.name}</td>
                <td className="p-2 text-right">{inr(l.price)}</td>
                <td className="p-2 text-center">{l.quantity}</td>
                <td className="p-2 text-right">{inr(l.lineTotal)}</td>
                <td className="p-2 text-right">
                  {inr(l.gst)} ({l.gstRate}%)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delivery address */}
      <div className="bg-white rounded-md mt-4 p-3 w-full">
        <h2 className="text-base font-bold mb-3">Delivery address</h2>
        <form
          id="address-form"
          onSubmit={handleSubmit(handlePay)}
          noValidate
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          <Field label="Full name" error={errors.fullName}>
            <input
              type="text"
              autoComplete="name"
              className="w-full border rounded p-2"
              {...register('fullName', {
                required: 'Full name is required',
                minLength: { value: 3, message: 'Enter at least 3 characters' },
              })}
            />
          </Field>

          <Field label="Mobile number" error={errors.phone}>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              autoComplete="tel-national"
              className="w-full border rounded p-2"
              {...register('phone', {
                required: 'Mobile number is required',
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: 'Enter a valid 10-digit mobile number',
                },
              })}
            />
          </Field>

          <Field label="House no., building, street" error={errors.addressLine1}>
            <input
              type="text"
              autoComplete="address-line1"
              className="w-full border rounded p-2"
              {...register('addressLine1', {
                required: 'Address is required',
                minLength: { value: 5, message: 'Address is too short' },
              })}
            />
          </Field>

          <Field label="Area, colony (optional)" error={errors.addressLine2}>
            <input
              type="text"
              autoComplete="address-line2"
              className="w-full border rounded p-2"
              {...register('addressLine2')}
            />
          </Field>

          <Field label="Landmark (optional)" error={errors.landmark}>
            <input type="text" className="w-full border rounded p-2" {...register('landmark')} />
          </Field>

          <Field label="Pincode" error={errors.pincode}>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              autoComplete="postal-code"
              className="w-full border rounded p-2"
              {...register('pincode', {
                required: 'Pincode is required',
                pattern: {
                  value: /^[1-9]\d{5}$/,
                  message: 'Enter a valid 6-digit pincode',
                },
              })}
            />
          </Field>

          <Field label="City" error={errors.city}>
            <input
              type="text"
              autoComplete="address-level2"
              className="w-full border rounded p-2"
              {...register('city', { required: 'City is required' })}
            />
          </Field>

          <Field label="State" error={errors.state}>
            <select
              className="w-full border rounded p-2 bg-white"
              {...register('state', { required: 'Select a state' })}
            >
              <option value="">Select state</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </form>
      </div>

      {/* Price breakdown */}
      <div className="bg-white rounded-md mt-4 p-3 w-full md:w-1/2 self-end">
        <Row label="Subtotal" value={inr(summary.subtotal)} />
        <Row
          label={`GST (CGST ${inr(summary.gstTotal / 2)} + SGST ${inr(summary.gstTotal / 2)})`}
          value={inr(summary.gstTotal)}
        />
        <Row
          label="Delivery charges"
          value={summary.delivery === 0 ? 'FREE' : inr(summary.delivery)}
        />
        {summary.platformFee > 0 && <Row label="Platform fee" value={inr(summary.platformFee)} />}
        <hr className="my-2" />
        <Row label="Total payable" value={inr(summary.grandTotal)} bold />
        {summary.delivery > 0 && (
          <p className="text-sm text-gray-600 mt-2 mb-0">
            Add {inr(FREE_DELIVERY_ABOVE - summary.subtotal)} more for free delivery.
          </p>
        )}
      </div>

      {payError && <p className="text-red-700 text-right mt-3 mb-0">{payError}</p>}

      <Button
        type="submit"
        form="address-form"
        disabled={summary.subtotal === 0 || paying}
        className="bg-orange-500 px-4 py-2 rounded-md mt-4 self-end"
      >
        {paying ? 'Processing...' : `Pay ${inr(summary.grandTotal)}`}
      </Button>
    </div>
  );
};

const Field = ({ label, error, children }) => (
  <label className="flex flex-col gap-1 text-sm">
    <span>{label}</span>
    {children}
    {error && <span className="text-red-700">{error.message}</span>}
  </label>
);

const Row = ({ label, value, bold }) => (
  <div className={`flex justify-between py-1 ${bold ? 'font-bold text-lg' : ''}`}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default Checkout;
