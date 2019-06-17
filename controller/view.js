import { cars } from '../model/cars';
import users from '../model/users';

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
  soldOrAvailable(req, res, next) {
    const decoded = req.userData;
    const user = users.find(u => u.id === decoded.id);
    if (!user) {
      res.status(403).json({
        status: 403,
        error: 'you must be logged in',
      });
      return;
    }

    if (user.is_admin) {
      const availableOrSold = cars.filter(a => a.status === 'available' || 'sold');
      if (!availableOrSold) {
        res.status(404).json({
          status: 404,
          error: 'no cars found',
        });
        return;
      }
      res.status(200).json({
        status: 200,
        data: {
          availableOrSold,
        },
      });
    } else {
      next();
    }
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

  // eslint-disable-next-line class-methods-use-this
  deleteCar(req, res) {
    const decoded = req.userData;
    const user = users.find(u => u.id === decoded.id);

    if (user.is_admin) {
      const car = cars.find(c => c.id === parseInt(req.params.car_id, 10));
      if (!car) {
        res.status(404).json({
          status: 404,
          error: 'car not found',
        });
        return;
      }

      const index = cars.indexOf(car);
      cars.splice(index, 1);

      res.status(200).json({
        status: 200,
        data: 'Car Ad succefully deleted',
      });
    } else {
      res.status(403).json({
        status: 403,
        error: 'Only admin can delete a car',
      });
    }
  }
}
const view = new View();
export default view;
