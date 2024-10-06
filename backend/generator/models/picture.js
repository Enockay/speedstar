const mongoose = require('mongoose')
const {GridFSBucket} = require('mongodb')
const multer = require('multer')

const conn = mongoose.createConnection(process.env.MONGODB_URL)

let gfsBucket
conn.once('open', () => {
    gfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'flyers'
    })
})

const storage = multer.memoryStorage()
const upload = multer({storage})

/**
* Upload or update a file in GridFS and return the URL.
*
* @param {Object} file - The file object from the request.
* @param {String} originalName - The original name of the file.
* @param {String} mimeType - The MIME type of the file.
* @param {String} encoding - The encoding of the file.
* @returns {Promise<String>} - A promise that resolves with the URL of the uploaded file.
*/

const uploadOrUpdatedFile = (file,originalName,mimeType,encoding) => {
    return new Promise((resolve,reject) => {
        const writeStream = gfsBucket.openUploadStream(originalName, {
            contentType: mimeType,
            metadata: {
                encoding: encoding,
            }
        })

        writeStream.on('finish', () => {
            const flyerUrl = `https://blackiewebackend.fly.dev/cyberService/flyers/${writeStream.id}`
            resolve(flyerUrl)
        })

        writeStream.on('error', (err) => {
            reject(err)
        })

        writeStream.write(file.buffer)
        writeStream.end()
    })
}

/** 

* Delete a file and its chunks from GridFS.
*
* @param {String} fileId - The ID of the file to delete.
* @returns {Promise<void>} - A promise that resolves when the file is deleted.
*/
const deleteFile = (fileId) => {
return new Promise((resolve, reject) => {
gfsBucket.delete(new mongoose.Types.ObjectId(fileId), (err) => {
if (err) {
return reject(err)
}
resolve()
})
})
}


module.exports = {
    upload,
    conn,
    uploadOrUpdatedFile,
    deleteFile
}