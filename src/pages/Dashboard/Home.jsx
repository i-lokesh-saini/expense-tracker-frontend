import DashboardLayout from "../../components/layouts/DashboardLayout"
import  useUserAuth  from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/card/InfoCard";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins , LuWalletMinimal } from "react-icons/lu";
import { addThousandSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import FinanceOverview from "../../components/dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/dashboard/ExpenseTransactions";
import Last30daysExpenses from "../../components/dashboard/Last30daysExpenses";
import RecentIncomeWithChart from "../../components/dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/dashboard/RecentIncome";




const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if(loading) return;

    setLoading(true);

      try {
        const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);

        if(response.data) {
          setDashboardData(response.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
  };

  useEffect(()=>{
    fetchDashboardData();
    return () => {};
  }, []);


  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard/>} 
            label="Total Balance"
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />

          <InfoCard
            icon={<LuWalletMinimal/>} 
            label="Total Income"
            value={addThousandSeparator(dashboardData?.totalIncome || 0)}
            color="bg-green-500"
          />

          <InfoCard
            icon={<LuHandCoins/>} 
            label="Total Expenses"
            value={addThousandSeparator(dashboardData?.totalExpenses || 0)}
            color="bg-red-500"
          />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expenses")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance}
            totalIncome={dashboardData?.totalIncome}
            totalExpenses={dashboardData?.totalExpenses}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30daysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expenses")}
          />

          <Last30daysExpenses
            data={dashboardData?.last30daysExpenses.transactions || []}
          />

          <RecentIncomeWithChart
            data={dashboardData?.last60daysIncome?.transactions || []}
            totalIncome={dashboardData?.totalIncome || 0} 
          />

          <RecentIncome
            transactions={dashboardData?.last60daysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />

        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home