
import gifToAdd from '../assets/images/loading.gif';
const LoadingPage = () => {
  return (

    <div style={{ position: 'absolute', left: '50%', transform: 'translate(-50%,0%)' }}>
      <img src={gifToAdd} alt='Loading page' />
    </div>
  );
};
export default LoadingPage