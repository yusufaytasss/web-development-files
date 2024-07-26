function formatCurency(currency) {
    const currencyNumber = parseInt(currency, 10);

    const formatted = new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigit: 2
    });

    return formatted.format(currencyNumber);
}