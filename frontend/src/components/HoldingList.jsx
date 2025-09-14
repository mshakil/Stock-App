import { useState } from "react";
// Icons replaced with simple SVG components
const PencilIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const TrashIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XMarkIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CurrencyDollarIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
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

export default function HoldingList({ holdings = [], onDeleteHolding, onUpdateHolding, showValues = true }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

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

  const handleEdit = (holding) => {
    setEditingId(holding.id);
    setEditForm({
      symbol: holding.symbol,
      shares: holding.shares,
      avgPrice: holding.avgPrice,
      currentPrice: holding.currentPrice
    });
  };

  const handleSave = () => {
    if (onUpdateHolding) {
      onUpdateHolding(editingId, editForm);
    }
    setEditingId(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id) => {
    if (onDeleteHolding) {
      onDeleteHolding(id);
    }
  };

  if (holdings.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shares
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avg Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Principal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                P&L
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
          </tr>
        </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {holdings.map((holding) => {
              const principal = holding.shares * holding.avgPrice;
              const currentValue = holding.shares * holding.currentPrice;
            const pl = currentValue - principal;
              const plPercent = principal > 0 ? (pl / principal) * 100 : 0;
              const isEditing = editingId === holding.id;

            return (
                <tr key={holding.id} className="hover:bg-gray-50 transition-colors">
                  {/* Symbol */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.symbol || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength={10}
                      />
                    ) : (
                      <div className="flex items-center">
                        <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                          {holding.symbol}
                        </div>
                      </div>
                    )}
                  </td>

                  {/* Shares */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {isEditing ? (
                      <input
                        type="number"
                        value={editForm.shares || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, shares: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0.01"
                        step="0.01"
                      />
                    ) : (
                      <span className="font-medium">{holding.shares.toLocaleString()}</span>
                    )}
                  </td>

                  {/* Average Price */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {isEditing ? (
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-sm">₨</span>
                        </div>
                        <input
                          type="number"
                          value={editForm.avgPrice || ''}
                          onChange={(e) => setEditForm(prev => ({ ...prev, avgPrice: e.target.value }))}
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          min="0.01"
                          step="0.01"
                        />
                      </div>
                    ) : (
                      <span className="font-medium">
                        {showValues ? formatCurrency(holding.avgPrice) : '••••••'}
                      </span>
                    )}
                  </td>

                  {/* Current Price */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {isEditing ? (
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-sm">₨</span>
                        </div>
                        <input
                          type="number"
                          value={editForm.currentPrice || ''}
                          onChange={(e) => setEditForm(prev => ({ ...prev, currentPrice: e.target.value }))}
                          className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          min="0.01"
                          step="0.01"
                        />
                      </div>
                    ) : (
                      <span className="font-medium">
                        {showValues ? formatCurrency(holding.currentPrice) : '••••••'}
                      </span>
                    )}
                  </td>

                  {/* Principal */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="font-medium">
                      {showValues ? formatCurrency(principal) : '••••••'}
                    </span>
                  </td>

                  {/* Current Value */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="font-medium">
                      {showValues ? formatCurrency(currentValue) : '••••••'}
                    </span>
                  </td>

                  {/* P&L */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {pl >= 0 ? (
                        <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <div className="flex flex-col">
                        <span className={`text-sm font-medium ${pl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {showValues ? formatCurrency(pl) : '••••••'}
                        </span>
                        <span className={`text-xs ${pl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {showValues ? formatPercent(plPercent) : '••••••'}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="text-green-600 hover:text-green-900 p-1 rounded"
                            title="Save changes"
                          >
                            <CheckIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-gray-600 hover:text-gray-900 p-1 rounded"
                            title="Cancel editing"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(holding)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                            title="Edit holding"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(holding.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                            title="Delete holding"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
