import Link from "next/link";
const AuthErrorPage = () => {
  return (
    <div className=" text-3xl text-center flex flex-col h-screen justify-center p-6 gap-6 items-center">
      <h1 className="text-red-600 text-5xl uppercase">Auth Error</h1>
      <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
        There was an error with authentication.
      </p>
      <p className="w-1/2 text-justify">
        Access to the application is restricted to a few domains only, please
        choose another account or if you do not have an account in one of the
        correct domains, contact the owner{" "}
        <Link
          href="mailto:maleszewski.geo@gmail.com"
          className="text-blue-500 hover:underline"
        >
          send email
        </Link>
      </p>
      <Link
        href="/"
        className="flex items-center justify-center gap-2 text-blue-700 hover:text-blue-500 hover:underline"
      >
        Back to Home
        <svg
          width="50px"
          height="50px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.00002 15.3802H13.92C15.62 15.3802 17 14.0002 17 12.3002C17 10.6002 15.62 9.22021 13.92 9.22021H7.15002"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.57 10.7701L7 9.19012L8.57 7.62012"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
};

export default AuthErrorPage;
