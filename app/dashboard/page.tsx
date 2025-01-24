'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import Sidebar from "@/components/side-navbar/Sidebar";


interface Ticket {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  resident: { name: string; apartmentNumber: string };
  assignedTo?: { name: string };
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Ticket[]>("/api/ticket") // Explicitly type the response as Ticket[]
      .then((response) => {
        setTickets(response.data); // Now TypeScript knows response.data is of type Ticket[]
        setLoading(false);
      })
      .catch((error: unknown) => {  // Use 'unknown' instead of 'any'
        if (error instanceof Error) { // Narrow to Error type
          console.error("Error fetching tickets:", error.message);
        } else {
          console.error("Unknown error occurred while fetching tickets.");
        }
        setError("There was an error fetching the tickets.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-600">{error}</div>;
  }

  return (
    <div className="flex">
    <Sidebar /> {/* Sidebar component */}
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-semibold mb-4">Ticket Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black px-4 py-2 text-left text-black" scope="col">ID</th>
              <th className="border border-black px-4 py-2 text-left text-black" scope="col">Title</th>
              <th className="border border-black px-4 py-2 text-left text-black" scope="col">Description</th>
              <th className="border border-black px-4 py-2 text-left text-black" scope="col">Category</th>
              <th className="border border-black px-4 py-2 text-left text-black" scope="col">Priority</th>
              <th className="border border-black px-4 py-2 text-left text-black" scope="col">Status</th>
              <th className="border border-black px-4 py-2 text-left text-black" scope="col">Resident</th>
              <th className="border border-black px-4 py-2 text-left text-black" scope="col">Assigned To</th>
              <th className="border border-black px-4 py-2 text-left text-black" scope="col">Created At</th>
              <th className="border border-black px-4 py-2 text-left text-black" scope="col">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => {
              const priorityClass =
                ticket.priority === "HIGH"
                  ? "text-red-600 font-semibold"
                  : ticket.priority === "CRITICAL"
                  ? "text-red-800 font-bold"
                  : "text-gray-700";

              return (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="border border-black px-4 py-2">{ticket.id}</td>
                  <td className="border border-black px-4 py-2">{ticket.title}</td>
                  <td className="border border-black px-4 py-2">{ticket.description}</td>
                  <td className="border border-black px-4 py-2">{ticket.category}</td>
                  <td className={`border border-black px-4 py-2 ${priorityClass}`}>{ticket.priority}</td>
                  <td className="border border-black px-4 py-2">{ticket.status}</td>
                  <td className="border border-black px-4 py-2">
                    {ticket.resident.name} ({ticket.resident.apartmentNumber})
                  </td>
                  <td className="border border-black px-4 py-2">
                    {ticket.assignedTo ? ticket.assignedTo.name : "Unassigned"}
                  </td>
                  <td className="border border-black px-4 py-2">{format(new Date(ticket.createdAt), 'MM/dd/yyyy')}</td>
                  <td className="border border-black px-4 py-2">{format(new Date(ticket.updatedAt), 'MM/dd/yyyy')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}