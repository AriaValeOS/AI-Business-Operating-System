export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-zinc-900 border-r border-zinc-800 p-6">
  <div className="mb-10">
  <h2 className="text-2xl font-bold">
    🚀 Aria OS
  </h2>

  <p className="text-xs text-zinc-500 mt-1">
    AI Business Operating System
  </p>
</div>

      <nav className="space-y-4">

       <div className="bg-blue-600 rounded-xl px-4 py-3 font-semibold">
  🏠 Command Center
</div>

        <p>👩 Aria</p>

        <p>🧠 Brain</p>

        <p>🖼 Media</p>

        <p>📝 Content</p>

        <p>📅 Calendar</p>

        <p>📊 Analytics</p>

        <p>⚙ Automation</p>

        <p>🛍 Store</p>

        <p>📢 Marketing</p>

        <p>⚙ Settings</p>

      </nav>
    </aside>
  );
}