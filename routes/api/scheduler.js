const express = require('express');
const router = express.Router();
const {
    getEvents,
    getEventById,
    addEvent,
    updateEvent,
    updateEventValues,
    deleteEvent
} = require('../../dal/scheduler');

//Get routers
router.get('/', async function(req, res) {
    try{
        const events = await getEvents();
        res.send(events);
    } catch(err) {
        console.log(err);
        res.status(500).send('Internal Server issue, check logs');
    }
})

module.exports = router;