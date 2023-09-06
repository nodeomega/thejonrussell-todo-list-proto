import ShopifyToDoItemList from "@/app/models/shopify-todo-item-list";
import ToDoItem from "@/app/models/todo-item";
import React from "react";
import {PUT as UpdateListing} from '@/app/api/staticdata/route';

type Props = {
  data: any
}

const ToDoList: React.FC<Props> = ({ data }) => { 
  //const [isSelected, setIsSelected] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);

  const [todoItems, setTodoItems] = React.useState<ShopifyToDoItemList>({tasks: data.tasks});

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
    <main>
      <div>
        {"placeholder text"}
      </div>
      <div>
        <h1>
          {"To-Do Prototype - Shopify Store Tasks"}
        </h1>
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
                <ul className="flex gap-2">
                  <li>{item.name}</li>
                  <li>
                    <input
                      type="checkbox"
                      name="completed"
                      id={item.name}
                      checked={item.completed}
                      readOnly={item.completed}
                      className="rounded"
                      />                    
                  </li>
                  <li>
                    <button
                      className="bg-fuchsia-950 hover:bg-cyan-600 accent-pink-500 rounded-full px-2"
                      onClick={() => setIsClicked(true)}
                      name="writeTest">
                      {isClicked ? "Yay!" : "Click" }
                    </button>
                  </li>
                  {item.subtasks && (item.subtasks as ToDoItem[]).map((i: any, ind: number) => {
                    return (
                      <li key={ind}>
                        <ul>                          
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
                          </li>
                          <li>
                            <button
                              className="bg-red-950 hover:bg-blue-600 rounded-full px-2"
                              onClick={() => ClickSubitem(item, i)}
                              name="subwriteTest">
                              {isClicked ? "Yay!" : "Click" }
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
    </main>
  )
  }

export default ToDoList