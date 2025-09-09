import { Pool } from 'pg';

const poolConfig = {
    connectionString: process.env.DATABASE_URL, 
  }
  
const pool = new Pool(poolConfig);

export default pool  