import { useState, useEffect } from "react";
// Icons replaced with simple SVG components
const ChartBarIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const CalculatorIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const TrendingUpIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const TrendingDownIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

const CurrencyDollarIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const EyeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeSlashIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
  </svg>
);
import HoldingForm from "../components/HoldingForm";
import HoldingList from "../components/HoldingList";
import CalculatorModal from "../components/CalculatorModal";

export default function Dashboard() {
  const [holdings, setHoldings] = useState([]);
  const [showCalc, setShowCalc] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showValues, setShowValues] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate portfolio metrics
  const totalPrincipal = holdings.reduce((sum, h) => sum + h.shares * h.avgPrice, 0);
  const totalCurrentValue = holdings.reduce((sum, h) => sum + h.shares * h.currentPrice, 0);
  const totalProfitLoss = totalCurrentValue - totalPrincipal;
  const totalProfitLossPercent = totalPrincipal > 0 ? (totalProfitLoss / totalPrincipal) * 100 : 0;
  const totalHoldings = holdings.length;
  const winningHoldings = holdings.filter(h => (h.currentPrice - h.avgPrice) > 0).length;
  const losingHoldings = holdings.filter(h => (h.currentPrice - h.avgPrice) < 0).length;

  // Load holdings from localStorage on component mount
  useEffect(() => {
    const savedHoldings = localStorage.getItem('stockHoldings');
    if (savedHoldings) {
      setHoldings(JSON.parse(savedHoldings));
    }
    setIsLoading(false);
  }, []);

  // Save holdings to localStorage whenever holdings change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('stockHoldings', JSON.stringify(holdings));
    }
  }, [holdings, isLoading]);

  const handleAddHolding = (newHolding) => {
    setHoldings(prev => [...prev, newHolding]);
    setShowForm(false);
  };

  const handleDeleteHolding = (id) => {
    setHoldings(prev => prev.filter(h => h.id !== id));
  };

  const handleUpdateHolding = (id, updatedHolding) => {
    setHoldings(prev => prev.map(h => h.id === id ? { ...h, ...updatedHolding } : h));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercent = (percent) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-xl">
                <ChartBarIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Stock Portfolio</h1>
                <p className="text-gray-600">Track your investments and performance</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowValues(!showValues)}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {showValues ? (
                  <EyeIcon className="h-5 w-5 mr-2" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5 mr-2" />
                )}
                {showValues ? 'Hide Values' : 'Show Values'}
              </button>
              
              <button
                onClick={() => setShowCalc(true)}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <CalculatorIcon className="h-5 w-5 mr-2" />
                Calculator
              </button>
              
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Holding
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Value Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {showValues ? formatCurrency(totalCurrentValue) : '••••••'}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-500">
                {showValues ? formatCurrency(totalPrincipal) : '••••••'} invested
              </span>
            </div>
          </div>

          {/* Profit/Loss Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total P&L</p>
                <p className={`text-2xl font-bold ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {showValues ? formatCurrency(totalProfitLoss) : '••••••'}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${totalProfitLoss >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                {totalProfitLoss >= 0 ? (
                  <TrendingUpIcon className="h-6 w-6 text-green-600" />
                ) : (
                  <TrendingDownIcon className="h-6 w-6 text-red-600" />
                )}
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {showValues ? formatPercent(totalProfitLossPercent) : '••••••'}
              </span>
            </div>
          </div>

          {/* Holdings Count Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Holdings</p>
                <p className="text-2xl font-bold text-gray-900">{totalHoldings}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <span className="text-sm text-green-600 font-medium">
                {winningHoldings} winning
              </span>
              <span className="text-sm text-red-600 font-medium">
                {losingHoldings} losing
              </span>
            </div>
          </div>

          {/* Performance Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Performance</p>
                <p className={`text-2xl font-bold ${totalProfitLossPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {showValues ? formatPercent(totalProfitLossPercent) : '••••••'}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${totalProfitLossPercent >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                {totalProfitLossPercent >= 0 ? (
                  <TrendingUpIcon className="h-6 w-6 text-green-600" />
                ) : (
                  <TrendingDownIcon className="h-6 w-6 text-red-600" />
                )}
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${totalProfitLossPercent >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(Math.abs(totalProfitLossPercent), 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Holding Form */}
        {showForm && (
          <div className="mb-8">
            <HoldingForm onAddHolding={handleAddHolding} />
          </div>
        )}

        {/* Holdings List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Holdings</h2>
            <p className="text-gray-600">Manage your stock portfolio</p>
          </div>
          <div className="p-6">
            {holdings.length === 0 ? (
              <div className="text-center py-12">
                <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No holdings yet</h3>
                <p className="text-gray-600 mb-6">Start building your portfolio by adding your first holding</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add Your First Holding
                </button>
              </div>
            ) : (
              <HoldingList 
                holdings={holdings}
                onDeleteHolding={handleDeleteHolding}
                onUpdateHolding={handleUpdateHolding}
                showValues={showValues}
              />
            )}
          </div>
        </div>

        {/* Calculator Modal */}
        {showCalc && (
          <CalculatorModal onClose={() => setShowCalc(false)} />
        )}
      </div>
    </div>
  );
}
