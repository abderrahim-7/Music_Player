import Login from "./pages/Login";
import ThemeProvider from "./context/ThemeProvider";
import Register from "./pages/Register";

function App() {
  return (
    <ThemeProvider>
      <Register />
    </ThemeProvider>
  );
}

export default App;
