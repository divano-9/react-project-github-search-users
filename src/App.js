import React from "react";
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* routs selects first element that maches the path */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Error />} />{" "}
        {/* path="/*", if the path is anything else than "/" and "/login", than render error component */}
      </Routes>
    </Router>
  );
}

export default App;
