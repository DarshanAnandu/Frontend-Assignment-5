import cart from '../assets/icons8-shopping-cart-64 (1).png';

export default function Welcome() {
    return (
        <div className="h-16 w-full border-2  
                        flex items-center  
                        bg-emerald-500 text-white">
            <div className='flex-1 text-center'>
                <p className="text-4xl block">
                    Product Listing Page
                </p>
            </div>
            <div className='flex justify-end items-center'>
                <img
                    src={cart}
                    alt='cart'
                    className='cursor-pointer pr-2 font-bold'
                    style={{ maxWidth: '40px' }} 
                />
            </div>
        </div>
    )
}