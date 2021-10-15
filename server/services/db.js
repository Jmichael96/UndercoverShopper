const mongoose = require('mongoose');
const productionDB = process.env.PROD_MONGODB_URI;
const developmentDB = process.env.DEV_MONGODB_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(productionDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database has been penetrated!');
    } catch (err) {
        console.error(err.message);
        console.log('DB Error');
        process.exit(1);
    }
};

module.exports = connectDb;  