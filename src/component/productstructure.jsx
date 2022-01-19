import { Component } from "react";

class ProductStructure extends Component{
    constructor(props){
        super(props)
        this.state ={
            arr :[],
        }

    }

componentDidUpdate(){
    //    console.log(this.props.cart)
       
    
    }
//     deleteitem=(index,key) =>{
// console.log(index);
// console.log(key)
//     let arr =  this.props.cart.splice(key,1);
// console.log(arr)
//     }

   
    render(){
        // {console.log('data', this.props.amt)}
        return(
            <>
          
           <div className="cartproduct">
               <table>
                   <thead>
                       <tr>
                           <th>Serial No.</th>
                           <th>Product name</th>
                           <th>Product Price</th>
                           <th>Quantity</th>
                         
                       </tr>
                   </thead>
                   <tbody>

            {
             
                this.props.cart.map((index,key)=>{
                    return (
                       <tr>
                           <td>{key+1}</td>
                           <td>{index.title}</td>
                           <td>{index.price}</td>
                           <td>{index.quantity}<br/><button
                           onClick={()=>this.props.incr(index,key)} 
                          >+</button><button  onClick={()=>this.props.decr(index,key)}>-</button></td>
                          <td><button onClick={()=>this.props.del(index,key)}>Delete</button></td>
                       </tr>  
                    )
                })
            }
   
            </tbody>
            </table>
            </div>
            
            <h1>Your cart total amount is - {this.props.amt}</h1>
            </>
        )
    }
}
export default ProductStructure