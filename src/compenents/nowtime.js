import React, { useState, useEffect } from "react";

function isBusinessDay(date) {
  // 한국 공휴일 정보
  const holidays = [
    "2023-06-06", // 현충일
    "2023-07-17", // 제헌절
    // 추가적인 공휴일 정보를 필요에 따라 여기에 추가할 수 있습니다.
  ];

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateString = `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;

  // 주말인지 확인
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return false;
  }

  // 공휴일인지 확인
  if (holidays.includes(dateString)) {
    return false;
  }

  return true;
}

function NowTime() {
  const [remainingTime, setRemainingTime] = useState("");
  const [businessDay, setBusinessDay] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nowTime = new Date();
      const nowHour = nowTime.getHours();
      const nowMinutes = nowTime.getMinutes();
      const nowSeconds = nowTime.getSeconds();

      const startTime = { hour: 9, minutes: 0, second: 0 };
      const endTime = { hour: 15, minutes: 30, second: 0 };

      if (!isBusinessDay(nowTime)) {
        setBusinessDay(false);
        clearInterval(intervalId);
        return;
      }

      let remainHour, remainMinutes, remainSeconds, startEnd;
      if (
        (nowHour > 9 && nowHour < 15) ||
        (nowHour === 9 && nowMinutes >= 0) ||
        (nowHour === 15 && nowMinutes < 30)
      ) {
        remainHour = endTime.hour - nowHour;
        remainMinutes = endTime.minutes - nowMinutes;
        remainSeconds = endTime.second - nowSeconds;
        startEnd = "마감";
      } else {
        remainHour = startTime.hour - nowHour;
        remainMinutes = startTime.minutes - nowMinutes;
        remainSeconds = startTime.second - nowSeconds;
        startEnd = "시작";
      }
      if (remainSeconds < 0) {
        remainSeconds += 60;
        remainMinutes--;
      }
      if (remainMinutes < 0) {
        remainMinutes += 60;
        remainHour--;
      }
      if (remainHour < 0) remainHour += 24;

      if (remainHour < 10) remainHour = "0" + remainHour;
      if (remainMinutes < 10) remainMinutes = "0" + remainMinutes;
      if (remainSeconds < 10) remainSeconds = "0" + remainSeconds;
      const remainingTimeString = `장 ${startEnd}까지 ${remainHour}:${remainMinutes}:${remainSeconds}`;
      setRemainingTime(remainingTimeString);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (!businessDay) {
    return <div>주식시장 영업일이 아닙니다.</div>;
  }

  return <div>{remainingTime}</div>;
}

export default NowTime;
