import React,{useState,useEffect} from 'react'
import styles from "../styles/blog.module.css"
import Link from 'next/link';
const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.allBlogs);
  return (
    <div className= {styles.main}>
        {blogs.map((blogitem)=>{
          return <div className={styles.blogItems} key={blogitem.slug}>
        <Link href={`/blogpost/${blogitem.slug}`}>
        <h2 className={styles.blogItemsh3}>{blogitem.title}</h2></Link>
        <p>{blogitem.content.substring(0,140)}</p>
      </div>
        })}
      </div>
  );
}
export async function getServerSideProps(context){
  let data= await fetch("http://localhost:3000/api/blogs")
     let allBlogs = await data.json()
return{
props : {allBlogs}
}
}

export default Blog