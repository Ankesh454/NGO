import { useEffect, useState, useMemo } from "react";
import adminApi from "../services/api";
import ViewModal from "../components/ViewModal";
import { exportToCSV } from "../../utils/exportCsv";
import { FaSearch, FaFileCsv } from "react-icons/fa";
import "./Contacts.css";

const STATUS_OPTIONS = ["All", "New", "Contacted", "Resolved"];

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("/contact");
      // Add default status if missing
      const dataWithStatus = (res.data || []).map((item) => ({
        ...item,
        status: item.status || "New",
      }));
      setContacts(dataWithStatus);
    } catch (err) {
      console.error("Contacts fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setContacts((prev) =>
      prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
    );
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter((item) => {
      const q = search.toLowerCase();
      const matchesSearch =
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.message && item.message.toLowerCase().includes(q));

      const matchesStatus =
        statusFilter === "All" ||
        (item.status && item.status.toLowerCase() === statusFilter.toLowerCase());

      return matchesSearch && matchesStatus;
    });
  }, [contacts, search, statusFilter]);

  const handleExport = () => {
    exportToCSV(filteredContacts, `contacts_export_${Date.now()}.csv`);
  };

  return (
    <div className="contacts-page max-w-7xl mx-auto p-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="page-title text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span>📩 Contact Messages</span>
            <span className="text-xs bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full font-bold">
              {filteredContacts.length}
            </span>
          </h2>
          <p className="text-gray-500 text-xs mt-1">
            Inquiries received from website contact form
          </p>
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow transition self-start sm:self-auto"
        >
          <FaFileCsv />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            placeholder="Search name, email, message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-gray-400 mr-1">Status:</span>
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                statusFilter === status
                  ? "bg-green-700 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="table-card bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-400">
                    Loading messages...
                  </td>
                </tr>
              ) : filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty py-8 text-center text-gray-400">
                    No contact messages found
                  </td>
                </tr>
              ) : (
                filteredContacts.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.email}</td>
                    <td className="py-3 px-4">
                      <select
                        value={item.status || "New"}
                        onChange={(e) =>
                          handleStatusChange(item._id, e.target.value)
                        }
                        className={`text-xs font-semibold rounded-md px-2 py-1 border transition ${
                          item.status === "Resolved"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : item.status === "Contacted"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-500">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "Recent"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        className="view-btn bg-gray-100 hover:bg-green-100 hover:text-green-800 text-gray-700 px-3 py-1 rounded text-xs font-semibold transition"
                        onClick={() => setSelected(item)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <ViewModal
          title="Contact Message"
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
