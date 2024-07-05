import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, ModalTrigger } from "@/components/ui/modal";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const Index = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1", dueDate: new Date(), priority: "High", completed: false },
    { id: 2, name: "Task 2", dueDate: new Date(), priority: "Medium", completed: false },
  ]);

  const [newTask, setNewTask] = useState({ name: "", dueDate: new Date(), priority: "Low" });

  const addTask = () => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1, completed: false }]);
    setNewTask({ name: "", dueDate: new Date(), priority: "Low" });
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center space-x-4">
                <Checkbox checked={task.completed} onCheckedChange={() => toggleTaskCompletion(task.id)} />
                <div className="flex-1">
                  <Label>{task.name}</Label>
                  <p className="text-sm text-muted-foreground">{format(task.dueDate, "PPP")}</p>
                </div>
                <span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Input
              placeholder="Add a new task"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            />
            <div className="flex space-x-2 mt-2">
              <Select onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              <Calendar
                mode="single"
                selected={newTask.dueDate}
                onSelect={(date) => setNewTask({ ...newTask, dueDate: date })}
              />
            </div>
            <Button onClick={addTask} className="mt-2">Add Task</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;