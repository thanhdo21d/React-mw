import axios, { AxiosResponse } from "axios";
import { RPChart } from "../models/modelChart";
import { IDataCDT, IRP } from "../components/indexMarketWatch/interface/slidemarket.config";
const responseBody = (response: AxiosResponse) => response.data;
const BASE_URL2 = "https://marketstream.fpts.com.vn/";
const BASE_URL1 = "http://priceboard3.fpts.com.vn/";
const BASE_URL = "http://marketstream.fpts.com.vn/";

const URL_EZTRADE = "http://eztrade0.fpts.com"
const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  postFormData: (url: string, body: {}) =>
    axios
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const responseBody = response;
        return responseBody;
      })
      .catch((error) => {
        console.log("Lỗi trong quá trình gửi yêu cầu: " + error);
        throw error;
    }),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}
/* Trang chủ đặt lệnh */
// get thông tin tk
const Account = {
  get: () => requests.get("/trade/api/ApiData/ProfileAccount"),
}
// get tiền 
const ClientBalance = {
  get: () => requests.get("/trade/api/ApiData/ClientBalance"),
}
// get quyền
const Permission = {
  get: () => requests.get("/trade/api/ApiData/Permission"),
}
// get mã ck của KH thường
const StockBalance = {
  get: () => requests.get("/trade/api/ApiData/GetStockBalance"),
}
// get mã ck của KH margin pro
const StockBalanceMarpro = {
  get: () => requests.get("/trade/api/ApiData/InitMarPro"),
}
// get mã ck của KH margin pro
const GetOTP = {
  get: () => requests.get("/trade/api/ApiData/get_otp"),
}
const checkOTP = {
  get: (OTP:string) => requests.get(`/trade/api/ApiData/check_otp?OTP=${OTP}`),
}
// get data Table HNX
const TableHNX = {
  list: (params: URLSearchParams) =>
    requests.get(BASE_URL + "hnx/data.ashx", params),
  get: () => requests.get(BASE_URL + "/hnx/data.ashx?s=quote&l=HNXIndex"),
  getOneStock: (params:string) => requests.get(BASE_URL + `/hnx/data.ashx?s=quote&l=${params}`),
};
// get data Table HSX
const TableHSX = {
  list: (params: URLSearchParams) =>
    requests.get(BASE_URL + "hsx/data.ashx", params),
  get: () => requests.get(BASE_URL + "/hsx/data.ashx?s=quote&l=All"),
  getOneStock: (params:string) => requests.get(BASE_URL + `/hsx/data.ashx?s=quote&l=${params}`),
};
// get Index
const Index = {
  get: (params:string) =>
    requests.get(
      BASE_URL+`${params}/data.ashx?s=index`
    ),
};
// get cache data stock info
const Company = {
  get: () =>
    requests.get(
      "http://priceboard3.fpts.com.vn/api/ApiData/get_cache_stockinfo"
    ),
};
// get danh mục tk khách hàng
const Category = {
  get: (ClientCode:string) =>
    requests.get(`http://marketwatchapiservicecore.fpts.com.vn/api/stock/v1/mw/template/${ClientCode}` ),
  // fetch  đata
  fetchData: () => requests.get("http://localhost:30/categori"),
  // add cate
  AddCate : (data:any) =>requests.post("http://marketwatchapiservicecore.fpts.com.vn/api/stock/v1/mw/template/058C222210",data ),
  postformData :(data:any) =>requests.postFormData("http://eztradereacttest.fpts.com.vn/Root/Data.ashx", data)
};
// 
const Ministry = {
  get: () =>
    requests.get(
      "http://priceboard3.fpts.com/api/stock/v1/mw/s5g/default/ministry"
    ),
};
const ListDataTable = {
  list: (floor: string, valueParam: string) =>
    requests.get(
      BASE_URL+`${floor}/data.ashx?${valueParam}`
    ),
};
const dataGDTTtable = {
  listPt: (floor: string) =>
    requests.get(BASE_URL+`${floor}/data.ashx?s=pt`),
    listBi: (floor: string) =>
    requests.get(BASE_URL+`${floor}/data.ashx?s=bi`),
    
};
const chartIndex = {
  get: () => requests.get(BASE_URL + "/chart/data.ashx?s=full"),
  getSS: () => requests.get(BASE_URL + `/chart/data.ashx?s=config&v=20160829061939`),
  getTimeSS: (dataChartIndex: IRP) => requests.postFormData(BASE_URL + "/chart/data.ashx",dataChartIndex),
  getCDT: (value_getCDT:string) => requests.get(BASE_URL +`/chart/data.ashx?s=${value_getCDT}`),
  //get: () => requests.get('http://localhost:8000/dataChartIndex'),
};

var formData = new FormData();
formData.append("key1", "value1");
formData.append("key2", "value2");
const dataTableBasic = {
  post: (dataValueBasic: RPChart) =>
    requests.post(BASE_URL + "/Root/Data.ashx", dataValueBasic),
  postFormData: (dataValueBasic: RPChart) =>
    requests.postFormData(BASE_URL + "/Root/Data.ashx", dataValueBasic),
  //  requests.postFormData("/Root/Data.ashx", dataValueBasic,   {'Content-Type': 'multipart/form-data'},)
};

// table Lịch sử khớp lệnh
const report = {
  post: () => requests.get("/report/api/ApiData/TradedResultHis"),
  getHisOrder: () => requests.get("http://localhost:2000/orderHis"),
};
const transfer = {
  getdataTempalte: () => requests.get("  http://localhost:2000/dataTranfer"),
  hometransferds: () => requests.get("http://localhost:2000/dataTransferds"),
};
const tableThongke = {
  getdataThongke: (params: any) =>
    requests.get(`${BASE_URL}/hnx/data.ashx?${params}`),
  sortThongkeIndex: (query: any) =>
    requests.post(BASE_URL + "/Root/Data.ashx", query),
};

const tableDetailPopup = {
  get: (params: any) =>
    requests.get(
      `https://marketstream.fpts.com.vn/hsx/data.ashx?s=quote&l=${params}`
    ),
};
const assetReport = {
  get: () => requests.get("/report/api/ApiData/ReportBCTS"),
};
const SendOrder_Marpro = {
  post: (data:any) => requests.post("/trade/api/ApiData/SendOrder_MarPro",data),
};
const logout ={
  get: () => requests.get("/trade/logout"),
}
const agent = {
    TableHNX,
    TableHSX,
    Index,
    Company,
    Category,
    Ministry,
    ListDataTable,
    dataGDTTtable,
    chartIndex,
    dataTableBasic,
    report,
    transfer,
    tableThongke,
    assetReport,
    ClientBalance,
    Permission,
    Account,
    StockBalance,
    StockBalanceMarpro,
    SendOrder_Marpro,
    GetOTP,
    checkOTP,
    logout
}
export default agent;
