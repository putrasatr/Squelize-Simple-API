const express = require('express')
const router = express.Router()

const { getCondition } = require('../helpers/index')
const db = require('../models/index')

const Saves = db.saves

router.get('/', async (req, res, next) => {
    try {
        const condition = await getCondition(req.query)
        const data = await Saves.findAll({ where: condition })
        return res.status(200).json({
            code: 200,
            data,
            message: "Success",
            statusText: true
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            code: 500,
            data: false,
            statusText: false,
            message: error.message || "Something Error"
        })
    }
})

router.post('/', async (req, res, next) => {

    try {
        await Saves.create(req.body)
        return res.status(201).send({
            message: "Success",
            statusText: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            data: false,
            statusText: false,
            message: error.message || "Something Error"
        })
    }
})

module.exports = router