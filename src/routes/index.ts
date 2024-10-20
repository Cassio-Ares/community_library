import {Router} from 'express'
import routerUsers from './user.routes'
import routersBooks from './book.routes'
import routersLoans from './loans.routes'


const router = Router()

router.use(routerUsers)
router.use(routersBooks)
router.use(routersLoans)

export default router