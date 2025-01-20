// Spinner.tsx
export const Spinner = () => (
	<div className="loader">
		<style>{`
			.loader {
				border: 4px solid rgba(255, 255, 255, 0.3);
				border-radius: 50%;
				border-top: 4px solid #3498db;
				width: 30px;
				height: 30px;
				animation: spin 1s linear infinite;
			}

			@keyframes spin {
				0% {
					transform: rotate(0deg);
				}
				100% {
					transform: rotate(360deg);
				}
			}
		`}</style>
	</div>
);
