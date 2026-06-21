import useUserAuth from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import ExpenseOverview from '../../components/expense/ExpenseOverview';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/expense/AddExpenseForm';
import ExpenseList from '../../components/expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';


const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);


  // Get All Expense Details
  const FetchExpenseDetails = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_EXPENSE}`);

      if (response.data) {
        setExpenseData(response.data)
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error)
    } finally {
      setIsLoading(false);
    }
  };

  // handle Add Income
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    // validate checks
    if (!category.trim()) {
      toast.error("Category is required");
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
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");

      FetchExpenseDetails();
    } catch (error) {
      console.error("Error adding expense:", error.response?.data?.message || error.message);
    }
  };


  // delete expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");

      FetchExpenseDetails();

    } catch (error) {
      console.error(
        "Error deleting expense: ",
        error.response?.data?.message || error.message
      );
    }
  };

  // handle Download Expense details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob",
      });

      // Create URL for blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download expense details. Please try again.");
      console.error("Error downloading expense details:", error);
    }
  };

  useEffect(() => {
    FetchExpenseDetails();

    return () => { };
  }, [])

  return (
    <DashboardLayout activeMenu="Expenses">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id })
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            Content="Are you sure you want to delete this expense detail?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />

        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense