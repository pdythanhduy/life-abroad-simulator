import type { EndingId, Stats } from "../types/game";

export interface EndingInfo {
  id: EndingId;
  title: string;
  subtitle: string;
  body: string;
}

export const ENDINGS: Record<EndingId, EndingInfo> = {
  burnout: {
    id: "burnout",
    title: "Burnout",
    subtitle: "Cơ thể nói 'đủ rồi' trước cả bạn.",
    body:
      "Sáng ngày thứ tám, bạn không dậy nổi. Đèn trần vẫn sáng từ đêm qua.\n" +
      "Tin nhắn của mẹ nằm im trong điện thoại, chưa mở.\n" +
      "Bạn không về, không ở lại. Bạn chỉ tắt mọi thứ một lúc — và một lúc đó kéo rất dài.",
  },
  gohome: {
    id: "gohome",
    title: "Go Home",
    subtitle: "Không phải ai cũng phải chứng minh điều gì.",
    body:
      "Bạn đặt vé một chiều. Vali nhẹ hơn lúc đến.\n" +
      "Bà Sato đưa bạn một hộp okazu để ăn dọc đường.\n" +
      "Ở sân bay, mẹ không hỏi tại sao. Mẹ chỉ ôm. Có những trở về không phải là thua.",
  },
  survive: {
    id: "survive",
    title: "Survive",
    subtitle: "Bạn vẫn ở đây. Đã đủ rồi.",
    body:
      "Hết tuần đầu. Bạn vẫn còn tiền ăn, vẫn dậy nổi, vẫn biết đường về phòng.\n" +
      "Chưa thuộc về, chưa giỏi tiếng, chưa nhiều bạn. Nhưng còn ở đây.\n" +
      "Đôi khi survive là một dạng dũng cảm rất ít ai thấy.",
  },
  growth: {
    id: "growth",
    title: "Growth",
    subtitle: "Bạn không còn là bạn của tuần trước.",
    body:
      "Bạn bắt đầu hiểu cách đọc hóa đơn. Biết cúi chào đúng góc.\n" +
      "Manager bớt khó. Đồng nghiệp nhớ tên bạn.\n" +
      "Chưa hạnh phúc lắm — nhưng đã thấy mình lớn lên một chút, mỗi ngày một chút.",
  },
  belonging: {
    id: "belonging",
    title: "Belonging",
    subtitle: "Một nơi xa, một lý do để ở lại.",
    body:
      "Bà Sato gọi bạn bằng tên. Kenta rủ đi izakaya. Linh nhắn 'cuối tuần qua tao nha'.\n" +
      "Mẹ video call, bạn không giấu mệt nữa — bạn cười thật.\n" +
      "Tokyo vẫn không phải nhà. Nhưng tuần này, có một góc nhỏ là của bạn.",
  },
};

export function resolveEnding(stats: Stats): EndingId {
  if (stats.energy < 25 || stats.stress > 80) return "burnout";
  if (stats.money < 15 || stats.relationship < 20) return "gohome";
  if (stats.language >= 60 && stats.relationship >= 60) return "belonging";
  if (stats.money >= 50 && stats.language >= 45 && stats.stress < 60) return "growth";
  return "survive";
}
