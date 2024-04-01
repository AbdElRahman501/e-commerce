import SolidStar_icon from "./icons/SolidStar_icon";
import OutlineStar_icon from "./icons/OultibeStar_icon";

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex w-full justify-center gap-1 text-[#FABC0D]">
      {[0, 0, 0, 0, 0].map((_, index) =>
        index < rating ? (
          <SolidStar_icon key={index} className="h-5 w-5" />
        ) : (
          <OutlineStar_icon key={index} className="h-5 w-5" />
        ),
      )}
    </div>
  );
};

export default Rating;
