function formatCurrencies(currencies) {
    const currenciesNumber = parseFloat(currencies, 10);
    const formatter = new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 2,
        maximumFractionDigits: 20
    });
    return formatter.format(currenciesNumber);
}