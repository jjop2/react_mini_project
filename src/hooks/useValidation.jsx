import { useState } from "react";

const regexs ={
  lastName: /^[a-zA-Z가-힣]+$/,
  firstName: /^[a-zA-Z가-힣]+$/,
  email: /^([a-z]+\d*)+(\.?\w+)+@\w+(\.\w{2,3})+$/,
  phone: /^\d{9,15}$/,
  creditNum1: /^\d{4}$/,
  creditNum2: /^\d{4}$/,
  creditNum3: /^\d{4}$/,
  creditNum4: /^\d{4}$/,
  rsvnNum: /^\d{10}$/
  // 나중에 id, pw 추가
};

export function useValidation(initialFields) {

  // 유효성 검사 결과 상태
  const [isRight, setIsRight] = useState(
    Object.fromEntries(initialFields.map(f => [f, false]))
  );
  
  // 유효성 검사 시작 상태
  const [testStart, setTestStart] = useState(
    Object.fromEntries(initialFields.map(f => [f, false]))
  );

  // 유효성 검사
  const validate = (name, value) => {
    const regex = regexs[name];
    
    if(!regex)
      setIsRight(prev => ({...prev, [name]: value})); // 약관 동의 등 regex 없는 항목
    else
      setIsRight(prev => ({...prev, [name]: regex.test(value)}));
  }

  // 유효성 검사 시작
  const startTest = () => {
    setTestStart(Object.fromEntries(initialFields.map(f => [f, true])));
  };

  // 유효성 검사 전체 완료 여부
  const isAllValid = Object.values(isRight).every(Boolean);

  return { isRight, testStart, validate, startTest, isAllValid };

}