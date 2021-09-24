import React, { useEffect } from 'react'
import './App.css';
import heroImage from './heroImage.jpg';
import SearchBar from './components/SearchBar';

// get today's date
var today = new Date();
var dd = today.getDate() > 9 ? today.getDate() : '0' + today.getDate();
var mm = (today.getMonth() + 1) > 9 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1);
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;

const subtract3months = (date) => {
  var result = new Date();
  result.setMonth(result.getMonth() -3);
  return result.getFullYear() + '-' + ('0' + (result.getMonth() + 1)).slice(-2) + '-' + ('0' + result.getDate()).slice(-2);
}

const getPurchasedDate = (date) => {
  date = new Date(date);
  var dd = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
  var mm = (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  var yyyy = date.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
}

function App() {

  const [purchasedOn, setpurchasedOn] = React.useState('');
  const [DOMposition,setDOMposition] = React.useState(null);
  const [stockBought, setstockBought] = React.useState('');
  const [quantityOfStocks,setQuantityOfStocks,] = React.useState(0);
  const [boughtPricePerShare,setboughtPricePerShare] = React.useState(0);
  const [currentPricePerShare,setCurrentPricePerShare] = React.useState(0);
  const [returns,setreturns] = React.useState(0);
  useEffect(() => {
    setreturns((currentPricePerShare - boughtPricePerShare ) * quantityOfStocks);
  },[setreturns,boughtPricePerShare,currentPricePerShare,quantityOfStocks])
  
  return (
    <div className="App">
      <div className="container intro"
      style={{display: DOMposition === null ? 'block' : 'none'}} 
      >
        <div className="row">
          <div className="col">
          <h4 className="title">
            Check the <span className='highlighted'>Current Price</span> of your Investment in <span className="highlighted">Stocks</span>.
          </h4>
          <h5 className="title helper">Ps: Covers almost all Stock Exchanges.</h5>
          <a 
          href="#search"
          className="btn"
          onClick={() => {setDOMposition('searchStocks')}}
          > Get Started</a>
          </div>
          <div className="col">
            <img src={heroImage} className="hero-image" alt="Investment Returns" />
          </div>
        </div>
      </div>
      <div className="container" id="search"
      style={{display: DOMposition === 'searchStocks' ? 'block' : 'none'}} 
      >
        <SearchBar 
        setDOMposition={setDOMposition} 
        setstockBought={setstockBought} 
        purchasedOn={purchasedOn}
        setBoughtPricePerShare={setboughtPricePerShare}
        setCurrentPricePerShare={setCurrentPricePerShare}
        />
      </div>
      <div 
      style={{display: DOMposition === 'purchasedOn' ? 'block' : 'none'}} 
      className="container" id="stock_purchased_on" >
        <h5 className="row">
        When Did You Purchased the stock and in How much Quantity?
        </h5>
        <form className="" onSubmit={(e)=>{
          e.preventDefault();  
          setDOMposition('output');
          window.location.href = '#output'

        }} >
        <input
         className="input-date"
         type="date"
         required
         min={subtract3months(today)}
         max={today}
        onChange={e=>setpurchasedOn(getPurchasedDate(e.target.value))}
        />
        <input 
        type="number" 
        placeholder="No. of stocks you bought" 
        className="input-date" 
        onChange={e=>setQuantityOfStocks(Number(e.target.value))}
        required />
        <button style={{display: 'none'}} type="submit" >Submit</button>
        </form>
      </div>
      <div 
      style={{display: DOMposition === 'output' ? 'block' : 'none'}}
      className="container output" id="output">{
        returns!==0 ? (
        <>        
        <p>You purchased <span className="highlighted">{quantityOfStocks}</span>stocks of the 
        <span className='highlighted' >
          {stockBought} 
       </span> stock on 
       <span className='highlighted' >
          {purchasedOn}
       </span> at 
       <span className='highlighted' >
          {boughtPricePerShare}
       </span> 
        Rs per share.</p>
        <hr style={{width: '70%',color: '#2a2a2a'}} />
       <p>Now your investments are worth 
       <span className='highlighted' >
          {(currentPricePerShare * quantityOfStocks).toFixed(2)}
       </span> 
        Rupees.</p>
        <hr style={{width: '70%',color: '#2a2a2a'}} />
       <p>
       Your total {returns > 0 ? 'Profit' : 'Loss'} is
       <span className={`highlighted + ${returns > 0 ? 'profit' : 'loss'}`} >
          {(returns.toFixed(2)) + 'rs'}
       </span> giving Absolute Returns of 
       <span className={`highlighted + ${returns > 0 ? 'profit' : 'loss'}`} >
          {((returns/(boughtPricePerShare*quantityOfStocks))*100).toFixed(2) + '%'}
       </span> .
       </p>
        </>
        ) : (
          <>
          <p>You Might have entered a date on which market is closed!  </p>
          <p>Please Start Over with fresh Details</p>
          </>
        )
        }
      </div>
      <footer>
        <ul>
          <li><a href="https://github.com/tushartiwari7">Github</a></li>
          <li><a href="https://tushartiwari_me">Portfolio</a></li>
          <li><a href="https://twitter.com/tushartiwari_me">Twitter</a></li>
          <li><a href="https://linkedin.com/in/tushartiwari0172">Linkedin</a></li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
