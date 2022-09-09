import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

//anytime state or props change, React reruns this entire function
const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);


//use effect only reruns 
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilterMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className='App'>
      <h1 className='app-title'>Monsters Rolodex</h1>

      <SearchBox
        className='monsters-search-box'
        onChangeHandler={onSearchChange}
        placeholder='search monsters'
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;


//HOW I WOULD USE CLASS COMPONENTS INSTEAD OF FUCTIONAL COMPONENTS
// import { Component } from 'react';

// import CardList from './components/card-list/card-list.component';
// import SearchBox from './components/search-box/search-box.component';
// import './App.css';

//CLASS COMPONTENTS
// class App extends Component {
// construct first
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     };
//   }

//this runs last and then renders the page
//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then((response) => response.json())
//     .then((users) => this.setState(() => {
//       return {monsters: users}
//     },
//     () => {
//       console.log(this.state);
//     }
//     ));
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//   this.setState(() => {
//     return {searchField}
//   });
// }
  
// render runs after the constructor and then reruns
// after the component did mount ()
// render reruns anytime state or props change

//   render () {

//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//   return (
//     <div className="App">
//       <h1 className='app-title'>Monsters Rolodex</h1>
//     <SearchBox 
//     className='monsters-search-box' 
//     onChangeHandler={onSearchChange} 
//     placeholder='Search Monsters' 
//     />
//     <CardList monsters={filteredMonsters} />
//     </div>
//   );
//  }
// }

// export default App;
