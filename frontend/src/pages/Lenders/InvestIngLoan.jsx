import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Lenders/LenderSidebar';

const InvestingLoan = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loans, setLoans] = useState([]);
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/loans', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoans(response.data);
      } catch (error) {
        toast.error('Error fetching loans.');
      }
    };
    fetchLoans();
  }, []);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/investment', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInvestments(response.data);
      } catch (error) {
        // toast.error('Error fetching investments.');
      }
    };
    fetchInvestments();
  }, []);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/investment', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Investment successful!');
      reset();
    } catch (error) {
      // toast.error('Investment failed.');
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar userRole="lender" />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-green-800 mb-6">Invest in Loans</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Select Loan</label>
              <select {...register('loanId')} className="w-full p-2 border rounded-lg text-gray-700">
                <option value="" disabled selected>Choose a loan...</option>
                <option value="personal-loan">Personal Loan</option>
                <option value="education-loan">Education Loan</option>
                <option value="startup-loan">Start Up Loan</option>
                {loans.map((loan) => (
                  <option key={loan.id} value={loan.id}>
                    {`₹${loan.amount} - ${loan.term} months @ ${loan.interestRate}%`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Investment Amount</label>
              <input
                type="number"
                {...register('amount', { required: true })}
                className="w-full p-2 border rounded-lg text-gray-700"
              />
            </div>
            <button type="submit" className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Invest
            </button>
          </form>
        </div>
        <h2 className="text-2xl font-semibold text-green-800 mt-8">Your Investments</h2>
        <div className="bg-white shadow-lg rounded-lg mt-4 overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-100 text-green-800">
                <th className="p-3 text-left">Loan ID</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Progress</th>
              </tr>
            </thead>
            <tbody>
              {investments.length > 0 ? (
                investments.map((investment) => (
                  <tr key={investment.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{investment.loanId}</td>
                    <td className="p-3">₹{investment.amount}</td>
                    <td className="p-3">{investment.status}</td>
                    <td className="p-3">{investment.repaymentProgress}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-3 text-center text-gray-500" colSpan="4">No investments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default InvestingLoan;
