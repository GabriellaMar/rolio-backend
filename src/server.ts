import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


 const PORT: string | number = process.env.PORT || 4000
 const DB_HOST: string = process.env.DB_HOST || '';
 

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful")
      console.log(`Server running. Use our API on port: ${PORT} `)
      console.log('Server listening http://localhost:8000')

    })
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })