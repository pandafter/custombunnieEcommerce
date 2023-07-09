


const CustomButton = ({type, title, onClick}) => {
  return (
    <button type={type} onClick={onClick}>
            <span>{title}</span>
    </button>
  )
}

export default CustomButton