import { LunarCalendar } from "@dqcai/vn-lunar";
import { useState, useEffect } from "react";

const CAN: string[] = [
  "Giáp",
  "Ất",
  "Bính",
  "Đinh",
  "Mậu",
  "Kỷ",
  "Canh",
  "Tân",
  "Nhâm",
  "Quý",
];

const CHI: string[] = [
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
];

const CHI_MONTH: string[] = [
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
  "Tý",
  "Sửu",
];

// ===== Julian Day Number =====
function jdFromDate(dd: number, mm: number, yy: number): number {
  const a = Math.floor((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;

  return (
    dd +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

// ===== Can Chi NGÀY =====
function getTodayDayCanChi(): string {
  const now = new Date();
  const jd = jdFromDate(now.getDate(), now.getMonth() + 1, now.getFullYear());

  const can = CAN[(jd + 9) % 10];
  const chi = CHI[(jd + 1) % 12];

  return `${can} ${chi}`;
}

// ===== Can Chi THÁNG =====
function getMonthCanChi(lunarYear: number, lunarMonth: number): string {
  const yearCanIndex = (lunarYear + 6) % 10;
  const firstMonthCanIndex = (yearCanIndex * 2 + 2) % 10;
  const monthCanIndex = (firstMonthCanIndex + lunarMonth - 1) % 10;

  return `${CAN[monthCanIndex]} ${CHI_MONTH[lunarMonth - 1]}`;
}

// ===== Can Chi NĂM =====
function getYearCanChi(lunarYear: number): string {
  return `${CAN[(lunarYear + 6) % 10]} ${CHI[(lunarYear + 8) % 12]}`;
}

export default function App() {
  const today = LunarCalendar.today();

  const lunarDay = today.lunarDate.day;
  const lunarMonth = today.lunarDate.month;
  const lunarYear = today.lunarDate.year;

  const dayCanChi = getTodayDayCanChi();
  const monthCanChi = getMonthCanChi(lunarYear, lunarMonth);
  const yearCanChi = getYearCanChi(lunarYear);

  const [numSaid, setNumSaid] = useState<number>(1);
  const [selectedChapter, setSelectedChapter] = useState<string>("Phẩm 1");
  const [savedData, setSavedData] = useState<{
    chapter: string;
    time: string;
    userName: string;
    phapdanh: string;
    address: string;
  } | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [phapdanh, setPhapdanh] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [history, setHistory] = useState<
    Array<{ chapter: string; time: string; date: string }>
  >([]);

  // Load saved data and history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("niem_phat_save");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSavedData(parsed);
      setUserName(parsed.userName || "");
      setPhapdanh(parsed.phapdanh || "");
      setAddress(parsed.address || "");
    }
    const savedHistory = localStorage.getItem("niem_phat_history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSave = () => {
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const timeStr = now.toLocaleString("vi-VN");

    const newData = {
      chapter: selectedChapter,
      time: timeStr,
      userName: userName,
      phapdanh: phapdanh,
      address: address,
    };

    // Update current save
    localStorage.setItem("niem_phat_save", JSON.stringify(newData));
    setSavedData(newData);

    // Update history
    const entry = { ...newData, date: dateStr };
    const newHistory = [...history.filter((h) => h.date !== dateStr), entry]; // One entry per day
    localStorage.setItem("niem_phat_history", JSON.stringify(newHistory));
    setHistory(newHistory);

    setIsEditing(false);
  };

  const handleNumSaid = (): void => {
    setNumSaid(numSaid === 1 ? 2 : 1);
  };

  return (
    <div
      style={{
        padding: "20px 10px",
        minHeight: "100vh",
        backgroundColor: "#563060",
        color: "#fff",
        fontSize: 18,
        width: "100vw",
        lineHeight: 1.6,
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {numSaid === 1 && (
          <p style={{ whiteSpace: "pre-line" }}>
            {`Nam mô Bổn Sư Thích Ca Mâu Ni Phật. (3 lần)

              Nam mô Đại Nguyện Địa Tạng Vương Bồ Tát.
              Nam mô Đại Bi Quan Thế Âm Bồ Tát.
              Nam mô Dược Sư Lưu Ly Quang Vương Phật.
              Nam mô Cầu Sám Hối Bồ Tát Ma Ha Tát. (3 lần)

              Đệ tử con tên là: ${userName}
              (Pháp danh: ${phapdanh})
              cư ngụ tại số ${address}


              Hôm nay ngày ${lunarDay} tháng ${lunarMonth} năm ${lunarYear}
              tức Ngày ${dayCanChi}
              Tháng ${monthCanChi}
              Năm ${yearCanChi}.

              Đệ tử con nhất tâm chí thành phát nguyện,
              một lòng quy hướng Tam Bảo,
              phát tâm trì tụng kinh điển,
              tu học theo lời Phật dạy.

              Ngưỡng nguyện mười phương chư Phật, chư phật mười phương
              chư Đại Bồ Tát,
              chư Hiền Thánh Tăng,
              Long Thần Hộ Pháp từ bi gia hộ.

              Nam mô Bổn Sư Thích Ca Mâu Ni Phật.
              Nam mô A Di Đà Phật. (3 lần)
              `}
          </p>
        )}

        {numSaid === 2 && (
          <>
            <p style={{ whiteSpace: "pre-line" }}>
              {`Kính lạy:
            Nam mô Bổn Sư Thích Ca Mâu Ni Phật. (3 lần)

            Nam mô Đại Nguyện Địa Tạng Vương Bồ Tát. (3 lần)
            Nam mô Đại Bi Quan Thế Âm Bồ Tát.
            Nam mô Dược Sư Lưu Ly Quang Vương Phật.
            Nam mô Cầu Sám Hối Bồ Tát Ma Ha Tát. (3 lần)

            Hôm nay ngày ${lunarDay} tháng ${lunarMonth} năm ${lunarYear}
            tức Ngày ${dayCanChi}
            Tháng ${monthCanChi}
            Năm ${yearCanChi}.

            Đệ tử con tên là: ${userName}` +
            `${phapdanh && `\n(Pháp danh: ${phapdanh})`}` +
            `cư ngụ tại số ${address}

            Đệ tử con nhất tâm chí thành phát nguyện
            trì tụng Chú Đại Bi và một phẩm Kinh Địa Tạng Bồ Tát Bổn Nguyện Bồ Tát Bổn Nguyện.

            Nguyện trên đền bốn ơn sâu,
            dưới cứu khổ tam  đồ,
            cầu cho pháp giới chúng sanh
            đồng thành Phật đạo.

            Nam mô Đại Bi Quan Thế Âm Bồ Tát.
            Nam mô Dược Sư Lưu Ly Quang Vương Phật.
            Nam mô Cầu Sám Hối Bồ Tát Ma Ha Tát. (3 lần)

            Nam mô Đại Nguyện Địa Tạng Vương Bồ Tát. (3 lần)
            Nam mô A Di Đà Phật. (3 lần)`}
            </p>

            <div
              style={{
                width: "100%",
                maxWidth: 700,
                margin: "20px auto",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              {savedData && !isEditing ? (
                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    padding: "20px",
                    borderRadius: "15px",
                    textAlign: "center",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  }}
                >
                  <p
                    style={{ margin: 0, fontWeight: "bold", fontSize: "22px" }}
                  >
                    Đã lưu: {savedData.chapter}
                  </p>
                  <p
                    style={{
                      margin: "10px 0 0 0",
                      fontSize: "16px",
                      opacity: 0.9,
                    }}
                  >
                    Thời gian: {savedData.time}
                  </p>
                  <button
                    onClick={() => setIsEditing(true)}
                    style={{
                      marginTop: "15px",
                      padding: "8px 25px",
                      backgroundColor: "transparent",
                      border: "1px solid #fff",
                      color: "#fff",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    Thay đổi
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    style={{
                      height: 45,
                      borderRadius: "12px",
                      border: "none",
                      padding: "0 15px",
                      fontSize: "16px",
                      backgroundColor: "#fff",
                      color: "#000",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Pháp danh"
                    value={phapdanh}
                    onChange={(e) => setPhapdanh(e.target.value)}
                    style={{
                      height: 45,
                      borderRadius: "12px",
                      border: "none",
                      padding: "0 15px",
                      fontSize: "16px",
                      backgroundColor: "#fff",
                      color: "#000",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Địa chỉ"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{
                      height: 45,
                      borderRadius: "12px",
                      border: "none",
                      padding: "0 15px",
                      fontSize: "16px",
                      backgroundColor: "#fff",
                      color: "#000",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    }}
                  />
                  <div style={{ display: "flex", gap: "10px" }}>
                    <select
                      value={selectedChapter}
                      onChange={(e) => setSelectedChapter(e.target.value)}
                      style={{
                        flex: 1,
                        height: 50,
                        borderRadius: "12px",
                        border: "none",
                        padding: "0 15px",
                        fontSize: "18px",
                        backgroundColor: "#fff",
                        color: "#000",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      }}
                    >
                      {Array.from({ length: 13 }, (_, i) => (
                        <option key={i + 1} value={`Phẩm ${i + 1}`}>
                          Phẩm {i + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleSave}
                      style={{
                        padding: "0 30px",
                        height: 50,
                        borderRadius: "12px",
                        border: "none",
                        backgroundColor: "#ff9800",
                        color: "#fff",
                        fontSize: "18px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                      }}
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              )}

              {/* Calendar Component */}
              <Calendar history={history} />
            </div>
          </>
        )}

        <button
          onClick={handleNumSaid}
          style={{
            marginTop: 30,
            padding: 15,
            width: "100%",
            borderRadius: "25px",
            border: "none",
            backgroundColor: "#4caf50",
            color: "#fff",
            fontSize: 22,
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          }}
        >
          Lần {numSaid}
        </button>
      </div>
    </div>
  );
}

function Calendar({ history }: { history: Array<{ date: string }> }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const markedDates = new Set(history.map((h) => h.date));

  const days = [];
  // Add empty slots for the first week
  for (let i = 0; i < startDay; i++) {
    days.push(
      <div key={`empty-${i}`} style={{ width: "14.28%", height: 40 }}></div>,
    );
  }

  // Add actual days
  for (let day = 1; day <= totalDays; day++) {
    const fullDateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const isMarked = markedDates.has(fullDateStr);
    const isToday = new Date().toISOString().split("T")[0] === fullDateStr;

    days.push(
      <div
        key={day}
        style={{
          width: "14.28%",
          height: 45,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontSize: "16px",
        }}
      >
        <div
          style={{
            width: 35,
            height: 35,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isMarked
              ? "#ff9800"
              : isToday
                ? "rgba(255,255,255,0.2)"
                : "transparent",
            color: isMarked ? "#fff" : "#fff",
            fontWeight: isMarked || isToday ? "bold" : "normal",
            border: isToday ? "1px solid #fff" : "none",
            boxShadow: isMarked ? "0 2px 8px rgba(255,152,0,0.5)" : "none",
          }}
        >
          {day}
        </div>
      </div>,
    );
  }

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: "15px",
        padding: "15px",
        marginTop: "10px",
        boxShadow: "inset 0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <button
          onClick={prevMonth}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          &lt;
        </button>
        <div style={{ fontWeight: "bold" }}>
          {monthNames[month]} {year}
        </div>
        <button
          onClick={nextMonth}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          &gt;
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "12px",
          opacity: 0.7,
          marginBottom: "5px",
        }}
      >
        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d) => (
          <div key={d} style={{ width: "14.28%" }}>
            {d}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>{days}</div>
    </div>
  );
}
