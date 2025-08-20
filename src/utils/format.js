// 가격 세자리마다 콤마 함수
export function formatPrice(num) {
  // 숫자가 아닌 다른 타입의 값이 들어오면 그대로 리턴시키는 장치
  if (typeof num !== 'number' ) return num;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
