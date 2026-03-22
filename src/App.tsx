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
  const [savedData, setSavedData] = useState<{ chapter: string; time: string } | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("niem_phat_save");
    if (saved) {
      setSavedData(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    const data = {
      chapter: selectedChapter,
      time: new Date().toLocaleString("vi-VN"),
    };
    localStorage.setItem("niem_phat_save", JSON.stringify(data));
    setSavedData(data);
    setIsEditing(false);
  };

  const handleNumSaid = (): void => {
    setNumSaid(numSaid === 1 ? 2 : 1);
  };

  return (
    <div
      style={{
        padding: 20,
        minHeight: "100vh",
        backgroundColor: "#563060",
        color: "#fff",
        fontSize: 20,
        width: '100vw',
        lineHeight: 1.6,
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

Đệ tử con tên là: Nguyễn Công Mạnh
(Pháp danh: Chúc Lực)
cư ngụ tại số nhà 15, đường Tế Hanh, phường Hòa Xuân, quận Cẩm Lệ, tp Đà Nẵng


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

Đệ tử con tên là: Nguyễn Công Mạnh
(Pháp danh: Chúc Lực)
cư ngụ tại số nhà 15, đường Tế Hanh, phường Hòa Xuân, quận Cẩm Lệ, tp Đà Nẵng

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

            <div style={{ width: '96%', maxWidth: 700, margin: "20px auto", display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {savedData && !isEditing ? (
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Đã lưu: {savedData.chapter}</p>
                  <p style={{ margin: '5px 0 0 0', fontSize: '16px', opacity: 0.8 }}>Thời gian: {savedData.time}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    style={{
                      marginTop: '10px',
                      padding: '5px 15px',
                      backgroundColor: 'transparent',
                      border: '1px solid #fff',
                      color: '#fff',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Thay đổi
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <select
                    value={selectedChapter}
                    onChange={(e) => setSelectedChapter(e.target.value)}
                    style={{
                      flex: 1,
                      height: 45,
                      borderRadius: '10px',
                      border: 'none',
                      padding: '0 10px',
                      fontSize: '18px',
                      backgroundColor: '#fff',
                      color: '#000'
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
                      padding: '0 20px',
                      height: 45,
                      borderRadius: '10px',
                      border: 'none',
                      backgroundColor: '#ff9800',
                      color: '#fff',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Lưu
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        <button
          onClick={handleNumSaid}
          style={{
            marginTop: 30,
            padding: 12,
            width: "100%",
            borderRadius: 20,
            border: "none",
            backgroundColor: "green",
            color: "#fff",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          Lần {numSaid}
        </button>
      </div>
    </div>
  );
}

