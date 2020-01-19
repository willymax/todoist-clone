import { collatedTask } from '../constants'
export const collatedTasksExist = selectedProject => 
collatedTask.find(task => task.key === selectedProject)