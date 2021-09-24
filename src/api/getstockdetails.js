import axios from "axios";
const getstockdetails = async(symbol) => {
    
    const api_url = 'https://www.alphavantage.co/query';
    const func = 'TIME_SERIES_DAILY_ADJUSTED';
    
    const api_keys = ['HO2PKREA16QCYUOX','L429Y548TSTYI2QW','FSRI99QSV3994PTA','M9ATEZA3UZA88AVN','TACKVQ39VSWWRVXC','JKY52QWDQNEJ5LX4','VK7Y1E5YYW9VIIRR','8MP373BOXDM6PAV6','XXC39OTQQ4MNOBS4','QLFGR10QH3C0FPZX'];
    const api_key = api_keys[Math.floor(Math.random() * api_keys.length)];
    
    const res = await axios.get(`${api_url}?function=${func}&symbol=${symbol}&apikey=${api_key}`);
    return await res.data;
}
export default getstockdetails;