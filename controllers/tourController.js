const fs = require('fs');

//Reading data from file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//Tours Handlers
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};
exports.getTour = (req, res) => {
  //('/api/v1/tours/:id/:x?' Here x is optional)
  //Multiplying with 1 converts string to number for JS ONLY
  const tour = tours.find((el) => el.id === req.params.id * 1);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
exports.createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) console.log(err.message);
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  const index = tours.findIndex((tour) => tour.id === id);
  if (index === -1) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }
  const updatedTour = { ...tours[index], ...req.body };
  tours[index] = updatedTour;
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) console.log(err.message);
      res.status(200).json({
        status: 'success',
        data: {
          tour: updatedTour,
        },
      });
    }
  );
};
exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const index = tours.findIndex((tour) => tour.id === id);
  if (index === -1) {
    return res.status(404).json({
      message: 'failed',
      data: 'Invalid ID',
    });
  }
  tours.splice(index, 1);
  fs.writeFile(
    `${__dirname}/../../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) console.log(err.message);
      res.status(204).json({
        message: 'success',
        data: null,
      });
    }
  );
};
