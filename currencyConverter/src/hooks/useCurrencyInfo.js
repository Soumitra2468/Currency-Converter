import { useEffect, useState } from "react";

function useCurrencyInfo(baseCurrency, targetCurrency) {
    const [rate, setRate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!baseCurrency || !targetCurrency) return;

        setLoading(true);
        setError(null);

        fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                return res.json();
            })
            .then((data) => {
                if (data && data.rates && data.rates[targetCurrency]) {
                    setRate(data.rates[targetCurrency]);
                } else {
                    setRate(null);
                    setError("Currency not found");
                }
            })
            .catch((err) => {
                setRate(null);
                setError(err.message || "Something went wrong");
            })
            .finally(() => setLoading(false));
    }, [baseCurrency, targetCurrency]);

    return { rate, loading, error };
}

export default useCurrencyInfo;

