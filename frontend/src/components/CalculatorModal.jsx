import { useState, useEffect } from "react";
import axios from "axios";

// Icons
const CalculatorIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const XMarkIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const TrendingUpIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const CurrencyDollarIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

export default function CalculatorModal({ onClose }) {
  const [inputs, setInputs] = useState({ 
    shares: "", 
    avg: "", 
    price: "", 
    target: "" 
  });
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateInputs = () => {
    const newErrors = {};
    
    if (!inputs.shares || inputs.shares <= 0) {
      newErrors.shares = "Shares must be greater than 0";
    }
    if (!inputs.avg || inputs.avg <= 0) {
      newErrors.avg = "Average price must be greater than 0";
    }
    if (!inputs.price || inputs.price <= 0) {
      newErrors.price = "Current price must be greater than 0";
    }
    if (!inputs.target || inputs.target <= 0) {
      newErrors.target = "Target average must be greater than 0";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalc = async () => {
    if (!validateInputs()) return;
    
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/calc/suggest-buy", {
        shares: Number(inputs.shares),
        avg: Number(inputs.avg),
        price: Number(inputs.price),
        target: Number(inputs.target),
      });
      setResult(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Calculation error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setInputs({ shares: "", avg: "", price: "", target: "" });
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <CalculatorIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Stock Average Calculator</h2>
              <p className="text-gray-600">Calculate how many shares to buy to reach your target average</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Shares */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Current Shares *
              </label>
              <input
                name="shares"
                type="number"
                placeholder="e.g., 100"
                min="0.01"
                step="0.01"
                value={inputs.shares}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                  errors.shares 
                    ? "border-red-300 bg-red-50" 
                    : "border-gray-300 hover:border-gray-400"
                }`}
              />
              {errors.shares && (
                <p className="text-sm text-red-600">{errors.shares}</p>
              )}
            </div>

            {/* Current Average Price */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Current Average Price *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="avg"
                  type="number"
                  placeholder="0"
                  min="0.01"
                  step="0.01"
                  value={inputs.avg}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.avg 
                      ? "border-red-300 bg-red-50" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                />
              </div>
              {errors.avg && (
                <p className="text-sm text-red-600">{errors.avg}</p>
              )}
            </div>

            {/* Current Market Price */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Current Market Price *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="price"
                  type="number"
                  placeholder="0"
                  min="0.01"
                  step="0.01"
                  value={inputs.price}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.price 
                      ? "border-red-300 bg-red-50" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                />
              </div>
              {errors.price && (
                <p className="text-sm text-red-600">{errors.price}</p>
              )}
            </div>

            {/* Target Average Price */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Target Average Price *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <TrendingUpIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="target"
                  type="number"
                  placeholder="0"
                  min="0.01"
                  step="0.01"
                  value={inputs.target}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.target 
                      ? "border-red-300 bg-red-50" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                />
              </div>
              {errors.target && (
                <p className="text-sm text-red-600">{errors.target}</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-8">
            <button
              onClick={handleReset}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleCalc}
              disabled={isLoading}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5"
              } text-white`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating...
                </>
              ) : (
                <>
                  <CalculatorIcon className="w-5 h-5" />
                  Calculate
                </>
              )}
            </button>
          </div>

          {/* Results */}
      {result && (
            <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                <TrendingUpIcon className="h-5 w-5 mr-2" />
                Calculation Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-gray-600 mb-1">Suggested Shares to Buy</p>
                  <p className="text-2xl font-bold text-green-600">
                    {result.suggestedSharesRounded}
                  </p>
                  <p className="text-xs text-gray-500">
                    Exact: {result.suggestedSharesFractional}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-gray-600 mb-1">New Average Price</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(result.newAverage)}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200 md:col-span-2">
                  <p className="text-sm text-gray-600 mb-1">Investment Needed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(result.investmentNeeded)}
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {result.explanation}
                </p>
              </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
