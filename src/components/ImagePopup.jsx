import React, { useState } from "react";

function ImagePopup({ imageUrl }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Bouton pour ouvrir le popup */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Voir l'image
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            {/* Bouton de fermeture */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-700"
            >
              ✖
            </button>
            {/* Image affichée */}
            <img src={imageUrl} alt="Popup" className="max-w-full max-h-[80vh] rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImagePopup;
