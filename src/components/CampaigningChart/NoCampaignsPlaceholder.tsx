import { FC } from "react";

interface NoCampaignsPlaceholderProps {}

const NoCampaignsPlaceholder: FC<NoCampaignsPlaceholderProps> = () => {
  return (
    <span className="bg-white w-fit px-12 py-4 justify-center items-center flex-col rounded flex text-gray-700 shadow-md border gap-2 whitespace-nowrap  text-xl">
      No campaigns yet. Create new one?
    </span>
  );
};

export default NoCampaignsPlaceholder;
