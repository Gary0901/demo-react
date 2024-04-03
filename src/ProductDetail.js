import React from 'react'
import {useParams,Link} from 'react-router-dom'
import Title from './Title'
import QuantItyBtn from './QuantItyBtn'
import { useState,useEffect } from 'react'


export default function ProductDetail() {

    let params = useParams()
    let [productDetail,setProductDetail] = useState(null)

    //useEffect 
    useEffect(()=>{
        //1:無第二個參數 component每次render 都會觸發
        //2:Dependency Array是空Array 只會在第一次網頁render時才觸發
        //3:Dependency Array有變數的時候:第一次網頁render時+指定的變數改變 會觸發
        fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
            .then(response=>response.json())
            .then(data=>
                {
                    let productInfo = data.find((element)=>{
                        return element.id === parseInt(params.id) 
                    })
                    setProductDetail(productInfo)
                } )
    },[params.id]) // <== Dependency Array



    return (
        <div>
            {
                productDetail &&
                <div>
                    <Title mainTitle = {productDetail.name +"產品資料"}/>

                    <table width="100%">
                        <tbody>
                        <tr>
                            <td align='right'>
                                <img src={process.env.PUBLIC_URL+'/img/'+productDetail.image} alt={productDetail.name} width="400px"/>
                            </td>
                            <td width="45%" padding="10">
                                <p>名稱 : {productDetail.name}</p>
                                <p>售價 : {productDetail.price}元</p>
                                <p>描述 : {productDetail.description}</p>
                                <QuantItyBtn productInfo={productDetail}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>    
                </div>
                
            }
            <Link to="/" >
                <div className="backToGoodsListBtn">↩️ 返回商品列表</div>
            </Link>
            
        </div>
    )
}

