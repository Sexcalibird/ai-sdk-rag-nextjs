export { default } from "next-auth/middleware";

// "/((?!api|_next|auth|signin).*)"
// export const config = { matcher: ["/((?!api|_next|auth|signin|public).*)"] };
export const config = { matcher: ["/((?!api/auth|_next|signin|public).*)"] };

[
        {
            "id": 5,
            "tieu_de": "Tôi muốn lắp đặt đồng hồ nước mới cần chuẩn bị những giấy tờ gì?",
            "noi_dung": "Quý khách cần chuẩn bị các giấy tờ sau:\n- Đối với khách hàng tư nhân: Giấy tờ tùy thân (CMND, CCCD, Căn cước, Hộ chiếu,...), Giấy tờ đất/nhà ở hợp lệ.\n- Đối với khách hàng cơ quan: Công văn đề nghị, đăng ký kinh doanh, giấy tờ đất/nhà ở hợp lệ. "
        },
        {
            "id": 6,
            "tieu_de": "Tôi nộp giấy tờ đăng ký lắp đặt đồng hồ nước mới ở đâu?",
            "noi_dung": "Quý khách đăng ký trực tuyến trên App Cấp nước Hải Phòng, trên website chính thức của Công ty CP Cấp nước Hải Phòng https://capnuochaiphong.com.vn/ hoặc trực tiếp tại trụ sở Công ty, chi nhánh cấp nước, tổ quản lý nước tại địa bàn. "
        },
        {
            "id": 7,
            "tieu_de": "Tôi muốn di chuyển vị trí đồng hồ trong khuôn viên đất/nhà ở.",
            "noi_dung": "Quý khách cần chuẩn bị: Giấy tờ tùy thân (đối với khách hàng tư nhân), Đăng ký kinh doanh (đối với khách hàng cơ quan), hợp đồng dịch vụ cấp nước. \nQuý khách có thể đăng ký trực tuyến trên app Cấp nước Hải Phòng, website Công ty hoặc trực tiếp tại trụ sở Công ty, chi nhánh cấp nước, tổ quản lý nước tại địa bàn. "
        },
        {
            "id": 8,
            "tieu_de": "Tôi muốn sang tên hợp đồng dịch vụ cấp nước.",
            "noi_dung": "Quý khách cần chuẩn bị các giấy tờ sau:\n- Đối với khách hàng tư nhân: Giấy tờ tùy thân (CMND, CCCD, Căn cước, Hộ chiếu,...), Giấy tờ đất/nhà ở hợp lệ.\n- Đối với khách hàng cơ quan: Công văn đề nghị, đăng ký kinh doanh, giấy tờ đất/nhà ở hợp lệ.\nQuý khách có thể đăng ký trực tuyến trên app Cấp nước Hải Phòng, website Công ty hoặc trực tiếp tại trụ sở Công ty, chi nhánh cấp nước, tổ quản lý nước tại địa bàn.  "
        },
        {
            "id": 9,
            "tieu_de": "Tôi có thể xem chỉ số nước sử dụng ở đâu?",
            "noi_dung": "Công ty cấp nước ghi chỉ số đồng hồ đo nước định kỳ hàng tháng. Quý khách có thể tra cứu trên:\n\n- App Cấp nước Hải Phòng: mục Hóa đơn\n- Website Công ty CP Cấp nước Hải Phòng: mục Tra cứu hóa đơn sử dụng nước \n- Hotline: 02253515858. "
        },
        {
            "id": 10,
            "tieu_de": "Các hình thức thanh toán tiền nước?",
            "noi_dung": "Quý khách có thể thanh toán tiền nước bằng 1 trong các phương thức sau:\n1. Ủy thác ngân hàng để tự động thanh toán hàng tháng;\n2. Thanh toán trực tuyến: qua ứng dụng ngân hàng, ví điện tử (Momo, VN Pay, VNPT Pay,...) hoặc website Công ty;\n3. Thanh toán qua các điểm thu hộ như siêu thị, cửa hàng công nghệ, ngân hàng, bưu điện,...\n\n🔔 Lưu ý quan trọng:\nHiện nay xuất hiện nhiều hình thức lừa đảo giả mạo thông báo nợ nước, gửi liên kết thanh toán giả hoặc mạo danh nhân viên cấp nước để thu tiền.\n➡️ Để an toàn và tiện lợi, Quý khách nên ưu tiên sử dụng hình thức ủy thác ngân hàng để tự động thanh toán tiền nước hàng tháng – không lo chậm hạn, không lo bị lừa đảo."
        },
        {
            "id": 11,
            "tieu_de": "Tôi không ở nhà, người khác thanh toán thay được không?",
            "noi_dung": "Có, Quý khách chỉ cần nhớ mã khách hàng (dãy gồm 7 số) , kiểm tra thông tin hóa đơn và tiến hành thanh toán qua các hình thức trên. "
        },
        {
            "id": 12,
            "tieu_de": "Tôi đã thanh toán nhưng vẫn nhận được thông báo nợ tiền nước?",
            "noi_dung": "Có thể do hệ thống chưa cập nhật. Quý khách vui lòng giữ lại chứng từ thanh toán và liên hệ Hotline 02253515858 để được kiểm tra và hỗ trợ."
        },
        {
            "id": 13,
            "tieu_de": "Tôi phát hiện mất nước, phải làm gì?",
            "noi_dung": "Quý khách kiểm tra thông báo tạm ngừng cấp nước/cấp nước không ổn định trên App Cấp nước Hải Phòng. Trường hợp không có thông tin, vui lòng chọn mục Báo sự cố trên App hoặc liên hệ Hotline 02253515858 để được hỗ trợ. "
        },
        {
            "id": 14,
            "tieu_de": "Nước chảy yếu, đục hoặc có mùi lạ, tôi phải xử lý thế nào?",
            "noi_dung": "Quý khách vui lòng báo ngay cho Công ty qua mục Báo sự cố trên app hoặc liên hệ Hotline 02253515858 để được hỗ trợ. "
        },
        {
            "id": 15,
            "tieu_de": "Không dùng nước mà đồng hồ vẫn quay số?",
            "noi_dung": "Quý khách vui lòng kiểm tra hệ thống cấp nước sau đồng hồ để tìm ra điểm rò rỉ và khắc phục hoặc liên hệ Hotline 02253515858 để được tư vấn. "
        },
        {
            "id": 16,
            "tieu_de": "Trường hợp đường ống cấp nước bị vỡ, rò rỉ thì ai chịu trách nhiệm sửa chữa?",
            "noi_dung": "- Đường ống cấp nước trước đồng hồ bị vỡ, rò rỉ: Công ty Cấp nước sẽ chịu trách nhiệm sửa chữa. \n- Hệ thống cấp nước sau đồng hồ bị vỡ, rò rỉ: Khách hàng tự sửa chữa, Công ty hỗ trợ khóa nước khi cần thiết."
        },
        {
            "id": 17,
            "tieu_de": "Đơn giá tiền nước hiện nay là bao nhiêu?",
            "noi_dung": "Giá nước được áp dụng theo Quyết định số 05/2024/QĐ-UBND ngày 19/02/2024 của UBND TP Hải Phòng như sau:\n🏠 Hộ dân cư tại khu vực đô thị\nMức đến 10 m³/ đồng hồ/ tháng: 10.900 đ/m³ \nTừ 10–20 m³/ đồng hồ/ tháng: 13.500 đ/m³ \n20–30 m³/ đồng hồ/ tháng: 18.000 đ/m³ \nTrên 30 m³/ đồng hồ/ tháng: 21.500 đ/m³ \n\n🏡 Hộ dân cư tại khu vực nông thôn\nMức đến 10 m³/ đồng hồ/ tháng: 9.000 đ/m³ \nTừ 10–20 m³/ đồng hồ/ tháng: 11.500 đ/m³ \n20–30 m³/ đồng hồ/ tháng: 15.000 đ/m³ \nTrên 30 m³/ đồng hồ/ tháng: 18.000 đ/m³ \n\n🏢 Đơn vị sự nghiệp, y tế, giáo dục: 16.300 đ/m³\n🏭 Sản xuất: 18.300 đ/m³\n🛒 Kinh doanh dịch vụ: 21.800 đ/m³\n\nGhi chú: Mức giá trên chưa bao gồm thuế Giá trị gia tăng, giá dịch vụ thoát nước, phí bảo vệ môi trường đối với nước thải sinh hoạt."
        },
        {
            "id": 18,
            "tieu_de": "Tôi bán nhà/xây nhà mới thì có cần xoá App Cấp nước không?",
            "noi_dung": "Nếu Quý khách bán nhà hoặc chuyển nhượng bất động sản, vui lòng thực hiện các bước sau:\n\n1.Liên hệ Công ty Cấp nước để làm thủ tục sang tên hợp đồng cho chủ sở hữu mới.\n\n2.Sau khi hoàn tất sang tên, Quý khách có thể xóa App Cấp nước nếu không còn sử dụng dịch vụ tại địa chỉ đó.\n\n3.Nếu Quý khách xây nhà mới, có thể tiếp tục sử dụng App hiện có để đăng ký lắp đặt đồng hồ nước mới tại địa chỉ mới.\n\n🔔 Lưu ý:\nKhông nên tự ý xóa App trước khi thực hiện sang tên hợp đồng để tránh mất quyền truy cập vào thông tin hợp đồng hiện tại."
        },
        {
            "id": 19,
            "tieu_de": "Tôi mới mua nhà thì cần làm gì để sử dụng App Cấp nước?",
            "noi_dung": "Khi Quý khách mua lại nhà có sẵn đồng hồ nước, vui lòng thực hiện các bước sau để đảm bảo quyền lợi và sử dụng dịch vụ cấp nước:\n\n1.Liên hệ Công ty Cấp nước để làm thủ tục sang tên hợp đồng dịch vụ cấp nước từ chủ cũ sang tên Quý khách.\n\n2. Sau khi hoàn tất thủ tục sang tên, Quý khách có thể:\n\n-Tải và đăng nhập App Cấp nước bằng thông tin mới\n\n-Theo dõi chỉ số nước, hóa đơn, và các tiện ích khác ngay trên App\n\n📱 Lưu ý: Nếu chủ cũ vẫn đăng nhập App bằng hợp đồng cũ, sau khi sang tên, hợp đồng cũ sẽ không còn hiệu lực đối với họ."
        }
    ]