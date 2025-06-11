import { useEffect, useState } from "react";





function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    //GET
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                setData(result);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Get Request Failed!");
            })
            ;
    }, [url]);







    //POST
    async function post<D>(payload: D) {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(payload)
            });
            const result = await res.json();
            setData(result);
            return result;
        }catch(error: any){
            setError(error.message || "POST Failed!");
    } finally {
        setLoading(false);
    }
}




    //PUT
    async function put<D>(payload: D) {
        setLoading(true);        // Set loading state to true while request is in progress
        setError(null);          // Reset any previous errors
      
        try {
          const res = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
      
          if (!res.ok) {
            // Check if response is not OK and throw an error
            throw new Error(`Failed to update: ${res.statusText}`);
          }
      
          const result = await res.json();  // Parse the JSON response
      
          setData(result);  // Set the data to the state on success
          return res;       // Return the response so it can be checked (optional)
        } catch (error: any) {
          // Handle errors, setting error message in state
          setError(error.message || "PUT Failed!");
          throw error;  // Rethrow the error to be handled by calling function (if needed)
        } finally {
          setLoading(false);  // Set loading to false once the request finishes
        }
      }
      







    //DELETE
    async function remove<D>(customUrl?: string) {
        setLoading(true);
        setError(null);
    
        try {
            // Make the DELETE request
            const res = await fetch(customUrl || url, {
                method: "DELETE",
            });
    
            // Check if the response is successful
            if (!res.ok) {
                throw new Error(`Failed to delete. Status: ${res.status}`);
            }
    
            // Parse the response JSON only if successful
            const result = await res.json();
    
            setData(result);
        } catch (error: any) {
            // Handle any errors that occurred during the fetch or parsing
            setError(error.message || "DELETE Failed!");
        } finally {
            // Always set loading to false when the operation is complete
            setLoading(false);
        }
    }
    









    return { data, loading, error, post, put, remove}
    

}
export default useFetch;