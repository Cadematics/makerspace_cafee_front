import { Link } from "react-router-dom";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-800">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">❌ Payment Canceled</h1>
        <p className="mb-6">
          Your payment was canceled. You can try again anytime.
        </p>
        <Link
          to="/events"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
        >
          Back to Events
        </Link>
      </div>
    </div>
  );
}
