import "./ViewModal.css";

export default function ViewModal({ title, data, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>{title}</h3>

        <p><b>Name:</b> {data.name}</p>
        <p><b>Email:</b> {data.email}</p>

        {data.phone && <p><b>Phone:</b> {data.phone}</p>}
        {data.message && <p><b>Message:</b> {data.message}</p>}

        <button onClick={onClose} className="close-btn">
          Close
        </button>
      </div>
    </div>
  );
}
