const btnAdd = document.querySelector("#btn-add");
const btnSave = document.querySelector("#btn-save");
const ulNode = document.querySelector("ul");
const inputTask = document.querySelector("#input-add");
const todolist = document.querySelector(".todolist");

// event click "delete todo item"
function linkEventDelete() {
  const arrDelete = document.querySelectorAll(".delete");
  arrDelete.forEach((aDelete) => {
    aDelete.addEventListener("click", function (e) {
      const id = this.dataset.itemid;
      const endpoint = `/todo/${id}`;

      //   this.parentNode.parentNode.removeChild(this.parentNode);
      this.parentNode.style.display = "none";
      btnSave.style.display = "block";
      //   if (id !== "") {
      //     fetch(endpoint, {
      //       method: "DELETE",
      //     })
      //       .then((result) => {
      //         this.parentNode.parentNode.removeChild(this.parentNode);
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //       });
      //   } else {
      //     this.parentNode.parentNode.removeChild(this.parentNode);
      //   }
    });
  });
}

// event click add "new todo button" to DOM
btnAdd.addEventListener("click", (e) => {
  e.preventDefault();

  newTask = inputTask.value;
  if (newTask === "") return;

  let currDate = new Date();
  currDate.setHours(currDate.getHours() - currDate.getTimezoneOffset() / 60);

  let i = ulNode.childElementCount;
  ulNode.innerHTML += ` <li>
  <input type="checkbox" id="${i}">
  <label for="${i}">${newTask}</label>
  <input type="hidden" id="ti-id" data-modified="true">
  <input type="hidden" id="ti-task" value="${newTask}">
  <input type="hidden" id="ti-done">
  <input type="datetime-local" id="ti-deadLine" class="input-deadLine" class="item" value="${currDate
    .toISOString()
    .slice(0, 16)}">
  <a class="delete" data-itemid="">
    <img src="/img/trashcan.svg" alt="delete icon">
  </a>
</li>`;

  inputTask.value = "";
  btnSave.style.display = "block";

  linkEventDelete();
});

//  event change to show "save button"
todolist.addEventListener("change", (e) => {
  const liNode = e.target.parentNode;
  const idNode = liNode.querySelector("#ti-id");
  idNode.dataset.modified = true;
  console.log(idNode);
  btnSave.style.display = "block";
});

// get value from hidden input element
const getValue = (node, selector) => {
  nodeChild = node.querySelector(selector);

  if (nodeChild !== null) {
    if (nodeChild.type === "checkbox") return nodeChild.checked;
    //console.log(nodeChild);
    return nodeChild.value;
  }
};

// event click "save button"
btnSave.addEventListener("click", (e) => {
  e.preventDefault();
  let todolist = [];

  for (let i = 0; i < ulNode.childElementCount; i++) {
    let liNode = ulNode.children[i];
    let idNode = liNode.querySelector("#ti-id");
    let isModified = idNode.dataset.modified === "true";
    let isDeleted = liNode.style.display === "none";

    if (isModified || isDeleted) {
      let item = {};

      item.id = idNode.value;
      item.task = getValue(liNode, "#ti-task");
      item.done = getValue(liNode, "input[type='checkbox']");
      item.deadLine = getValue(liNode, "#ti-deadLine");
      item.deleted = isDeleted;

      if (!(item.id === "" && isDeleted)) todolist.push(item);
    }
  }

  if (todolist.length > 0)
    fetch("/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todolist),
    })
      .then((result) => {
        //btnSave.style.display = "none";
        window.location.href = "/todo";
        console.log("redirec");
      })
      .catch((err) => console.log(err));
});

linkEventDelete();
