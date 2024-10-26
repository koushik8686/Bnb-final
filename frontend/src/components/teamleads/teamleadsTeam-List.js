import React from "react";

function Button({ variant, children }) {
  const buttonStyle = variant === "ghost" ? "text-white-700 hover:text-white-900" : "bg-blue-600 text-white hover:bg-blue-700";
  return (
    <button className={`${buttonStyle} px-4 py-2 rounded-md`}>
      {children}
    </button>
  );
}

function Card({ children, className }) {
  return <div className={`border rounded-lg shadow p-6 ${className}`}>{children}</div>;
}

function CardHeader({ children }) {
  return <div className="mb-4 border-b pb-2">{children}</div>;
}

function CardTitle({ children }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

function CardContent({ children }) {
  return <div className="mt-2">{children}</div>;
}

function Table({ children }) {
  return <table className="min-w-full bg-white border">{children}</table>;
}

function TableHeader({ children }) {
  return <thead className="bg-gray-200">{children}</thead>;
}

function TableRow({ children }) {
  return <tr className="border-b">{children}</tr>;
}

function TableHead({ children }) {
  return <th className="px-4 py-2 text-left font-semibold">{children}</th>;
}

function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

function TableCell({ children }) {
  return <td className="px-4 py-2 border-t">{children}</td>;
}

function TeamList() {
  const teamMembers = [
    { id: 1, name: "John Doe", role: "Forward" },
    { id: 2, name: "Jane Smith", role: "Midfielder" },
    { id: 3, name: "Bob Johnson", role: "Defender" },
  ];

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
        <h1 className="text-3xl font-bold mb-6">Team List</h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Team Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Total Team Members: {teamMembers.length}</p>
          </CardContent>
        </Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}

export default TeamList;