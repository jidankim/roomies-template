import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Event = new Schema({
    writer: String,
    eventName: String,
    endDate: Date,
    startDate: Date
});

export default mongoose.model('event', Event);
