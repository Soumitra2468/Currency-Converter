import { useState, useEffect } from 'react';
import { InputBox } from './components';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("INR"); // Default value with correct flag
  const [to, setTo] = useState("USD");     // Default value with correct flag
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencyInfo, setCurrencyInfo] = useState({});

  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${from.toUpperCase()}`)
      .then((res) => res.json())
      .then((data) => setCurrencyInfo(data.rates))
      .catch((err) => console.error(err));
  }, [from]);

  useEffect(() => {
    if (currencyInfo && currencyInfo[to]) {
      setConvertedAmount((amount * currencyInfo[to]).toFixed(2));
    }
  }, [currencyInfo, to, amount]);

  const options = Object.keys(currencyInfo || {});

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (!currencyInfo || !currencyInfo[to]) return;
    setConvertedAmount((amount * currencyInfo[to]).toFixed(2));
  };

  const getFlagUrl = (currencyCode) => {
    return `https://flagsapi.com/${currencyCode.slice(0, 2).toUpperCase()}/flat/32.png`;
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-6"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      }}
    >
      <div className="w-full max-w-lg bg-white/30 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
          className="space-y-6"
        >
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setFrom(currency)}
            selectCurrency={from}
            onAmountChange={(amount) => setAmount(amount)}
            flagUrl={getFlagUrl(from)}
            currencyDisable={false}
          />

          <div className="flex justify-center">
            <button
              type="button"
              onClick={swap}
              className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition-transform active:scale-95"
            >
              Swap
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setTo(currency)}
            selectCurrency={to}
            amountDisable
            flagUrl={getFlagUrl(to)}
            currencyDisable={false}
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-medium py-3 rounded-xl hover:opacity-90 transition"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
