import Icon from "../components/Icon";
import { demoNotifications } from "../data/mockData";
import useLocalStorage from "../hooks/useLocalStorage";

const iconMap = { calendar: "calendar", pill: "pill", file: "file", doctor: "doctor" };

export default function Notifications() {
  const [notifications, setNotifications] = useLocalStorage("mv_notifications", demoNotifications);

  function markRead(id) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }
  function remove(id) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }
  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <div className="flex items-center justify-between" style={{ marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h1 style={{ fontSize: "clamp(22px,3vw,28px)" }}>Notifications</h1>
          <p className="muted" style={{ marginTop: 4 }}>{unreadCount} unread</p>
        </div>
        {unreadCount > 0 && <button className="btn btn-outline btn-sm" onClick={markAllRead}>Mark all as read</button>}
      </div>

      {notifications.length === 0 ? (
        <div className="card card-pad center" style={{ padding: 60 }}>
          <Icon name="bell" size={26} style={{ color: "var(--ink-400)", marginBottom: 12 }} />
          <p className="muted">You're all caught up.</p>
        </div>
      ) : (
        <div>
          {notifications.map((n) => (
            <div key={n.id} className="card card-pad flex items-center gap-16" style={{ marginBottom: 12, background: n.read ? "#fff" : "var(--teal-50)" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--navy-50)", color: "var(--navy-700)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={iconMap[n.icon] || "bell"} size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: n.read ? 500 : 700 }}>{n.text}</p>
                <p className="muted" style={{ fontSize: 12, marginTop: 3 }}>{n.time}</p>
              </div>
              <div className="flex gap-6">
                {!n.read && <button className="icon-btn" onClick={() => markRead(n.id)} title="Mark as read"><Icon name="check" size={16} /></button>}
                <button className="icon-btn" onClick={() => remove(n.id)} title="Delete"><Icon name="trash" size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
