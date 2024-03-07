const baseURL = "http://localhost:4000/customers";
export async function getAll(setCustomers) {
  const myInit = {
    method: "GET",
    mode: "cors",
  };
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      alert(error);
    }
  };
  fetchData(baseURL);
}

export async function deleteById(id) {
  let url = baseURL + "/" + id;
  let myHeaders = new Headers({ "Content-Type": "application/json" });
  const myInit = {
    method: "DELETE",
    headers: myHeaders,
    mode: "cors",
  };
  let promise = fetch(url, myInit);
  return promise.then((response) => {
    return response.text();
  });
}

export function post(item) {
  let myHeaders = new Headers({ "Content-Type": "application/json" });
  delete item.id;
  let body = JSON.stringify(item);
  var myInit = {
    method: "POST",
    body: body,
    headers: myHeaders,
    mode: "cors",
  };
  let promise = fetch(baseURL, myInit);
  return promise.then((response) => {
    return response.text();
  });
}

export function put(formObject) {
  let url = baseURL + "/" + formObject.id;
  let myHeaders = new Headers({ "Content-Type": "application/json" });
  let body = JSON.stringify(formObject);
  console.log(body);
  var myInit = {
    method: "PUT",
    body: body,
    headers: myHeaders,
    mode: "cors",
  };
  let promise = fetch(url, myInit);
  return promise.then((response) => {
    return response.text();
  });
}
