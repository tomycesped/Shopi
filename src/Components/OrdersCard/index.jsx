import { ChevronRightIcon } from "@heroicons/react/24/solid";

const OrdersCard = ({ totalPrice, totalProducts, date, highlight = false }) => {
  // Formateador seguro de fecha
  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'No date';
      
      // Formato "MM.DD.YYYY" (ej. "04.02.2025")
      if (typeof dateString === 'string' && dateString.includes('.')) {
        const [month, day, year] = dateString.split('.');
        return `${month}/${day}/${year}`;
      }
      
      // Timestamp o ISO string
      const dateObj = new Date(dateString);
      if (!isNaN(dateObj.getTime())) {
        return dateObj.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      }
      
      return dateString;
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <div className={`
      flex justify-between items-center p-4 rounded-lg 
      border transition-all cursor-pointer w-full
      ${highlight 
        ? 'border-green-500 bg-white shadow-sm' 
        : 'border-gray-200 hover:bg-gray-50 hover:shadow-xs'}
    `}>
      <div className="flex flex-col gap-1">
        <span className={`text-sm ${highlight ? 'text-green-700' : 'text-gray-500'}`}>
          {formatDate(date)}
        </span>
        <span className="text-gray-600 font-medium">
          {totalProducts} {totalProducts === 1 ? 'article' : 'articles'}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className={`font-semibold ${highlight ? 'text-green-800' : 'text-gray-800'}`}>
          ${totalPrice?.toFixed(2)}
        </span>
        <ChevronRightIcon className={`h-5 w-5 ${highlight ? 'text-green-600' : 'text-gray-400'}`} />
      </div>
    </div>
  );
};

export default OrdersCard;