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
import { getAllCategories } from "../../services/categoryService";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import { getProducts } from "../../state/slices/productsSlice";
import { useLocation, useNavigate } from "react-router-dom";

const sortOptions = [
  { name: "Most Popular", key: "popular" },  // You need a 'key' for sorting logic
  { name: "Best Rating", key: "rating" },
  { name: "Newest", key: "newest" },
  { name: "Price: Low to High", key: "priceLowToHigh" },
  { name: "Price: High to Low", key: "priceHighToLow" },
];

function classNames(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { products } = useSelector((state: RootState) => state.products);
  const dispatch: AppDispatch = useDispatch();
  const [categories, setCategories] = useState<any>();
  const [brands, setBrands] = useState<any>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const fetchedCategories = await getAllCategories();
        await dispatch(getProducts());
        const manufacturers = new Set(products.map((product: any) => product.manufacturer));
        setBrands(Array.from(manufacturers));
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching filters", error);
      }
    };
    fetchFilters();
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categories = params.get("category")?.split(",") || [];
    const genres = params.get("genre")?.split(",") || [];
    const brands = params.get("brand")?.split(",") || [];
    
    setSelectedCategories(categories);
    setSelectedGenres(genres);
    setSelectedBrands(brands);
  }, []);

  const handleSortChange = (option: { name: string, key: string }) => {
    setSelectedSortOption(option);
  };

  // Sort products based on selected sorting option
  const sortedProducts = [...products].sort((a, b) => {
    switch (selectedSortOption.key) {
      case "priceLowToHigh":
        return a.price - b.price;
      case "priceHighToLow":
        return b.price - a.price;
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "rating":
        return b.rating - a.rating;
      case "popular":
        return a.rating - b.rating; 
      default:
        return 0;
    }
  });

  const handleCategoryChange = (value: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value];
      updateURL("category", newCategories);
      return newCategories;
    });
  };

  const handleGenreChange = (value: string) => {
    setSelectedGenres((prev) => {
      const newGenres = prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value];
      updateURL("genre", newGenres);
      return newGenres;
    });
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrands((prev) => {
      const newBrands = prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value];
      updateURL("brand", newBrands);
      return newBrands;
    });
  };

  const updateURL = (filterType: string, values: string[]) => {
    const params = new URLSearchParams(location.search);
    if (values.length > 0) {
      params.set(filterType, values.join(","));
    } else {
      params.delete(filterType);
    }
    navigate({ search: params.toString() });
  };

  const filteredProducts = sortedProducts.filter(product => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.categoryId);
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(product.genre);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.manufacturer);
    return matchesCategory && matchesGenre && matchesBrand;
  });

  const filters = [
    {
      id: "genre",
      name: "Genre",
      options: [
        { value: "Men", label: "Men" },
        { value: "Women", label: "Women" },
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
    {
      id: "brand",
      name: "Brand",
      options: Array.isArray(brands)
        ? brands.map((brand: string) => ({
            value: brand,
            label: brand,
          }))
        : [],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-base-200">
        <div>
          {/* Mobile filter dialog */}
          <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
            <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear" />
            <div className="fixed inset-0 z-40 flex">
              <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-base-200 py-4 pb-12 shadow-xl transition duration-300 ease-in-out">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button type="button" onClick={() => setMobileFiltersOpen(false)} className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-base-200 p-2 text-gray-400">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
                <form className="mt-4 border-t border-gray-200">
                  {filters.map(section => (
                    <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-base-200 px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                            <MinusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:block hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                checked={
                                  section.id === "category"
                                    ? selectedCategories.includes(option.value)
                                    : section.id === "genre"
                                    ? selectedGenres.includes(option.value)
                                    : selectedBrands.includes(option.value)
                                }
                                onChange={() => {
                                  if (section.id === "category") {
                                    handleCategoryChange(option.value);
                                  } else if (section.id === "genre") {
                                    handleGenreChange(option.value);
                                  } else if (section.id === "brand") {
                                    handleBrandChange(option.value);
                                  }
                                }}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label htmlFor={`filter-mobile-${section.id}-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-500">
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

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Watches</h1>
              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                    </MenuButton>
                  </div>
                  <MenuItems
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-base-200 shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                  >
                    <div className="py-1">
                    {sortOptions.map(option => (
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
                <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
                </button>
                <button type="button" onClick={() => setMobileFiltersOpen(true)} className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">Products</h2>
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  {filters.map(section => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-base-200 py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                            <MinusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:block hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                id={`filter-desktop-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                checked={
                                  section.id === "category"
                                    ? selectedCategories.includes(option.value)
                                    : section.id === "genre"
                                    ? selectedGenres.includes(option.value)
                                    : selectedBrands.includes(option.value)
                                }
                                onChange={() => {
                                  if (section.id === "category") {
                                    handleCategoryChange(option.value);
                                  } else if (section.id === "genre") {
                                    handleGenreChange(option.value);
                                  } else if (section.id === "brand") {
                                    handleBrandChange(option.value);
                                  }
                                }}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label htmlFor={`filter-desktop-${section.id}-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-500">
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
                  <ProductsList products={filteredProducts} />
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
