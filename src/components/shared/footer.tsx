export function Footer() {
  return (
    <footer className="bg-sky-100 border-t border-sky-200 py-3">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center text-xs text-blue-900">
        <div>
          <span>© 2023 Scrum Poker App</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Version: 1.0.0</span>
          <span>Created by: Michal Kowalski</span>
        </div>
      </div>
    </footer>
  );
}
