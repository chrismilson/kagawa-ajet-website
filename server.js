const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api/customers', (req, res) => {
  const customers = [
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Brad', lastName: 'Traversy' },
    { id: 3, firstName: 'Mary', lastName: 'Swanson' },
  ];

  res.json(customers);
});

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendfile(path.join(__dirname = 'client/build/index.html'));
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
