const express = require('express');
const app = express();
app.use(express.json());

app.post('/calculate', (req, res) => {
  const { operation, a, b } = req.body;

  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'Inputs must be numbers' });
  }

  let result;
  switch (operation) {
    case 'add': result = a + b; break;
    case 'subtract': result = a - b; break;
    case 'multiply': result = a * b; break;
    case 'divide':
      if (b === 0) return res.status(400).json({ error: 'Division by zero' });
      result = a / b; break;
    default:
      return res.status(400).json({ error: 'Invalid operation' });
  }

  res.json({ result });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
