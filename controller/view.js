import { cars } from '../db/cars';

class View {
  // eslint-disable-next-line class-methods-use-this
  specific(req, res, next) {
    const found = cars.find(e => e.id === parseInt(req.params.id, 10));
    if (!found) {
      res.status(404).json({
        status: 404,
        error: 'car not found',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      data: {
        found,
      },
    });
    next();
  }

  // eslint-disable-next-line class-methods-use-this
  unsold(req, res, next) {
    if (req.query.min_price && req.query.max_price) {
      next();
      return;
    }
    const available = cars.filter(a => a.status === req.query.status);
    if (!available) {
      res.status(404).json({
        status: 404,
        error: 'no cars found',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      data: {
        available,
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  priceRange(req, res) {
    const available = cars.filter(a => a.status === req.query.status);
    const filtered = available.filter(
      f => f.price <= req.query.max_price && f.price >= req.query.min_price,
    );
    if (!filtered) {
      res.status(404).json({
        status: 404,
        error: 'no cars found',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      data: {
        filtered,
      },
    });
  }
}
const view = new View();
export default view;
