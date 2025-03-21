import { useTitle } from "../../hooks/useTitle";
import { useEffect, useState } from "react";
import { DashboardCard } from "./components/DashboardCard";
import { EmptyDashboard } from "./components/EmptyDashboard";
import { getUserOrders } from "../../services";
import { toast } from "react-toastify";

export const DashboardPage = () => {
  useTitle("Dashboard");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (error) {
        toast.error(error.message, { autoClose: 5000, closeOnClick: true });
      }
    }
    fetchOrders();
  }, []);

  return (
    <main>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
          My Dashboard
        </p>
      </section>
      <section>
        {orders.length ? (
          orders.length &&
          orders.map((order) => <DashboardCard key={order.id} order={order} />)
        ) : (
          <EmptyDashboard />
        )}
      </section>
    </main>
  );
};
