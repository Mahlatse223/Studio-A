// components/Sidebar.tsx
'use client'

export default function Sidebar() {
  return (
    <div className="w-80 bg-gray-800 text-white h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Studio Apartments</h2>
      <ul className="items-center justify-center">
        <li className="mb-4 hover:bg-gray-700 p-2 rounded">
          <a href="#">Dashboard</a>
        </li>
        <li className="mb-4 hover:bg-gray-700 p-2 rounded">
          <a href="/settings">Settings</a>
        </li>
        <li className="mb-4 hover:bg-gray-700 p-2 rounded">
          <a href="/profile">Profile</a>
        </li>
        <li className="mb-4 hover:bg-gray-700 p-2 rounded">
          <a href="/logout">Logout</a>
        </li>
      </ul>
    </div>
  );
}
