import { useNavigate } from "react-router-dom";
function FloatingButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/form"); 
  };


  return (
    <button
      onClick={handleClick}
      id="btn"
       className="fixed bottom-6 right-6 bg-fuchsia-500 text-black p-0 w-14 h-14 rounded-full shadow-lg hover:bg-fuchsia-600 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center z-50"
      aria-label="Floating action button"
      style={{ borderRadius: "9999px" }}
    >
      <span className="text-2xl font-bold text-white">+</span>
    </button>
  );
}

export default FloatingButton;
