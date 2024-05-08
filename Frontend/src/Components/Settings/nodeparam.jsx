import './nodeparam.scss'
import React, { useState } from 'react';
 
const NodeParam = (paramsdata) => {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [modalVisible, setModalVisible] = useState(paramsdata.modalVisible);
 
    const closeModal = async () => {
       
        setModalVisible(false);
        paramsdata.handleItemClick("");
 
    };
   
    const handletext1Change = (event) => {
        setText1(event.target.value);
    };
   
    const handletext2Change = (event) => {
        setText2(event.target.value);
    };
   
    const handleOkClick = () => {
        closeModal();
    };
   
    return (
        <>
 
        {  modalVisible ?
        <div className={`node-container d-flex flex-column justify-content-center grid gap-3 pt-4 pb-4 px-4 ${modalVisible ? 'visible' : 'hidden'}`}>
           
                <h4 className='head d-flex justify-content-center'>Node Parameters</h4>
                <div className="input-container pt-2">
                    <div className="label">
                    <label htmlFor="text1">Text1 </label>
                    </div>
                    <div className="input ">
                    <input
                        type="text"
                        id="text1"
                        value={text1}
                        onChange={handletext1Change}
                    />
                    </div>
                   
                </div>
                <div className="input-container pt-2">
                    <div className="label">
                    <label htmlFor="text2">Text2:</label>
                    </div>
                    <div className="input ">
                    <input
                        type="text"
                        id="text2"
                        value={text2}
                        onChange={handletext2Change}
                    />
                    </div>
                   
                </div>
                <div className="buttons m-0">
                <button className="close-btn px-3 py-2 rounded" onClick={closeModal}>Close</button>
                <button className="btn submit px-5" onClick={handleOkClick}>Submit</button>
               
                </div>
        </div>:<></>
        }
 
</>
    );
};
 
export default NodeParam;