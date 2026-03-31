console.log("inspection.js 已成功載入");
// 建立檢驗資訊假資料
// 目前先用前端寫死資料，之後可以改成串接後端 API
const inspectionData = [
  {
    traceNumber: "0401007328",
    producerName: "周美秀-兩庭農場",
    inspectionType: "政府抽驗",
    products: "番石榴(芭樂)、甜桃",
    categoryMain: "水果",
    categorySubList: ["番石榴", "甜桃"]
  },
  {
    traceNumber: "1201000777",
    producerName: "陳志遠-安然地瓜田園",
    inspectionType: "政府抽驗",
    products: "大蒜、甘藷(地瓜)",
    categoryMain: "蔬菜",
    categorySubList: ["大蒜", "甘藷"]
  },
  {
    traceNumber: "1201006621",
    producerName: "林宇翔-豐隆農場",
    inspectionType: "政府抽驗",
    products: "稉稻(白米或黑米)、甘藷(地瓜)、落花生、蒜頭",
    categoryMain: "糧食",
    categorySubList: ["稉稻", "甘藷", "落花生", "蒜頭"]
  },
  {
    traceNumber: "1301000624",
    producerName: "黃慈善",
    inspectionType: "政府抽驗",
    products: "甜瓜、番茄(含小番茄)",
    categoryMain: "水果",
    categorySubList: ["甜瓜", "番茄"]
  },
  {
    traceNumber: "1701000242",
    producerName: "曾右鑫",
    inspectionType: "政府抽驗",
    products: "蘿勒(九層塔)、不結球白菜、小白菜、青梗白菜、蚵白菜",
    categoryMain: "蔬菜",
    categorySubList: ["蘿勒", "白菜"]
  },
  {
    traceNumber: "0301001004",
    producerName: "蕭豐舟",
    inspectionType: "質譜快檢抽驗",
    products: "蘿勒(九層塔)、甘藍(高麗菜)、芫荽(胡荽,香菜)",
    categoryMain: "蔬菜",
    categorySubList: ["蘿勒", "甘藍", "芫荽"]
  },
  {
    traceNumber: "0801000726",
    producerName: "官漢國",
    inspectionType: "政府抽驗",
    products: "綠豆芽、苜蓿芽、黃豆芽、黑豆芽",
    categoryMain: "蔬菜",
    categorySubList: ["綠豆芽", "苜蓿芽", "黃豆芽", "黑豆芽"]
  }
];

// 頁面載入時先顯示全部資料
window.onload = function () {
  renderInspectionTable(inspectionData);
};

// 查詢檢驗資訊函式
function searchInspection() {
  // 取得查詢欄位的值
  const traceNumber = document.getElementById("inspectionTraceNumber").value.trim();
  const categoryMain = document.getElementById("inspectionCategoryMain").value;
  const categorySub = document.getElementById("inspectionCategorySub").value;
  const inspectionType = document.getElementById("inspectionType").value;

  // 依條件篩選資料
  const filteredData = inspectionData.filter(item => {
    // 追溯編號比對
    const matchTraceNumber = !traceNumber || item.traceNumber.includes(traceNumber);

    // 產品大分類比對
    const matchCategoryMain = !categoryMain || item.categoryMain === categoryMain;

    // 產品小分類比對
    const matchCategorySub =
      !categorySub || item.categorySubList.some(sub => sub.includes(categorySub));

    // 檢驗類別比對
    const matchInspectionType = !inspectionType || item.inspectionType === inspectionType;

    // 所有條件成立才保留
    return (
      matchTraceNumber &&
      matchCategoryMain &&
      matchCategorySub &&
      matchInspectionType
    );
  });

  // 將結果顯示在表格
  renderInspectionTable(filteredData);
}

// 列出全部檢驗資料
function showAllInspection() {
  renderInspectionTable(inspectionData);
}

// 將資料渲染到表格中
function renderInspectionTable(data) {
  // 取得結果表格 tbody
  const resultBody = document.getElementById("inspectionResultBody");

  // 如果沒有資料
  if (data.length === 0) {
    resultBody.innerHTML = `
      <tr>
        <td colspan="5">查無符合條件的資料</td>
      </tr>
    `;
    return;
  }

  // 準備表格 HTML
  let html = "";

  // 逐筆組合表格內容
  data.forEach((item, index) => {
    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.traceNumber}</td>
        <td>${item.producerName}</td>
        <td>${item.inspectionType}</td>
        <td>${item.products}</td>
      </tr>
    `;
  });

  // 將內容放進表格
  resultBody.innerHTML = html;
}