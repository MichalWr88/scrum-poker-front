"use client";

export function ProfileSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-blue-900 bg-opacity-30 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-blue-900">Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-cyan-600 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4">
              MK
            </div>
            <div>
              <p className="font-medium text-blue-900">Michal Kowalski</p>
              <p className="text-sm text-sky-600">user@example.com</p>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full text-left py-2 px-4 rounded-md hover:bg-sky-50 text-blue-900 font-medium">
              Profile Settings
            </button>
            <button className="w-full text-left py-2 px-4 rounded-md hover:bg-sky-50 text-blue-900 font-medium">
              Preferences
            </button>
            <button className="w-full text-left py-2 px-4 rounded-md hover:bg-sky-50 text-blue-900 font-medium">
              History
            </button>
            <hr className="my-4 border-sky-200" />
            <button className="w-full text-left py-2 px-4 rounded-md bg-red-50 text-red-600 font-medium hover:bg-red-100">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
