import React,{useState} from 'react'
import styles from "../styles/blog.module.css"
import Link from 'next/link';
import InfiniteScroll from "react-infinite-scroll-component";
import * as fs from "fs";
const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.allBlogs);
  const [count,setCount] = useState(1)   
  const fetchData = async () => {
    let d = await fetch(`http://localhost:3000/api/blogs?count=${count+1}`)
    setCount(count +1)  
    let data = await d.json()
      setBlogs(data)
  };
  return (
    <div className= {styles.main}>
      <InfiniteScroll
  dataLength={blogs.length} //This is important field to render the next data
  next={fetchData}
  hasMore={props.allCount !== blogs.length}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }
>
{blogs.map((blogitem)=>{
          return <div className={styles.blogItems} key={blogitem.slug}>
        <Link passHref={true} href={`/blogpost/${blogitem.slug}`}>
        <h2 className={styles.blogItemsh3}>{blogitem.title}</h2></Link>
        <p>{blogitem.content.substring(0,140)} ...</p>
      </div>
        })}
    
</InfiniteScroll>
</div>
  );
}
        
export async function getStaticProps(context){
  let data= await fs.promises.readdir(`blogdata`)
  let allCount = data.length;
  let myFile
  let allBlogs=[]
  for (let index = 0; index <1; index++) {
    const item = data[index];
    myFile= await fs.promises.readFile(("blogdata/"+item),"utf-8")
    allBlogs.push(JSON.parse(myFile))

  }
return{
props : {allBlogs,allCount}
}
}

export default Blog