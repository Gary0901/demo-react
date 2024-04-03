import React, { useContext } from 'react'
import Title from './Title'
import { Link } from 'react-router-dom'
import QuantItyBtn from './QuantItyBtn'
import { CartContext } from './CartContext'

export default function Checkout() {
    
    let {cartItems} = useContext(CartContext)
    /* {
        "cartItems":
        [
            {
                "id" : 5,
                "name" : "藍莓",
                "image":"blueberry.jpg",
                "price":10,
                "description":"新鮮藍莓50克，補眼之寶",
                "quantity":3
            },
            {
                "id" : 4,
                "name" : "西瓜",
                "image":"watermelon.jpg",
                "price":20,
                "description":"新鮮西瓜2公斤，夏季必備",
                "quantity":6
            }
        ]
    } */
    /* let {cartItems} = cartItem */

    let cartEmpty = cartItems.length<=0 ? true : false

    let grandTotal = cartItems.reduce((total,product)=>{
        return total += product.price * product.quantity
    },0)

    const freeShippingPrice = 99

    return (
        <div>
            <Title mainTitle = "你的購物車"/>

            {
                cartEmpty && 
                <div className="nothingInCart">
                    購物車現在沒商品<br/><br/>
                    <Link to='/'>去產品頁看看吧!</Link>
                </div>
            }

            {
                !cartEmpty &&
                <div className='container'>
                    <div id ="cartSection">
                        <table className='checkoutTable'>
                            <tbody>
                            {
                                cartItems.map((product)=>(
                                    <tr key = {product.id}>
                                        <td>
                                            <Link to={'/product' + product.id}>
                                                <img src={process.env.PUBLIC_URL+'/img/'+product.image}/>
                                            </Link>

                                        </td>
                                        <td>
                                            <p>名稱 : {product.name}</p>
                                            <p>售價 : {product.price}元</p>
                                            <p>描述 : {product.description}</p>
                                        </td>
                                        <td width="200">
                                                <QuantItyBtn productInfo={product} />
                                        </td>
                                        <td>
                                            <div className="productSubTotal">
                                                ${product.price*product.quantity}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        
                    </div>
                    
                    <div id ="checkoutSection">
                        {/*價錢總數，*/}
                        <div>全部價錢總共</div>
                        <div className="grandTotal">{grandTotal}元</div>
                        {
                        /*免費送貨*/
                            grandTotal >= freeShippingPrice ?
                            <div className="freeShipping">✔️我們免費送貨</div> : 
                            <div className="noShipping">滿${freeShippingPrice}免費送貨<br/>還差${freeShippingPrice-grandTotal}元</div>
                        }

                        <button>結帳付款</button>
                    </div>
                </div>
            }        
        </div>
    )
}
