Boids
=====

Giới thiệu
----------

- Là mô hình được xây dựng để mô phỏng lại tập tính bầy đàn của động vật

- Được phát triển vào năm 1986, trong điều kiện là các chương trình mô phỏng còn hạn chế. Thường không có các tác nhân như lực tác động hay tính toán va chạm

- Mô hình chỉ đơn giản là mô tả làm sao cho giống chuyển động của bầy cá hoặc bầy chim trong tự nhiên

Mô tả
-----

Boids là một tác tử đại diện cho một con vật trong đàn

Mỗi tác tử trên tuân theo ba luật lệ sau:

- **Separation** : Lái nghiêng đi để tránh đám đông

- **Aligment** : Hướng về hướng chung của bầy đàn

- **Cohension** : Bay sát về phía trung tâm của bầy đàn

Mỗi tác tử có khả năng truy cập trực tiếp vào tất cả yếu tố đồ họa của khung hình. Tuy nhiên tập tính bầy đàn chỉ có phép tác tử phản ứng cục bộ ở bên trong vùng lân cận.

Vùng lân cận được xác định bởi một bán kính khoảng cách xung quanh tác tử và góc nhìn (trừ đi khoảng mù phía sau của tác tử đó).

Pseudocode
----------



Reference
---------

Homepage: http://www.red3d.com/cwr/boids/

Wiki:

- [Boids]

[Boids]: https://en.wikipedia.org/wiki/Boids

Pseudocode:

- [KFish]

[KFish]: http://www.kfish.org/boids/pseudocode.html