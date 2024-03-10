import { AAccordion } from "../../interfaces";
import { AccordionStats } from "./AccordionStats";

type AccordionProps = {
  toggleAccordion: Function;
  data: AAccordion;
};



export const Accordion = ({ toggleAccordion, data }: AccordionProps) => {
  return (
    <div className="border mb-1 bg-white rounded-lg drop-shadow-mds">
      <div
        className="w-full p-4 mb-2 text-left 
                            transition duration-300 flex"
      >
        <AccordionStats
          title="Online store sessions"
          value="255,581"
          percent="9"
        />
        <AccordionStats
          title="Net return value"
          value="-$15,07.44"
          percent="14"
        />
        <AccordionStats title="Total order" value="10,511" percent="2" />
        <AccordionStats title="Conversion rate" value="3.18" percent="7" />
        <span
          onClick={() => toggleAccordion(data.id)}
          className={`float-right mx-2 my-auto cursor-pointer`}
        >
          {data.isOpen ? (
            <i className="fa-solid fa-chevron-up"></i>
          ) : (
            <i className="fa-solid fa-chevron-down"></i>
          )}
        </span>
      </div>
      {data.isOpen && <div className="p-4 bg-white">{data?.content}</div>}
    </div>
  );
};
