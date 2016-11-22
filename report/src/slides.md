<!--
page_number: true
$theme: gaia
template: gaia
$width: 1920
$height: 1200
-->

Swarm Intelligence
====================

Giáo viên hướng dẫn: Thân Quang Khoát

Nhóm số 5:

1. Nguyễn Quốc Anh  
  `MSSV: 20140149`

2. Phùng Đức Nhật  
  `MSSV: 20143321`

3. Lưu Minh Hồng
  `MSSV: 20169572` 


---

<!--
template: default
-->

Tại sao lại sử dụng mô hình swarm intelligence?
-----------------------------------------------

<div style="display: flex; justify-content: center">
	<img src="symbrion.jpg" alt="Symbrion">
</div>

---

<!--
- Mô phỏng lại dựa trên mô hình trong tự nhiên
- Sử dụng mô hình để giải bài toán thực tế
-->

Mô phỏng lại dựa trên mô hình thực tế trong tự nhiên
----------------------------------------------------

<div style="display: flex; justify-content: center;">
	<div style="
      width:  900px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;">
    	<img src="boids.png">
    </div>
</div>

---

Sử dụng mô hình để nâng cao hiệu năng
-------------------------------------

- Thuật toán Stochastic Diffusion Search

- Thuật toán Ant Colony Algorithm - _ACO_

---

Thuật toán ACO
--------------

$$
AS => ACO => \left\{
				\begin{array}{ll}
					Elitist \space Ant \space System\\
                    \\
					Min-max \space Ant \space System (MMAS)\\
                    \\
					Ant \space Colony \space System (ACS)\\
                    \\
					Rank-based \space Ant \space System (ASrank)\\
					\\
                    Continuous \space orthogonal \space ant\\
                    colony (COAC)\\
				\end{array}
			\right.

$$
---

Mô hình Ant System - _AS_
------------------------

- Cho một số lượng kiến ngẫu nhiên

- Nếu tìm thấy thức ăn sẽ đưa thức ăn về tổ

- Trên đường đưa về tổ sẽ thả chất pheromone để đánh dấu đường đi

- Lượng pheromone nhả ra phụ thuộc vào thức ăn
<!-- Có thể optimize được quãng đường -->

---

Mô hình Ant System
------------------

- Những con kiến khác đi qua pheromone sẽ đi theo pheromone

- Càng nhiều kiến đi theo thì pheromone trên tuyến đường các tăng

- Lượng pheromone càng nhiều thì càng hấp dẫn các con khác đến

- Khi lượng thức ăn hết thì pheromone sẽ bay hơi dần

---

Mô hình Ant System
------------------

- Không phù hợp với các bài toán thực tế

- Chi phí cao

- Khó triển khai

---

Mô hình Ant Colony Optimization - _ACO_
---------------------------------------

- Được tạo ra với mục đích riêng

- Giải bài toán Travel Saleman Problem (TSP)

---

Travel Saleman Problem - _TSP_
------------------------------

- Một người đưa pizza phải giao pizza cho tất cả các khách hàng rồi quay trở về hàng ăn sao quãng đường là ngắn nhất

- Giả sử luôn tồn tại đường đi giữa hai địa chỉ cần giao hàng

---

Thuật toán
----------

- Extract Algorithm

- Nearest Neighboor

- Christofides' algorithm for the TSP

- 2-OPT Complete

- Ant Colony Algorithm

---

Nearest Neighboor - _NN_
------------------------

- Tại mỗi điểm chọn ra điểm gần nhất và thăm điểm đó

<div style="display: flex; justify-content: center">
	<img src="nearestneighbor.gif" alt="Nearest Neighboor" height="600px"">
</div>

