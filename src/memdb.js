const items = [
  {
    id: 0,
    name: "Mike Johnsons",
    email: "mikej@abc.com",
    password: "mikej",
  },
  {
    name: "Cindy Smiths",
    email: "cinds@abc.com",
    password: "cinds",
    id: 1,
  },
  {
    name: "Julio Martins",
    email: "julim@abc.com",
    password: "julim",
    id: 2,
  },
];

// export function getAll() {
//   return items;
// }
// export function getAll() {
//   let myHeaders = new Headers({ "Content-Type": "application/json" });
//   var myInit = { method: "GET", headers: myHeaders, mode: "cors" };
//   let promise = fetch("/customers", myInit);
//   return promise.then((response) => {
//     return response.text();
//   });
// }
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

export function get(id) {
  let result = null;
  for (let item of items) {
    if (item.id === id) {
      result = item;
    }
  }
  return result;
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
  let nextid = getNextId();
  item.id = nextid;
  items[items.length] = item;
}

export function put(id, item) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      items[i] = item;
      return;
    }
  }
}

function getArrayIndexForId(id) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return i;
    }
  }
  return -1;
}

function getNextId() {
  let maxid = 0;
  for (let item of items) {
    maxid = item.id > maxid ? item.id : maxid;
  }
  return maxid + 1;
}
