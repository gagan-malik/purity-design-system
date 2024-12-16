import React, {
  forwardRef,
  useState,
  useSyncExternalStore,
  useMemo,
  useEffect,
} from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { RadioButtonOption } from "../RadioButton";
import { Checkbox } from "../Checkbox";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export interface SelectMenuData {
  heading?: string;
  title?: string;
  img?: string;
  subHeading?: string;
  badge?: string | React.JSX.Element;
  onClick?: Function;
  imgSize?: string;
}

export interface ISelectData {
  id: string | number;
  name: string;
  render?: Function;
  disable?: boolean;
  menuRender?: SelectMenuData;
}

const renderMenu = (menuItem: SelectMenuData) => {
  return (
    <div
      className={`flex items-center p-2 justify-between ${
        menuItem.onClick ? "cursor-pointer" : ""
      }`}
      onClick={() => menuItem.onClick && menuItem.onClick(menuItem)}
    >
      <div className="flex items-center justify-left">
        {menuItem.img && (
          <img
            src={menuItem.img}
            alt="default-avatar"
            className="w- h-6"
            width={menuItem.imgSize ? menuItem.imgSize : "24"}
            height={menuItem.imgSize ? menuItem.imgSize : "24"}
          />
        )}
        {menuItem.heading && (
          <p className="text-text-primary text-sm font-medium">
            {menuItem.heading}
          </p>
        )}
        {menuItem.title && (
          <div className="ml-2 flex flex-row space-x-2 items-center">
            <p className="text-sm font-semibold text-text-primary">
              {menuItem.title}{" "}
            </p>
            {menuItem.subHeading && (
              <p className="text-xs font-medium text-text-primary">
                {menuItem.subHeading}
              </p>
            )}
          </div>
        )}
      </div>
      {menuItem.badge &&
        (typeof menuItem.badge === "string" ? (
          <img
            src={menuItem.badge}
            alt="star-avatar"
            className="h-6"
            width="24"
            height="24"
          />
        ) : (
          menuItem.badge
        ))}
    </div>
  );
};

const renderData = (item: ISelectData) => {
  if (item.render) {
    return item.render(item.id);
  }

  if (item.menuRender) {
    return renderMenu(item.menuRender);
  }
  return item.name;
};

const Select = ({
  options,
  onClick,
  defaultSelected,
  label,
  required,
  defautFocus,
  placeholder,
  labelBold = true,
  type = "check",
  variant = "outlined",
  disableSearch = false,
  placement = "bottom-right",
  size = "full",
}: {
  options: ISelectData[];
  onClick?: Function;
  defaultSelected?: ISelectData;
  label?: string;
  required?: boolean;
  defautFocus?: boolean;
  placeholder: string | React.ReactElement;
  labelBold?: boolean;
  type?: "radio" | "check" | "checkbox";
  variant?: "outlined" | "ghost";
  disableSearch?: boolean;
  placement?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: "big" | "small" | "medium" | "full";
}) => {
  const commentRef = React.useRef<HTMLTextAreaElement>(null);

  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(defautFocus ?? false);
  const [selectedItem, setSelectedItem] = useState(
    defaultSelected
      ? options.find((d) => d.id === defaultSelected.id)
      : undefined
  );

  const [multiSelectedItem, setMultiSelectedItem] = useState<ISelectData[]>(
    defaultSelected && options.find((d) => d.id === defaultSelected.id)
      ? ([options.find((d) => d.id === defaultSelected.id)] as any)
      : []
  );

  const parentRef = React.useRef<HTMLDivElement>(null);
  const [overflowCount, setOverflowCount] = useState(0);

  useEffect(() => {
    const parent = parentRef.current;
    if (parent) {
      const children = Array.from(parent.children);
      const parentRect = parent.getBoundingClientRect();

      // Count how many children are overflowing
      const overflowingChildren = children.filter((child) => {
        const childRect = child.getBoundingClientRect();
        if (childRect.right > parentRect.right) {
          return true;
        }
        return false;
      });

      setOverflowCount(overflowingChildren.length);
    }
  }, [multiSelectedItem]);

  const onInputChange = (e: any) => {
    e.preventDefault();
    setQuery(e.target.value);
  };
  React.useEffect(() => {
    if (!isFocused) return;
    commentRef?.current?.focus();
  }, [query]);

  const borderVariant = {
    outlined:
      query.length || isFocused
        ? "border ring-2 border-border-brand"
        : "border border-border-primary",
    ghost: query.length || isFocused ? "border-4 border-border-brand" : "",
  };
  const selectPillClassname = `flex items-center flex-row w-full bg-bg-primary py-1.5 pl-3 pr-10 text-text-primary focus:ring-brand-300 text-base sm:leading-6 rounded-full ${borderVariant[variant]}`;

  const placementClass = {
    "top-left": "bottom-12 right-0",
    "top-right": "bottom-12 left-0",
    "bottom-left": "right-0",
    "bottom-right": "left-0",
  };

  const sizeChart = {
    full: "100%",
    big: "80%",
    medium: "50%",
    small: "20%",
  };

  const optionsClass = `absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-3xl bg-bg-primary py-1 text-base sm:text-sm border-border-primary border-1 p-4 ${placementClass[placement]}`;
  let MyCustomButton = forwardRef(function (props, ref) {
    return (
      <div
        onBlur={() =>
          setTimeout(() => {
            setQuery("");
            setIsFocused(false);
          }, 300)
        }
        onFocus={() => {
          setIsFocused(true);
          setTimeout(() => {
            commentRef?.current?.focus();
          });
        }}
        tabIndex={0}
        className={selectPillClassname}
      >
        {!(type === "checkbox" && multiSelectedItem.length) ? (
          <>
            <input
              className="border-transparent focus:border-transparent focus:ring-0 w-full p-0 bg-bg-primary text-text-primary"
              ref={commentRef as any}
              {...props}
              id="select-input"
              value={query}
              disabled={disableSearch}
              onChange={onInputChange}
            />
            {!query.length &&
              (selectedItem ? (
                <label
                  htmlFor="select-input"
                  className="absolute pl-2 text-text-primary"
                >
                  {renderData(selectedItem)}
                </label>
              ) : (
                <label
                  htmlFor="select-input"
                  className="absolute pl-2 text-text-placeholder"
                >
                  {placeholder}
                </label>
              ))}
          </>
        ) : (
          <div className="overflow-hidden flex flex-row" ref={parentRef}>
            {multiSelectedItem.map((item, index) => (
              <div
                style={
                  multiSelectedItem.length - overflowCount < index + 1
                    ? { visibility: "hidden" }
                    : {}
                }
                className="w-max flex justify-center items-center m-1 font-medium py-1 px-2 bg-bg-primary: rounded-full text-text-primary bg-bg-primary_hover border border-border-primary"
              >
                <div className="text-xs font-normal leading-none w-max flex-initial">
                  {renderData(item)}
                </div>
                <div
                  className="flex flex-auto flex-row-reverse"
                  onClick={() =>
                    setMultiSelectedItem(
                      multiSelectedItem.filter((i) => i.id !== item.id)
                    )
                  }
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-x cursor-pointer hover:text-text-tertiary_hover rounded-full w-4 h-4 ml-2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {overflowCount > 0 && (
          <div className="box-border align-end  border-1 py-2 px-2 ml-2">
            +{overflowCount}
          </div>
        )}
      </div>
    );
  });

  const filteredData =
    query === ""
      ? options
      : options.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="flex w-full flex-col items-start justify-center gap-1">
      {label && (
        <p
          className={classNames(
            "text-sm block mb-2",
            labelBold
              ? "font-semibold text-text-primary"
              : "block mb-2 text-text-tertiary font-medium"
          )}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </p>
      )}
      <Combobox
        style={{ width: sizeChart[size] }}
        as="div"
        value={type === "checkbox" ? multiSelectedItem : selectedItem}
        multiple={(type === "checkbox" ? true : false) as any}
        onChange={(value) => {
          type === "checkbox"
            ? setMultiSelectedItem(value as ISelectData[])
            : setSelectedItem(value as ISelectData);
          type !== "checkbox" && setIsFocused(false);
          setQuery("");
          onClick && onClick(value);
        }}
      >
        {({ open }) => (
          <div className="relative">
            <Combobox.Input as={MyCustomButton} />

            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>

            {filteredData.length > 0 && (open || query.length || isFocused) ? (
              <Combobox.Options static className={optionsClass}>
                {filteredData.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    value={item}
                    disabled={item.disable}
                    className={({ active }) =>
                      classNames(
                        "relative cursor-default select-none py-2 pl-3 pr-9 rounded-full",
                        active && !item.disable
                          ? "bg-bg-active text-text-primary"
                          : "bg-bg-primary text-text-primary"
                      )
                    }
                  >
                    {({ active, selected }) => (
                      <>
                        {type === "radio" && (
                          <span
                            className={classNames(
                              "absolute inset-y-0 left-0 flex items-center pl-4",
                              active && !item.disable
                                ? "text-text-primary"
                                : "text-indigo-600"
                            )}
                          >
                            <RadioButtonOption isSelected={selected} />
                          </span>
                        )}
                        {type === "checkbox" && (
                          <span
                            className={classNames(
                              "absolute inset-y-0 left-0 flex items-center pl-4",
                              active && !item.disable
                                ? "text-text-primary"
                                : "text-indigo-600"
                            )}
                          >
                            <Checkbox
                              id={"" + item.id}
                              checked={selected ? "basic" : "unchecked"}
                            />
                          </span>
                        )}
                        <span
                          className={classNames(
                            "block truncate",
                            selected ? "font-semibold" : "",
                            type === "radio" || type === "checkbox"
                              ? "pl-8"
                              : ""
                          )}
                        >
                          {renderData(item)}
                        </span>
                        {selected && (
                          <span
                            className={classNames(
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                              active && !item.disable
                                ? "text-text-primary"
                                : "text-indigo-600"
                            )}
                          >
                            {type === "check" && (
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                                color="#2e90fa"
                              />
                            )}
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            ) : (
              <></>
            )}
          </div>
        )}
      </Combobox>
    </div>
  );
};

export default Select;
