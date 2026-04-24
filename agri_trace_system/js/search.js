// 頁面載入時，自動呼叫 API 顯示全部資料
window.onload = function () {
  showAllData();
};

// ==========================
// 1. 呼叫 API 取得全部資料
// ==========================
async function showAllData() {
  try {
    // 呼叫後端 API
    const response = await fetch("http://localhost:3001/products");

    // 轉換成 JSON
    const result = await response.json();

    // 判斷 API 是否成功
    if (result.success) {
      // 把資料丟進表格
      renderTable(result.data);
    } else {
      alert("查詢失敗：" + result.message);
    }
  } catch (error) {
    console.error("錯誤：", error);
    alert("無法連接後端 API");
  }
}

// ==========================
// 2. 查詢功能（前端過濾）
// ==========================
async function searchData() {
  try {
    // 一樣先從 API 拿全部資料
    const response = await fetch("http://localhost:3001/products");
    const result = await response.json();

    if (!result.success) {
      alert("查詢失敗");
      return;
    }

    // 取得查詢條件
    const number = document.getElementById("number").value.trim();
    const productName = document.getElementById("productName").value.trim();
    const producerName = document.getElementById("producerName").value.trim();
    const samplingLocation = document.getElementById("samplingLocation").value.trim();
    const inspectResult = document.getElementById("inspectResult").value;

    // 前端篩選資料
    const filteredData = result.data.filter(item => {

      // 編號
      const matchNumber = !number || item.number.includes(number);

      // 產品名稱
      const matchProductName = !productName || item.product_name.includes(productName);

      // 生產者名稱
      const matchProducerName = !producerName || item.producer_name.includes(producerName);

      // 採樣地點
      const matchSamplingLocation = !samplingLocation || item.sampling_location.includes(samplingLocation);

      // 檢驗結果
      const matchInspectResult = !inspectResult || item.inspect_result === inspectResult;

      return (
        matchNumber &&
        matchProductName &&
        matchProducerName &&
        matchSamplingLocation &&
        matchInspectResult
      );
    });

    // 顯示篩選結果
    renderTable(filteredData);

  } catch (error) {
    console.error("錯誤：", error);
    alert("查詢失敗");
  }
}

// ==========================
// 3. 顯示表格
// ==========================
function renderTable(data) {
  const resultBody = document.getElementById("searchResultBody");

  // 沒資料
  if (data.length === 0) {
    resultBody.innerHTML = `
      <tr>
        <td colspan="9">查無符合條件的資料</td>
      </tr>
    `;
    return;
  }

  let html = "";

  data.forEach(item => {
    html += `
      <tr>
        <td>${item.id}</td>
        <td>${item.number}</td>
        <td>${item.product_name}</td>
        <td>${item.product_id}</td>
        <td>${item.producer_name}</td>
        <td>${item.sampling_location}</td>
        <td>${item.inspect_result}</td>
        <td>${item.note}</td>
        <td>${formatDate(item.created_at)}</td>
      </tr>
    `;
  });

  resultBody.innerHTML = html;
}

// ==========================
// 4. 日期格式化
// ==========================
function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}