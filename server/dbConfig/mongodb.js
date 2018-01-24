// To connect to our database server(mongodb)
import mongoose from 'mongoose';

const dbconfig = () => {
  const mongodb = mongoose.connect('mongodb://localhost:beast/beast');
  return mongodb;
};

export default dbconfig;
