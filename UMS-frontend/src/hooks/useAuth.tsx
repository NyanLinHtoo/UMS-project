import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import loginService, { LoginPayload } from "../services/loginService";
import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
  user: {
    id: string;
    email: string;
    username: string;
  };
}

const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  //   const [userId, setUserId] = useState(null);
  //   const [isAuthenticated, setIsAuthenticated] = useState(false);
  //   const [isAdmin, setIsAdmin] = useState(false);
  //   const [email, setEmail] = useState("");
  //   const [newPassword, setNewPassword] = useState("");
  //   const [oldPassword, setOldPassword] = useState("");
  //   const [confirmPassword, setConfirmPassword] = useState("");
  //   const [loggedInUser, setLoggedInUser] = useState(null);
  //   const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    const userFromStorage = localStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage) : null;
    if (tokenFromStorage && user) {
      setToken(tokenFromStorage);
      //   setUserId(user.id);
      //   setLoggedInUser(user);
      //   setIsAuthenticated(true);
      //   setIsAdmin(user.type === 0);
    } else {
      setToken(null);
      //   setUserId(null);
      //   setLoggedInUser(null);
      //   setIsAuthenticated(false);
      //   setIsAdmin(false);
    }
  }, [pathname]);

  const login = (payload: LoginPayload) => {
    return loginService
      .login(payload)
      .then((res) => {
        const token = res.data.accessToken;
        localStorage.setItem("token", token);
        setToken(token);

        const userDetail = jwtDecode<CustomJwtPayload>(token);
        console.log("=======User Detail========");
        console.log(userDetail);

        const user = {
          id: userDetail.user.id,
          email: userDetail.user.email,
        };

        localStorage.setItem("user", JSON.stringify(user));
        // setUserId(user.id);
        // setLoggedInUser(user);
        // setIsAuthenticated(true);
        // setIsAdmin(user.type === 0);

        return user;
      })
      .catch((err) => {
        // setIsAuthenticated(false);
        // setIsAdmin(false);
        throw err;
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
  };

  return {
    token,
    // isAuthenticated,
    // isAdmin,
    // userId,
    // loggedInUser,
    logout,
    login,
  };
};

export default useAuth;
