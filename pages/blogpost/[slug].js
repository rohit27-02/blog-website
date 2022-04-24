import React,{useState,useEffect} from 'react'
import {useRouter} from "next/router"
import styles from "../../styles/blogpost.module.css"

const slug = (props) => {
  const [blog, setBlog] = useState(props.myblog);
  const router = useRouter();
  return (
    <div className={styles.main}>
      <div className={styles.h1}>{blog && blog.title}</div>
      <p >{blog && blog.content}</p>
      </div>
  )
}
export async function getServerSideProps(context){
    const {slug}=context.query;
    let data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
      let myblog= await data.json()
    return { props : {myblog}}
 
}

export default slug