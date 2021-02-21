

d3.csv('../data/count_top_wines_by_country.csv', d3.autoType) // Load data
.then(data => {
    console.log("data", data)
})