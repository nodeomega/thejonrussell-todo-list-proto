type Props = {
  data: any
}

const ToDoList: React.FC<Props> = ({ data }) => {  
  console.log(data);
  console.log(data.record);
  return (
    <main>
      <div>
        {"placeholder text"}
      </div>
      <div>
        <h1>My Framework from file</h1>
        <ul>
          <li>Name: {data.record.name}</li>
          <li>Language: {data.record.language}</li>
        </ul>
      </div>
    </main>
  )
  }

export default ToDoList