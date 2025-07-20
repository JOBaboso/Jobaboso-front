import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import './CustomCalendar.css'; // 스타일 커스텀용
import { Callout } from '@components/common/Callout';
import { InfoTooltip } from '@components/my/InfoTooltip';

type ScheduleType = '서류' | '면접';

interface Schedule {
  date: string; // 'YYYY-MM-DD'
  type: ScheduleType;
  label: string;
}

// 더미 일정 데이터
const schedules: Schedule[] = [
  { date: '2025-07-01', type: '서류', label: '어쩌구저쩌구 회사' },
  { date: '2025-07-01', type: '면접', label: '어쩌구저쩌구 회사' },
  { date: '2025-07-08', type: '서류', label: '어쩌구저쩌구 회사' },
  { date: '2025-07-14', type: '면접', label: '어쩌구저쩌구 회사' },
  { date: '2025-07-23', type: '서류', label: '어쩌구저쩌구 회사' },
];

const getSchedulesByDate = (date: Date) => {
  const dateStr = dayjs(date).format('YYYY-MM-DD');
  return schedules.filter((s) => s.date === dateStr);
};

const CalendarPage = () => {
  const [value, setValue] = useState(new Date());

  const handlePrevMonth = () => {
    setValue((prev) => dayjs(prev).subtract(1, 'month').toDate());
  };

  const handleNextMonth = () => {
    setValue((prev) => dayjs(prev).add(1, 'month').toDate());
  };

  const handleToday = () => {
    setValue(new Date());
  };

  return (
    <div className="mx-auto w-[1211px]">
      <h2 className="mb-8 text-[40px] font-bold text-gray-800">캘린더</h2>

      <Callout text="김잡메 님의 취업 일정과 관련된 내용이 캘린더에 노출돼요." />

      {/* ✅ 커스텀 달 네비게이션 */}
      <div className="mb-2 mt-8 flex items-center justify-between">
        <div className="flex items-center gap-1 text-h2 text-gray-800">
          {dayjs(value).format('YYYY년 M월')}
          <div className="group peer relative">
            <InfoTooltip />
          </div>
        </div>
        <div className="flex items-center gap-1 text-h4 text-gray-800">
          <button onClick={handlePrevMonth} className="hover:text-black">
            &lt;
          </button>
          <button onClick={handleToday} className="px-2 font-medium hover:text-black">
            오늘
          </button>
          <button onClick={handleNextMonth} className="hover:text-black">
            &gt;
          </button>
        </div>
      </div>

      <Calendar
        locale="ko"
        calendarType="gregory"
        showNavigation={false} // 이미 설정하셨다면 유지
        selectRange={false}
        onClickDay={() => {}} // 클릭 무시
        tileContent={({ date }) => {
          const daySchedules = getSchedulesByDate(date);
          return (
            <div className="mt-1 space-y-1">
              {daySchedules.map((s, i) => (
                <div
                  key={i}
                  className={`rounded px-1 text-[14px] ${
                    s.type === '서류'
                      ? 'bg-[#FFF3C9] text-[#B7962C]'
                      : 'bg-subLightBlue text-mainBlue'
                  } overflow-hidden truncate text-ellipsis whitespace-nowrap`}
                >
                  [{s.type}] {s.label}
                </div>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
};

export default CalendarPage;
