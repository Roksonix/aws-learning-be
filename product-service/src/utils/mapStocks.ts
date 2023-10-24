export const mapStocks = (stocksArray) => {
    if (!Array.isArray(stocksArray)) return {};
    return stocksArray.reduce((prev, current) => ({
        ...prev,
        [current.id]: current.count
    }), {});
}
