import {Router} from 'express'
import { validateMovie } from '../middlewares/validators'
import { newMovie, ShowIndex, ShowMovie } from '../controllers/movieController'


const router =  Router()

router.get('/',ShowIndex )
router.get('/:id', ShowMovie)
router.post('/',validateMovie,newMovie )

export default router