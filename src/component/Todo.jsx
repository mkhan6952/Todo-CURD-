import React, { useEffect, useState } from "react";
import "./style.css";
import todo from "./image/nn.png";

//to get data from localstrpage
const getLocalItems = () => {
  let list = localStorage.getItem("list");
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const Todo = () => {
  // to add item */
  const [inputdata, setInputdata] = useState("");
  // to show item in a list
  const [item, setItem] = useState(getLocalItems);
  // to toggel bottom
  const [toggle, setToggle] = useState(true);
  //to save selected editittm
  const [isEdit, setisEdit] = useState(null);

  const addItems = () => {
    if (!inputdata) {
      alert("Please Enter a item First");
    } else if (inputdata && !toggle) {
      setItem(
        item.map((elem) => {
          if (elem.id === isEdit) {
            return { ...elem, name: inputdata };
          }
          return elem;
        })
      );
      setToggle(true);
      setInputdata("");
      setisEdit(null);
    } else {
      const inputdataAll = {
        id: new Date().getUTCMilliseconds().toString(),
        name: inputdata,
      };
      setItem([...item, inputdataAll]);
      setInputdata("");
    }

    /* to delete item in a list one by one */
  };
  const deleteItem = (id) => {
    const updatedItem = item.filter((elem) => {
      return id !== elem.id;
    });
    setItem(updatedItem);
  };
  /* to delete all item in a list once */
  const removeAll = () => {
    setItem([]);
  };

  //to edit data from itemlist
  const editItem = (id) => {
    const editItemList = item.find((elem) => {
      return id === elem.id;
    });
    //console.log(editItemList);
    setToggle(false);
    setInputdata(editItemList.name);
    setisEdit(id);
  };

  /* to store data in localstroage */
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(item));
  }, [item]);
  return (
    <>
      <div className="main-div">
        <div className="inner-div">
          <figure>
            <img className="img" src={todo} alt="todo" srcSet="" />
            <h2>Add Your List Here</h2>
          </figure>
          <div className="add-items">
            <input
              type="text"
              placeholder="✍️ Add Items..."
              value={inputdata}
              onChange={(e) => setInputdata(e.target.value)}
            />
            {toggle ? (
              <i
                className="fas fa-plus add-btn"
                title="Add Items"
                onClick={addItems}
              ></i>
            ) : (
              <i
                className="fa fa-edit"
                title="Edit Items"
                aria-hidden="true"
                onClick={addItems}
              ></i>
            )}
          </div>
          <div className="show-items">
            {item.map((elem) => {
              return (
                <div className="each-items" key={elem.id}>
                  <input type="text" readOnly />
                  <h3>{elem.name}</h3>
                  <i
                    className="fa fa-edit edit-items"
                    title="Edit Items"
                    aria-hidden="true"
                    onClick={() => editItem(elem.id)}
                  ></i>
                  <i
                    className="fa fa-trash del-items"
                    title="Delete Items"
                    aria-hidden="true"
                    onClick={() => deleteItem(elem.id)}
                  ></i>
                </div>
              );
            })}
          </div>
          <div className="show-items-2">
            <button className="button-6" onClick={removeAll}>
              Remove All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
