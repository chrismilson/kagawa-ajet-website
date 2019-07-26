const express = require('express');

const app = express();
const PORT = process.env.port || 5000;

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
