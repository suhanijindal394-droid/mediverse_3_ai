export default function FormField({ label, name, type = "text", value, onChange, placeholder, required, textarea, options }) {
  const baseStyle = {
    width: "100%", padding: "12px 14px", borderRadius: 10,
    border: "1px solid var(--navy-100)", fontSize: 14.5, outline: "none",
    background: "#fff", color: "var(--ink-900)",
  };
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--ink-600)" }}>
        {label} {required && <span style={{ color: "var(--red-500)" }}>*</span>}
      </label>
      {textarea ? (
        <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={4} style={{ ...baseStyle, resize: "vertical" }} />
      ) : options ? (
        <select name={name} value={value} onChange={onChange} style={baseStyle}>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} style={baseStyle} />
      )}
    </div>
  );
}
