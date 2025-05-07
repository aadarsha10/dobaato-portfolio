import * as React from "react";
import { cn } from "../../utils";

const Card = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
	const [isHovered, setIsHovered] = React.useState(false);
	const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

	// Handle mouse movement
	const handleMouseMove = (e: React.MouseEvent) => {
		const rect = (e.target as HTMLDivElement).getBoundingClientRect();
		setMousePos({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		});
	};

	return (
		<div
			ref={ref}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onMouseMove={handleMouseMove}
			className={cn(
				"relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm",
				className
			)}
			{...props}
		>
			{/* 🎈 Colorful Bubbles */}
			{[
				{
					top: "top-4",
					left: "left-6",
					size: "w-8 h-8",
					color: "bg-pink-400",
				},
				{
					top: "top-12",
					right: "right-6",
					size: "w-6 h-6",
					color: "bg-yellow-400",
				},
				{
					top: "top-1/2",
					left: "left-1/4",
					size: "w-10 h-10",
					color: "bg-blue-400",
				},
				{
					bottom: "bottom-8",
					left: "left-4",
					size: "w-7 h-7",
					color: "bg-purple-400",
				},
				{
					bottom: "bottom-10",
					right: "right-4",
					size: "w-8 h-8",
					color: "bg-green-400",
				},
			].map((bubble, i) => (
				<span
					key={i}
					className={cn(
						"absolute rounded-full pointer-events-none transition-opacity duration-300 ease-in-out blur-sm",
						bubble.top,
						bubble.bottom,
						bubble.left,
						bubble.right,
						bubble.size,
						bubble.color
					)}
					style={{
						opacity: isHovered ? 0.4 : 0.2,
						transform: isHovered
							? `translate(${mousePos.x / 20}px, ${
									mousePos.y / 20
							  }px)`
							: "translate(0px, 0px)",
						transition: "transform 0.3s ease, opacity 0.3s ease",
					}}
				/>
			))}

			{/* Actual Card Content */}
			<div className="relative z-10">{children}</div>
		</div>
	);
});

Card.displayName = "Card";

const CardHeader = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex flex-col space-y-1.5 p-6", className)}
		{...props}
	/>
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"text-2xl font-semibold leading-none tracking-tight",
			className
		)}
		{...props}
	/>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center p-6 pt-0", className)}
		{...props}
	/>
));
CardFooter.displayName = "CardFooter";

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
};
