import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Event = new Schema({
    writer: String,
    contents: Object,
    is_edited: { type: Boolean, default: false }
});

export default mongoose.model('event', Event);
