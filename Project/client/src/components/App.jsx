import React from 'react' ;
import axios from 'axios' ;

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
     info : [],
     num : 11
    }
    this.onCheck = this.onCheck.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onAdd = this.onAdd.bind(this)
  }
  onDelete(event){
    event.preventDefault()
    this.state.info.pop()
    this.setState({
      info: this.state.info
    })
  }
  onAdd(event){
    event.preventDefault()
    var names = ['Ross','Rachel','Monica','Chandler','Joey','Phoebe']
    var banks = ['Amex','Chase','Discover','Capital One','Citi']
    var lastNames = ['Geller','Green','Bing','Buffay','Tribbiani']
    var percent = [5,10,15,20]
    var balances = [500,1000,1500,2000,3000]
    var entry = {
      id : this.state.num,
      creditorName: banks[Math.floor(Math.random() * banks.length)],
      firstName : names[Math.floor(Math.random() * names.length)],
      lastName : lastNames[Math.floor(Math.random() * lastNames.length)],
      minPaymentPercentage: percent[Math.floor(Math.random() * percent.length)],
      balance : balances[Math.floor(Math.random() * balances.length)],
      selected : true
    }
    this.state.info.push(entry)
    this.state.num += 1
    this.setState({
      info: this.state.info,
      num : this.state.num
    })
  }
  onCheck (event) {
    this.state.info[event.target.id].selected = !this.state.info[event.target.id].selected
    this.setState({
      info : this.state.info
    })
    console.log(this.state.info)
    //console.log(event.target.id)
  }
  componentDidMount(){
  axios.get('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json')
  .then(data => {
    data.data.map(entry => {
      entry.selected = true
    })
    this.setState({
      info : data.data
    })
  })
  .catch(err => {
    console.log('There was an error')
  })
  }
  render(){
    var totalBalance = 0
    var totalChecked = 0
    for (var i = 0 ; i < this.state.info.length; i++){
      if (this.state.info[i].selected === true){
        totalBalance += this.state.info[i].balance
        totalChecked++
      }
    }
    
    return (
      <div> 
        <div id='box1'>
        <table>
        <thead>
          <tr>
            <th id='empty'></th>
            <th> Creditor</th>
            <th> First Name</th>
            <th> Last Name</th>
            <th> Min Pay %</th>
            <th> Balance</th>
          </tr>
        </thead>
        <tbody>
          {this.state.info.map((entry, idx) => 
         <tr key={entry.id} data-testid='entry'> 
           <td id='empty' > 
             <input type = 'checkbox' checked= {entry.selected}  
              id = {idx} onChange = {this.onCheck} data-testid='check'/>
           </td>
           <td> {entry.creditorName} </td> 
           <td> {entry.firstName} </td> 
           <td> {entry.lastName} </td> 
           <td id='percent'> {entry.minPaymentPercentage} %</td> 
           <td id='balance' data-testid='bPerEntry'>{entry.balance}</td> 
         </tr>)}
        </tbody>
        </table>
        </div>
        <div>
        <button onClick={this.onAdd}> Add Debt</button>
        <button onClick={this.onDelete}> Delete Debt</button>
        </div>
        <div id='box2'>
          <span id='total1'> Total: </span>
          <span data-testid='totalBalance'>{totalBalance}</span>
        </div>
        <div id='box3'>
          <span> Total Row Count: {this.state.info.length}</span>
          <span> Check Row Count: {totalChecked}</span>
        </div>
      </div>
    )
  }
}

export default App;