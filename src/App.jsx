import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Television from "./pages/Television";
import Bookmarked from "./pages/Bookmarked";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NavBar from "./components/ui/Navbar/Navbar";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();

const ClerkProviderWithRoutes = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <QueryClientProvider client={queryClient}>
        <div className="content-wrapper">
          <NavBar />
          <main className="container">
            <Routes>
              <Route index element={<Home />} />
              <Route path="movies" element={<Movies />} />
              <Route path="television" element={<Television />} />
              <Route path="bookmarked" element={<Bookmarked />} />
              <Route path="signin" element={<Signin />} />
              <Route path="signup" element={<Signup />} />
            </Routes>
          </main>
        </div>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </ClerkProvider>
  );
};

function App() {
  return (
    <>
      <Router>
        <ClerkProviderWithRoutes />
      </Router>
    </>
  );
}

export default App;
