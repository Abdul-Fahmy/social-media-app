import styles from './Loading.module.css';
export default function () {
    
  return (
    <div className="w-full flex justify-center items-center h-screen">
        <div className= {styles.loader}></div>
    </div>
  )
}
