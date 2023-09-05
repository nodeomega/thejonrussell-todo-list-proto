import { AppProps } from "next/app"

type Props = {
  data: any
}

 const ToDoList: React.FC<Props> = ({ data }) => {
  
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