import React from "react";
import "./index.css";
import App from "./App";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright c "}
      fsoftwareengineer, {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class AppRouter extends React.Component {
  render() {
    return (
      <div>

        <Router>
          <div>
            <Routes>
              <Route path="/" exact={true} element={<App/>} />
              <Route path="/login" element={<Login/>} />
            </Routes>
          </div>
        </Router>

        <Box mt={5}>
          <Copyright />
        </Box>

      </div>
    );
  }
}

export default AppRouter;
