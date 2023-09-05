import React from "react";

type Props = {
  data: any
}

const ToDoList: React.FC<Props> = ({ data }) => { 
  //const [isSelected, setIsSelected] = React.useState(false);
  
  return (
    <main>
      <div>
        {"placeholder text"}
      </div>
      <div>
        <h1>To-Do Prototype</h1>
        <ul>
          {data.items.map((item: any) => {
            return (
              <li key={item.name}>
                <ul className="flex gap-2">
                  <li>{item.name}</li>
                  <li>
                    <input
                      type="checkbox"
                      value={item.done}
                      name="completed"
                      id={item.name}
                      checked={item.done}
                      className="rounded"
                      />                    
                  </li>
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