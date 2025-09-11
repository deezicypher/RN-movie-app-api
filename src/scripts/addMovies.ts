import pool from "../config/db";
import { movies } from "../constants/movies";

async function insertMovies() {
    const client = await pool.connect();
  
    try {
      for (const movie of movies) {
        await client.query(
          `INSERT INTO movies (
            title, adult, backdrop_path, genre_ids, original_language, original_title, overview, popularity,
            poster_path, release_date, video, vote_average, vote_count
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8,
            $9, $10, $11, $12, $13
          )
          ON CONFLICT (id) DO NOTHING;`, // You can customize conflict handling if needed
          [
            movie.title,
            movie.adult,
            movie.backdrop_path,
            movie.genre_ids,
            movie.original_language,
            movie.original_title,
            movie.overview,
            movie.popularity,
            movie.poster_path,
            movie.release_date,
            movie.video,
            movie.vote_average,
            movie.vote_count,
          ]
        );
        console.log(`Inserted movie: ${movie.title}`);
      }
    } catch (err) {
      console.error('Error inserting movies:', err);
    } finally {
      client.release();
      pool.end();
    }
  }
  
  insertMovies();