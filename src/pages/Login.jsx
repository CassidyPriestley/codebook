import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTitle } from "../hooks/useTitle";
import { login } from "../services";

export const Login = () => {
  useTitle("Login");
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const authDetail = {
        email: email.current.value,
        password: password.current.value,
      };
      const data = await login(authDetail);
      data.accessToken ? navigate("/products") : toast.error(data);
    } catch (error) {
      toast.error("Incorrect Login Information", {
        autoClose: 5000,
        closeOnClick: true,
      });
    }
  }

  async function handleLoginGuest() {
    email.current.value = "cassidy@example.com";
    password.current.value = "learnreact";
    try {
      const authDetail = {
        email: email.current.value,
        password: password.current.value,
      };
      const data = await login(authDetail);
      data.accessToken ? navigate("/products") : toast.error(data);
    } catch (error) {
      toast.error("Incorrect Login Information", {
        autoClose: 5000,
        closeOnClick: true,
      });
    }
  }

  return (
    <main>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
          Login
        </p>
      </section>
      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            ref={email}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="youremail@example.com"
            required
            autoComplete="off"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your password
          </label>
          <input
            ref={password}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-md font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Log In
          </span>
        </button>
      </form>
      <Link
        onClick={handleLoginGuest}
        className="mt-3 cursor-pointer text-black underline underline-offset-1 hover:text-blue-700 font-medium text-md w-full sm:w-auto px-1 text-center dark:text-white dark:hover:text-blue-700"
      >
        Login As Guest
      </Link>
    </main>
  );
};
