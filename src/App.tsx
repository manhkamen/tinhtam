import { LunarCalendar } from "@dqcai/vn-lunar";
import { useState } from "react";

const CAN = [
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
const CHI = [
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

const CHI_MONTH = [
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

function jdFromDate(dd, mm, yy) {
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

function getTodayDayCanChi() {
  const now = new Date();
  const jd = jdFromDate(now.getDate(), now.getMonth() + 1, now.getFullYear());

  const can = CAN[(jd + 9) % 10];
  const chi = CHI[(jd + 1) % 12];

  return `${can} ${chi}`;
}

function getYearCanChi(year) {
  return `${CAN[(year + 6) % 10]} ${CHI[(year + 8) % 12]}`;
}

function getMonthCanChi(year, month) {
  const yearCanIndex = (year + 6) % 10;
  const firstMonthCanIndex = (yearCanIndex * 2 + 2) % 10;
  const monthCanIndex = (firstMonthCanIndex + month - 1) % 10;

  return `${CAN[monthCanIndex]} ${CHI_MONTH[month - 1]}`;
}

export default function App() {
  const today = LunarCalendar.today();

  const lunarDay = today.lunarDate.day;
  const lunarMonth = today.lunarDate.month;
  const lunarYear = today.lunarDate.year;

  const dayCanChi = getTodayDayCanChi();
  const monthCanChi = getMonthCanChi(lunarYear, lunarMonth);
  const yearCanChi = getYearCanChi(lunarYear);

  const [numSaid, setNumSaid] = useState(1);

  const handleNumSaid = () => {
    setNumSaid(numSaid === 1 ? 2 : 1);
  };

  return (
    <div
      style={{
        padding: 20,
        minHeight: "100vh",
        background: "#563060",
        color: "#fff",
        fontSize: 20,
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

Hôm nay ngày ${lunarDay} tháng ${lunarMonth} năm ${lunarYear}
tức Ngày ${dayCanChi} Tháng ${monthCanChi} Năm ${yearCanChi}.

Đệ tử con chí thành phát nguyện,
một lòng quy hướng Tam Bảo,
phát tâm trì tụng kinh điển,
tu học theo lời Phật dạy.

Ngưỡng nguyện mười phương chư Phật,
chư Đại Bồ Tát,
chư Hiền Thánh Tăng,
Long Thần Hộ Pháp từ bi gia hộ.

Nam mô Bổn Sư Thích Ca Mâu Ni Phật.
Nam mô A Di Đà Phật. (3 lần)`}
          </p>
        )}

        {numSaid === 2 && (
          <p style={{ whiteSpace: "pre-line" }}>
            {`Nam mô Bổn Sư Thích Ca Mâu Ni Phật. (3 lần)

Nam mô Đại Nguyện Địa Tạng Vương Bồ Tát. (3 lần)

Hôm nay ngày ${lunarDay} tháng ${lunarMonth} năm ${lunarYear}
tức Ngày ${dayCanChi} Tháng ${monthCanChi} Năm ${yearCanChi}.

Đệ tử con chí thành phát nguyện
trì tụng Chú Đại Bi và Kinh Địa Tạng.

Nguyện trên đền bốn trọng ân,
dưới cứu khổ ba đường,
cầu cho pháp giới chúng sinh
đồng thành Phật đạo.

Nam mô Đại Nguyện Địa Tạng Vương Bồ Tát. (3 lần)
Nam mô A Di Đà Phật. (3 lần)`}
          </p>
        )}

        <button
          onClick={handleNumSaid}
          style={{
            marginTop: 30,
            padding: 12,
            width: "100%",
            borderRadius: 20,
            border: "none",
            background: "green",
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
