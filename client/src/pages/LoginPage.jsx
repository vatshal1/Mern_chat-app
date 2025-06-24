import { useContext, useState } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

function LoginPage() {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDatasubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  function onSubmitHandler(event) {
    event.preventDefault();

    if (currState === "Sign up" && !isDatasubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currState === "Sign up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  }

  return (
    <>
      {/* //->left */}
      <div className="min-h-screen bg-cove bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
        <img src={assets.logo_big} alt="" />

        <form
          onSubmit={(e) => onSubmitHandler(e)}
          className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
        >
          <h2 className="font-medium text-2xl flex justify-between items-center">
            {currState}
            {isDatasubmitted && (
              <img
                src={assets.arrow_icon}
                alt=""
                onClick={() => {
                  setIsDataSubmitted(false);
                }}
                className="w-5 cursor-pointer"
              />
            )}
          </h2>

          {currState === "Sign up" && !isDatasubmitted && (
            <input
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              placeholder="Full Name"
              className="p-2 border border-gray-500 rounded-md focus:outline-none"
              required
            />
          )}

          {!isDatasubmitted && (
            <>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter the email Address"
                className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter the password"
                className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </>
          )}

          {currState === "Sign up" && isDatasubmitted && (
            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              rows={4}
              placeholder="Provide a short bio..."
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          )}

          <button
            type="submit"
            className="py-3 bg-gradient-to-r from-purple-400 to-voilet-600 text-white rounded-md cursor-pointer"
          >
            {currState === "Sign up" ? "Create Account" : "Login Now"}
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <input type="checkbox" />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>

          <div>
            {currState === "Sign up" ? (
              <p className="text-sm text-gray-600">
                Already have an account?
                <span
                  onClick={() => {
                    setCurrState("Login");
                    setIsDataSubmitted(false);
                  }}
                  className="font-medium text-violet-500 cursor-pointer"
                >
                  {" "}
                  Login here
                </span>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Create an Account
                <span
                  onClick={() => setCurrState("Sign up")}
                  className="font-medium text-violet-500 cursor-pointer"
                >
                  {" "}
                  Click here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
export default LoginPage;
