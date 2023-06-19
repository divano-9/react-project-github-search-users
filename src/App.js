import React from "react";
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthWrapper>
      <Router>
        {/* routs selects first element that maches the path */}
        <Routes>
          <Route
            path="/"
            // Dashboard is wrapperd in PrivateRoute,therefore it is its child
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Error />} />{" "}
          {/* path="/*", if the path is anything else than "/" and "/login", than render error component */}
        </Routes>
      </Router>
    </AuthWrapper>
  );
}

export default App;
