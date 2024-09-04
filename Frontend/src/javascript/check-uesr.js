import { useRouter } from "vue-router";

export const checkUser = () => {
  const router = useRouter();
  const authToken = document.cookie.split("=")[1];

  if (!authToken) {
    alert("Please login first");
    router.push("/");
    return "Please login first";
  } else {
    return authToken;
  }
};
