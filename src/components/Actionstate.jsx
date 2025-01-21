import React, { useActionState, useState } from "react";


const Actionstate = ()=>{

    // without use of useActionState

    // const [pending,setPending] = useState(false);
    // const [data,setData] = useState(null);
    // const [error,setError] = useState(null);

    // const submitAction = async()=>{
    //     setPending(true);
    //     setError(null);

    //     try {

    //         let response = await fetch('https://jsonplaceholder.typicode.com/users',{
    //             method:'POST',
    //         });

    //         // console.log(response);
    //         if(response.ok){
    //             let result = await response.json();
    //             setPending(false);
    //             setData(result)
    //         }else{
    //             setPending(false);
    //             setError('Something went wrong!!!');
    //         }

    //         // if(res)
            
    //     } catch (error) {
    //         setPending(false);
    //         setError(error);
    //     }
    // }

    const submitAction = async(prvData,formData)=>{

        const response = await fetch('https://jsonplaceholder.typicode.com/users',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                email:formData.get('email'),
                password:formData.get('password')
            }),
        });

        console.log('response',response);

        if(!response.ok){
            return { error:'Something Went Wrong'}
        }else{
            let res = await response.json();
            return {message:'form Submitted',id:res.id}
        }

    }


    const [state,submit,pending] = useActionState(submitAction);

    // console.log('state',state);

    return(
        <div className="container">

            <div className="row">
                <div className="col-md-6">
                    <form action={submit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" className="form-control" />
                        </div>

                        <button disabled={pending} type="submit" className="btn btn-primary">
                            {pending ? 'Submitting...':'Submit'}
                        </button>
                    </form>
                </div>
                <div className="col-md-6">

                    {state?.error && <p className="text-danger">{state.error}</p>}
                    {state?.message && <p className="text-success">{state.message}</p>}

                </div>
            </div>
        </div>
    )

}

export default Actionstate;