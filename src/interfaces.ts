// Login Request
export interface LoginReq {
  Username: string;
  Password: string;
}

// Stored User Object
export interface User {
  Id: number;
  Name: string;
  Username: string;
  Password: string;
}

// Update user password req
export interface passwordReq {
  Id: number;
  Password: string;
}

// Food Review object
export interface FoodReviewObject {
  Id: number;
  City: string;
  State: string;
  Title: string;
  Description: string;
  Date_Created: string;
  Rated: number;
  Images?: string[];
  LocationId?: string;
  Created_By: string;
}

// State Review object
export interface StateReviewObject {
  Id: number;
  City: string;
  State: string;
  Description: string;
  Date_Created: string;
  Rated: number;
  Images?: string[];
  LocationId?: string;
  Created_By: string;
}
