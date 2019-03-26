import mongoose from 'mongoose';
import schema from './schemas/comment';

const CommentSchema = new mongoose.Schema(schema);

export default mongoose.model('Comment', CommentSchema);