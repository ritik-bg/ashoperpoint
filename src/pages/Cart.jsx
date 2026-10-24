import { useNavigate } from 'react-router-dom';
import { useDeleteProductMutation, useGetCartItemsQuery } from '../Store/api/cartAPi';
import { Loader } from '../components/Loader';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const formatPrice = (value) =>
  Number(value || 0).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const Cart = () => {
  const navigate = useNavigate();
  const { data: Purchase, isLoading, isFetching } = useGetCartItemsQuery({});
  const [deleteProduct] = useDeleteProductMutation();
  const userdata = useSelector((state) => state.auth.user);
  const items = Purchase?.cart?.items ?? [];
  const totalQuantity = items.reduce((acc, item) => acc + (item?.quantity || 0), 0);
  const total = items.reduce((acc, item) => acc + (item?.new_price || 0) * (item?.quantity || 0), 0);

  const userName = userdata?.name ? userdata.name.charAt(0).toUpperCase() + userdata.name.slice(1).toLowerCase() : '';

  async function handleDeleteProduct(id) {

    const res = deleteProduct({ productId: id }).unwrap();
    if (res.success) {
      toast.success(product?.data?.message || 'item removed successfully!');
    } else {
      console.error('unable to delete product!');
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 flex flex-wrap items-end justify-between gap-2 border-b border-stone-200 pb-5">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {userName ? `${userName}'s cart` : 'Your cart'}
            </h1>
            {!isLoading && items.length > 0 && (
              <p className="mt-1 text-sm text-stone-500">
                {items.length} {items.length === 1 ? 'product' : 'products'} · {totalQuantity}{' '}
                {totalQuantity === 1 ? 'item' : 'items'} in total
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-200 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            Continue shopping
          </button>
        </header>

        {isLoading || isFetching ? (
          <div className="flex min-h-[50vh] items-center justify-center">
            <Loader />
          </div>
        ) : items.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            {/* Item list */}
            <ul className="divide-y divide-stone-200 overflow-hidden rounded-xl border border-stone-200 bg-white">
              {items.map((item) => {
                const lineTotal = (item?.new_price || 0) * (item?.quantity || 0);
                return (
                  <li key={item?.id} className="flex items-center gap-4 p-4 sm:gap-6 sm:p-5">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-stone-100 p-2 sm:h-28 sm:w-28">
                      <img src={item?.image} alt={item?.title} className="h-full w-full object-contain mix-blend-multiply" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-base font-semibold leading-snug sm:text-lg">{item?.title}</h3>
                      <p className="mt-1 text-sm text-stone-500">${formatPrice(item?.new_price)} each</p>
                      <span className="mt-3 inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-700">
                        Qty: {item?.quantity}
                      </span>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold sm:text-xl">${formatPrice(lineTotal)}</p>
                      <p
                        onClick={() => handleDeleteProduct(item?._id)}
                        className="mt-3 inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-sm font-medium text-stone-700"
                      >
                        Remove{' '}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Order summary */}
            <aside className="h-fit rounded-xl border border-stone-200 bg-white p-6 lg:sticky lg:top-6">
              <h2 className="text-lg font-semibold">Order summary</h2>

              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-stone-500">Items ({totalQuantity})</dt>
                  <dd className="font-medium">${formatPrice(total)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-500">Shipping</dt>
                  <dd className="font-medium text-stone-500">Calculated at checkout</dd>
                </div>
              </dl>

              <div className="mt-5 flex items-baseline justify-between border-t border-stone-200 pt-5">
                <span className="text-base font-semibold">Total</span>
                <span className="text-2xl font-bold">${formatPrice(total)}</span>
              </div>

              <button
                type="button"
                onClick={() => navigate('/cart/check-out')}
                className="mt-6 w-full rounded-lg bg-orange-500 px-4 py-3 text-base font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              >
                Proceed to pay
              </button>
            </aside>
          </div>
        ) : (
          <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-xl border border-dashed border-stone-300 bg-white px-6 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-14 w-14 text-stone-300"
              aria-hidden="true"
            >
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h9.1a1 1 0 0 0 1-.8L20 8H6" />
            </svg>
            <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
            <p className="mt-1 text-sm text-stone-500">Add something to your cart and it will show up here.</p>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="mt-6 rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            >
              Browse products
            </button>
  <button
              type="button"
              onClick={() => navigate('/orders')}
              className="mt-4 rounded-lg bg-stone-900 px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            >
              View Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
