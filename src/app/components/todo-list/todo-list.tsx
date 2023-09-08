import ShopifyToDoItemList from "@/app/models/shopify-todo-item-list";
import ToDoItem from "@/app/models/todo-item";
import React from "react";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faBan, faCheckCircle, faCircle, faTrash, faTrashCan, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
config.autoAddCss = false

type Props = {
  data: any
}

const ToDoList: React.FC<Props> = ({ data }) => { 
  const tabNames = {todoList: "TodoList", defaultSubtasks: "DefaultSubtasks"};


  const [isClicked, setIsClicked] = React.useState(false);
  const [activeTabName, setActiveTabName] = React.useState(tabNames.todoList);
  const [addTaskVisible, setAddTaskVisible] = React.useState(true);
  const [addTaskName, setAddTaskName] = React.useState("");
  const [deleteSubtaskActive, setDeleteSubtaskActive] = React.useState<ToDoItem>();

  const [todoItems, setTodoItems] = React.useState<ShopifyToDoItemList>({tasks: data.tasks, defaultSubtasks: data.defaultSubtasks});

  function onAddTaskTextChange(event: any) {
    setAddTaskName(event.target.value);
  }

  function ClickTab(tab: string) {
   setActiveTabName(tab); 
  }

  function ClickItem(item: ToDoItem) {
    item.completed = !item.completed ?? true;
    //UpdateListing(todoItems);
    fetch('/api/staticdata', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({todoItems}),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setTodoItems({tasks: data.tasks, defaultSubtasks: data.defaultSubtasks});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  function ToggleSubitemComplete(item: ToDoItem, subitem: ToDoItem) {
    subitem.completed = !subitem.completed ?? true;
    console.log(todoItems);
    //UpdateListing(todoItems);
    fetch('/api/staticdata', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({todoItems}),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setTodoItems({tasks: data.tasks, defaultSubtasks: data.defaultSubtasks});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  function DeleteSubitem(item: ToDoItem, subitem: ToDoItem) {
    // Find the item of the subtask if it exists, and remove it.
    // We're just removing the one subitem from one task, so splice is fastest.
    console.log("Begin delete");
    console.log(item);
    console.log(subitem);
    let delIndex = item.subtasks?.indexOf(subitem);
    console.log(delIndex);
    if (delIndex || delIndex === 0) {
      item.subtasks?.splice(delIndex, 1);
    }
    
    console.log(item);
    console.log("End delete");
    
    console.log(todoItems);
    //UpdateListing(todoItems);
    fetch('/api/staticdata', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({todoItems}),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setTodoItems({tasks: data.tasks, defaultSubtasks: data.defaultSubtasks});
      setDeleteSubtaskActive(undefined)
    })
    .catch((error) => {
      console.error(error);
    });
  }

  function AddItem() {
    // This takes whatever is in the Add New Item textbox, which is already set in state.
    if (!addTaskName || addTaskName.trim() === "") {
      // Don't add items with blank names.
      return;
    }
    const newItem:ToDoItem = {name: addTaskName, subtasks: todoItems.defaultSubtasks.map((ds => {
      const newItemSubtask:ToDoItem = {name: ds};
      return newItemSubtask;
    }))};
    todoItems.tasks.push(newItem);
    fetch('/api/staticdata', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({todoItems}),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setTodoItems({tasks: data.tasks, defaultSubtasks: data.defaultSubtasks});
      setAddTaskName("")
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  return (
    <main className="w-full">
      <h1 className="text-center">
        To-Do List Demo
      </h1>
      <div>
        <div className="flex justify-start gap-2">
          <button 
            className={`rounded-full px-2 ${activeTabName == tabNames.todoList ? 'bg-amber-500 text-black' : 'bg-amber-900 text-white'}`}
            onClick={() => ClickTab(tabNames.todoList)}>
            {"Todo List"}
          </button>
          <button 
            className={`rounded-full px-2 ${activeTabName == tabNames.defaultSubtasks ? 'bg-amber-500 text-black' : 'bg-amber-900 text-white'}`}
            onClick={() => ClickTab(tabNames.defaultSubtasks)}>
            {"Default Subtasks"}
          </button>
        </div>
      </div>
      {activeTabName === tabNames.defaultSubtasks && (
      <div>
        <div>
          <h2>
            {"Default Subtasks"}
          </h2>
          <ul className="grid grid-cols-3">
          {todoItems.defaultSubtasks.map((st: string, si: number) => {
            console.log(st);
            return (
              <li key={si} className={`p-3 m-2 ${si % 2 === 0 ? "bg-indigo-900" : "bg-violet-900"} rounded-full text-center`}>
                { st }
              </li>
            )
          })}
          </ul>
        </div>
      </div>
      )}
      {activeTabName === tabNames.todoList && (
      <div>
        <h2>
          {"Example: Shopify Store Tasks"}
        </h2>
        {addTaskVisible && (
          <div className="rounded-lg bg-blue-900 border-4 border-blue-600 p-2">
            <h3>{"Add new Task"}</h3>
            <div className="grid grid-cols-2">
              <input type="text" 
                className="text-black"
                value={addTaskName}
                onChange={onAddTaskTextChange}
              />
              <button
                className="bg-green-950 hover:bg-green-600 rounded-full px-2"
                onClick={() => AddItem()}
                name="subwriteTest">
                { "Add Task"}
              </button>
            </div>
          </div>
        )}
        
        <ul>
          {todoItems.tasks.map((item: ToDoItem, index: number) => {
            console.log(item.subtasks);
            if (item.subtasks) {
              console.log(item.subtasks.map((i: ToDoItem, foo: number) => {
                console.log(i.name);
              }));
            }            
            return (
              <li key={index}>
                <ul className={`grid grid-cols-2 gap-2 border-4 ${item.completed ? "bg-green-900 border-green-800" : "bg-slate-800 border-slate-700"} bg-slate-800 rounded-lg my-2 p-1 items-center`}>
                  <li>{item.name}</li>
                  <li className="items-center justify-between">
                    <button
                      className="bg-fuchsia-950 hover:bg-cyan-600 accent-pink-500 rounded-full px-2"
                      onClick={() => ClickItem(item)}
                      name="writeTest">
                        <FontAwesomeIcon icon={item.completed ? faCheckCircle : faXmarkCircle}></FontAwesomeIcon> 
                        { ` ${!item.completed ? "Mark as Completed" : "Unmark as Completed"}`}
                    </button>
                  </li>
                  {item.subtasks && (item.subtasks as ToDoItem[]).map((i: any, ind: number) => {
                    // independent states for if delete is pressed.
                    return (
                      <li className="col-span-2 items-center p-0" key={ind}>
                        <ul className={`grid grid-cols-2 rounded-md border-4 ${i.completed ? "bg-green-950 border-green-700" : "bg-red-950 border-red-700"}  ml-2 my-1 items-center`}>
                          <li>
                            {i.name}
                          </li>                          
                          <li className="flex gap-2">                            
                            <button
                              className="bg-red-950 hover:bg-blue-600 rounded-full px-2"
                              onClick={() => ToggleSubitemComplete(item, i)}
                              name="subwriteTest">
                                <FontAwesomeIcon icon={i.completed ? faCheckCircle : faXmarkCircle}></FontAwesomeIcon> 
                                { ` ${!i.completed ? "Mark Done" : "Mark Undone"}`}
                            </button>
                            {(!deleteSubtaskActive && deleteSubtaskActive !== i) ?
                              (
                                <button
                                className="bg-red-700 hover:bg-blue-600 rounded-full px-2"
                                onClick={() => setDeleteSubtaskActive(i)}
                                name="subwriteTest">
                                  <FontAwesomeIcon icon={faBan}></FontAwesomeIcon> 
                                  { ` Delete`}
                              </button>
                            ) : (
                              <span>
                                <button
                                  className="bg-red-700 hover:bg-blue-600 rounded-full px-2"
                                  onClick={() => DeleteSubitem(item, i)}
                                  name="subwriteTest">
                                    <FontAwesomeIcon icon={faBan}></FontAwesomeIcon> 
                                    { ` Confirm Delete`}
                                </button>
                                <button
                                  className="bg-blue-700 hover:bg-blue-600 rounded-full px-2"
                                  onClick={() => setDeleteSubtaskActive(undefined)}
                                  name="subwriteTest">
                                    <FontAwesomeIcon icon={faBan}></FontAwesomeIcon> 
                                    { ` Cancel Delete`}
                                </button>
                            </span>
                            )}
                          </li>
                        </ul>
                      </li>               
                    );                    
                  })}                  
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      )}
    </main>
  )
  }

export default ToDoList