/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Navbar } from "../general/Navbar";
import { ProductsList } from "../general/ProductsList";
import {
  CategoryProps,
  getAllCategories,
} from "../../services/categoryService";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "../general/Alert";
import {
  fetchPaginatedProducts,
  ProductProps,
} from "../../services/productService";

const sortOptions = [
  { name: "Most Popular", key: "popular" }, // You need a 'key' for sorting logic
  // { name: "Best Rating", key: "rating" },
  // { name: "Newest", key: "newest" },
  { name: "Price: Low to High", key: "priceAsc" },
  { name: "Price: High to Low", key: "priceDesc" },
];

function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  // const [onSaleFilter, setOnSaleFilter] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const productsPerPage = 24;

  const fetchProducts = async (page: number, sortKey: string) => {
    try {
      const params: Record<string, string | number> = {
        page,
        limit: productsPerPage,
        sortBy: sortKey,
      };

      if (selectedCategories.length > 0) {
        params.categories = selectedCategories.join(",");
      }

      if (selectedGenres.length > 0) {
        params.genres = selectedGenres.join(",");
      }

      // Update the URL with filters
      const searchParams = new URLSearchParams(
        params as Record<string, string>
      );
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });

      // Fetch products
      const res = await fetchPaginatedProducts(
        page,
        productsPerPage,
        selectedCategories.length > 0 ? selectedCategories : undefined,
        selectedGenres.length > 0 ? selectedGenres.join(",") : undefined,
        sortKey
      );

      setProducts(res.products || []);
      setTotalPages(res.paginationDetails.totalPages || 1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getAllCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching filters", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categories = searchParams.get("categories")?.split(",") || [];
    const genres = searchParams.get("genres")?.split(",") || [];
    const page = parseInt(searchParams.get("page") || "1", 10);
    const sortBy = searchParams.get("sortBy") || "priceAsc";
  
    setCurrentPage(page);
    setSelectedSortOption(sortOptions.find((option) => option.key === sortBy) || sortOptions[0]);
    setSelectedCategories(categories);
    setSelectedGenres(genres);    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    fetchProducts(currentPage, selectedSortOption.key);
  }, [currentPage, selectedSortOption, selectedCategories, selectedGenres]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSortChange = (option: { name: string; key: string }) => {
    setSelectedSortOption(option);
    setCurrentPage(1); // Reset to the first page on sort change
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    setCurrentPage(1);
  };

  const handleGenreChange = (value: string) => {
    setSelectedGenres((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    setCurrentPage(1);
  };

  const filters = [
    {
      id: "genre",
      name: "Genre",
      options: [
        { value: "MAN", label: "MAN" },
        { value: "WOMAN", label: "WOMAN" },
      ],
    },
    {
      id: "category",
      name: "Category",
      options: Array.isArray(categories)
        ? categories.map((category: { id: string; name: string }) => ({
            value: category.id,
            label: category.name,
          }))
        : [],
    },
  ];

  if (loading) {
    return (
      <div className="text-center flex items-center justify-center gap-5 mt-20">
        <span className="text-lg font-bold merriweather">
          Loading products...
        </span>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Alert type={"success"} message={"Added to cart!"} isVisible={false} />
      <div className="bg-base-200">
        <div>
          {/* Mobile filter dialog */}
          <Dialog
            open={mobileFiltersOpen}
            onClose={setMobileFiltersOpen}
            className="relative z-40 lg:hidden"
          >
            <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear" />
            <div className="fixed inset-0 z-40 flex">
              <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-base-200 py-4 pb-12 shadow-xl transition duration-300 ease-in-out">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-base-200 p-2 text-gray-400"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
                <form className="mt-4 border-t border-gray-200">
                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-base-200 px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="h-5 w-5 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="h-5 w-5 group-data-[open]:block hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                checked={
                                  section.id === "category"
                                    ? selectedCategories.includes(option.value)
                                    : section.id === "genre"
                                    ? selectedGenres.includes(option.value)
                                    : false
                                }
                                onChange={() => {
                                  if (section.id === "category") {
                                    handleCategoryChange(option.value);
                                  } else if (section.id === "genre") {
                                    handleGenreChange(option.value);
                                  }
                                }}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </DialogPanel>
            </div>
          </Dialog>

          <main className="mx-auto w-auto px-4 sm:px-6 lg:px-8 md:mx-5">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
              <h1 className="md:text-4xl text-2xl font-thin text-gray-900 playfair tracking-wider">
                Products
              </h1>
              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-base-200 shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <button
                            onClick={() => handleSortChange(option)}
                            className={classNames(
                              selectedSortOption.key === option.key
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {option.name}
                          </button>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>
                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="border-b border-gray-200 py-6"
                    >
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-base-200 py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="h-5 w-5 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="h-5 w-5 group-data-[open]:block hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`filter-desktop-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                checked={
                                  section.id === "category"
                                    ? selectedCategories.includes(option.value)
                                    : section.id === "genre"
                                    ? selectedGenres.includes(option.value)
                                    : false
                                }
                                onChange={() => {
                                  if (section.id === "category") {
                                    handleCategoryChange(option.value);
                                  } else if (section.id === "genre") {
                                    handleGenreChange(option.value);
                                  }
                                }}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-desktop-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  <ProductsList products={products} />

                  <div className="mt-8 flex justify-center items-center w-full">
                    <div className="btn-group flex justify-center items-center gap-3">
                      {/* Prev Button */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="btn btn-sm"
                        disabled={currentPage === 1}
                      >
                        Prev
                      </button>

                      {/* Pages with Ellipses */}
                      {currentPage > 3 && (
                        <>
                          <button
                            onClick={() => handlePageChange(1)}
                            className="btn btn-sm"
                          >
                            1
                          </button>
                          <span className="btn btn-sm disabled">...</span>
                        </>
                      )}

                      {/* Dynamic Page Numbers */}
                      {[...Array(totalPages).keys()].map((pageNumber) => {
                        const page = pageNumber + 1;
                        // Show pages within range of 5 to 10
                        if (
                          page >= currentPage - 2 &&
                          page <= currentPage + 2
                        ) {
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => handlePageChange(page)}
                              className={`btn btn-sm ${
                                currentPage === page ? "btn-active" : ""
                              }`}
                            >
                              {page}
                            </button>
                          );
                        }
                        return null;
                      })}

                      {/* Ellipses and Last Page */}
                      {currentPage < totalPages - 2 && (
                        <>
                          <span className="btn btn-sm disabled">...</span>
                          <button
                            onClick={() => handlePageChange(totalPages)}
                            className="btn btn-sm"
                          >
                            {totalPages}
                          </button>
                        </>
                      )}

                      {/* Next Button */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="btn btn-sm"
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
