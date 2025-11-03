import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";
import Loading from "../Loading/Loading";

export default function LoadingWrapper() {
  const { loading } = useContext(LoadingContext);
  return loading ? <Loading /> : null;
}
