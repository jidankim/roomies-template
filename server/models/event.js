import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Event = new Schema({
    writer: String,
    eventName: String,
    endDate: String,
    startDate: String
});

export default mongoose.model('event', Event);
