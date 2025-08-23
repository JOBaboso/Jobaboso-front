import React from 'react';
import ReactApexChart from 'react-apexcharts';

const StaffPage: React.FC = () => {
  // 도넛 차트 데이터
  const donutChartOptions = {
    series: [40, 19, 16, 17, 8],
    chart: {
      type: 'donut' as const,
      background: 'transparent',
      stroke: {
        width: 0,
      },
    },
    labels: ['대기업', '공기업', '중견기업', '스타트업', '기타'],
    colors: ['#1779FA', '#00228B', '#1153AA', '#85BAFF', '#00B1FF'],
    plotOptions: {
      pie: {
        stroke: {
          width: 0,
        },
        borderWidth: 0,
        distributed: true,
        donut: {
          size: '60%',
          stroke: {
            width: 0,
          },
          borderWidth: 0,
          labels: {
            show: true,
            total: {
              show: false,
              label: '총',
              fontSize: '16px',
              fontWeight: 600,
              color: '#fff',
            },
            value: {
              fontSize: '12px',
              color: '#fff',
            },
          },
        },
        dataLabels: {
          offset: 0,
          minAngleToShowLabel: 0,
          position: 'center',
        },
      },
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
      active: {
        filter: {
          type: 'none',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return Math.round(val).toString() + '%';
      },
      offsetY: 0,
      position: 'center',
      y: 30,
      style: {
        fontSize: '16px',
        fontWeight: 'normal',
        textShadow: 'none',
        filter: 'none',
      },
    },
    legend: {
      position: 'right' as const,
      offsetY: 40,
      labels: {
        colors: '#fff',
        fontSize: '12px',
      },
      markers: {
        size: 9,
        strokeWidth: 0,
        shape: 'square' as const,
        radius: 10,
        offsetX: -8,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 0,
        vertical: 6,
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            width: 1000,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div className="mx-auto w-[1360px]">
      <div className="items-center mb-8">
        <div className="mb-4 mt-8 text-[24px] font-bold text-gray-800 leading-[34px] tracking-[0%] font-['Pretendard']">
          부산대학교 정보컴퓨터공학과 취업 현황
        </div>
        <div className="text-bodyLg">
          우리 학교 우리 학과 학생들의 취업 현황만 열람할 수 있어요.
        </div>
      </div>

      {/* 통계 1행 */}
      <div className="grid grid-cols-[650px_310px_360px] gap-4 h-[310px]">
        {/* 졸업년도별 취업률 */}
        <div className="p-6 bg-gray-600 rounded-xl">
          <div className="mb-2 text-white text-h3">졸업년도별 취업률</div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <img src="/staff/ic_loading.svg"></img>
              <div className="text-white text-bodyMd">
                {new Date().toLocaleString('ko-KR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric', 
                  hour: 'numeric', 
                  minute: 'numeric',
                  hour12: true 
                })} 기준
              </div>
            </div>
            <div className="flex gap-2 items-center px-2 py-1 bg-gray-400 rounded-lg cursor-pointer">
              <span className="text-white text-bodySm">2025년</span>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {/* 전체 */}
            <div className="px-6 pt-6 pb-8 bg-gradient-to-b from-white to-gray-100 rounded-lg">
              <div className="mb-8 text-gray-700 text-h4">전체</div>
              <div className="flex justify-end">
                <div className="text-bodySm">200명 중</div>
                <div className="ml-1 font-bold text-bodySm">160명</div>
              </div>
              <div className="flex justify-end text-transparent bg-clip-text bg-gradient-to-b from-gray-700 to-mainBlue text-h1">80.0%</div>
            </div>
            {/* 남자 */}
            <div className="px-6 pt-6 pb-8 bg-gradient-to-b from-white to-gray-100 rounded-lg">
              <div className="mb-8 text-gray-700 text-h4">남자</div>
              <div className="flex justify-end">
                <div className="text-bodySm">150명 중</div>
                <div className="ml-1 font-bold text-bodySm">118명</div>
              </div>
              <div className="flex justify-end text-transparent bg-clip-text bg-gradient-to-b from-gray-700 to-mainBlue text-h1">78.6%</div>
            </div>
            {/* 여자 */}
            <div className="px-6 pt-6 pb-8 bg-gradient-to-b from-white to-gray-100 rounded-lg">
              <div className="mb-8 text-gray-700 text-h4">여자</div>
              <div className="flex justify-end">
                <div className="text-bodySm">50명 중</div>
                <div className="ml-1 font-bold text-bodySm">42명</div>
              </div>
              <div className="flex justify-end text-transparent bg-clip-text bg-gradient-to-b from-gray-700 to-mainBlue text-h1">84.0%</div>
            </div>
          </div>
        </div>

        {/* 평균 취준 기간 */}
        <div className="p-6 bg-gray-600 rounded-xl">
          <div className="mb-2 text-white text-h3">평균 취준 기간</div>
          <div className="mb-20 text-white text-bodyMd">전체 학생들의 평균 취준 기간이에요.</div>
          <div className="flex justify-end bg-gradient-to-b from-white to-subSkyBlue bg-clip-text text-transparent text-[52px] font-semibold">2.1년</div>
          <div className="flex justify-end text-white text-caption">*'취업 년도 - 졸업 년도' 기준</div>
        </div>

        {/* 목표 기업 분포 */}
        <div className="px-6 pt-6 bg-gray-600 rounded-xl">
          <div className="mb-4 text-white text-h3">목표 기업 분포</div>
          <div className="flex justify-center">
            <div className="[&_.apexcharts-pie]:!stroke-none [&_.apexcharts-donut]:!stroke-none [&_.apexcharts-slice]:!stroke-none [&_.apexcharts-arc]:!stroke-none [&_path]:!stroke-none [&_circle]:!stroke-none [&_.apexcharts-legend-marker]:!rounded-md [&_.apexcharts-legend-marker]:!border-radius-[6px] [&_.apexcharts-legend-marker]:!overflow-hidden [&_.apexcharts-legend-marker]:!border-white [&_.apexcharts-legend-marker]:!width-[9px] [&_.apexcharts-legend-marker]:!height-[9px] [&_.apexcharts-legend-marker]:!border-radius-[6px] [&_.apexcharts-legend-marker]:!border-[1.5px] [&_.apexcharts-datalabel]:!text-shadow-none [&_.apexcharts-datalabel]:!filter-none [&_.apexcharts-datalabel]:!drop-shadow-none [&_.apexcharts-datalabel]:!box-shadow-none [&_text]:!text-shadow-none [&_text]:!filter-none [&_text]:!drop-shadow-none [&_text]:!box-shadow-none">
              <ReactApexChart
                options={donutChartOptions}
                series={donutChartOptions.series}
                type="donut"
                width={345}
                height={345}
              />
            </div>
          </div>
        </div>
        
      </div>

      {/* 통계 2행 */}
      <div className="grid grid-cols-[370px_310px_360px] gap-4 mt-8 h-[310px]">
        {/* 기업 지역 분포 */}
        <div className="p-6 bg-gray-600 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <div className="text-white text-h3">기업 지역 분포</div>
            <div className="text-white text-bodySm">자세히 보기 ﹥</div>
          </div>
          <div className="mb-6 text-white text-bodyMd">전체 학생들의 합격 기업의 지역 분포예요.</div>
          <div className="flex justify-between items-center px-5 py-3 mb-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
            <div className="flex gap-2 items-center">
              <img src="/staff/ic_gold_medal.svg"></img>
              <div className="text-[16px] text-gray-700 font-medium">서울특별시</div>
            </div>
            <div className="text-gray-700 text-bodySm">41.2%</div>
          </div>
          <div className="flex justify-between items-center px-5 py-3 mb-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
            <div className="flex gap-2 items-center">
              <img src="/staff/ic_silver_medal.svg"></img>
              <div className="text-[16px] text-gray-700 font-medium">경기도 성남시</div>
            </div>
            <div className="text-gray-700 text-bodySm">12.1%</div>
          </div>
          <div className="flex justify-between items-center px-5 py-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
            <div className="flex gap-2 items-center">
              <img src="/staff/ic_bronze_medal.svg"></img>
              <div className="text-[16px] text-gray-700 font-medium">부산광역시</div>
            </div>
            <div className="text-gray-700 text-bodySm">10.9%</div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default StaffPage;
