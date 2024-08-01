import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className={`${isOpen?'bg-[#f6c344]/90 rounded-xl my-5 transition-all duration-200':''}`}>
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-left   focus:outline-none "
        onClick={toggleAccordion}
      >
        <h3 className="text-lg font-semibold hover:text-gray-500 transition">{title}</h3>
        { isOpen ?<ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className='w-4 h-4 ml-2'/>}
      </button>
      <div className={`transition-all duration-200 overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'} `}>
        <div className="p-4">
          {content}
        </div>
      </div>
    </div>
  );
};


export default Accordion;
