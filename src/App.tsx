import { LunarCalendar } from "@dqcai/vn-lunar";
import { useState } from "react";

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
            <input placeholder="chapter" style={{ width: '96%', maxWidth: 700, margin: "0 auto", height: 40 }} />
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
