function getAllRoutes(app){
    app.use('/api/studentsdetails', require('../routes/students_details.routes'))
}
module.exports = getAllRoutes