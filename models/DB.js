import mysql from 'mysql'
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bpms"
});


export default connection;
// const db = async () =>{
//     return await connection.connect();
// }
// function connectToDatabase() {
//     if (fs.existsSync(filepath)) {
//         return new sqlite3.Database(filepath);
//     } else {
//         const db = new sqlite3.Database(filepath, (error) => {
//             if (error) {
//                 return console.error(error.message);
//             }
//             createTable(db);
//             console.log("Connected to the database successfully");
//         });
//         return db;
//     }
// }

// module.exports = connection;