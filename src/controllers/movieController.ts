import {Request, Response} from 'express'
import pool from '../config/db'
import { validationResult } from 'express-validator'


export const newMovie = async (req:Request, res:Response) => {

    const {title,adult,backdrop_path,genre_ids,original_language,
        original_title,overview,popularity,poster_path,release_date,video,vote_average,vote_count} = req.body

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const firstError = errors.array().map(err => err.msg)[0]
        res.status(422).json({error:firstError})
    }

    const q = `
        INSERT INTO movies (
          title,
          adult,
          backdrop_path,
          genre_ids,
          original_language,
          original_title,
          overview,
          popularity,
          poster_path,
          release_date,
          video,
          vote_average,
          vote_count
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7,
          $8, $9, $10, $11, $12, $13
        ) 
          RETURNING *
      `
      const {rows} = await pool.query(q,[title,adult,backdrop_path,genre_ids,original_language,
        original_title,overview,popularity,poster_path,release_date,video,vote_average,vote_count,])

        const result = rows[0]
        res.status(201).send(result)
        return
}


export const ShowIndex = async (req:Request, res:Response) => {
    const q = "SELECT * FROM movies ORDER BY created_at DESC"
    const {rows} = await pool.query(q)
    res.send(rows[0])
}

export const ShowMovie = async (req:Request, res:Response) => {
    const {id} = req.params
    const q = "SELECT * FROM movies WHERE id = $1"
    const {rows} = await pool.query(q,[id])

    res.send(rows[0])
    return
}