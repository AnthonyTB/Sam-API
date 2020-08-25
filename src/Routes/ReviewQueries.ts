import xss from 'xss';
import { FoodReviewObject, StateReviewObject } from '../interfaces';

const ReviewQueries = {
  // Grabs all reviews by earliest creation date
  // params: db -> db instance, dbTable -> table name
  GetAll(db: any, dbTable: string) {
    return db(dbTable).select('*');
  },
  // Grabs reviews relating Id passed through
  // params: db -> db instance, dbTable -> table name, Id -> review's id number
  GetReview(db: any, dbTable: string, Id: number) {
    return db(dbTable).where({ Id }).first();
  },
  // Grabs reviews relating to selection passed through etc. (State, City)
  // params: db -> db instance, dbTable -> table name, Id -> review's id number
  GetVaribleReview(db: any, dbTable: string, Selection: string, Value: string) {
    return db(dbTable)
      .where({ [Selection]: Value })
      .select('*');
  },
  // Inserts review into table
  // params: db -> db instance, dbTable -> table name, Serialized Object
  InsertReview(db: any, dbTable: string, SerializedData: any) {
    return db(dbTable)
      .insert(SerializedData)
      .returning('*')
      .then((rows: any) => rows[0]);
  },
  // updates review relating to Id
  // params: db -> db instance, dbTable -> table name, Id -> review's id number
  UpdateReview(db: any, dbTable: string, Id: number, UpdatedData: any) {
    return db(dbTable).where({ Id }).update(UpdatedData);
  },
  // Serializes state review checking for xss
  // params: UpdatedData -> State review object
  SerializeReview(UpdatedData: any) {
    return {
      State: xss(UpdatedData.State),
      City: xss(UpdatedData.City),
      Title: UpdatedData.Title ? xss(UpdatedData.Title) : null,
      Description: xss(UpdatedData.Description),
      Date_Created: new Date(UpdatedData.Date_Created),
      Rated: UpdatedData.Rated,
      Images: UpdatedData.Images.map((Image: string) => xss(Image)),
      LocationId: xss(UpdatedData.LocationId),
      Created_By: xss(UpdatedData.Created_By),
    };
  },
};

export default ReviewQueries;
