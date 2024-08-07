import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { capitalize, delay } from "../utils/utils";
import { useAuth } from "../contexts/authContext";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  HomeIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { doSignOut } from "../firebase/auth";
import profileIcon from "../assets/profileIcon.jpg";
import { useEffect, useState } from "react";
import { userJoined } from "../services/api";
import Snackbar from "../components/common/Snackbar";

const navigation0 = [
  { name: "Dashboard", href: "/app/dashboard", current: false },
  { name: "Modules", href: "/app/modules", current: false },
  { name: "Groups", href: "/app/groups", current: false },
  { name: "Simulate", href: "/app/simulate", current: false },
  { name: "Reports", href: "/app/reports", current: false },
  { name: "Settings", href: "/app/settings", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardPage() {
  const { currentUser, userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const user = {
    name: currentUser?.displayName,
    email: currentUser?.email,
    imageUrl: currentUser?.photoURL || profileIcon,
  };

  // If Not authenticated
  if (!userLoggedIn || currentUser == null) {
    return <Navigate to={"/login"} replace={true} />;
  }

  const navigation = navigation0.map((item) => {
    if (item.href === location.pathname) {
      return { ...item, current: true };
    } else if (
      item.href === "/app/groups" &&
      location.pathname.startsWith("/app/group/")
    ) {
      return { ...item, current: true };
    } else if (
      item.href === "/app/modules" &&
      location.pathname.startsWith("/app/module/")
    ) {
      return { ...item, current: true };
    } else {
      return item;
    }
  });

  const filteredNavigations = navigation0.filter(
    (item) => item.href === location.pathname
  );
  let dashboardName = "";
  const breadcrumbs: any[] = [
    <Link to={"/"} replace={true}>
      <HomeIcon className="w-4 h-4" />
    </Link>,
  ];
  let bcPrefix = "";
  if (filteredNavigations.length) {
    dashboardName = filteredNavigations[0].name;
    breadcrumbs.push(dashboardName);
  } else {
    dashboardName = capitalize(location.pathname.split("app/")[1]);
    if (dashboardName.toUpperCase().startsWith("GROUP")) {
      breadcrumbs.push(
        <Link to={"/app/groups"} replace={true}>
          Groups
        </Link>
      );
      bcPrefix = "group/";
    } else if (dashboardName.toUpperCase().startsWith("MODULE")) {
      breadcrumbs.push(
        <Link to={"/app/modules"} replace={true}>
          Modules
        </Link>
      );
      bcPrefix = "module/";
    }

    console.log(bcPrefix);
    breadcrumbs.push(
      <Link to={`/app/${""}${dashboardName.toLowerCase()}`}>
        {dashboardName}
      </Link>
    );
  }
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  useEffect(() => {
    async function run() {
      const response = await userJoined();
      if (response.success) {
        setSnackbarMessage("Successfully authenticated user");
      } else {
        setSnackbarMessage("Could not connect with server...");
      }
      await delay(6000);
      setSnackbarMessage(null);
    }
    if (location.state?.fromHome) {
      run();
    }
  }, []);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full w-full">
        <Disclosure
          as="nav"
          className="bg-gray-800 sticky top-0 z-50"
          style={{ zIndex: 1_000_000 }}
        >
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 flex-row">
                      <img
                        className="h-8 w-8"
                        src="/icon_transparent.png"
                        alt="AMS"
                      />
                    </div>
                    <div className="text-white font-bold ml-3">A.M.S.</div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </MenuButton>
                        </div>
                        <Transition
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <MenuItem>
                              {({ focus }) => (
                                <Link
                                  to={"/app/settings"}
                                  className={classNames(
                                    focus ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                  )}
                                >
                                  {"Settings"}
                                </Link>
                              )}
                            </MenuItem>
                            <MenuItem>
                              {({ focus }) => (
                                <div
                                  onClick={() => {
                                    doSignOut().then(() => {
                                      navigate("/login");
                                    });
                                  }}
                                  className={classNames(
                                    focus ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                  )}
                                >
                                  {"Sign out"}
                                </div>
                              )}
                            </MenuItem>
                          </MenuItems>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </DisclosureButton>
                  </div>
                </div>
              </div>

              <DisclosurePanel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md text-base text-left w-full font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <Link
                        to={item.href}
                        className="block w-full h-full px-3 py-2"
                      >
                        {item.name}
                      </Link>
                    </DisclosureButton>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <DisclosureButton
                      className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      onClick={() => {
                        navigate("/app/settings");
                      }}
                    >
                      Settings
                    </DisclosureButton>
                    <DisclosureButton
                      className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      onClick={() => {
                        doSignOut().then(() => {
                          navigate("/login");
                        });
                      }}
                    >
                      Sign out
                    </DisclosureButton>
                  </div>
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 pb-3 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {dashboardName}
            </h1>
            <h2 className="h-6 flex gap-2 text-sm text-text-muted">
              {breadcrumbs.map((bc, idx) => (
                <div key={idx} className="flex flex-row gap-2 items-center">
                  {idx ? (
                    <div>
                      <ChevronRightIcon className="w-4 h-4" />
                    </div>
                  ) : null}
                  <div>{bc}</div>
                </div>
              ))}
            </h2>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 px-2 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
        {snackbarMessage && <Snackbar message={snackbarMessage} />}
      </div>
    </>
  );
}
