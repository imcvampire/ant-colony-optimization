class: center, middle, inverse

# Swarm Intelligence

---

class: left

### Giáo viên hướng dẫn:

##### Thân Quang Khoát

### Nhóm số 5:

##### 1. Nguyễn Quốc Anh  
> MSSV: 20140149  
Lớp: CNTT 1.01 K59

##### 2. Phùng Đức Nhật  
> MSSV: 20143321  
Lớp: CNTT 2.04 K59

##### 3. Lưu Minh Hồng
> MSSV: 20169572  
Lớp: CNTT 2.02 K58  

---

class: center, middle, inverse

# Mục tiêu

---

class: top

### Mục tiêu

- Tìm hiểu các bài toán bên trong lĩnh vực Swarm Intelligence. Nêu các đặc điểm chung và tìm các ứng dụng của lĩnh vực trong thực tế.

--

- Thực hiện mô phỏng về các mô hình trong Swarm Intelligence như mô hình Boids và mô phỏng các thuật toán Ant Colony Optimization Algorithms.

--

- Phần nâng cao gồm việc thu thập thêm dữ liệu và so sánh hiệu năng với các thuật toán tìm đường khác.

---

class: center, middle, inverse

# Swarm intelligent

---

class: top

### Swarm intelligent

- Swarm intelligent là một nhánh của AI (Artificial intelligence). Các bài toán nằm trong nhánh Swarm intelligence thường là các bài toán về tập tính thu thập dữ liệu của các hệ thống phân cấp tự tổ chức, hoặc là các hệ thống tự nhiên nhân tạo.

--

- Các bài toán này có đặc điểm chung là đều làm về hệ thống đa tác tử đơn giản, trong đó các tác tử bị hạn chế bằng tầm nhìn và chỉ có khả năng giao tiếp cục bộ với nhau.

-- 

- Ngoài ra đây còn là các bài toán tăng hiệu năng trong đó việc tương tác giữa các tác tử có thể giúp cho việc giải quyết bài toán trở nên đơn giản và hiệu quả hơn.

--

- Các bài toán về Swarm intelligence thường lấy các ví dụ trong thế giới tự nhiên để xây dựng nên phương pháp giải của mình

-- 

- Phương pháp giải của các bài toán trong Swarm intelligent xoay quanh việc giải các đồ thì trọng số để tìm ra trạng thái tiếp theo chấp nhận được. Phương pháp tiếp cận thường là bottom-up.

---

class: center, middle, inverse 

# Boids

---

class: top

### Boids

- Boids là một chương trình đời sống nhân tạo (artificial life program), được phát triển bởi Craig Reynolds vào năm 1986, mô phỏng lại hành vi tụ tập của chim
--

- Một số luật được áp dụng vào mô hình đơn giản nhất của Boids là:
  - separation: Di chuyển để tránh va chạm đồng loại.
  - alignment: Di chuyển đến vị trung bình phía trước.
  - cohesion: Di chuyển vào gần vị trí trung tâm.

--- 

class: center, middle, inverse

# Ant colony

--- 

class: top

### Ant colony

- Là một mô hình dựa vào hành vi tìm kiếm thức ăn của kiến.

--

- Lúc đầu, các con kiến di chuyển 1 cách ngẫu nhiên. Nếu tìm được thức ăn nó sẽ trở về tổ và để lại dấu (pheromones) ghi lại đường đến chỗ có thức ăn.

--

- Khi 1 con kiến lại gần 1 đường đã được đánh dấu, nó sẽ đi theo đường đó với 1 xác suất nào đó. Với càng nhiều tìm được đường đó, dấu vết sẽ càng ngày càng mạng hơn.

-- 

- Vì kiến sẽ để lại pheromones khi tìm thấy thức ăn nên đường đến với thức ăn ngắn hơn thường sẽ có pheromones nhiều hơn các đường khác hay có thể gọi là lời giải tốt nhất. Tuy nhiên, trong khi đó vẫn sẽ có vài con kiến đi tìm kiếm xung quang tổ xem có đường đi (lời giải) tốt hơn không.

--

- Khi nguồn thức ăn không còn nữa, dấu vết pheromones sẽ không được bổ sung nữa và sẽ từ bay hơi dần đi.

---

class: center, middle, inverse

# Ant colony optimization algorithm:

---

class: top

### Ant colony optimization algorithm: