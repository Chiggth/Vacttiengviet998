# V-ACT Tiếng Việt

Trang web tĩnh để học theo 8 chặng, đọc phần lý thuyết đã chắt lọc, xem ví dụ, làm câu hỏi, ôn thẻ ghi nhớ và trao đổi với trợ lý học tập.

## Mở trang

Mở `index.html` bằng trình duyệt hiện đại. Không cần cài thư viện hay khởi chạy máy chủ. Font DM Sans / Be Vietnam Pro tải từ Google Fonts khi có mạng; hệ thống có font dự phòng.

## Nội dung

- `content/theory.md`: bản chắt lọc lý thuyết trước khi đưa vào giao diện, kèm nguồn tham chiếu và ví dụ mới.
- `lessons.js`: dữ liệu 8 phần, ví dụ và câu hỏi có lời giải.
- `input/`: các bản Markdown đầu vào và `DESIGN.md` được giữ trong gói để đối chiếu.

Các bản đầu vào là trích xuất OCR nên có thể có lỗi nhận dạng. Nội dung học đã được chuẩn hóa và diễn giải ngắn gọn; nguồn tham chiếu nêu theo tên tài liệu và số trang để người học tra lại.

## Tính năng

- Lộ trình 8 phần, theo dõi tiến độ trong `localStorage` trên trình duyệt hiện tại.
- Ví dụ, trắc nghiệm có giải thích, thẻ ôn tập và tìm nội dung bằng điều hướng chương.
- Sinh câu hỏi và trợ lý hội thoại chạy cục bộ theo mẫu, dựa trên dữ liệu có sẵn.

**Giới hạn bản demo:** Chức năng gắn nhãn AI chưa kết nối mô hình hay dịch vụ bên ngoài. Không cần khóa API; câu trả lời và bài tập được dựng trong trình duyệt từ nội dung tĩnh.
