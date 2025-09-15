import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth/operations";
import type { AppDispatch } from "../redux/store";

export interface MainLayoutPageProps {}

export default function MainLayoutPage({ }: MainLayoutPageProps) {
  const dispatch = useDispatch<AppDispatch>();
  
  return (
    <div>
      <p>MainLayoutPage</p>
      <button type="button" onClick={()=>dispatch(logOut())}>Logout</button>
    </div>
  );
};
