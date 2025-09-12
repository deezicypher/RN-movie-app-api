import {Request, Response} from 'express'
import pool from '../config/db'
import { param, validationResult } from 'express-validator'


export const newMovie = async (req:Request, res:Response) => {
    

    const {title,adult,backdrop_path,genre_ids,original_language,
        original_title,overview,popularity,poster_path,release_date,video,vote_average,vote_count} = req.body

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const firstError = errors.array().map(err => err.msg)[0]
        res.status(422).json({error:firstError})
        console.error(firstError)
        return
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
    const {searchId} = req.query
    let q = "SELECT * FROM movies "
    let params: string [] = []
    let conditions: string[] = []
    let paramIndex = 1 

    if(searchId && String(searchId).trim()){
      conditions.push(` title ILIKE $${paramIndex}`)
      params.push(`%${searchId}%`)
      paramIndex++
    }

    if(conditions.length > 0){
      q += "WHERE " + conditions.join(" AND ")
    }

    q+=" ORDER BY id DESC"
    const {rows} = await pool.query(q,params)
    res.send(rows)
}

export const ShowMovie = async (req:Request, res:Response) => {
    const {id} = req.params
    const q = "SELECT * FROM movies WHERE id = $1"
    const {rows} = await pool.query(q,[id])

    res.send(rows[0])
    return
}

export const updateSearchCount = async (req:Request, res:Response) => {
  
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      const firstError = errors.array().map(err => err.msg)[0]
      res.status(422).json({error:firstError})
      console.error(firstError)
      return
    }

    const {query,id,title,poster_path} = req.body

    try{
    const q = "SELECT * from trending_movies WHERE search_term = $1"
    const {rows} = await pool.query(q,[query])
    if(rows.length > 0) {
      const updateQuery = "UPDATE trending_movies SET count = count + 1 WHERE movie_id = $1 AND count = $2"
      await pool.query(updateQuery,[id,rows[0].count])
      return
    }
    const addQuery = "INSERT INTO trending_movies (search_term, movie_id,title,count,poster_url) VALUES ($1,$2,$3,$4,$5)"
    await pool.query(addQuery,[query,id,title,0,poster_path])
    return
  }catch(err){
    console.error(err)
  }
}