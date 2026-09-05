import app from './src/app/app.js' ; 
import { ConnectDB } from './src/config/db.js';

await ConnectDB();

app.listen(3000, () => {
    console.log("Server is running...");
    
})