// pass this on onChange of search input 
// it will return some stocks matching the search

import axios from 'axios'
const getfilteredstocks = async(query) => {
    
    const api_url = 'https://www.alphavantage.co/query';
    const func = 'SYMBOL_SEARCH';
    const keywords = query ? query.toUpperCase(): null;
    
    // getting random apikeys because alphavantage has limit to 5api requests per minute 
    const api_keys = ['HO2PKREA16QCYUOX','L429Y548TSTYI2QW','FSRI99QSV3994PTA','M9ATEZA3UZA88AVN','TACKVQ39VSWWRVXC','JKY52QWDQNEJ5LX4','VK7Y1E5YYW9VIIRR','8MP373BOXDM6PAV6','XXC39OTQQ4MNOBS4','QLFGR10QH3C0FPZX'];
    const api_key = api_keys[Math.floor(Math.random() * api_keys.length)];
    
    const res = await axios.get(`${api_url}?function=${func}&keywords=${keywords}&apikey=${api_key}`);

    return await res.data.bestMatches;
}

export default getfilteredstocks;