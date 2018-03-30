function showToDo(toDo: { title: string; text: string }) {
  console.log(toDo.title + " : " + toDo.text);
}

let myToDo = { title: "Hahahaha", text: "It's funny" };

showToDo(myToDo);

interface ToDo {
  title: string;
  text: string;
}

function showToDo1(toDo: ToDo) {
  console.log(toDo.title + " : " + toDo.text);
}

let myToDo1 = { title: "Trash", text: "Take it out" };

showToDo(myToDo1);
