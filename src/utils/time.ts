/**
 * 시간 문자열을 초 단위로 변환합니다.
 *
 * @param {string} time - "MM:SS" 형식의 시간 문자열 (예: "01:30", "12:05")
 * @returns {number} 변환된 초 단위 시간
 *
 * @description
 * - 입력 형식: "MM:SS" (분:초)
 * - 분과 초는 숫자 형태여야 합니다
 * - 잘못된 형식의 입력 시 NaN이 반환될 수 있습니다
 *
 * @example
 * timeStringToSeconds("01:30") // returns 90
 * timeStringToSeconds("00:45") // returns 45
 * timeStringToSeconds("10:00") // returns 600
 */
export function timeStringToSeconds(time: string): number {
  const [minutes, seconds] = time.split(':').map(Number);
  return minutes * 60 + seconds;
}
