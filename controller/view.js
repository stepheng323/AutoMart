import { cars } from '../db/cars';

class View {
  // eslint-disable-next-line class-methods-use-this
  specific(req, res) {
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
  }
}
const view = new View();
export default view;
