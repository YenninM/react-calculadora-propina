import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [total,setTotal] = useState('');
  const [propina,setPropina] = useState('10%');
  const [dividir, setDividir] = useState(1);
  const [dividirTotal, setDividirTotal]= useState(0);

  function handleTotalCuentaChange(e){
    setTotal(e.target.value);
  }
  
  function handlePropinaChange(e){
    let value = e.target.value.replace('%','');
    if(value.indexOf('%') === -1) {
      value = value+'%';
    }
    setPropina(value);
  }
  function dividirMenos(){
    setDividir(oldValue => Math.max(oldValue - 1, 1));
  }
  function dividirMas(){
    setDividir(oldValue => oldValue + 1);
  }

  function calculate(){
    const percentage = 1 + parseInt(propina.replace('%','')) / 100;
    const result = (total * percentage / dividir).toFixed(2);
    setDividirTotal(result);
  }

  useEffect(() => {
    calculate();
  }, [total,propina,dividir])

  return (
    <div>
      <label>Total Cuenta</label>
      <input type="text" placeholder={'0.00'} value={total}
        onChange={handleTotalCuentaChange}/>
      <label>Propina</label>
      <input type="text" placeholder={'0.00'} value={propina}
        onChange={handlePropinaChange}/>
      <div className="summary">
        <div className="split">
        <label>Dividir</label>
            <div className="split-control">
            <button onClick={dividirMenos}>-</button>
            <span>{dividir}</span>
            <button onClick={dividirMas}>+</button>
            </div>
        </div>
        <div className="result">
          <label>Total por persona</label>
          <span>{dividirTotal}</span>
        </div>
      </div>
    </div>
  );
}
export default App;

