// 查詢產品資料的函式
function searchProduct() {

  // 取得使用者在追溯碼輸入框中輸入的值
  const traceCode = document.getElementById("traceCode").value;

  // 取得使用者輸入的產品名稱
  const productName = document.getElementById("productName").value;

  // 取得使用者選擇的縣市
  const city = document.getElementById("city").value;

  // 取得使用者選擇的產品類別
  const category = document.getElementById("category").value;

  // 取得顯示查詢結果的區塊
  const resultArea = document.getElementById("resultArea");

  // 如果追溯碼與產品名稱都沒填，跳出提醒訊息並停止執行
  if (!traceCode && !productName) {
    alert("請至少輸入追溯碼或產品名稱");
    return;
  }

  // 將查詢結果顯示在 resultArea 區域中
  // 目前這裡使用的是假資料，之後可以改成接後端 API
  resultArea.innerHTML = `
    <div class="result-item">
      <h3>高麗菜</h3>
      <p><strong>追溯碼：</strong>${traceCode || "AGRI-2026-001"}</p>
      <p><strong>產品名稱：</strong>${productName || "高麗菜"}</p>
      <p><strong>類別：</strong>${category || "蔬菜"}</p>
      <p><strong>產地：</strong>${city || "雲林縣"}</p>
      <p><strong>生產者：</strong>幸福農場</p>
      <p><strong>包裝日期：</strong>2026-03-20</p>
      <p><span class="badge">已上鏈驗證</span></p>

      <!-- 按下後跳轉到詳細頁 -->
      <button onclick="goToDetail()">查看詳細資訊</button>
    </div>
  `;
}

// 前往詳細資訊頁面的函式
function goToDetail() {
  location.href = "detail.html";
}