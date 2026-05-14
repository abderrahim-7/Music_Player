import CheckMark from "../../assets/checkmark.svg";

interface Props {
  image: string;
  Label: string;
  isSelected: boolean;
  onToggle: () => void;
}

const Genre = ({ image, Label, isSelected, onToggle }: Props) => {
  return (
    <div
      onClick={onToggle}
      className={`
        relative cursor-pointer w-full aspect-square
        rounded-2xl text-white flex-shrink-0
        transition-all duration-200
        hover:scale-105
        ${
          isSelected
            ? "bg-[#1e1428] border border-purple-600"
            : "bg-[#1a1a1a] border border-[#2d2d2d] hover:border-purple-700"
        }
      `}
    >
      <img
        src={image}
        alt={Label}
        className="absolute left-0 bottom-0 w-9/10 rounded-2xl"
      />
      <span className="font-[Outfit] absolute right-1 top-1 text-sm font-medium">
        {Label}
      </span>
      <div
        className={`flex justify-center items-center absolute bottom-1.5 right-1.5 z-10
          rounded-full border h-5 w-5 transition-all duration-200
          ${isSelected ? "bg-[#16FF00] border-[#16FF00]" : "bg-black border-neutral-600"}`}
      >
        {isSelected && (
          <img src={CheckMark} alt="selected" className="h-3 w-3" />
        )}
      </div>
    </div>
  );
};

export default Genre;
