import Student from '../models/Student.js';
export default {
    getAllStudents: async (req, res) => {
        const students = await Student.getAllStudents(req);
        res.json({ students: students });
    },
    getStudentsPerformanceByGender: async (req, res) => {
        const students = await Student.getStudentsPerformanceByGender(req);
        res.json({ students: students });
    },
    getStudentsPerformanceByParentsEdu: async (req, res) => {
        const students = await Student.getStudentsPerformanceByParentsEdu(req);
        const aggregateData = {};
        students.forEach(item => {
            const { edLevel, avgPer } = item;
            if (!aggregateData[edLevel]) {
                aggregateData[edLevel] = { sum: 0, count: 0 };
            }
            aggregateData[edLevel].sum += avgPer;
            aggregateData[edLevel].count += 1;
        });
        const resultArray = Object.entries(aggregateData).map(([edLevel, { sum, count }]) => ({
            edLevel: parseInt(edLevel),
            avgPer: sum / count,
        }));
        res.json({ students: resultArray });
    },
    getStudentsAvgScore: async (req, res) => {
        const students = await Student.getStudentsAvgScore(req);
        res.json({ students: students });
    },
    getStudentsParentsJob: async (req, res) => {
        const students = await Student.getStudentsParentsJob(req);
        res.json({ students: students });
    },
    
    
    importStudents: (req, res) => {
        const resp = Student.importStudents(req);
        res.json({ response: resp });
    }

};
