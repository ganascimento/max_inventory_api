import mongoose from 'mongoose';
import environment from '../../src/shared/config/environment';

export const initializeDb = async () => {
    await mongoose.connect(environment.database.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
}

export const closeDb = async () => {
    await mongoose.disconnect();
}