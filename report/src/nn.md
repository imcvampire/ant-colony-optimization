Travelling salesman problem	
===========================

Mô tả 
-----

Phát biểu bài toán: Có một người giao hàng cần đi giao hàng tại n thành phố. Anh ta xuất phát từ một thành phố nào đó, đi qua các thành phố khác để giao hàng và trở về thành phố ban đầu. Mỗi thành phố chỉ đến một lần, và khoảng cách từ một thành phố đến các thành phố khác đã được biết trước. Hãy tìm một chu trình (một đường đi khép kín thỏa mãn điều kiện trên) sao cho tổng độ dài các cạnh là nhỏ nhất.
Dưới dạng đồ thị :
Bài toán người bán hàng có thể được mô hình hoá như một đồ thị vô hướng có trọng số, trong đó mỗi thành phố là một đỉnh của đồ thị còn đường đi giữa các thành phố là mỗi cách. Khoảng cách giữa hai thành phố là độ dài cạnh. Đây là vấn đề cực tiểu hoá với điểm đầu và điểm cuối là cùng một đỉnh sau khi thăm hết các đỉnh còn lại đúng một lần. Mô hình này thường là một đồ thị đầy đủ (giữa mỗi cặp đỉnh đều có cạnh). Nếu không có đường giữa hai thành phố thì có thể thêm một cạnh với độ dài đủ lớn vào đồ thị mà không ảnh hưởng đến kết quả tối ưu sau cùng.

Ứng dụng thực tiễn
------------------
Dạng thức nguyên thuỷ: Lập kế hoạch, logistic, và sản xuất các microchip
Bài toán con trong rất nhiều lĩnh vực như: Phân tích gen trong sinh học ...

Các giải pháp
-------------

Thiết kế thuật toán tìm kiếm lời giải tối ưu (thường hoạt động hiệu quả cho những trường hợp nhỏ).
Thiết kế thuật toán heuristic để tìm những lời giải tốt nhưng không nhất thiết tối ưu.
Thiết kế thuật toán xấp xỉ để tìm những lời giải không quá lớn so với lời giải tối ưu.
Giải quyết các trường hợp đặc biệt.

Giải thuật nearest neighbour algorithm
--------------------------------------

Các bước của thuật toán:
Bước 1: Chọn một đỉnh bắt đầu V.
Bước 2: Từ đỉnh hiện hành chọn cạnh nối có chiều dài nhỏ nhất đến các đỉnh chưa viếng thăm. Đánh dấu đã viếng thăm đỉnh vừa chọn.
Bước 3: Nếu còn đỉnh chưa viếng thăm thì quay lại bước 2.
Bước 4: Quay lại đỉnh V.
Bài toán có năm thành phố với khoảng cách giữa các thành phố được tính bằng km. Sử dụng thuật toán láng giềng gần nhất, bắt đầu lần lượt từ mỗi đỉnh, tìm đường đi thích hợp cho người bán hàng, cửa hàng đặt tại A và cần đi qua tất cả thành phố còn lại.
Bắt đầu với đỉnh A
Từ A, đỉnh gần nhất là C, chiều dài AC = 8
Từ C, đỉnh chưa viếng thăm gần nhất là E, CE = 4
Từ E, đỉnh chưa viếng thăm gần nhất là B, EB = 15
Từ B, đỉnh chưa viếng thăm gần nhất là D, BD = 10
Không còn đỉnh chưa viếng thăm, vì vậy quay về A, DA = 14
Tổng chi phí ACEBDA là 8 + 4 + 15 + 10 + 14 = 51
Lặp lại bắt đầu với những đỉnh khác:
		
Đỉnh bắt đầu
Đường đi
Tổng chiều dài
A
ACEBDA
51
B
BACEDB
50
C
CEABDC
45
D
DCEABD
45
E
ECABDE
50
E
ECDBAE
45


Có ba đường đi có chiều dài 45 km là giống nhau. Một nhân viên bán hàng có cửa hàng tại A, đường đi tốt nhất tìm ra bởi thuật toán láng giềng gần nhất là ABDCEA = 45 km














Ứng dụng  Nearest neighbour algorithm trên project
--------------------------------------------------

Đầu vào mà một ma trận khoảng cách distances[i][j] với i, j là index của các node chứa thông tin tọa đô các đỉnh của đồ thị
Funtion nearestNeighboorAlgo sẽ chọn lần lượt các điểm xuất phát theo thứ tự của mảng node.
Với mỗi một điểm xuất phát đưa ra một tuyến đường ngắn nhất. So sánh rồi lấy ra tuyến đường ngắn nhất trong các tuyến đường trên.

```javascript
export function nearestNeighboorAlgo(distances) {
	let numberOfNodes = distances.length;
	let shortestRoute = [];
	let shortestRouteLength = Number.MAX_VALUE;
	for (let i = 0; i < numberOfNodes; ++i) {
		let recentRoute = bestRouteFrom(i, distances),
			recentRouteLength = lengthOfRoute(recentRoute, distances);
		if (shortestRouteLength > recentRouteLength) {
			shortestRoute = recentRoute;
			shortestRouteLength = recentRouteLength;
		}
	}
	return shortestRoute;
}
```

Với mỗi một điểm xuất phát đưa ra một tuyến đường ngắn nhất. So sánh rồi lấy ra tuyến đường ngắn nhất trong các tuyến đường trên.
Function bestRouteFrom sẽ đưa ra tuyến đường ngắn nhất ứng với mỗi điểm xuất phát

```javascript
function bestRouteFrom(base, distances) {
	let route = [base];
	let numberOfNodes = distances.length;
	while (route.length < numberOfNodes) {
		let currentNode = route[route.length - 1],
			unvisited = range(numberOfNodes)
			.filter(node => route.indexOf(node) == -1);
		route.push(nearestNode(currentNode, unvisited, distances));
	}
	route.push(base);
	return route;
}
```




