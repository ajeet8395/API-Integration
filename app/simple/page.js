"use client";
import { useSelector, useDispatch } from "react-redux";
import { fetchSimpleData } from "@/redux/dataSlice";

export default function Simple() {
  const dispatch = useDispatch();
  const simpleData = useSelector((state) => state.data.data);
  const status = useSelector((state) => state.data.status);
  const error = useSelector((state) => state.data.error);

  const handleButtonClick = () => {
    dispatch(fetchSimpleData());
  };

  return (
    <main className="w-full min-h-screen p-4">
      <div className="flex flex-col gap-6 justify-center items-center">
        <button
          onClick={handleButtonClick}
          className="border rounded-lg p-4 bg-black text-white font-semibold"
        >
          Make API Call
        </button>
        {status === 'loading' && <div>Loading...</div>}
        {status === 'failed' && <div>Error: {error}</div>}
        <div className="grid grid-cols-4 gap-6 px-4">
          {simpleData.map((item) => (
            <div key={item.id} className="border rounded-md p-3 bg-gray-100 cursor-pointer hover:shadow-md hover:shadow-[#877474] hover:bg-black hover:text-white hover:scale-105 transition-all">
                <span>{item.id}</span>
              <h3 className="font-bold truncate">{item.title}</h3>
              <p className="">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
