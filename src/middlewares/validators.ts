import { body } from "express-validator";
import { RequestHandler } from "express";

export const validateMovie:RequestHandler[] = [
    body('title')
      .isString().withMessage('title must be a string')
      .notEmpty().withMessage('title is required'),
  
    body('adult')
      .isBoolean().withMessage('adult must be a boolean'),
  
    body('backdrop_path')
      .isString().withMessage('backdrop_path must be a string')
      .notEmpty().withMessage('backdrop_path is required'),
  
    body('genre_ids')
      .isArray({ min: 1 }).withMessage('genre_ids must be a non-empty array of integers')
      .custom((arr) => arr.every((id: any) => Number.isInteger(id)))
      .withMessage('All genre_ids must be integers'),
  
    body('original_language')
      .isString().withMessage('original_language must be a string')
      .isLength({ max: 10 }).withMessage('original_language must be at most 10 characters'),
  
    body('original_title')
      .isString().withMessage('original_title must be a string')
      .notEmpty().withMessage('original_title is required'),
  
    body('overview')
      .isString().withMessage('overview must be a string')
      .notEmpty().withMessage('overview is required'),
  
    body('popularity')
      .isString().withMessage('popularity must be a string')
      .notEmpty().withMessage('popularity is required'),
  
    body('poster_path')
      .isString().withMessage('poster_path must be a string')
      .notEmpty().withMessage('poster_path is required'),
  
    body('release_date')
      .isISO8601().withMessage('release_date must be a valid date (ISO 8601 format)'),
  
    body('video')
      .isBoolean().withMessage('video must be a boolean'),
  
    body('vote_average')
      .isFloat().withMessage('vote_average must be a decimal number'),
  
    body('vote_count')
      .isInt().withMessage('vote_count must be an integer')
  ];


  export const validateTrendingMovie = [
    body('search_term')
      .isString().withMessage('search_term must be a string')
      .notEmpty().withMessage('search_term is required'),
  
    body('movie_id')
      .isInt({ min: 1 }).withMessage('movie_id must be a positive integer'),
  
    body('title')
      .isString().withMessage('title must be a string')
      .notEmpty().withMessage('title is required'),
  
    body('count')
      .isInt({ min: 0 }).withMessage('count must be a non-negative integer'),
  
    body('poster_url')
      .isString().withMessage('poster_url must be a string')
      .notEmpty().withMessage('poster_url is required')
      .isURL().withMessage('poster_url must be a valid URL')
  ];