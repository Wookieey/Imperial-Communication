import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Users, MessageSquare, Cpu } from "lucide-react";

// Admin Dashboard Layout
export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Imperial Control</h1>
        <nav className="flex flex-col gap-4 text-lg">
          <a className="hover:text-blue-600 cursor-pointer">Dashboard</a>
          <a className="hover:text-blue-600 cursor-pointer">Users</a>
          <a className="hover:text-blue-600 cursor-pointer">Rooms</a>
          <a className="hover:text-blue-600 cursor-pointer">Messages</a>
          <a className="hover:text-blue-600 cursor-pointer">System Logs</a>
          <a className="hover:text-blue-600 cursor-pointer">Emperor AI</a>
          <a className="hover:text-blue-600 cursor-pointer">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-semibold mb-8">Dashboard Overview</h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* System Status */}
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 flex items-center gap-4">
              <Cpu size={40} />
              <div>
                <h3 className="text-xl font-bold">System Status</h3>
                <p className="text-gray-600">All systems operational</p>
              </div>
            </CardContent>
          </Card>

          {/* User Activity */}
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 flex items-center gap-4">
              <Users size={40} />
              <div>
                <h3 className="text-xl font-bold">User Activity</h3>
                <p className="text-gray-600">124 online users</p>
              </div>
            </CardContent>
          </Card>

          {/* Message Feed */}
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 flex items-center gap-4">
              <MessageSquare size={40} />
              <div>
                <h3 className="text-xl font-bold">Recent Messages</h3>
                <p className="text-gray-600">Live feed from all rooms</p>
              </div>
            </CardContent>
          </Card>

          {/* Room Activity */}
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 flex items-center gap-4">
              <BarChart3 size={40} />
              <div>
                <h3 className="text-xl font-bold">Room Activity</h3>
                <p className="text-gray-600">Trending discussions active</p>
              </div>
            </CardContent>
          </Card>

          {/* Emperor AI Activity */}
          <Card className="rounded-2xl shadow-md col-span-1 md:col-span-2 xl:col-span-3">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-2">Emperor AI Activity</h3>
              <p className="text-gray-600">Recent decisions, flags, and interactions will display here.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
