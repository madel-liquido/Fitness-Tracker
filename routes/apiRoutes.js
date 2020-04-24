const db = require("../models")
const mongojs = require("mongojs");
const express = require("express");

module.exports = function(app) {

    app.get("/api/workouts", function(req, res) {
        db.Workout.find()
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.json(err)
            })
    });

    app.post("/api/workouts", function(req, res) {
        db.Workout.create({})
            .then(data => res.json(data))
            .catch(err => {
                console.log("err", err)
                res.json(err)
            })
    });

    app.put("/api/workouts/:id", ({ body, params }, res) => {
        db.Workout.findByIdAndUpdate(
                params.id, { $push: { exercises: body } }, { new: true, runValidators: true }
            )
            .then(data => res.json(data))
            .catch(err => {
                console.log("err", err)
                res.json(err)
            })
    });
}