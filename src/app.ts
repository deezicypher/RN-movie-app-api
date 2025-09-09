import express,{Application,Request, Response} from 'express';
import cors from 'cors';
import movieRoutes from './routes/movieRoutes';

const app:Application = express()
app.use(cors())
app.use(express.json())

app.use('/api/movies', movieRoutes)
app.all('*', (req: Request, res: Response) => {
    res.status(404).json({ error: "Route Not Found" });
  }); 


export default app