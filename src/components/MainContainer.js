import React, { useState, useRef } from "react";

const MainContainer = () => {
  let formRef = useRef(null);

  const [taskList, setTaskList] = useState([]);

  function addNewTask(e) {
    if (e.keyCode === 13 && formRef.value !== "") {
      setTaskList(taskList.concat(formRef.value));
      emptyLiRef.current.className = "hiding";
      formRef.value = "";
    }
  }

  function deleteTask(i) {
    taskList.splice(i, 1);
    setTaskList([...taskList]);
  }

  function deleteEveryone (){
    setTaskList([]);
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
      <button id="deleteAll" className="btn-danger btn btn-lg animate__animated animate__bounceInUp" onClick={deleteEveryone}>
        <i class="fas fa-dumpster"></i>
      </button>
    </>
  );
};

export default MainContainer;
