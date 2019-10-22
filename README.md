# MongoDB to CSV
Main.js loads a known structure from MongoDB (local), converts the data to CSV (comma separated string) and saves it as CSV table.
```
(async() => {
    const data = await dataData.find(searchQuery1)
    
    let table = createTableCsv(data);
    await fs.writeFileSync('./table.csv', table)
    console.log('DONE')
})()