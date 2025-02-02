/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
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
import { useNavigate, useSearchParams } from "react-router-dom";
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
  // { name: "Biggest Discounts" , key: "discount" },
];

function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}

interface FiltersProps {
  categories: string[];
  genres: string[];
  sortBy: { name: string; key: string };
  currentPage: number;
}

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const urlFilters = useMemo(() => {
    return {
      categories: searchParams.get("categories")?.split(",") || [],
      genres: searchParams.get("genres")?.split(",") || [],
      sortBy:
        sortOptions.find(
          (option) => option.key === searchParams.get("sortBy")
        ) || sortOptions[0],
      currentPage: parseInt(searchParams.get("page") || "1", 10),      
    };
  }, [searchParams]);

  const productsPerPage = 24;

  const fetchProducts = async () => {
    try {
      const res = await fetchPaginatedProducts(
        urlFilters.currentPage,
        productsPerPage,
        urlFilters.categories.length > 0 ? urlFilters.categories : undefined,
        urlFilters.genres.length > 0 ? urlFilters.genres.join(",") : undefined,
        urlFilters.sortBy.key,        
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
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlFilters]);

  const updateFilters = (filters: Partial<FiltersProps>) => {
    const params = new URLSearchParams();

    const newFilters = { ...urlFilters, ...filters };

    if (newFilters.categories.length > 0) {
      params.set("categories", newFilters.categories.join(","));
    }

    if (newFilters.genres.length > 0) {
      params.set("genres", newFilters.genres.join(","));
    }    

    params.set("sortBy", newFilters.sortBy.key);
    params.set("page", newFilters.currentPage.toString());

    navigate(`/products?${params.toString()}`, { replace: true });
  };

  const handleCategoryChange = (value: string) => {
    const newCategories = urlFilters.categories.includes(value)
      ? urlFilters.categories.filter((v) => v !== value)
      : [...urlFilters.categories, value];

    updateFilters({ categories: newCategories, currentPage: 1 });
  };

  const handleGenreChange = (value: string) => {
    const newGenres = urlFilters.genres.includes(value)
      ? urlFilters.genres.filter((v) => v !== value)
      : [...urlFilters.genres, value];

    updateFilters({ genres: newGenres, currentPage: 1 });
  };

  const handleSortChange = (option: { name: string; key: string }) => {
    updateFilters({ sortBy: option, currentPage: 1 });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      updateFilters({ currentPage: page });
    }
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
                                    ? urlFilters.categories.includes(
                                        option.value
                                      )
                                    : section.id === "genre"
                                    ? urlFilters.genres.includes(option.value)
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
                              urlFilters.sortBy.key === option.key
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
                                    ? urlFilters.categories.includes(
                                        option.value
                                      )
                                    : section.id === "genre"
                                    ? urlFilters.genres.includes(option.value)
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
                        onClick={() =>
                          handlePageChange(urlFilters.currentPage - 1)
                        }
                        className="btn btn-sm"
                        disabled={urlFilters.currentPage === 1}
                      >
                        Prev
                      </button>

                      {/* Pages with Ellipses */}
                      {urlFilters.currentPage > 3 && (
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
                          page >= urlFilters.currentPage - 2 &&
                          page <= urlFilters.currentPage + 2
                        ) {
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => handlePageChange(page)}
                              className={`btn btn-sm ${
                                urlFilters.currentPage === page
                                  ? "btn-active"
                                  : ""
                              }`}
                            >
                              {page}
                            </button>
                          );
                        }
                        return null;
                      })}

                      {/* Ellipses and Last Page */}
                      {urlFilters.currentPage < totalPages - 2 && (
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
                        onClick={() =>
                          handlePageChange(urlFilters.currentPage + 1)
                        }
                        className="btn btn-sm"
                        disabled={urlFilters.currentPage === totalPages}
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
