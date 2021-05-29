import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  const list = localStorage.getItem("itemList");
  return list.length > 0 ? JSON.parse(list) : [];
};

function App() {
  const [item, setItem] = useState({ data: "", id: "" });
  const [btnText, setBtnText] = useState("Submit");

  const [alertMessage, setAlert] = useState("");
  const [isError, setIsError] = useState(false);

  const [itemList, setItemList] = useState(getLocalStorage());

  useEffect(() => {
    // get locat storage after initial render

    getLocalStorage();
  }, []);

  useEffect(() => {
    // get locat storage after initial render

    setLocalStorage();
  }, [itemList]);

  // Get local storage

  // Set local storage

  const setLocalStorage = () => {
    localStorage.setItem("itemList", JSON.stringify(itemList));
  };

  /// Edit item
  const handleEditItem = (id) => {
    const newList = itemList.find((data) => data.id === id);
    setBtnText("Edit");
    if (!newList) return displayError("Item not found", true);

    setItem({ ...newList });
  };

  /// Clear all items in list

  const handleClearAll = () => {
    setItemList([]);
    displayError("All Items removed", true);
  };

  /// Delete single items in list

  const handleDeleteItem = (id) => {
    debugger;

    const newList = itemList.filter((item) => item.id !== id);
    if (!newList) return setItemList([]);

    setItemList(newList);
    displayError("Item removed", true);
  };

  const displayError = (errorMessage, isError) => {
    setAlert(errorMessage);
    setIsError(isError);

    setTimeout(() => {
      setIsError(!isError);
      setAlert("");
    }, 2000);
  };

  const handleClick = (e) => {
    e.preventDefault();

    try {
      if (item.data === "") {
        displayError("Please enter data", true);
        return;
      }
      if (item.id) {
        const objIndex = itemList.findIndex((obj) => obj.id == item.id);

        itemList[objIndex].data = item.data;

        setItemList(itemList);

        displayError("Item updated successfully", false);

        setBtnText("Submit");
      } else {
        const newItem = { data: item.data, id: Date.now() };
        setItemList([...itemList, newItem]);
        displayError("Item added successfully", false);
      }

      setItem({ data: "", id: "" });
    } catch (error) {
      displayError(error.message, false);
    } finally {
      //setLocalStorage();
    }
  };
  const handleChange = (e) => {
    setItem({ ...item, data: e.target.value });
  };

  return (
    <>
      <section className="section-center">
        <Alert message={alertMessage} isError={isError}></Alert>
        <form className="grocery-form">
          <h3>grocery bud</h3>
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              placeholder="e.g. eggs"
              id="item"
              name="item"
              value={item.data}
              onChange={handleChange}
            ></input>
            <button type="submit" className="submit-btn" onClick={handleClick}>
              {btnText}
            </button>
          </div>
        </form>

        <List
          list={itemList}
          handleClearAll={handleClearAll}
          handleDeleteItem={handleDeleteItem}
          handleEditItem={handleEditItem}
        ></List>
      </section>
    </>
  );
}

export default App;
