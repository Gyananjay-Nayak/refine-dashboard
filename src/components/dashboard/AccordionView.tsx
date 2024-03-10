import { useState } from "react";
import { Accordion } from "./Accordion";
import { AAccordion } from "../../interfaces";

type AccordionViewProps = {
  accordions: any;
};

export const AccordionView = ({ accordions }: AccordionViewProps) => {
  const [customAccordions, setAccordion] = useState(accordions);

  const toggleAccordion = (accordionId: number) => {
    const updatedAccordions = customAccordions.map((accord: AAccordion) => {
      if (accord.id === accordionId) {
        return { ...accord, isOpen: !accord.isOpen };
      } else {
        return { ...accord, isOpen: false };
      }
    });

    setAccordion(updatedAccordions);
  };

  return (
    <div className="mx-auto py-4">
      {customAccordions.map((accord: AAccordion) => (
        <Accordion
          key={accord?.id}
          data={accord}
          toggleAccordion={toggleAccordion}
        />
      ))}
    </div>
  );
};
