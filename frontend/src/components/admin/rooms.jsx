import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Lock, Globe } from "lucide-react";

export default function RoomsManagement() {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState("");
  const [accessLevel, setAccessLevel] = useState("public");

  // Placeholder fetch simulation
  useEffect(() => {
    const mockRooms = [
      { id: 1, name: "Throne Room", access: "restricted" },
      { id: 2, name: "War Council", access: "restricted" },
      { id: 3, name: "Marketplace", access: "public" },
    ];
    setRooms(mockRooms);
  }, []);

  const handleCreateRoom = () => {
    if (!newRoom.trim()) return;
    const room = {
      id: Date.now(),
      name: newRoom,
      access: accessLevel,
    };
    setRooms([...rooms, room]);
    setNewRoom("");
  };

  const deleteRoom = (id) => {
    setRooms(rooms.filter((r) => r.id !== id));
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-semibold mb-8">Rooms Management</h2>

      {/* Create Room */}
      <Card className="rounded-2xl shadow-md mb-8">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-2xl font-bold">Create New Room</h3>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Input
              placeholder="Room name"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
              className="max-w-sm"
            />

            <select
              className="border rounded-lg p-2"
              value={accessLevel}
              onChange={(e) => setAccessLevel(e.target.value)}
            >
              <option value="public">Public</option>
              <option value="restricted">Restricted</option>
            </select>

            <Button onClick={handleCreateRoom} className="flex items-center gap-2">
              <Plus size={18} /> Create Room
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Rooms List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="rounded-2xl shadow-md">
            <CardContent className="p-6 space-y-3">
              <h3 className="text-xl font-bold flex items-center gap-2">
                {room.access === "restricted" ? (
                  <Lock size={20} />
                ) : (
                  <Globe size={20} />
                )}
                {room.name}
              </h3>

              <p className="text-gray-600">Access: {room.access}</p>

              <Button
                variant="destructive"
                className="flex items-center gap-2"
                onClick={() => deleteRoom(room.id)}
              >
                <Trash2 size={18} /> Delete Room
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
