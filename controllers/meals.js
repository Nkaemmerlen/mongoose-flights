
import { Meal } from "../models/meal.js"

function newMeal(req, res) {
  Meal.find({}, function (err, meals) {
    res.render('meals/new', {
      meals,
      title: "Add Meal"
    })
  })
}
export {
  newMeal
}