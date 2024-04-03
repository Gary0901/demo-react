import React from 'react'
import { useContext , useState } from 'react'
import { CartContext } from './CartContext'

export default function QuantItyBtn({productInfo}) {

    const {cartItems,setCartItems} = useContext(CartContext)

    //購物車有無該產品

    let productIndexInCart = cartItems.findIndex((element)=>{
        return element.id === productInfo.id 
    })

    //findIndex 
    //如果是購物車內找到該件產品 => 返回索引位置 0. 1 . 2 ... ， 該件產品沒被加入購物車 => 返回-1

    let [numInCart,setNumInCart] = useState(
        (productIndexInCart === -1) ? 0 : cartItems[productIndexInCart].quantity
    )

    const handleAdd = ()=>{

        if(productIndexInCart === -1)
        {
            //購物車本身沒有，在cartItems array中加個新element (object)
            setCartItems(
                [{
                    id: productInfo.id,
                    name : productInfo.name,
                    image : productInfo.image,
                    price : productInfo.price,
                    description:productInfo.description,
                    quantity:1
                },
                 ...cartItems] //除了CartItems購物車之外 再加上上面的object
            )
        }
        else 
        {
            //購物車本身有該產品，在cartItems array中將該產品數量加一
            let newCartArray = [...cartItems]
            newCartArray[productIndexInCart].quantity++
            setCartItems(newCartArray)
        }
        setNumInCart(numInCart+1)

    }

    const handleSubtract =()=>{
        if(cartItems[productIndexInCart].quantity === 1)
        {
            //購物車中只剩一件的話，remove object
            let newCartArray = [...cartItems]
            newCartArray.splice(productIndexInCart,1)
            setCartItems(newCartArray)
        }
        else
        {
            let newCartArray = [...cartItems]
            newCartArray[productIndexInCart].quantity--
            setCartItems(newCartArray)
        }

        setNumInCart(numInCart-1)
    }

    return (
        <div className='addToCart'>
            {
                (numInCart===0)?
                <span className="addToCartBtn" onClick={handleAdd}>加入購物車</span>
                :
                <span>
                    <span className="subtractBtn" onClick={handleSubtract}>-</span>
                    {numInCart}件
                    <span className="addBtn" onClick={handleAdd}>+</span>
                </span>
            }   
        </div>
    )
}
