import React from "react";

function Button({ variant, children }) {
  const buttonStyle = variant === "ghost" ? "text-white-700 hover:text-white-900" : "bg-blue-600 text-white hover:bg-blue-700";
  return (
    <button className={`${buttonStyle} px-4 py-2 rounded-md`}>
      {children}
    </button>
  );
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

function TableStanding() {
  const standings = [
    { id: 1, corporateCode: "CORP123", points: 15 },
    { id: 2, corporateCode: "CORP456", points: 12 },
    { id: 3, corporateCode: "CORP789", points: 9 },
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
        <h1 className="text-3xl font-bold mb-6">Table Standing</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Corporate Code</TableHead>
              <TableHead>Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standings.map((team, index) => (
              <TableRow key={team.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{team.corporateCode}</TableCell>
                <TableCell>{team.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}

export default TableStanding;
