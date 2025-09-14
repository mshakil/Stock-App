import { useState } from "react";

export default function HoldingForm({ onAddHolding }) {
  const [symbol, setSymbol] = useState("");
  const [shares, setShares] = useState("");
  const [avgPrice, setAvgPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!symbol.trim()) {
      newErrors.symbol = "Symbol is required";
    } else if (symbol.length > 10) {
      newErrors.symbol = "Symbol must be 10 characters or less";
    }
    
    if (!shares || shares <= 0) {
      newErrors.shares = "Shares must be greater than 0";
    }
    
    if (!avgPrice || avgPrice <= 0) {
      newErrors.avgPrice = "Average price must be greater than 0";
    }
    
    if (!currentPrice || currentPrice <= 0) {
      newErrors.currentPrice = "Current price must be greater than 0";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await onAddHolding({
        id: Date.now(),
        symbol: symbol.trim().toUpperCase(),
        shares: Number(shares),
        avgPrice: Number(avgPrice),
        currentPrice: Number(currentPrice),
      });

      // Reset form
      setSymbol("");
      setShares("");
      setAvgPrice("");
      setCurrentPrice("");
      setErrors({});
    } catch (error) {
      console.error("Error adding holding:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setErrors(prev => ({ ...prev, [field]: "" }));
    
    switch (field) {
      case "symbol":
        setSymbol(value.toUpperCase());
        break;
      case "shares":
        setShares(value);
        break;
      case "avgPrice":
        setAvgPrice(value);
        break;
      case "currentPrice":
        setCurrentPrice(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 p-2 rounded-lg mr-3">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Add New Holding</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Symbol Input */}
          <div className="space-y-2">
            <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">
              Stock Symbol *
            </label>
            <input
              id="symbol"
              type="text"
              placeholder="e.g., AAPL"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.symbol 
                  ? "border-red-300 bg-red-50" 
                  : "border-gray-300 hover:border-gray-400"
              }`}
              value={symbol}
              onChange={(e) => handleInputChange("symbol", e.target.value)}
              maxLength={10}
            />
            {errors.symbol && (
              <p className="text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.symbol}
              </p>
            )}
          </div>

          {/* Shares Input */}
          <div className="space-y-2">
            <label htmlFor="shares" className="block text-sm font-medium text-gray-700">
              Number of Shares *
            </label>
            <input
              id="shares"
              type="number"
              placeholder="e.g., 100"
              min="0.01"
              step="0.01"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.shares 
                  ? "border-red-300 bg-red-50" 
                  : "border-gray-300 hover:border-gray-400"
              }`}
              value={shares}
              onChange={(e) => handleInputChange("shares", e.target.value)}
            />
            {errors.shares && (
              <p className="text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.shares}
              </p>
            )}
          </div>

          {/* Average Price Input */}
          <div className="space-y-2">
            <label htmlFor="avgPrice" className="block text-sm font-medium text-gray-700">
              Average Price *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">₨</span>
              </div>
              <input
                id="avgPrice"
                type="number"
                placeholder="0"
                min="0.01"
                step="0.01"
                className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.avgPrice 
                    ? "border-red-300 bg-red-50" 
                    : "border-gray-300 hover:border-gray-400"
                }`}
                value={avgPrice}
                onChange={(e) => handleInputChange("avgPrice", e.target.value)}
              />
            </div>
            {errors.avgPrice && (
              <p className="text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.avgPrice}
              </p>
            )}
          </div>

          {/* Current Price Input */}
          <div className="space-y-2">
            <label htmlFor="currentPrice" className="block text-sm font-medium text-gray-700">
              Current Price *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 text-sm">₨</span>
              </div>
              <input
                id="currentPrice"
                type="number"
                placeholder="0"
                min="0.01"
                step="0.01"
                className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.currentPrice 
                    ? "border-red-300 bg-red-50" 
                    : "border-gray-300 hover:border-gray-400"
                }`}
                value={currentPrice}
                onChange={(e) => handleInputChange("currentPrice", e.target.value)}
              />
            </div>
            {errors.currentPrice && (
              <p className="text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.currentPrice}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5"
            } text-white`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Holding
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}