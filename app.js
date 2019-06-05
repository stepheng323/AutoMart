import express from 'express';

import router from './routes/route';

const app = express();
app.use(router);

const port = process.env.PORT || 3000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server running on port ${port}...`));

export default app;
