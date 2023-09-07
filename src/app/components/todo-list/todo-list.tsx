import ShopifyToDoItemList from "@/app/models/shopify-todo-item-list";
import ToDoItem from "@/app/models/todo-item";
import React from "react";

type Props = {
  data: any
}

const ToDoList: React.FC<Props> = ({ data }) => { 
  const tabNames = {todoList: "TodoList", defaultSubtasks: "DefaultSubtasks"};


  const [isClicked, setIsClicked] = React.useState(false);
  const [activeTabName, setActiveTabName] = React.useState(tabNames.todoList);

  const [todoItems, setTodoItems] = React.useState<ShopifyToDoItemList>({tasks: data.tasks, defaultSubtasks: data.defaultSubtasks});

  function ClickTab(tab: string) {
   setActiveTabName(tab); 
  }

  function ClickItem() {

  }

  function ClickSubitem(item: ToDoItem, subitem: ToDoItem) {
    subitem.completed = true;
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
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  console.log(todoItems);

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
                <ul className="grid grid-cols-2 gap-2 bg-slate-800 rounded-lg my-2 p-1 items-center">
                  <li>{item.name}</li>
                  <li className="items-center justify-between">
                    <input
                      type="checkbox"
                      name="completed"
                      id={item.name}
                      checked={item.completed}
                      readOnly={item.completed}
                      className="rounded"
                      />                    
                    <button
                      className="bg-fuchsia-950 hover:bg-cyan-600 accent-pink-500 rounded-full px-2"
                      onClick={() => setIsClicked(true)}
                      name="writeTest">
                      {isClicked ? "Yay!" : "Click" }
                    </button>
                  </li>
                  {item.subtasks && (item.subtasks as ToDoItem[]).map((i: any, ind: number) => {
                    return (
                      <li className="col-span-2 items-center p-2" key={ind}>
                        <ul className={`grid grid-cols-2 rounded-md border-4 ${i.completed ? "bg-green-800 border-green-700" : "bg-red-800 border-red-700"}  ml-2 my-1 items-center`}>
                          <li>
                            {i.name}
                          </li>                          
                          <li>
                            <input
                              type="checkbox"
                              name="completed"
                              id={i.name}
                              checked={i.completed}
                              readOnly={i.completed}
                              className="rounded"
                              />                    
                            <button
                              className="bg-red-950 hover:bg-blue-600 rounded-full px-2"
                              onClick={() => ClickSubitem(item, i)}
                              name="subwriteTest">
                              { "Update"}
                            </button>
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