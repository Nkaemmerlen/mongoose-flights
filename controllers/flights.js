import {Flight} from '../models/flight.js'
import { Meal } from '../models/meal.js'

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight'
  })
}
function create(req, res) {
  if (req.body.departs === '') delete req.body.departs
  const flight = new Flight(req.body)
  flight.save(function(err) {
    if (err) return res.redirect('/flights/new')
    res.redirect('/flights')
  })
}
function index(req, res) {
  Flight.find({}, function(err, flights) {
    res.render('flights/index', {
      flights,
      err,
      title: 'All Flights'
    })
  })
}
function show(req, res) {
  Flight.findById(req.params.id)
  .populate('meals')
  .exec(function (err, flight) {
    Meal.find({_id:{$nin:flight.meals}}, function(error, meals) {
      res.render('flights/show', {
        flight: flight,
        title: 'Flight info',
        meals
      })
    })
  })
}
function createTicket(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.tickets.push(req.body)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}
function createMeal(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.meals.push(req.body.mealId)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}
export{
  newFlight as new,
  create,
  index,
  show,
  createTicket,
  createMeal
}