import app from './app'
import dotenv from 'dotenv'
import pool from './config/db'

dotenv.config()

const startDB = async () => {
    try {
    await pool.connect()
    console.log('DB connected')
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS movies (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            adult BOOLEAN NOT NULL,
            backdrop_path TEXT NOT NULL,
            genre_ids INTEGER[] NOT NULL,
            original_language VARCHAR(10) NOT NULL,
            original_title TEXT NOT NULL,
            overview TEXT NOT NULL,
            popularity TEXT NOT NULL,
            poster_path TEXT NOT NULL,
            release_date DATE NOT NULL,
            video BOOLEAN NOT NULL,
            vote_average REAL NOT NULL,
            vote_count INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS trending_movies (
            id SERIAL PRIMARY KEY,
            search_term TEXT NOT NULL,
            movie_id INTEGER NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
            title TEXT NOT NULL,
            count INTEGER NOT NULL,
            poster_url TEXT NOT NULL,
            UNIQUE (search_term, movie_id)
);
    `
        await pool.query(createTableQuery)
        console.log('Created movies and trending movies query')
    }catch(err:any) {
        console.error("Error connecting to DB:",err.message,err); 
    }
}


app.listen(3000, () => {
    startDB()
    console.log('Listening on port 3000')
})
