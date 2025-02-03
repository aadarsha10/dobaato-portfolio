import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../SupabaseClient";
import { Spinner } from "../../components/ui/spinner";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(false);
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email: username,
			password,
		});
		if (error) {
			toast.error(error.message);
			setLoading(false);
			return;
		} else {
			toast.success("Login successful!");
			navigate("/admin");
			setLoading(false);
		}
		setLoading(false);
	};

	return (
		<div className="flex items-center justify-center min-h-screen ">
			<form
				onSubmit={handleSubmit}
				className="bg-dark-700 p-6 rounded shadow-md space-y-4 border"
			>
				<h2 className="text-xl font-bold">Admin Login</h2>
				<div>
					<label className="block mb-1">Username</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full px-3 py-2 rounded text-gray-800"
						placeholder="Enter username"
						required
					/>
				</div>
				<div>
					<label className="block mb-1">Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-3 py-2 rounded text-gray-800"
						placeholder="Enter password"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
				>
					{loading ? <Spinner /> : "Login"}
				</button>
			</form>
		</div>
	);
}
