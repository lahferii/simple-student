import serverHandling from "../response/jsonFormatter.mjs"
import {ukm, student} from "../src/sourceDatas.mjs"

export default class Student{
  getAllStudent(response){
    const ress = new serverHandling()
    response.write(
      ress.success(200, "OK", "Parsing Data Success", student)
    )
    response.end()
  }

  createStudent(request, response){
    request.addListener("data", (data) => {
      const ress = new serverHandling()

      const newData = JSON.parse(data)
      const findDuplicateNrp = student.some((target) => target.nrp == newData.nrp)
  
      let selectedUkm = ukm.find((_, index) => newData.ukm == index || false)

      if(findDuplicateNrp){
        response.write(
          ress.success(400, "Bad Request", "Data Already Recorded")
        ) 
      } else {
        if(!selectedUkm){
          response.write(
            ress.error(400, "Bad Request", "UKM Did Not Exist")
          )
        } else {
          const storeThis = {
            "nrp": newData.nrp,
            "nama": newData.nama,
            "kelas": newData.kelas,
            "ukm": selectedUkm
          } 
          student.push(storeThis)
          response.write(
            ress.success(200, "OK", "Creating data Success", student)
          )
        }
      }

      response.end()
    })
  }


  editStudent(request, response){
    request.addListener("data", (data) => {
      const ress = new serverHandling()
      const req = JSON.parse(data)

      const validNrp = student.findIndex((value) => value.nrp == req.nrp)
      const selectedUkm = ukm[req.ukm]
      
      if(validNrp !== -1){
        if(selectedUkm){
          student[validNrp].nama = req.nama
          student[validNrp].kelas = req.kelas
          student[validNrp].ukm = selectedUkm

          response.write(
            ress.success(200, "OK", "Edit Data Success", student)
          )
        } else {
          response.write(
            ress.error(404, "Not Found", "UKM Did Not Exist")
          )
        }
      } else {
        response.write(
          ress.error(404, "Not Found", "NRP Did Not Exist")
        )
      }

      response.end()
    })
  }

  deleteStudent(request, response){
    request.addListener("data", (data) =>{
      const ress = new serverHandling()
      const req = JSON.parse(data)

      student.map((value, index) => {
        if(req.nrp == value.nrp){
          student.splice(index, 1)
          response.write(
            ress.success(200, "OK", "Delete Data Success", student)
          )
        } else {
          response.write(
            ress.error(404, "Not Found", "Data You Were Searching For Did Not Exist")
          )
        }
      })
      response.end()
    })
  }
  
}