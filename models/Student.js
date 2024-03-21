import sqlite3 from "sqlite3";
import csvParser from 'csv-parser';
import fs from 'fs';
export default {
    getAllStudents: () => {
        const db = new sqlite3.Database('gust_students.db');
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM students limit 1000', (error, rows) => {
                if (error) {
                    console.error('Error retrieving inserted items:', error.message);
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
        });

    },
    getStudentsPerformanceByGender: () =>{
        const db = new sqlite3.Database('gust_students.db');
        return new Promise((resolve, reject) => {
            db.all('SELECT avg(G1) as G1 ,avg(G2) as G2,avg(G3) as G3 FROM students group by sex', (error, rows) => {
                if (error) {
                    console.error('Error retrieving inserted items:', error.message);
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
        });
    },
    getStudentsPerformanceByParentsEdu: () =>{
        const db = new sqlite3.Database('gust_students.db');
        return new Promise((resolve, reject) => {
            db.all('SELECT  DISTINCT (Fedu+Medu) as edLevel,(G1+G2+G3) as avgPer from students', (error, rows) => {
                if (error) {
                    console.error('Error retrieving inserted items:', error.message);
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
        });
    },
    getStudentsAvgScore: () =>{
        const db = new sqlite3.Database('gust_students.db');
        return new Promise((resolve, reject) => {
            db.all('SELECT avg(G1) as G1, avg(G2) as G2, avg(G3) as G3 from students', (error, rows) => {
                if (error) {
                    console.error('Error retrieving inserted items:', error.message);
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
        });
    },
    getStudentsParentsJob: () =>{
        const db = new sqlite3.Database('gust_students.db');
        return new Promise((resolve, reject) => {
            db.all('SELECT count(Fjob) as fcount,count(Mjob) as mcount, Fjob,Mjob from students group by Fjob', (error, rows) => {
                if (error) {
                    console.error('Error retrieving inserted items:', error.message);
                    reject(error);
                } else {
                    resolve(rows);
                }
            });
        });
    },
    importStudents: (req) => {
        const file = req.file;
        const db = new sqlite3.Database('gust_students.db');
        db.serialize(() => {
            try {
                db.run('CREATE TABLE IF NOT EXISTS students (school TEXT,sex TEXT,age INTEGER,address TEXT,famsize TEXT,Pstatus TEXT,Medu INTEGER,Fedu INTEGER,Mjob TEXT,Fjob TEXT,reason TEXT,guardian TEXT,traveltime INTEGER,studytime INTEGER,failures INTEGER,schoolsup TEXT,famsup TEXT,paid TEXT,activities TEXT,nursery TEXT,higher TEXT,internet TEXT,romantic TEXT,famrel INTEGER,freetime INTEGER,goout INTEGER,Dalc INTEGER,Walc INTEGER,health INTEGER,absences INTEGER,G1 INTEGER,G2 INTEGER,G3 INTEGER)');
            } catch (error) {
                console.log('Error creating table:', error.message);
            }

            const insertStatement = db.prepare(`
            INSERT INTO students (
                school, sex, age, address, famsize, Pstatus, Medu, Fedu,
                Mjob, Fjob, reason, guardian, traveltime, studytime, failures,
                schoolsup, famsup, paid, activities, nursery, higher, internet,
                romantic, famrel, freetime, goout, Dalc, Walc, health, absences,
                G1, G2, G3
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
        `);

            fs.createReadStream(file.path)
                .pipe(csvParser({ delimiter: ",", from_line: 2 }))
                .on("data", function (row) {
                    insertStatement.run(
                        row?.school, row?.sex, row?.age,
                        row?.address, row?.famsize, row?.Pstatus, row?.Medu,
                        row?.Fedu, row?.Mjob, row?.Fjob, row?.reason, row?.guardian,
                        row?.traveltime, row?.studytime,
                        row?.failures, row?.schoolsup, row?.famsup,
                        row?.paid, row?.activities, row?.nursery, row?.higher, row?.internet, row?.romantic,
                        row?.famrel, row?.freetime, row?.goout, row?.Dalc, row?.Walc, row?.health, row?.absences,
                        row?.G1, row?.G2, row?.G3,
                    );
                })
                .on('end', () => {
                    insertStatement.finalize();
                    db.close((error) => {
                        if (error) {
                            console.error('Error closing database:', error.message);
                        } else {
                            console.log('Database closed successfully.');
                        }
                    });
                });
        });
    }

};
