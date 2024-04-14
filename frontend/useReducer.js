import {useReducer} from 'react'

function reducer(state, action){
    if(action.type == 'increment'){
        return state+1
    }else if(action.type == 'decrement'){
        return state-1
    }else if(action.type =='reste'){
        return 0
    }

    switch(action.type){
    case 'increment':{
        return state+1  
    }
    }
}

export default function Counter(){
const[count , dispatch] = useReducer(reducer , 0)

const handleClick = ()=>{
    const n = prompt("")
}

return(
    <div>
        
            <h2>total counts - {count.length} </h2>

            <button onClick= {()=>{
                dispatch({type :"increment"})
            }}>+1</button>
         <button onClick= {()=>{
                dispatch({type :"decrement"})
            }}>-1</button>
             <button onClick= {()=>{
                dispatch({type :"reset"})
            }}>reset</button>
    </div>
)
}