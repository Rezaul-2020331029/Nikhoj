import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app.tsx";
import "@/lib/extensions.ts";

import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
