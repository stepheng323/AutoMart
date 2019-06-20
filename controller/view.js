import pg from 'pg';

class View {
  // eslint-disable-next-line class-methods-use-this
  specific(req, res, next) {
    // ready Database for query
    const config = {
      user: 'abiodun',
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      port: process.env.DB_PORT,
      max: 10,
      idleTimeoutMillis: 30000,
    };

    const pool = new pg.Pool(config);

    pool.on('connect', () => {
      // eslint-disable-next-line no-console
      console.log('connected to the database');
    });

    pool.connect((err, client, done) => {
      if (err) {
        res.status(500).json({
          status: 500,
          error: 'could not connect to the pool',
        });
        return;
      }
      const query = 'SELECT * FROM cars WHERE id = $1';
      const value = [req.params.id];

      client.query(query, value, (error, results) => {
        done();
        if (error) {
          res.status(400).json({
            status: 400,
            error: `${error}`,
          });
          return;
        }
        const data = results.rows[0];
        if (!data) {
          res.status(404).json({
            status: 404,
            error: 'car with the specified id not found',
          });
          return;
        }
        res.status(200).json({
          status: 200,
          data,
        });
        next();
      });
    });
  }
}
const view = new View();
export default view;
