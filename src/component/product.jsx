import { Component } from "react";
import ProductStructure from './productstructure'
class Product extends Component{
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            totalAmount:0,
            cart:[],
            cartitem:[],
            DataisLoaded: false
        };
    }
    componentDidMount() {
        fetch(
'https://fakestoreapi.com/products?limit=6', {
	
})
            .then((res) => res.json())
            .then((json) => {
                // console.log(json)
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })

         const app = localStorage.getItem('cart') 
         this.setState({
            cartitem: JSON.parse(app) ? JSON.parse(app) : []
         }, () => this.calculatePrice())   
    }
 
    componentDidUpdate(){
        //    console.log(this.state.cartitem)
        localStorage.setItem('cart',  JSON.stringify(this.state.cartitem))
    
        }
 handleclick =(index,key)=>{
        // console.log(key)
        if(!this.state.cart.includes(key)){
            this.state.cart.push(key)
            const t = [...this.state.cartitem];
            t.push({...index,quantity:1 ,id:key});
            this.setState({
                cartitem :t
            }, () => this.calculatePrice())
            
        }else{
        //     console.log(key,"1")
        //     console.log(this.state.cartitem,"2")
        //   console.log(index.quantity,"3")
          const ap1 =  this.state.cartitem.filter((id,k)=> {return  (
            id.id !== key 
              )})
         const ap =  this.state.cartitem.filter((id,k)=> {return  (
            id.id == key && (id.quantity= id.quantity+1
               
            )
              )})
            //   console.log(ap)
            //   console.log(ap1)
           let ap2 = ap1.concat(ap)
              this.setState({
                cartitem :ap2
            }, () => this.calculatePrice())

        }
    }
    increment(index,key){
        // console.log(key)
        this.state.cartitem[key].quantity =  this.state.cartitem[key].quantity + 1
        // console.log(this.state.cartitem)
        this.setState({
            cartitem :this.state.cartitem
        }, () => this.calculatePrice())
        
    }
    decrement(index,key){
        // console.log(key)
        this.state.cartitem[key].quantity =  this.state.cartitem[key].quantity - 1
        // console.log(this.state.cartitem)
        this.setState({
            cartitem :this.state.cartitem
        }, () => this.calculatePrice())
         
    }
    calculatePrice=() =>{

let total = this.state.cartitem.reduce((total, item) => (total + (item.quantity * (item.price))), 0);
// console.log(total)
// console.log(this.state.cartitem)

this.setState({
    totalAmount:total
})

    }
    deleteitem=(index,key) =>{
// console.log(this.state.cartitem)
// console.log(this.state.cart)
// console.log(key)
let arr = this.state.cartitem.filter((id ,keys)=> { return keys !== key})
let arr1 = this.state.cart.filter((id,keys)=>{ return keys!== key})
// console.log(arr)
// console.log(arr1)
this.setState({
    cartitem:arr,
    cart :arr1
}, () => this.calculatePrice())
 
 }


    render(){
        // console.log(this.state.items)
        // console.log(this.state.cartitem)
        return(
            <>
            <h1>Products</h1>
            <div className="product">
            {
                this.state.items.map((index,key)=>{
                    return (
                        <div key={key} className="cardbody">
                        <h3>{index.category}</h3>
                        <div>
                            <img src={index.image} alt="" />
                        </div>
                        <h4>{index.price}</h4>
                        <span>{index.description}</span><br/>
                        <button key={key} onClick={() => this.handleclick(index, key)}>Add To Cart</button>
                    </div>
                    )
                })
            }
     </div>
     {/* {console.log('cart', this.state.cartitem)} */}
    < ProductStructure 
    cart={this.state.cartitem} 
    amt ={this.state.totalAmount}
    incr={this.increment.bind(this)} 
    decr={this.decrement.bind(this)}
    del={this.deleteitem.bind(this)}/>

     
   
<h1>{this.state.totalAmount.toFixed(2)}</h1>
            </>
        )
    }
}
export default Product