import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import styles from './Search.module.css'
import { GEO_API_URL, geoApiOptions } from "../../api";


const Search = ({onSearchChange}) => {
  
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    return await fetch(`${GEO_API_URL}/cities?minPopulation=1000&namePrefix=${inputValue}`, geoApiOptions )
    .then( response => response.json() )
    .then(response => {
      return {
        options : response.data.map( (city) => {
          return {
            value : `${city.latitude} ${city.longitude} ` ,
            label : `${city.name}, ${city.countryCode} ` , 
          }
        } )
      }
    } )
    .catch(err =>  console.log(err)); 
  }

  
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  }



  return (
   <>

 
    <AsyncPaginate 
      placeholder={`Search for city`}
      debounceTimeout={600}
      className={`${styles.input}`}
      value={search}
      onChange={ handleOnChange }
      loadOptions={loadOptions}
    />

    </>
  )
}

export default Search;
