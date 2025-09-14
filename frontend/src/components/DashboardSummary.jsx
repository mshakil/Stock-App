// Icons replaced with simple SVG components
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

const ChartBarIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const ArrowUpIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 14l3-3 3 3m0-6l3-3 3 3" />
  </svg>
);

const ArrowDownIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 10l-3 3-3-3m0 6l-3 3-3-3" />
  </svg>
);

export default function DashboardSummary({ holdings = [], showValues = true }) {
    const totalPrincipal = holdings.reduce((sum, h) => sum + h.shares * h.avgPrice, 0);
    const totalCurrentValue = holdings.reduce((sum, h) => sum + h.shares * h.currentPrice, 0);
    const totalProfitLoss = totalCurrentValue - totalPrincipal;
    const totalProfitLossPercent = totalPrincipal > 0 ? (totalProfitLoss / totalPrincipal) * 100 : 0;
    
  // Additional metrics
  const totalHoldings = holdings.length;
  const winningHoldings = holdings.filter(h => (h.currentPrice - h.avgPrice) > 0).length;
  const losingHoldings = holdings.filter(h => (h.currentPrice - h.avgPrice) < 0).length;
  const bestPerformer = holdings.length > 0 ? holdings.reduce((best, current) => {
    const currentReturn = ((current.currentPrice - current.avgPrice) / current.avgPrice) * 100;
    const bestReturn = ((best.currentPrice - best.avgPrice) / best.avgPrice) * 100;
    return currentReturn > bestReturn ? current : best;
  }) : null;
  const worstPerformer = holdings.length > 0 ? holdings.reduce((worst, current) => {
    const currentReturn = ((current.currentPrice - current.avgPrice) / current.avgPrice) * 100;
    const worstReturn = ((worst.currentPrice - worst.avgPrice) / worst.avgPrice) * 100;
    return currentReturn < worstReturn ? current : worst;
  }) : null;

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

  const getPerformanceColor = (value) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getPerformanceBgColor = (value) => {
    if (value > 0) return 'bg-green-50 border-green-200';
    if (value < 0) return 'bg-red-50 border-red-200';
    return 'bg-gray-50 border-gray-200';
  };

  if (holdings.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
        <div className="text-center">
          <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Holdings Yet</h3>
          <p className="text-gray-600">Add your first holding to see portfolio summary</p>
        </div>
      </div>
    );
  }
    
    return (
    <div className="space-y-6 mb-8">
      {/* Main Portfolio Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Principal */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Invested</p>
              <p className="text-2xl font-bold text-gray-900">
                {showValues ? formatCurrency(totalPrincipal) : '••••••'}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500">Across {totalHoldings} holdings</p>
          </div>
        </div>

        {/* Total Current Value */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Current Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {showValues ? formatCurrency(totalCurrentValue) : '••••••'}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500">
              {showValues ? `${((totalCurrentValue / totalPrincipal - 1) * 100).toFixed(1)}%` : '••••••'} from invested
            </p>
          </div>
        </div>

        {/* Total P&L */}
        <div className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow ${getPerformanceBgColor(totalProfitLoss)}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total P&L</p>
              <p className={`text-2xl font-bold ${getPerformanceColor(totalProfitLoss)}`}>
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
          <div className="mt-4">
            <p className={`text-sm font-medium ${getPerformanceColor(totalProfitLoss)}`}>
              {showValues ? formatPercent(totalProfitLossPercent) : '••••••'}
            </p>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Performance</p>
              <p className={`text-2xl font-bold ${getPerformanceColor(totalProfitLossPercent)}`}>
                {showValues ? formatPercent(totalProfitLossPercent) : '••••••'}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${totalProfitLossPercent >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              {totalProfitLossPercent >= 0 ? (
                <ArrowUpIcon className="h-6 w-6 text-green-600" />
              ) : (
                <ArrowDownIcon className="h-6 w-6 text-red-600" />
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

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Holdings Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Holdings Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Holdings</span>
              <span className="font-semibold text-gray-900">{totalHoldings}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-600">Winning</span>
              <span className="font-semibold text-green-600">{winningHoldings}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-red-600">Losing</span>
              <span className="font-semibold text-red-600">{losingHoldings}</span>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Win Rate</span>
                <span className="font-semibold text-gray-900">
                  {totalHoldings > 0 ? ((winningHoldings / totalHoldings) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Best Performer */}
        {bestPerformer && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Best Performer</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {bestPerformer.symbol}
                </span>
                <span className="text-green-600 font-semibold">
                  {showValues ? formatPercent(((bestPerformer.currentPrice - bestPerformer.avgPrice) / bestPerformer.avgPrice) * 100) : '••••••'}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Avg: {showValues ? formatCurrency(bestPerformer.avgPrice) : '••••••'}</p>
                <p>Current: {showValues ? formatCurrency(bestPerformer.currentPrice) : '••••••'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Worst Performer */}
        {worstPerformer && worstPerformer !== bestPerformer && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Worst Performer</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {worstPerformer.symbol}
                </span>
                <span className="text-red-600 font-semibold">
                  {showValues ? formatPercent(((worstPerformer.currentPrice - worstPerformer.avgPrice) / worstPerformer.avgPrice) * 100) : '••••••'}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Avg: {showValues ? formatCurrency(worstPerformer.avgPrice) : '••••••'}</p>
                <p>Current: {showValues ? formatCurrency(worstPerformer.currentPrice) : '••••••'}</p>
              </div>
            </div>
          </div>
        )}
    </div>
    </div>
    );
    }