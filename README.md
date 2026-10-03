# Hướng dẫn deploy Chợ Vé Ăn lên GitHub Pages + cài đặt app

## 1. Đưa 6 file lên GitHub
1. Tạo **repo riêng** cho app này (ví dụ `cho-ve-an`), public. Không dùng repo `<user>.github.io` và không đặt chung repo với app/portal khác.
2. Đẩy 6 file `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` lên **thư mục gốc** repo.
3. Settings → Pages → Source: branch `main`, thư mục `/ (root)` → Save.
4. Đợi vài phút, mở `https://<username>.github.io/cho-ve-an/`.
Vì `start_url`/`scope` dùng đường dẫn tương đối nên không cần sửa gì thêm.

## 2. Cài trên Android (Chrome)
Mở link → menu 3 chấm → "Cài đặt ứng dụng" / "Thêm vào Màn hình chính".

## 3. Cài trên Windows 11 (Edge/Chrome)
Mở link → icon "Cài đặt" trên thanh địa chỉ (hoặc menu → Ứng dụng → Cài đặt trang này như một ứng dụng).

## 4. Kiểm tra PWA
F12 → Lighthouse → chọn "Progressive Web App" → Analyze.

## 5. Cập nhật phiên bản sau này
Chỉ thay nội dung `index.html` và đổi `v1` → `v2` trong `CACHE_NAME` ở `sw.js`. Giữ nguyên `id`, `name`, `start_url`, `scope`, tên file icon.

## 6. Nếu Chrome Android báo "Ứng dụng này đã được cài đặt rồi" nhưng không mở được
a. Xuất/sao lưu dữ liệu trong app trước, không bấm nút đặt lại.
b. Cài đặt → Ứng dụng: gỡ mục "Chợ Vé Ăn" (và portal nếu có).
c. Đóng hẳn Chrome rồi mở lại link.
d. Nếu vẫn không thấy "Cài đặt ứng dụng": kiểm tra scope/id không trùng hoặc lồng với app khác cùng domain.
e. Chỉ khi vẫn kẹt mới xoá dữ liệu Chrome / cài lại Chrome. Cách này xoá luôn localStorage của mọi app trên domain, nên bắt buộc sao lưu trước.

## Lưu ý
- Mở bằng double-click (`file://`) vẫn chạy bình thường, không đăng ký service worker.
- Dữ liệu lưu trong localStorage của trình duyệt, service worker không đụng tới.
