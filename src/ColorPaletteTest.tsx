const colors = [
	{ name: "bg-dark", value: "var(--bg-dark)" },
	{ name: "bg", value: "hsl(330 0% 4%)" },
	{ name: "bg-light", value: "hsl(0 0% 9%)" },
	{ name: "text", value: "hsl(0 0% 95%)" },
	{ name: "text-muted", value: "hsl(300 0% 69%)" },
	{ name: "highlight", value: "hsl(330 0% 39%)" },
	{ name: "border", value: "hsl(0 0% 28%)" },
	{ name: "border-muted", value: "hsl(300 0% 18%)" },
	{ name: "primary", value: "hsl(34 60% 63%)" },
	{ name: "secondary", value: "hsl(212 77% 72%)" },
	{ name: "danger", value: "hsl(9 26% 64%)" },
	{ name: "warning", value: "hsl(52 19% 57%)" },
	{ name: "success", value: "hsl(146 17% 59%)" },
	{ name: "info", value: "hsl(217 28% 65%)" },
];

const ColorPaletteTest = () => {
	return (
		<div className="min-h-screen bg-bg text-text p-8">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold mb-8 text-center">
					Color Palette Test
				</h1>

				{/* Color Swatches */}
				<div className="mb-12">
					<h2 className="text-2xl font-semibold mb-4">Color Swatches</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{colors.map((color) => (
							<div
								key={color.name}
								className="border border-border rounded-lg p-4"
							>
								<h3 className="text-lg font-medium mb-2">
									--color-{color.name}
								</h3>
								<div className="space-y-2">
									<div>
										<p className="text-sm text-text-muted">Background</p>
										<div className={`h-16 w-full bg-${color.name} rounded`} />
									</div>
									<div>
										<p className="text-sm text-text-muted">Text</p>
										<p className={`text-${color.name} bg-bg-light p-2 rounded`}>
											{color.value}
										</p>
									</div>
									<div>
										<p className="text-sm text-text-muted">Border</p>
										<div
											className={`h-16 w-full border-4 border-${color.name} rounded`}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Sample UI Elements */}
				<div className="mb-12">
					<h2 className="text-2xl font-semibold mb-4">Sample UI Elements</h2>
					<div className="space-y-6">
						{/* Buttons */}
						<div>
							<h3 className="text-lg font-medium mb-2">Buttons</h3>
							<div className="flex flex-wrap gap-4">
								<button className="bg-primary text-bg-dark px-4 py-2 rounded hover:bg-opacity-80">
									Primary
								</button>
								<button className="bg-secondary text-bg-dark px-4 py-2 rounded hover:bg-opacity-80">
									Secondary
								</button>
								<button className="bg-danger text-bg-dark px-4 py-2 rounded hover:bg-opacity-80">
									Danger
								</button>
								<button className="bg-warning text-bg-dark px-4 py-2 rounded hover:bg-opacity-80">
									Warning
								</button>
								<button className="bg-success text-bg-dark px-4 py-2 rounded hover:bg-opacity-80">
									Success
								</button>
								<button className="bg-info text-bg-dark px-4 py-2 rounded hover:bg-opacity-80">
									Info
								</button>
							</div>
						</div>

						{/* Card */}
						<div>
							<h3 className="text-lg font-medium mb-2">Card</h3>
							<div className="bg-bg-light border border-border rounded-lg p-6 max-w-md">
								<h4 className="text-xl font-poppins-semibold text-text">
									Sample Card
								</h4>
								<p className="text-text-muted mt-2">
									This is a sample card using the muted text color and light
									background.
								</p>
								<button className="mt-4 bg-primary text-bg-dark px-4 py-2 rounded">
									Action
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Dark Mode Preview */}
				<div className="dark bg-bg-dark p-8 rounded-lg">
					<h2 className="text-2xl font-semibold mb-4">Dark Mode Preview</h2>
					<div className="space-y-6">
						<div className="flex flex-wrap gap-4">
							<button className="dark:bg-primary text-bg-dark px-4 py-2 rounded hover:bg-opacity-80">
								Primary
							</button>
							<button className="bg-secondary text-bg-dark px-4 py-2 rounded hover:bg-opacity-80">
								Secondary
							</button>
						</div>
						<div className="bg-bg-light border border-border-muted rounded-lg p-6 max-w-md">
							<h4 className="text-xl font-semibold text-text">
								Dark Mode Card
							</h4>
							<p className="text-text-muted mt-2">
								This card uses muted border and light background in dark mode.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ColorPaletteTest;
