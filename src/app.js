import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import router from './routes/route';
import swaggerDocument from '../api/docs/swagger.json';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use('/api/v1/docs', swaggerUi.serve);
app.get('/api/v1/docs', swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));

export default app;
