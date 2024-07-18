import express from 'express';
import cors from 'cors';
import path from 'path';
import dataRoutes from './routes/dataRoutes.js';

const app = express();
const port =  3001;

app.use(cors());
app.use(express.json()); 

app.use('/api/data', dataRoutes);


app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'Client', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
