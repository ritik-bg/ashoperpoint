import { useEffect, useMemo, useState } from "react";
import { useGetConfirmedOrderMutation } from "../../Store/api/cartAPi";

/* ---------------------------------------------------------------
   CONFIG – change these to match your backend
---------------------------------------------------------------- */
const ORDERS_API = "/api/orders/my-orders"; // GET -> { status: true, orders: [...] }
const USE_SAMPLE_DATA = true; // set to false once your API is ready
const AMOUNT_IN_PAISE = false; // true if you store Razorpay amounts in paise

/* Expected order shape (adjust the field names in <OrderCard /> if different):
{
  _id, razorpayOrderId, razorpayPaymentId, status: "paid" | "pending" | "failed",
  amount, paidAt, createdAt,
  items: [{ name, image, price, quantity }],
  address: { name, line1, city, state, pincode }   // optional
}
*/

const SAMPLE_ORDERS = [
    {
        _id: "665f1a2b3c4d5e6f7a8b9c01",
        razorpayOrderId: "order_QxA81kP2LmN3Zs",
        status: "paid",
        amount: 4297,
        paidAt: "2026-10-21T10:42:00Z",
        items: [
            { name: "Classic Leather Wallet", image: "https://placehold.co/160x160/fde047/000000?text=Wallet", price: 1499, quantity: 1 },
            { name: "Canvas Weekender Bag", image: "https://placehold.co/160x160/000000/fde047?text=Bag", price: 2799, quantity: 1 },
        ],
        address: { name: "Aarav Sharma", line1: "B-14, Sector 21", city: "New Delhi", state: "Delhi", pincode: "110075" },
    },
    {
        _id: "665f1a2b3c4d5e6f7a8b9c02",
        razorpayOrderId: "order_QwB92mR3NoP4At",
        status: "pending",
        amount: 899,
        createdAt: "2026-10-23T08:15:00Z",
        items: [
            { name: "Cotton Crew T-shirt", image: "https://placehold.co/160x160/fde047/000000?text=Tee", price: 449.5, quantity: 2 },
        ],
    },
    {
        _id: "665f1a2b3c4d5e6f7a8b9c03",
        razorpayOrderId: "order_QvC03nS4OpQ5Bu",
        status: "failed",
        amount: 1999,
        createdAt: "2026-10-18T17:05:00Z",
        items: [
            { name: "Wireless Earbuds", image: "https://placehold.co/160x160/000000/fde047?text=Buds", price: 1999, quantity: 1 },
        ],
    },
];

/* ---------------------------------------------------------------
   Helpers
---------------------------------------------------------------- */
const money = (n) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(AMOUNT_IN_PAISE ? n / 100 : n);

const dateFmt = (d) =>
    d
        ? new Date(d).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
        : "—";

const STATUS = {
    paid: { label: "Paid", cls: "bg-yellow-300 text-black" },
    pending: { label: "Payment pending", cls: "bg-white text-black ring-1 ring-black" },
    failed: { label: "Payment failed", cls: "bg-black text-white ring-1 ring-white/40" },
};

const FILTERS = [
    { key: "all", label: "All orders" },
    { key: "paid", label: "Paid" },
    { key: "pending", label: "Pending" },
    { key: "failed", label: "Failed" },
];

/* ---------------------------------------------------------------
   Pieces
---------------------------------------------------------------- */
function StatusBadge({ status }) {
    const s = STATUS[status] || STATUS.pending;
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${s.cls}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {s.label}
        </span>
    );
}

function OrderCard({ order }) {
    const itemCount = order.items?.reduce((n, i) => n + (i.quantity || 1), 0) || 0;
    const shortId = order.razorpayOrderId?.replace("order_", "").slice(0, 10) || String(order._id).slice(-8);
    const [getOrders, { isLoading }] = useGetConfirmedOrderMutation();

    useEffect(() => {
        async function getAllOrders() {
            const orders = await getOrders({}).unwrap();
        }
        getAllOrders();

    }, [])


    return (
        <article className="overflow-hidden rounded-2xl border border-black bg-white shadow-[6px_6px_0_0_#fde047]">
            {/* Header strip */}
            <header className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 bg-black px-5 py-4 text-white sm:px-6">
                <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                    <div>
                        <p className="text-white/60">Order placed</p>
                        <p className="font-medium">{dateFmt(order.paidAt || order.createdAt)}</p>
                    </div>
                    <div>
                        <p className="text-white/60">Total</p>
                        <p className="font-medium text-yellow-300">{money(order.amount)}</p>
                    </div>
                    <div>
                        <p className="text-white/60">Order ID</p>
                        <p className="font-mono font-medium">#{shortId}</p>
                    </div>
                </div>
                <StatusBadge status={order.status} />
            </header>

            {/* Items */}
            <ul className="divide-y divide-black/10 px-5 sm:px-6">
                {order.items?.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 py-4">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 flex-none rounded-xl border border-black/10 bg-yellow-300/30 object-cover"
                        />
                        <div className="min-w-0 flex-1">
                            <p className="truncate font-semibold text-black">{item.name}</p>
                            <p className="mt-0.5 text-sm text-black/60">
                                Qty {item.quantity} × {money(item.price)}
                            </p>
                        </div>
                        <p className="font-semibold text-black">{money(item.price * item.quantity)}</p>
                    </li>
                ))}
            </ul>

            {/* Footer */}
            <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-black/10 bg-yellow-300/20 px-5 py-4 sm:px-6">
                <div className="text-sm text-black/70">
                    {order.address ? (
                        <>
                            <p className="font-medium text-black">Delivering to {order.address.name}</p>
                            <p>
                                {order.address.line1}, {order.address.city}, {order.address.state} – {order.address.pincode}
                            </p>
                        </>
                    ) : (
                        <p>
                            {itemCount} {itemCount === 1 ? "item" : "items"} in this order
                        </p>
                    )}
                </div>

                <div className="flex gap-2">
                    <button className="rounded-full border border-black bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                        View details
                    </button>
                    {order.status === "paid" ? (
                        <button className="rounded-full bg-yellow-300 px-4 py-2 text-sm font-semibold text-black ring-1 ring-black transition hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                            Buy again
                        </button>
                    ) : (
                        <button className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-yellow-300 transition hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                            Retry payment
                        </button>
                    )}
                </div>
            </footer>
        </article>
    );
}

function SkeletonCard() {
    return (
        <div className="animate-pulse overflow-hidden rounded-2xl border border-black/20 bg-white">
            <div className="h-20 bg-black/80" />
            <div className="space-y-4 p-6">
                <div className="flex gap-4">
                    <div className="h-20 w-20 rounded-xl bg-yellow-300/50" />
                    <div className="flex-1 space-y-3">
                        <div className="h-4 w-1/2 rounded bg-black/10" />
                        <div className="h-3 w-1/4 rounded bg-black/10" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function EmptyState({ filtered }) {
    return (
        <div className="rounded-2xl border-2 border-dashed border-black/30 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-300 ring-1 ring-black">
                <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 7h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7Z" />
                    <path d="M9 7a3 3 0 0 1 6 0" />
                </svg>
            </div>
            <h3 className="text-lg font-bold text-black">
                {filtered ? "No orders match this filter" : "You haven't placed any orders yet"}
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-black/60">
                {filtered
                    ? "Try another filter to see the rest of your orders."
                    : "When you place an order it will show up here, along with its payment status."}
            </p>
            {!filtered && (
                <a
                    href="/"
                    className="mt-6 inline-block rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-yellow-300 transition hover:bg-black/80"
                >
                    Start shopping
                </a>
            )}
        </div>
    );
}

/* ---------------------------------------------------------------
   Page
---------------------------------------------------------------- */
export default function ConfirmedOrders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                if (USE_SAMPLE_DATA) {
                    await new Promise((r) => setTimeout(r, 600));
                    if (!cancelled) setOrders(SAMPLE_ORDERS);
                    return;
                }
                const res = await fetch(ORDERS_API, { credentials: "include" });
                const data = await res.json();
                if (!res.ok || data.status === false) throw new Error(data.msg || "Could not load orders");
                if (!cancelled) setOrders(data.orders || []);
            } catch (e) {
                if (!cancelled) setError(e.message || "Something went wrong");
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, []);

    const counts = useMemo(
        () => ({
            all: orders.length,
            paid: orders.filter((o) => o.status === "paid").length,
            pending: orders.filter((o) => o.status === "pending").length,
            failed: orders.filter((o) => o.status === "failed").length,
        }),
        [orders]
    );

    const visible = useMemo(() => {
        const list = filter === "all" ? orders : orders.filter((o) => o.status === filter);
        return [...list].sort(
            (a, b) => new Date(b.paidAt || b.createdAt) - new Date(a.paidAt || a.createdAt)
        );
    }, [orders, filter]);

    const totalSpent = useMemo(
        () => orders.filter((o) => o.status === "paid").reduce((s, o) => s + o.amount, 0),
        [orders]
    );

    return (
        <main className="min-h-screen bg-white text-black">
            {/* Hero */}
            <section className="border-b border-black bg-yellow-300">
                <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-6 px-4 py-10 sm:px-6 sm:py-14">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Your orders</h1>
                        <p className="mt-2 max-w-md text-black/70">
                            Track payments, review what you bought, and reorder your favourites.
                        </p>
                    </div>

                    {!isLoading && !error && (
                        <dl className="flex gap-3">
                            <div className="rounded-xl bg-black px-5 py-3 text-white">
                                <dt className="text-xs text-white/60">Orders</dt>
                                <dd className="text-xl font-bold">{counts.all}</dd>
                            </div>
                            <div className="rounded-xl border border-black bg-white px-5 py-3">
                                <dt className="text-xs text-black/60">Total spent</dt>
                                <dd className="text-xl font-bold">{money(totalSpent)}</dd>
                            </div>
                        </dl>
                    )}
                </div>
            </section>

            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
                {/* Filters */}
                <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter orders by status">
                    {FILTERS.map((f) => {
                        const active = filter === f.key;
                        return (
                            <button
                                key={f.key}
                                role="tab"
                                aria-selected={active}
                                onClick={() => setFilter(f.key)}
                                className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${active
                                        ? "border-black bg-black text-yellow-300"
                                        : "border-black/30 bg-white text-black hover:border-black hover:bg-yellow-300/40"
                                    }`}
                            >
                                {f.label}
                                <span className={`ml-2 text-xs ${active ? "text-white/70" : "text-black/50"}`}>
                                    {counts[f.key]}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="space-y-8">
                        <SkeletonCard />
                        <SkeletonCard />
                    </div>
                ) : error ? (
                    <div className="rounded-2xl border border-black bg-white p-8 text-center">
                        <h3 className="text-lg font-bold">We couldn't load your orders</h3>
                        <p className="mt-1 text-sm text-black/60">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-5 rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-yellow-300 hover:bg-black/80"
                        >
                            Try again
                        </button>
                    </div>
                ) : visible.length === 0 ? (
                    <EmptyState filtered={filter !== "all" && orders.length > 0} />
                ) : (
                    <div className="space-y-8">
                        {visible.map((order) => (
                            <OrderCard key={order._id} order={order} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}