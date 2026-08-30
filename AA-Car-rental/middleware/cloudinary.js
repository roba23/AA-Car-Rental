
import {v2 as cloudinary} from "cloudinary";
import 'dotenv/config';


//I am putting those configurations in my .env file and put my .env file in .gitignore file to not push this file when i push my whole code to github.
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default cloudinary;
