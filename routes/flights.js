import { Router } from 'express'
const router = Router()
import * as flightsCtrl from '../controllers/flights.js'

router.get('/new', flightsCtrl.new)
router.post('/', flightsCtrl.create)
router.get('/', flightsCtrl.index)
router.get("/:id", flightsCtrl.show)
router.post("/:id/ticket", flightsCtrl.createTicket)
router.post("/:id/meals", flightsCtrl.createMeal)
export {
  router
}
