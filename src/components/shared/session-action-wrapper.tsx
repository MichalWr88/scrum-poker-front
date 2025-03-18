"use server";
import { signIn, auth, signOut } from "@/auth";
import ProfileSidebarActionButton from "./profile-sidebar-action-button";

export async function authGoogle() {
  "use server";
  await signIn("google", { callbackUrl: "/app" });
}

export async function signOutWithGoogle() {
  "use server";
  await signOut();
}

export default async function SessionActionWrapper() {
  const session = await auth();
  console.log(session);

  if (session?.user) {
    return (
      <form action={signOutWithGoogle}>
        <div className="flex items-center space-x-4">
          <ProfileSidebarActionButton user={session.user} />
          <button
            type="submit"
            className="select-none bg-orange-500 border border-transparent rounded-md px-4 py-2 cursor-pointer text-white font-medium hover:bg-orange-600 transition-colors"
          >
            Sign out
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <form action={authGoogle}>
        <button
          type="submit"
          className="
            select-none 
            appearance-none 
            bg-[#e3e3e3] 
            border 
            border-[#8e918f] 
            rounded-[20px] 
            text-blue-900 
            cursor-pointer 
            text-[14px] 
            h-10 
            px-3 
            relative 
            text-center 
            transition-colors duration-200
            max-w-[400px]
            min-w-min
            hover:shadow-xl focus:shadow-xl
          "
        >
          {/* Button state layer (for hover/focus effects) */}
          <div className="absolute inset-0 transition-opacity duration-200 opacity-0 hover:opacity-10"></div>
          <div className="flex flex-row items-center justify-center w-full h-full space-x-3">
            {/* Google Icon */}
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-5 w-5"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              ></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            <span className="font-medium overflow-hidden text-ellipsis whitespace-nowrap">
              Sign in with Google
            </span>
          </div>
          <span className="sr-only">Sign in with Google</span>
        </button>
      </form>
    );
  }
}
