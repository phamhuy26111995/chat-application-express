import mongoose from "mongoose";

const mongoDBConnector = {
  connect: async () => {
    try {
      await mongoose.connect(process.env.MONGO_DB_URL);
      console.log("MongoDB connected");
    } catch (error) {
      console.log("MongoDB connection failed", error);
    }
  },
};

export default mongoDBConnector;
