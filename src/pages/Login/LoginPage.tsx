import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	useEffect(() => {
		localStorage.setItem("isAuthenticated", "false");
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (username === "admin" && password === "admin") {
			navigate("/admin");
			localStorage.setItem("isAuthenticated", "true");
			toast.success("Login successful");
		}
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
					Login
				</button>
			</form>
		</div>
	);
}
