import MainLayout from "./componenets/layout/MainLayout";
import ProtectedRoute from "./routes/ProtectedRouter";

function App() {
  return (
    <ProtectedRoute>
     
      <MainLayout />
    </ProtectedRoute>
  );
}

export default App;
