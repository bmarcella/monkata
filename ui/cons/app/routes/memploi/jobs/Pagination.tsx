import React from 'react'
interface Props {
    pg : {
       currentPage: number,
       totalPages: number
    }
  }
 
function Pagination( { pg } : Props) {
    if (!pg) return;
  return (
    
        <div className="flex justify-center mt-4">
        <button
        className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
        onClick={() => {} }
        disabled={pg.currentPage === 1}
        >
        Précédent
        </button>
        <span className="px-4 py-2 mx-2">
        Page {pg.currentPage} / { pg.totalPages }
        </span>
        <button
        className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
        onClick={() => {} }
        disabled={pg.currentPage === pg.totalPages}
        >
        Suivant
        </button>
    </div>

  )
}

export default Pagination