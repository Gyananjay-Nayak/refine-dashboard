import { useState, useEffect, useRef } from "react";

type AccordionStatsProps = {
  title: string;
  value: string;
  percent: string;
};
type EditMenuProps = {
  menu: string[];
};
const EditMenu = ({ menu }: EditMenuProps) => {
  return (
    <div className="absolute right-5 top-10 bg-white shadow-lg z-10 rounded-lg p-2">
      {/* </div><div className="fixed inset-0" > */}
      {menu.map((item, index) => (
        <div
          key={index}
          className="group/menu hover:bg-[#F1F1F1] p-1 border-0 rounded-md text-sm text-[#303030] flex justify-between items-center"
        >
          <div className="flex items-center">
            <i className="fa-solid fa-chart-line px-2"></i>
            <div className="w-max">{item}</div>
          </div>
          <div className="w-8 text-center">
            <div className="hidden group-hover/menu:block">
              <i className="fa-regular fa-circle-question"></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const AccordionStats = ({
  title,
  value,
  percent,
}: AccordionStatsProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const newRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: Event) => {
    if (newRef.current && !newRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const menu = [
    "Average Order Value",
    "Conversion Rate",
    "Gross Sales",
    "Net return value",
    "Store search conversion",
    "Return rate",
  ];

  const handleActionClick = () => {
    console.log("rr", isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  const closeModal = () => {
    setIsMenuOpen(false);
  };

  return (
    <div
      className={`group p-1 py-2 flex-1 hover:bg-[#F1F1F1] border-0 rounded-lg relative transition-transform duration-75 ease-in-out transform hover:scale-[1] ${
        isMenuOpen ? "bg-[#F1F1F1]" : ""
      }`}
      ref={newRef}
    >
      <div className="flex items-center justify-between px-2">
        <div className="font-semibold border-b border-dashed border-gray-400 group/statTitle">
          {title}
          <div className="hidden absolute z-10 top-10 left-0 px-3 py-4 bg-white shadow-md rounded-md border border-gray-300 whitespace-nowrap group-hover/statTitle:block">
            <div className="font-semibold mb-2">{title}</div>
            <div className="text-sm font-light text-[#000000cc]">Your online store's traffic volume, shown in session</div>
          </div>
        </div>
        <span
          className={`p-2  ${
            isMenuOpen ? "block bg-gray-300" : "hidden"
          } group-hover:block hover:bg-gray-300 border-0 rounded-lg`}
          onClick={() => handleActionClick()}
        >
          <svg
            width="18"
            height="17"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6895 6.23633L5.77344 12.1523L4.91016 11.2891L5.01172 11.1875H3.84375C3.61523 11.1875 3.4375 11.0098 3.4375 10.7812V9.61328L3.33594 9.71484C3.20898 9.8418 3.13281 9.96875 3.08203 10.1465L2.49805 12.127L4.47852 11.543C4.63086 11.4922 4.7832 11.416 4.91016 11.2891L5.77344 12.1523C5.51953 12.4062 5.18945 12.6094 4.83398 12.7109L1.76172 13.5996C1.55859 13.6758 1.33008 13.625 1.17773 13.4473C1 13.2949 0.949219 13.0664 1 12.8633L1.91406 9.79102C2.01562 9.43555 2.21875 9.10547 2.47266 8.85156L8.38867 2.93555L11.6895 6.23633ZM13.4922 2.12305C14.127 2.75781 14.127 3.79883 13.4922 4.43359L12.2734 5.65234L8.97266 2.35156L10.1914 1.13281C10.8262 0.498047 11.8672 0.498047 12.502 1.13281L13.4922 2.12305Z"
              fill="black"
              fillOpacity="0.5"
            />
          </svg>
        </span>
        {isMenuOpen && <EditMenu menu={menu} />}
      </div>
      <div className="p-2">
        <span className="font-semibold text-xl">{value}</span>
        <span className="text-sm text-gray-400 p-1">
          {" "}
          <i className="fa-solid fa-caret-up"></i> {percent}%
        </span>
      </div>
    </div>
  );
};
