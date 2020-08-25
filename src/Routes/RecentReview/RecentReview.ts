import express from 'express';
import { Request, Response, NextFunction } from 'express';
import ReviewQueries from '../ReviewQueries';
import { FoodReviewObject } from '../../interfaces';

const RecentFoodReview = express.Router();
const bodyParser = express.json();

// Grabs all reviews by earliest creation date and returns them to the user
// params: Route -> state-reviews or food-reviews
// body: N/A
RecentFoodReview.route('/:Route').get(
  bodyParser,
  (req: Request, res: Response) => {
    const { Route } = req.params;

    return ReviewQueries.GetAll(
      req.app.get('db'),
      Route.toLowerCase()
    ).then((reviews: FoodReviewObject[]) => res.json(reviews));
  }
);

export default RecentFoodReview;
