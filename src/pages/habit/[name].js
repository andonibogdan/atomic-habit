import { useRouter } from "next/router";
import { useRef } from "react";

const HabitLog = () => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 mx-auto">
      <form className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900">{name}</h5>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            console.log(hours)
          </label>
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Number of hours spend..."
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            console.log(&quot;text&quot;)
          </label>
          <textarea
            placeholder="What you did..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Log it
        </button>
      </form>
    </div>
  );
};

export default HabitLog;
