const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

// Get all subscribers
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get subscriber by id
router.get('/:id', getSubscriberById, (req, res) => {
  res.send(res.subscriber);
});

// Creating subscriber
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update subscriber
router.patch('/:id', getSubscriberById, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
  }
  try {
    updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete subscriber
router.delete('/:id', getSubscriberById, async (req, res) => {
  try {
    await subscriber.deleteOne();
    res.json({ message: 'Deleted subscriber' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getSubscriberById(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: 'Could not find subscriber' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.subscriber = subscriber
  next()
}

module.exports = router;
