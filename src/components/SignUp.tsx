import { useState } from "react";
import { supabase } from "../SupabaseClient";

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleSignUp = async () => {
		const { error } = await supabase.auth.signUp({ email, password });
		if (error) {
			setMessage(error.message);
		} else {
			setMessage(
				"Signup successful! Please check your email to confirm your account."
			);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1>Supabase Auth</h1>
			<input
				type="email"
				placeholder="Email"
				className="text-black p-2"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				className="text-black mt-3 p-2"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleSignUp}>Sign Up</button>

			{message && <p>{message}</p>}
		</div>
	);
}
