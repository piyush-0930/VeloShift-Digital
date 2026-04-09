import React from "react";

const InvoiceTemplate = React.forwardRef(({ invoice = {} }, ref) => {
  const items =
    invoice.items && invoice.items.length
      ? invoice.items
      : [
          {
            name: invoice.notes || "Service Charges",
            qty: 1,
            rate: Number(invoice.amount) || 0,
          },
        ];

  const gst = Number(invoice.gst) || 0;

  const subtotal = items.reduce((acc, item) => acc + item.qty * item.rate, 0);
  const gstAmount = (subtotal * gst) / 100;
  const total = subtotal + gstAmount;

  const issueDate = invoice.createdAt
    ? new Date(invoice.createdAt).toLocaleDateString()
    : "-";

  const dueDate = invoice.dueDate
    ? new Date(invoice.dueDate).toLocaleDateString()
    : "-";

  return (
    <div
      ref={ref}
      style={{
        width: "794px",
        minHeight: "1123px",
        fontFamily: "Inter, Arial, sans-serif",
        background: "#ffffff",
        color: "#111",
      }}
    >
      {/* 🔷 TOP HEADER BAR */}
      <div
        style={{
          background: "#1e3a8a",
          color: "#fff",
          padding: "30px 50px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: "700" }}>
              VeloShift Co.
            </h1>
            <p style={{ fontSize: "13px", opacity: 0.9 }}>
              Digital Solutions Agency
            </p>
            <p style={{ fontSize: "12px", opacity: 0.8, marginTop: "6px" }}>
              Chandigarh, India <br />
              support@veloshift.com
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "600" }}>INVOICE</h2>
            <p style={{ fontSize: "13px" }}>
              #{invoice.invoiceNumber || "-"}
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: "40px 50px" }}>
        {/* CLIENT + META */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}
        >
          {/* CLIENT */}
          <div>
            <p style={{ fontSize: "12px", color: "#555" }}>BILL TO</p>
            <p style={{ fontSize: "18px", fontWeight: "600" }}>
              {invoice.client || "-"}
            </p>
          </div>

          {/* DATES */}
          <div style={{ textAlign: "right", fontSize: "13px" }}>
            <p><strong>Issue Date:</strong> {issueDate}</p>
            <p><strong>Due Date:</strong> {dueDate}</p>
          </div>
        </div>

        {/* TABLE */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "30px",
          }}
        >
          <thead>
            <tr style={{ background: "#eff6ff" }}>
              <th style={thLeft}>#</th>
              <th style={thLeft}>Description</th>
              <th style={thCenter}>Qty</th>
              <th style={thRight}>Rate</th>
              <th style={thRight}>Amount</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td style={tdLeft}>{i + 1}</td>
                <td style={tdLeft}>{item.name}</td>
                <td style={tdCenter}>{item.qty}</td>
                <td style={tdRight}>₹{item.rate}</td>
                <td style={tdRight}>₹{item.qty * item.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTALS */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: "320px" }}>
            <Row label="Subtotal" value={subtotal} />
            {gst ? <Row label={`GST (${gst}%)`} value={gstAmount} /> : null}

            <div
              style={{
                marginTop: "10px",
                paddingTop: "10px",
                borderTop: "2px solid #1e3a8a",
              }}
            >
              <Row label="Total" value={total} bold blue />
            </div>
          </div>
        </div>

        {/* NOTES */}
        <div style={{ marginTop: "40px" }}>
          <h3 style={sectionTitle}>Notes</h3>
          <p style={text}>
            Thank you for doing business with VeloShift. We appreciate your trust
            in our services and look forward to future collaborations.
          </p>
        </div>

        {/* TERMS */}
        <div style={{ marginTop: "20px" }}>
          <h3 style={sectionTitle}>Terms & Conditions</h3>
          <ul style={{ ...text, paddingLeft: "18px" }}>
            <li>Payment is due within the specified due date.</li>
            <li>Late payments may incur additional charges.</li>
            <li>All services are non-refundable once delivered.</li>
          </ul>
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          borderTop: "1px solid #e5e7eb",
          padding: "15px",
          textAlign: "center",
          fontSize: "12px",
          color: "#555",
        }}
      >
        This is a system-generated invoice and does not require a signature.
      </div>
    </div>
  );
});

/* 🔧 STYLES */
const thLeft = { padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" };
const thCenter = { padding: "12px", textAlign: "center", borderBottom: "1px solid #ddd" };
const thRight = { padding: "12px", textAlign: "right", borderBottom: "1px solid #ddd" };

const tdLeft = { padding: "12px", textAlign: "left", borderBottom: "1px solid #eee" };
const tdCenter = { padding: "12px", textAlign: "center", borderBottom: "1px solid #eee" };
const tdRight = { padding: "12px", textAlign: "right", borderBottom: "1px solid #eee" };

const Row = ({ label, value, bold, blue }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "6px",
      fontWeight: bold ? "700" : "400",
      fontSize: bold ? "16px" : "14px",
      color: blue ? "#1e3a8a" : "#111",
    }}
  >
    <span>{label}</span>
    <span>₹{value}</span>
  </div>
);

const sectionTitle = {
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "6px",
};

const text = {
  fontSize: "13px",
  color: "#555",
};

export default InvoiceTemplate;