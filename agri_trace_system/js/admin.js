// 送出農產品資料的函式
function submitProduct() {

  // 取得產品名稱欄位的值
  const productName = document.getElementById("adminProductName").value;

  // 取得產品類別欄位的值
  const category = document.getElementById("adminCategory").value;

  // 取得生產者名稱欄位的值
  const producer = document.getElementById("producer").value;

  // 取得批次編號欄位的值
  const batchNo = document.getElementById("batchNo").value;

  // 取得包裝日期欄位的值
  const packageDate = document.getElementById("packageDate").value;

  // 取得物流紀錄欄位的值
  const shippingRecord = document.getElementById("shippingRecord").value;

  // 取得顯示送出結果的區塊
  const result = document.getElementById("submitResult");

  // 檢查必要欄位是否有填寫
  if (!productName || !producer || !batchNo || !packageDate) {
    alert("請填寫必要欄位");
    return;
  }

  // 將表單資料顯示在畫面上
  // 目前是前端模擬結果，未真正送到資料庫
  result.innerHTML = `
    <div class="result-item">
      <p><strong>產品名稱：</strong>${productName}</p>
      <p><strong>類別：</strong>${category}</p>
      <p><strong>生產者：</strong>${producer}</p>
      <p><strong>批次：</strong>${batchNo}</p>
      <p><strong>包裝日期：</strong>${packageDate}</p>
      <p><strong>物流紀錄：</strong>${shippingRecord || "尚未填寫"}</p>
      <p><span class="badge">資料已送出（目前為前端模擬）</span></p>
    </div>
  `;
}