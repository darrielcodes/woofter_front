import React, {useEffect, useState} from "react";

const useGetDog = (route) => {

  const [clicked, setClicked] = useState(false)
    const [url, setUrl] = useState('')
    const [user, setUser] = useState({
      name: '',
      text: '',
      url: '',
      clicked: false
    })
    //fetch data: (always put in useeffect)
    useEffect(() => {
    
      fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(json => setUrl(json.message))
        .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    
    fetch('https://fakerapi.it/api/v1/custom?_quantity=1&customfield1=name&customfield2=text')
      .then(response => response.json())
      .then(json => setUser({
        name: json.data[0].customfield1,
        text: json.data[0].customfield2,
        url: url,
        clicked: setClicked(clicked)
      }))
      .catch(error => console.log(error))
}, [])

console.log(user);

  //switch case based off of route: 
  switch (route) {
    case 'users':
        // case 'posts':
        //   return {
        //     name: 'No name :(',
        //     //destructuring rest of data and adding undefined fields
        //     ...data
        //   }
      default:
        //if nothing matches, do this:
        return user
  }

    // return data
};

export default useGetDog;