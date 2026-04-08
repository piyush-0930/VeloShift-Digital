import React from "react";

const InvoiceTemplate = React.forwardRef(({ data = {}, invoice = {} }, ref) => {
  const finalData = invoice?.client
    ? {
        clientName: invoice.client,
        amount: invoice.amount,
        service: invoice.notes || "Service Charges",
        date: invoice.createdAt,
        gst: invoice.gst || 0,
        total: invoice.totalAmount,
        invoiceNumber: invoice.invoiceNumber,
      }
    : data;

  const gstAmount = (finalData.amount * (finalData.gst || 0)) / 100;
  const totalAmount = finalData.total || finalData.amount + gstAmount;

  return (
    <div
      ref={ref}
      style={{
        width: "794px", // A4 width
        minHeight: "1123px", // A4 height
        padding: "40px",
        background: "#ffffff",
        color: "#000",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: "bold" }}>VeloShift Co.</h1>
          <p style={{ color: "#555" }}>Digital Solutions Agency</p>
        </div>

        <div style={{ textAlign: "right" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600" }}>INVOICE</h2>
          <p>#{finalData.invoiceNumber || "-"}</p>
          <p>{new Date(finalData.date).toLocaleDateString()}</p>
        </div>
      </div>

      {/* CLIENT */}
      <div style={{ marginBottom: "30px" }}>
        <p style={{ color: "#777" }}>Bill To:</p>
        <p style={{ fontSize: "18px", fontWeight: "600" }}>
          {finalData.clientName || "-"}
        </p>
      </div>

      {/* TABLE */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "30px" }}>
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>
              Description
            </th>
            <th style={{ padding: "12px", textAlign: "center", border: "1px solid #ddd" }}>
              Amount
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={{ padding: "12px", border: "1px solid #ddd" }}>
              {finalData.service}
            </td>
            <td style={{ padding: "12px", textAlign: "center", border: "1px solid #ddd" }}>
              ₹{finalData.amount}
            </td>
          </tr>

          {finalData.gst ? (
            <tr>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                GST ({finalData.gst}%)
              </td>
              <td style={{ padding: "12px", textAlign: "center", border: "1px solid #ddd" }}>
                ₹{gstAmount}
              </td>
            </tr>
          ) : null}

          <tr>
            <td style={{ padding: "12px", fontWeight: "bold", border: "1px solid #ddd" }}>
              Total
            </td>
            <td style={{ padding: "12px", textAlign: "center", fontWeight: "bold", border: "1px solid #ddd" }}>
              ₹{totalAmount}
            </td>
          </tr>
        </tbody>
      </table>

      {/* FOOTER */}
      <div style={{ marginTop: "60px", borderTop: "1px solid #eee", paddingTop: "10px" }}>
        <p style={{ fontSize: "12px", color: "#777" }}>
          Thank you for your business 🚀
        </p>
      </div>
    </div>
  );
});

export default InvoiceTemplate;