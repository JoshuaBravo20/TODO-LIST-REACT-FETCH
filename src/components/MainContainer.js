import React, { useState, useRef, useEffect } from "react";

const MainContainer = () => {
  //Definición de Variables

  let formRef = useRef(null);
  const [taskList, setTaskList] = useState([]);
  const [arrayObj, setArrayObj] = useState([]);
  const [urlApi] = useState(
    "https://assets.breatheco.de/apis/fake/todos/user/joshuabravofinal2"
  );

  //<------------->

  //Funcion para traer las tareas
  function getTasks(url) {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  //Cargar al princpio de la página

  useEffect(() => {
    getTasks(urlApi);
  }, []);

  //<------------->

  //Function para POST new LIST
  function newPost(url) {
    fetch(url, {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //<------------->

  //Funcion para ACTUALIZAR / PUT
  function updatePut(url, task) {
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //<------------->

  //Funcion de agregar nuevas tareas
  function addNewTask(e) {
    if (e.keyCode === 13 && formRef.value !== "") {
      setTaskList(taskList.concat(formRef.value));
      emptyLiRef.current.className = "hiding";
      let newT = [...arrayObj, { label: formRef.value, done: false }];
      setArrayObj(newT);
      updatePut(urlApi, newT);
      formRef.value = "";
      console.log(arrayObj);
    }
  }

  //<------------->

  //BORRAR TODO / METODO DELETE
  function deleteFullPost() {
    fetch(urlApi, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data.result))
      .catch((error) => console.error(error));
  }

  //<------------->

  //BORRAR INDIVIDUAL
  function deleteTask(i) {
    taskList.splice(i, 1);
    setTaskList([...taskList]);
    arrayObj.splice(i, 1);
    let newt = [...arrayObj];
    setArrayObj(newt);
    updatePut(urlApi, newt);
  }

  //BORRAR TODO DE NUEVO
  function deleteEveryone() {
    setTaskList([]);
    setArrayObj([]);
    deleteFullPost();
  }

  let emptyLiRef = useRef(null);

  return (
    <>
      <ul
        className="list-group animate__animated animate__bounceInUp animate__fast"
        id="box"
      >
        <div className="input-group flex-nowrap input-group-lg">
          <div className="input-group-prepend"></div>
          <input
            type="text"
            className="form-control"
            placeholder="New Task"
            aria-label="task"
            aria-describedby="addon-wrapping"
            id="taskLabel"
            ref={(r) => (formRef = r)}
            onKeyUp={addNewTask}
          />
        </div>
        <li className="list-group-item text-success" ref={emptyLiRef}>
          No tasks yet...
        </li>
        {!!taskList !== null &&
          taskList.map((valor, i) => {
            return (
              <li
                key={i}
                className="list-group-item animate__animated animate__backInDown animate__faster"
              >
                {valor}{" "}
                <i
                  className="fas fa-trash"
                  id="trash"
                  onClick={() => {
                    deleteTask(i);
                  }}
                ></i>
              </li>
            );
          })}
      </ul>
      <div id="counter" className="animate__animated animate__bounceInUp">
        {taskList.length} tasks pending
      </div>
      <button
        id="deleteAll"
        className="btn-danger btn btn-lg animate__animated animate__bounceInUp"
        onClick={deleteEveryone}
      >
        <i class="fas fa-dumpster"></i>
      </button>
      <button
        id="deleteAll"
        className="btn-danger btn btn-lg animate__animated animate__bounceInUp"
        onClick={() => {
          newPost(urlApi);
        }}
      >
        NEW USER
      </button>
    </>
  );
};

export default MainContainer;
