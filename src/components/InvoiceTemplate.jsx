import React from "react";

const InvoiceTemplate = React.forwardRef(({ data = {} }, ref) => {
  const items = data.items || [];

  // 🧮 CALCULATIONS
  const subtotal = items.reduce(
    (acc, item) => acc + item.qty * item.rate,
    0
  );

  let discountValue = 0;
  if (data.discountType === "percent") {
    discountValue = (subtotal * (data.discount || 0)) / 100;
  } else {
    discountValue = data.discount || 0;
  }

  const afterDiscount = subtotal - discountValue;
  const gstValue = (afterDiscount * (data.gst || 0)) / 100;
  const total = afterDiscount + gstValue;

  const issueDate = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString()
    : "-";

  const dueDate = data.dueDate
    ? new Date(data.dueDate).toLocaleDateString()
    : "-";

  return (
    <div
      ref={ref}
      style={{
        width: "794px",
        minHeight: "1123px",
        fontFamily: "Inter, Arial",
        background: "#fff",
        color: "#111",
      }}
    >
      {/* HEADER */}
      <div style={{ background: "#1e3a8a", color: "#fff", padding: "30px 50px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: "700" }}>
              VeloShift Co.
            </h1>
            <p style={{ fontSize: "13px" }}>Digital Solutions Agency</p>
            <p style={{ fontSize: "12px", marginTop: "6px" }}>
              Chandigarh, India <br />
              support@veloshift.com
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <h2 style={{ fontSize: "22px" }}>INVOICE</h2>
            <p>#{data.invoiceNumber}</p>
          </div>
        </div>
      </div>

      <div style={{ padding: "40px 50px" }}>
        {/* CLIENT */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
          <div>
            <p style={{ fontSize: "12px", color: "#555" }}>BILL TO</p>
            <p style={{ fontSize: "18px", fontWeight: "600" }}>
              {data.client}
            </p>
            {data.clientEmail && <p style={{ fontSize: "13px" }}>{data.clientEmail}</p>}
          </div>

          <div style={{ textAlign: "right", fontSize: "13px" }}>
            <p><strong>Issue:</strong> {issueDate}</p>
            <p><strong>Due:</strong> {dueDate}</p>
            <p><strong>Status:</strong> {data.paymentStatus}</p>
            <p><strong>Method:</strong> {data.paymentMethod}</p>
          </div>
        </div>

        {/* TABLE */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "30px" }}>
          <thead>
            <tr style={{ background: "#eff6ff" }}>
              <th style={thLeft}>#</th>
              <th style={thLeft}>Service</th>
              <th style={thLeft}>Sub Service</th>
              <th style={thCenter}>Qty</th>
              <th style={thRight}>Rate</th>
              <th style={thRight}>Amount</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td style={tdLeft}>{i + 1}</td>
                <td style={tdLeft}>{item.service}</td>
                <td style={tdLeft}>{item.subService || "-"}</td>
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

            {data.discount > 0 && (
              <Row
                label={`Discount (${data.discount}${data.discountType === "percent" ? "%" : ""})`}
                value={`-₹${discountValue}`}
              />
            )}

            {data.gst > 0 && (
              <Row label={`GST (${data.gst}%)`} value={gstValue} />
            )}

            <div style={{ borderTop: "2px solid #1e3a8a", marginTop: "10px", paddingTop: "10px" }}>
              <Row label="Total" value={total} bold blue />
            </div>
          </div>
        </div>

        {/* NOTES */}
        {data.notes && (
          <div style={{ marginTop: "40px" }}>
            <h3 style={sectionTitle}>Notes</h3>
            <p style={text}>{data.notes}</p>
          </div>
        )}

        {/* FOOTER */}
        <div style={{ marginTop: "30px", fontSize: "12px", color: "#555" }}>
          This is a system-generated invoice.
        </div>
      </div>
    </div>
  );
});


// STYLES
const thLeft = { padding: "12px", textAlign: "left", borderBottom: "1px solid #ddd" };
const thCenter = { padding: "12px", textAlign: "center", borderBottom: "1px solid #ddd" };
const thRight = { padding: "12px", textAlign: "right", borderBottom: "1px solid #ddd" };

const tdLeft = { padding: "12px", borderBottom: "1px solid #eee" };
const tdCenter = { padding: "12px", textAlign: "center", borderBottom: "1px solid #eee" };
const tdRight = { padding: "12px", textAlign: "right", borderBottom: "1px solid #eee" };

const Row = ({ label, value, bold, blue }) => (
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    fontWeight: bold ? "700" : "400",
    color: blue ? "#1e3a8a" : "#111",
    marginBottom: "6px",
  }}>
    <span>{label}</span>
    <span>{typeof value === "string" ? value : `₹${value}`}</span>
  </div>
);

const sectionTitle = { fontSize: "14px", fontWeight: "600", marginBottom: "6px" };
const text = { fontSize: "13px", color: "#555" };

export default InvoiceTemplate;