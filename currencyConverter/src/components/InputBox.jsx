import React, { useId } from 'react';

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
  flagUrl = ""
}) {
  const amountInputId = useId();

  return (
    <div className={`bg-white p-4 rounded-2xl shadow-md flex items-center justify-between gap-4 ${className}`}>
      <div className="w-1/2">
        <label htmlFor={amountInputId} className="text-gray-500 text-sm mb-1 block">
          {label}
        </label>
        <input
          id={amountInputId}
          type="number"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-1/2 text-right">
        <label className="text-gray-500 text-sm mb-1 block">Currency</label>
        <div className="flex items-center justify-end gap-2">
          {flagUrl && (
            <img src={flagUrl} alt={selectCurrency} className="w-6 h-6 rounded-sm shadow-sm" />
          )}
          <select
            className="px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            value={selectCurrency}
            onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
            disabled={currencyDisable}
          >
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
