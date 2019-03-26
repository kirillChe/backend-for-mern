import mongoose from 'mongoose';
import schema from './schemas/rating';

const RatingSchema = new mongoose.Schema(schema);

export default mongoose.model('Rating', RatingSchema);