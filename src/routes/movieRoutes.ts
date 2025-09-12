import {Router} from 'express'
import { validateMovie, validateTrendingMovie, validateUpdateCount } from '../middlewares/validators'
import { newMovie, ShowIndex, ShowMovie, updateSearchCount } from '../controllers/movieController'


const router =  Router()

router.get('/',ShowIndex )
router.get('/:id', ShowMovie)
router.post('/',validateMovie,newMovie )
router.post('/update-search-count',validateUpdateCount, updateSearchCount)

export default router