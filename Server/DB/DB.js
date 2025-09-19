import mongoose from 'mongoose';    
const dbConnect = async () => {
    main()
        .then(() =>
            console.log("DB Connectiion Sucessful"))
        .catch((err) => console.log("err"));
    async function main() {
        await mongoose.connect('mongodb://127.0.0.1:27017/KrishiSakhi');
    }
};
export default dbConnect;

  