import React, { useState, useEffect } from "react";
import { getAll, post, put, deleteById } from "./memdb.js";
import "./App.css";
import CustomerList from "./components/CustomerList.js";
import CustomerAddUpdateForm from "./components/CustomerAddUpdateForm.js";

function log(message) {
  console.log(message);
}

export function App(params) {
  let blankCustomer = { id: -1, name: "", email: "", password: "" };
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);
  let mode = formObject.id >= 0 ? "Update" : "Add";
  useEffect(() => {
    getCustomers();
  }, [formObject]);

  const getCustomers = function () {
    log("in getCustomers()");
    getAll(setCustomers);
  };

  const handleListClick = function (item) {
    log("in handleListClick()");
    if (item.id === formObject.id) {
      setFormObject(blankCustomer);
    } else {
      setFormObject(item);
    }
  };

  const handleInputChange = function (event) {
    log("in handleInputChange()");
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = { ...formObject };
    newFormObject[name] = value;
    setFormObject(newFormObject);
  };

  let onCancelClick = function () {
    log("in onCancelClick()");
    setFormObject(blankCustomer);
  };

  let onDeleteClick = function () {
    log("in onDeleteClick()");
    if (formObject.id >= 0) {
      deleteById(formObject.id);
    }
    setFormObject(blankCustomer);
  };

  let onSaveClick = function () {
    if (mode === "Add") {
      post(formObject);
    }
    if (mode === "Update") {
      put(formObject);
    }
    setFormObject(blankCustomer);
  };

  return (
    <div>
      <CustomerList
        customers={customers}
        setCustomers={setCustomers}
        formObject={formObject}
        handleListClick={handleListClick}
      />
      <CustomerAddUpdateForm
        mode={mode}
        handleInputChange={handleInputChange}
        formObject={formObject}
        onDeleteClick={onDeleteClick}
        onSaveClick={onSaveClick}
        onCancelClick={onCancelClick}
      />
    </div>
  );
}

export default App;
