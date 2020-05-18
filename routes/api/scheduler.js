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
});

router.get('/:id', async function(req, res) {
    try {
        const myEvent = await getEventById(req.params.id);
        res.send(myEvent);
    } catch(err) {
        if(err.error) {
            res.status(400).send(err);
        } else {
            console.log(err);
            res.status(500).send('Internal Servier issue, check logs');
        }
    }
});

//Post router
router.post('/', async function(req, res) {
    try {
        const newEvent = await addEvent(req.body);
        res.send(newEvent);
    } catch(err) {
        if(err.error) {
            res.status(400).send(err);
        } else {
            console.log(err);
            res.status(500).send('Internal Server issue, check logs');
        }
    }
});

//Put router
router.put('/:id', async function(req, res) {
    try {
        const updatedEvent = await updateEvent(req.params.id, req.body);
        res.send(updatedEvent);
    } catch(err) {
        if(err.error) {
            res.status(400).send(err);
        } else {
            console.log(err);
            res.status(500).send("Internal Server issue, check logs");
        }
    }
})

module.exports = router;