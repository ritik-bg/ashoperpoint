
import React from 'react'
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'

const Checkout = () => {

    const products = [
        {
            id: 1,
            name: "Wireless Mouse",
            quantity: 2,
            price: 499
        },
        {
            id: 2,
            name: "Bluetooth Headphones",
            quantity: 1,
            price: 1699
        },
        {
            id: 3,
            name: "USB-C Charger",
            quantity: 3,
            price: 299
        },
        {
            id: 4,
            name: "Laptop Stand",
            quantity: 1,
            price: 899
        },
        {
            id: 5,
            name: "Portable SSD (512GB)",
            quantity: 1,
            price: 3499
        }
    ];
    
    const { register, handleSubmit, handleChange, formState: { errors } } = useForm({
        defaultValues: {
            quantity: 1,
            productName: "Laptop",
            price: 500
        }
    });


    const onsubmit = (data) => {
       
    }

    return (
        <div className='bg-orange-200 w-full h-auto p-4 flex flex-col '>
            <h1 className='text-black text-center text-lg font-bold'>Shoping Items Here For Checkout Final Stage</h1>
            <div className='product-container h-auto w-full mt-2'>
                {
                    products?.map((item, index) => (<>
                        <form onSubmit={handleSubmit(onsubmit)}>
                            <div className="inputs mx-auto flex flex-col gap-2">
                                <div className='w-100 flex justify-around'>
                                    <label>Product Name :</label>
                                    <input type="text" value={item?.name} readOnly />

                                </div>
                                <div className='w-100 flex justify-around'>
                                    <label>Product Qnty :</label>
                                    <input
                                        type="number" placeholder='quantity' onChange={handleChange} defaultValue={item?.quantity}
                                        {...register('quantity', { required: 'quantity is required' })}
                                    />

                                </div>
                                <div className='w-100 flex justify-around'>
                                    <label>Product price :</label>
                                    <input type="number" value={item?.price} readOnly />


                                </div>
                            </div>

                        </form>
                        <hr className='text-lg font-bold my-4 text-gray-700 bg-gray-700' /></>
                    ))
                } </div>
            <Button onClick={()=> window.location.href = "https://paytm.com/"} className='bg-orange-500 px-4 py-2 rounded-md mx-auto align-left self-end'>Pay Now</Button>
        </div>
    )
}

export default Checkout
