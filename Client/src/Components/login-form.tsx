import { useState } from "react";
import { cn } from "@/lib/utils";
import { Toaster, toast } from "sonner";
import { useUser } from "@/Hooks/useUser";
import { useNavigate } from "react-router";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { loginUser } from "@/Services/authServices";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  // State to track user input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { saveUserInfo } = useUser();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);

    try {
      const userData = await loginUser({ username, password });

      if (!userData.success) {
        toast.error(userData.message);
        return;
      }
      toast.success(userData.message);
      saveUserInfo(userData.user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <Toaster richColors position="top-center" />
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold">Login to your account</h1>
        <p className="text-muted-foreground text-sm">
          Enter your credentials below to log in to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Error Message Display */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
}
