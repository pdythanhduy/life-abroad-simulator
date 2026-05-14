# Scene background images

Đặt 6 file ảnh JPG vào folder này. Tên file phải khớp **chính xác**:

| File | Mô tả cảnh | Mood / gợi ý |
|---|---|---|
| `tiny_room.jpg` | Phòng trọ nhỏ ở Tokyo về đêm. Cửa sổ vuông phía trên có ánh đèn vàng ấm hắt vào. Futon trải sàn, bàn thấp, không bừa bộn. View nhìn từ giữa phòng ra. | Ấm + cô đơn nhẹ. Đêm khuya. |
| `konbini.jpg` | Bên trong konbini (FamilyMart / 7-Eleven) đêm khuya, không có khách. Đèn neon trắng trên trần. Kệ hàng hai bên, view từ quầy nhìn vào lối đi giữa. | Lonely Tokyo night. Sáng nhưng trống. |
| `station_night.jpg` | Sân ga JR/Yamanote 駅 về đêm. Đường ray chạy ngang dưới, đèn vàng platform, biển 駅 hoặc tên ga. Ít/không có người. Có thể có 1 đoàn tàu xa. | Tĩnh, gió, sắp về nhà nhưng không vội. |
| `office.jpg` | Văn phòng Nhật nhỏ sau giờ làm. Vài bàn làm việc xếp hàng, monitor đang sáng nhẹ, ghế xoay, không có người. Đèn trần hơi vàng. | Lặng. Office sau 9 giờ tối. |
| `rainy_street.jpg` | Phố Tokyo dưới mưa đêm. Đèn neon (kanji) phản chiếu trên vũng nước. Có thể có 1 ô dù xa, không nhìn rõ mặt. Asphalt ướt bóng. | Cinematic, blade-runner-ish, melancholy. |
| `cityhall.jpg` | Sảnh ward office Tokyo (役所 / 区役所). Quầy số (take-a-number machine), ghế chờ trống, đèn trần trắng. Tone xanh lạnh. | Quan liêu, sạch, hơi nặng nề. |

## Quy cách

- **Format:** JPG (`.jpg`). PNG cũng được nhưng JPG nhỏ hơn nhiều cho ảnh chụp.
- **Kích thước:** **1080×1920 pixel** (tỉ lệ dọc 9:16, vừa khít màn hình điện thoại). Nhỏ hơn cũng OK nhưng sẽ bị blur nếu < 720px chiều rộng.
- **Dung lượng:** Cố giữ < 300KB mỗi file (dùng [tinypng.com](https://tinypng.com) nén nếu nặng). Tổng 6 file < 2MB là đẹp.
- **Bố cục:** Không có chữ chèn lên ảnh (vì game sẽ phủ chat lên trên). Chừa khoảng 1/3 dưới ảnh tối hơn để text chat dễ đọc — nếu không, code đã tự thêm gradient tối từ dưới lên.

## Khi nào game sẽ thấy ảnh?

- File có → game tự dùng làm background fullscreen, fade in 700ms khi load xong.
- File thiếu → game fall back về SVG silhouette (đã có sẵn). Không crash, không cần code lại.

## Tìm ảnh ở đâu (free, dùng được thương mại)

1. **Unsplash** (https://unsplash.com) — search "tokyo apartment night", "konbini night", "tokyo station night", "tokyo rain neon", "japanese office", "japan ward office".
2. **Pexels** (https://pexels.com) — tương tự.
3. **AI generate**: Midjourney / DALL-E / Stable Diffusion với prompt kiểu *"tokyo small apartment at night, warm window light, futon on floor, no people, cinematic, vertical 9:16"*. Game vibe đang là realistic-cinematic, tránh anime style để không lệch tone.

Sau khi bỏ file vào, refresh trang là thấy. Không cần chạy lệnh build lại khi dev.
