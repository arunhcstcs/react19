import React, { useState, useTransition } from 'react'

const Transition = () => {
    // const [isPending,setIspendig] = useState(false);

    const [isPending,startTransition] = useTransition();
    const [user,setuser] = useState([]);

    const handleClick = async()=>{
        // setIspendig(true);

        startTransition(async ()=>{
            try {
            
                let response = await fetch('https://jsonplaceholder.typicode.com/users');
                if(response.ok){
                    let data = await response.json();
                    // setIspendig(false);
                    setuser(data);
                }
            } catch (error) {
                
            }
        })

      

    }
  return (
    <div>
        {isPending ? <div><h1>Loading..................</h1></div> : '' }
        <button onClick={handleClick}>Click</button>

        <div>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Email</td>
                    </tr>
                </thead>
                <tbody>
                    {user.length > 0 ? 
                    user.map((item)=>(
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                        </tr>
                    ))
                    :<tr><td>No Data</td></tr>}
                </tbody>
            </table>
            
        </div>
    </div>
  )
}

export default Transition