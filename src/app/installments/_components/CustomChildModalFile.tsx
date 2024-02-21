import { Autocomplete, AutocompleteItem, Input, Select, SelectItem } from '@nextui-org/react'
import React from 'react'

const CustomChildModalFile = () => {
  return (
      <div>
          <div>
          <h1 className='text-xl font-bold'>Folder Name</h1>
          <Input  variant='underlined' color='primary' type='dropdown' className='bg-gray-200 text-black'/>
          </div>
           <div>  
                  <h1 className='text-xl font-bold'>Custom Child Modal File</h1> <Autocomplete
              variant='underlined'
      defaultItems={['dog', 'cat', 'fish']}
      
              placeholder="Search a student"
              color='primary'
      className="bg-gray-200 text-black"
          >
         
                        <AutocompleteItem variant='flat' className='bg-white' key="1" value="dog">
        Dog
                  </AutocompleteItem>
                       
                        <AutocompleteItem variant='flat' className='bg-white' key="2" value="cat">
        Cat
                  </AutocompleteItem>
                        <AutocompleteItem variant='flat' className='bg-white ' key="3" value="fish">
        Fish
                  </AutocompleteItem>
    </Autocomplete>
              </div>


    </div>
  )
}

export default CustomChildModalFile