import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TermsAndCondModal from "./Terms&CondModal";

export default function SignIn() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const openModal = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const signUpHandler = () => {
    navigate("/success");
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2 mb-3">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="flex items-center mb-3">
            <input
              id="default-checkbox"
              type="checkbox"
              checked={isTermsAgreed}
              onChange={() => { }}
              className="w-4 h-4 cursor-pointer rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium leading-6 text-gray-900 cursor-pointer">By signup you agree to <span className="text-indigo-600" onClick={(e) => {
              !isTermsAgreed && openModal(e);
            }}>Terms {'&'} Conditions</span></label>
          </div>

          <div className="mb-4">
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={!isTermsAgreed || !email || !password}
              onClick={signUpHandler}
            >
              Sign up
            </button>
          </div>
        </div>
        <div className="text-center">
          Code on {" "}
          <a
            className="text-indigo-600"
            href="https://github.com/angshumanHalder/ula-forced"
            rel="noopener noreferrer"
            target="_blank" >
            github
          </a>
          {" "}
          &#128513;
        </div>
      </div>
      {isOpen && <TermsAndCondModal
        open={isOpen}
        onClose={closeModal}
        agreementHandler={setIsTermsAgreed}
      />}
    </>
  )
}
