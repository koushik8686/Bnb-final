import React, { useState } from "react";

function Button({ type, variant, onClick, children }) {
  const buttonStyle = variant === "ghost" ? "text-white-700 hover:text-white-900" : "bg-blue-600 text-white hover:bg-blue-700";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonStyle} px-4 py-2 rounded-md`}
    >
      {children}
    </button>
  );
}

function Input({ id, value, onChange, placeholder }) {
  return (
    <input
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
    />
  );
}

function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}

function Textarea({ id, value, onChange, placeholder }) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
    />
  );
}

function Card({ children }) {
  return <div className="border rounded-lg shadow p-6">{children}</div>;
}

function CardHeader({ children }) {
  return <div className="mb-4 border-b pb-2">{children}</div>;
}

function CardTitle({ children }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

function CardContent({ children }) {
  return <div className="mb-4">{children}</div>;
}

function CardFooter({ children }) {
  return <div className="flex justify-end">{children}</div>;
}

function RegisteredGames() {
  const [gameDetails, setGameDetails] = useState("");
  const [corporateCode, setCorporateCode] = useState("");
  const [players, setPlayers] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ gameDetails, corporateCode, players });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex justify-between items-center">
            <li>
              <a href="/teamleads/registered-games">
                <Button variant="ghost">Registered Games</Button>
              </a>
            </li>
            <li>
              <a href="/teamleads/registration-details">
                <Button variant="ghost">Registration Details</Button>
              </a>
            </li>
            <li>
              <a href="/teamleads/team-list">
                <Button variant="ghost">Team List</Button>
              </a>
            </li>
            <li>
              <a href="/teamleads/table-standing">
                <Button variant="ghost">Table Standing</Button>
              </a>
            </li>
            <li>
              <a href="/teamleads/contact">
                <Button variant="ghost">Contact</Button>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Registered Games</h1>
        <Card>
          <CardHeader>
            <CardTitle>Register New Game</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="gameDetails">Game Details</Label>
                  <Textarea
                    id="gameDetails"
                    value={gameDetails}
                    onChange={(e) => setGameDetails(e.target.value)}
                    placeholder="Enter game details..."
                  />
                </div>
                <div>
                  <Label htmlFor="corporateCode">Corporate Code</Label>
                  <Input
                    id="corporateCode"
                    value={corporateCode}
                    onChange={(e) => setCorporateCode(e.target.value)}
                    placeholder="Enter corporate code..."
                  />
                </div>
                <div>
                  <Label htmlFor="players">Players to be Participated</Label>
                  <Textarea
                    id="players"
                    value={players}
                    onChange={(e) => setPlayers(e.target.value)}
                    placeholder="Enter player names..."
                  />
                </div>
              </div>
              <CardFooter>
                <Button type="submit">Submit Registration</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default RegisteredGames;
