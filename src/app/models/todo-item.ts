export default interface ToDoItem {
  name: string,
  completed: boolean | undefined,
  subtasks: ToDoItem[] | undefined | null
}