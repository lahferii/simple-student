import {student, ukm} from "../src/sourceDatas.mjs"
import serverHandling from "../response/jsonFormatter.mjs"
export default class Ukm{
  
  getAllUkm(response){
    const ress = new serverHandling()

    response.write(
      ress.success(200, "OK", "Parsing Data Success", ukm)
    )
    response.end()
  }

  createUkm(request, response){
    const ress = new serverHandling()

    request.addListener("data", (data) => {
      const input = JSON.parse(data)
      const isDuplicated = ukm.includes(input.value, 0)
      
      if(isDuplicated){
        response.write(
          ress.error(400, "Bad Request", "Data Already Found")
        )
      } else {
        ukm.push(input.value)
        response.write(
          ress.success(200, "OK", "Creating Data Success", ukm)
        )
      }

      response.end()
    })
  }

  editUkm(request, response){
    const ress = new serverHandling()

    request.addListener("data", (data) => {
      const input = JSON.parse(data)
      const target = ukm[input.id]
      if(!target){
        response.write(
          ress.error(404, "Not Found", "UKM Did Not Exist")
        )
      } else {
        ukm[input.id] = input.value
        response.write(
          ress.success(200, "OK", "Edit Data Success", ukm)
        )
      }
      
      response.end()
    })
  }

  deleteUkm(request, response){
    request.addListener("data", (data) => {
      const res = new serverHandling()
      const req = JSON.parse(data)

      const findData = ukm.findIndex((value) => req.value == value)

      if(findData !== -1){
        ukm.splice(findData, 1)
        response.write(
          res.success(200, "OK", "Delete Data Success")
        )
      } else {
        response.write(
          res.error(404, "Not Found", "UKM Did Not Exist")
        )

      }

      response.end()
    })
  }
}