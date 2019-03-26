import mongoose from 'mongoose';
import schema from './schemas/message';

const MessageSchema = new mongoose.Schema(schema);
export default mongoose.model('Message', MessageSchema);