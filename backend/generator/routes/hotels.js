const hotelRouter = require('express').Router()
const Hotel = require('../models/hotel')
const configs = require('../utils/configs')
const middlewares = require('../utils/middlewares')
const { upload, uploadOrUpdatedFile, deleteFile } = require('../models/picture')


hotelRouter.get('/', async (req,res) => {
    const hotels = await Hotel.find({})

    res.status(200).json(hotels)
})

hotelRouter.patch('/:hotelId', upload.single('logo'), async (req, res) => {
    const { hotelId } = req.params;
    const { name } = req.body;
    try {
    let updatedFields = { name };
    if (req.file) {
    // Upload logo image to GridFS if a new logo is provided
    const logoUrl = await uploadOrUpdatedFile(
    req.file,
    req.file.originalname,
    req.file.mimetype,
    req.file.encoding
    );
    updatedFields.logo = logoUrl;
    }
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, updatedFields, { new: true });
    res.status(200).json(updatedHotel);

    } catch (error) {

    console.error('Error updating hotel:', error);

    res.status(500).json({ msg: 'Error updating hotel' });
    }
   });

   hotelRouter.patch('/:hotelId/meals/:mealId', upload.single('image'), async (req, res) => {
    const { hotelId, mealId } = req.params;

    const { name, price, category, deliveryFee } = req.body;

    try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ msg: 'Hotel not found' })

    const meal = hotel.meals.id(mealId)

    if (!meal) return res.status(404).json({ msg: 'Meal not found' });
    // Update meal fields
    if (name) meal.name = name;
    if (price) meal.price = price;
    if (category) meal.category = category;
    if (deliveryFee) meal.deliveryFee = deliveryFee;
    // If meal image is updated, store it in GridFS
    if (req.file) {
    const mealImageUrl = await uploadOrUpdatedFile(
    req.file,
    req.file.originalname,
    req.file.mimetype,
    req.file.encoding
    );
    meal.image = mealImageUrl;
    }
    await hotel.save();
    res.status(200).json(hotel);
    } catch (error) {
    console.error('Error updating meal:', error);
    res.status(500).json({ msg: 'Error updating meal' });
    }
   })

hotelRouter.post('/',middlewares,configs.isAdmin, async (req,res) => {
    const {name, logo,meals} = req.body

    try{
        const newHotel = new Hotel({
            name,
            logo,
            meals
        })

        if(!name || !meals) {
            return res.status(404).json({msg: 'Name or menu missing!'})
        }
        await newHotel.save()
        res.status(200).json(newHotel)
    }catch(error) {
        console.error(error)
        res.status(500).json({msg: 'Error while creating new hotel'})
    }
})

hotelRouter.delete('/:hotelId', async (req, res) => {
    const { hotelId } = req.params;
    try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ msg: 'Hotel not found' });
    // Delete logo from GridFS if it exists
    if (hotel.logo) {
    const logoFileId = hotel.logo.split('/').pop(); // Extract file ID from URL
    await deleteFile(logoFileId);
    }
    await Hotel.findByIdAndDelete(hotelId);
    res.status(200).json({ msg: 'Hotel deleted successfully' });
    } catch (error) {
    console.error('Error deleting hotel:', error);
    res.status(500).json({ msg: 'Error deleting hotel' });
    }
   });

hotelRouter.delete('/:hotelId/meals/:mealId', async (req, res) => {
    const { hotelId, mealId } = req.params;
    try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ msg: 'Hotel not found' });
    const meal = hotel.meals.id(mealId);
    if (!meal) return res.status(404).json({ msg: 'Meal not found' });
    if (meal.image) {
    const mealImageFileId = meal.image.split('/').pop(); // Extract file ID from URL
    await deleteFile(mealImageFileId);
    }
    meal.remove();
    await hotel.save();
    res.status(200).json(hotel);
    } catch (error) {
    console.error('Error deleting meal:', error);
    res.status(500).json({ msg: 'Error deleting meal' });
    }
   })

module.exports = hotelRouter