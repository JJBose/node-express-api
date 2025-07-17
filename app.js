const express = require('express');
const healthRoutes = require('./routes/health');

const app = express();
const PORT = 3000;

app.use(express.json());

// Health route
app.use('/health', healthRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
