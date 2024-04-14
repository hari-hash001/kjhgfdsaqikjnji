// import React, { useState, useEffect} from "react";


// const SelectBox = () => {
//     const [selectedOption, setSelectedOption] = useState('');
//     const [serviceNames, setServiceNames] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
  
//     const handleChange = (event) => {
//       const selectedValue = event.target.value;
//       setSelectedOption(selectedValue);

//     };

  
      
//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await fetch('http://127.0.0.1:81/fundsTransferContainer/api/v1.0.0/party/cob/service/list');
//           if (!response.ok) {
//             throw new Error('Failed to fetch data');
//           }
//           const jsonData = await response.json();
//           const names = jsonData.body.map(item => item['Service Name']);
//           setServiceNames(names);
//           setIsLoading(false);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//           setIsLoading(false);
//         }
//       };
//       fetchData();
//     }, []); 

//     return (
//       <div>
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : (
//           <select value={selectedOption} onChange={handleChange}>
            
//             <option value="">SELECT COB</option>
//             {serviceNames.map((serviceName, index) => (
//               <option key={index} value={serviceName}>{serviceName}</option>
//             ))}
//           </select>
//         )}
//       </div>
//     );
// }

// export default SelectBox;





import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../App";
 
 
const SelectBox = ({ onSelect }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [serviceNames, setServiceNames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const value=useContext(Context)//
   
    const handleChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedOption(selectedValue);
      onSelect(selectedValue); // Call the onSelect function passed from parent
      value.setSelectedCOB(event.target.value)//
     
    };
 
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://127.0.0.1:81/fundsTransferContainer/api/v1.0.0/party/cob/service/list');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const jsonData = await response.json();
          const names = jsonData.body.map(item => item['Service Name']);
          setServiceNames(names);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        }
      };
      fetchData();
    }, []);
 
    return (
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <select value={selectedOption} onChange={handleChange}>
            <option value="">SELECT COB</option>
            {serviceNames.map((serviceName, index) => (
              <option key={index} value={serviceName}>{serviceName}</option>
            ))}
          </select>
        )}
      </div>
    );
}
 
export default SelectBox;