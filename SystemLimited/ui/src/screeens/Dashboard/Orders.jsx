import React from "react";

const Orders = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Orders list and tracking will appear here.
        </p>

        {/* Later:
            - Orders table
            - Order status (Pending, Delivered, Cancelled)
            - Pagination & filters
        */}
      </div>
    </div>
  );
};

export default Orders;
