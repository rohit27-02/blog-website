import React,{useState} from 'react'
import styles from "../styles/contact.module.css"


const Contact = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [desc, setdesc] = useState('');

  const handleChange=(e)=>{
   if(e.target.name == "phone"){
     setphone(e.target.value)
   }
   else if(e.target.name == "name"){
     setname(e.target.value)
   }
   else if(e.target.name == "email"){
     setemail(e.target.value)
   }
   else if(e.target.name == "desc"){
     setdesc(e.target.value)
   }
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(name,phone,email,desc)
    const data = {name,phone,email,desc}
     fetch(`http://localhost:3000/api/postcontact`,{
       method :"post",
       headers:{
         "content-Type":"application/json"
       },
       body :JSON.stringify(data)
     }).then(Response=>Response.text())
     .then(data=>{
       console.log("success:",data);
     })
     .catch((error)=>{
       console.log("Error:",error);
     })
     alert("thanks for contacting us")
     setdesc('')
     setemail('')
     setname('')
     setphone('')
  }
  return (
    <div className={styles.main}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label  htmlFor="name" >Name</label>
          <input className={styles.label} name="name" type="text" onChange={handleChange} value={name} id="name" />
    
        </div>
        <div className={styles.mb3}>
          <label  htmlFor="email" >Email address</label>
          <input name="email" className={styles.label} type="email" onChange={handleChange} value={email}  id="email" />
            <div className={styles.text} id="emailHelp" >We will never share your email with anyone else.</div>
        </div>
        <div className={styles.mb3}>
          <label  htmlFor="phone" >Phone No.</label>
          <input name="phone" className={styles.label} onChange={handleChange} value={phone} type="phone"  id="phone" />
            
        </div>
        
        <div className={styles.mb3}>
          <label  htmlFor="desc"> Description</label>
          <textarea name="desc" className={styles.label} onChange={handleChange} value={desc} placeholder='write your concern here'></textarea>
        </div>
        
        <button type="submit" className={styles.submit}>Submit</button>
      </form>
    </div>
  )
}

export default Contact