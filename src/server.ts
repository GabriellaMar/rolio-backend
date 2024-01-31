import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


// const PORT: string | number = process.env.PORT || 4000
// const DB_HOST: string = process.env.DB_HOST || "";
// app.use((req,res)=>{
//     res.send('Hello')
// })

mongoose.connect('mongodb+srv://Gabriella:MkrzUBn7szgS0Tt6@cluster0.i5vmm9f.mongodb.net/db-rolio?retryWrites=true&w=majority'
)
  .then(() => {
    app.listen(8000, () => {
      console.log("Database connection successful")
      console.log(`Server running. Use our API on port: ${8000} `)
      console.log('Server listening http://localhost:8000')

    })
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })