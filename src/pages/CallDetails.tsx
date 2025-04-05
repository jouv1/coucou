
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Calendar, Clock, Heart, MessageSquare, Check, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

// Mock data for a single call
const mockCallData = {
  id: "1",
  date: "Today, 9:15 AM",
  duration: "4m 32s",
  status: "Done",
  transcript: "AI: Good morning Mary, how are you feeling today?\n\nMary: Oh, hello. I'm feeling pretty good today. Had breakfast with my neighbor Martha this morning.\n\nAI: That sounds nice. Have you taken your morning medication?\n\nMary: Yes, I've taken it already. I need to remember to buy groceries later though.\n\nAI: I'll make a note of that. How did you sleep last night?\n\nMary: Not too bad, woke up once or twice but got back to sleep okay.\n\nAI: That's good to hear. Do you have any plans for today?\n\nMary: Just going to watch my program, and then maybe go for a short walk if the weather's nice. Oh, and I need to schedule that doctor visit.",
  sentiment: "Positive",
  summary: "Mary is feeling good today. She had breakfast with her neighbor Martha and has taken her morning medication. She needs to buy groceries and schedule a doctor's appointment. She slept reasonably well and plans to watch TV and go for a walk.",
  todos: [
    { id: "1", text: "Buy groceries", completed: false },
    { id: "2", text: "Schedule doctor visit", completed: false },
  ],
};

const CallDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [todos, setTodos] = useState(mockCallData.todos);
  const [newTodo, setNewTodo] = useState("");

  // Function to toggle todo completion
  const toggleTodo = (todoId: string) => {
    setTodos(todos.map(todo => 
      todo.id === todoId 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  // Function to add a new todo
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false
      }]);
      setNewTodo("");
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo();
  };

  return (
    <div className="py-6 animate-fade-in space-y-4">
      <div>
        <Link to="/calls" className="inline-flex items-center text-lovable-600 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to calls
        </Link>
        <h1 className="text-2xl font-semibold text-lovable-800 mb-1">Call Details</h1>
        <div className="flex items-center gap-2">
          <p className="text-gray-600">{mockCallData.date}</p>
          <Badge className="bg-green-100 text-green-800">
            {mockCallData.status}
          </Badge>
        </div>
      </div>
      
      {/* Call Summary Card */}
      <Card className="border-lovable-100">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-lovable-500" />
            <CardTitle className="text-lg font-medium">Call Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{mockCallData.summary}</p>
        </CardContent>
      </Card>
      
      {/* To-Do List Card */}
      <Card className="border-lovable-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">To-Do List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-center gap-2">
                <Checkbox 
                  id={`todo-${todo.id}`} 
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <label 
                  htmlFor={`todo-${todo.id}`}
                  className={`text-sm ${todo.completed ? 'line-through text-gray-400' : ''}`}
                >
                  {todo.text}
                </label>
              </div>
            ))}
            
            {/* Add new todo form */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 p-2 text-sm border border-gray-200 rounded"
              />
              <Button 
                type="submit"
                size="sm"
                className="bg-lovable-400 hover:bg-lovable-500"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
      
      {/* Call Transcript Card */}
      <Card className="border-lovable-100">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-lovable-500" />
              <CardTitle className="text-lg font-medium">Transcript</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Duration:</span>
              <span className="text-sm font-medium">{mockCallData.duration}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap text-sm text-gray-600 font-sans">
            {mockCallData.transcript}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallDetails;
