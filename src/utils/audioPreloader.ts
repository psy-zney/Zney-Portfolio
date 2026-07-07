let cachedBlobUrl: string | null = null;
let sharedAudioInstance: HTMLAudioElement | null = null;
let preloadPromise: Promise<string> | null = null;

/**
 * Preload Intro.mp3 vào RAM ngay từ thời điểm ứng dụng (trang web) khởi chạy.
 * Lưu file dưới dạng Blob in-memory và giải mã sẵn vào buffer,
 * giúp khi người dùng nhấn vào workspace/intro là phát lập tức không độ trễ (0ms).
 */
export function preloadIntroAudio(): Promise<string> {
  if (cachedBlobUrl) {
    return Promise.resolve(cachedBlobUrl);
  }
  if (preloadPromise) {
    return preloadPromise;
  }

  preloadPromise = (async () => {
    try {
      const response = await fetch('./Intro.mp3');
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      const blob = await response.blob();
      cachedBlobUrl = URL.createObjectURL(blob);

      // Tạo trước HTMLAudioElement và gọi .load() để trình duyệt giải mã header/audio trên RAM
      if (!sharedAudioInstance) {
        sharedAudioInstance = new Audio(cachedBlobUrl);
      } else if (sharedAudioInstance.src !== cachedBlobUrl && sharedAudioInstance.paused) {
        sharedAudioInstance.src = cachedBlobUrl;
      }
      sharedAudioInstance.preload = 'auto';
      sharedAudioInstance.loop = true;
      if (sharedAudioInstance.paused) {
        sharedAudioInstance.volume = 0;
        sharedAudioInstance.load();
      }

      return cachedBlobUrl;
    } catch (err) {
      console.warn('Không thể tải Intro.mp3 vào RAM, chuyển qua URL trực tiếp:', err);
      return './Intro.mp3';
    }
  })();

  return preloadPromise;
}

/**
 * Trả về instance HTMLAudioElement đã được preload và cấu hình sẵn từ RAM.
 */
export function getPreloadedIntroAudio(): HTMLAudioElement {
  if (!sharedAudioInstance) {
    sharedAudioInstance = new Audio(cachedBlobUrl || './Intro.mp3');
  } else if (cachedBlobUrl && sharedAudioInstance.src !== cachedBlobUrl) {
    sharedAudioInstance.src = cachedBlobUrl;
    sharedAudioInstance.load();
  }

  sharedAudioInstance.preload = 'auto';
  sharedAudioInstance.loop = true;
  if (sharedAudioInstance.paused) {
    sharedAudioInstance.volume = 0;
  }

  if (sharedAudioInstance.paused) {
    try {
      sharedAudioInstance.currentTime = 0;
    } catch {
      // Bỏ qua nếu audio chưa sẵn sàng
    }
  }

  // Nếu trong trường hợp vào thẳng trang mà audio vẫn đang tải vào RAM,
  // khi tải xong sẽ tự động nâng cấp sang nguồn RAM (nếu audio đang paused)
  if (!cachedBlobUrl && preloadPromise) {
    preloadPromise.then((url) => {
      if (
        url &&
        url !== './Intro.mp3' &&
        sharedAudioInstance &&
        sharedAudioInstance.src !== url &&
        sharedAudioInstance.paused
      ) {
        sharedAudioInstance.src = url;
        sharedAudioInstance.load();
      }
    });
  }

  return sharedAudioInstance;
}

// Tự động kích hoạt tải vào RAM ngay khi module được import
void preloadIntroAudio();

export function startIntroAudioFromGesture(targetVolume = 0.9): void {
  const audio = getPreloadedIntroAudio();
  audio.loop = true;
  audio.muted = false;
  audio.volume = Math.max(audio.volume, Math.min(1, targetVolume));
  void audio.play().catch(() => undefined);
}