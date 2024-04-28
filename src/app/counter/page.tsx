"use client"
import { Button } from '@/components/ui/button';
import { useCounterStore } from '@/lib/cart/store1'

export default function page() {

    const count = useCounterStore((state) => state.count);

    const increment = useCounterStore((state) => state.increment)
    const decrement = useCounterStore((state) => state.decrement)



  return (
    <div className='flex flex-col justify-center'>
        <div>
            {count}
        </div>
    
        <div>
            <Button onClick={increment}>Increment</Button>
            <Button onClick={decrement}>Decrement</Button>
        </div>
    </div>
  )
}
