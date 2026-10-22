import Icon from "../components/Icon";
import { useNotifications } from "../hooks/useSharedData";

const iconMap = {
  calendar: "calendar",
  pill: "pill",
  file: "file",
  doctor: "doctor",
  bell: "bell",
};

export default function Notifications() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    dismissNotification,
  } = useNotifications();

  return (
    <div>
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: 24, flexWrap: "wrap", gap: 10 }}
      >
        <div>
          <h1 style={{ fontSize: "clamp(22px,3vw,28px)" }}>Notifications</h1>
          <p className="muted" style={{ marginTop: 4 }}>
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`
              : "All notifications read"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={markAllAsRead}
          >
            <Icon name="check" size={14} /> Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="card card-pad center" style={{ padding: 60 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "var(--navy-50)",
              color: "var(--ink-400)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
            }}
          >
            <Icon name="bell" size={24} />
          </div>
          <h3 style={{ fontSize: 17, marginBottom: 4 }}>You're all caught up!</h3>
          <p className="muted" style={{ fontSize: 13.5 }}>
            No notifications for your patient account at this time.
          </p>
        </div>
      ) : (
        <div>
          {notifications.map((n) => {
            const iconName = iconMap[n.icon] || "bell";
            const isUnread = !n.read;

            return (
              <div
                key={n.id}
                className="card card-pad flex items-center gap-16"
                style={{
                  marginBottom: 12,
                  background: isUnread ? "var(--teal-50)" : "#fff",
                  borderColor: isUnread ? "var(--teal-200)" : "var(--navy-100)",
                  transition: "all 0.15s ease",
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: isUnread ? "var(--teal-100)" : "var(--navy-50)",
                    color: isUnread ? "var(--teal-700)" : "var(--navy-700)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon name={iconName} size={19} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex items-center gap-8" style={{ marginBottom: 2 }}>
                    <p
                      style={{
                        fontSize: 14.5,
                        fontWeight: isUnread ? 700 : 600,
                        color: "var(--navy-900)",
                      }}
                    >
                      {n.title || n.text}
                    </p>
                    {isUnread && (
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "var(--teal-600)",
                          display: "inline-block",
                        }}
                      />
                    )}
                  </div>

                  {n.title && n.message && (
                    <p
                      style={{
                        fontSize: 13.5,
                        color: isUnread ? "var(--ink-700)" : "var(--ink-500)",
                        marginTop: 2,
                        lineHeight: 1.5,
                      }}
                    >
                      {n.message}
                    </p>
                  )}

                  <div className="flex items-center gap-10" style={{ marginTop: 6 }}>
                    <span className="muted" style={{ fontSize: 11.5 }}>
                      {formatTimeAgo(n.timestamp) || n.time || "Recently"}
                    </span>
                    {n.type && (
                      <span
                        className={`badge ${getTypeBadgeClass(n.type)}`}
                        style={{ fontSize: 10, padding: "1px 6px", textTransform: "capitalize" }}
                      >
                        {n.type}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-6">
                  {isUnread && (
                    <button
                      className="icon-btn"
                      onClick={() => markAsRead(n.id)}
                      title="Mark as read"
                      style={{ color: "var(--teal-700)" }}
                    >
                      <Icon name="check" size={16} />
                    </button>
                  )}
                  <button
                    className="icon-btn"
                    onClick={() => dismissNotification(n.id)}
                    title="Dismiss"
                    style={{ color: "var(--ink-400)" }}
                  >
                    <Icon name="trash" size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function getTypeBadgeClass(type) {
  switch (type) {
    case "appointment":
      return "badge-teal";
    case "prescription":
      return "badge-green";
    case "report":
      return "badge-amber";
    default:
      return "badge-navy";
  }
}

function formatTimeAgo(timestamp) {
  if (!timestamp) return null;
  const diff = Date.now() - Number(timestamp);
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
