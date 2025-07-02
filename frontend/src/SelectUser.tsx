import React from "react";
import App from "./App";

const users = [
  { id: "1", name: "Alice Smith", age: 30 },
  { id: "2", name: "John Doe", age: 25 },
  { id: "3", name: "Jane Smith", age: 28 },
  { id: "4", name: "Alice Johnson", age: 35 },
  { id: "5", name: "Bob Brown", age: 22 },
];

export type User = {
  id: string;
  name: string;
  age: number;
};

export function SelectUser() {
  const [selectedUser, setSelectedUser] = React.useState<string | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
  };

  return (
    <div>
      <label htmlFor="user-select">Select User:</label>
      <select
        id="user-select"
        value={selectedUser || ""}
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          Select a user
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      {selectedUser && (
        <App user={users.find((user) => user.id === selectedUser)!} />
      )}
    </div>
  );
}
