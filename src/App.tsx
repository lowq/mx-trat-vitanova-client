import "./App.css";
import Layout from "./components/layout/Layout";
import Main from "./components/main/Main";
import UserContext from "./constans/userContext";
import { useContext, useEffect, useRef } from "react";
import { genConfig, AvatarFullConfig } from "react-nice-avatar";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import { UserInfo } from "./models/profileModels";

function App() {
  const targetDivRef = useRef<HTMLDivElement>(null);

  const [cookies] = useCookies(["token"]);

  const userContext = useContext(UserContext);

  useEffect(() => {
    if (cookies.token) {
      const decoded: any = jwt_decode(cookies.token);
      axios
        .get(`http://localhost:8111/auth/role/${decoded.name}`, {
          headers: {
            "Content-type": "application/json; charset=utf-8",
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((response) => {
          if (response.status === 200 && response.data.status === true) {
            const avatarConfig: AvatarFullConfig = genConfig(decoded.email);
            userContext.login(
              cookies.token,
              decoded.name,
              avatarConfig,
              response.data.data
            );
          } else {
            const avatarConfig: AvatarFullConfig = genConfig(decoded.email);
            userContext.login(
              cookies.token,
              decoded.name,
              avatarConfig,
              decoded.role
            );
          }
        });
      axios
        .get(
          `http://localhost:8111/profile/userInfo/${decoded.name}/${decoded.email}`,
          {
            headers: {
              "Content-type": "application/json; charset=utf-8",
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200 && response.data.status === true) {
            userContext.setUserInfo(response.data.data.UserInfo);
          } else {
            userContext.setUserInfo({} as UserInfo);
          }
        });
    }
  }, [cookies.token]);

  return (
    <>
      <Router>
        <div ref={targetDivRef} id="Domov">
          <Layout>
            <Routes>
              <Route path="/" element={<Main />} />
              {userContext && userContext.role === "ADMIN" && (
                <Route path="/admin" element={<Admin />} />
              )}
            </Routes>
          </Layout>
        </div>
      </Router>
    </>
  );
}

export default App;
