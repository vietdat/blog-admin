# Survey saurus

Welcome to surveysaurus

## Installation

Intall node-module
```bash
npm install
```
Start server
```bash
npm start
```

## Role based access control (RBAC)
- RBAC là hình thức phân quyền dựa vào vai, mỗi vai sẽ có nhiều quyền. Một đối tượng sẽ có thể có nhiều vai.
- Ví dụ:
  >User A có quyền admin, user. Admin có thể tạo và xoá. User có quyền đọc. => User A có quyền tạo, xoá, đọc.

## Cách hiện thực RBAC (Trong trường hợp đơn giản với 4 quyền thêm, xoá, sửa, đọc)
1. Tạo 1 field tên là roles: [String] trong bảng User.
2. Tạo 1 bảng tên Role. (Dùng để lưu quyền từng role).
```bash
Role
id: ObjectId,
name: String (uniq)
permissions: [String] (Enum: Create, edit, read, delete)
```
Mỗi user sẽ được gán 1 hoặc nhiều role. Trước khi vào server làm 1 action nào đó user sẽ bị chặn lại và xem user role gì? Lấy tất cả roles user và table ROLES và lấy permissions ta được danh sách permissions. Nếu permission chứa:
```bash
 Read: Được quyền đọc.
 Create: Được quyền tạo.
 Delete: Được quyền xoá.
 Edit: Được quyền sửa.
```
Với code trên: trong file *composer.js* có định nghĩa query, mutation. Trước mỗi action đó ta check xem user có quyền hay không rồi trả về kết quả tương ứng.

## Mở rộng RBAC
Ta có thể mở rộng: Mỗi role được quyền cập nhật từng field của từng table khác nhau bằng cách thêm field vào table ROLES ở trên:
```bash
Role
id: ObjectId,
name: String (uniq)
permissions: [String] (Enum: Create, edit, read, delete)
tables: [{
  name: String // Table name
  fieldRead: [String] // danh sách field có thể trả về cho user.
  fieldUpdate: [String] // Danh sách field user có thể sửa.
}]
```
1. Sau khi query ra dữ liệu xem thử user không có quyền đọc field nào thì delete trước khi trả về. (trong code có hiện thực sẵn 2 middleware là beforeFindById và afterFindById)
2. Trước khi update kiểm tra xem user có được update field nào? nếu không được quyền thì trả lỗi về. (Trong có có hiện thực sẵn beforUpdateById).


## Scale in AWS
AWS có cung cấp tính năng *auto scale group* khi cấu hình instance. Để cấu hình *auto scale group* cần xác định số lượng tối thiểu của instance để duy trì và số lượng tối đa. Tính năng auto scale group trong AWS có ưu điểm tự phát hiện ra instance bị lỗi và chấm dứt nó, đảm bảo luôn đủ dung lượng để đáp ứng nhu cầu hiện tại, tiết kiệm tiền bằng cách khởi tạo khi cần và tự động tắt khi không cần.

- Cách AWS auto scale hoạt động:
1. Xác định một phiên bản AMI và tạo auto scale group để khởi chạy các phiên bản.
2. Các phiên bản EC2 sẽ khởi chạy phía sau Electric load balancer (ELB) đã xác định.
3. ELB sẽ gửi lưu lượng truy cập theo tuần tự. EC2 nào không phản hồi, ELB sẽ phát hiện nó và khởi chạy thay thế.
4. Có thể cấu hình để Amazon Simple Notification Service để gửi email khi có vấn đề tự động scale.


## Timeline
1. Init project frontend - 2h
2. Develop form signup and logic - 4h
3. Init project backend - 2h
4. Develop grapql and add user model - 4h
5. Awnser question 3 and question 4 (backend) - 2h
## License
[MIT](https://choosealicense.com/licenses/mit/)
