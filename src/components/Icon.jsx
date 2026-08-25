// A small hand-rolled icon set so the project has zero extra dependencies.
// Usage: <Icon name="calendar" size={20} />
const paths = {
  logo: <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />,
  menu: <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>,
  close: <><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></>,
  chevronRight: <polyline points="9 6 15 12 9 18" />,
  chevronDown: <polyline points="6 9 12 15 18 9" />,
  chevronLeft: <polyline points="15 6 9 12 15 18" />,
  search: <><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><line x1="16" y1="3" x2="16" y2="7" /><line x1="8" y1="3" x2="8" y2="7" /><line x1="3" y1="10" x2="21" y2="10" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15.5 14" /></>,
  pill: <><path d="M10.5 20.5 3.5 13.5a5 5 0 1 1 7-7l7 7a5 5 0 1 1-7 7Z" /><line x1="8.5" y1="8.5" x2="15.5" y2="15.5" /></>,
  file: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><polyline points="14 3 14 8 19 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" /></>,
  doctor: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></>,
  heart: <path d="M12 21s-7.5-4.6-10-9.3C.4 8.1 2.1 4 6 4c2.2 0 3.7 1.2 4.5 2.4L12 8l1.5-1.6C14.3 5.2 15.8 4 18 4c3.9 0 5.6 4.1 4 7.7C19.5 16.4 12 21 12 21Z" />,
  brain: <><path d="M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0-1 5.8V15a3 3 0 0 0 3 3h1" /><path d="M15 4a3 3 0 0 1 3 3v1a3 3 0 0 1 1 5.8V15a3 3 0 0 1-3 3h-1" /><path d="M9 4h6v15H9z" /></>,
  bone: <path d="M17 4a2.5 2.5 0 0 0-4.5-1.5c-.6.7-.5 1.7-.5 2.5L7 10c-.8 0-1.8-.1-2.5.5A2.5 2.5 0 1 0 8 14c.7-.6.5-1.6.5-2.5L13 6.5c.8 0 1.8.1 2.5-.5A2.5 2.5 0 0 0 17 4Z" />,
  baby: <><circle cx="9" cy="7" r="3" /><path d="M15 13a6 6 0 0 0-12 0" /><circle cx="17" cy="16" r="4" /></>,
  female: <><circle cx="12" cy="8" r="5" /><line x1="12" y1="13" x2="12" y2="21" /><line x1="9" y1="18" x2="15" y2="18" /></>,
  stomach: <path d="M8 3c0 3-3 3-3 7a7 7 0 0 0 14 0c0-2-1-2.5-1-4.5S17 3 15 3" />,
  lungs: <path d="M12 3v6m0 0c-1-3-4-2-5 0-1.5 3-1 9 1 10 1.5 1 3-.5 3-2m1-8c1-3 4-2 5 0 1.5 3 1 9-1 10-1.5 1-3-.5-3-2" />,
  ear: <path d="M8 14a5 5 0 0 1 5-8 6 6 0 0 1 6 6c0 3-2 4-2 6a2 2 0 0 1-4 0v-2a2 2 0 0 0-4 0" />,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>,
  tooth: <path d="M12 4c-2 0-3 1.5-5 1.5S4 4 4 4s-1 6 1 10c1 2 1 5 3 5s1-4 4-4 2 4 4 4 2-3 3-5c2-4 1-10 1-10s-2 1.5-4 1.5S14 4 12 4Z" />,
  mind: <><circle cx="12" cy="12" r="9" /><path d="M8 13a4 4 0 0 0 8 0" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></>,
  stethoscope: <><path d="M5 3v6a4 4 0 0 0 8 0V3" /><path d="M9 15v2a5 5 0 0 0 10 0v-2" /><circle cx="19" cy="11" r="2" /></>,
  crossMed: <><rect x="3" y="3" width="18" height="18" rx="4" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></>,
  shield: <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z" />,
  check: <polyline points="20 6 9 17 4 12" />,
  checkCircle: <><circle cx="12" cy="12" r="9" /><polyline points="8 12 11 15 16 9" /></>,
  alert: <><path d="M10.3 3.9 1.9 18a2 2 0 0 0 1.7 3h16.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 3a2 2 0 0 1-.5 2.1L8 10.1a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c1 .3 2 .5 3 .7a2 2 0 0 1 1.7 2Z" />,
  mapPin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7" /><path d="M23 21c0-3-2.3-5.3-5-5.9" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 6-2 8-2 8h16s-2-2-2-8" /><path d="M10 21a2 2 0 0 0 4 0" /></>,
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
  grid: <><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" /></>,
  download: <><path d="M12 3v13" /><polyline points="7 12 12 17 17 12" /><line x1="4" y1="21" x2="20" y2="21" /></>,
  upload: <><path d="M12 21V8" /><polyline points="7 12 12 7 17 12" /><line x1="4" y1="3" x2="20" y2="3" /></>,
  sparkle: <path d="m12 2 1.8 5.5L19 9l-5.2 1.5L12 16l-1.8-5.5L5 9l5.2-1.5L12 2ZM19 15l.9 2.7L22 18l-2.1.8L19 21l-.9-2.2L16 18l2.1-.3L19 15Z" />,
  arrowRight: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></>,
  edit: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
  trash: <><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
  plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
  video: <><rect x="2" y="6" width="14" height="12" rx="2" /><polygon points="22 8 16 12 22 16 22 8" /></>,
  building: <><rect x="4" y="3" width="16" height="18" rx="1" /><line x1="9" y1="7" x2="9" y2="7.01" /><line x1="15" y1="7" x2="15" y2="7.01" /><line x1="9" y1="11" x2="9" y2="11.01" /><line x1="15" y1="11" x2="15" y2="11.01" /><line x1="9" y1="15" x2="9" y2="15.01" /><line x1="15" y1="15" x2="15" y2="15.01" /></>,
  activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
  globe: <><circle cx="12" cy="12" r="9" /><line x1="3" y1="12" x2="21" y2="12" /><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z" /></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  info: <><circle cx="12" cy="12" r="9" /><line x1="12" y1="11" x2="12" y2="16" /><line x1="12" y1="8" x2="12.01" y2="8" /></>,
  siren: <><path d="M7 18v-6a5 5 0 0 1 10 0v6" /><line x1="12" y1="2" x2="12" y2="4" /><line x1="4" y1="18" x2="20" y2="18" /><line x1="4" y1="21" x2="20" y2="21" /></>,
};

export default function Icon({ name, size = 20, strokeWidth = 2, className = "", style = {} }) {
  const content = paths[name];
  if (!content) return null;
  const filled = ["heart", "pill", "bone", "tooth", "stomach", "logo"].includes(name);
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style}
    >
      {content}
    </svg>
  );
}
