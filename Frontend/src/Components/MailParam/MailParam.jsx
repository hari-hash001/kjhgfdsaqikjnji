import React, { useState, useEffect } from 'react';
import './MailParam.scss';
import save from './save-icon.svg';
import searchIcon from './search-icon.png';

const MailParam = () => {
  const [inputValue, setInputValue] = useState('');
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmails, setFilteredEmails] = useState([]);

  
  useEffect(() => {
    fetchEmails();
  }, []);
  
  useEffect(() => {
    setFilteredEmails(emails); // Initialize filteredEmails with all emails
  }, [emails]);
  

  const fetchEmails = async () => {
    try {
      const response = await fetch('http://localhost:5000/email/emails');
      if (response.ok) {
        const data = await response.json();
        setEmails(data);
      } else {
        throw new Error('Failed to fetch emails');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      try {
        const response = await fetch('http://localhost:5000/email/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: inputValue }),
        });
        if (response.ok) {
          await fetchEmails();
          setInputValue('');
        } else {
          throw new Error('Failed to save email');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to save email');
      }
    }
  };

  const handleDelete = async (index) => {
    try {
      const response = await fetch(`http://localhost:5000/email/emails/${index}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await fetchEmails();
      } else {
        throw new Error('Failed to delete email');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setInputValue(emails[index]);
  };
  const handleCancelEdit = (index) => {
    setInputValue(emails[index]);
    setEditIndex(null);
  };
  const toggleSearchBar = () => {
    setIsExpanded(!isExpanded);
  };
  // const handleSearch = e => {
  //   setSearchQuery(e.target.value);
  // };
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    const filtered = emails.filter((email) =>
      email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEmails(filtered);
  };
  

  const handleSaveEdit = async (index) => {
    if (inputValue.trim() !== '') {
      try {
        const response = await fetch(`http://localhost:5000/email/emails/${index}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: inputValue }),
        });
        if (response.ok) {
          await fetchEmails();
          setInputValue('');
          setEditIndex(null);
        } else {
          throw new Error('Failed to save edited email');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to save edited email');
      }
    } else {
      setError('Please enter a valid email address');
    }
  };




  return (
    <div className="container-fluid pt-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-5 col-sm-12 leftpane d-flex justify-content-start">
        <img src="/HomeAssets/mail.jpg" alt="mail" />
        </div>
        <div className="col-md-5 rightpane d-flex gap-2 flex-column px-4 py-2" >
            <form onSubmit={handleSubmit} className='mailform d-flex flex-column p-2 gap-3'>
                  <label className='mailLabel'>Add Email</label>
                  <div className="col-md-12 emailtxt">
                  <input type="" value={inputValue} onChange={handleChange} 
                    placeholder="Enter email" style={{  height: '40px' }}
                    className='textBox col-md-12  col-sm-12 col-xs-12 p-2'/>
                  </div>
                    
                  <div className="col-md-12   addemail d-flex justify-content-center">
                  <button type="submit" className="addBtn col-md-6 col-sm-12 col-xs-12">Add</button>
                  </div>
        {error && <p className="error">{error}</p>}
      </form>
      <div className='searchBar col-md-12 col-sm-12 d-flex justify-content-end align-items-center gap-1'>
      
        <svg xmlns="http://www.w3.org/2000/svg" className='searchIcon'
          onClick={toggleSearchBar}  viewBox="0 0 50 50"><path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/></svg>
        <input
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={handleSearch}
          className={`searchInput ${isExpanded ? 'expanded' : ''}`}
          style={{ display: isExpanded ? 'block' : 'none' }}
        />
        
      </div>
        <div className="col-md-12 col-sm-12 list pt-3">
        <table className="mailtable overflow-x-auto col-md-12 col-sm-12">
        <thead>
          <tr>
            <th scope="col-md-4">S.no</th>
            <th scope="col-md-4">Email</th>
            <th scope="col-md-4">Actions</th>
          </tr>
        </thead>  
        <tbody>
          {filteredEmails.map((email, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>
                  {editIndex === index ? (
                    <input
                      type="email"
                      value={inputValue}
                      onChange={handleChange}
                    />
                  ) : (
                    email
                  )}
              </td>
              <td className='d-flex align-items-center p-3 justify-content-center'>
                {editIndex === index ? (
                  <div className="buttonsoperation d-flex gap-4">
                    <button onClick={() => handleSaveEdit(index)} title="Save" >
                    <img src={save} className='saveImage'></img>
                  </button>
                  <button onClick={() => handleCancelEdit(index)} title="cancel" >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L12 10.9393L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L13.0607 12L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L12 13.0607L6.53033 18.5303C6.23744 18.8232 5.76256 18.8232 5.46967 18.5303C5.17678 18.2374 5.17678 17.7626 5.46967 17.4697L10.9393 12L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z" fill="#0F172A"/>
                  </svg>

                  </button>
                  </div>
                ) : (
                  <>
                    <button className="editBtn" onClick={() => handleEdit(index)} 
                     role="button"
                     tabIndex="-3"
                     title="Edit"
                    >

                    <svg class="feather feather-edit" fill="none" height="24" width="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
          
                    <button className="deleteBtn" onClick={() => handleDelete(index)} title="Delete">
                    <svg fill="#FA5252" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="24" height="24">    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/></svg>

                    </button>
                    
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    </div>
        </div>
      </div>

  );
};

export default MailParam;





// import React, { useState, useEffect } from 'react';
// import './MailParam.scss';
// import save from './save-icon.svg';
// import searchIcon from './search-icon.png';
 
// const MailParam = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [emails, setEmails] = useState([]);
//   const [error, setError] = useState('');
//   const [editIndex, setEditIndex] = useState(null);
//   const [isShown, setIsShown] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredEmails, setFilteredEmails] = useState([]);
//   const [isExpanded, setIsExpanded] = useState(false);
 
//   useEffect(() => {
//     // Filter emails whenever searchQuery or emails change
//     const filtered = emails.filter(email =>
//       email.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredEmails(filtered);
//   }, [searchQuery, emails]);
 
//   const handleChange = e => {
//     setInputValue(e.target.value);
//     setError('');
//   };
 
//   const handleSubmit = e => {
//     e.preventDefault();
//     if (inputValue.trim() !== '') {
//       setEmails([...emails, inputValue]);
//       setInputValue('');
//     }
//   };
 
//   const handleDelete = index => {
//     setEmails(emails.filter((email, i) => i !== index));
//   };
 
//   const handleEdit = index => {
//     setEditIndex(index);
//     setInputValue(emails[index]);
//   };
 
//   const handleSaveEdit = index => {
//     if (inputValue.trim() !== '') {
//       const updatedEmails = [...emails];
//       updatedEmails[index] = inputValue;
//       setEmails(updatedEmails);
//       setInputValue('');
//       setEditIndex(null);
//     } else {
//       setError('Please enter a valid email address');
//     }
//   };
 
//   const handleSearch = e => {
//     setSearchQuery(e.target.value);
//   };
 
//   const toggleSearchBar = () => {
//     setIsExpanded(!isExpanded);
//   };
 
//   return (
// <div>
// <div className='emailForm'>
// <form onSubmit={handleSubmit}>
// <label className='mailLabel'>Add Email</label>
// <input
//             type=''
//             value={inputValue}
//             onChange={handleChange}
//             placeholder='Enter email'
//             style={{ width: '300px', height: '40px' }}
//             className='textBox'
//           />
// <button type='submit' className='addBtn'>
//             Add
// </button>
//           {error && <p className='error'>{error}</p>}
// </form>
// </div>
 
//       <div className='searchBar'>
// <input
//           type='text'
//           placeholder='Search...'
//           value={searchQuery}
//           onChange={handleSearch}
//           className={`searchInput ${isExpanded ? 'expanded' : ''}`}
//           style={{ display: isExpanded ? 'block' : 'none' }}
//         />
// <img
//           src={searchIcon}
//           alt='Search'
//           className='searchIcon'
//           onClick={toggleSearchBar}
//         />
// </div>
 
//       <div className='container'>
// <table className='table'>
// <thead>
// <tr>
// <th scope='col'>#</th>
// <th scope='col'>Email</th>
// <th scope='col'>Actions</th>
// </tr>
// </thead>
 
//           <tbody>
//             {filteredEmails.map((email, index) => (
// <tr key={index + 1}>
// <td>{index + 1}</td>
// <td>
//                   {editIndex === index ? (
// <input
//                       type='email'
//                       value={inputValue}
//                       onChange={handleChange}
//                     />
//                   ) : (
//                     email
//                   )}
// </td>
// <td>
//                   {editIndex === index ? (
// <button onClick={() => handleSaveEdit(index)}>
// <img src={save} className='saveImage' alt='Save' />
// </button>
//                   ) : (
// <>
// <button
//                         className='editBtn'
//                         onClick={() => handleEdit(index)}
//                         role='button'
//                         tabIndex='-3'
// >
//                         Edit
// </button>
 
//                       <button
//                         className='deleteBtn'
//                         onClick={() => handleDelete(index)}
// >
//                         Delete
// </button>
// </>
//                   )}
// </td>
// </tr>
//             ))}
// </tbody>
// </table>
// </div>
// </div>
//   );
// };
 
// export default MailParam;
