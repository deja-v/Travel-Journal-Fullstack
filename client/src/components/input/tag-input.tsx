import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm text-blue-400 bg-blue-200/40 px-3 py-1 rounded"
            >
              <GrMapLocation className="text-sm" /> {tag}
              <button onClick={() => handleRemoveTag(tag)}>
                <MdClose className="cursor-pointer" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          value={inputValue}
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add Location"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="group w-8 h-8 flex items-center justify-center cursor-pointer rounded border border-blue-400 hover:border-blue-500 hover:bg-blue-500"
          onClick={addNewTag}
        >
          <MdAdd className="text-2xl text-blue-400 group-hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
