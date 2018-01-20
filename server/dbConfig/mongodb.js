// To connect to our database server(mongodb)
import mongoose from 'mongoose';

const mongodb = mongoose.connect('mongodb://localhost:beast/beast');
export default mongodb;
