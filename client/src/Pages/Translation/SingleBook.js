
  export default function SingleBook(props) {

    const { books } = props
    return (
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
  
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {books.map((book, index) => (
              <div
                key={index}
                className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
              >
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                  <img
                    src={book.volumeInfo.imageLinks.smallThumbnail}
                    alt={book.volumeInfo.title}
                    className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                  />
                </div>
                <div className="flex-1 p-4 space-y-2 flex flex-col">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={`${book.volumeInfo.infoLink}`} target="_blank">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {book.volumeInfo.title}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500 truncate">{book.volumeInfo.description}</p>
                  <div className="flex-1 flex flex-col justify-end">
                      {
                          book.volumeInfo.authors ?
                          <p className="text-sm italic text-gray-500">{book.volumeInfo.authors[0]}</p>
                            : ''
                      }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }