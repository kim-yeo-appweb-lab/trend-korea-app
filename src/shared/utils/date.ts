/**
 * 날짜/시간 포맷팅 유틸리티
 * SSR/CSR 일관성 보장을 위해 수동 포맷팅 사용
 */

/**
 * 시간을 "오전/오후 HH:MM" 형식으로 포맷팅
 * @example formatTime(new Date("2025-01-15T14:30:00")) // "오후 02:30"
 */
export function formatTime(date: Date | string): string {
	const d = typeof date === "string" ? new Date(date) : date;
	const hours = d.getHours();
	const minutes = d.getMinutes();

	const period = hours >= 12 ? "오후" : "오전";
	const displayHours = hours % 12 || 12;

	return `${period} ${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

/**
 * 날짜를 "M월 D일" 형식으로 포맷팅
 * @example formatDate(new Date("2025-01-15")) // "1월 15일"
 */
export function formatDate(date: Date | string): string {
	const d = typeof date === "string" ? new Date(date) : date;
	const month = d.getMonth() + 1;
	const day = d.getDate();

	return `${month}월 ${day}일`;
}

/**
 * 날짜와 시간을 "M월 D일 오전/오후 HH:MM" 형식으로 포맷팅
 * @example formatDateTime(new Date("2025-01-15T14:30:00")) // "1월 15일 오후 02:30"
 */
export function formatDateTime(date: Date | string): string {
	const d = typeof date === "string" ? new Date(date) : date;
	return `${formatDate(d)} ${formatTime(d)}`;
}

/**
 * 숫자를 천 단위 구분 기호로 포맷팅 (SSR/CSR 일관성 보장)
 * @example formatNumber(1234567) // "1,234,567"
 */
export function formatNumber(num: number): string {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
