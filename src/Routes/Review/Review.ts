import express, { NextFunction, Request, Response } from 'express';
import ReviewQueries from '../ReviewQueries';
import { FoodReviewObject, StateReviewObject } from '../../interfaces';

const Review = express.Router();
const bodyParser = express.json();

// Grabs review data relating to the review id passed in param
// params: id -> review id
// body: N/A
Review.route('/:Route/:Id').get((req: Request, res: Response) => {
  const { Id, Route } = req.params;
  ReviewQueries.GetReview(
    req.app.get('db'),
    Route.toLowerCase(),
    Number(Id)
  ).then((review: FoodReviewObject) => res.json(review));
});

// Grabs all review data relating to the string passed in param
// params: Selection -> (State, City), Value -> comparison value, Route -> state-reviews or food-reviews
// body: N/A
Review.route('/:Route/:Selection/:Value').get((req: Request, res: Response) => {
  const { Route, Selection, Value } = req.params;
  ReviewQueries.GetVaribleReview(
    req.app.get('db'),
    Route.toLowerCase(),
    Selection,
    Value
  ).then((review: FoodReviewObject | StateReviewObject) => res.json(review));
});

// Used when creating a new review
// params: Route -> state-reviews or food-reviews
// body: Data object with new review
Review.route('/:Route').post(
  bodyParser,
  async (req: Request, res: Response, next: NextFunction) => {
    const { Route } = req.params;

    for (const field of ['State', 'City', 'Description', 'Rated'])
      if (!req.body.Data[field])
        return res.status(400).json({
          error: `Missing ${field}`,
        });
    const SerializedData = await ReviewQueries.SerializeReview(req.body.Data);

    ReviewQueries.InsertReview(
      req.app.get('db'),
      Route.toLowerCase(),
      SerializedData
    )
      .then(() => res.status(201).end())
      .catch(next);
  }
);

// Used when creating a new review
// params: Id -> review id, Route -> state-reviews or food-reviews
// body: Data object with new review
Review.route('/:Route/:Id').patch(
  bodyParser,
  async (req: Request, res: Response, next: NextFunction) => {
    const { Id, Route } = req.params;

    for (const field of ['State', 'City', 'Description', 'Rated'])
      if (!req.body.Data[field])
        return res.status(400).json({
          error: `Missing ${field}`,
        });
    const SerializedData = await ReviewQueries.SerializeReview(req.body.Data);

    ReviewQueries.UpdateReview(
      req.app.get('db'),
      Route.toLowerCase(),
      Number(Id),
      SerializedData
    )
      .then(() => res.status(200).end())
      .catch(next);
  }
);

export default Review;
