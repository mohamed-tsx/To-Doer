import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { RegisterUser } from "@/Services/authServices";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  // State to track user input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [seed, setSeed] = useState("nwq");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Memoize the avatar generation based on the username
  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      size: 128,
      seed, // Use the username as the seed for unique avatars
    }).toDataUri();
  }, [seed]); // Re-run when username changes

  // Regenerate the avatar when the button is clicked
  const regenerateAvatar = () => {
    // Updating the username state to trigger a new avatar generation
    const newUsername = `new-seed-${Math.random()}`;
    setSeed(newUsername);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);

    console.log({ username, name, email, password, avatar });

    try {
      //   // Send the form data (username, email, password, name, avatarUrl) to the backend
      const userData = await RegisterUser({
        username,
        email,
        password,
        name,
        avatar,
      });

      if (!userData.success) {
        toast.error(userData.message);
        return;
      }

      toast.success(userData.message);
      navigate("/login"); // Redirect to homepage or another page
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
        <h1 className="text-2xl font-semibold">Register a new account</h1>
        <p className="text-muted-foreground text-sm">
          Enter your details below to create an account.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div>
          {/* Display the generated avatar */}
          <img src={avatar} alt="Avatar" />
        </div>

        {/* Error Message Display */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
        <Button
          type="button"
          className="w-full mt-2"
          onClick={regenerateAvatar}
        >
          Regenerate Avatar
        </Button>
      </div>
    </form>
  );
}
