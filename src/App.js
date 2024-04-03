import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import ProductList from './ProductList';
import Checkout from './Checkout';
import ProductDetail from './ProductDetail';
import { CartContext } from './CartContext';
import { useState } from 'react';

function App() {

	const [cartItems, setCartItems] = useState([])

  return (
    <BrowserRouter>

		<CartContext.Provider value={{cartItems,setCartItems}}>
			{/* <a href="/checkout">購物車(a tag)</a>  用a tag會較慢 會送去外面的server*/}
			<nav>
				<Link to='/'>首頁</Link>
				{/* <Link to='/product'>產品資料</Link> */}
				<Link to='/checkout'>購物車</Link>
			</nav>
				
			

			<Routes>
				<Route path="/" element = {<ProductList/>} />
				<Route path="/checkout" element = {<Checkout/>} />

				<Route path="/product" element = {<ProductDetail/>}>
					<Route path=':id' element = {<ProductDetail/>}/>
				</Route>

				<Route path='*' element={<p>找不到頁面</p>}/>
			</Routes>
      	</CartContext.Provider>

    </BrowserRouter>
  );
}

export default App;
