import { BiTrash } from "react-icons/bi";

const LogedCard = ({ id, hours, text, handleDelete }) => {
  return (
    <>
      <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 transform transition duration-500 hover:scale-110 relative">
        <h5 className="text-xl font-bold tracking-tight text-gray-900">
          Log nr. {id + 1}
        </h5>
        <p className="font-bold text-gray-700 mb-2">Hours spend: {hours}</p>
        <p className="font-normal text-gray-700 my-2 text-justify">{text}</p>
        <BiTrash
          onClick={handleDelete}
          className="absolute top-4 right-4 cursor-pointer hover:text-red-600"
          size={"1.5rem"}
        />
      </div>
    </>
  );
};

export default LogedCard;
