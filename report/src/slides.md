<!--
page_number: true
$theme: gaia
template: gaia
-->

# Swarm Intelligence
====================

---

<!--
template: default
-->

Tại sao lại sử dụng mô hình swarm intelligence?
-----------------------------------------------

![]()

<!-- Hình mấy con robot đẩy nhau qua tường -->

---

<!--
- Mô phỏng lại dựa trên mô hình trong tự nhiên
- Sử dụng mô hình để giải bài toán thực tế
-->

---

Mô phỏng lại dựa trên mô hình thực tế trong tự nhiên
----------------------------------------------------

- Mô hình Boids

---

Sử dụng mô hình để nâng cao hiệu năng
-------------------------------------

- Thuật toán stochastic search

- Thuật toán Ant Colony Algorithm - _ACO_

---

Thuật toán ACO
--------------

```javascript
AS => ACO => {
	MMAS
	ACS
	...
}
```
---

Mô hình Ant System - _AS_
------------------------

Cho một số lượng kiến ngẫu nhiên

Nếu tìm thấy thức ăn sẽ đưa thức ăn về tổ

Trên đường đưa về tổ sẽ thả chất pheromone để đánh dấu đường đi

Lượng pheromone nhả ra phụ thuộc vào thức ăn
<!-- Có thể optimize được quãng đường -->

---

Mô hình Ant System
------------------

Những con kiến khác đi qua pheromone sẽ đi theo pheromone

Càng nhiều kiến đi theo thì pheromone trên tuyến đường các tăng

Lượng pheromone càng nhiều thì càng hấp dẫn các con khác đến

Khi lượng thức ăn hết thì pheromone sẽ bay hơi dần

---

Mô hình Ant System
------------------

Không phù hợp với các bài toán thực tế

Chi phí cao

Khó triển khai

---

Mô hình Ant Colony Optimization - _ACO_
---------------------------------------

Được tạo ra với mục đích riêng

Giải bài toán Travel Saleman Problem (TSP)

---

Travel Saleman Problem - _TSP_
------------------------------

