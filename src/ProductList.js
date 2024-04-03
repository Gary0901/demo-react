/*rfc 快捷鍵 react functional component*/ 
import React from 'react'
import {Link} from "react-router-dom"

/* import styles from './ProductList.module.css' */
import { useState,useEffect } from 'react' //React Hook
import Title from './Title'
import QuantItyBtn from './QuantItyBtn'
/*import logo from './react.png
<img src ={logo} width="100px"/>'*/

export default function ProductList() {

    /* let productList = [
        {"id" : 1,"name" : "蘋果", "price" : 5,"image" : "apple.jpg","description" : "新鮮蘋果50克，一日蘋果，醫生遠離我"},
        {"id" : 2,"name" : "橙", "price" : 3,"image" : "orange.jpg","description" : "新鮮橙50克，又甜又好吃"},
        {"id" : 3,"name" : "芒果", "price" : 4,"image" : "mango.jpg","description" : "新鮮芒果500克，宜作甜品"},
        {"id" : 4,"name" : "西瓜", "price" : 20,"image" : "watermelon.jpg","description" : "新鮮西瓜2公斤，夏季必備"},
        {"id" : 5,"name" : "藍莓", "price" : 10,"image" : "blueberry.jpg","description" : "新鮮藍莓50克，補眼之寶"},
        {"id" : 6,"name" : "白蘿蔔", "price" : 5,"image" : "white-carrot.jpg","description" : "新鮮白蘿蔔1公斤，宜煲湯"}
    ] */

    let [productList, setProductList] = useState([])
    /* let [input,setInput] = useState("") */
    
    //useEffect 
    useEffect(()=>{
        //1:無第二個參數 component每次render 都會觸發
        //2:Dependency Array是空Array 只會在第一次網頁render時才觸發
        //3:Dependency Array有變數的時候:第一次網頁render時+指定的變數改變 會觸發
        fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
            .then(response=>response.json())
            .then(data=>setProductList(data))
        /* console.log(productList) */
    },[]) // <== Dependency Array

    /* useEffect(()=>{
        if(input.length>4)
            console.log("字串夠長")
        else 
            console.log("字串太短")
    },[input]) */
    //let product = '水果'

    /* const [product,setProduct] = useState('水果') */

    /* const[showProduct, setShowProduct] = useState(false) */

    /* const handleClick = () => {
        setProduct('react')
        console.log(product)
    } */

  return (
    //React Fragement簡寫
    <>
      {/*conditonal rendering*/}
      {/* {showProduct && <button onClick = {()=>{setShowProduct(false)}}>隱藏產品</button>}
      {!showProduct && <button onClick = {()=>{setShowProduct(true)}}>顯示產品</button>} */}

      {/* <button onClick={()=>setProductList('change')}>改變product list值</button> */}

      {/* <input type="text" onChange={e=>setInput(e.target.value)}/> */}
      <Title mainTitle = "React入門水果店" /* subtitle = "今日有九折" *//>
      
      {/* <img src={process.env.PUBLIC_URL+"/img/apple.jpg" }width="200px"/> */}
      <div className='container'>
        {
            /* showProduct && */ productList.map((product)=>(
                <React.Fragment key={product.id}> {/*React.Fragment全部寫出來*/}

                    <div className = "containerItem">  
                        <Link to={'/product/'+product.id}>
                            <img src={process.env.PUBLIC_URL + '/img/'+ product.image } alt={product.name} /> 
                        </Link>

                        <div className='productName'>
                            {product.name} - {product.price}元/件
                        </div>

                        <QuantItyBtn productInfo={product}/>
                    </div>
                </React.Fragment>
            ))
        }
      </div>
    </>
  )
}

