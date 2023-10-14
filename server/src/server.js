const http= require('http')
const {loadPlanetsData}= require("./models/planets.model")
const PORT = process.env.PORT || 8000;
const app= require('./app')


const server= http.createServer(app)  //itt a http-vel minden más midleweart beintegrál


async function startServer() {
    await loadPlanetsData() 
    server.listen(PORT, () => {
        console.log(`Listen to port ${PORT}`)
    })
}

startServer()






