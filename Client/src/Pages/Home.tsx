import { useState } from "react";
import AllTodos from "@/Components/AllTodos";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { BadgeCheck, Loader2 } from "lucide-react";
import { createTodo } from "@/Services/todoService";

const Home = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!title) {
      setError("Please enter a title.");
      setLoading(false);
      return;
    }

    try {
      const response = await createTodo(title, description);
      if (!response.success) {
        setError(response.message);
        return;
      }

      setTitle("");
      setDescription("");
      setError(null);
      setEditDialogOpen(false); // Close dialog after success
    } catch (err) {
      setError("Failed to create todo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to your Todo App</h1>

      <Button
        variant="outline"
        onClick={() => setEditDialogOpen(true)}
        className="flex items-center gap-2 py-4"
      >
        <BadgeCheck size={16} />
        Create Todo
      </Button>

      <AllTodos />

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new todo</DialogTitle>
            <DialogDescription>
              Enter the title and description for your todo.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter title"
                className="col-span-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                type="text"
                placeholder="Enter description"
                className="col-span-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm col-span-4 text-center">
                {error}
              </p>
            )}

            <DialogFooter>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Todo"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
