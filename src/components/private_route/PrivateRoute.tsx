import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { UserInterfaces } from "../../utils/interfaces/UserInterfaces";

interface PrivateRouteProps {
  path: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const user = useAuth();
  const [userData, setUserData] = useState<UserInterfaces | null>(null);
  useEffect(() => {
    if (user) {
      const getUserData = async () => {
        const result = await getDoc(doc(db, "users", user?.uid));

        setUserData({ id: user?.uid!, type: result.data()!.type });
      };
      getUserData();
    }
  }, []);
  if (props.path === "/account-info" || props.path === "/messages")
    return user ? <Outlet /> : <Navigate to="/login" />;
  else if (userData)
    if (props.path === "/create-offer" || props.path === "/add-company" || props.path === "/manage-offers") {
      console.log("haideeeee " + userData?.type);
      return userData?.type === "employer" ? (
        <Outlet />
      ) : (
        <Navigate to="/dashboard" />
      );
    } else return <h3>Loading...</h3>;
  return null;
};