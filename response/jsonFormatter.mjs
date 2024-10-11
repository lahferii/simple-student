export default class Format{
  ress = {
    "meta": {
      "code": null,
      "status": null,
      "message": null
    },
    "body": {
      "data": null
    }
  }

  success(code, status, message, data){
    this.ress.meta.code = code
    this.ress.meta.status = status
    this.ress.meta.message = message
    this.ress.body.data = data

    return JSON.stringify(this.ress)
  }

  error(code, status, message){
    this.ress.meta.code = code
    this.ress.meta.status = status
    this.ress.meta.message = message

    return JSON.stringify(this.ress)
  }
}