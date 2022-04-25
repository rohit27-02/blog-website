
import styles from "../../styles/blogpost.module.css"

const slug = (props) => {
  return (
    <div className={styles.main}>
      <div className={styles.h1}>{props.myblog && props.myblog.title}</div>
      <p >{props.myblog && props.myblog.content}</p>
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