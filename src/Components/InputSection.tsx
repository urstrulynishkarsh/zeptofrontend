import React, { useEffect, useRef, useState } from 'react'

interface Item {
    id: number;
    name: string;
    photo: string;
    email:string;
  }
  
  interface InputSectionProps {
    data: Item[];
  }

const InputSection:React.FC<InputSectionProps>=({data})=>{
    const [items, setItems] = useState<Item[]>(data);
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
 
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
    
        // Filter items based on input value
        const filteredItems = data.filter(
            (item) =>
                item.name.toLowerCase().includes(value.toLowerCase()) &&
                !selectedItems.some((selectedItem) => selectedItem.id === item.id)
        );
    
    
        setItems(filteredItems);
      };
    
      const handleItemClick = (item: Item) => {
        setSelectedItems([...selectedItems, item]);
        setItems(items.filter(i => i.id !== item.id));
        setInputValue('');
       
   
      };
      const handleChipRemove = (item: Item) => {
        setSelectedItems(selectedItems.filter(i => i.id !== item.id));
        setItems([...items, item]);
      };


      useEffect(() => {
        setItems(data.filter((item) => !selectedItems.some((selectedItem) => selectedItem.id === item.id)));
    }, [data, selectedItems]);

  return (
    <div className='mt-14'>
        <div>
        <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsInputFocused(true)}        
        className="block w-[80%] justify-center p-4 text-sm text-gray-900 border-b-[5px] border-b-blue-100 mx-auto bg-gray-50 "
        placeholder="Add new User..."
        />
         {isInputFocused && (
     <ul
        className='flex-col h-56 overflow-y-auto flex gap-3 bg-white  p-4 rounded-md shadow-md mx-auto w-5/12'>
        {items.map(item => (
          <li
            key={item.id}
            onClick={() => handleItemClick(item)}
            className='flex gap-x-4 hover:bg-richblack-50'
          >
            <div>
              <img
                src={item.photo}
                className='w-10 h-10 rounded-full'
                alt={`Photo of ${item.name}`}
              />
            </div>
            <div className='flex text-center items-center gap-x-16'>
              <h1>{item.name}</h1>
              <h2 className='flex-end'>{item.email}</h2>
            </div>
          </li>
        ))}
      </ul>
         )}
         </div>
         <div className="flex flex-wrap gap-2 mx-auto text-center items-center">
        {selectedItems.map((item) => (
          <div key={item.id} className='flex gap-x-4 items-center bg-blue-100 p-2 rounded-md'>
            <img src={item.photo} className='w-8 h-8 rounded-full' alt={`Photo of ${item.name}`} />
            <h1 className='flex text-center items-center'>{item.name}</h1>
            <span className='flex text-center items-center cursor-pointer' onClick={() => handleChipRemove(item)}>X</span>
          </div>
        ))}
      </div>

     

    </div>

  )
}

export default InputSection