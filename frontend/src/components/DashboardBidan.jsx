import { useEffect, useState } from "react";
import {
  fetchChildren,
  fetchImmunizations,
  fetchVaccineTypes,
} from "../services/api";

const dotColors = {
  red: "#e53935",
  orange: "#fb8c00",
  green: "#43a047",
};

function DashboardBidan({ user, onLogout, onNavigate, onSelectImmunization }) {
  const [summary, setSummary] = useState({
    anak: 0,
    selesai: 0,
    mendatang: 0,
    terlambat: 0,
  });

  const [upcomingSchedules, setUpcomingSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        let vaccineMap = {};

        try {
          const vt = await fetchVaccineTypes();

          (vt || []).forEach((v) => {
            vaccineMap[String(v.id)] = v.name;
          });
        } catch (_) {}

        const children = await fetchChildren();

        const allImun = [];

        for (const child of children || []) {
          try {
            const imuns = await fetchImmunizations(child.id);

            (imuns || []).forEach((i) => {
              allImun.push({
                ...i,
                childName: child.name,
                childId: child.id,
                childData: child,
                vaccine_name:
                  vaccineMap[String(i.vaccine_id)] ||
                  i.vaccine_name ||
                  `Vaksin ${i.vaccine_id}`,
              });
            });
          } catch (_) {}
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const in30Days = new Date(today);
        in30Days.setDate(in30Days.getDate() + 30);

        const selesai = allImun.filter(
          (i) => i.status === "completed",
        ).length;

        const mendatang = allImun.filter((i) => {
          if (!i.scheduled_date) return false;

          const d = new Date(i.scheduled_date);
          d.setHours(0, 0, 0, 0);

          return (
            d >= today &&
            d <= in30Days &&
            i.status !== "completed"
          );
        }).length;

        const terlambat = allImun.filter((i) => {
          if (!i.scheduled_date || i.status === "completed")
            return false;

          const d = new Date(i.scheduled_date);
          d.setHours(0, 0, 0, 0);

          return d < today;
        }).length;

        setSummary({
          anak: children.length,
          selesai,
          mendatang,
          terlambat,
        });

        const upcoming = allImun
          .filter(
            (i) => i.scheduled_date && i.status !== "completed",
          )
          .sort(
            (a, b) =>
              new Date(a.scheduled_date) -
              new Date(b.scheduled_date),
          )
          .slice(0, 6)
          .map((i) => ({
            ...i,
            status:
              new Date(i.scheduled_date) >= today
                ? "green"
                : "red",
          }));

        setUpcomingSchedules(upcoming);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <div style={styles.navbar}>
        {/* LEFT */}
        <div style={styles.logoWrap}>
          <h2 style={styles.logo}>
            ByeBye<span style={{ color: "#e91e63" }}>Virus</span>
          </h2>
        </div>

        {/* CENTER MENU */}
        <div style={styles.navMenu}>
          <button
            style={{
              ...styles.navItem,
              ...styles.navItemActive,
            }}
          >
            Home
          </button>

                    <button style={styles.navItem}>
            Detail Imunisasi
          </button>


          <button style={styles.navItem}>
            Kelola Imunisasi
          </button>

          <button style={styles.navItem}>
            Profil
          </button>
        </div>

        {/* RIGHT */}
        <div style={styles.navRight}>
          <div style={styles.avatar}>
            {(user?.name || "B")[0]}
          </div>

          <button
            style={styles.logoutBtn}
            onClick={onLogout}
          >
            Keluar
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        {/* LEFT */}
        <div style={styles.left}>
          {/* WELCOME */}
          <div style={styles.welcomeCard}>
            <div style={styles.avatarBig}>👩‍⚕️</div>

            <div>
              <h2 style={styles.welcomeTitle}>
                Halo,{" "}
                {user?.name ||
                  user?.email?.split("@")[0] ||
                  "Bidan"}{" "}
                👋
              </h2>

              <p style={styles.welcomeSubtitle}>
                Pantau imunisasi, jadwal pasien, dan data
                kesehatan anak dengan mudah melalui portal
                bidan Bye Bye Virus.
              </p>
            </div>
          </div>

          {/* REMINDER */}
          <div style={styles.reminder}>
            <div style={styles.reminderIcon}>!</div>

            <p style={styles.reminderText}>
              {loading ? (
                "Memuat..."
              ) : upcomingSchedules.length > 0 ? (
                <>
                  Jadwal terdekat:{" "}
                  <strong>
                    {upcomingSchedules[0].vaccine_name}
                  </strong>{" "}
                  untuk{" "}
                  {upcomingSchedules[0].childName}
                </>
              ) : (
                "Tidak ada jadwal terdekat"
              )}
            </p>

            <span style={styles.reminderBadge}>
              {loading
                ? "..."
                : upcomingSchedules.length > 0
                  ? (() => {
                      const schedDate = new Date(
                        upcomingSchedules[0]
                          .scheduled_date,
                      );

                      const today = new Date();

                      today.setHours(0, 0, 0, 0);
                      schedDate.setHours(0, 0, 0, 0);

                      const daysLeft = Math.ceil(
                        (schedDate - today) /
                          (1000 * 60 * 60 * 24),
                      );

                      return daysLeft === 0
                        ? "hari ini"
                        : daysLeft === 1
                          ? "1 hari lagi"
                          : `${daysLeft} hari lagi`;
                    })()
                  : "-"}
            </span>
          </div>

          {/* STATS */}
          <div>
            <h3 style={styles.sectionTitle}>
              Ringkasan Dashboard
            </h3>

            <div style={styles.statsGrid}>
              <div
                style={{
                  ...styles.statCard,
                  background: "#e91e63",
                }}
              >
                <div style={styles.statLabel}>
                  Total Anak
                </div>

                <div style={styles.statNumber}>
                  {summary.anak}
                </div>

                <div style={styles.statSub}>
                  Anak terdaftar
                </div>
              </div>

              <div
                style={{
                  ...styles.statCard,
                  background: "#f06292",
                }}
              >
                <div style={styles.statLabel}>
                  Imunisasi Selesai
                </div>

                <div style={styles.statNumber}>
                  {summary.selesai}
                </div>

                <div style={styles.statSub}>
                  Sudah lengkap
                </div>
              </div>

              <div
                style={{
                  ...styles.statCard,
                  background: "#ff9800",
                }}
              >
                <div style={styles.statLabel}>
                  Jadwal Mendatang
                </div>

                <div style={styles.statNumber}>
                  {summary.mendatang}
                </div>

                <div style={styles.statSub}>
                  Dalam 30 hari
                </div>
              </div>

              <div
                style={{
                  ...styles.statCard,
                  background: "#ef5350",
                }}
              >
                <div style={styles.statLabel}>
                  Terlambat
                </div>

                <div style={styles.statNumber}>
                  {summary.terlambat}
                </div>

                <div style={styles.statSub}>
                  Perlu tindak lanjut
                </div>
              </div>
            </div>
          </div>

          {/* JADWAL */}
          <div>
            <h3 style={styles.sectionTitle}>
              Jadwal Imunisasi Terdekat
            </h3>

            <div style={styles.scheduleGrid}>
              {loading ? (
                <p style={{ color: "#999" }}>
                  Memuat...
                </p>
              ) : upcomingSchedules.length === 0 ? (
                <p style={{ color: "#999" }}>
                  Tidak ada jadwal
                </p>
              ) : (
                upcomingSchedules.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      ...styles.schedCard,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => {
                      if (onSelectImmunization) {
                        onSelectImmunization(item, item.childData);
                      }
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = styles.schedCard.boxShadow;
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        ...styles.dot,
                        background:
                          dotColors[item.status],
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <div style={styles.schedName}>
                        {item.vaccine_name}
                      </div>

                      <div style={styles.schedDate}>
                        {new Date(
                          item.scheduled_date,
                        ).toLocaleDateString("id-ID")}
                      </div>

                      <div style={styles.childName}>
                        {item.childName}
                      </div>
                    </div>

                    <span style={styles.schedBadge}>
                      Jadwal
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={styles.right}>
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>
              Tips Hari Ini
            </h3>

            <p style={styles.infoText}>
              Pastikan suhu vaksin tetap stabil sebelum
              pemberian imunisasi untuk menjaga efektivitas
              vaksin.
            </p>
          </div>

          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>
              Reminder Faskes
            </h3>

            <p style={styles.infoText}>
              Jangan lupa cek stok vaksin mingguan dan
              jadwal kunjungan posyandu.
            </p>
          </div>

          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>
              Informasi
            </h3>

            <p style={styles.infoText}>
              Data imunisasi yang ditampilkan berasal
              dari seluruh pasien yang terdaftar pada
              sistem Bye Bye Virus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#fff5f8",
    fontFamily: "'Segoe UI', sans-serif",
  },

  navbar: {
    height: "70px",
    background: "white",
    padding: "0 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
    borderBottom: "1px solid #f8c8d8",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  logoWrap: {
    display: "flex",
    alignItems: "center",
  },

  logo: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
    color: "#1a1a2e",
  },

  navMenu: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },

  navItem: {
    border: "none",
    background: "transparent",
    fontSize: "14px",
    fontWeight: "500",
    color: "#777",
    cursor: "pointer",
    transition: "0.2s",
  },

  navItemActive: {
    color: "#e91e63",
    fontWeight: "700",
  },

  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#f8bbd0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    color: "#c2185b",
    textTransform: "uppercase",
  },

  logoutBtn: {
    border: "none",
    background: "#e91e63",
    color: "white",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  main: {
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: "1.5rem",
    padding: "2rem",
    maxWidth: "1300px",
    margin: "0 auto",
  },

  left: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },

  right: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },

  welcomeCard: {
    background: "#fce4ec",
    borderRadius: "20px",
    padding: "1.5rem",
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },

  avatarBig: {
    fontSize: "48px",
  },

  welcomeTitle: {
    margin: 0,
    fontSize: "24px",
    color: "#1a1a2e",
  },

  welcomeSubtitle: {
    marginTop: "8px",
    color: "#666",
    lineHeight: 1.6,
    fontSize: "14px",
  },

  reminder: {
    background: "#fff0f5",
    border: "1px solid #f8bbd0",
    borderRadius: "14px",
    padding: "1rem 1.2rem",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  reminderIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#e91e63",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
  },

  reminderText: {
    margin: 0,
    fontSize: "14px",
    flex: 1,
  },

  reminderBadge: {
    background: "#c2185b",
    color: "white",
    borderRadius: "20px",
    padding: "5px 14px",
    fontSize: "12px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },

  sectionTitle: {
    fontSize: "16px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#1a1a2e",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "12px",
  },

  statCard: {
    borderRadius: "16px",
    padding: "1.2rem",
    color: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  statLabel: {
    fontSize: "13px",
    opacity: 0.9,
  },

  statNumber: {
    fontSize: "32px",
    fontWeight: "700",
    marginTop: "8px",
    lineHeight: 1,
  },

  statSub: {
    marginTop: "8px",
    fontSize: "12px",
    opacity: 0.9,
  },

  scheduleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "12px",
  },

  schedCard: {
    background: "white",
    borderRadius: "14px",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },

  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    flexShrink: 0,
  },

  schedName: {
    fontWeight: "600",
    fontSize: "14px",
    color: "#1a1a2e",
  },

  schedDate: {
    fontSize: "12px",
    color: "#888",
    marginTop: "3px",
  },

  childName: {
    fontSize: "11px",
    color: "#999",
    marginTop: "4px",
  },

  schedBadge: {
    background: "#fce4ec",
    color: "#c2185b",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "600",
  },

  infoCard: {
    background: "white",
    borderRadius: "16px",
    padding: "1.2rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },

  infoTitle: {
    marginTop: 0,
    marginBottom: "10px",
    color: "#e91e63",
    fontSize: "15px",
  },

  infoText: {
    fontSize: "13px",
    lineHeight: 1.6,
    color: "#666",
  },
};

export default DashboardBidan;