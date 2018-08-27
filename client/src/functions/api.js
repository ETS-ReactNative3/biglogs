class API{
  static get(url){
    let headers = this.getData

    return fetch(url, headers)
    .then(response => this.handleErrors(response))
  }

  static post(url, data){
    let obj = this.postData
    obj.body = JSON.stringify(data);
    return fetch(url, obj)
    .then(response => this.handleErrors(response))
  }

  static handleErrors(response){
    console.log(response);
    if(!response.ok){
      if(process.env.REACT_APP_ERROR_DESCRIPTIVE){
        return response.text().then(errMessage=>{
          console.log("err", errMessage);
          return Promise.reject(Error(errMessage))
        })
      }else{
        console.log("err", response.statusText);
        throw response.statusText
      }
    }
    else{
      return response.json().then(data=>{
        return data
      })
    }
  }

  static handleResponse(response){
    console.log(response);
    return response.then(response => response.json())
  }
}

API.postData = {
   method: "POST",
   headers:{
     accept: "application/json",
     "Content-type": "application/json",
   }
}

API.getData = {
  method: "GET",
  headers:{
    accept: "application/json",
    "Content-type": "application/json",
  }
}

export default API;
