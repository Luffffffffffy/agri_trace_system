// 建立假資料陣列
// 這裡先模擬查詢結果，之後可以改成接後端 API
const producerData = [
  {
    traceNumber: "A001",
    producerName: "施學源",
    productName: "扁蒲",
    address: "彰化縣埔鹽鄉",
    hasInspection: "是",
    alias: "阿源",
    categoryMain: "蔬菜",
    categorySub: "扁蒲"
  },
  {
    traceNumber: "A002",
    producerName: "張肇正",
    productName: "無子檸檬",
    address: "屏東縣內埔鄉",
    hasInspection: "否",
    alias: "阿正",
    categoryMain: "水果",
    categorySub: "無子檸檬"
  },
  {
    traceNumber: "A003",
    producerName: "魯鵬祥",
    productName: "香蕉",
    address: "高雄市鳳山區",
    hasInspection: "是",
    alias: "祥哥",
    categoryMain: "水果",
    categorySub: "香蕉"
  },
  {
    traceNumber: "A004",
    producerName: "吳明裕",
    productName: "檸檬",
    address: "屏東縣高樹鄉",
    hasInspection: "否",
    alias: "阿裕",
    categoryMain: "水果",
    categorySub: "檸檬"
  }
];

// 頁面剛載入時先顯示全部資料
window.onload = function () {
  renderProducerTable(producerData);
};

// 查詢生產者函式
function searchProducer() {
  // 取得各欄位的值
  const traceNumber = document.getElementById("traceNumber").value.trim();
  const keyword = document.getElementById("keyword").value.trim();
  const producerName = document.getElementById("producerName").value.trim();
  const cityFilter = document.getElementById("cityFilter").value;
  const alias = document.getElementById("alias").value.trim();
  const categoryMain = document.getElementById("categoryMain").value;
  const categorySub = document.getElementById("categorySub").value;

  // 取得是否有檢驗資訊的單選值
  const inspectionRadio = document.querySelector('input[name="hasInspection"]:checked');
  const hasInspection = inspectionRadio ? inspectionRadio.value : "";

  // 使用 filter 篩選符合條件的資料
  const filteredData = producerData.filter(item => {
    // 追溯編號條件
    const matchTraceNumber = !traceNumber || item.traceNumber.includes(traceNumber);

    // 關鍵字條件：可同時比對生產者、產品、地址
    const matchKeyword =
      !keyword ||
      item.producerName.includes(keyword) ||
      item.productName.includes(keyword) ||
      item.address.includes(keyword);

    // 生產者名稱條件
    const matchProducerName = !producerName || item.producerName.includes(producerName);

    // 地址條件
    const matchCity = !cityFilter || item.address.includes(cityFilter);

    // 別名條件
    const matchAlias = !alias || item.alias.includes(alias);

    // 大分類條件
    const matchCategoryMain = !categoryMain || item.categoryMain === categoryMain;

    // 小分類條件
    const matchCategorySub = !categorySub || item.categorySub === categorySub;

    // 是否有檢驗資訊條件
    const matchInspection = !hasInspection || item.hasInspection === hasInspection;

    // 所有條件都成立才保留
    return (
      matchTraceNumber &&
      matchKeyword &&
      matchProducerName &&
      matchCity &&
      matchAlias &&
      matchCategoryMain &&
      matchCategorySub &&
      matchInspection
    );
  });

  // 將篩選後資料顯示在表格
  renderProducerTable(filteredData);
}

// 列出全部資料
function showAllProducers() {
  renderProducerTable(producerData);
}

// 切換到列表檢視
function switchToListView() {
  alert("目前已經是列表檢視。");
}

// 切換到地圖檢視
function switchToMapView() {
  alert("地圖檢視功能之後可接 Google Maps 或 Leaflet。");
}

// 將資料渲染到表格中
function renderProducerTable(data) {
  // 取得表格 tbody
  const resultBody = document.getElementById("producerResultBody");

  // 如果沒有查到資料，顯示提示訊息
  if (data.length === 0) {
    resultBody.innerHTML = `
      <tr>
        <td colspan="6">查無符合條件的資料</td>
      </tr>
    `;
    return;
  }

  // 將資料轉成表格列 HTML
  let html = "";

  data.forEach((item, index) => {
    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.traceNumber}</td>
        <td>${item.producerName}</td>
        <td>${item.productName}</td>
        <td>${item.address}</td>
        <td>${item.hasInspection}</td>
      </tr>
    `;
  });

  // 把結果放進表格
  resultBody.innerHTML = html;
}