import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import useUserAuth from '../../hooks/useUserAuth';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import IncomeOverview from '../../components/income/IncomeOverview';
import Modal from '../../components/Modal';
import AddIncomeForm from "../../components/income/AddIncomeForm";
import toast from 'react-hot-toast';
import IncomeList from '../../components/income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';



const Income = () => {

  useUserAuth();



  const [incomeData, setIncomeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Get All Income Details
  const FetchIncomeDetails = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_INCOME}`);

      if (response.data) {
        setIncomeData(response.data)
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error)
    } finally {
      setIsLoading(false);
    }
  };

  // handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    // validate checks
    if (!source.trim()) {
      toast.error("Source is required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount must be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");

      FetchIncomeDetails();
    } catch (error) {
      console.error("Error adding income:", error.response?.data?.message || error.message);
    }



  };

  // delete income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");

      FetchIncomeDetails();

    } catch (error) {
      console.error(
        "Error deleting income: ",
        error.response?.data?.message || error.message
      );
    }
  };

  // handle Download income details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob",
      });

      // Create URL for blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download income details. Please try again.");
      console.error("Error downloading income details:", error);
    }
  };


  useEffect(() => {
    FetchIncomeDetails();

    return () => { };
  }, [])




  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeDetails}
          />

        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            Content="Are you sure you want to delete this income detail?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />

        </Modal>

      </div>
    </DashboardLayout>
  )
}

export default Income