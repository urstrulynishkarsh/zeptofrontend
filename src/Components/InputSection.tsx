import React, { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        setItems(items.filter((i) => i.id !== item.id));
        setInputValue('');
    
        // Show toast notification
        toast.success(`Selected: ${item.name}`);
      };
      const handleChipRemove = (item: Item) => {
        setSelectedItems(selectedItems.filter(i => i.id !== item.id));
        setItems([...items, item]);
        toast.error(`Remove: ${item.name}`);
      };


      useEffect(() => {
        setItems(data.filter((item) => !selectedItems.some((selectedItem) => selectedItem.id === item.id)));
    }, [data, selectedItems]);


    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && inputValue === '') {
          // backspace is pressed then input is empty
          const lastSelectedItem = selectedItems[selectedItems.length - 1];
          if (lastSelectedItem) {
            setSelectedItems(selectedItems.slice(0, -1));
            setItems([...items, lastSelectedItem]);
            toast.error(`Remove: ${lastSelectedItem.name}`);
          }
        }
      };

  return (
    <div className='mt-14 relative'>
     <div className='flex w-10/12 flex-wrap gap-2 mx-auto text-center items-center'>
        <div className='flex w-full  flex-wrap gap-2 mx-auto text-center items-center'>
          {selectedItems.map((item) => (
            <div key={item.id} className='flex gap-x-4  items-center  bg-blue-100 p-2 rounded-2xl'>
              <img src={item.photo} className='w-8 h-8 rounded-full max-w-full' alt={`Photo of ${item.name}`} />
              <h1 className='flex text-center items-center'>{item.name}</h1>
              <span className='flex text-center items-center cursor-pointer' onClick={() => handleChipRemove(item)}>
                X
              </span>
            </div>
          ))}
          <input
            type='text'
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsInputFocused(true)}
            onKeyDown={handleKeyDown}
            className='block w-full focus:outline-none p-4 text-sm text-gray-900 border-b-[5px] border-b-blue-100 bg-gray-50 relative z-10'
            placeholder='Add new User...'
          />
        </div>
         {isInputFocused && (
        <ul
        className='flex-col  max-h-56 shadow-2xl border-white overflow-y-auto flex gap-3 bg-white   rounded-md  mx-auto xl:w-6/12 lg:w-6/12  md:w-7/12 sm:w-6/12 w-full'>
        {items.map(item => (
          <li
            key={item.id}
            onClick={() => handleItemClick(item)}
            className='flex gap-x-4 pl-3 hover:bg-richblack-50'
          >
            <div>
              <img
                src={item.photo}
                className='w-10 h-10 rounded-full max-w-full'
                alt={`Photo of ${item.name}`}
              />
            </div>
            <div className='flex text-center items-center gap-x-16'>
              <h1>{item.name}</h1>
              <h2 className='right-aligned'>{item.email}</h2>
            </div>
          </li>
        ))}
      </ul>
         )}
    </div>
    </div>

  )
}

export default InputSection