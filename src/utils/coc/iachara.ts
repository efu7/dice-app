/**
 * いあきゃらのキャラクターURLかどうかを判定する
 */
export function isIacharaUrl(url: string): boolean {
  return /^https?:\/\/iachara\.com\/view\/\d+/.test(url);
}

/**
 * いあきゃらのURLからキャラクターIDを取得する
 *
 * 例：
 * https://iachara.com/view/13793972
 * ↓
 * "13793972"
 */
export function getIacharaCharacterId(
  url: string
): string | null {
  const match = url.match(
    /^https?:\/\/iachara\.com\/view\/(\d+)/
  );

  return match ? match[1] : null;
}