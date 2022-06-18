import express from 'express';
import route from './routes/index.js';
import path from 'path';

const __dirname = path.resolve();

const app = express();
const port = 3000;

app.use('/', express.static(path.join(__dirname, 'src/static')));

app.use('/api', route);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

export default app;
