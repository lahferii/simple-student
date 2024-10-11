import http from "http"
import Student from "./class/Student.mjs"
import Ukm from "./class/Ukm.mjs"

const student = new Student()
const ukm = new Ukm()

const server = http.createServer((request, response) => {
  if(request.url == "/api/" && request.method == "GET"){
    student.getAllStudent(response)
  } else if(request.url == "/api/student/add" && request.method == "POST"){
    student.createStudent(request, response)
  } else if(request.url == "/api/student/edit" && request.method == "PUT"){
    student.editStudent(request, response)
  } else if(request.url == "/api/student/delete" && request.method == "DELETE"){
    student.deleteStudent(request, response)
  } else if(request.url == "/api/ukm/" && request.method == "GET"){
    ukm.getAllUkm(response)
  } else if(request.url == "/api/ukm/add" && request.method == "POST"){
    ukm.createUkm(request, response)
  } else if(request.url == "/api/ukm/edit" && request.method == "PUT"){
    ukm.editUkm(request, response)
  } else if(request.url == "/api/ukm/delete" && request.method == "DELETE"){
    ukm.deleteUkm(request, response)
  }
})

server.listen(3000)