import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`,
    );

    console.log(
      `\nDatabase Connected | host: ${connectionInstance.connection.host}`,
    );
  } catch (err) {
    console.log('Mongo Db connection failure', err);
    process.exit(1);
  }
};

export default connectDB;
