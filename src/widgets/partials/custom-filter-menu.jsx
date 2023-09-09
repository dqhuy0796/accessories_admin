import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Accordion, AccordionBody, AccordionHeader, Input } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export function CustomFilterMenu({ open, menu }) {
    const [openAccordion, setOpenAccordion] = useState(0);

    const handleOpen = (value) => setOpenAccordion(openAccordion === value ? 0 : value);

    return (
        <div
            className={`animation-float absolute top-[calc(100%+4px)] right-0 z-10 min-w-[320px] overflow-hidden rounded-md bg-white shadow ${
                open ? 'block' : 'hidden'
            }`}
        >
            <ul className="p-3">
                <li className="mb-3">
                    <Input label="Tìm kiếm" color="blue-gray" icon={<MagnifyingGlassIcon className="h-4 w-4" />} />
                </li>
                {menu.map((item) => (
                    <li key={item.value}>
                        <Accordion
                            open={openAccordion === item.value}
                            className={`rounded border px-4 ${
                                openAccordion === item.value ? 'border-blue-gray-100' : 'border-transparent'
                            }`}
                            icon={<AccordionOpenButton id={item.value} open={openAccordion} />}
                        >
                            <AccordionHeader
                                onClick={() => handleOpen(item.value)}
                                className={`border-b-0 py-3 text-sm font-medium hover:text-blue-500 ${
                                    openAccordion === item.value ? 'text-blue-500' : 'text-blue-gray-500'
                                }`}
                            >
                                {item.title}
                            </AccordionHeader>
                            <AccordionBody className="pt-0 text-sm font-normal">{item.content}</AccordionBody>
                        </Accordion>
                    </li>
                ))}
            </ul>
        </div>
    );
}

CustomFilterMenu.defaultProps = {
    menu: [
        {
            value: 1,
            title: 'What is Material Tailwind?',
            content: `We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams.`,
        },
        {
            value: 2,
            title: 'What is Material Tailwind?',
            content: `We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams.`,
        },
        {
            value: 3,
            title: 'What is Material Tailwind?',
            content: `We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams.`,
        },
    ],
};

CustomFilterMenu.propTypes = {
    menu: PropTypes.any,
    open: PropTypes.bool,
};

export default CustomFilterMenu;

const AccordionOpenButton = ({ id, open }) => (
    <ChevronDownIcon className={`h-4 w-4 transition-all ${open === id ? 'rotate-180' : 'rotate-0'}`} />
);
