import { RouterProvider } from "react-router-dom";
import { router } from "./routers/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InterviewItThemeProvider } from "./contexts/InterviewItProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InterviewItThemeProvider>
        <RouterProvider router={router} />
      </InterviewItThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
