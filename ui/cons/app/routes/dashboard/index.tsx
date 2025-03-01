import { useAlert } from "~/providers/AlertProvider";



function index() {
  const { showAlert } = useAlert();
  return (
    <div className="p-10 bg-gray-100 flex justify-center items-center h-screen">
    <button
        onClick={() => showAlert("This is a success alert!", "success")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Show Alert
      </button>
  </div>
  )
}

export default index