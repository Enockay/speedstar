const express = require("express");
const { route } = require("./payments");
const router = express.Router();
const { conn} = require('../models/picture');
const mongoose = require('mongoose');

let gfsBucket;
conn.once('open', () => {
  // Initialize GridFSBucket
  gfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'flyers'
  });
  //console.log('Connected to MongoDB and GridFS initialized');
});

// Get a specific flyer file
router.get('/:id', async (req, res) => {
  try {
    const file = await gfsBucket.find({ _id: new mongoose.Types.ObjectId(req.params.id) }).toArray();

    if (!file || file.length === 0) {
      return res.status(404).json({ error: 'No file found' });
    }

    res.set('Content-Type', file[0].contentType); // Set the appropriate content type
    const readStream = gfsBucket.openDownloadStream(new mongoose.Types.ObjectId(req.params.id));
    readStream.pipe(res);
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).json({ error: 'Failed to retrieve file' });
  }
});

module.exports = router