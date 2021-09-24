import React,{useState,useEffect} from 'react'
import './searchbar.css'
import SearchIcon from '@material-ui/icons/Search';
import filteredstocks from '../api/filteredstocks';
import getstockdetails from '../api/getstockdetails';

function SearchBar({
        setDOMposition,
        setstockBought,
        purchasedOn,
        setBoughtPricePerShare,
        setCurrentPricePerShare,
    }) {
    
    const [searchresults,setsearchresults ] = useState([]);
    const [stockPrices,setstockPrices] = useState([]);

    // price at which stock was bought

    useEffect(() => {
        if(stockPrices && stockPrices.length!==0) {
            var boughtStats = stockPrices[purchasedOn];
            boughtStats ? setBoughtPricePerShare(boughtStats["4. close"]) : setBoughtPricePerShare(0);
            
            var stockPricesValuesArr = Object.values(stockPrices);
            var latestStats = stockPricesValuesArr[0];
            
            if(latestStats !== undefined)  {
                setCurrentPricePerShare(latestStats["4. close"]);
            }
        }
    });


    return (
        <div className="search" >
            <div className="search-input">
                <input type="text" placeholder='Search Stocks...' className="input-text"
                onChange={(event)=>{
                    filteredstocks(event.target.value).then(data=> setsearchresults(data))
                }}
                />
                <div className="search-icon" >
                    <SearchIcon />
                </div>
            </div>
            {searchresults && searchresults.length!==0 &&
                <div className="dataResult">
                    {searchresults.map((node)=>{
                        return (
                            <li className="dataItem"
                                title={node['4. region']}
                                key={node['1. symbol']}
                                onClick={()=>{
                                    getstockdetails(node['1. symbol'])
                                    .then(data=>{setstockPrices(data["Time Series (Daily)"])})
                                    setDOMposition('purchasedOn')
                                    setstockBought(node['2. name'])
                                    window.location.href = '#stock';
                                }}
                            >{node['2. name']} 
                            <span>
                                {node['8. currency']}
                            </span>
                            </li>
                        )
                    })}
                </div>

            }
        </div>
    )
}

export default SearchBar;
