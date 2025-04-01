import mongoose from "mongoose";
import ENVIROMENT from "./enviroment.config.js";

const connectToMongoDB = async () => {
    try {
        const response = await mongoose.connect(ENVIROMENT.MONGO_DB_URL)
        console.log('Conexión exitosa con MongoDB/Conectados a la base de datos', mongoose.connection.name)
    }
    catch (error){
        console.log('Ocurrió un error al conectarse con MongoDB', error.message)
        console.log('DETALLES DEL ERROR', error.stack)
    }
}

connectToMongoDB()

export default mongoose
