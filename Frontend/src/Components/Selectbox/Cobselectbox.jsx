import React, { useState, useEffect} from "react";
//import { Context } from "../../App";
import './Cobselectedbox.scss'
import { useNavigate } from 'react-router-dom';
 
const SelectBox = ({ onChange }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [serviceNames, setServiceNames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const handleChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedOption(selectedValue);
      onChange(selectedValue);
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
          const response = await fetch('http://127.0.0.1:81/fundsTransferContainer/api/v1.0.0/party/cob/service/list');
          console.log("Response.status: "+Response.status);
          if(response.status===500){
            navigate("/internalError");
          }
          else if(response.status===400){
            console.log("User made bad Request");
          }
          console.error('Error fetching data:', error);
          setIsLoading(false);
          navigate("/internalError");

        }
       
      };
 
      fetchData();
    }, []);
 
    return (
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <select className="selectBox rounded" value={selectedOption} onChange={handleChange} >
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
