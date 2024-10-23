import { model, Schema, Document } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { IEvent } from "../interfaces/event.interface";


const EventsSchema: any = new Schema<IEvent>({
    _id: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    notes:{
        type: String,
        required: true
    },
    start:{
        type: Date,
        required: true
    },
    end:{
        type: Date,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
});

const EventModel = model<IUser>('Events', EventsSchema);

export default EventModel;
