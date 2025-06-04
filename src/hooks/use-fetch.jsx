

import { useState } from "react"
import { toast } from "sonner"


const useFetch = (cb) => {
    const [data, setData] = useState(undefined)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    const fn = async (...args) => {      // Any number of arguments can come, and all of them will be available inside args as an array.
        setLoading(true)   
        setError(null)            // Clear any previous errors

        try { 
            const response = await cb(...args)      // Calls the API function (e.g., createAccount)
            setData(response)
            setError(null)
            return response       // 📌 Problem-1-Solved

        } catch (error) {
            setError(error)
            toast.error(error?.message || "Something went wrong")    // Handle missing error.message
        } finally { 
            setLoading(false)
        }
    }
    return { data, loading, error, fn, setData }
} 


export default useFetch